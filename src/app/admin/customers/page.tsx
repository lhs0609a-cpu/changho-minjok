"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// 더미 데이터
const customers = [
  { id: "1", name: "김철수", phone: "010-1234-5678", email: "kim@email.com", address: "서울시 강남구 삼성동", housingType: "아파트", status: "상담중", lastContact: "2024-01-10", totalQuotes: 2 },
  { id: "2", name: "이영희", phone: "010-2345-6789", email: "lee@email.com", address: "경기도 수원시 영통구", housingType: "단독주택", status: "계약완료", lastContact: "2024-01-09", totalQuotes: 1 },
  { id: "3", name: "박민수", phone: "010-3456-7890", email: "park@email.com", address: "서울시 송파구 잠실동", housingType: "빌라", status: "상담중", lastContact: "2024-01-08", totalQuotes: 3 },
  { id: "4", name: "정수진", phone: "010-4567-8901", email: "jung@email.com", address: "경기도 성남시 분당구", housingType: "아파트", status: "신규", lastContact: "2024-01-10", totalQuotes: 0 },
  { id: "5", name: "최동훈", phone: "010-5678-9012", email: "choi@email.com", address: "인천시 연수구", housingType: "오피스텔", status: "시공완료", lastContact: "2024-01-05", totalQuotes: 1 },
  { id: "6", name: "한지민", phone: "010-6789-0123", email: "han@email.com", address: "서울시 마포구 상암동", housingType: "아파트", status: "상담중", lastContact: "2024-01-07", totalQuotes: 2 },
];

const statusColors: Record<string, string> = {
  "신규": "bg-blue-100 text-blue-700",
  "상담중": "bg-yellow-100 text-yellow-700",
  "견적발송": "bg-purple-100 text-purple-700",
  "계약완료": "bg-green-100 text-green-700",
  "시공완료": "bg-gray-100 text-gray-700",
};

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchQuery) ||
      customer.phone.includes(searchQuery) ||
      customer.email.includes(searchQuery);
    const matchesStatus = selectedStatus === "전체" || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">고객 관리</h1>
          <p className="text-muted mt-1">총 {customers.length}명의 고객</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          고객 등록
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
              placeholder="이름, 전화번호, 이메일로 검색"
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
              <option value="신규">신규</option>
              <option value="상담중">상담중</option>
              <option value="견적발송">견적발송</option>
              <option value="계약완료">계약완료</option>
              <option value="시공완료">시공완료</option>
            </select>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">고객 정보</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">연락처</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">주소</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">상태</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted">최근 연락</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-hanji rounded-full flex items-center justify-center font-bold text-ink">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <Link
                          href={"/admin/customers/" + customer.id}
                          className="font-medium text-ink hover:text-primary transition-colors"
                        >
                          {customer.name}
                        </Link>
                        <p className="text-sm text-muted">{customer.housingType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted" />
                        <span className="text-ink">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted" />
                        <span className="text-muted">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted flex-shrink-0" />
                      <span className="text-ink truncate max-w-[200px]">{customer.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={"px-3 py-1 rounded-full text-xs font-medium " + statusColors[customer.status]}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted">{customer.lastContact}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted hover:text-ink transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-muted">
            총 {filteredCustomers.length}명 중 1-{filteredCustomers.length}명 표시
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
