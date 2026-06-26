import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { calcularPedido } from '@/lib/pricing/calcular-pedido';
import { validarPin } from '@/lib/pricing/fidelidad';
import type { CheckoutRequest } from '@/types/domain';

/**
 * Único punto de entrada para crear un pedido.
 * Reemplaza crearPedido() del app.js viejo, que insertaba directo a Supabase
 * desde el navegador confiando en el total calculado en el cliente.
 *
 * Esta ruta:
 * 1. Recibe solo intenciones (IDs, cantidades, código de cupón, etc.)
 * 2. Recalcula TODO server-side contra la base de datos real
 * 3. Verifica el PIN de fidelidad si se quiere canjear puntos
 * 4. Crea el pedido con el total ya validado
 * 5. Descuenta stock de forma atómica
 */
export async function POST(req: NextRequest) {
  const body: CheckoutRequest = await req.json();

  if (!body.cliente?.nombre || !body.cliente?.telefono) {
    return NextResponse.json({ error: 'Faltan datos del cliente.' }, { status: 400 });
  }

  const calculo = await calcularPedido(body);
  if (!calculo.ok) {
    return NextResponse.json({ error: calculo.error }, { status: 400 });
  }

  let descuentoFidelidad = 0;
  let puntosCanjeados = 0;

  if (body.canjearPuntos && body.pinFidelidad) {
    const pinCheck = await validarPin(body.cliente.email, body.cliente.telefono, body.pinFidelidad);
    if (!pinCheck.ok) {
      return NextResponse.json({ error: pinCheck.error }, { status: 400 });
    }
    // El descuento de fidelidad real se aplica con los puntos disponibles reales
    // (se vuelve a consultar aquí para evitar cualquier inconsistencia de timing)
    const { consultarPuntosCliente } = await import('@/lib/pricing/fidelidad');
    const puntos = await consultarPuntosCliente(body.cliente.email, body.cliente.telefono);
    if (puntos.ok && puntos.puntosDisponibles > 0) {
      const supabase = createSupabaseServiceClient();
      const { data: ajustes } = await supabase.from('ajustes').select('valor_punto').eq('id', 'global').maybeSingle();
      const valorPunto = ajustes?.valor_punto || 100;
      puntosCanjeados = puntos.puntosDisponibles;
      descuentoFidelidad = puntosCanjeados * valorPunto;
    }
  }

  // calculo.total ya viene con descuentoFidelidad=0 por defecto (se resuelve recién aquí
  // tras verificar el PIN), así que el total real se recalcula con el descuento de fidelidad ya validado.
  const totalConFidelidad = Math.max(
    0,
    (calculo.subtotal || 0) + (calculo.costoEnvio || 0) - (calculo.descuentoCupon || 0) - descuentoFidelidad
  );

  const supabase = createSupabaseServiceClient();

  // Items finales, incluyendo el regalo si el cupón es tipo "regalo"
  const itemsFinales = [...(calculo.itemsResueltos || [])];
  if (calculo.cuponValido?.tipo === 'regalo') {
    itemsFinales.push({
      productoId: `gift_${Date.now()}`,
      nombre: `${calculo.cuponValido.code} 🎁 (Regalo)`,
      precio: 0,
      qty: 1,
      emoji: '🎁',
    });
  }

  const { data: pedido, error: insertError } = await supabase
    .from('pedidos')
    .insert({
      cliente: body.cliente,
      items: itemsFinales,
      subtotal: calculo.subtotal,
      costo_envio: calculo.costoEnvio,
      descuento_cupon: calculo.descuentoCupon,
      cupon_code: calculo.cuponValido?.code || null,
      descuento_fidelidad: descuentoFidelidad,
      puntos_canjeados: puntosCanjeados,
      puntos_ganados: 0,
      total: totalConFidelidad,
      metodo_pago: body.metodoPago,
      status: body.metodoPago === 'whatsapp' ? 'WhatsApp' : 'Pendiente',
      zona_envio: calculo.zonaNombre,
    })
    .select()
    .single();

  if (insertError || !pedido) {
    console.error('Error creando pedido:', insertError);
    return NextResponse.json({ error: 'No se pudo crear el pedido.' }, { status: 500 });
  }

  // Descontar stock de forma atómica (RPC en Postgres evita race conditions)
  for (const item of calculo.itemsResueltos || []) {
    await supabase.rpc('descontar_stock', { p_producto_id: item.productoId, p_cantidad: item.qty });
  }

  return NextResponse.json({
    pedidoId: pedido.id,
    total: totalConFidelidad,
  });
}
