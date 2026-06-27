'use client';

import { useState } from 'react';
import { SiteShell } from '@/components/layout/SiteShell';

const FAQS = [
  {
    q: '¿Hacen despacho a todo Santiago?',
    a: 'Sí, cubrimos Santiago Centro, Oriente, Sur y Poniente con costos de envío distintos según zona. También hacemos despacho en Pucón.',
  },
  {
    q: '¿Cuánto tiempo de anticipación necesito para pedir?',
    a: 'Generalmente pedimos al menos 3 días de anticipación, ya que todo se elabora de forma artesanal. Algunos productos de temporada pueden tener fechas especiales de despacho.',
  },
  {
    q: '¿Todos los productos son 100% veganos?',
    a: 'Sí, sin excepción. Todo nuestro taller trabaja exclusivamente con ingredientes 100% plant-based.',
  },
  {
    q: '¿Tienen opciones sin gluten o sin nueces?',
    a: 'Sí, varios de nuestros productos son aptos para personas con intolerancia al gluten o alergia a las nueces. Revisa los badges en cada producto del catálogo.',
  },
  {
    q: '¿Cómo funciona el programa de puntos?',
    a: 'Por cada compra acumulas puntos que luego puedes canjear como descuento en tu siguiente pedido. Protegemos tus puntos con un PIN de 4 dígitos que tú eliges.',
  },
];

export default function ContactoPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <SiteShell>
      <main className="pt-[100px] px-4 pb-16 max-w-[560px] mx-auto">
        <h1 className="font-display font-bold text-xl text-white mb-2">💬 Contacto</h1>
        <p className="text-sm text-muted mb-6">
          ¿Tienes dudas o quieres hacer un pedido especial? Escríbenos directamente por WhatsApp.
        </p>

        <a
          href="https://wa.me/56990816124"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-wa text-white font-bold py-3.5 rounded-full text-sm mb-10 hover:bg-wa2 transition-colors"
        >
          💬 Escríbenos por WhatsApp
        </a>

        <h2 className="font-display font-bold text-lg text-white mb-4">❓ Preguntas frecuentes</h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white/[0.03] border border-[rgba(0,255,179,0.1)] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <span className="text-neon text-xs">{openIdx === idx ? '▲' : '▼'}</span>
              </button>
              {openIdx === idx && (
                <p className="px-4 pb-4 text-sm text-white/70 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
