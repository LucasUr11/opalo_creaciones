import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryConfig = {
  mates_torpedo: {
    label: 'Mates Torpedo',
    image: 'https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=600&h=700&fit=crop',
    description: 'Clásicos y elegantes'
  },
  mates_imperiales: {
    label: 'Mates Imperiales',
    image: 'https://images.unsplash.com/photo-1576487236230-eaa4afe68192?w=600&h=700&fit=crop',
    description: 'Para los más exigentes'
  },
  mates_madera: {
    label: 'Mates de Madera',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&h=700&fit=crop',
    description: 'Diseños personalizados a mano'
  },
  cuencos_tablas: {
    label: 'Cuencos y Tablas',
    image: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=700&fit=crop',
    description: 'Arte funcional en madera'
  },
  bombillas: {
    label: 'Bombillas',
    image: 'https://images.unsplash.com/photo-1586195831252-3e3e445e74f2?w=600&h=700&fit=crop',
    description: 'El complemento perfecto'
  },
  yerberas_azucareras: {
    label: 'Yerberas y Azucareras',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=700&fit=crop',
    description: 'De tela artesanal'
  }
};

export default function CategoryCard({ categoryKey, index }) {
  const config = categoryConfig[categoryKey];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={createPageUrl('Products') + `?category=${categoryKey}`}
        className="group block relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
      >
        <img
          src={config.image}
          alt={config.label}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/70 text-sm tracking-wider uppercase mb-1">{config.description}</p>
          <h3 className="text-white text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {config.label}
          </h3>
          <div className="w-0 group-hover:w-12 h-[1px] bg-white/80 transition-all duration-500 mt-3" />
        </div>
      </Link>
    </motion.div>
  );
}

export { categoryConfig };