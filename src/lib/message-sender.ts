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
      return sendViaEmail(phone, title, message);
    default:
      return { success: false, error: `지원하지 않는 채널: ${channel}` };
  }
}

/**
 * 카카오 알림톡 발송
 */
async function sendViaKakao(
  phone: string,
  title: string,
  message: string,
  linkUrl?: string
): Promise<SendResult> {
  // 알림톡은 사전 등록된 템플릿 코드가 필요함
  // 여기서는 범용 알림 템플릿을 사용 (비즈메시지에서 사전 등록 필요)
  const result = await sendAlimtalk({
    phone,
    templateCode: 'changho_funnel_msg',
    variables: {
      title,
      message,
      ...(linkUrl && { link: linkUrl }),
    },
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
