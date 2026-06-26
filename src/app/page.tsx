import { SiteShell } from '@/components/layout/SiteShell';
import { Hero } from '@/components/layout/Hero';
import { CatalogoGrid } from '@/components/tienda/CatalogoGrid';
import { getProductosActivos, getCategorias, getZonas } from '@/lib/data/catalogo';

export default async function HomePage() {
  const [productos, categorias, zonas] = await Promise.all([
    getProductosActivos(),
    getCategorias(),
    getZonas(),
  ]);

  const destacados = productos.filter((p) => p.destacado);

  return (
    <SiteShell>
      <main>
        <Hero />

        {destacados.length > 0 && (
          <section className="px-4 py-6">
            <h2 className="font-display font-extrabold text-xl text-white mb-4 flex items-center gap-2">
              ⭐ Destacados &amp; Ofertas
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {destacados.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl overflow-hidden relative border border-[rgba(0,255,179,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1.5"
                  style={{ background: p.color_fondo || '#1B4332' }}
                >
                  <div className="h-[180px] flex items-center justify-center text-6xl relative">
                    {p.imagen_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imagen_url} alt={p.nombre} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      p.emoji
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,9,7,0.97)] via-[rgba(3,9,7,0.4)] to-transparent flex flex-col justify-end p-3.5">
                      <p className="font-display font-bold text-base text-white mb-0.5">{p.nombre}</p>
                      <p className="text-sm text-neon font-bold mb-2">${p.precio.toLocaleString('es-CL')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {zonas.length > 0 && (
          <section className="px-4 mb-4">
            <div className="bg-white/[0.04] border border-[rgba(0,255,179,0.15)] rounded-2xl p-4">
              <h3 className="font-display font-bold text-base text-white mb-2.5">🚚 Zonas de despacho</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {zonas.map((z) => (
                  <div key={z.id} className="bg-white/5 rounded-lg px-3 py-2 flex justify-between items-center border border-[rgba(0,255,179,0.08)]">
                    <div>
                      <p className="text-[11px] font-semibold text-texto">{z.nombre}</p>
                      <p className="text-[9px] text-muted">{z.comunas}</p>
                    </div>
                    <span className="text-[13px] text-neon font-bold">${z.precio.toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CatalogoGrid productos={productos} categorias={categorias} />
      </main>
    </SiteShell>
  );
}
