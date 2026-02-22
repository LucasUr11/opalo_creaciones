import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ProductCard({ product, index }) {
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=400&h=400&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={createPageUrl('ProductDetail') + `?id=${product.id}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-xl aspect-square bg-[#e6e0cf]/30 mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
        <div className="space-y-1 px-1">
          <h3 className="text-[#3a3a3a] font-medium text-sm tracking-wide group-hover:text-[#5297ac] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#5297ac] text-lg font-semibold">
            ${product.price?.toLocaleString('es-AR')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}