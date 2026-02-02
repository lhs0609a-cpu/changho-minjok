import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24; // 24시간

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!session) return false;

  // 간단한 토큰 검증 (실제 환경에서는 더 강력한 방식 사용)
  return session.value === generateToken();
}

export function generateToken(): string {
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  // 간단한 해시 (실제 환경에서는 더 안전한 방식 사용)
  return Buffer.from(password + '_authenticated').toString('base64');
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, generateToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}

export function verifyCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return username === adminUsername && password === adminPassword;
}
