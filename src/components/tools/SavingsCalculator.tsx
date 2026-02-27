'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Home, Flame, Clock, TrendingUp, PiggyBank, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AGE_OPTIONS = [
  { label: '5년 미만', lossRate: 0.1 },
  { label: '5~10년', lossRate: 0.2 },
  { label: '10~15년', lossRate: 0.3 },
  { label: '15년 이상', lossRate: 0.4 },
];

const RECOVERY_RATE = 0.7;
const COST_PER_PYEONG = 100000; // 10만원

export default function SavingsCalculator() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState(32);
  const [monthlyBill, setMonthlyBill] = useState(15);
  const [ageIndex, setAgeIndex] = useState(-1);

  const showResult = step === 3;

  const result = useMemo(() => {
    if (ageIndex < 0) return null;
    const lossRate = AGE_OPTIONS[ageIndex].lossRate;
    const annualSaving = monthlyBill * 10000 * 12 * lossRate * RECOVERY_RATE;
    const estimatedCost = area * COST_PER_PYEONG;
    const paybackYears = estimatedCost / annualSaving;
    const tenYearSaving = annualSaving * 10;
    return {
      annualSaving: Math.round(annualSaving),
      tenYearSaving: Math.round(tenYearSaving),
      estimatedCost: Math.round(estimatedCost),
      paybackYears: Math.round(paybackYears * 10) / 10,
    };
  }, [area, monthlyBill, ageIndex]);

  const formatWon = (value: number) => {
    if (value >= 10000) {
      return `${Math.round(value / 10000)}만원`;
    }
    return `${value.toLocaleString()}원`;
  };

  const canNext = step === 2 ? ageIndex >= 0 : true;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-[#767676] mb-2">
          <span>{showResult ? '결과 확인' : `${step + 1} / 3 단계`}</span>
          <span>{showResult ? '100' : Math.round(((step + 1) / 3) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#EF4444] rounded-full"
            animate={{ width: showResult ? '100%' : `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: 평수 */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-[#EF4444]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">집 평수를 선택해주세요</h3>
              <p className="text-[#767676]">대략적인 평수를 선택해주세요</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-[#EEEEEE]">
              <div className="text-center mb-6">
                <span className="text-5xl font-extrabold text-[#EF4444]">{area}</span>
                <span className="text-xl text-[#767676] ml-2">평</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444]"
              />
              <div className="flex justify-between text-sm text-[#767676] mt-2">
                <span>10평</span>
                <span>60평</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: 월 난방비 */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#FFF3E8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-[#FF6F0F]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">월 난방비는 얼마인가요?</h3>
              <p className="text-[#767676]">겨울철 기준 대략적인 금액을 선택해주세요</p>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-[#EEEEEE]">
              <div className="text-center mb-6">
                <span className="text-5xl font-extrabold text-[#FF6F0F]">{monthlyBill}</span>
                <span className="text-xl text-[#767676] ml-2">만원</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6F0F]"
              />
              <div className="flex justify-between text-sm text-[#767676] mt-2">
                <span>5만원</span>
                <span>30만원</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: 창호 연식 */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#1E1E1E]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">현재 창호 연식은?</h3>
              <p className="text-[#767676]">설치한 지 얼마나 되었나요?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {AGE_OPTIONS.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => setAgeIndex(i)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                    ageIndex === i
                      ? 'border-[#EF4444] bg-[#FEF2F2]'
                      : 'border-[#EEEEEE] bg-white hover:border-gray-300'
                  }`}
                >
                  <span className={`text-lg font-bold block ${
                    ageIndex === i ? 'text-[#EF4444]' : 'text-[#1E1E1E]'
                  }`}>
                    {opt.label}
                  </span>
                  <span className="text-sm text-[#767676]">
                    에너지 손실률 {opt.lossRate * 100}%
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {showResult && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-[#EF4444]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">절감 예상 결과</h3>
              <p className="text-[#767676]">
                {area}평 / 월 {monthlyBill}만원 / {AGE_OPTIONS[ageIndex].label} 기준
              </p>
            </div>

            {/* Result Cards */}
            <div className="grid gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <PiggyBank className="w-6 h-6" />
                  <span className="font-bold">연간 절감 예상액</span>
                </div>
                <p className="text-4xl font-extrabold">
                  {formatWon(result.annualSaving)}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border-2 border-[#EEEEEE]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#FF6F0F]" />
                    <span className="text-sm font-bold text-[#767676]">10년 누적 절감</span>
                  </div>
                  <p className="text-2xl font-extrabold text-[#1E1E1E]">
                    {formatWon(result.tenYearSaving)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 border-2 border-[#EEEEEE]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#2AC1BC]" />
                    <span className="text-sm font-bold text-[#767676]">투자 회수 기간</span>
                  </div>
                  <p className="text-2xl font-extrabold text-[#1E1E1E]">
                    약 {result.paybackYears}년
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Payback Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#EEEEEE] mb-8"
            >
              <h4 className="font-bold text-[#1E1E1E] mb-4">시공비 회수 그래프</h4>
              <div className="space-y-3">
                {[1, 3, 5, 7, 10].map((year) => {
                  const cumulative = result.annualSaving * year;
                  const percentage = Math.min(100, (cumulative / result.estimatedCost) * 100);
                  const isPayback = cumulative >= result.estimatedCost;
                  return (
                    <div key={year}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#767676]">{year}년차</span>
                        <span className={`font-bold ${isPayback ? 'text-[#EF4444]' : 'text-[#1E1E1E]'}`}>
                          {formatWon(cumulative)}
                          {isPayback && ' (회수 완료!)'}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${isPayback ? 'bg-[#EF4444]' : 'bg-[#FF6F0F]'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + year * 0.05 }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-xs text-[#767676] mt-2">
                  * 예상 시공비 {formatWon(result.estimatedCost)} 기준 (평당 약 10만원 참고값)
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button asChild size="lg" className="w-full bg-[#EF4444] hover:bg-[#DC2626] rounded-xl text-lg py-6">
                <Link href="/estimate">
                  무료 견적 받기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <button
                onClick={() => { setStep(0); setAgeIndex(-1); }}
                className="w-full text-center text-[#767676] hover:text-[#1E1E1E] transition-colors text-sm font-medium py-2"
              >
                다시 계산하기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {!showResult && (
        <div className="flex gap-4 mt-10">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#EEEEEE] rounded-xl font-bold text-[#767676] hover:border-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              이전
            </button>
          )}
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              canNext
                ? 'bg-[#1E1E1E] text-white hover:bg-[#292929]'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            {step === 2 ? '결과 보기' : '다음'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
