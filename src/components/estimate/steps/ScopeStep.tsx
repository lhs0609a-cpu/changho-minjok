'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { FLOOR_SIZES } from '@/lib/constants/estimate';
import { cn } from '@/lib/utils';
import { ScopeType } from '@/types';
import { Home, Layers } from 'lucide-react';

const scopeOptions: { value: ScopeType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'full',
    label: '전체 리모델링',
    description: '모든 창호를 교체합니다',
    icon: <Layers className="w-8 h-8" />,
  },
  {
    value: 'partial',
    label: '부분 교체',
    description: '일부 창호만 교체합니다',
    icon: <Home className="w-8 h-8" />,
  },
];

export default function ScopeStep() {
  const { step2, setStep2, nextStep, prevStep, isStepValid, setDefaultWindows } = useEstimateStore();

  const handleScopeSelect = (scope: ScopeType) => {
    setStep2({ scopeType: scope });
  };

  const handleFloorSizeSelect = (size: string) => {
    setStep2({ floorSize: size });
    // 평형대에 따라 기본 창문 설정
    setDefaultWindows(size);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          시공 범위를 선택해주세요
        </h2>
        <p className="text-gray-600">
          전체 창호 교체인지, 일부만 교체하는지 선택해주세요.
        </p>
      </div>

      {/* Scope Selection */}
      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {scopeOptions.map((option) => (
          <Card
            key={option.value}
            onClick={() => handleScopeSelect(option.value)}
            className={cn(
              'p-6 cursor-pointer transition-all hover:shadow-md',
              step2.scopeType === option.value
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  'p-3 rounded-lg',
                  step2.scopeType === option.value
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-500'
                )}
              >
                {option.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floor Size Selection */}
      {step2.scopeType && (
        <div className="max-w-2xl mx-auto">
          <Label className="block text-lg font-medium text-gray-900 mb-4">
            평형대를 선택해주세요
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {FLOOR_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => handleFloorSizeSelect(size.value)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all text-center',
                  step2.floorSize === size.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                )}
              >
                <div className="font-semibold">{size.label}</div>
                <div className="text-xs text-gray-500 mt-1">
                  약 {size.windows}개 창문
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Demolition Option */}
      {step2.scopeType && step2.floorSize && (
        <div className="max-w-2xl mx-auto">
          <Label className="block text-lg font-medium text-gray-900 mb-4">
            기존 창호 철거가 필요한가요?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setStep2({ demolition: true })}
              className={cn(
                'p-4 rounded-lg border-2 transition-all',
                step2.demolition
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              )}
            >
              필요합니다
            </button>
            <button
              onClick={() => setStep2({ demolition: false })}
              className={cn(
                'p-4 rounded-lg border-2 transition-all',
                !step2.demolition
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              )}
            >
              필요없습니다
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 max-w-2xl mx-auto">
        <Button onClick={prevStep} variant="outline" size="lg">
          이전
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isStepValid(2)}
          size="lg"
          className="px-12"
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}
