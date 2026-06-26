import { createSupabaseServiceClient } from '@/lib/supabase/server';
import type { Producto, Categoria, Zona, AjustesPublicos } from '@/types/domain';

/**
 * Estas funciones corren en Server Components (SSR), por eso usan el cliente
 * de servicio: nos da datos consistentes para SEO sin depender de que el
 * navegador del visitante tenga que hacer la consulta. Como solo seleccionan
 * columnas públicas y filtran activo=true, no exponen nada sensible aunque
 * usen el cliente con más privilegios — el resultado HTML es el límite real.
 */

export async function getProductosActivos(): Promise<Producto[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('productos')
    .select(
      'id, nombre, descripcion_corta, descripcion_larga, precio, precio_anterior, categoria_id, emoji, etiqueta, color_fondo, imagen_url, destacado, maneja_stock, stock, gluten_free, nut_free, disponibilidad, gramaje, variedades, activo'
    )
    .eq('activo', true)
    .order('destacado', { ascending: false });

  if (error) {
    console.error('Error cargando productos:', error);
    return [];
  }
  return data as Producto[];
}

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from('categorias').select('id, nombre, emoji, slug');
  if (error) {
    console.error('Error cargando categorías:', error);
    return [];
  }
  return data as Categoria[];
}

export async function getZonas(): Promise<Zona[]> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from('zonas').select('id, nombre, comunas, precio');
  if (error) {
    console.error('Error cargando zonas:', error);
    return [];
  }
  return data as Zona[];
}

export async function getAjustesPublicos(): Promise<AjustesPublicos | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('ajustes')
    .select('id, nombre, whatsapp, instagram, tiktok, facebook, estado, tasa_puntos, valor_punto')
    .eq('id', 'global')
    .maybeSingle();

  if (error) {
    console.error('Error cargando ajustes:', error);
    return null;
  }
  return data as AjustesPublicos | null;
}

export async function getProductoById(id: string): Promise<Producto | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('productos')
    .select(
      'id, nombre, descripcion_corta, descripcion_larga, precio, precio_anterior, categoria_id, emoji, etiqueta, color_fondo, imagen_url, destacado, maneja_stock, stock, gluten_free, nut_free, disponibilidad, gramaje, variedades, activo'
    )
    .eq('id', id)
    .eq('activo', true)
    .maybeSingle();

  if (error || !data) return null;
  return data as Producto;
}
