// HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    // Aseguramos bg-black y una altura mínima impactante
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Círculo decorativo con opacidad sutil para dar profundidad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="text-white/60 tracking-[0.3em] uppercase text-xs font-light mb-6">
            Arte & Tradición Argentina
          </p>

          <h1 className="text-7xl md:text-9xl font-light text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ópalo
          </h1>

          <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Creaciones
          </h2>

          <div className="w-16 h-[1px] bg-white/40 mx-auto my-8" />

          <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg mx-auto">
            Cada pieza es única, hecha a mano con dedicación. <br/>
            Descubrí el arte de matear con estilo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <button
            onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-all"
          >
            <span className="text-xs tracking-[0.4em] uppercase">Explorar</span>
            <ChevronDown className="w-5 h-5 animate-bounce stroke-[1px]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}