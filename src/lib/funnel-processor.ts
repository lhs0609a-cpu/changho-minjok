// 퍼널 처리 엔진 - 발송 대기 메시지를 처리하는 핵심 로직

import { supabase } from './supabase';
import { sendMessage } from './message-sender';
import {
  getPendingFunnels,
  getStepsByTemplateId,
  createMessageLog,
  updateMessageLog,
  advanceFunnelStep,
} from './funnel-db';

interface ProcessResult {
  processed: number;
  success: number;
  failed: number;
  errors: string[];
}

/**
 * 발송 대기 중인 퍼널을 처리하는 메인 함수
 * Vercel Cron에서 매 분마다 호출됨
 */
export async function processPendingFunnels(): Promise<ProcessResult> {
  const result: ProcessResult = {
    processed: 0,
    success: 0,
    failed: 0,
    errors: [],
  };

  if (!supabase) {
    result.errors.push('Supabase not configured');
    return result;
  }

  // 1. 발송 대기 퍼널 조회
  const pendingFunnels = await getPendingFunnels();

  if (pendingFunnels.length === 0) {
    return result;
  }

  console.log(`[funnel-processor] ${pendingFunnels.length}개 퍼널 처리 시작`);

  for (const funnel of pendingFunnels) {
    try {
      // 이중 처리 방지: next_send_at을 null로 설정하여 다른 Cron 실행에서 잡히지 않도록 함
      const { data: claimData, error: claimError } = await supabase
        .from('customer_funnels')
        .update({ next_send_at: null })
        .eq('id', funnel.id)
        .eq('next_send_at', funnel.next_send_at) // 낙관적 잠금: 원래 값이 같을 때만 업데이트
        .select();

      if (claimError || !claimData || claimData.length === 0) {
        console.warn(`[funnel-processor] 퍼널 ${funnel.id} 클레임 실패 (이미 다른 프로세스가 처리 중)`);
        continue;
      }

      result.processed++;

      // 2. 해당 퍼널의 스텝 목록 조회
      const steps = await getStepsByTemplateId(funnel.template_id);
      const currentStep = steps.find(s => s.step_order === funnel.current_step);

      if (!currentStep) {
        const errorMsg = `퍼널 ${funnel.id}: step_order=${funnel.current_step}에 해당하는 스텝을 찾을 수 없음`;
        console.error(`[funnel-processor] ${errorMsg}`);
        result.errors.push(errorMsg);
        result.failed++;
        continue;
      }

      // 3. 고객 phone 조회 (inquiry 테이블에서)
      const { data: inquiry, error: inquiryError } = await supabase
        .from('inquiries')
        .select('phone, name')
        .eq('id', funnel.inquiry_id)
        .single();

      if (inquiryError || !inquiry) {
        const errorMsg = `퍼널 ${funnel.id}: inquiry ${funnel.inquiry_id} 조회 실패`;
        console.error(`[funnel-processor] ${errorMsg}`);
        result.errors.push(errorMsg);
        result.failed++;
        continue;
      }

      // 4. 메시지 로그 생성 (pending 상태)
      const messageLog = await createMessageLog({
        customer_funnel_id: funnel.id,
        step_id: currentStep.id,
        channel: currentStep.channel,
        status: 'pending',
      });

      if (!messageLog) {
        const errorMsg = `퍼널 ${funnel.id}: 메시지 로그 생성 실패`;
        console.error(`[funnel-processor] ${errorMsg}`);
        result.errors.push(errorMsg);
        result.failed++;
        continue;
      }

      // 5. 메시지 발송
      const sendResult = await sendMessage(
        currentStep.channel,
        inquiry.phone,
        currentStep.title,
        currentStep.message,
        currentStep.link_url || undefined
      );

      // 6. 메시지 로그 업데이트
      if (sendResult.success) {
        await updateMessageLog(messageLog.id, {
          status: 'sent',
          sent_at: new Date().toISOString(),
          error_message: null,
        });
        result.success++;
        console.log(`[funnel-processor] 퍼널 ${funnel.id} 스텝 ${currentStep.step_order} 발송 성공`);
      } else {
        await updateMessageLog(messageLog.id, {
          status: 'failed',
          error_message: sendResult.error || '알 수 없는 에러',
        });
        result.failed++;
        console.error(`[funnel-processor] 퍼널 ${funnel.id} 스텝 ${currentStep.step_order} 발송 실패: ${sendResult.error}`);
      }

      // 7. 다음 스텝으로 진행 (발송 성공 시에만)
      if (sendResult.success) {
        const nextStepOrder = funnel.current_step + 1;
        const nextStep = steps.find(s => s.step_order === nextStepOrder);

        let nextSendAt: string | null = null;
        if (nextStep) {
          const nextDate = new Date();
          nextDate.setHours(nextDate.getHours() + nextStep.delay_hours);
          nextSendAt = nextDate.toISOString();
        }

        await advanceFunnelStep(funnel.id, nextSendAt);
      } else {
        // 발송 실패 시: 5분 후 재시도하도록 next_send_at 복구
        const retryDate = new Date();
        retryDate.setMinutes(retryDate.getMinutes() + 5);
        await supabase
          .from('customer_funnels')
          .update({ next_send_at: retryDate.toISOString() })
          .eq('id', funnel.id);
        console.log(`[funnel-processor] 퍼널 ${funnel.id} 발송 실패 - 5분 후 재시도 예정`);
      }

    } catch (err) {
      const errorMsg = `퍼널 ${funnel.id} 처리 중 예외: ${err instanceof Error ? err.message : String(err)}`;
      console.error(`[funnel-processor] ${errorMsg}`);
      result.errors.push(errorMsg);
      result.failed++;
    }
  }

  console.log(`[funnel-processor] 처리 완료: ${result.processed}건 처리, ${result.success}건 성공, ${result.failed}건 실패`);

  return result;
}

/**
 * 퍼널 시작 시 첫 스텝의 next_send_at 설정
 */
export async function initializeFunnel(
  customerFunnelId: string,
  templateId: string
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const steps = await getStepsByTemplateId(templateId);
  const firstStep = steps.find(s => s.step_order === 0) || steps[0];

  if (!firstStep) {
    console.error(`[funnel-processor] 템플릿 ${templateId}에 스텝이 없습니다.`);
    return false;
  }

  const nextSendAt = new Date();
  nextSendAt.setHours(nextSendAt.getHours() + firstStep.delay_hours);

  const { error } = await supabase
    .from('customer_funnels')
    .update({ next_send_at: nextSendAt.toISOString() })
    .eq('id', customerFunnelId);

  if (error) {
    console.error('[funnel-processor] next_send_at 설정 실패:', error);
    return false;
  }

  console.log(`[funnel-processor] 퍼널 ${customerFunnelId} 초기화 완료. 첫 발송: ${nextSendAt.toISOString()}`);
  return true;
}
