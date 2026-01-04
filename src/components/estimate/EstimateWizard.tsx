'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEstimateStore } from '@/stores/useEstimateStore';
import ProgressIndicator from './ProgressIndicator';
import BuildingTypeStep from './steps/BuildingTypeStep';
import ScopeStep from './steps/ScopeStep';
import WindowSpecStep from './steps/WindowSpecStep';
import WindowInfoStep from './steps/WindowInfoStep';
import AdditionalOptionsStep from './steps/AdditionalOptionsStep';
import ResultStep from './steps/ResultStep';

const steps = [
  { number: 1, title: '건물 유형' },
  { number: 2, title: '시공 범위' },
  { number: 3, title: '창호 사양' },
  { number: 4, title: '창문 정보' },
  { number: 5, title: '추가 옵션' },
  { number: 6, title: '견적 확인' },
];

export default function EstimateWizard() {
  const { currentStep, reset } = useEstimateStore();

  // 컴포넌트 언마운트 시 리셋하지 않음 (persist 사용)
  useEffect(() => {
    // 페이지 이탈 시 확인
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 1 && currentStep < 6) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BuildingTypeStep />;
      case 2:
        return <ScopeStep />;
      case 3:
        return <WindowSpecStep />;
      case 4:
        return <WindowInfoStep />;
      case 5:
        return <AdditionalOptionsStep />;
      case 6:
        return <ResultStep />;
      default:
        return <BuildingTypeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            견적 시뮬레이션
          </h1>
          <p className="text-gray-600">
            간단한 정보 입력만으로 예상 견적을 확인하세요
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Reset Button */}
        {currentStep > 1 && currentStep < 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                if (confirm('처음부터 다시 시작하시겠습니까?')) {
                  reset();
                }
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              처음부터 다시하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
