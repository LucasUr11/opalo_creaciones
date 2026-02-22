import React, { useState, useEffect } from 'react';
import { getProductById } from '@/data/products'
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingBag, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ImageCarousel from '@/components/store/ImageCarousel';
import { useCart } from '@/components/store/CartContext';
import { categoryConfig } from '@/components/store/CategoryCard';
import Footer from '@/components/store/Footer';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);

    getProductById(productId).then(data => {
      setProduct(data);
      setIsLoading(false);
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#5297ac]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <p className="text-[#baa6a5] text-lg mb-4">Producto no encontrado</p>
        <Link to={createPageUrl('Products')} className="text-[#5297ac] hover:underline">
          Volver a productos
        </Link>
      </div>
    );
  }

  const catLabel = categoryConfig[product.category]?.label || product.category;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link
          to={createPageUrl('Products')}
          className="inline-flex items-center gap-2 text-[#baa6a5] hover:text-[#5297ac] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Image carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageCarousel images={product.images} />
          </motion.div>

          {/* Right - Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-[#5297ac] text-sm tracking-[0.2em] uppercase mb-3">{catLabel}</p>

            <h1 className="text-3xl md:text-4xl font-light text-[#3a3a3a] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {product.name}
            </h1>

            <div className="w-10 h-[1px] bg-[#5297ac]/30 mb-6" />

            <p className="text-3xl font-semibold text-[#5297ac] mb-6">
              ${product.price?.toLocaleString('es-AR')}
            </p>

            <p className="text-[#3a3a3a]/70 leading-relaxed text-base mb-8 flex-1">
              {product.description || 'Pieza artesanal hecha a mano con dedicación y los mejores materiales.'}
            </p>

            {/* Quantity selector */}
            <div className="mb-6">
              <p className="text-sm text-[#3a3a3a]/60 mb-3 tracking-wider uppercase">Cantidad</p>
              <div className="inline-flex items-center border border-[#e6e0cf] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#e6e0cf]/30 transition-colors"
                >
                  <Minus className="w-4 h-4 text-[#3a3a3a]" />
                </button>
                <span className="w-14 text-center font-medium text-[#3a3a3a]">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#e6e0cf]/30 transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#3a3a3a]" />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <Button
              onClick={handleAddToCart}
              className={`h-14 rounded-xl text-base tracking-wide transition-all ${added
                ? 'bg-green-500 hover:bg-green-500'
                : 'bg-[#5297ac] hover:bg-[#5297ac]/90'
                } text-white`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  ¡Agregado al carrito!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Agregar al carrito
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}