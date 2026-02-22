import React from 'react';
import { CartProvider } from '@/components/store/CartContext';
import Navbar from '@/components/store/NavBar.jsx';

export default function Layout({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f5f1ea]">
        <Navbar />
        <main>{children}</main>
      </div>
    </CartProvider>
  );
}