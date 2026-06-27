import { SiteShell } from '@/components/layout/SiteShell';

export default function NosotrosPage() {
  return (
    <SiteShell>
      <main className="pt-[100px] px-4 pb-16 max-w-[600px] mx-auto">
        <span className="pill mb-3">🌱 Nuestra historia</span>
        <h1 className="font-display font-extrabold text-2xl text-white mb-4 leading-tight">
          Comida vegana hecha con{' '}
          <em className="text-[#B7E4C7]" style={{ fontStyle: 'italic' }}>
            amor y conciencia
          </em>
        </h1>
        <p className="text-sm text-white/75 leading-relaxed mb-4">
          La Manito Del Vegano nació de la convicción de que comer rico y comer de forma consciente no
          son cosas opuestas. Empezamos en un taller pequeño en Santiago, elaborando empanadas y pies
          100% plant-based con ingredientes que respetan tanto a los animales como a la tierra.
        </p>
        <p className="text-sm text-white/75 leading-relaxed mb-4">
          Hoy seguimos siendo un taller artesanal — cada producto se hace en pequeñas tandas, sin
          conservantes industriales, priorizando ingredientes de proveedores locales siempre que es
          posible. Nuestro manjar de semilla de cáñamo nació de esa misma búsqueda: encontrar
          alternativas nutritivas, sabrosas, y genuinamente nuevas dentro de la repostería vegana
          chilena.
        </p>
        <p className="text-sm text-white/75 leading-relaxed">
          Hoy trabajamos desde Santiago y Pucón, llegando a cada vez más hogares con comida que
          demuestra que lo vegano puede —y debe— enamorar a cualquiera.
        </p>
      </main>
    </SiteShell>
  );
}
