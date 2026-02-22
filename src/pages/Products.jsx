import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/store/ProductCard';
import Footer from '@/components/store/Footer';
import { Loader2 } from 'lucide-react';
import { categoryConfig } from '@/components/store/CategoryCard';
import { getProducts } from '@/data/products'

const categoryKeys = [
  'mates_torpedo',
  'mates_imperiales',
  'mates_madera',
  'cuencos_tablas',
  'bombillas',
  'yerberas_azucareras'
];

export default function Products() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
      setIsLoading(false)
    })
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
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
            className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all ${activeCategory === 'all'
              ? 'bg-[#5297ac] text-white shadow-md'
              : 'bg-white text-[#3a3a3a] border border-[#e6e0cf] hover:border-[#5297ac] hover:text-[#5297ac]'
              }`}
          >
            Todos
          </button>
          {categoryKeys.map(key => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all ${activeCategory === key
                ? 'bg-[#5297ac] text-white shadow-md'
                : 'bg-white text-[#3a3a3a] border border-[#e6e0cf] hover:border-[#5297ac] hover:text-[#5297ac]'
                }`}
            >
              {categoryConfig[key]?.label || key}
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