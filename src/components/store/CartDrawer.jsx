import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#e6e0cf]">
              <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Tu Carrito
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-[#e6e0cf]/50 rounded-full transition-colors">
                <X className="w-5 h-5 text-[#3a3a3a]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#baa6a5]/50 mb-4" />
                  <p className="text-[#baa6a5] text-lg font-light">Tu carrito está vacío</p>
                  <p className="text-[#baa6a5]/70 text-sm mt-1">Explorá nuestros productos</p>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex gap-4 p-3 rounded-xl bg-[#e6e0cf]/20"
                  >
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=100&h=100&fit=crop'}
                      alt={product.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#3a3a3a] truncate">{product.name}</h4>
                      <p className="text-[#5297ac] font-semibold text-sm mt-1">
                        ${product.price?.toLocaleString('es-AR')}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-full border border-[#baa6a5]/30 flex items-center justify-center hover:bg-[#debfb5]/20 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-full border border-[#baa6a5]/30 flex items-center justify-center hover:bg-[#debfb5]/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="ml-auto p-1.5 text-[#baa6a5] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#e6e0cf] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#3a3a3a]/70">Total</span>
                  <span className="text-2xl font-semibold text-[#3a3a3a]">
                    ${totalPrice.toLocaleString('es-AR')}
                  </span>
                </div>
                <Link to={createPageUrl('Checkout')} onClick={onClose}>
                  <Button className="w-full h-12 text-base rounded-xl bg-[#5297ac] hover:bg-[#5297ac]/90 text-white">
                    Finalizar Compra
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}