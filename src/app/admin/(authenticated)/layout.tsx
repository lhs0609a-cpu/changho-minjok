import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import AdminLayoutClient from '@/components/admin/AdminLayout';

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin');
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
