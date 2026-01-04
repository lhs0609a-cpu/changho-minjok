'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { BUILDING_TYPES } from '@/lib/constants/estimate';
import { cn } from '@/lib/utils';
import { BuildingType } from '@/types';

export default function BuildingTypeStep() {
  const { step1, setStep1, nextStep, isStepValid } = useEstimateStore();

  const handleSelect = (type: BuildingType) => {
    setStep1({ buildingType: type });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          건물 유형을 선택해주세요
        </h2>
        <p className="text-gray-600">
          시공하실 건물의 유형을 선택하면 맞춤 견적을 제공해드립니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {BUILDING_TYPES.map((type) => (
          <Card
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={cn(
              'p-6 cursor-pointer transition-all hover:shadow-md text-center',
              step1.buildingType === type.value
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            )}
          >
            <div className="text-4xl mb-3">{type.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1">{type.label}</h3>
            <p className="text-sm text-gray-500">{type.description}</p>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={nextStep}
          disabled={!isStepValid(1)}
          size="lg"
          className="px-12"
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}
