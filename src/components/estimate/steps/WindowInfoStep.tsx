'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEstimateStore } from '@/stores/useEstimateStore';
import { OPENING_TYPES, WINDOW_LOCATIONS, DEFAULT_WINDOW_SIZES } from '@/lib/constants/estimate';
import { cn } from '@/lib/utils';
import { OpeningType, WindowItem } from '@/types';
import { Plus, Trash2, Copy } from 'lucide-react';

export default function WindowInfoStep() {
  const {
    step4,
    setStep4InputMode,
    addWindow,
    updateWindow,
    removeWindow,
    nextStep,
    prevStep,
    isStepValid,
  } = useEstimateStore();

  const handleAddWindow = () => {
    addWindow({
      location: '거실',
      openingType: 'sliding',
      width: DEFAULT_WINDOW_SIZES.sliding.width,
      height: DEFAULT_WINDOW_SIZES.sliding.height,
      quantity: 1,
    });
  };

  const handleOpeningTypeChange = (id: string, type: OpeningType) => {
    updateWindow(id, {
      openingType: type,
      width: DEFAULT_WINDOW_SIZES[type].width,
      height: DEFAULT_WINDOW_SIZES[type].height,
    });
  };

  const totalWindows = step4.windows.reduce((sum, w) => sum + w.quantity, 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          창문 정보를 입력해주세요
        </h2>
        <p className="text-gray-600">
          각 창문의 위치, 종류, 크기를 입력해주세요.
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setStep4InputMode('simple')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            step4.inputMode === 'simple'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          간편 입력
        </button>
        <button
          onClick={() => setStep4InputMode('detailed')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            step4.inputMode === 'detailed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          상세 입력
        </button>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <span className="text-blue-800">
          총 <strong>{step4.windows.length}</strong>개 항목,{' '}
          <strong>{totalWindows}</strong>개 창문
        </span>
      </div>

      {/* Window List */}
      <div className="space-y-4">
        {step4.windows.map((window, index) => (
          <Card key={window.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                {index + 1}
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-4">
                {/* Location */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-xs text-gray-500 mb-1 block">위치</Label>
                  <Select
                    value={window.location}
                    onValueChange={(v) => updateWindow(window.id, { location: v })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {WINDOW_LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Opening Type */}
                <div className="col-span-2 md:col-span-1">
                  <Label className="text-xs text-gray-500 mb-1 block">개폐방식</Label>
                  <Select
                    value={window.openingType}
                    onValueChange={(v) => handleOpeningTypeChange(window.id, v as OpeningType)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OPENING_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Width */}
                {step4.inputMode === 'detailed' && (
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">가로 (mm)</Label>
                    <Input
                      type="number"
                      value={window.width}
                      onChange={(e) =>
                        updateWindow(window.id, { width: parseInt(e.target.value) || 0 })
                      }
                      className="h-9"
                    />
                  </div>
                )}

                {/* Height */}
                {step4.inputMode === 'detailed' && (
                  <div>
                    <Label className="text-xs text-gray-500 mb-1 block">세로 (mm)</Label>
                    <Input
                      type="number"
                      value={window.height}
                      onChange={(e) =>
                        updateWindow(window.id, { height: parseInt(e.target.value) || 0 })
                      }
                      className="h-9"
                    />
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <Label className="text-xs text-gray-500 mb-1 block">수량</Label>
                  <Input
                    type="number"
                    min={1}
                    value={window.quantity}
                    onChange={(e) =>
                      updateWindow(window.id, { quantity: parseInt(e.target.value) || 1 })
                    }
                    className="h-9"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => {
                      addWindow({
                        location: window.location,
                        openingType: window.openingType,
                        width: window.width,
                        height: window.height,
                        quantity: window.quantity,
                      });
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeWindow(window.id)}
                    disabled={step4.windows.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Window Button */}
      <div className="text-center">
        <Button
          type="button"
          variant="outline"
          onClick={handleAddWindow}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          창문 추가
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={prevStep} variant="outline" size="lg">
          이전
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isStepValid(4)}
          size="lg"
          className="px-12"
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}
