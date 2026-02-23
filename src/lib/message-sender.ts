// 채널별 메시지 발송 추상화 레이어

import { sendAlimtalk } from './kakao-alimtalk';

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * 통합 메시지 발송 함수
 * 채널에 따라 적절한 발송 방법을 선택
 */
export async function sendMessage(
  channel: 'kakao' | 'sms' | 'email',
  phone: string,
  title: string,
  message: string,
  linkUrl?: string
): Promise<SendResult> {
  switch (channel) {
    case 'kakao':
      return sendViaKakao(phone, title, message, linkUrl);
    case 'sms':
      return sendViaSms(phone, title, message);
    case 'email':
      // TODO: email 채널 구현 시 inquiry에서 email 필드를 조회하도록 변경 필요
      return sendViaEmail(phone, title, message);
    default:
      return { success: false, error: `지원하지 않는 채널: ${channel}` };
  }
}

/**
 * 카카오 알림톡 발송
 * - templateCode: 카카오에 사전 등록된 템플릿 코드
 * - message: 실제 메시지 본문 (템플릿과 일치해야 함)
 * - title: 강조 제목
 */
async function sendViaKakao(
  phone: string,
  title: string,
  message: string,
  linkUrl?: string
): Promise<SendResult> {
  const result = await sendAlimtalk({
    phone,
    templateCode: process.env.KAKAO_BIZM_TEMPLATE_CODE || 'changho_funnel_msg',
    message,
    title,
    linkUrl,
  });

  return {
    success: result.success,
    messageId: result.messageId,
    error: result.error,
  };
}

/**
 * SMS 발송 (미구현 - placeholder)
 */
async function sendViaSms(
  phone: string,
  title: string,
  message: string
): Promise<SendResult> {
  console.log(`[SMS 미구현] To: ${phone}, Title: ${title}, Message: ${message}`);
  return {
    success: false,
    error: 'SMS 발송은 아직 구현되지 않았습니다.',
  };
}

/**
 * 이메일 발송 (미구현 - placeholder)
 */
async function sendViaEmail(
  _email: string,
  title: string,
  message: string
): Promise<SendResult> {
  console.log(`[Email 미구현] Title: ${title}, Message: ${message}`);
  return {
    success: false,
    error: '이메일 발송은 아직 구현되지 않았습니다.',
  };
}
