'use server';

import { redirect } from 'next/navigation';
import { verifyPassword, setAdminSession, clearAdminSession } from '@/lib/auth';

export async function loginAction(formData: FormData): Promise<void> {
  const password = formData.get('password') as string;

  if (!password || !verifyPassword(password)) {
    redirect('/admin?error=invalid');
  }

  await setAdminSession();
  redirect('/admin/portfolio');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin');
}
