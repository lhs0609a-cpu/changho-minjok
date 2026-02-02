import { notFound } from 'next/navigation';
import { getPopupById } from '@/lib/popup-db';
import PopupForm from '../PopupForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPopupPage({ params }: Props) {
  const { id } = await params;
  const popup = await getPopupById(id);

  if (!popup) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">팝업 수정</h1>
        <p className="text-gray-500 mt-1">팝업 정보를 수정합니다.</p>
      </div>

      <div className="max-w-2xl">
        <PopupForm popup={popup} />
      </div>
    </div>
  );
}
