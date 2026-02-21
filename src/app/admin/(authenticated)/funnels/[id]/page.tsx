import { notFound } from 'next/navigation';
import { getTemplateById, getStepsByTemplateId } from '@/lib/funnel-db';
import FunnelForm from '../FunnelForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditFunnelPage({ params }: Props) {
  const { id } = await params;
  const template = await getTemplateById(id);

  if (!template) {
    notFound();
  }

  const steps = await getStepsByTemplateId(id);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">퍼널 수정</h1>
        <p className="text-gray-500 mt-1">퍼널을 수정합니다.</p>
      </div>

      <div className="max-w-3xl">
        <FunnelForm template={template} steps={steps} />
      </div>
    </div>
  );
}
