'use client';

import { useRouter } from 'next/navigation';
import { createSupabaseAuthBrowserClient } from '@/lib/supabase/auth-client';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseAuthBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-white/60 px-3 py-2 rounded-lg hover:bg-white/5 hover:text-rojo transition-colors text-left"
    >
      ⏻ Cerrar sesión
    </button>
  );
}
