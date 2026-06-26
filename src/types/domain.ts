// Tipos centrales del dominio — La Manito Del Vegano

export type EstadoPedido =
  | 'Pendiente'
  | 'Pagado'
  | 'Despachado'
  | 'Completado'
  | 'Cancelado'
  | 'WhatsApp';

export type TipoCupon = 'fijo' | 'porcentaje' | 'bogo' | 'regalo';
export type Etiqueta = 'nuevo' | 'oferta' | 'estrella' | 'promo' | null;

export interface Categoria {
  id: string;
  nombre: string;
  emoji: string | null;
  slug: string;
}

export interface FormatoProducto {
  label: string; // ej "250g"
  precio: number; // precio absoluto para ese formato
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion_corta: string | null;
  descripcion_larga: string | null;
  precio: number;
  precio_anterior: number | null;
  costo: number | null;
  categoria_id: string | null;
  emoji: string | null;
  etiqueta: Etiqueta;
  color_fondo: string | null;
  imagen_url: string | null;
  destacado: boolean;
  maneja_stock: boolean;
  stock: number;
  gluten_free: boolean;
  nut_free: boolean;
  disponibilidad: string[] | null; // fechas ISO especiales, null = sin restricción
  gramaje: string | null; // string crudo de formatos, ej "250g:6500,500g:12000"
  variedades: string | null; // sabores separados por coma
  activo: boolean;
}

export interface Zona {
  id: string;
  nombre: string;
  comunas: string | null;
  precio: number;
}

export interface AjustesPublicos {
  id: string;
  nombre: string;
  whatsapp: string | null;
  instagram: string | null;
  tiktok: string | null;
  facebook: string | null;
  estado: 'abierto' | 'cerrado';
  tasa_puntos: number;
  valor_punto: number;
}

export interface Cupon {
  id: string; // código
  tipo: TipoCupon;
  valor: string;
  min_monto: number;
  activo: boolean;
  expira_at: string | null;
}

export interface ItemCarrito {
  productoId: string;
  nombre: string;
  precio: number; // precio unitario final (con formato aplicado)
  qty: number;
  emoji?: string;
  formato?: string | null;
  variedad?: string | null;
}

export interface ClienteInfo {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface Pedido {
  id: string;
  cliente: ClienteInfo;
  items: ItemCarrito[];
  subtotal: number;
  costo_envio: number;
  descuento_cupon: number;
  cupon_code: string | null;
  descuento_fidelidad: number;
  puntos_canjeados: number;
  puntos_ganados: number;
  total: number;
  metodo_pago: string | null;
  status: EstadoPedido;
  fecha_despacho: string | null;
  zona_envio: string | null;
  created_at: string;
}

// Payload que el cliente manda a /api/checkout — SOLO intenciones, nunca precios finales.
// El servidor recalcula todo desde la base de datos.
export interface CheckoutRequest {
  cliente: ClienteInfo;
  items: { productoId: string; qty: number; formato?: string | null; variedad?: string | null }[];
  zonaId: string | null;
  cuponCode?: string | null;
  fechaDespachoIdx?: number;
  canjearPuntos?: boolean;
  pinFidelidad?: string;
  metodoPago: 'mercadopago' | 'flow' | 'whatsapp';
}
