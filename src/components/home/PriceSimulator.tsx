"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
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
    <section id="simulator" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-gold font-medium mb-4">
            <Calculator className="w-5 h-5" />셀프 견적 시뮬레이터
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">우리집 창호, 얼마일까?</h2>
          <p className="text-muted max-w-2xl mx-auto">창문 종류와 사이즈, 프레임, 유리 옵션을 선택하면 예상 가격을 바로 확인할 수 있습니다.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="mb-8">
              <label className="block text-ink font-bold mb-3">창문 종류</label>
              <div className="grid grid-cols-5 gap-2">
                {windowTypes.map((type) => (
                  <button key={type.id} onClick={() => setWindowType(type.id)} className={windowType === type.id ? "py-3 px-2 rounded-lg text-sm font-medium bg-gold text-white" : "py-3 px-2 rounded-lg text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{type.label}</button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-ink font-bold mb-3">사이즈 (mm)</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted mb-1 block">가로</label>
                  <input type="range" min="500" max="4000" step="100" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-gold" />
                  <div className="text-center font-bold text-ink mt-1">{width} mm</div>
                </div>
                <div>
                  <label className="text-sm text-muted mb-1 block">세로</label>
                  <input type="range" min="500" max="3000" step="100" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-gold" />
                  <div className="text-center font-bold text-ink mt-1">{height} mm</div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-ink font-bold mb-3">프레임 종류</label>
              <div className="grid grid-cols-2 gap-2">
                {frameTypes.map((type) => (
                  <button key={type.id} onClick={() => setFrameType(type.id)} className={frameType === type.id ? "py-3 px-4 rounded-lg text-sm font-medium bg-gold text-white" : "py-3 px-4 rounded-lg text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{type.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-ink font-bold mb-3">유리 옵션</label>
              <div className="grid grid-cols-2 gap-2">
                {glassTypes.map((type) => (
                  <button key={type.id} onClick={() => setGlassType(type.id)} className={glassType === type.id ? "py-3 px-4 rounded-lg text-sm font-medium bg-gold text-white" : "py-3 px-4 rounded-lg text-sm font-medium bg-gray-100 text-ink hover:bg-gray-200"}>{type.label}</button>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-ink text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-400 mb-2">예상 견적</h3>
              <div className="text-5xl md:text-6xl font-bold text-gold mb-4">{formatPrice(estimatedPrice)}<span className="text-2xl text-gray-400 ml-2">원</span></div>
              <p className="text-gray-400 text-sm mb-8">* 실제 견적은 현장 실측 후 안내드립니다.</p>
              <div className="bg-white/10 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">창문</span><span>{windowTypes.find((w) => w.id === windowType)?.label}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">사이즈</span><span>{width} x {height} mm</span></div>
                <div className="flex justify-between"><span className="text-gray-400">프레임</span><span>{frameTypes.find((f) => f.id === frameType)?.label}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">유리</span><span>{glassTypes.find((g) => g.id === glassType)?.label}</span></div>
              </div>
            </div>
            <Link href="/inquiry" className="mt-8 inline-flex items-center justify-center gap-2 bg-seal text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-seal/90 transition-colors w-full">정확한 견적 받기<ArrowRight className="w-5 h-5" /></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
