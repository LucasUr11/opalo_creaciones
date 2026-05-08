import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase"
import { motion } from 'framer-motion';
import HeroSection from '@/components/store/HeroSection';
import CategoryCard from '@/components/store/CategoryCard';
import ProductCard from '@/components/store/ProductCard';
import Footer from '@/components/store/Footer';


const DISPLAY_CATEGORIES = [
  { id: 'mates', label: 'Mates', sub: ['mates_torpedo', 'mates_imperiales', 'mates_madera', 'mates_camionero'] },
  { id: 'bombillas', label: 'Bombillas', sub: ['bombillas'] },
  { id: 'yerberas', label: 'Yerberas', sub: ['yerberas_azucareras'] },
  { id: 'otros', label: 'Otros', sub: ['cuencos_tablas', 'cajas'] }
];

export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        console.error("Error trayendo productos:", error)
      } else {
        setProducts(data)
      }

      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  const featuredProducts = products.filter(p => p.featured);

  const getGroupImage = (subCategories) => {
    // Buscamos el primer producto que pertenezca a cualquiera de las subcategorías del grupo
    const product = products.find(p => subCategories.includes(p.category) && p.images?.length > 0);
    return product?.images?.[0] || "/placeholder.jpg";
  };

  return (
    <div className="min-h-screen bg-[#fafafa]"> {/* Un blanco roto/gris muy suave ayuda a la transición */}
      <HeroSection />

      {/* Categories Section */}
      <section id="categorias" className="max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
  
          <p className="text-[#5297ac] text-sm tracking-[0.3em] uppercase mb-4">Colecciones</p>
          <h2 className="text-4xl md:text-6xl font-light text-[#2a2a2a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Nuestras Categorías
          </h2>
          <div className="w-12 h-[1px] bg-[#5297ac]/40 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DISPLAY_CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              categoryKey={cat.id}
              label={cat.label}
              index={i}
              image={getGroupImage(cat.sub)}
            />
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
          <h2 className="text-4xl md:text-5xl text-zinc-800 font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Cada pieza cuenta una historia
          </h2>
          <p className="text-zinc/80 text-lg font-light leading-relaxed">
            Trabajamos con materiales nobles y técnicas artesanales para crear piezas que trascienden el tiempo.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}