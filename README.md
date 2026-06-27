# La Manito Del Vegano — v2 (Next.js)

Migración del sitio original (vanilla JS) a Next.js 15, sobre el MISMO proyecto
Supabase que ya usa el sitio viejo en producción (`adrydqvahzqjbgtcvlay`).

⚠️ Importante: esta migración NO usa un Supabase nuevo. Los scripts SQL están
diseñados para AGREGAR seguridad y columnas faltantes sobre las tablas reales
existentes, sin borrar datos ni romper la estructura compartida.

## Setup

1. `npm install`
2. Copiar `.env.example` a `.env.local` y completar con las credenciales del
   proyecto Supabase real (`adrydqvahzqjbgtcvlay` o el que estés usando)
3. En el SQL Editor de Supabase, ejecutar EN ESTE ORDEN:
   - `supabase/migracion-compatible.sql` (agrega columnas/tablas nuevas, no borra nada)
   - `supabase/rls-policies.sql` (activa seguridad real)
4. `npm run dev`

## Variables de entorno requeridas en Vercel

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (⚠️ nunca con prefijo NEXT_PUBLIC_, nunca en el navegador)

Una vez puestas, hay que darle **Redeploy** en Vercel para que el build las tome.

## Primer admin

Después del primer deploy, hay que crear un usuario de Supabase Auth y asignarle
rol de admin manualmente (desde el SQL Editor, con service_role):

```sql
insert into admin_roles (user_id, rol)
values ('UUID_DEL_USUARIO_DE_AUTH', 'admin');
```

El UUID se obtiene desde Authentication > Users en el panel de Supabase, después
de crear el usuario ahí (o de que se registre).
