import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryConfig = {
  mates_torpedo: {
    label: 'Mates Torpedo',
    image: ["/images/mate_torpedo-1.jpeg"],
    description: 'Clásicos y elegantes'
  },
  mates_imperiales: {
    label: 'Mates Imperiales',
    image: ["/images/mate_imperial-1.png"],
    description: 'Para los más exigentes'
  },
  mates_madera: {
    label: 'Mates de Madera',
    image: ["/images/mate_madera-1.jpeg"],
    description: 'Diseños personalizados a mano'
  },
  cuencos_tablas: {
    label: 'Cuencos y Tablas',
    image: ["/images/cuenco_tabla-1.jpeg"],
    description: 'Arte funcional en madera'
  },
  bombillas: {
    label: 'Bombillas',
    image: ["/images/bombilla-1.jpeg"],
    description: 'El complemento perfecto'
  },
  yerberas_azucareras: {
    label: 'Yerberas y Azucareras',
    image: ["/images/yerbera_azucarera-1.jpg"],
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