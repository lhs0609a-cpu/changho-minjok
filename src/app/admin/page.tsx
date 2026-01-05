import { redirect } from 'next/navigation';
import { verifyAdmin } from '@/lib/auth';
import { loginAction } from './actions';
import { Lock } from 'lucide-react';

export default async function AdminLoginPage() {
  const isAdmin = await verifyAdmin();

  if (isAdmin) {
    redirect('/admin/portfolio');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-500 mt-2">시공사례를 관리하려면 로그인하세요.</p>
          </div>

          <form action={loginAction}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                placeholder="관리자 비밀번호 입력"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-sky-600 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          창호의 민족 관리자 시스템
        </p>
      </div>
    </div>
  );
}
