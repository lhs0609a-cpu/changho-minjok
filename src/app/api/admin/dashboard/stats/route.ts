import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 통계 데이터 조회
    const [
      totalCustomers,
      monthlyCustomers,
      pendingInquiries,
      monthlyInquiries,
      scheduledInstallations,
      completedInstallations,
    ] = await Promise.all([
      // 전체 고객 수
      prisma.customer.count(),
      // 이번 달 신규 고객
      prisma.customer.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      // 대기 중인 문의
      prisma.inquiry.count({
        where: { status: "PENDING" },
      }),
      // 이번 달 문의
      prisma.inquiry.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
      // 예정된 시공
      prisma.installation.count({
        where: { status: "SCHEDULED" },
      }),
      // 이번 달 완료된 시공
      prisma.installation.count({
        where: {
          status: "COMPLETED",
          completedDate: { gte: startOfMonth },
        },
      }),
    ]);

    // 최근 문의 목록
    const recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        phone: true,
        housingType: true,
        product: true,
        status: true,
        createdAt: true,
      },
    });

    // 오늘 일정
    const todaySchedule = await prisma.installation.findMany({
      where: {
        scheduledDate: {
          gte: startOfDay,
          lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { scheduledDate: "asc" },
    });

    return NextResponse.json({
      stats: {
        totalCustomers,
        monthlyCustomers,
        pendingInquiries,
        monthlyInquiries,
        scheduledInstallations,
        completedInstallations,
      },
      recentInquiries,
      todaySchedule,
    });
  } catch (error) {
    console.error("대시보드 통계 조회 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
