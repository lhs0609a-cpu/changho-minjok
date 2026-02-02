import { getAllSettings } from '@/lib/settings-db';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 mt-1">회사 정보 및 연락처를 관리합니다.</p>
      </div>

      <div className="max-w-2xl">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
