import { NextRequest, NextResponse } from 'next/server';
import { processPendingFunnels } from '@/lib/funnel-processor';

export const dynamic = 'force-dynamic';

/**
 * Vercel Cron 엔드포인트 - 매 1분마다 호출
 * 발송 대기 중인 퍼널 메시지를 처리
 */
export async function GET(request: NextRequest) {
  // CRON_SECRET으로 인증 확인
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const result = await processPendingFunnels();

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error('[cron/process-funnels] 에러:', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
