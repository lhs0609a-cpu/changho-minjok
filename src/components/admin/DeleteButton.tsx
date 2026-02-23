'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  action: (formData: FormData) => Promise<void>;
  id: string;
  confirmMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function DeleteButton({
  action,
  id,
  confirmMessage = '정말 삭제하시겠습니까?',
  className = 'p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors',
  children,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm(confirmMessage)) return;

    const formData = new FormData();
    formData.set('id', id);

    startTransition(async () => {
      await action(formData);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={className}
      title="삭제"
    >
      {isPending ? (
        '삭제 중...'
      ) : children ? (
        children
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
