"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Check,
} from "lucide-react";

// 더미 데이터
const inquiries = [
  { id: "1", name: "김철수", phone: "010-1234-5678", email: "kim@email.com", address: "서울시 강남구", housingType: "아파트", product: "시스템창호", budget: "500~1000만원", status: "대기", createdAt: "2024-01-10 14:30" },
  { id: "2", name: "이영희", phone: "010-2345-6789", email: "lee@email.com", address: "경기도 수원시", housingType: "단독주택", product: "PVC창호", budget: "300~500만원", status: "연락완료", createdAt: "2024-01-10 10:15" },
  { id: "3", name: "박민수", phone: "010-3456-7890", email: "park@email.com", address: "서울시 송파구", housingType: "빌라", product: "하이샤시", budget: "100~300만원", status: "상담중", createdAt: "2024-01-09 16:45" },
  { id: "4", name: "정수진", phone: "010-4567-8901", email: "jung@email.com", address: "경기도 성남시", housingType: "아파트", product: "시스템창호", budget: "1000만원 이상", status: "견적완료", createdAt: "2024-01-09 09:00" },
  { id: "5", name: "최동훈", phone: "010-5678-9012", email: "choi@email.com", address: "인천시 연수구", housingType: "오피스텔", product: "알루미늄", budget: "미정", status: "대기", createdAt: "2024-01-08 11:20" },
  { id: "6", name: "한지민", phone: "010-6789-0123", email: "han@email.com", address: "서울시 마포구", housingType: "아파트", product: "잘 모르겠어요", budget: "300~500만원", status: "취소", createdAt: "2024-01-07 15:30" },
];

const statusColors: Record<string, string> = {
  "대기": "bg-yellow-100 text-yellow-700",
  "연락완료": "bg-blue-100 text-blue-700",
  "상담중": "bg-purple-100 text-purple-700",
  "견적완료": "bg-green-100 text-green-700",
  "계약완료": "bg-green-200 text-green-800",
  "취소": "bg-gray-100 text-gray-700",
};

export default function AdminInquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체");

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.includes(searchQuery) ||
      inquiry.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === "전체" || inquiry.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = inquiries.filter((i) => i.status === "대기").length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">견적 문의</h1>
          <p className="text-muted mt-1">
            총 {inquiries.length}건의 문의{" "}
            {pendingCount > 0 && (
              <span className="text-accent font-medium">({pendingCount}건 대기중)</span>
            )}
          </p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted">대기</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {inquiries.filter((i) => i.status === "대기").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted">상담중</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {inquiries.filter((i) => i.status === "상담중").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted">견적완료</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {inquiries.filter((i) => i.status === "견적완료").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-muted">이번 달 전체</p>
          <p className="text-2xl font-bold text-ink mt-1">{inquiries.length}</p>
        </div>
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
              placeholder="이름, 전화번호로 검색"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>

          {/* 상태 필터 */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="전체">전체 상태</option>
              <option value="대기">대기</option>
              <option value="연락완료">연락완료</option>
              <option value="상담중">상담중</option>
              <option value="견적완료">견적완료</option>
              <option value="취소">취소</option>
            </select>
          </div>
        </div>
      </div>

      {/* 문의 목록 */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={"bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 " +
              (inquiry.status === "대기" ? "border-l-yellow-500" : "border-l-transparent")}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* 고객 정보 */}
              <div className="flex items-center gap-4 lg:w-48">
                <div className="w-12 h-12 bg-hanji rounded-full flex items-center justify-center font-bold text-ink text-lg">
                  {inquiry.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-ink">{inquiry.name}</p>
                  <span className={"inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 " + statusColors[inquiry.status]}>
                    {inquiry.status}
                  </span>
                </div>
              </div>

              {/* 연락처 */}
              <div className="lg:w-48 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted" />
                  <span className="text-ink">{inquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted" />
                  <span className="text-muted truncate">{inquiry.email}</span>
                </div>
              </div>

              {/* 문의 내용 */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted" />
                  <span className="text-ink">{inquiry.address}</span>
                  <span className="text-muted">• {inquiry.housingType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-primary font-medium">{inquiry.product}</span>
                  <span className="text-muted">• 예산: {inquiry.budget}</span>
                </div>
              </div>

              {/* 날짜 & 액션 */}
              <div className="flex items-center gap-3 lg:w-48 lg:justify-end">
                <span className="text-sm text-muted">{inquiry.createdAt}</span>
                <div className="flex items-center gap-1">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="상세보기">
                    <Eye className="w-5 h-5 text-muted" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="상담등록">
                    <MessageSquare className="w-5 h-5 text-muted" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="연락완료">
                    <Check className="w-5 h-5 text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          총 {filteredInquiries.length}건 중 1-{filteredInquiries.length}건 표시
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 bg-white" disabled>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">1</button>
          <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
