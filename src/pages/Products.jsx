import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/store/ProductCard';
import Footer from '@/components/store/Footer';
import { Loader2 } from 'lucide-react';
import { categoryConfig } from '@/components/store/CategoryCard';
import { supabase } from "../lib/supabase"

const NEW_CATEGORIES = {
  mates: { label: 'Mates', sub: ['mates_torpedo', 'mates_imperiales', 'mates_madera', 'mates_camionero', 'mates_criollo', 'mates_rancheros'] },
  bombillas: { label: 'Bombillas', sub: ['bombillas'] },
  yerberas: { label: 'Yerberas', sub: ['yerberas_azucareras'] },
  otros: { label: 'Otros', sub: ['cuencos_tablas', 'cajas'] },
  cuadros: { label: 'Cuadros y Marcos', sub: ['cuadros'] },
  prendas: { label: 'Prendas', sub: ['prendas'] }
};

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name")

      if (error) {
        console.error("Error trayendo productos:", error)
      } else {
        setProducts(data)
      }

      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;

    // Obtenemos las subcategorías permitidas para el filtro activo
    const allowedSubs = NEW_CATEGORIES[activeCategory]?.sub || [];
    return products.filter(p => allowedSubs.includes(p.category));
  }, [products, activeCategory]);

  return (
    <div className="min-h-screen pt-20">

      {/* Header */}
      <div className="bg-white border-b border-[#e6e0cf]">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#5297ac] text-sm tracking-[0.3em] uppercase mb-3">Catálogo</p>
            <h1 className="text-4xl md:text-5xl font-light text-[#3a3a3a]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {activeCategory !== 'all' && categoryConfig[activeCategory]
                ? categoryConfig[activeCategory].label
                : 'Todos los Productos'}
            </h1>
          </motion.div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm transition-all ${activeCategory === 'all' ? 'bg-[#5297ac] text-white' : 'bg-white border'}`}
          >
            Todos
          </button>

          {Object.entries(NEW_CATEGORIES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${activeCategory === key ? 'bg-[#5297ac] text-white' : 'bg-white border'}`}
            >
              {value.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#5297ac]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#baa6a5] text-lg font-light">No hay productos en esta categoría aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}