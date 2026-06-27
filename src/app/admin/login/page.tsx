'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseAuthBrowserClient } from '@/lib/supabase/auth-client';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    errorParam === 'sin-permiso' ? 'Tu cuenta no tiene permisos de administrador.' : null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createSupabaseAuthBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Email o contraseña incorrectos.');
      setLoading(false);
      return;
    }

    router.push('/admin/productos');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-fondo px-4">
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 w-full max-w-[380px]">
        <div className="text-center mb-6">
          <span className="inline-block w-12 h-12 rounded-full bg-[rgba(0,255,179,0.15)] border border-[rgba(0,255,179,0.3)] flex items-center justify-center text-2xl mb-3">
            🌱
          </span>
          <h1 className="font-display font-bold text-lg text-white">Panel Admin</h1>
          <p className="text-xs text-muted">La Manito Del Vegano</p>
        </div>

        {error && (
          <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-rojo text-xs rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <label className="block text-xs text-muted mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-[rgba(0,255,179,0.2)] rounded-lg px-3 py-2.5 text-sm text-white mb-4"
          placeholder="tu@email.com"
        />

        <label className="block text-xs text-muted mb-1.5">Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-[rgba(0,255,179,0.2)] rounded-lg px-3 py-2.5 text-sm text-white mb-5"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neon text-[#020705] font-bold py-3 rounded-full text-sm shadow-[0_0_15px_rgba(0,255,179,0.4)] transition-all hover:bg-white disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
