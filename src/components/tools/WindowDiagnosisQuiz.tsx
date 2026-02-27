'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Wind, Droplets, Volume2, Clock, Flame, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Question {
  icon: typeof Wind;
  question: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    icon: Wind,
    question: '겨울에 창문 근처에서 외풍을 느끼시나요?',
    options: [
      { label: '전혀 없음', score: 0 },
      { label: '가끔', score: 1 },
      { label: '자주', score: 2 },
      { label: '매우 심함', score: 3 },
    ],
  },
  {
    icon: Droplets,
    question: '창문에 결로(물방울)가 생기나요?',
    options: [
      { label: '전혀 없음', score: 0 },
      { label: '가끔', score: 1 },
      { label: '자주', score: 2 },
      { label: '매일', score: 3 },
    ],
  },
  {
    icon: Volume2,
    question: '외부 소음이 얼마나 들리나요?',
    options: [
      { label: '거의 안들림', score: 0 },
      { label: '약간', score: 1 },
      { label: '많이', score: 2 },
      { label: '매우 심함', score: 3 },
    ],
  },
  {
    icon: Clock,
    question: '현재 창호 연식은?',
    options: [
      { label: '5년 미만', score: 0 },
      { label: '5~10년', score: 1 },
      { label: '10~15년', score: 2 },
      { label: '15년 이상', score: 3 },
    ],
  },
  {
    icon: Flame,
    question: '월 난방비가 어느 정도인가요?',
    options: [
      { label: '적정 수준', score: 0 },
      { label: '약간 높음', score: 1 },
      { label: '높음', score: 2 },
      { label: '매우 높음', score: 3 },
    ],
  },
];

interface ResultType {
  grade: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: typeof CheckCircle;
  title: string;
  description: string;
}

function getResult(score: number): ResultType {
  if (score <= 4) {
    return {
      grade: '양호',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle,
      title: '창호 상태가 양호합니다',
      description: '당장 급하지는 않지만, 정기적인 점검을 권장드립니다. 실리콘 보수나 하드웨어 점검만으로도 성능을 유지할 수 있습니다.',
    };
  }
  if (score <= 9) {
    return {
      grade: '주의',
      color: 'text-[#FF6F0F]',
      bgColor: 'bg-[#FFF3E8]',
      borderColor: 'border-[#FF6F0F]/20',
      icon: AlertTriangle,
      title: '창호 교체를 검토할 시기입니다',
      description: '에너지 효율이 떨어지기 시작했습니다. 지금 교체하면 난방비를 크게 줄일 수 있고, 결로와 소음 문제도 개선됩니다.',
    };
  }
  return {
    grade: '시급',
    color: 'text-[#EF4444]',
    bgColor: 'bg-[#FEF2F2]',
    borderColor: 'border-[#EF4444]/20',
    icon: XCircle,
    title: '즉시 교체를 권장합니다',
    description: `현재 창호 상태로 인해 연간 약 ${Math.round(score * 8)}만원 이상의 난방비가 낭비되고 있을 수 있습니다. 빠른 교체로 쾌적한 실내 환경과 에너지 절감을 동시에 누리세요.`,
  };
}

export default function WindowDiagnosisQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const totalScore = useMemo(() => {
    return answers.reduce((sum, a) => sum + (a >= 0 ? a : 0), 0);
  }, [answers]);

  const result = useMemo(() => getResult(totalScore), [totalScore]);

  const handleSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = score;
    setAnswers(newAnswers);

    // Auto-advance after selection with a brief delay
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers(Array(QUESTIONS.length).fill(-1));
    setShowResult(false);
  };

  const q = QUESTIONS[currentQ];
  const Icon = q.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-[#767676] mb-2">
          <span>{showResult ? '진단 완료' : `${currentQ + 1} / ${QUESTIONS.length} 문항`}</span>
          <span>{showResult ? '100' : Math.round(((currentQ + 1) / QUESTIONS.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#EF4444] rounded-full"
            animate={{ width: showResult ? '100%' : `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Question */}
        {!showResult && (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-[#EF4444]" />
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#1E1E1E]">{q.question}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.score)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                    answers[currentQ] === opt.score
                      ? 'border-[#EF4444] bg-[#FEF2F2]'
                      : 'border-[#EEEEEE] bg-white hover:border-gray-300 hover:-translate-y-1'
                  }`}
                >
                  <span className={`text-lg font-bold ${
                    answers[currentQ] === opt.score ? 'text-[#EF4444]' : 'text-[#1E1E1E]'
                  }`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {showResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Score Circle */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className={`w-32 h-32 ${result.bgColor} border-4 ${result.borderColor} rounded-full flex flex-col items-center justify-center mx-auto mb-6`}
              >
                <span className={`text-4xl font-extrabold ${result.color}`}>{totalScore}</span>
                <span className="text-sm text-[#767676]">/ 15점</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${result.bgColor} ${result.color} mb-4`}>
                  진단 결과: {result.grade}
                </span>
                <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-3">{result.title}</h3>
                <p className="text-[#767676] leading-relaxed max-w-md mx-auto">{result.description}</p>
              </motion.div>
            </div>

            {/* Answer Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 border-2 border-[#EEEEEE] mb-8"
            >
              <h4 className="font-bold text-[#1E1E1E] mb-4">항목별 결과</h4>
              <div className="space-y-3">
                {QUESTIONS.map((question, i) => {
                  const score = answers[i];
                  const barColor = score <= 1 ? 'bg-green-500' : score === 2 ? 'bg-[#FF6F0F]' : 'bg-[#EF4444]';
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#767676] truncate mr-2">{question.question}</span>
                        <span className="font-bold text-[#1E1E1E] shrink-0">{question.options[score]?.label}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${barColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(score / 3) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <Button asChild size="lg" className="w-full bg-[#EF4444] hover:bg-[#DC2626] rounded-xl text-lg py-6">
                <Link href="/estimate">
                  무료 견적 받기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/tools/savings-calculator"
                  className="text-center py-3 px-4 border-2 border-[#EEEEEE] rounded-xl text-[#767676] hover:border-gray-300 transition-colors text-sm font-bold"
                >
                  난방비 절감 계산기
                </Link>
                <button
                  onClick={handleReset}
                  className="text-center py-3 px-4 border-2 border-[#EEEEEE] rounded-xl text-[#767676] hover:border-gray-300 transition-colors text-sm font-bold"
                >
                  다시 진단하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {!showResult && (
        <div className="flex gap-4 mt-10">
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ(currentQ - 1)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-[#EEEEEE] rounded-xl font-bold text-[#767676] hover:border-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              이전
            </button>
          )}
        </div>
      )}
    </div>
  );
}
