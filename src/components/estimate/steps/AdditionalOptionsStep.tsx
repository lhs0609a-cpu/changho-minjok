'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

export default function AdditionalOptionsStep() {
  const { step5, setOptions, calculateEstimate, prevStep, isCalculating } = useEstimateStore();

  const handleCalculate = () => {
    calculateEstimate();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          추가 옵션을 선택해주세요
        </h2>
        <p className="text-gray-600">
          필요한 옵션을 선택하시면 견적에 반영됩니다.
        </p>
      </div>

      {/* Screen Options */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          방충망
        </Label>
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          {[
            { value: 'none', label: '선택 안함', desc: '방충망 없음' },
            { value: 'standard', label: '일반 방충망', desc: '기본 방충망' },
            { value: 'micro', label: '미세먼지 방충망', desc: '초미세 필터' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setOptions({ screen: option.value as 'none' | 'standard' | 'micro' })}
              className={cn(
                'p-4 rounded-lg border-2 transition-all text-left',
                step5.options.screen === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Options */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          안전 옵션
        </Label>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <Card
            onClick={() => setOptions({ safetyLock: !step5.options.safetyLock })}
            className={cn(
              'p-4 cursor-pointer transition-all',
              step5.options.safetyLock
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={step5.options.safetyLock}
                readOnly
                className="w-5 h-5 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">잠금장치</div>
                <div className="text-sm text-gray-500">안전 잠금장치 추가</div>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => setOptions({ fallPrevention: !step5.options.fallPrevention })}
            className={cn(
              'p-4 cursor-pointer transition-all',
              step5.options.fallPrevention
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            )}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={step5.options.fallPrevention}
                readOnly
                className="w-5 h-5 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">추락방지대</div>
                <div className="text-sm text-gray-500">어린이 안전용</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Installation Options */}
      <div>
        <Label className="block text-lg font-medium text-gray-900 mb-4">
          시공 방식
        </Label>
        <div className="grid grid-cols-3 gap-4 max-w-2xl">
          {[
            { value: 'self', label: '자가 시공', desc: '직접 설치' },
            { value: 'standard', label: '기본 시공', desc: '전문가 설치' },
            { value: 'premium', label: '프리미엄 시공', desc: '프리미엄 서비스' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setOptions({ installation: option.value as 'self' | 'standard' | 'premium' })}
              className={cn(
                'p-4 rounded-lg border-2 transition-all text-left',
                step5.options.installation === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3 max-w-2xl">
        <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600">
          창호의 민족은 <strong>내외부 전체 가스켓 타입</strong>을 기본 적용합니다.
          시간이 지나도 변치 않는 깔끔함과 기밀성을 보장합니다.
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="outline" size="lg">
          이전
        </Button>
        <Button
          onClick={handleCalculate}
          size="lg"
          className="px-12"
          disabled={isCalculating}
        >
          {isCalculating ? '계산 중...' : '견적 확인하기'}
        </Button>
      </div>
    </div>
  );
}
