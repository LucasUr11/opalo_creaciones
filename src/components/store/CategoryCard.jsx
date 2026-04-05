import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Mantenemos esto por compatibilidad, pero agregamos las nuevas categorías principales
const categoryConfig = {
  // Categorías agrupadas (Nuevas)
  mates: { label: 'Mates' },
  bombillas: { label: 'Bombillas' },
  yerberas: { label: 'Yerberas' },
  otros: { label: 'Otros' },
  cuadros: { label: 'Cuadros y Marcos' },
  prendas: { label: 'Prendas' },
  
  // Subcategorías originales (para que no rompa si se usan individualmente)
  mates_torpedo: { label: 'Mates Torpedos' },
  mates_imperiales: { label: 'Mates Imperiales' },
  mates_madera: { label: 'Mates de Madera' },
  mates_camionero: { label: 'Mates Camionero' },
  mates_rancheros: { label: 'Mates Rancheros' },
  mates_criollo: { label: 'Mates Criollo' },
  cajas: { label: 'Cajas' },
  prendas: { label: 'Prendas' },
  cuadros: { label: 'Cuadros' },
  cuencos_tablas: { label: 'Cuencos y Tablas' },
  bombillas: { label: 'Bombillas' },
  yerberas_azucareras: { label: 'Yerberas y Azucareras' }
};

export default function CategoryCard({ categoryKey, index, image, label }) {
  // Priorizamos el 'label' que viene por props, si no, usamos el del config
  const displayLabel = label || categoryConfig[categoryKey]?.label || categoryKey;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={createPageUrl('Products') + `?category=${categoryKey}`}
        className="group block relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer bg-zinc-100"
      >
        <img
          src={image}
          alt={displayLabel}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay optimizado para que el texto siempre sea legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">Colección</p>
          <h3 className="text-white text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {displayLabel}
          </h3>
          
          {/* Línea decorativa "futurista/limpia" */}
          <div className="w-0 group-hover:w-16 h-[1px] bg-[#5297ac] transition-all duration-500 mt-4" />
        </div>
      </Link>
    </motion.div>
  );
}

export { categoryConfig };