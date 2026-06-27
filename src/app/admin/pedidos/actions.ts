'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentAdminUser, createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';
import type { EstadoPedido } from '@/types/domain';

export async function cambiarEstadoPedido(id: string, nuevoEstado: EstadoPedido) {
  const admin = await getCurrentAdminUser();
  if (!admin) throw new Error('No autorizado');

  const supabase = await createSupabaseServerAuthClient();
  const { error } = await supabase.from('pedidos').update({ status: nuevoEstado }).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/admin/pedidos');
}
