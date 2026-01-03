"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Upload } from "lucide-react";

const frameColors = [
  { id: "black", label: "블랙", color: "#1a1a1a" },
  { id: "white", label: "화이트", color: "#ffffff" },
  { id: "walnut", label: "월넛", color: "#5D432C" },
  { id: "oak", label: "오크", color: "#C4A484" },
  { id: "gray", label: "그레이", color: "#808080" },
  { id: "navy", label: "네이비", color: "#1B365D" },
];

const glassStyles = [
  { id: "clear", label: "투명", opacity: 0.1 },
  { id: "tinted", label: "틴팅", opacity: 0.4 },
  { id: "frosted", label: "불투명", opacity: 0.7 },
  { id: "lowE", label: "로이", opacity: 0.2 },
];

export default function WindowSimulator() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedGlass, setSelectedGlass] = useState("clear");

  const currentColor = frameColors.find((c) => c.id === selectedColor);
  const currentGlass = glassStyles.find((g) => g.id === selectedGlass);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-gold font-medium mb-4">
            <Palette className="w-5 h-5" />우리집 창호 시뮬레이터
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">내 집에 어울리는 창호는?</h2>
          <p className="text-muted max-w-2xl mx-auto">프레임 색상과 유리 타입을 선택해 우리 집에 어울리는 창호를 미리 확인해보세요.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-hanji rounded-2xl p-8 shadow-lg">
            <div className="aspect-video relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
              <div className="absolute inset-8 border-8 rounded-lg" style={{ borderColor: currentColor?.color, backgroundColor: "rgba(135, 206, 235, " + (currentGlass?.opacity || 0.1) + ")" }}>
                <div className="w-full h-full flex items-center justify-center text-muted">
                  <span className="text-sm">창호 미리보기</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                {currentColor?.label} + {currentGlass?.label}
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-xl">
              <div className="flex items-center gap-2 text-muted text-sm">
                <Upload className="w-4 h-4" />
                <span>우리집 사진 업로드 (AR 미리보기 준비중)</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div className="bg-hanji rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-ink text-lg mb-4">프레임 색상</h3>
              <div className="grid grid-cols-3 gap-3">
                {frameColors.map((color) => (
                  <button key={color.id} onClick={() => setSelectedColor(color.id)} className={selectedColor === color.id ? "p-4 rounded-xl border-2 border-gold bg-white" : "p-4 rounded-xl border-2 border-transparent bg-white hover:border-gray-200"}>
                    <div className="w-full h-8 rounded-md mb-2 border" style={{ backgroundColor: color.color }} />
                    <span className="text-sm font-medium text-ink">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-hanji rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-ink text-lg mb-4">유리 타입</h3>
              <div className="grid grid-cols-2 gap-3">
                {glassStyles.map((glass) => (
                  <button key={glass.id} onClick={() => setSelectedGlass(glass.id)} className={selectedGlass === glass.id ? "p-4 rounded-xl border-2 border-gold bg-white text-left" : "p-4 rounded-xl border-2 border-transparent bg-white hover:border-gray-200 text-left"}>
                    <div className="w-full h-8 rounded-md mb-2 border" style={{ backgroundColor: "rgba(135, 206, 235, " + glass.opacity + ")" }} />
                    <span className="text-sm font-medium text-ink">{glass.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
