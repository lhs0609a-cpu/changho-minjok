import NoticeForm from '../NoticeForm';

export default function NewNoticePage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 공지사항</h1>
        <p className="text-gray-500 mt-1">새로운 공지사항을 등록합니다.</p>
      </div>

      <div className="max-w-3xl">
        <NoticeForm />
      </div>
    </div>
  );
}
