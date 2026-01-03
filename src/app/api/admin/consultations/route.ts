export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// 상담 기록 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const customerId = searchParams.get("customerId");
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};

    if (customerId) {
      where.customerId = customerId;
    }

    if (type && type !== "전체") {
      where.type = type;
    }

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.consultation.count({ where }),
    ]);

    return NextResponse.json({
      consultations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("상담 기록 조회 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 상담 기록 등록
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const body = await request.json();
    const { customerId, type, content, nextAction, nextDate } = body;

    if (!customerId || !type || !content) {
      return NextResponse.json(
        { error: "고객, 상담 유형, 상담 내용은 필수입니다." },
        { status: 400 }
      );
    }

    // 고객 존재 확인
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "존재하지 않는 고객입니다." },
        { status: 404 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        customerId,
        userId: session.user.id,
        type,
        content,
        nextAction: nextAction || null,
        nextDate: nextDate ? new Date(nextDate) : null,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, consultation },
      { status: 201 }
    );
  } catch (error) {
    console.error("상담 기록 등록 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
