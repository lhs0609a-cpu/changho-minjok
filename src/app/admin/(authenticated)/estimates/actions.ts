'use server';

import { revalidatePath } from 'next/cache';
import { deleteEstimate } from '@/lib/estimate-db';

export async function deleteEstimateAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;

  if (!id) {
    return;
  }

  await deleteEstimate(id);
  revalidatePath('/admin/estimates');
}
