"use client";

import { useState } from "react";
import { Save, User, Bell, Lock, Building } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "프로필", icon: User },
    { id: "company", name: "회사 정보", icon: Building },
    { id: "notifications", name: "알림 설정", icon: Bell },
    { id: "security", name: "보안", icon: Lock },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-ink">설정</h1>
        <p className="text-muted mt-1">계정 및 시스템 설정을 관리합니다.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* 탭 네비게이션 */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors " +
                  (activeTab === tab.id
                    ? "bg-gold text-white"
                    : "text-muted hover:bg-gray-100 hover:text-ink")}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 설정 내용 */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ink">프로필 설정</h2>

                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    관
                  </div>
                  <button className="px-4 py-2 border rounded-lg text-ink hover:bg-gray-50 transition-colors">
                    사진 변경
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">이름</label>
                    <input
                      type="text"
                      defaultValue="관리자"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">이메일</label>
                    <input
                      type="email"
                      defaultValue="admin@changho-minjok.co.kr"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">전화번호</label>
                    <input
                      type="tel"
                      defaultValue="010-1234-5678"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">부서</label>
                    <input
                      type="text"
                      defaultValue="경영지원팀"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  <Save className="w-5 h-5" />
                  저장
                </button>
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ink">회사 정보</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">회사명</label>
                    <input
                      type="text"
                      defaultValue="창호의민족"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">대표전화</label>
                    <input
                      type="tel"
                      defaultValue="1668-1453"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">주소</label>
                    <input
                      type="text"
                      defaultValue="경기도 화성시 정남면 창호로 123"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">이메일</label>
                    <input
                      type="email"
                      defaultValue="info@changho-minjok.co.kr"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  <Save className="w-5 h-5" />
                  저장
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ink">알림 설정</h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-hanji rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-ink">신규 문의 알림</p>
                      <p className="text-sm text-muted">새로운 견적 문의가 접수되면 알림을 받습니다.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold" />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-hanji rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-ink">일정 알림</p>
                      <p className="text-sm text-muted">예정된 실측/시공 일정 전날 알림을 받습니다.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold" />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-hanji rounded-lg cursor-pointer">
                    <div>
                      <p className="font-medium text-ink">이메일 알림</p>
                      <p className="text-sm text-muted">중요 알림을 이메일로도 받습니다.</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 accent-gold" />
                  </label>
                </div>

                <button className="inline-flex items-center gap-2 bg-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  <Save className="w-5 h-5" />
                  저장
                </button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-ink">보안 설정</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">현재 비밀번호</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">새 비밀번호</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">새 비밀번호 확인</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 bg-gold text-white px-6 py-2 rounded-lg font-medium hover:bg-gold/90 transition-colors">
                  <Save className="w-5 h-5" />
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
