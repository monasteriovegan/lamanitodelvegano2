import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentAdminUser, createSupabaseServerAuthClient } from '@/lib/supabase/server-auth';
import { LogoutButton } from './LogoutButton';

const TABS = [
  { href: '/admin/productos', label: '📦 Productos' },
  { href: '/admin/categorias', label: '🏷️ Categorías' },
  { href: '/admin/zonas', label: '🚚 Envíos' },
  { href: '/admin/cupones', label: '🎟️ Cupones' },
  { href: '/admin/pedidos', label: '🧾 Pedidos' },
  { href: '/admin/metricas', label: '📊 Métricas' },
  { href: '/admin/ajustes', label: '⚙️ Ajustes' },
  { href: '/admin/integraciones', label: '🔌 Integraciones' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Esta verificación es una segunda capa además del middleware — defensa en profundidad.
  const admin = await getCurrentAdminUser();
  if (!admin) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-fondo flex">
      <aside className="hidden md:flex w-[220px] flex-col glass border-r border-[rgba(0,255,179,0.1)] p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-6 px-2">
          <span className="text-xl">🌱</span>
          <div>
            <p className="font-display font-bold text-sm text-white leading-tight">Admin</p>
            <p className="text-[10px] text-muted">{admin.email}</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="text-sm text-white/80 px-3 py-2.5 rounded-lg hover:bg-[rgba(0,255,179,0.08)] hover:text-neon transition-colors"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>

      <main className="flex-1 p-5 md:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
