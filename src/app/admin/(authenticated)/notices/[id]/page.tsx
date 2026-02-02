import { notFound } from 'next/navigation';
import { getNoticeById } from '@/lib/notice-db';
import NoticeForm from '../NoticeForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNoticePage({ params }: Props) {
  const { id } = await params;
  const notice = await getNoticeById(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">공지사항 수정</h1>
        <p className="text-gray-500 mt-1">공지사항을 수정합니다.</p>
      </div>

      <div className="max-w-3xl">
        <NoticeForm notice={notice} />
      </div>
    </div>
  );
}
