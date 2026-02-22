import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#3a3a3a] text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl text-white font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Ópalo Creaciones
            </h3>
            <p className="text-sm leading-relaxed">
              Arte argentino hecho a mano. Cada pieza cuenta una historia única.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-4">Categorías</h4>
            <ul className="space-y-2 text-sm">
              <li>Mates Torpedo</li>
              <li>Mates Imperiales</li>
              <li>Mates de Madera</li>
              <li>Cuencos y Tablas</li>
              <li>Bombillas</li>
              <li>Yerberas y Azucareras</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-4">Contacto</h4>
            <p className="text-sm leading-relaxed">
              Escribinos por WhatsApp para consultas y pedidos personalizados.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} Ópalo Creaciones. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}