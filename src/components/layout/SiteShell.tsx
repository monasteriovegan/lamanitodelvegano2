'use client';

import { CartProvider, useCart } from '@/lib/cart/CartContext';
import { Navbar } from './Navbar';
import { CartDrawer } from '@/components/tienda/CartDrawer';

function NavbarConCarrito() {
  const { count, openCart } = useCart();
  return <Navbar cartCount={count} onCartClick={openCart} />;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NavbarConCarrito />
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
