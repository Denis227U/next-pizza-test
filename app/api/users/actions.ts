'use server';
import { prisma } from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';

export async function deleteUserAction(formData: FormData) {
  const id = Number(formData.get('userId')); // Получаем ID из скрытого поля

  await prisma.user.delete({
    where: { id: id },
  });
}
