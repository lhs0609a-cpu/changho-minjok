import { notFound } from 'next/navigation';
import { getBannerById } from '@/lib/banner-db';
import BannerForm from '../BannerForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBannerPage({ params }: Props) {
  const { id } = await params;
  const banner = await getBannerById(id);

  if (!banner) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">배너 수정</h1>
        <p className="text-gray-500 mt-1">배너 정보를 수정합니다.</p>
      </div>

      <div className="max-w-2xl">
        <BannerForm banner={banner} />
      </div>
    </div>
  );
}
