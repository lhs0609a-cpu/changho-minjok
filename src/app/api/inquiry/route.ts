import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 견적 문의 제출
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      address,
      addressDetail,
      housingType,
      area,
      product,
      reasons,
      budget,
      message,
      privacyAgree,
      marketingAgree,
    } = body;

    // 필수 필드 검증
    if (!name || !phone || !privacyAgree) {
      return NextResponse.json(
        { error: "필수 정보를 입력해주세요." },
        { status: 400 }
      );
    }

    // 전화번호 형식 검증
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/-/g, ""))) {
      return NextResponse.json(
        { error: "올바른 전화번호 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // 문의 저장
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        address: address || null,
        addressDetail: addressDetail || null,
        housingType: housingType || null,
        area: area || null,
        product: product || null,
        reasons: reasons || [],
        budget: budget || null,
        message: message || null,
        privacyAgree,
        marketingAgree: marketingAgree || false,
        status: "PENDING",
      },
    });

    // TODO: 관리자 알림 발송 (카카오톡, 이메일 등)

    return NextResponse.json(
      {
        success: true,
        message: "견적 문의가 접수되었습니다.",
        inquiryId: inquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("견적 문의 저장 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

// 견적 문의 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (status && status !== "전체") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("견적 문의 조회 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
