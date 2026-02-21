// 카카오 비즈메시지(bizmsg) 알림톡 API 클라이언트

const BIZM_API_URL = 'https://alimtalk-api.bizmsg.kr';

interface SendAlimtalkParams {
  phone: string;
  templateCode: string;
  variables: Record<string, string>;
  linkUrl?: string;
}

interface AlimtalkResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface DeliveryResult {
  messageId: string;
  status: 'success' | 'failed' | 'pending';
  resultCode?: string;
  resultMessage?: string;
}

function getConfig() {
  const apiKey = process.env.KAKAO_BIZM_API_KEY;
  const senderKey = process.env.KAKAO_BIZM_SENDER_KEY;

  if (!apiKey || !senderKey) {
    return null;
  }

  return { apiKey, senderKey };
}

/**
 * 카카오 알림톡 발송
 */
export async function sendAlimtalk({
  phone,
  templateCode,
  variables,
  linkUrl,
}: SendAlimtalkParams): Promise<AlimtalkResponse> {
  const config = getConfig();

  if (!config) {
    console.warn('[kakao-alimtalk] API 키가 설정되지 않았습니다. 발송을 건너뜁니다.');
    return {
      success: false,
      error: 'KAKAO_BIZM_API_KEY 또는 KAKAO_BIZM_SENDER_KEY가 설정되지 않았습니다.',
    };
  }

  // 전화번호 정규화 (하이픈 제거, 국가코드 추가)
  const normalizedPhone = phone.replace(/-/g, '').replace(/^0/, '82');

  const body = {
    senderKey: config.senderKey,
    templateCode,
    receiver: normalizedPhone,
    message: Object.entries(variables).reduce(
      (msg, [key, value]) => msg.replace(`#{${key}}`, value),
      templateCode
    ),
    ...(linkUrl && {
      button: [
        {
          name: '자세히 보기',
          type: 'WL',
          url_mobile: linkUrl,
          url_pc: linkUrl,
        },
      ],
    }),
  };

  try {
    const response = await fetch(`${BIZM_API_URL}/v2/sender/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'userId': config.apiKey,
      },
      body: JSON.stringify([body]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[kakao-alimtalk] API 에러:', response.status, errorText);
      return {
        success: false,
        error: `API 에러 (${response.status}): ${errorText}`,
      };
    }

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      const first = result[0];
      if (first.code === 'success' || first.code === '0000') {
        return {
          success: true,
          messageId: first.msgid || first.messageId,
        };
      }
      return {
        success: false,
        error: `발송 실패: ${first.code} - ${first.message || first.msg}`,
      };
    }

    return {
      success: false,
      error: '알 수 없는 응답 형식',
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[kakao-alimtalk] 발송 에러:', errorMessage);
    return {
      success: false,
      error: `네트워크 에러: ${errorMessage}`,
    };
  }
}

/**
 * 발송 결과 조회
 */
export async function getDeliveryResult(requestId: string): Promise<DeliveryResult | null> {
  const config = getConfig();

  if (!config) {
    console.warn('[kakao-alimtalk] API 키가 설정되지 않았습니다.');
    return null;
  }

  try {
    const response = await fetch(`${BIZM_API_URL}/v2/sender/report?msgid=${requestId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'userId': config.apiKey,
      },
    });

    if (!response.ok) {
      console.error('[kakao-alimtalk] 결과 조회 에러:', response.status);
      return null;
    }

    const result = await response.json();

    if (Array.isArray(result) && result.length > 0) {
      const first = result[0];
      return {
        messageId: requestId,
        status: first.code === '0000' ? 'success' : 'failed',
        resultCode: first.code,
        resultMessage: first.message || first.msg,
      };
    }

    return null;
  } catch (err) {
    console.error('[kakao-alimtalk] 결과 조회 에러:', err);
    return null;
  }
}
