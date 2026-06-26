import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-20 px-[18px] text-center bg-[radial-gradient(circle_at_50%_0%,rgba(5,31,21,0.8),#030907_80%)]">
      {/* Glows animados de fondo */}
      <div className="pointer-events-none absolute -top-[10%] left-[20%] w-[400px] h-[400px] rounded-full blur-[80px] opacity-80 animate-[orbita1_25s_linear_infinite] bg-[radial-gradient(circle,rgba(0,255,179,0.15)_0%,rgba(0,255,179,0)_70%)]" />
      <div className="pointer-events-none absolute -bottom-[10%] right-[15%] w-[450px] h-[450px] rounded-full blur-[90px] opacity-80 animate-[orbita2_30s_linear_infinite] bg-[radial-gradient(circle,rgba(255,46,147,0.08)_0%,rgba(255,46,147,0)_70%)]" />
      <span className="pointer-events-none absolute text-[120px] opacity-[0.03] -bottom-[15px] -right-2 -rotate-[20deg] z-[1]">
        🌿
      </span>

      <div className="relative z-[2]">
        <span className="pill mb-3">🌿 Taller Plant Based</span>

        <h1 className="font-display font-extrabold text-[clamp(28px,8vw,48px)] text-white leading-[1.1] mb-3">
          Comida vegana que{' '}
          <em className="italic text-[#B7E4C7] not-italic [font-style:italic]" style={{ textShadow: '0 0 20px rgba(183,228,199,0.4)' }}>
            enamora
          </em>
        </h1>

        <p className="text-white/75 text-sm leading-relaxed max-w-[600px] mx-auto mb-6">
          Elaboramos con amor y conciencia. Solo pedidos · Santiago y Pucón · Delivery a todo Santiago
        </p>

        <div className="flex gap-[7px] justify-center flex-wrap mb-6">
          {['🌱 100% Vegano', '✋ Artesanal', '📅 Programa tus pedidos', '🚚 Delivery a todo stgo'].map((tag) => (
            <span
              key={tag}
              className="bg-white/15 text-white px-3 py-[5px] rounded-full text-[11px] border border-white/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="#catalogo"
            className="bg-neon text-[#020705] px-6 py-3 rounded-full text-[13.5px] font-bold shadow-[0_0_15px_rgba(0,255,179,0.4)] transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:-translate-y-0.5"
          >
            Ver productos 🛒
          </Link>
          <Link
            href="/nosotros"
            className="bg-white/10 text-white px-6 py-3 rounded-full text-[13.5px] font-semibold border border-white/20 transition-all hover:bg-white/20"
          >
            Nuestra historia ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
