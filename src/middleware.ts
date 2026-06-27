import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Protege /admin/** verificando una sesión REAL de Supabase Auth en cada
 * request. Reemplaza el sistema viejo donde el admin "entraba" con una
 * contraseña hardcodeada comparada en el navegador (ver ADMIN_PASS en
 * el app.js original) — eso permitía a cualquiera con devtools entrar
 * directo al panel sin pasar por ningún servidor.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const { data: rolRow } = await supabase
    .from('admin_roles')
    .select('rol')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (!rolRow) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('error', 'sin-permiso');
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
