'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { FRAME_TYPES, GLASS_TYPES, SPACER_TYPES } from '@/lib/constants/estimate';
import { cn } from '@/lib/utils';
import { FrameType, GlassType, SpacerType } from '@/types';
import { Info } from 'lucide-react';

export default function WindowSpecStep() {
  const { step3, setStep3, nextStep, prevStep, isStepValid } = useEstimateStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          창호 사양을 선택해주세요
        </h2>
        <p className="text-gray-600">
          원하시는 프레임, 유리, 간봉 종류를 선택해주세요.
        </p>
      </div>

      {/* Frame Type */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          프레임 종류
        </Label>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FRAME_TYPES.map((frame) => (
            <Card
              key={frame.value}
              onClick={() => setStep3({ frameType: frame.value })}
              className={cn(
                'p-5 cursor-pointer transition-all hover:shadow-md',
                step3.frameType === frame.value
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{frame.label}</h3>
                <div className="flex gap-0.5">
                  {[...Array(frame.priceLevel)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-sm">₩</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">{frame.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Glass Type */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          유리 종류
        </Label>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GLASS_TYPES.map((glass) => (
            <Card
              key={glass.value}
              onClick={() => setStep3({ glassType: glass.value })}
              className={cn(
                'p-5 cursor-pointer transition-all hover:shadow-md relative',
                step3.glassType === glass.value
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              )}
            >
              {glass.badge && (
                <span
                  className={cn(
                    'absolute -top-2 -right-2 px-2 py-0.5 text-xs font-medium rounded-full',
                    glass.badge === '추천'
                      ? 'bg-blue-500 text-white'
                      : 'bg-amber-500 text-white'
                  )}
                >
                  {glass.badge}
                </span>
              )}
              <h3 className="font-semibold text-gray-900 mb-1">{glass.label}</h3>
              <p className="text-sm text-gray-500">{glass.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Spacer Type */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          간봉 타입
        </Label>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          {SPACER_TYPES.map((spacer) => (
            <Card
              key={spacer.value}
              onClick={() => setStep3({ spacerType: spacer.value })}
              className={cn(
                'p-5 cursor-pointer transition-all hover:shadow-md',
                step3.spacerType === spacer.value
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              )}
            >
              <h3 className="font-semibold text-gray-900 mb-1">{spacer.label}</h3>
              <p className="text-sm text-gray-500">{spacer.description}</p>
            </Card>
          ))}
        </div>

        {/* TPS Info */}
        {step3.spacerType === 'tps' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3 max-w-2xl">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>TPS 단열 간봉</strong>은 창호의 민족 자체 스마트 팩토리에서 생산합니다.
              알루미늄 간봉 대비 단열·결로 방지 성능이 탁월합니다.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="outline" size="lg">
          이전
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isStepValid(3)}
          size="lg"
          className="px-12"
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}
