"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle, Clock } from "lucide-react";

const mockInstallations = [
  { id: 1, area: "서울 강남구", product: "시스템창호", status: "completed", date: "2024.01.02", lat: 37.4979, lng: 127.0276 },
  { id: 2, area: "경기 성남시", product: "하이샤시", status: "in_progress", date: "2024.01.03", lat: 37.4449, lng: 127.1389 },
  { id: 3, area: "서울 송파구", product: "PVC창호", status: "completed", date: "2024.01.02", lat: 37.5145, lng: 127.1059 },
  { id: 4, area: "인천 연수구", product: "시스템창호", status: "completed", date: "2024.01.01", lat: 37.4106, lng: 126.6782 },
  { id: 5, area: "경기 수원시", product: "하이샤시", status: "in_progress", date: "2024.01.03", lat: 37.2636, lng: 127.0286 },
];

const stats = [
  { label: "이번 달 시공", value: "47건" },
  { label: "오늘 시공", value: "3건" },
  { label: "진행 중", value: "2건" },
];

export default function InstallationMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <MapPin className="w-5 h-5" />실시간 시공 현황
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">전국 어디서나 창호의민족</h2>
          <p className="text-muted max-w-2xl mx-auto">수도권 전 지역 시공 가능! 실시간으로 진행되는 시공 현황을 확인하세요.</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="bg-hanji rounded-2xl p-4 shadow-lg aspect-video flex items-center justify-center">
              <div className="text-center text-muted">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                <p className="font-medium">카카오맵 연동 예정</p>
                <p className="text-sm mt-1">전국 시공 현황을 지도에서 확인하세요</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-hanji rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-hanji rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-ink text-lg mb-4">최근 시공 현황</h3>
              <div className="space-y-3">
                {mockInstallations.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-3">
                    {item.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink truncate">{item.area}</p>
                      <p className="text-xs text-muted">{item.product}</p>
                    </div>
                    <span className={"text-xs px-2 py-1 rounded-full " + (item.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                      {item.status === "completed" ? "완료" : "진행중"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
