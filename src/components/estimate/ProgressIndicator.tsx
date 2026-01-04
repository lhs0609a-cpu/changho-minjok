'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEstimateStore } from '@/stores/useEstimateStore';

interface Step {
  number: number;
  title: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  const { completedSteps, goToStep } = useEstimateStore();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          const isClickable = isCompleted || step.number <= currentStep;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => isClickable && goToStep(step.number)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center gap-2 transition-all',
                  isClickable && 'cursor-pointer hover:opacity-80',
                  !isClickable && 'cursor-not-allowed opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted && 'bg-green-500 text-white',
                    isCurrent && !isCompleted && 'bg-blue-600 text-white',
                    !isCurrent && !isCompleted && 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isCurrent && 'text-blue-600',
                    !isCurrent && 'text-gray-500'
                  )}
                >
                  {step.title}
                </span>
              </button>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={cn(
                      'h-0.5 transition-colors',
                      completedSteps.includes(step.number)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            {currentStep}단계 / {steps.length}단계
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {steps[currentStep - 1].title}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
