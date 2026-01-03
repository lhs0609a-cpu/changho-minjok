"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { name: "대시보드", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "고객 관리", href: "/admin/customers", icon: Users },
  { name: "상담 기록", href: "/admin/consultations", icon: MessageSquare },
  { name: "견적 문의", href: "/admin/inquiries", icon: FileText },
  { name: "시공 일정", href: "/admin/schedule", icon: Calendar },
  { name: "설정", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 로그인 페이지는 레이아웃 제외
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-ink transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 로고 */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link href="/admin/dashboard" className="font-serif text-xl font-bold text-white">
            창호의민족
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gold text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 로그아웃 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">로그아웃</span>
          </Link>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="lg:pl-64">
        {/* 헤더 */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-ink"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-ink">
              {navigation.find((item) => pathname === item.href || pathname.startsWith(item.href + "/"))?.name || "관리자"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* 알림 */}
            <button className="relative text-muted hover:text-ink transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-seal text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* 사용자 메뉴 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white font-bold">
                관
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-ink">관리자</p>
                <p className="text-xs text-muted">admin@changho-minjok.co.kr</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted" />
            </div>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
