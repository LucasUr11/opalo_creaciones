
const products = [

  //Mates Imperiales.-
  {
    id: "imperial-negro-liso",
    name: "Mate Imperial Negro Liso",
    price: 32000,
    category: "mates_imperiales",
    images: ["/images/mate_imperial-1.png"],
    description: "Mate imperial forrado en cuero negro liso con virola de acero inoxidable.",
    featured: true
  },
  {
    id: "imperial-marron-cincelado",
    name: "Mate Imperial Marrón Cincelado",
    price: 35000,
    category: "mates_imperiales",
    images: ["/images/mate_imperial-2.png"],
    description: "Imperial forrado en cuero marrón con detalles cincelados artesanales."
  },
  {
    id: "imperial-grabado-criollo",
    name: "Mate Imperial Grabado Criollo",
    price: 38000,
    category: "mates_imperiales",
    images: ["/images/mate_imperial-3.png"],
    description: "Mate imperial con virola grabada estilo criollo tradicional."
  },
  {
    id: "imperial-premium-alpaca",
    name: "Mate Imperial Premium Alpaca",
    price: 42000,
    category: "mates_imperiales",
    images: ["/images/mate_imperial-4.png"],
    description: "Imperial premium con virola de alpaca y base reforzada."
  },
  {
    id: "imperial-azul-petroleo",
    name: "Mate Imperial Azul Petróleo",
    price: 34000,
    category: "mates_imperiales",
    images: ["/images/mate_imperial-5.png"],
    description: "Mate imperial forrado en cuero azul petróleo con costura reforzada."
  },

  // Mates Torpedos.-
  {
    id: "torpedo-negro-clasico",
    name: "Mate Torpedo Negro Clásico",
    price: 28000,
    category: "mates_torpedo",
    images: ["/images/mate_torpedo-1.jpeg"],
    description: "Mate torpedo forrado en cuero negro con base estable.",
    featured: true
  },
  {
    id: "torpedo-marron-artesanal",
    name: "Mate Torpedo Marrón Artesanal",
    price: 30000,
    category: "mates_torpedo",
    images: ["/images/mate_torpedo-2.jpeg"],
    description: "Torpedo de calabaza natural forrado en cuero marrón."
  },
  {
    id: "torpedo-cuero-rustico",
    name: "Mate Torpedo Cuero Rústico",
    price: 31000,
    category: "mates_torpedo",
    images: ["/images/mate_torpedo-3.jpeg"],
    description: "Diseño rústico con costuras visibles y acabado artesanal."
  },
  {
    id: "torpedo-premium-acero",
    name: "Mate Torpedo Premium Acero",
    price: 33000,
    category: "mates_torpedo",
    images: ["/images/mate_torpedo-2.jpeg"],
    description: "Mate torpedo con virola de acero pulido."
  },
  {
    id: "torpedo-verde-oliva",
    name: "Mate Torpedo Verde Oliva",
    price: 29500,
    category: "mates_torpedo",
    images: ["/images/mate_torpedo-3.jpeg"],
    description: "Mate torpedo moderno en cuero verde oliva."
  },

  // Mates de Madera.-
  {
    id: "madera-algarrobo",
    name: "Mate de Algarrobo Natural",
    price: 18000,
    category: "mates_madera",
    images: ["/images/mate_madera-1.jpeg"],
    description: "Mate tallado en algarrobo macizo."
  },
  {
    id: "madera-robles",
    name: "Mate de Roble Artesanal",
    price: 20000,
    category: "mates_madera",
    images: ["/images/mate_madera-1.jpeg"],
    description: "Mate de roble con acabado pulido."
  },
  {
    id: "madera-labrado",
    name: "Mate de Madera Labrado",
    price: 22000,
    category: "mates_madera",
    images: ["/images/mate_madera-1.jpeg"],
    description: "Tallado a mano con detalles artesanales."
  },
  {
    id: "madera-quemado",
    name: "Mate Madera Efecto Quemado",
    price: 21000,
    category: "mates_madera",
    images: ["/images/mate_madera-1.jpeg"],
    description: "Acabado estilo quemado con barniz protector."
  },
  {
    id: "madera-premium",
    name: "Mate de Madera Premium",
    price: 24000,
    category: "mates_madera",
    images: ["/images/mate_madera-1.jpeg"],
    description: "Selección premium con interior curado."
  },

  // Bombillas.-
  {
    id: "bombilla-acero-clasica",
    name: "Bombilla Acero Inoxidable Clásica",
    price: 6000,
    category: "bombillas",
    images: ["/images/bombilla-1.jpeg"],
    description: "Bombilla clásica de acero inoxidable."
  },
  {
    id: "bombilla-alpaca-labrada",
    name: "Bombilla Alpaca Labrada",
    price: 9500,
    category: "bombillas",
    images: ["/images/bombilla-1.jpeg"],
    description: "Bombilla de alpaca con detalles labrados."
  },
  {
    id: "bombilla-pico-loro",
    name: "Bombilla Pico de Loro",
    price: 8500,
    category: "bombillas",
    images: ["/images/bombilla-1.jpeg"],
    description: "Diseño tradicional pico de loro."
  },
  {
    id: "bombilla-resorte",
    name: "Bombilla con Resorte Desmontable",
    price: 7500,
    category: "bombillas",
    images: ["/images/bombilla-1.jpeg"],
    description: "Fácil limpieza con sistema desmontable."
  },
  {
    id: "bombilla-dorada",
    name: "Bombilla Dorada Premium",
    price: 11000,
    category: "bombillas",
    images: ["/images/bombilla-1.jpeg"],
    description: "Acabado dorado elegante y resistente."
  },

  // Cuencos y tablas.-
  {
    id: "tabla-asado-grande",
    name: "Tabla de Asado Grande",
    price: 26000,
    category: "cuencos_tablas",
    images: ["/images/cuenco_tabla-1.jpeg"],
    description: "Tabla de madera maciza ideal para asado."
  },
  {
    id: "tabla-rustica",
    name: "Tabla Rústica Artesanal",
    price: 22000,
    category: "cuencos_tablas",
    images: ["/images/cuenco_tabla-1.jpeg"],
    description: "Estilo rústico con vetas naturales."
  },
  {
    id: "cuenco-algarrobo",
    name: "Cuenco de Algarrobo",
    price: 15000,
    category: "cuencos_tablas",
    images: ["/images/cuenco_tabla-1.jpeg"],
    description: "Cuenco artesanal de madera maciza."
  },
  {
    id: "tabla-mango-metal",
    name: "Tabla con Mango y Detalle Metal",
    price: 24000,
    category: "cuencos_tablas",
    images: ["/images/cuenco_tabla-1.jpeg"],
    description: "Tabla premium con mango reforzado."
  },
  {
    id: "cuenco-premium",
    name: "Cuenco Premium Tallado",
    price: 18000,
    category: "cuencos_tablas",
    images: ["/images/cuenco_tabla-1.jpeg"],
    description: "Tallado artesanal con acabado protector."
  },

  // Yerberas y azucareras.-
  {
    id: "yerbera-cuero-negra",
    name: "Yerbera Cuero Negra",
    price: 19000,
    category: "yerberas_azucareras",
    images: ["/images/yerbera_azucarera-1.jpg"],
    description: "Yerbera forrada en cuero negro con cierre metálico."
  },
  {
    id: "yerbera-marron",
    name: "Yerbera Marrón Clásica",
    price: 18500,
    category: "yerberas_azucareras",
    images: ["/images/yerbera_azucarera-1.jpg"],
    description: "Diseño clásico y resistente."
  },
  {
    id: "azucarera-acero",
    name: "Azucarera de Acero Inoxidable",
    price: 12000,
    category: "yerberas_azucareras",
    images: ["/images/yerbera_azucarera-1.jpg"],
    description: "Azucarera moderna con tapa hermética."
  },
  {
    id: "azucarera-cuero",
    name: "Azucarera Forrada en Cuero",
    price: 15000,
    category: "yerberas_azucareras",
    images: ["/images/yerbera_azucarera-1.jpg"],
    description: "Diseño artesanal combinando acero y cuero."
  },
  {
    id: "yerbera-premium",
    name: "Yerbera Premium Alpaca",
    price: 23000,
    category: "yerberas_azucareras",
    images: ["/images/yerbera_azucarera-1.jpg"],
    description: "Modelo premium con detalles en alpaca.",
    featured: true
  }
]

// Simula traer todos los productos
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 800) // simula 800ms de carga
  })
}

// Simula traer un producto por ID
export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === id))
    }, 500)
  })
}