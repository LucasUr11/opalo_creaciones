import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useCart } from '@/components/store/CartContext';
import { categoryConfig } from '@/components/store/CategoryCard';

const WHATSAPP_NUMBER = '+54 9 3537669534'; // Reemplazar con el número real

export default function Checkout() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    provincia: '',
    localidad: '',
    codigo_postal: '',
    telefono: ''
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = form.nombre && form.email && form.provincia && form.localidad && form.codigo_postal && form.telefono;

  const handleSubmit = () => {
    if (!isFormValid || items.length === 0) return;

    const itemsText = items.map(({ product, quantity }) => {
      const catLabel = categoryConfig[product.category]?.label || product.category;
      return `• ${product.name} (${catLabel}) x${quantity} — $${(product.price * quantity).toLocaleString('es-AR')}`;
    }).join('\n');

    const message = `🧉 *Nuevo pedido — Ópalo Creaciones*\n\n` +
      `*Datos del cliente:*\n` +
      `Nombre: ${form.nombre}\n` +
      `Email: ${form.email}\n` +
      `Provincia: ${form.provincia}\n` +
      `Localidad: ${form.localidad}\n` +
      `Código Postal: ${form.codigo_postal}\n` +
      `Teléfono: ${form.telefono}\n\n` +
      `*Pedido:*\n${itemsText}\n\n` +
      `*Total: $${totalPrice.toLocaleString('es-AR')}*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    clearCart();
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to={createPageUrl('Products')}
          className="inline-flex items-center gap-2 text-[#baa6a5] hover:text-[#5297ac] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Seguir comprando
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-light text-[#3a3a3a] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Finalizar Compra
          </h1>
          <div className="w-12 h-[1px] bg-[#5297ac] mb-10" />
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#baa6a5] text-lg font-light mb-4">Tu carrito está vacío</p>
            <Link to={createPageUrl('Products')}>
              <Button className="bg-[#5297ac] hover:bg-[#5297ac]/90 text-white rounded-xl">
                Ver productos
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Order summary */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h2 className="text-xl font-light text-[#3a3a3a] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 p-3 rounded-xl bg-white border border-[#e6e0cf]/50">
                    <img
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=80&h=80&fit=crop'}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#3a3a3a] truncate">{product.name}</h4>
                      <p className="text-[#5297ac] text-sm font-semibold">${product.price?.toLocaleString('es-AR')}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-6 h-6 rounded-full border border-[#baa6a5]/30 flex items-center justify-center text-xs">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium w-5 text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-6 h-6 rounded-full border border-[#baa6a5]/30 flex items-center justify-center text-xs">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeItem(product.id)} className="ml-auto text-[#baa6a5] hover:text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e6e0cf] pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#3a3a3a]/70">Total</span>
                  <span className="text-2xl font-semibold text-[#3a3a3a]">${totalPrice.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>

            {/* Customer form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <h2 className="text-xl font-light text-[#3a3a3a] mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Datos de Envío
              </h2>

              <div className="bg-white rounded-2xl border border-[#e6e0cf]/50 p-6 md:p-8 space-y-5">
                <div>
                  <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Nombre completo *</Label>
                  <Input
                    value={form.nombre}
                    onChange={e => handleChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                  />
                </div>

                <div>
                  <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Provincia *</Label>
                    <Input
                      value={form.provincia}
                      onChange={e => handleChange('provincia', e.target.value)}
                      placeholder="Ej: Buenos Aires"
                      className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Localidad *</Label>
                    <Input
                      value={form.localidad}
                      onChange={e => handleChange('localidad', e.target.value)}
                      placeholder="Ej: San Isidro"
                      className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Código Postal *</Label>
                    <Input
                      value={form.codigo_postal}
                      onChange={e => handleChange('codigo_postal', e.target.value)}
                      placeholder="Ej: 1642"
                      className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs tracking-wider uppercase text-[#3a3a3a]/60 mb-2 block">Teléfono *</Label>
                    <Input
                      value={form.telefono}
                      onChange={e => handleChange('telefono', e.target.value)}
                      placeholder="Ej: 11 2345-6789"
                      className="h-12 rounded-xl border-[#e6e0cf] focus:ring-[#5297ac] focus:border-[#5297ac]"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full h-14 rounded-xl text-base tracking-wide bg-green-600 hover:bg-green-700 text-white mt-4 disabled:opacity-40"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Pedido por WhatsApp
                </Button>

                <p className="text-xs text-center text-[#baa6a5]">
                  Al hacer clic, se abrirá WhatsApp con los detalles de tu pedido.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}