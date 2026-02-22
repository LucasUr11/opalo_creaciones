import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/store/HeroSection';
import CategoryCard from '@/components/store/CategoryCard';
import ProductCard from '@/components/store/ProductCard';
import Footer from '@/components/store/Footer';
import { getProducts } from '@/data/products';

const categories = [
  'mates_torpedo',
  'mates_imperiales',
  'mates_madera',
  'cuencos_tablas',
  'bombillas',
  'yerberas_azucareras'
];

export default function Home() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  const featuredProducts = products.filter(p => p.featured);

  
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Categories Section */}
      <section id="categorias" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#5297ac] text-sm tracking-[0.3em] uppercase mb-3">Descubrí</p>
          <h2 className="text-4xl md:text-5xl font-light text-[#3a3a3a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Nuestras Categorías
          </h2>
          <div className="w-12 h-[1px] bg-[#5297ac] mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat} categoryKey={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {!isLoading && featuredProducts.length > 0 && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#5297ac] text-sm tracking-[0.3em] uppercase mb-3">Selección</p>
              <h2 className="text-4xl md:text-5xl font-light text-[#3a3a3a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Productos Destacados
              </h2>
              <div className="w-12 h-[1px] bg-[#5297ac] mx-auto mt-6" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Banner */}
      <section className="py-24 text-center"
        style={{ background: 'linear-gradient(135deg, #debfb5 0%, #e6e0cf 50%, #a6c6c1 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl text-white font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Cada pieza cuenta una historia
          </h2>
          <p className="text-white/80 text-lg font-light leading-relaxed">
            Trabajamos con materiales nobles y técnicas artesanales para crear piezas que trascienden el tiempo.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}