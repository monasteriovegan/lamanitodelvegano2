import CheckoutClient from './CheckoutClient';

// Esta página depende 100% del carrito en memoria del navegador (useCart),
// que solo existe dentro de <CartProvider> en tiempo de ejecución en el
// cliente. force-dynamic evita que Next.js intente pre-renderizarla en
// build time, donde ese contexto de React no existe todavía.
export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return <CheckoutClient />;
}
