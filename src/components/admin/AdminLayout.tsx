'use client';

import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const formData = new FormData();
    const response = await fetch('/admin/api/logout', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
