import { NextRequest, NextResponse } from "next/server";

// 가격표 (실제로는 DB에서 조회)
const priceTable: Record<string, Record<string, number>> = {
  PVC: {
    복층유리: 150000,
    삼중유리: 200000,
    로이유리: 220000,
    방음유리: 250000,
  },
  하이샤시: {
    복층유리: 200000,
    삼중유리: 250000,
    로이유리: 280000,
    방음유리: 320000,
  },
  시스템창호: {
    복층유리: 280000,
    삼중유리: 350000,
    로이유리: 400000,
    방음유리: 450000,
  },
  알루미늄: {
    복층유리: 180000,
    삼중유리: 230000,
    로이유리: 260000,
    방음유리: 300000,
  },
};

// 창문 종류별 계수
const windowTypeMultiplier: Record<string, number> = {
  거실: 1.2,
  방: 1.0,
  욕실: 0.8,
  베란다: 1.3,
  현관: 1.5,
};

// 시공비 (㎡당)
const laborCostPerSqm = 50000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { windowType, width, height, frameType, glassType, quantity = 1 } = body;

    // 필수 필드 검증
    if (!windowType || !width || !height || !frameType || !glassType) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 기본 단가 조회
    const basePrice = priceTable[frameType]?.[glassType];
    if (!basePrice) {
      return NextResponse.json(
        { error: "유효하지 않은 프레임 또는 유리 종류입니다." },
        { status: 400 }
      );
    }

    // 면적 계산 (mm → ㎡)
    const areaInSqm = (width / 1000) * (height / 1000);

    // 창문 종류 계수
    const multiplier = windowTypeMultiplier[windowType] || 1.0;

    // 자재비 계산
    const materialCost = Math.round(basePrice * areaInSqm * multiplier * quantity);

    // 시공비 계산
    const laborCost = Math.round(laborCostPerSqm * areaInSqm * quantity);

    // 총 비용
    const totalCost = materialCost + laborCost;

    // 범위 계산 (실제 견적은 ±15% 범위)
    const minPrice = Math.round(totalCost * 0.85);
    const maxPrice = Math.round(totalCost * 1.15);

    return NextResponse.json({
      success: true,
      calculation: {
        windowType,
        frameType,
        glassType,
        dimensions: {
          width,
          height,
          areaSqm: Math.round(areaInSqm * 100) / 100,
        },
        quantity,
        breakdown: {
          materialCost,
          laborCost,
          totalCost,
        },
        priceRange: {
          min: minPrice,
          max: maxPrice,
        },
      },
      disclaimer: "실제 가격은 현장 실측 후 확정됩니다. 본 견적은 참고용입니다.",
    });
  } catch (error) {
    console.error("가격 계산 실패:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
