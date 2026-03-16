import { NextRequest, NextResponse } from 'next/server';
import { searchAdvisor, getDisplayPhone } from '@/lib/advisor-db';
import { searchStaff } from '@/lib/constants/staff';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q');

    if (!query || !query.trim()) {
      return NextResponse.json(
        { error: '검색어를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Try DB first
    const advisor = await searchAdvisor(query);

    if (advisor) {
      return NextResponse.json({
        found: true,
        member: {
          name: advisor.name,
          phone: advisor.phone,
          displayPhone: getDisplayPhone(advisor),
          email: advisor.email,
          position: advisor.position,
        },
      });
    }

    // Fallback to hardcoded staff.ts
    const staffMember = searchStaff(query);

    if (staffMember) {
      return NextResponse.json({
        found: true,
        member: staffMember,
      });
    }

    return NextResponse.json({ found: false });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
