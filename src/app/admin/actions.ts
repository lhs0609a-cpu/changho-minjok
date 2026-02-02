'use server';

import { redirect } from 'next/navigation';
import { verifyCredentials, setAdminSession, clearAdminSession } from '@/lib/auth';

export async function loginAction(formData: FormData): Promise<void> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password || !verifyCredentials(username, password)) {
    redirect('/admin?error=invalid');
  }

  await setAdminSession();
  redirect('/admin/portfolio');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin');
}
