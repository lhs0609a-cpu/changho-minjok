"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  Phone,
  MessageSquare,
  Users,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 더미 데이터
const consultations = [
  { id: "1", customerId: "1", customerName: "김철수", type: "전화", content: "시스템창호 견적 문의. 32평 아파트 전체 교체 희망. 예산 500만원 내외.", nextAction: "현장 실측 일정 조율", nextDate: "2024-01-15", createdAt: "2024-01-10 14:30", user: "관리자" },
  { id: "2", customerId: "2", customerName: "이영희", type: "방문", content: "단독주택 2층 창호 교체 상담. 방음 기능 중시. LG샤시 희망.", nextAction: "견적서 발송", nextDate: "2024-01-12", createdAt: "2024-01-09 10:00", user: "관리자" },
  { id: "3", customerId: "3", customerName: "박민수", type: "카카오톡", content: "결로 문제 해결 문의. 현재 창호 상태 사진 첨부.", nextAction: "전화 상담", nextDate: "2024-01-11", createdAt: "2024-01-08 16:45", user: "김상담" },
  { id: "4", customerId: "4", customerName: "정수진", type: "전화", content: "신축 아파트 입주 전 창호 교체 문의. 시스템창호와 하이샤시 비교 요청.", nextAction: "제품 비교표 발송", nextDate: "2024-01-11", createdAt: "2024-01-10 09:15", user: "관리자" },
  { id: "5", customerId: "5", customerName: "최동훈", type: "이메일", content: "시공 완료 후 A/S 문의. 잠금장치 조정 필요.", nextAction: "A/S 방문", nextDate: "2024-01-13", createdAt: "2024-01-05 11:20", user: "박기사" },
];

const typeIcons: Record<string, React.ReactNode> = {
  "전화": <Phone className="w-4 h-4" />,
  "방문": <Users className="w-4 h-4" />,
  "카카오톡": <MessageSquare className="w-4 h-4" />,
  "이메일": <Mail className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  "전화": "bg-blue-100 text-blue-700",
  "방문": "bg-green-100 text-green-700",
  "카카오톡": "bg-yellow-100 text-yellow-700",
  "이메일": "bg-purple-100 text-purple-700",
};

export default function AdminConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("전체");

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.customerName.includes(searchQuery) ||
      consultation.content.includes(searchQuery);
    const matchesType = selectedType === "전체" || consultation.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">상담 기록</h1>
          <p className="text-muted mt-1">총 {consultations.length}건의 상담 기록</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          상담 등록
        </button>
      </div>

      {/* 필터 & 검색 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="고객명, 상담 내용으로 검색"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          {/* 유형 필터 */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="전체">전체 유형</option>
              <option value="전화">전화</option>
              <option value="방문">방문</option>
              <option value="카카오톡">카카오톡</option>
              <option value="이메일">이메일</option>
            </select>
          </div>
        </div>
      </div>

      {/* 상담 목록 */}
      <div className="space-y-4">
        {filteredConsultations.map((consultation) => (
          <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* 좌측: 고객 정보 */}
              <div className="flex items-center gap-4 lg:w-48">
                <div className="w-12 h-12 bg-hanji rounded-full flex items-center justify-center font-bold text-ink text-lg">
                  {consultation.customerName.charAt(0)}
                </div>
                <div>
                  <Link
                    href={"/admin/customers/" + consultation.customerId}
                    className="font-bold text-ink hover:text-primary transition-colors"
                  >
                    {consultation.customerName}
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium " + typeColors[consultation.type]}>
                      {typeIcons[consultation.type]}
                      {consultation.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* 중앙: 상담 내용 */}
              <div className="flex-1">
                <p className="text-ink leading-relaxed">{consultation.content}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                  <span className="text-muted">{consultation.createdAt}</span>
                  <span className="text-muted">담당: {consultation.user}</span>
                </div>
              </div>

              {/* 우측: 다음 액션 */}
              <div className="lg:w-56 lg:text-right">
                <div className="inline-block bg-primary/10 rounded-lg p-3 text-left">
                  <p className="text-xs text-primary font-medium mb-1">다음 액션</p>
                  <p className="text-sm text-ink font-medium">{consultation.nextAction}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted">
                    <Calendar className="w-3 h-3" />
                    {consultation.nextDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          총 {filteredConsultations.length}건 중 1-{filteredConsultations.length}건 표시
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 bg-white" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">1</button>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors bg-white">2</button>
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
