import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  BuildingType,
  ScopeType,
  FrameType,
  GlassType,
  SpacerType,
  OpeningType,
  WindowItem,
  AdditionalOptions,
  EstimateResult,
} from '@/types';
import { DEFAULT_WINDOW_SIZES } from '@/lib/constants/estimate';

// 단계별 데이터 타입
interface Step1Data {
  buildingType: BuildingType | null;
  buildingAge: 'new' | 'under_10' | 'over_10' | 'over_20' | null;
}

interface Step2Data {
  scopeType: ScopeType | null;
  floorSize: string | null;
  demolition: boolean;
}

interface Step3Data {
  frameType: FrameType | null;
  glassType: GlassType | null;
  spacerType: SpacerType | null;
}

interface Step4Data {
  inputMode: 'simple' | 'detailed';
  windows: WindowItem[];
}

interface Step5Data {
  options: AdditionalOptions;
}

// 전체 스토어 상태
interface EstimateState {
  currentStep: number;
  completedSteps: number[];

  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;

  result: EstimateResult | null;
  isCalculating: boolean;
  error: string | null;
}

// 액션
interface EstimateActions {
  // 네비게이션
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // 단계별 데이터 설정
  setStep1: (data: Partial<Step1Data>) => void;
  setStep2: (data: Partial<Step2Data>) => void;
  setStep3: (data: Partial<Step3Data>) => void;
  setStep4InputMode: (mode: 'simple' | 'detailed') => void;

  // 창문 관리
  addWindow: (window: Omit<WindowItem, 'id'>) => void;
  updateWindow: (id: string, data: Partial<WindowItem>) => void;
  removeWindow: (id: string) => void;
  setDefaultWindows: (floorSize: string) => void;

  // 옵션 설정
  setOptions: (options: Partial<AdditionalOptions>) => void;

  // 견적 계산
  calculateEstimate: () => void;
  setResult: (result: EstimateResult) => void;

  // 유효성 검사
  isStepValid: (step: number) => boolean;

  // 리셋
  reset: () => void;
}

type EstimateStore = EstimateState & EstimateActions;

const generateId = () => `window_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const initialState: EstimateState = {
  currentStep: 1,
  completedSteps: [],

  step1: {
    buildingType: null,
    buildingAge: null,
  },

  step2: {
    scopeType: null,
    floorSize: null,
    demolition: false,
  },

  step3: {
    frameType: null,
    glassType: null,
    spacerType: null,
  },

  step4: {
    inputMode: 'simple',
    windows: [],
  },

  step5: {
    options: {
      screen: 'none',
      safetyLock: false,
      fallPrevention: false,
      blindBuiltin: false,
      installation: 'standard',
      demolition: false,
    },
  },

  result: null,
  isCalculating: false,
  error: null,
};

export const useEstimateStore = create<EstimateStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      goToStep: (step) => {
        const state = get();
        if (step <= state.currentStep || state.completedSteps.includes(step - 1)) {
          set((draft) => {
            draft.currentStep = step;
          });
        }
      },

      nextStep: () => {
        const state = get();
        if (state.currentStep < 6 && state.isStepValid(state.currentStep)) {
          set((draft) => {
            if (!draft.completedSteps.includes(draft.currentStep)) {
              draft.completedSteps.push(draft.currentStep);
            }
            draft.currentStep += 1;
          });
        }
      },

      prevStep: () => {
        set((draft) => {
          if (draft.currentStep > 1) {
            draft.currentStep -= 1;
          }
        });
      },

      setStep1: (data) => {
        set((draft) => {
          draft.step1 = { ...draft.step1, ...data };
          draft.result = null;
        });
      },

      setStep2: (data) => {
        set((draft) => {
          draft.step2 = { ...draft.step2, ...data };
          draft.result = null;
        });
      },

      setStep3: (data) => {
        set((draft) => {
          draft.step3 = { ...draft.step3, ...data };
          draft.result = null;
        });
      },

      setStep4InputMode: (mode) => {
        set((draft) => {
          draft.step4.inputMode = mode;
        });
      },

      addWindow: (window) => {
        set((draft) => {
          draft.step4.windows.push({
            ...window,
            id: generateId(),
          });
          draft.result = null;
        });
      },

      updateWindow: (id, data) => {
        set((draft) => {
          const index = draft.step4.windows.findIndex((w) => w.id === id);
          if (index !== -1) {
            draft.step4.windows[index] = { ...draft.step4.windows[index], ...data };
            draft.result = null;
          }
        });
      },

      removeWindow: (id) => {
        set((draft) => {
          draft.step4.windows = draft.step4.windows.filter((w) => w.id !== id);
          draft.result = null;
        });
      },

      setDefaultWindows: (floorSize) => {
        const defaultConfigs: Record<string, { location: string; openingType: OpeningType; count: number }[]> = {
          '10': [
            { location: '거실', openingType: 'sliding', count: 1 },
            { location: '방1', openingType: 'casement', count: 1 },
            { location: '방2', openingType: 'casement', count: 1 },
            { location: '주방', openingType: 'casement', count: 1 },
            { location: '욕실', openingType: 'project', count: 1 },
          ],
          '10_20': [
            { location: '거실', openingType: 'sliding', count: 1 },
            { location: '안방', openingType: 'casement', count: 1 },
            { location: '방1', openingType: 'casement', count: 1 },
            { location: '방2', openingType: 'casement', count: 1 },
            { location: '주방', openingType: 'casement', count: 1 },
            { location: '욕실', openingType: 'project', count: 1 },
          ],
          '20_30': [
            { location: '거실', openingType: 'sliding', count: 2 },
            { location: '안방', openingType: 'casement', count: 1 },
            { location: '방1', openingType: 'casement', count: 1 },
            { location: '방2', openingType: 'casement', count: 1 },
            { location: '방3', openingType: 'casement', count: 1 },
            { location: '주방', openingType: 'casement', count: 1 },
            { location: '욕실', openingType: 'project', count: 1 },
          ],
          '30_40': [
            { location: '거실', openingType: 'sliding', count: 2 },
            { location: '안방', openingType: 'casement', count: 2 },
            { location: '방1', openingType: 'casement', count: 1 },
            { location: '방2', openingType: 'casement', count: 1 },
            { location: '방3', openingType: 'casement', count: 1 },
            { location: '주방', openingType: 'casement', count: 1 },
            { location: '욕실1', openingType: 'project', count: 1 },
            { location: '욕실2', openingType: 'project', count: 1 },
          ],
          '40': [
            { location: '거실', openingType: 'sliding', count: 3 },
            { location: '안방', openingType: 'casement', count: 2 },
            { location: '방1', openingType: 'casement', count: 1 },
            { location: '방2', openingType: 'casement', count: 1 },
            { location: '방3', openingType: 'casement', count: 1 },
            { location: '방4', openingType: 'casement', count: 1 },
            { location: '주방', openingType: 'casement', count: 1 },
            { location: '욕실1', openingType: 'project', count: 1 },
            { location: '욕실2', openingType: 'project', count: 1 },
          ],
        };

        const configs = defaultConfigs[floorSize] || defaultConfigs['20_30'];

        set((draft) => {
          draft.step4.windows = configs.map((config) => ({
            id: generateId(),
            location: config.location,
            openingType: config.openingType,
            width: DEFAULT_WINDOW_SIZES[config.openingType].width,
            height: DEFAULT_WINDOW_SIZES[config.openingType].height,
            quantity: config.count,
          }));
        });
      },

      setOptions: (options) => {
        set((draft) => {
          draft.step5.options = { ...draft.step5.options, ...options };
          draft.result = null;
        });
      },

      calculateEstimate: () => {
        const state = get();

        set((draft) => {
          draft.isCalculating = true;
          draft.error = null;
        });

        try {
          // 가격 계산 로직
          const { step3, step4, step5 } = state;

          const PRICE_TABLE = {
            frame: {
              pvc_standard: 85000,
              pvc_premium: 120000,
              hisash: 180000,
              system: 250000,
            },
            glass: {
              double_22: 35000,
              double_24: 42000,
              lowe_24: 58000,
              triple_39: 85000,
            },
            spacer: {
              aluminum: 0,
              tps: 15000,
            },
            options: {
              screen_standard: 15000,
              screen_micro: 25000,
              safety_lock: 20000,
              fall_prevention: 45000,
              blind_builtin: 120000,
            },
            installation: {
              self: 0,
              standard: 80000,
              premium: 120000,
            },
          };

          let subtotal = 0;
          const breakdown: EstimateResult['breakdown'] = [];

          step4.windows.forEach((window, index) => {
            const area = (window.width / 1000) * (window.height / 1000);

            // 프레임 비용
            if (step3.frameType) {
              const framePrice = PRICE_TABLE.frame[step3.frameType] * area * window.quantity;
              breakdown.push({
                category: '프레임',
                item: `${window.location} - ${getFrameName(step3.frameType)}`,
                quantity: window.quantity,
                unit: 'm²',
                unitPrice: PRICE_TABLE.frame[step3.frameType],
                totalPrice: Math.round(framePrice),
              });
              subtotal += framePrice;
            }

            // 유리 비용
            if (step3.glassType) {
              const glassPrice = PRICE_TABLE.glass[step3.glassType] * area * window.quantity;
              breakdown.push({
                category: '유리',
                item: `${window.location} - ${getGlassName(step3.glassType)}`,
                quantity: window.quantity,
                unit: 'm²',
                unitPrice: PRICE_TABLE.glass[step3.glassType],
                totalPrice: Math.round(glassPrice),
              });
              subtotal += glassPrice;
            }

            // 간봉 비용 (TPS)
            if (step3.spacerType === 'tps') {
              const spacerPrice = PRICE_TABLE.spacer.tps * area * window.quantity;
              breakdown.push({
                category: '단열간봉',
                item: `${window.location} - TPS`,
                quantity: window.quantity,
                unit: 'm²',
                unitPrice: PRICE_TABLE.spacer.tps,
                totalPrice: Math.round(spacerPrice),
              });
              subtotal += spacerPrice;
            }

            // 설치비
            if (step5.options.installation !== 'self') {
              const installPrice = PRICE_TABLE.installation[step5.options.installation] * window.quantity;
              subtotal += installPrice;
            }
          });

          // 추가 옵션
          const totalWindows = step4.windows.reduce((sum, w) => sum + w.quantity, 0);

          if (step5.options.screen !== 'none') {
            const screenPrice = step5.options.screen === 'micro'
              ? PRICE_TABLE.options.screen_micro
              : PRICE_TABLE.options.screen_standard;
            const totalScreenPrice = screenPrice * totalWindows;
            breakdown.push({
              category: '방충망',
              item: step5.options.screen === 'micro' ? '미세먼지 방충망' : '일반 방충망',
              quantity: totalWindows,
              unit: '개',
              unitPrice: screenPrice,
              totalPrice: totalScreenPrice,
            });
            subtotal += totalScreenPrice;
          }

          if (step5.options.safetyLock) {
            const lockPrice = PRICE_TABLE.options.safety_lock * totalWindows;
            breakdown.push({
              category: '옵션',
              item: '잠금장치',
              quantity: totalWindows,
              unit: '개',
              unitPrice: PRICE_TABLE.options.safety_lock,
              totalPrice: lockPrice,
            });
            subtotal += lockPrice;
          }

          // 설치비 총액
          if (step5.options.installation !== 'self') {
            const installTotal = PRICE_TABLE.installation[step5.options.installation] * totalWindows;
            breakdown.push({
              category: '시공',
              item: step5.options.installation === 'premium' ? '프리미엄 설치' : '기본 설치',
              quantity: totalWindows,
              unit: '개',
              unitPrice: PRICE_TABLE.installation[step5.options.installation],
              totalPrice: installTotal,
            });
          }

          // 할인 계산
          let discountRate = 0;
          if (subtotal >= 10000000) discountRate = 10;
          else if (subtotal >= 5000000) discountRate = 7;
          else if (subtotal >= 3000000) discountRate = 5;

          const discountAmount = Math.floor(subtotal * (discountRate / 100));
          const totalAmount = Math.round(subtotal - discountAmount);

          const result: EstimateResult = {
            subtotal: Math.round(subtotal),
            discountRate,
            discountAmount,
            totalAmount,
            breakdown,
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          };

          set((draft) => {
            draft.result = result;
            draft.isCalculating = false;
            if (!draft.completedSteps.includes(5)) {
              draft.completedSteps.push(5);
            }
            draft.currentStep = 6;
          });
        } catch (error) {
          set((draft) => {
            draft.error = '견적 계산 중 오류가 발생했습니다.';
            draft.isCalculating = false;
          });
        }
      },

      setResult: (result) => {
        set((draft) => {
          draft.result = result;
        });
      },

      isStepValid: (step) => {
        const state = get();

        switch (step) {
          case 1:
            return state.step1.buildingType !== null;
          case 2:
            return state.step2.scopeType !== null && state.step2.floorSize !== null;
          case 3:
            return state.step3.frameType !== null && state.step3.glassType !== null;
          case 4:
            return state.step4.windows.length > 0;
          case 5:
            return true;
          case 6:
            return state.result !== null;
          default:
            return false;
        }
      },

      reset: () => {
        set(() => ({ ...initialState }));
      },
    })),
    {
      name: 'changho-estimate',
      partialize: (state) => ({
        step1: state.step1,
        step2: state.step2,
        step3: state.step3,
        step4: state.step4,
        step5: state.step5,
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
      }),
    }
  )
);

// 헬퍼 함수
function getFrameName(type: FrameType): string {
  const names: Record<FrameType, string> = {
    pvc_standard: 'PVC 일반',
    pvc_premium: 'PVC 프리미엄',
    hisash: '하이샤시',
    system: '시스템창호',
  };
  return names[type];
}

function getGlassName(type: GlassType): string {
  const names: Record<GlassType, string> = {
    double_22: '복층유리 22mm',
    double_24: '복층유리 24mm',
    lowe_24: '로이유리 24mm',
    triple_39: '삼중유리 39mm',
  };
  return names[type];
}
