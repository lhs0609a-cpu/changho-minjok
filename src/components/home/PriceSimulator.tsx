"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const windowTypes = [
  { id: "living", label: "거실", multiplier: 1.2 },
  { id: "veranda", label: "베란다", multiplier: 1.0 },
  { id: "room", label: "방", multiplier: 0.9 },
  { id: "bathroom", label: "욕실", multiplier: 0.8 },
  { id: "entrance", label: "현관", multiplier: 1.3 },
];

const frameTypes = [
  { id: "pvc", label: "PVC창호", price: 150000 },
  { id: "hisash", label: "하이샤시", price: 200000 },
  { id: "system", label: "시스템창호", price: 280000 },
  { id: "aluminum", label: "알루미늄", price: 180000 },
];

const glassTypes = [
  { id: "double", label: "복층유리", price: 0 },
  { id: "triple", label: "삼중유리", price: 50000 },
  { id: "lowE", label: "로이유리", price: 70000 },
  { id: "sound", label: "방음유리", price: 80000 },
];

export default function PriceSimulator() {
  const [windowType, setWindowType] = useState("living");
  const [frameType, setFrameType] = useState("system");
  const [glassType, setGlassType] = useState("double");
  const [width, setWidth] = useState(2000);
  const [height, setHeight] = useState(1500);

  const estimatedPrice = useMemo(() => {
    const window = windowTypes.find((w) => w.id === windowType);
    const frame = frameTypes.find((f) => f.id === frameType);
    const glass = glassTypes.find((g) => g.id === glassType);
    if (!window || !frame || !glass) return 0;
    const areaSqm = (width / 1000) * (height / 1000);
    const basePrice = (frame.price + glass.price) * areaSqm * window.multiplier;
    return Math.round(basePrice + 50000);
  }, [windowType, frameType, glassType, width, height]);

  const formatPrice = (price: number) => new Intl.NumberFormat("ko-KR").format(price);

  return (
    <section id="simulator" className="relative py-24 section-gradient overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 tag tag-cyber mb-4">
            <Calculator className="w-4 h-4" />
            셀프 견적 시뮬레이터
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            우리집 창호, <span className="gradient-text-static">얼마일까?</span>
          </h2>
          <p className="text-smoke max-w-2xl mx-auto">
            창문 종류와 사이즈, 프레임, 유리 옵션을 선택하면 예상 가격을 바로 확인할 수 있습니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 옵션 선택 패널 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            {/* 창문 종류 */}
            <div className="mb-8">
              <label className="block text-cream font-bold mb-4">창문 종류</label>
              <div className="grid grid-cols-5 gap-2">
                {windowTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setWindowType(type.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                      windowType === type.id
                        ? "aurora-gradient text-white shadow-lg glow-purple"
                        : "bg-white/5 text-silver hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 사이즈 슬라이더 */}
            <div className="mb-8">
              <label className="block text-cream font-bold mb-4">사이즈 (mm)</label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-smoke mb-2 block">가로</label>
                  <input
                    type="range"
                    min="500"
                    max="4000"
                    step="100"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-electric [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:glow-purple"
                  />
                  <div className="text-center font-bold text-cream mt-2 text-lg">{width} mm</div>
                </div>
                <div>
                  <label className="text-sm text-smoke mb-2 block">세로</label>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="100"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neon [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:glow-pink"
                  />
                  <div className="text-center font-bold text-cream mt-2 text-lg">{height} mm</div>
                </div>
              </div>
            </div>

            {/* 프레임 종류 */}
            <div className="mb-8">
              <label className="block text-cream font-bold mb-4">프레임 종류</label>
              <div className="grid grid-cols-2 gap-3">
                {frameTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setFrameType(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-4 px-4 rounded-xl text-sm font-medium transition-all ${
                      frameType === type.id
                        ? "bg-electric/20 text-electric border-2 border-electric glow-purple"
                        : "bg-white/5 text-silver hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 유리 옵션 */}
            <div>
              <label className="block text-cream font-bold mb-4">유리 옵션</label>
              <div className="grid grid-cols-2 gap-3">
                {glassTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setGlassType(type.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-4 px-4 rounded-xl text-sm font-medium transition-all ${
                      glassType === type.id
                        ? "bg-cyber/20 text-cyber border-2 border-cyber glow-cyan"
                        : "bg-white/5 text-silver hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 결과 패널 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-border rounded-3xl"
          >
            <div className="bg-night rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden">
              {/* 배경 글로우 */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-electric/20 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon/10 rounded-full blur-[80px]" />

              <div className="relative">
                <h3 className="text-lg font-medium text-smoke mb-2">예상 견적</h3>
                <motion.div
                  key={estimatedPrice}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl md:text-6xl font-bold gradient-text mb-4"
                >
                  {formatPrice(estimatedPrice)}
                  <span className="text-2xl text-smoke ml-2">원</span>
                </motion.div>
                <p className="text-smoke text-sm mb-8">* 실제 견적은 현장 실측 후 안내드립니다.</p>

                {/* 선택 요약 */}
                <div className="glass rounded-2xl p-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-smoke">창문</span>
                    <span className="text-cream font-medium">{windowTypes.find((w) => w.id === windowType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-smoke">사이즈</span>
                    <span className="text-cream font-medium">{width} x {height} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-smoke">프레임</span>
                    <span className="text-cream font-medium">{frameTypes.find((f) => f.id === frameType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-smoke">유리</span>
                    <span className="text-cream font-medium">{glassTypes.find((g) => g.id === glassType)?.label}</span>
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative mt-8">
                <Link
                  href="/inquiry"
                  className="btn-glow-cyan flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg w-full"
                >
                  <Sparkles className="w-5 h-5" />
                  정확한 견적 받기
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
