# La Manito Del Vegano — v2 (Next.js)

Migración del sitio original (vanilla JS) a Next.js 15 + Supabase, con foco en seguridad
y arquitectura mantenible. Ver `docs/MIGRACION-NOTAS.md` para el detalle completo de
reglas de negocio preservadas y vulnerabilidades cerradas.

## Setup

1. `npm install`
2. Copiar `.env.example` a `.env.local` y completar con tus credenciales reales de Supabase
3. Ejecutar `supabase/schema.sql`, `supabase/rls-policies.sql` y `supabase/seed.sql` en el SQL Editor de Supabase, en ese orden
4. `npm run dev`

## Variables de entorno requeridas en Vercel

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca con prefijo NEXT_PUBLIC_, nunca en el navegador)
