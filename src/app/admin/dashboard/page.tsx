import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Clock,
} from "lucide-react";

// 더미 데이터
const stats = [
  { name: "신규 문의", value: 12, change: "+15%", trend: "up", icon: FileText, href: "/admin/inquiries" },
  { name: "이번 달 고객", value: 45, change: "+8%", trend: "up", icon: Users, href: "/admin/customers" },
  { name: "예정 시공", value: 8, change: "0%", trend: "neutral", icon: Calendar, href: "/admin/schedule" },
  { name: "이번 달 매출", value: "2.4억", change: "+23%", trend: "up", icon: TrendingUp, href: "/admin/stats" },
];

const recentInquiries = [
  { id: 1, name: "김철수", phone: "010-1234-5678", housingType: "아파트", product: "시스템창호", status: "대기", time: "10분 전" },
  { id: 2, name: "이영희", phone: "010-2345-6789", housingType: "단독주택", product: "PVC창호", status: "연락완료", time: "1시간 전" },
  { id: 3, name: "박민수", phone: "010-3456-7890", housingType: "빌라", product: "하이샤시", status: "상담중", time: "2시간 전" },
  { id: 4, name: "정수진", phone: "010-4567-8901", housingType: "아파트", product: "시스템창호", status: "견적완료", time: "3시간 전" },
];

const upcomingSchedule = [
  { id: 1, customer: "김철수", address: "서울시 강남구", date: "2024-01-15", type: "실측" },
  { id: 2, customer: "이영희", address: "경기도 수원시", date: "2024-01-15", type: "시공" },
  { id: 3, customer: "박민수", address: "서울시 송파구", date: "2024-01-16", type: "시공" },
];

const recentActivities = [
  { id: 1, action: "견적서 발송", target: "김철수", user: "관리자", time: "5분 전" },
  { id: 2, action: "상담 기록 추가", target: "이영희", user: "관리자", time: "30분 전" },
  { id: 3, action: "신규 문의 접수", target: "정수진", user: "시스템", time: "1시간 전" },
  { id: 4, action: "시공 완료 처리", target: "최동훈", user: "관리자", time: "2시간 전" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {stat.change}
                {stat.trend === "up" && <ArrowUpRight className="w-4 h-4 ml-1" />}
                {stat.trend === "down" && <ArrowDownRight className="w-4 h-4 ml-1" />}
              </span>
            </div>
            <p className="text-2xl font-bold text-ink">{stat.value}</p>
            <p className="text-sm text-muted mt-1">{stat.name}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 최근 문의 */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="font-bold text-ink text-lg">최근 문의</h2>
            <Link href="/admin/inquiries" className="text-primary text-sm font-medium hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="divide-y">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-hanji rounded-full flex items-center justify-center font-bold text-ink">
                      {inquiry.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{inquiry.name}</p>
                      <p className="text-sm text-muted">{inquiry.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted">{inquiry.housingType}</span>
                      <span className="text-sm text-primary font-medium">{inquiry.product}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          inquiry.status === "대기"
                            ? "bg-yellow-100 text-yellow-700"
                            : inquiry.status === "연락완료"
                            ? "bg-blue-100 text-blue-700"
                            : inquiry.status === "상담중"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                      <span className="text-xs text-muted">{inquiry.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오늘의 일정 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="font-bold text-ink text-lg">오늘의 일정</h2>
            <Link href="/admin/schedule" className="text-primary text-sm font-medium hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {upcomingSchedule.map((schedule) => (
              <div key={schedule.id} className="flex items-start gap-3 p-3 bg-hanji rounded-lg">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    schedule.type === "실측" ? "bg-blue-100" : "bg-green-100"
                  }`}
                >
                  {schedule.type === "실측" ? (
                    <Clock className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Calendar className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ink">{schedule.customer}</p>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        schedule.type === "실측"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {schedule.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted truncate">{schedule.address}</p>
                  <p className="text-xs text-primary mt-1">{schedule.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <h2 className="font-bold text-ink text-lg">최근 활동</h2>
        </div>
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 relative">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-ink">
                      <span className="font-medium">{activity.user}</span>
                      님이{" "}
                      <span className="font-medium text-primary">{activity.target}</span>
                      님에게{" "}
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-sm text-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
