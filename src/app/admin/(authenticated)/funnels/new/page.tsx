import FunnelForm from '../FunnelForm';

export default function NewFunnelPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 퍼널</h1>
        <p className="text-gray-500 mt-1">새로운 자동 메시지 퍼널을 등록합니다.</p>
      </div>

      <div className="max-w-3xl">
        <FunnelForm />
      </div>
    </div>
  );
}
