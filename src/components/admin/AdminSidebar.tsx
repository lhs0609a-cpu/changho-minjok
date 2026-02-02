'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Users,
  Calculator,
  Star,
  Image,
  Megaphone,
  HelpCircle,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: '메인',
    items: [
      { href: '/admin/dashboard', label: '대시보드', icon: LayoutDashboard },
    ],
  },
  {
    title: '콘텐츠 관리',
    items: [
      { href: '/admin/portfolio', label: '시공사례', icon: FolderOpen },
      { href: '/admin/banners', label: '배너 관리', icon: Image },
      { href: '/admin/popups', label: '팝업 관리', icon: Megaphone },
      { href: '/admin/faqs', label: 'FAQ 관리', icon: HelpCircle },
      { href: '/admin/notices', label: '공지사항', icon: Bell },
    ],
  },
  {
    title: '고객 관리',
    items: [
      { href: '/admin/inquiries', label: '상담신청', icon: MessageSquare },
      { href: '/admin/customers', label: '고객관리(CRM)', icon: Users },
      { href: '/admin/estimates', label: '견적 관리', icon: Calculator },
      { href: '/admin/reviews', label: '후기 관리', icon: Star },
    ],
  },
  {
    title: '분석',
    items: [
      { href: '/admin/analytics', label: '통계/분석', icon: BarChart3 },
    ],
  },
  {
    title: '설정',
    items: [
      { href: '/admin/settings', label: '설정', icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2 text-white hover:text-sky-400">
            <Home className="w-5 h-5" />
            <span className="font-bold">창호의민족</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg hover:bg-gray-800 ${collapsed ? 'mx-auto' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.title}
              </h3>
            )}
            <ul className="space-y-1 px-2">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-sky-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? '로그아웃' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>로그아웃</span>}
        </button>
      </div>
    </aside>
  );
}
