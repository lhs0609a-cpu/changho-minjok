import BannerForm from '../BannerForm';

export default function NewBannerPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 배너 등록</h1>
        <p className="text-gray-500 mt-1">새로운 배너를 등록합니다.</p>
      </div>

      <div className="max-w-2xl">
        <BannerForm />
      </div>
    </div>
  );
}
