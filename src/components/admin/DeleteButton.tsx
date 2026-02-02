'use client';

import { Trash2 } from 'lucide-react';
import { deletePortfolioAction } from '@/app/admin/(authenticated)/portfolio/actions';

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    const formData = new FormData();
    formData.append('id', id);
    await deletePortfolioAction(formData);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="삭제"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
