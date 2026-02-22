import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #5297ac 0%, #a6c6c1 40%, #e6e0cf 70%, #debfb5 100%)' }}>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#debfb5]/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/10" />
      
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="text-white/80 tracking-[0.3em] uppercase text-sm font-light mb-6">
            Arte & Tradición Argentina
          </p>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Ópalo
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Creaciones
          </h2>
          <div className="w-16 h-[1px] bg-white/60 mx-auto my-8" />
          <p className="text-white/70 text-lg font-light leading-relaxed max-w-lg mx-auto">
            Cada pieza es única, hecha a mano con amor y dedicación. Descubrí el arte de matear con estilo.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12"
        >
          <button 
            onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">Explorar</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}