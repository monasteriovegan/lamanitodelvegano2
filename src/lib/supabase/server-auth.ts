import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Cliente de Supabase que respeta la sesión del usuario autenticado (admin),
 * usado en Server Components / Route Handlers del panel admin.
 * A diferencia de createSupabaseServiceClient, este SÍ respeta RLS —
 * por eso el admin solo puede hacer lo que su policy `is_admin()` permite.
 */
export async function createSupabaseServerAuthClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Se puede ignorar si se llama desde un Server Component sin posibilidad de set.
          }
        },
      },
    }
  );
}

export async function getCurrentAdminUser() {
  const supabase = await createSupabaseServerAuthClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data: rolRow } = await supabase
    .from('admin_roles')
    .select('rol')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (!rolRow) return null; // autenticado pero no es admin
  return { id: userData.user.id, email: userData.user.email, rol: rolRow.rol };
}
