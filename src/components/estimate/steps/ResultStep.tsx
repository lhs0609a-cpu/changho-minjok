'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { BUILDING_TYPES, FRAME_TYPES, GLASS_TYPES, SPACER_TYPES, FLOOR_SIZES } from '@/lib/constants/estimate';
import { Phone, Calendar, Download, Share2, RotateCcw } from 'lucide-react';

export default function ResultStep() {
  const { step1, step2, step3, step4, step5, result, reset } = useEstimateStore();

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">견적 정보가 없습니다.</p>
        <Button onClick={reset} className="mt-4">
          처음부터 시작
        </Button>
      </div>
    );
  }

  const buildingTypeLabel = BUILDING_TYPES.find(t => t.value === step1.buildingType)?.label || '';
  const floorSizeLabel = FLOOR_SIZES.find(s => s.value === step2.floorSize)?.label || '';
  const frameLabel = FRAME_TYPES.find(f => f.value === step3.frameType)?.label || '';
  const glassLabel = GLASS_TYPES.find(g => g.value === step3.glassType)?.label || '';
  const spacerLabel = SPACER_TYPES.find(s => s.value === step3.spacerType)?.label || '';
  const totalWindows = step4.windows.reduce((sum, w) => sum + w.quantity, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          예상 견적이 완성되었습니다
        </h2>
        <p className="text-gray-600">
          아래 예상 금액은 참고용이며, 정확한 견적은 현장 실측 후 확정됩니다.
        </p>
      </div>

      {/* Estimate Summary Card */}
      <Card className="p-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">예상 견적서</h3>
              <p className="text-sm text-gray-500">창호의 민족</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">견적일</p>
              <p className="font-medium">{new Date().toLocaleDateString('ko-KR')}</p>
            </div>
          </div>
        </div>

        {/* Summary Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <span className="text-gray-500">건물 유형</span>
            <p className="font-medium">{buildingTypeLabel}</p>
          </div>
          <div>
            <span className="text-gray-500">시공 범위</span>
            <p className="font-medium">{step2.scopeType === 'full' ? '전체 리모델링' : '부분 교체'} ({floorSizeLabel})</p>
          </div>
          <div>
            <span className="text-gray-500">프레임</span>
            <p className="font-medium">{frameLabel}</p>
          </div>
          <div>
            <span className="text-gray-500">유리</span>
            <p className="font-medium">{glassLabel}</p>
          </div>
          <div>
            <span className="text-gray-500">간봉</span>
            <p className="font-medium">{spacerLabel}</p>
          </div>
          <div>
            <span className="text-gray-500">창문 수량</span>
            <p className="font-medium">{totalWindows}개</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t pt-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-3">비용 상세</h4>
          <div className="space-y-2 text-sm">
            {result.breakdown.slice(0, 6).map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{item.item}</span>
                <span className="font-medium">{formatPrice(item.totalPrice)}원</span>
              </div>
            ))}
            {result.breakdown.length > 6 && (
              <p className="text-gray-500 text-xs">외 {result.breakdown.length - 6}개 항목</p>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">소계</span>
            <span>{formatPrice(result.subtotal)}원</span>
          </div>
          {result.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>할인 ({result.discountRate}%)</span>
              <span>-{formatPrice(result.discountAmount)}원</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>예상 총액</span>
            <span className="text-blue-600">약 {formatPrice(result.totalAmount)}원</span>
          </div>
          <p className="text-xs text-gray-500 text-right">(VAT 별도)</p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            ⚠️ 본 견적은 예상 금액이며, 정확한 견적은 현장 실측 후 확정됩니다.
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
        <Button asChild size="lg" className="flex-1">
          <Link href="/support/inquiry" className="gap-2">
            <Phone className="w-4 h-4" />
            무료 상담 신청
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="flex-1">
          <Link href="/support/tour" className="gap-2">
            <Calendar className="w-4 h-4" />
            공장 견학 예약
          </Link>
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          PDF 저장
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          공유하기
        </Button>
        <Button variant="ghost" size="sm" className="gap-2" onClick={reset}>
          <RotateCcw className="w-4 h-4" />
          다시 견적받기
        </Button>
      </div>
    </div>
  );
}
