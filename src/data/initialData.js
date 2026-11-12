// ==========================================================================
// CERVECERÍA NORTA - DATA ENGINE & ENTERPRISE ARCHITECTURE SEED (V5.0)
// ==========================================================================

export const INITIAL_BREWERY_DATA = {
  // Configuración general de Cervecería NORTA
  info: {
    name: "NORTA",
    tagline: "Fuerza silenciosa • Calma con carácter • Aventura interior",
    nit: "901.482.930-4",
    location: "Planta Principal - Km 4 Vía Sabana Norte",
    capacityMonthlyLiters: 15000,
    headBrewer: "Ing. Julio Roberto Cristancho",
    financialLead: "CP Yesid Ariza",
    costAuditor: "CP Eduardo Ariza",
    plantAdmin: "Adm. Cristian",
    commercialLead: "Comercial Ivan Ahumada"
  },

  // Manual e Identidad de Marca NORTA (Brand Book Digital Oficial)
  brandIdentity: {
    primaryTypography: "Cinzel / Libre Baskerville (Títulos Épicos & Manifiesto)",
    secondaryTypography: "Lato (Cuerpo Analítico & Datos)",
    codeTypography: "JetBrains Mono (Metrología & Trazabilidad)",
    manifesto: "Fuerza silenciosa • Calma con carácter • Aventura interior",
    manifestoLong: "Forjada en la meseta de la Sabana Norte, Cervecería NORTA nace de una devoción austera e innegociable por la verdad del oficio cervecero. Entendemos el frío no como un obstáculo, sino como un crisol de paciencia biológica. Nuestras cervezas no gritan: se asientan en la copa con la calma imperturbable de las cordilleras y la densidad de las materias primas nobles. Cada receta es una expedición hacia el carácter puro, donde el agua de manantial, los cereales seleccionados y los lúpulos de alta fidelidad dialogan en silencio para despertar el espíritu de aventura interior.",
    colors: [
      {
        name: "Azul Profundo",
        hex: "#0e2334",
        rgb: "rgb(14, 35, 52)",
        pantone: "539 C",
        usage: "Fondos institucionales, acentos fríos, maduración en bodega, solemnidad andina",
        symbolism: "El cielo nocturno sobre el páramo andino, agua pura de manantial y la calma de las alturas."
      },
      {
        name: "Marrón Tierra",
        hex: "#4d3720",
        rgb: "rgb(77, 55, 32)",
        pantone: "4625 C",
        usage: "Maltas tostadas, barricas de roble, estructuras rústicas, calidez y solidez",
        symbolism: "Tierra fértil de cultivo, corteza de roble centenario y la caramelización profunda de la cebada."
      },
      {
        name: "Verde Musgo",
        hex: "#3a452d",
        rgb: "rgb(58, 69, 45)",
        pantone: "5743 C",
        usage: "Lúpulos frescos, certificación biológica, naturaleza indómita e inocuidad",
        symbolism: "Conos de lúpulo fresco en floración, sotobosque de montaña y vitalidad botánica."
      },
      {
        name: "Dorado Tenue",
        hex: "#b89764",
        rgb: "rgb(184, 151, 100)",
        pantone: "7509 C",
        usage: "Acentos de prestigio, tipografía titular, sellos de lacre, coronas de espuma",
        symbolism: "La corona de espuma brillante, la cebada dorada madura al atardecer y la nobleza del maestro cervecero."
      },
      {
        name: "Negro Carbón",
        hex: "#1d1d1b",
        rgb: "rgb(29, 29, 27)",
        pantone: "Black 6 C",
        usage: "Fondos de alto contraste, tipografía institucional sólida, roca volcánica",
        symbolism: "Malta torrefacta a fuego lento, basalto de cordillera y elegancia sobria innegociable."
      },
      {
        name: "Blanco Papiro",
        hex: "#f7f4ed",
        rgb: "rgb(247, 244, 237)",
        pantone: "Warm Gray 1 C",
        usage: "Fondo principal de lectura, tarjetas apergaminadas, fichas de cata y precisión",
        symbolism: "Pergamino de bitácora cervecera, transparencia de proceso y luz analítica."
      }
    ],
    typographySpec: [
      {
        family: "Cinzel",
        role: "Títulos Heráldicos & Monumentales (H1, H2, Emblema)",
        weights: "600 Bold, 700 Extrabold, 900 Black",
        concept: "Inspirada en las inscripciones clásicas en piedra romana, evoca nobleza, autoridad intemporal y la fuerza inmutable de la roca andina."
      },
      {
        family: "Libre Baskerville",
        role: "Epígrafes, Citas de Autor & Manifiesto",
        weights: "400 Regular, 400 Italic, 700 Bold",
        concept: "Elegancia editorial serif de tradición inglesa; aporta serenidad, cadencia literaria y respeto por la historia cervecera artesanal."
      },
      {
        family: "Lato",
        role: "Cuerpo Analítico, Dashboards & Interfaz",
        weights: "300 Light, 400 Regular, 700 Bold",
        concept: "Humanista pero geométrica, diseñada con proporciones armónicas que garantizan máxima legibilidad técnica tanto en pantalla como en etiquetas físicas."
      },
      {
        family: "JetBrains Mono",
        role: "Metrología, Trazabilidad & Telemetría",
        weights: "400 Regular, 600 SemiBold",
        concept: "Monoespaciada de alta precisión para registros de lote, gravedad específica OG/FG, lecturas de pH y metrología INVIMA de laboratorio."
      }
    ],
    pillars: [
      {
        id: "p1",
        title: "Fuerza silenciosa",
        subtitle: "Magnitud sin estridencias",
        concept: "La serenidad y magnitud de las cumbres del norte. Cervezas que no necesitan artificios para imponer su presencia; su profundidad y estructura hablan por sí mismas.",
        image: "./assets/brand_moodboard.jpg"
      },
      {
        id: "p2",
        title: "Calma con carácter",
        subtitle: "Equilibrio denso y memorable",
        concept: "Cervezas con cuerpo consistente, complejidad fermentativa y espuma densa y aterciopelada que permanece en la copa como testimonio de maduración paciente.",
        image: "./assets/beers.jpg"
      },
      {
        id: "p3",
        title: "Naturaleza indómita",
        subtitle: "Pureza botánica de origen",
        concept: "Ingredientes botánicos puros, agua de manantial de la sabana tratada con precisión iónica y el llamado perenne de los senderos abiertos y la montaña andina.",
        image: "./assets/brand_moodboard.jpg"
      },
      {
        id: "p4",
        title: "Aventura interior",
        subtitle: "Exploración sensorial continua",
        concept: "La brújula artesanal de exploración cervecera. Cada trago es un viaje organoléptico hacia perfiles sensoriales inesperados, equilibrados y profundos.",
        image: "./assets/compass.jpg"
      },
      {
        id: "p5",
        title: "Elegancia terrosa",
        subtitle: "Materia viva y diseño sobrio",
        concept: "Embotellado en vidrio ámbar y gres cerámico, texturas minerales, sellos de autenticidad en lacre y sobriedad gráfica de nivel editorial europeo.",
        image: "./assets/brand_moodboard.jpg"
      },
      {
        id: "p6",
        title: "Raíces del norte",
        subtitle: "Herencia y devoción artesanal",
        concept: "Pizarra negra, madera añejada, respeto por los métodos tradicionales reinterpretados con rigor metrológico y maestría en el altiplano andino.",
        image: "./assets/brand_moodboard.jpg"
      }
    ],
    decalogo: [
      { num: "01", title: "Paciencia Fermentativa", desc: "El tiempo no se apresura. Respetamos los 21 a 45 días de maduración en frío que cada estilo demanda para redondear sus aristas de manera natural." },
      { num: "02", title: "Pureza Hidráulica", desc: "Agua de manantial de la Sabana Norte, perfilada iónicamente mineral a mineral para cada receta bajo estricto cumplimiento del Decreto 2115." },
      { num: "03", title: "Granos Nobles de Origen", desc: "100% malta de cebada, trigo y avena de grado cervecero de primer orden. Cero sucedáneos, jarabes de maíz ni aditivos industriales." },
      { num: "04", title: "Lúpulos Criogénicos T-90", desc: "Selección de conos y pellets criogénicos preservados rigurosamente bajo cadena de frío para capturar los aceites esenciales más volátiles." },
      { num: "05", title: "Clarificación por Gravedad y Frío", desc: "No filtramos químicamente ni utilizamos agentes sintéticos. La limpidez se logra mediante decantación natural a 0°C en tanques de guarda." },
      { num: "06", title: "Trazabilidad Grain-to-Glass", desc: "Cada botella y barril cuenta con código de lote auditable que permite verificar la fecha de molienda, curva de fermentación y operador a cargo." },
      { num: "07", title: "Asepsia y Protocolos POES", desc: "Higiene de estándar quirúrgico en tanques, mangueras y válvulas con ciclos CIP de sosa cáustica, ácido peracético y sanitización con vapor vivo." },
      { num: "08", title: "Rigor Estilístico con Firma Propia", desc: "Respeto a las pautas BJCP en balance y atenuación, enriquecidas con toques de autor andino como nibs de cacao criollo, café arábica y especias locales." },
      { num: "09", title: "Sostenibilidad de Planta Circular", desc: "Reutilización del 100% del bagazo de malta para alimentación de ganadería campesina de la sabana y recirculación térmica del calor de cocción." },
      { num: "10", title: "Comunidad y Conversación", desc: "Entendemos la cerveza no como un producto de consumo masivo, sino como un ritual de pausa, camaradería sincera y contemplación serena." }
    ],
    packagingConcepts: [
      {
        title: "Botellas Cerámicas & Vidrio Ámbar Pesado",
        type: "Ediciones de Guarda (Furia, Picosa)",
        desc: "Botellas de 500ml y 750ml en vidrio ámbar oscuro UV-proof y botellas de gres cerámico selladas con tapón de corcho y lacre negro carbón para añejamiento prolongado.",
        texture: "Vidrio grueso con grabado en relieve y serigrafía mate al horno en oro pálido.",
        image: "./assets/brand_moodboard.jpg"
      },
      {
        title: "Latas Craft Sleek con Barniz Táctil",
        type: "Línea Fresca (Máxima, Origen, Briosa, Tradicional)",
        desc: "Aluminio 100% reciclable de 473ml (Pinta Americana) con acabado mate soft-touch y acentos en dorado tenue brillante sobre base negro carbón.",
        texture: "Micro-textura apergaminada resistente a la condensación con barrera total contra la luz y el oxígeno.",
        image: "./assets/beers.jpg"
      },
      {
        title: "Cristalería de Precisión Aromática",
        type: "Servicio Sommelier de la Casa",
        desc: "Copas Teku de cristal soplado para IPAs y estilos lupulados, cálices belgas pesados para Stouts y vasos pilsner cónicos para blonde ales doradas.",
        texture: "Borde fino con corte láser y serigrafía de la brújula NORTA a 35ml de la boca.",
        image: "./assets/compass.jpg"
      }
    ]
  },

  // 1. REPOSITORIO DOCUMENTAL INTELIGENTE (DOCUMENT MANAGEMENT SYSTEM - DMS / BPM / INVIMA)
  documentRepository: [
    {
      id: "DOC-INV-001",
      title: "Registro Sanitario INVIMA - NORTA Furia (Imperial Stout)",
      category: "Registros INVIMA",
      fileName: "RSA-0008761-2021_Furia.pdf",
      version: "v2.1",
      uploadDate: "2023-09-28",
      expiryDate: "2026-09-28",
      linkedBatch: "LOT-2026-087",
      status: "Alerta Renovación (46 días)",
      verifiedBy: "CP Yesid Ariza",
      fileSize: "2.4 MB",
      fileType: "application/pdf"
    },
    {
      id: "DOC-COA-042",
      title: "Certificado de Análisis (COA) Malta Pale Ale 2-Row",
      category: "Certificados COA Insumos",
      fileName: "COA_MalteriaAndina_Lote42.pdf",
      version: "v1.0",
      uploadDate: "2026-08-01",
      expiryDate: "2027-08-01",
      linkedBatch: "LOT-2026-088",
      status: "Vigente & Aprobado",
      verifiedBy: "Ing. Julio Roberto Cristancho",
      fileSize: "1.1 MB",
      fileType: "application/pdf"
    },
    {
      id: "DOC-BPM-001",
      title: "Manual Integrado de BPM & POES (Resolución 2674/2013)",
      category: "Manuales BPM & POES",
      fileName: "Manual_BPM_NORTA_2026.pdf",
      version: "v3.0",
      uploadDate: "2026-01-10",
      expiryDate: "2027-01-10",
      linkedBatch: "Todos los Lotes",
      status: "Vigente & Aprobado",
      verifiedBy: "Adm. Cristian",
      fileSize: "4.8 MB",
      fileType: "application/pdf"
    },
    {
      id: "DOC-EMP-012",
      title: "Carnet de Manipulación Higiénica de Alimentos - Adm. Cristian",
      category: "Carnets Sanitarios Personal",
      fileName: "Carnet_Sanitario_Cristian_2026.pdf",
      version: "v1.0",
      uploadDate: "2025-09-15",
      expiryDate: "2026-09-15",
      linkedBatch: "Planta Operativa",
      status: "Próximo a Vencer (33 días)",
      verifiedBy: "Adm. Cristian",
      fileSize: "680 KB",
      fileType: "application/pdf"
    }
  ],

  // 2. RECETAS MAESTRAS DE NORTA (CATÁLOGO OFICIAL DE AUTOR)
  recipes: [
    {
      id: "REC-FURIA-01",
      name: "NORTA Furia",
      style: "Imperial Stout Café & Cacao",
      targetVolumeL: 1000,
      og: 1.092,
      fg: 1.022,
      abv: 9.2,
      ibu: 65,
      srmColor: 75.0,
      mashTemp: "67.5 °C (75 min)",
      boilTimeMin: 90,
      brandPillar: "Calma con carácter",
      liquidColor: "#120b08",
      glassware: "Copa Snifter o Cáliz Belga",
      servingTemp: "12°C - 14°C",
      pairing: "Carnes maduradas a la brasa, queso azul Stilton, trufas de chocolate oscuro 80% y postres de café.",
      intensity: { malt: 10, hops: 6, body: 10, roast: 10 },
      sensoryTags: ["Chocolate 80%", "Café Tostado", "Vainilla Bourbon", "Cuerpo Untuoso", "Licorosa"],
      grains: [
        { name: "Malta Pale Ale 2-Row", percentage: 65, kg: 290, rawId: "RAW-01" },
        { name: "Malta Chocolate Roasted", percentage: 12, kg: 54, rawId: "RAW-04" },
        { name: "Malta Caramelo 120L", percentage: 10, kg: 45, rawId: "RAW-03" },
        { name: "Cebada Tostada / Roasted Barley", percentage: 8, kg: 36, rawId: "RAW-04" },
        { name: "Copos de Avena", percentage: 5, kg: 22, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Columbus (Amargor 60m)", timing: "Hervor 60 min", g: 1800, rawId: "RAW-07" },
        { name: "East Kent Goldings", timing: "Aroma 15 min", g: 800, rawId: "RAW-07" }
      ],
      yeast: "SafAle S-04 / Maduración 35 días con Nibs de Cacao Araucano & Café Huila Supremo",
      sensoryDescription: "Cuerpo untuoso y denso como el petróleo negro. Explosión profunda de chocolate amargo 85%, notas a café espresso tostado, roble y vainilla bourbon con final cálido y licoroso."
    },
    {
      id: "REC-PICOSA-01",
      name: "NORTA Picosa",
      style: "Craft Especial Especiada",
      targetVolumeL: 1000,
      og: 1.060,
      fg: 1.014,
      abv: 6.0,
      ibu: 30,
      srmColor: 18.0,
      mashTemp: "66.0 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Elegancia terrosa",
      liquidColor: "#a64d19",
      glassware: "Copa Tulipa Craft",
      servingTemp: "8°C - 10°C",
      pairing: "Costillas BBQ en miel de agave, tacos de birria de autor, quesos provolone ahumados y ceviches especiados.",
      intensity: { malt: 7, hops: 5, body: 7, roast: 4 },
      sensoryTags: ["Ají Habanero", "Pimienta Rosa", "Caramelo Tostado", "Picante Cálido", "Balsámica"],
      grains: [
        { name: "Malta Pale Ale 2-Row", percentage: 78, kg: 210, rawId: "RAW-01" },
        { name: "Malta Caramelo 60L", percentage: 15, kg: 40, rawId: "RAW-03" },
        { name: "Malta Rye / Centeno", percentage: 7, kg: 19, rawId: "RAW-01" }
      ],
      hops: [
        { name: "Columbus", timing: "Hervor 60m", g: 950, rawId: "RAW-07" },
        { name: "Cascade", timing: "Whirlpool 10m", g: 600, rawId: "RAW-05" }
      ],
      yeast: "SafAle US-05 / Infusión fría de Chiles Habaneros seleccionados, Pimienta Rosa y Bayas de Enebro",
      sensoryDescription: "Innovación cervecera de autor con base maltosa cobriza dulce que da paso a un picor sutil, redondo y elegante en garganta. Sensación balsámica reconfortante de altísima complejidad."
    },
    {
      id: "REC-ORIGEN-01",
      name: "NORTA Origen",
      style: "Golden / Blonde Ale Clásica",
      targetVolumeL: 1000,
      og: 1.046,
      fg: 1.009,
      abv: 4.8,
      ibu: 22,
      srmColor: 6.0,
      mashTemp: "65.0 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Naturaleza indómita",
      liquidColor: "#f3c846",
      glassware: "Vaso Pilsner o Copa Teku",
      servingTemp: "4°C - 6°C",
      pairing: "Pescados blancos a la brasa, ceviche fresco, quesos de cabra suaves, carpaccio y ensaladas mediterráneas.",
      intensity: { malt: 4, hops: 4, body: 4, roast: 1 },
      sensoryTags: ["Cereal Limpio", "Pan Horneado", "Miel Blanca", "Cítrico Sutil", "Ultra Refrescante"],
      grains: [
        { name: "Malta Pilsner Premium", percentage: 88, kg: 185, rawId: "RAW-02" },
        { name: "Malta Pale Ale 2-Row", percentage: 8, kg: 17, rawId: "RAW-01" },
        { name: "Malta Carapils", percentage: 4, kg: 8, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Saaz", timing: "Hervor 60 min", g: 900, rawId: "RAW-07" },
        { name: "Citra T-90", timing: "Whirlpool 5 min", g: 700, rawId: "RAW-05" }
      ],
      yeast: "SafAle US-05 / Maduración 21 días a 0°C",
      sensoryDescription: "Dorada luminosa y cristalina con corona de espuma blanca y persistente. Notas aromáticas a cereal fresco, corteza de pan rústico, miel blanca y un suspiro cítrico noble. Impecable y sedienta."
    },
    {
      id: "REC-BRIOSA-01",
      name: "NORTA Briosa",
      style: "Amber Ale Vivaz de Cobre",
      targetVolumeL: 1000,
      og: 1.056,
      fg: 1.013,
      abv: 5.6,
      ibu: 35,
      srmColor: 24.0,
      mashTemp: "66.5 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Raíces del norte",
      liquidColor: "#c4591f",
      glassware: "Copa Nonic Pint o Tulipa",
      servingTemp: "6°C - 8°C",
      pairing: "Hamburguesas artesanales smash, quesos Gouda y Cheddar madurados, empanadas criollas y carnes ahumadas.",
      intensity: { malt: 8, hops: 6, body: 7, roast: 5 },
      sensoryTags: ["Toffee", "Avellanas Tostadas", "Cáscara de Naranja", "Cobre Brillante", "Final Redondo"],
      grains: [
        { name: "Malta Pale Ale 2-Row", percentage: 76, kg: 195, rawId: "RAW-01" },
        { name: "Malta Caramelo 60L", percentage: 16, kg: 41, rawId: "RAW-03" },
        { name: "Malta Munich Type II", percentage: 8, kg: 20, rawId: "RAW-02" }
      ],
      hops: [
        { name: "Columbus", timing: "Hervor 60 min", g: 900, rawId: "RAW-07" },
        { name: "Centennial", timing: "Whirlpool 15 min", g: 850, rawId: "RAW-06" }
      ],
      yeast: "SafAle US-05",
      sensoryDescription: "Espléndida tonalidad cobriza con destellos rojizos. Maravilloso equilibrio entre la riqueza del toffee, avellanas tostadas y una vivaz contraparte lupulada con matices de cáscara de naranja amarga."
    },
    {
      id: "REC-MAXIMA-01",
      name: "NORTA Máxima",
      style: "Double IPA High Gravity",
      targetVolumeL: 1000,
      og: 1.080,
      fg: 1.015,
      abv: 8.5,
      ibu: 85,
      srmColor: 14.0,
      mashTemp: "65.5 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Fuerza silenciosa",
      liquidColor: "#df8924",
      glassware: "Copa Teku Oficial NORTA",
      servingTemp: "8°C - 10°C",
      pairing: "Curry tailandés picante, carnitas de cerdo agridulces, queso Stilton añejo, pizza de pepperoni y miel picante.",
      intensity: { malt: 6, hops: 10, body: 8, roast: 2 },
      sensoryTags: ["Citra & Mosaic", "Maracuyá", "Mango Biche", "Pino Resinoso", "Amargor Noble"],
      grains: [
        { name: "Malta Pale Ale 2-Row", percentage: 78, kg: 255, rawId: "RAW-01" },
        { name: "Malta Pilsner Premium", percentage: 12, kg: 40, rawId: "RAW-02" },
        { name: "Copos de Avena & Trigo", percentage: 10, kg: 32, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Columbus (First Wort Hop)", timing: "Hervor 60 min", g: 1500, rawId: "RAW-07" },
        { name: "Citra T-90 (Whirlpool 80°C)", timing: "Whirlpool", g: 3000, rawId: "RAW-05" },
        { name: "Mosaic T-90 (Dry Hop Doble)", timing: "Dry Hop Día 4 & 8", g: 5000, rawId: "RAW-06" }
      ],
      yeast: "SafAle US-05 / Fermentación controlada a 19.0°C",
      sensoryDescription: "Torrente aromático tropical con notas explosivas a maracuyá maduro, mango verde y resina de pino andino. Amargor limpio, punzante y noble, sostenido por una columna vertebral de maltas doradas."
    },
    {
      id: "REC-TRADICIONAL-01",
      name: "NORTA Tradicional",
      style: "Cerveza Clásica de la Casa",
      targetVolumeL: 1000,
      og: 1.050,
      fg: 1.011,
      abv: 5.0,
      ibu: 25,
      srmColor: 10.0,
      mashTemp: "66.0 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Raíces del norte",
      liquidColor: "#e8a230",
      glassware: "Tarro Cervecero de Gres o Media Pinta",
      servingTemp: "5°C - 7°C",
      pairing: "Asados campesinos, chorizos artesanales, pizzas rústicas a la leña y tablas de quesos y charcutería.",
      intensity: { malt: 6, hops: 5, body: 6, roast: 3 },
      sensoryTags: ["Malta Munich", "Herbal Noble", "Espuma Densa", "Receta Madre", "Gran Versatilidad"],
      grains: [
        { name: "Malta Pilsner Premium", percentage: 80, kg: 185, rawId: "RAW-02" },
        { name: "Malta Munich Type I", percentage: 12, kg: 28, rawId: "RAW-02" },
        { name: "Malta Caramelo 60L", percentage: 8, kg: 19, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Columbus", timing: "Hervor 60m", g: 850, rawId: "RAW-07" },
        { name: "Hallertau Mittelfrüh", timing: "Aroma 15m", g: 600, rawId: "RAW-07" }
      ],
      yeast: "SafAle US-05",
      sensoryDescription: "La receta fundacional de la cervecería. Cristalina, con un tono ámbar dorado limpio y persistente espuma marfil. Equilibrio canónico entre la dulzura de cereal y el sutil amargor especiado del lúpulo europeo."
    }
  ],

  // 3. LOTES ACTIVOS DE PRODUCCIÓN Y CURVAS FERMENTATIVAS TIME-SERIES (BEER30 / BREWW STYLE)
  batches: [
    {
      id: "LOT-2026-088",
      recipeName: "NORTA Máxima",
      style: "Double IPA / High Gravity",
      tankId: "F-01",
      volumeLiters: 1200,
      brewDate: "2026-08-08",
      targetPackDate: "2026-08-24",
      stage: "Fermentación",
      stageProgress: 65,
      originalGravity: 1.072,
      currentGravity: 1.022,
      finalGravityTarget: 1.014,
      currentTemp: 19.5,
      targetTemp: 19.0,
      abvCalculated: 6.56,
      abvTarget: 7.5,
      ibu: 65,
      brewer: "Ing. Julio Roberto Cristancho",
      status: "Activo",
      dryHopStatus: "Programado hoy (Citra 6kg + Mosaic 4kg)",
      notes: "Fermentación monitoreada por Ing. Julio Roberto Cristancho. Curva de fermentación constante.",
      cogsCostPerLiter: 1.65,
      // HISTÓRICO DIARIO DE FERMENTACIÓN (CURVAS TIME-SERIES BEER30)
      fermentationLogs: [
        { dayNum: 1, date: "2026-08-08", sg: 1.072, tempC: 20.0, ph: 5.20, notes: "Siembra de levadura US-05" },
        { dayNum: 2, date: "2026-08-09", sg: 1.058, tempC: 19.8, ph: 4.85, notes: "Actividad vigorosa en trampa CO2" },
        { dayNum: 3, date: "2026-08-10", sg: 1.042, tempC: 19.5, ph: 4.60, notes: "Atenuación rítmica regular" },
        { dayNum: 4, date: "2026-08-11", sg: 1.030, tempC: 19.5, ph: 4.45, notes: "Disminución gradual de temperatura" },
        { dayNum: 5, date: "2026-08-12", sg: 1.022, tempC: 19.5, ph: 4.38, notes: "Preparado para adición de Dry Hop" }
      ],
      maltsUsed: [
        { name: "Malta Pale Ale 2-Row", batchLot: "MAL-AND-2026-04", qtyKg: 280 },
        { name: "Malta Pilsner Premium", batchLot: "MAL-AND-2026-02", qtyKg: 40 }
      ],
      hopsUsed: [
        { name: "Citra T-90 (Whirlpool)", batchLot: "HOP-YAK-2026-12", qtyG: 2500 },
        { name: "Mosaic T-90 (Dry Hop)", batchLot: "HOP-YAK-2026-15", qtyG: 4000 }
      ],
      yeastUsed: "SafAle US-05 (Lote YST-2026-03, Gen 1)"
    },
    {
      id: "LOT-2026-087",
      recipeName: "NORTA Furia",
      style: "Imperial Stout Café & Cacao",
      tankId: "F-02",
      volumeLiters: 800,
      brewDate: "2026-07-28",
      targetPackDate: "2026-08-18",
      stage: "Maduración",
      stageProgress: 88,
      originalGravity: 1.085,
      currentGravity: 1.020,
      finalGravityTarget: 1.020,
      currentTemp: 4.0,
      targetTemp: 3.5,
      abvCalculated: 8.53,
      abvTarget: 8.5,
      ibu: 60,
      brewer: "Adm. Cristian",
      status: "Activo",
      dryHopStatus: "Infusión Cacao Nibs & Café Geisha completada",
      notes: "Gravedad final alcanzada. Madurando a baja temperatura con costeo auditado por CP Eduardo Ariza.",
      cogsCostPerLiter: 2.15,
      fermentationLogs: [
        { dayNum: 1, date: "2026-07-28", sg: 1.085, tempC: 20.5, ph: 5.30, notes: "Inoculación S-04" },
        { dayNum: 5, date: "2026-08-02", sg: 1.040, tempC: 19.0, ph: 4.70, notes: "Atenuación 50%" },
        { dayNum: 10, date: "2026-08-07", sg: 1.022, tempC: 15.0, ph: 4.40, notes: "Paso a cold crash gradual" },
        { dayNum: 14, date: "2026-08-11", sg: 1.020, tempC: 4.0, ph: 4.35, notes: "Gravedad objetivo alcanzada" }
      ],
      maltsUsed: [
        { name: "Malta Pale Ale 2-Row", batchLot: "MAL-AND-2026-03", qtyKg: 240 },
        { name: "Malta Chocolate Roasted", batchLot: "MAL-AND-2026-01", qtyKg: 35 }
      ],
      hopsUsed: [
        { name: "Columbus (Hervor)", batchLot: "HOP-YAK-2026-09", qtyG: 1200 }
      ],
      yeastUsed: "SafAle S-04 (Lote YST-2026-01)"
    },
    {
      id: "LOT-2026-086",
      recipeName: "NORTA Briosa",
      style: "Amber Ale Cobre / Red Ale Vivaz",
      tankId: "BBT-01",
      volumeLiters: 1500,
      brewDate: "2026-07-20",
      targetPackDate: "2026-08-14",
      stage: "Acondicionado",
      stageProgress: 95,
      originalGravity: 1.054,
      currentGravity: 1.013,
      finalGravityTarget: 1.013,
      currentTemp: 2.0,
      targetTemp: 2.0,
      abvCalculated: 5.38,
      abvTarget: 5.4,
      ibu: 28,
      brewer: "Ing. Julio Roberto Cristancho",
      status: "Activo",
      dryHopStatus: "N/A",
      notes: "Gasificación a 2.55 volúmenes de CO2. Listo para despachos comerciales.",
      cogsCostPerLiter: 1.25,
      fermentationLogs: [
        { dayNum: 1, date: "2026-07-20", sg: 1.054, tempC: 19.0, ph: 5.15, notes: "Inicio de fermentación" },
        { dayNum: 7, date: "2026-07-27", sg: 1.014, tempC: 18.5, ph: 4.30, notes: "Gravedad estable" }
      ],
      maltsUsed: [
        { name: "Malta Pale Ale 2-Row", batchLot: "MAL-AND-2026-04", qtyKg: 310 }
      ],
      hopsUsed: [
        { name: "Columbus", batchLot: "HOP-YAK-2026-05", qtyG: 1800 }
      ],
      yeastUsed: "SafAle US-05"
    }
  ],

  // 4. TABLERO DE TANQUES (CELLAR MAP)
  tanks: [
    { id: "F-01", name: "Fermentador Cónico F-01", type: "Unitank Chaquetado", capacityL: 1500, currentL: 1200, currentBatchId: "LOT-2026-088", beerName: "NORTA Máxima", status: "Fermentando", tempC: 19.5, pressureBar: 0.8, daysInTank: 5, glycolValve: "Auto (Refrigerando)", lastCipDate: "2026-08-07" },
    { id: "F-02", name: "Fermentador Cónico F-02", type: "Unitank Chaquetado", capacityL: 1000, currentL: 800, currentBatchId: "LOT-2026-087", beerName: "NORTA Furia", status: "Madurando", tempC: 4.0, pressureBar: 1.2, daysInTank: 16, glycolValve: "Cerrada", lastCipDate: "2026-07-27" },
    { id: "F-03", name: "Fermentador Cónico F-03", type: "Unitank Chaquetado", capacityL: 1500, currentL: 0, currentBatchId: null, beerName: "Disponible para Cocción", status: "CIP Aprobado", tempC: 18.0, pressureBar: 0.0, daysInTank: 0, glycolValve: "Inactiva", lastCipDate: "2026-08-12" },
    { id: "F-04", name: "Fermentador Cónico F-04", type: "Unitank Chaquetado", capacityL: 1500, currentL: 1400, currentBatchId: "LOT-2026-084", beerName: "NORTA Origen", status: "Cold Crash", tempC: 1.5, pressureBar: 1.0, daysInTank: 12, glycolValve: "Auto", lastCipDate: "2026-08-01" },
    { id: "BBT-01", name: "Bright Beer Tank BBT-01", type: "Tanque de Servicio / Gasificado", capacityL: 2000, currentL: 1500, currentBatchId: "LOT-2026-086", beerName: "NORTA Briosa", status: "Listo para Envasar", tempC: 2.0, pressureBar: 1.5, daysInTank: 4, glycolValve: "Mantener Frío", lastCipDate: "2026-08-09" },
    { id: "BBT-02", name: "Bright Beer Tank BBT-02", type: "Tanque de Servicio / Gasificado", capacityL: 2000, currentL: 0, currentBatchId: null, beerName: "Vacio", status: "Pendiente CIP", tempC: 21.0, pressureBar: 0.0, daysInTank: 0, glycolValve: "Inactiva", lastCipDate: "2026-08-05" }
  ],

  // 5. INVENTARIO DE MATERIAS PRIMAS (DEDUCT-ON-BREW BOM LINKED)
  rawInventory: [
    { id: "RAW-01", name: "Malta Pale Ale 2-Row (Sacos 25kg)", category: "Maltas", stock: 3450, unit: "kg", minStock: 1000, costPerUnit: 1.85, supplier: "Maltería Andina S.A.S.", status: "Óptimo" },
    { id: "RAW-02", name: "Malta Pilsner Premium (Sacos 25kg)", category: "Maltas", stock: 2100, unit: "kg", minStock: 800, costPerUnit: 1.90, supplier: "Maltería Andina S.A.S.", status: "Óptimo" },
    { id: "RAW-03", name: "Malta Caramelo 60L", category: "Maltas", stock: 420, unit: "kg", minStock: 200, costPerUnit: 2.40, supplier: "Weyermann Specialty", status: "Óptimo" },
    { id: "RAW-04", name: "Malta Chocolate Roasted", category: "Maltas", stock: 190, unit: "kg", minStock: 150, costPerUnit: 2.90, supplier: "Weyermann Specialty", status: "Precaución" },
    { id: "RAW-05", name: "Lúpulo Citra T-90 Pellets (Refrigerado -18°C)", category: "Lúpulos", stock: 38.5, unit: "kg", minStock: 15.0, costPerUnit: 48.00, supplier: "Yakima Chief Hops", status: "Óptimo" },
    { id: "RAW-06", name: "Lúpulo Mosaic T-90 Pellets", category: "Lúpulos", stock: 22.0, unit: "kg", minStock: 12.0, costPerUnit: 52.00, supplier: "Yakima Chief Hops", status: "Óptimo" },
    { id: "RAW-07", name: "Lúpulo Columbus (Amargor)", category: "Lúpulos", stock: 18.0, unit: "kg", minStock: 10.0, costPerUnit: 34.00, supplier: "Yakima Chief Hops", status: "Óptimo" },
    { id: "RAW-08", name: "Levadura SafAle US-05 (Paquetes 500g)", category: "Levaduras", stock: 16, unit: "paquetes", minStock: 6, costPerUnit: 95.00, supplier: "Fermentis", status: "Óptimo" },
    { id: "RAW-09", name: "Botellas Cerámicas NORTA 500ml", category: "Empaques", stock: 4800, unit: "unidades", minStock: 1500, costPerUnit: 1.20, supplier: "Envases Rústicos S.A.", status: "Óptimo" },
    { id: "RAW-10", name: "Latas de Aluminio 473ml NORTA", category: "Empaques", stock: 14200, unit: "unidades", minStock: 5000, costPerUnit: 0.28, supplier: "Crown Can Packaging", status: "Óptimo" },
    { id: "RAW-11", name: "Soda Cáustica Escamas 99% (CIP)", category: "Químicos CIP", stock: 240, unit: "kg", minStock: 100, costPerUnit: 2.10, supplier: "Químicos Industriales S.A.", status: "Óptimo" }
  ],

  // 6. PRODUCTO TERMINADO
  finishedGoods: [
    { id: "FG-01", name: "Barril Inox 30L - NORTA Máxima", style: "Double IPA", packaging: "Barril 30L", stockUnits: 28, litersPerUnit: 30, wholesalePrice: 145.00, cogsCost: 56.00, marginPct: "61.4%" },
    { id: "FG-02", name: "Barril Inox 50L - NORTA Origen", style: "Golden Ale", packaging: "Barril 50L", stockUnits: 19, litersPerUnit: 50, wholesalePrice: 195.00, cogsCost: 68.00, marginPct: "65.1%" },
    { id: "FG-03", name: "Botella Swing-Top 500ml - NORTA Furia", style: "Imperial Stout", packaging: "Caja 12x500ml", stockUnits: 95, litersPerUnit: 6.0, wholesalePrice: 58.00, cogsCost: 22.00, marginPct: "62.0%" },
    { id: "FG-04", name: "Pack 6 Latas 473ml - NORTA Briosa", style: "Amber Ale", packaging: "Pack 6 Latas", stockUnits: 380, litersPerUnit: 2.84, wholesalePrice: 18.50, cogsCost: 7.20, marginPct: "61.0%" },
    { id: "FG-05", name: "Pack 6 Latas 473ml - NORTA Picosa", style: "Spicy Amber", packaging: "Pack 6 Latas", stockUnits: 195, litersPerUnit: 2.84, wholesalePrice: 19.50, cogsCost: 7.60, marginPct: "61.0%" },
    { id: "FG-06", name: "Barril Inox 30L - NORTA Tradicional", style: "Clásica Casa", packaging: "Barril 30L", stockUnits: 15, litersPerUnit: 30, wholesalePrice: 135.00, cogsCost: 48.00, marginPct: "64.4%" }
  ],

  // 7. CRM & PORTAL B2B CLIENTES (BREWW STYLE B2B PORTAL)
  clients: [
    { id: "CLI-001", name: "The Viking Beer Bar", type: "Bar Especializado / Taphouse", contactName: "Carlos Mendoza", phone: "+57 312 456 7890", email: "gerencia@vikingbeerbar.com", city: "Bogotá D.C. - Zona T", creditLimit: 3000, kegsInPossession: 8, totalPurchasesUSD: 14250, status: "Activo - Cliente VIP", pinCode: "1042" },
    { id: "CLI-002", name: "Cervecería & Grill El Roble", type: "Restaurante Gourmet", contactName: "Laura Restrepo", phone: "+57 315 889 1234", email: "compras@elroblegrill.co", city: "Chía, Cundinamarca", creditLimit: 1800, kegsInPossession: 4, totalPurchasesUSD: 8640, status: "Activo", pinCode: "2088" },
    { id: "CLI-003", name: "Taproom Oficial NORTA", type: "Punto Propio / Bar de Fábrica", contactName: "Comercial Ivan Ahumada", phone: "+57 300 112 3344", email: "ventas@norta.co", city: "Planta Sabana", creditLimit: 10000, kegsInPossession: 12, totalPurchasesUSD: 28900, status: "Punto Propio", pinCode: "3000" },
    { id: "CLI-004", name: "La Taberna del Lúpulo", type: "Bar Artesanal", contactName: "Andrés Silva", phone: "+57 310 998 7766", email: "taberna.lupulo@gmail.com", city: "Medellín - El Poblado", creditLimit: 2500, kegsInPossession: 6, totalPurchasesUSD: 11200, status: "Activo", pinCode: "4055" }
  ],

  salesOrders: [
    { id: "ORD-2026-105", clientName: "The Viking Beer Bar", date: "2026-08-12", items: "4x Barril 30L NORTA Máxima, 2x Barril 30L NORTA Briosa", totalAmountUSD: 870.00, status: "En Preparación", paymentStatus: "Crédito 15 días", deliveryDate: "2026-08-14" },
    { id: "ORD-2026-104", clientName: "Cervecería & Grill El Roble", date: "2026-08-10", items: "2x Barril 50L NORTA Origen, 10x Botella Swing-Top NORTA Furia", totalAmountUSD: 810.00, status: "Despachado", paymentStatus: "Pagado", deliveryDate: "2026-08-11" }
  ],

  kegs: [
    { serial: "KEG-NTA-0142", capacityL: 30, style: "NORTA Máxima (Double IPA)", client: "The Viking Beer Bar", sentDate: "2026-07-28", daysOut: 16, alert: "Normal" },
    { serial: "KEG-NTA-0143", capacityL: 30, style: "NORTA Máxima (Double IPA)", client: "The Viking Beer Bar", sentDate: "2026-07-28", daysOut: 16, alert: "Normal" },
    { serial: "KEG-NTA-0089", capacityL: 50, style: "NORTA Origen (Golden Ale)", client: "Cervecería El Roble", sentDate: "2026-07-15", daysOut: 29, alert: "Próximo Retorno (29d)" },
    { serial: "KEG-NTA-0055", capacityL: 30, style: "NORTA Briosa (Amber Ale)", client: "La Taberna del Lúpulo", sentDate: "2026-07-02", daysOut: 42, alert: "Alerta Demora (>30d)" }
  ],

  cipLogs: [
    { id: "CIP-2026-042", date: "2026-08-12 14:30", equipment: "Fermentador F-03", operator: "Adm. Cristian", cycleType: "Lavado Completo (Cáustica + Ácido + Peracético)", causticTempC: 76.5, causticConcentrationPct: "2.2%", peraceticConcentrationPpm: 180, rinseFinalPh: 7.1, swabAdenosineTriphosphateRlu: 8, status: "Aprobado Sanitariamente", supervisor: "Ing. Julio Roberto Cristancho" }
  ],

  qualityTests: [
    { id: "LAB-2026-078", batchId: "LOT-2026-088", date: "2026-08-12", style: "NORTA Máxima (Double IPA)", tank: "F-01", ph: 4.35, dissolvedOxygenPpb: 28, carbonationVolCo2: 2.45, turbidityNtu: 38.0, diacetylSensoryScore: "0 / 5 (Ausente)", sensoryScore100: 94, analyst: "Ing. Julio Roberto Cristancho", overallVerdict: "Conforme a Especificación NORTA" }
  ],

  employees: [
    { id: "EMP-01", name: "Ing. Julio Roberto Cristancho", role: "Maestro Cervecero & Director de Planta", dept: "Producción & Dirección", phone: "+57 311 234 5678", email: "julio.cristancho@norta.co", joinDate: "2023-01-15", certStatus: "Al Día" },
    { id: "EMP-02", name: "CP Yesid Ariza", role: "Directora Financiera & Contadora Pública", dept: "Finanzas & ERP", phone: "+57 314 876 5432", email: "yeid.ariza@norta.co", joinDate: "2023-03-01", certStatus: "Al Día" },
    { id: "EMP-03", name: "CP Eduardo Ariza", role: "Contador Público & Auditor de Costos", dept: "Costos & Contabilidad", phone: "+57 301 345 6789", email: "eduardo.ariza@norta.co", joinDate: "2023-04-10", certStatus: "Al Día" },
    { id: "EMP-04", name: "Adm. Cristian", role: "Administrador de Planta & Operaciones", dept: "Administración & Planta", phone: "+57 316 789 0123", email: "cristian.adm@norta.co", joinDate: "2023-06-15", certStatus: "Al Día" },
    { id: "EMP-05", name: "Comercial Ivan Ahumada", role: "Director Comercial & Ventas B2B", dept: "Comercial & CRM", phone: "+57 300 456 7890", email: "ivan.ahumada@norta.co", joinDate: "2023-05-20", certStatus: "Al Día" }
  ],

  shifts: [
    { day: "Lunes 17 Ago", morningShift: "Ing. Julio Roberto Cristancho (Cocción Lote NORTA Máxima)", afternoonShift: "Adm. Cristian (Transferencia & CIP)", nightWatch: "Monitoreo Remoto Glycol" },
    { day: "Martes 18 Ago", morningShift: "Adm. Cristian (Macerado & Molienda)", afternoonShift: "Comercial Ivan Ahumada (Despachos B2B)", nightWatch: "Guardia Planta" },
    { day: "Miércoles 19 Ago", morningShift: "Ing. Julio Roberto Cristancho (Dry Hopping)", afternoonShift: "CP Yesid Ariza & CP Eduardo Ariza (Cierre de Costos)", nightWatch: "Monitoreo Remoto" }
  ],

  certifications: [
    { employee: "Ing. Julio Roberto Cristancho", cert: "Certificación Maestro Cervecero VLB Berlín & Inocuidad", expiryDate: "2028-04-20", status: "Vigente" },
    { employee: "CP Yesid Ariza", cert: "Tarjeta Profesional CP & NIIF Financieras", expiryDate: "2029-12-31", status: "Vigente" },
    { employee: "CP Eduardo Ariza", cert: "Tarjeta Profesional CP & Auditoría de Costos", expiryDate: "2029-12-31", status: "Vigente" },
    { employee: "Adm. Cristian", cert: "Carnet Manipulación Higiénica Alimentos & Seguridad", expiryDate: "2027-09-15", status: "Vigente" },
    { employee: "Comercial Ivan Ahumada", cert: "Gestión Comercial B2B & Inocuidad de Bebidas", expiryDate: "2027-11-30", status: "Vigente" }
  ],

  legal: {
    sanitaryRegistries: [
      { code: "RSA-0019844-2023", beer: "Cerveza NORTA Máxima (Double IPA)", issueDate: "2023-11-18", expiryDate: "2028-11-18", status: "Vigente 🟢", authority: "INVIMA / Dirección de Alimentos" },
      { code: "RSA-0021430-2023", beer: "Cerveza NORTA Briosa (Amber Ale)", issueDate: "2023-12-12", expiryDate: "2028-12-12", status: "Vigente 🟢", authority: "INVIMA / Dirección de Alimentos" },
      { code: "RSA-0008761-2021", beer: "Cerveza NORTA Furia (Imperial Stout)", issueDate: "2021-09-28", expiryDate: "2026-09-28", status: "Renovación Urgente 🟡 (46 días)", authority: "INVIMA / Dirección de Alimentos" }
    ],
    taxCompliance: {
      currentMonthLitersProduced: 5500,
      taxPerLiterUSD: 0.12,
      taxEstimatedUSD: 660.00,
      stampsStock: 18500,
      nextFilingDeadline: "2026-08-28"
    },
    plantPermits: [
      { name: "Concepto Favorable Sanitario de Fábrica", entity: "Secretaría de Salud", validity: "2027-05-10", status: "Vigente" },
      { name: "Permiso de Vertimientos Industriales y Aguas", entity: "Autoridad Ambiental (CAR)", validity: "2027-10-22", status: "Vigente" },
      { name: "Certificado de Seguridad contra Incendios", entity: "Cuerpo de Bomberos", validity: "2027-01-30", status: "Vigente" },
      { name: "Registro de Marca Comercial 'NORTA'", entity: "Superintendencia de Industria y Comercio", validity: "2033-08-14", status: "Vigente" }
    ]
  },

  // 9. MÓDULO CONTROL SANITARIO INVIMA (11 PROGRAMAS Y CARPETAS OFICIALES)

  // METADATA Y REGISTROS DEL FORMATO FO-GC-001 (CONTROL DE AGUA POTABLE)
  waterControlMetadata: {
  "system": "SISTEMA DE GESTIÓN DE CALIDAD",
  "code": "FO-GC-001",
  "creationDate": "OCTUBRE 2026",
  "title": "FORMATO DE CONTROL DE AGUA POTABLE",
  "version": "VERSIÓN 01",
  "parametersNorm": "Referencia Decreto 2115 de 2007: Cloro Libre Residual 0.3 a 2.0 mg/L (Cl2). pH 6.5 a 9.0. Si no cumple, segunda toma inmediata. Persistencia activa desviación.",
  "frequency": "Diario, previo a maceración y primer encendido de caldera."
},

  waterControlLogs: [
  {
    "id": "WLOG-001",
    "date": "2026-10-16",
    "time": "07:00",
    "location": "Llave de Maceración (Muela)",
    "chlorineMgL": 1.2,
    "ph": 7.2,
    "complies": "SI",
    "verifiedBy": "Ing. Julio Roberto Cristancho",
    "notes": "Parámetros conformes Decreto 2115/2007. Agua liberada para maceración."
  }
],

  // METADATA Y REGISTROS DEL FORMATO FO-GC-015 (INGRESO DE MATERIALES - ALMACENAMIENTO)
  storageIngressMetadata: {
  "system": "SISTEMA DE GESTIÓN DE CALIDAD",
  "code": "FO-GC-015",
  "creationDate": "OCTUBRE 2026",
  "title": "Formato de Ingreso de Materiales",
  "version": "VERSIÓN 01"
},

  storageIngressLogs: [
  {
    "id": "SLOG-001",
    "date": "2026-10-15",
    "product": "Malta Pale Ale 2-Row (Sacos 25kg)",
    "batchLot": "MAL-AND-2026-10",
    "quantity": "1,000 kg",
    "supplier": "Maltería Andina S.A.S.",
    "expiryDate": "2027-10-15",
    "notes": "Empaques sellados e inspeccionados. CoA conforme. Tarjeta verde FO-GC-039 asignada.",
    "responsible": "Ing. Julio Roberto Cristancho"
  }
],

  // 3. SEED DATOS CALIBRACIÓN (BPM-FO-27)
  phMeterLogs: [
    { id: "PH-001", date: "2026-08-24", buffer4Reading: 4.02, buffer4Temp: 20.1, buffer4Error: 0.01, buffer7Reading: 7.02, buffer7Temp: 20.0, buffer7Error: 0.01, status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "PH-002", date: "2026-08-17", buffer4Reading: 4.01, buffer4Temp: 20.5, buffer4Error: 0.00, buffer7Reading: 7.00, buffer7Temp: 20.4, buffer7Error: 0.00, status: "Conforme 🟢", verifiedBy: "Adm. Cristian" },
    { id: "PH-003", date: "2026-08-10", buffer4Reading: 4.03, buffer4Temp: 21.0, buffer4Error: 0.02, buffer7Reading: 7.03, buffer7Temp: 21.0, buffer7Error: 0.02, status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],
  calibrationSchedule: [
    { id: "CAL-001", equipment: "pH-Metro Hanna HI98103", frequency: "Semanal", lastCal: "2026-08-24", nextCal: "2026-08-31", lab: "Interno NORTA", cert: "CERT-PH-2026-08" },
    { id: "CAL-002", equipment: "Balanza Analítica OHAUS 50kg", frequency: "Semestral", lastCal: "2026-06-15", nextCal: "2026-12-15", lab: "Metrología Colombia S.A.S.", cert: "CERT-BAL-2026-06" },
    { id: "CAL-003", equipment: "Termómetro Digital de Inmersión PT100", frequency: "Trimestral", lastCal: "2026-07-01", nextCal: "2026-10-01", lab: "Metrología Colombia S.A.S.", cert: "CERT-TERM-2026-07" },
    { id: "CAL-004", equipment: "Manómetro de CO2 Tanques BBT", frequency: "Anual", lastCal: "2026-02-10", nextCal: "2027-02-10", lab: "Metrología Colombia S.A.S.", cert: "CERT-MAN-2026-02" }
  ],

  // 4. SEED DATOS CAPACITACIÓN (FO-CAP-001)
  trainingSchedule: [
    { id: "TS-001", topic: "Inducción sobre las BPM (Buenas Prácticas de Manufactura)", instructor: "Ing. Julio Roberto Cristancho", modality: "Presencial", duration: "2 horas", month: "Enero", status: "Ejecutado 🟢" },
    { id: "TS-002", topic: "Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)", instructor: "Asesor Calidad", modality: "Presencial", duration: "2 horas", month: "Marzo", status: "Ejecutado 🟢" },
    { id: "TS-003", topic: "Procedimientos POES de Limpieza y Desinfección CIP", instructor: "Ing. Julio Roberto Cristancho", modality: "Teórico-Práctico", duration: "3 horas", month: "Junio", status: "Ejecutado 🟢" },
    { id: "TS-004", topic: "Peligros Físicos, Químicos y Biológicos en Cervecería", instructor: "Calidad NORTA", modality: "Presencial", duration: "2 horas", month: "Septiembre", status: "Programado 📅" }
  ],
  trainingAttendance: [
    { id: "TA-001", date: "2026-06-15", topic: "Procedimientos POES de Limpieza y Desinfección CIP", employee: "Adm. Cristian", nationalId: "1.018.492.102", role: "Administrador de Planta", score: 4.8, status: "Aprobado 🟢" },
    { id: "TA-002", date: "2026-06-15", topic: "Procedimientos POES de Limpieza y Desinfección CIP", employee: "Comercial Ivan Ahumada", nationalId: "80.192.304", role: "Director Comercial", score: 4.5, status: "Aprobado 🟢" },
    { id: "TA-003", date: "2026-03-20", topic: "Plan de Saneamiento Básico", employee: "CP Yesid Ariza", nationalId: "52.391.029", role: "Directora Financiera", score: 5.0, status: "Aprobado 🟢" }
  ],

  // 5. SEED DATOS CONTROL DE PLAGAS (PG-GC-004)
  pestControlLogs: [
    { id: "PLOG-001", date: "2026-08-24", station: "Estación 1 - Puerta Recepción MP", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Ninguna requerida.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-002", date: "2026-08-24", station: "Estación 2 - Bodega de Insumos & Maltas", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Limpieza periódica estibas.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-003", date: "2026-08-24", station: "Estación 3 - Zona de Cocción & Fermentación", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Sellamiento de sifón verificado.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-004", date: "2026-08-24", station: "Estación 4 - Zona Externa Residuos", baitStatus: "Cebo Consumido (Reemplazado 🟡)", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Reemplazo de cebos raticidas.", technician: "Fumigaciones Sabana Norte S.A.S." }
  ],


  // 6. SEED DATOS LIMPIEZA Y DESINFECCIÓN (FO-LD-001)
  cleaningSanitationLogs: [
    { id: "LD-001", date: "2026-08-24", area: "Tanque Fermentador F-01", frequency: "Por Lote", chemical: "Soda Cáustica 2% + Ácido Peracético 0.2%", concentration: "200 ppm", status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "LD-002", date: "2026-08-24", area: "Marmita de Cocción & Tuberías", frequency: "Diario", chemical: "Detergente Alcalino Sanicid", concentration: "1.5%", status: "Conforme 🟢", verifiedBy: "Adm. Cristian" },
    { id: "LD-003", date: "2026-08-23", area: "Zona de Envasado & Llenadora", frequency: "Diario", chemical: "Alcohol Antiséptico 70%", concentration: "70%", status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],

  // 7. SEED DATOS MANEJO DE RESIDUOS (FO-RS-001)
  wasteManagementLogs: [
    { id: "RS-001", date: "2026-08-24", wasteType: "Bagazo de Malta Orgánico", quantityKg: "450 kg", manager: "Granja Porcina Sabana (Compostaje)", status: "Entregado 🟢", verifiedBy: "Adm. Cristian" },
    { id: "RS-002", date: "2026-08-22", wasteType: "Trub & Levadura Residual", quantityKg: "80 L", manager: "Planta Biogás Local", status: "Entregado 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "RS-003", date: "2026-08-20", wasteType: "Empaques Cartón & Plástico Reciclable", quantityKg: "35 kg", manager: "Asociación Recicladores Norte", status: "Entregado 🟢", verifiedBy: "Adm. Cristian" }
  ],

  // 8. SEED DATOS MANTENIMIENTO (FO-MTTO-001)
  maintenanceLogs: [
    { id: "MTTO-001", date: "2026-08-15", equipment: "Chiller de Glicol Principal", type: "Preventivo", description: "Cambio de filtros y verificación nivel de glicol.", parts: "Filtro de aire, 5L Glicol USP", technician: "TecniFrio Sabana S.A.S.", status: "Completado 🟢" },
    { id: "MTTO-002", date: "2026-08-10", equipment: "Molino de Rodillos de Malta", type: "Preventivo", description: "Ajuste de luz de rodillos (1.2mm) y lubricación de rodamientos.", parts: "Grasa de grado alimenticio NSF H1", technician: "Ing. Julio Roberto Cristancho", status: "Completado 🟢" },
    { id: "MTTO-003", date: "2026-07-28", equipment: "Intercambiador de Calor a Placas", type: "Preventivo", description: "Desarme, empaquetadura y lavado químico CIP desincrustante.", parts: "Empaques EPDM Grado Alimenticio", technician: "Mantenimiento NORTA", status: "Completado 🟢" }
  ],

  // 9. SEED DATOS MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
  samplingLogs: [
    { id: "MUE-001", date: "2026-08-24", sampleObject: "NORTA Furia (Lote LOT-2026-088)", testType: "Microbiológico & Fisicoquímico", sampleVolume: "2 Botellas 500ml", lab: "Biotecnología & Alimentos Lab Acreditado", result: "Conforme (Ausencia de Coliformes & Silvestres) 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "MUE-002", date: "2026-08-15", sampleObject: "Agua Potable Salida Filtro Carbón", testType: "Fisicoquímico Completo (Decreto 2115)", sampleVolume: "1 Litro", lab: "Laboratorio Ambiental Sabana", result: "Cumple Norma Decreto 2115 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],
  coldRoomLogs: [
    { id: "CF-001", date: "2026-08-24", time: "08:00", tempColdRoom1: 2.5, tempColdRoom2: 3.0, status: "Conforme 🟢 (Rango 0°C a 4°C)", verifiedBy: "Adm. Cristian" },
    { id: "CF-002", date: "2026-08-23", time: "08:00", tempColdRoom1: 2.1, tempColdRoom2: 2.8, status: "Conforme 🟢 (Rango 0°C a 4°C)", verifiedBy: "Adm. Cristian" }
  ],

  // 10. SEED DATOS PROVEEDORES (FO-PROV-001)
  suppliersList: [
    { id: "PROV-001", name: "Maltería Andina S.A.S.", nit: "890.102.391-1", contact: "Carlos Mendoza", productProvided: "Maltas Base Pale Ale y Pilsner", phone: "310-482-9102", email: "ventas@malteriaandina.com", score: 4.9, status: "Homologado 🟢" },
    { id: "PROV-002", name: "Yakima Chief Hops", nit: "900.291.029-4", contact: "Lorena Gómez", productProvided: "Lúpulos T-90 Citra, Mosaic, Cascade", phone: "315-920-1920", email: "latam@yakimachief.com", score: 5.0, status: "Homologado 🟢" },
    { id: "PROV-003", name: "Envases Rústicos S.A.", nit: "800.192.301-8", contact: "Hernando Silva", productProvided: "Botellas Cerámicas y Vidrio 500ml", phone: "300-192-8301", email: "contacto@envasesrusticos.com", score: 4.7, status: "Homologado 🟢" }
  ],

  // 11. SEED DATOS TRAZABILIDAD (FO-TRA-001 / REGISTRO CONTRAMUESTRAS)
  retainedSamplesLogs: [
    { id: "TRA-001", date: "2026-08-24", beerName: "NORTA Furia", batchLot: "LOT-2026-088", presentation: "Botella 500ml", units: 3, shelfLocation: "Estante A-2 (Contramuestras)", responsible: "Ing. Julio Roberto Cristancho", notes: "Contramuestra de retenido reglamentaria." },
    { id: "TRA-002", date: "2026-08-20", beerName: "NORTA Picosa", batchLot: "LOT-2026-087", presentation: "Botella 500ml", units: 3, shelfLocation: "Estante A-1 (Contramuestras)", responsible: "Ing. Julio Roberto Cristancho", notes: "Lote de producción con COA verificado." },
    { id: "TRA-003", date: "2026-08-15", beerName: "NORTA Máxima", batchLot: "LOT-2026-086", presentation: "Barril 30L Stainless", units: 1, shelfLocation: "Cámara Fría B-1", responsible: "Adm. Cristian", notes: "Retenido de barril B2B." }
  ],

  invimaControlSystem: [
  {
    "id": "prog-00-manual",
    "folderNumber": "00",
    "folderName": "00. MANUAL Y CONTROL DOCUMENTAL",
    "title": "00. MANUAL Y CONTROL DOCUMENTAL",
    "code": "MN-GC-001",
    "fileCount": 4,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-036",
    "files": [
      {
        "id": "DOC-00-01",
        "code": "MN-GC-001-M",
        "name": "MN-GC-001 Manual de Buenas Practicas de Manufactura.docx",
        "relPath": "./invima_docs/00. MANUAL Y CONTROL DOCUMENTAL/MN-GC-001 Manual de Buenas Practicas de Manufactura.docx",
        "size": "112 KB",
        "extension": ".docx",
        "type": "Manual",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-00-02",
        "code": "PR-GC-007-P",
        "name": "PR-GC-007 Procedimiento de Control de Documentos y Registros.docx",
        "relPath": "./invima_docs/00. MANUAL Y CONTROL DOCUMENTAL/PR-GC-007 Procedimiento de Control de Documentos y Registros.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-00-03",
        "code": "PT-GC-001-P",
        "name": "PT-GC-001 Politica de Calidad e Inocuidad.docx",
        "relPath": "./invima_docs/00. MANUAL Y CONTROL DOCUMENTAL/PT-GC-001 Politica de Calidad e Inocuidad.docx",
        "size": "108 KB",
        "extension": ".docx",
        "type": "Política",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-00-04",
        "code": "FO-GC-036",
        "name": "FO-GC-036 Listado maestro de documentos.xlsx",
        "relPath": "./invima_docs/FO-GC-036 Listado maestro de documentos.xlsx",
        "size": "35 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-01-agua",
    "folderNumber": "01",
    "folderName": "1. AGUA POTABLE",
    "title": "1. AGUA POTABLE",
    "code": "PG-GC-003",
    "fileCount": 4,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-001",
    "files": [
      {
        "id": "DOC-01-01",
        "code": "FO-GC-001-C",
        "name": "FO-GC-001 Control de agua potable.docx",
        "relPath": "./invima_docs/1. AGUA POTABLE/FO-GC-001 Control de agua potable.docx",
        "size": "81 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-01-02",
        "code": "FO-GC-030-R",
        "name": "FO-GC-030 Registro de lavado de tanque de agua y cambio de filtros.xlsx",
        "relPath": "./invima_docs/1. AGUA POTABLE/FO-GC-030 Registro de lavado de tanque de agua y cambio de filtros.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-01-03",
        "code": "IN-GC-001-002",
        "name": "IN-GC-001 002 Instructivos de medicion de cloro y pH.xlsx",
        "relPath": "./invima_docs/1. AGUA POTABLE/IN-GC-001 002 Instructivos de medicion de cloro y pH.xlsx",
        "size": "36 KB",
        "extension": ".xlsx",
        "type": "Instructivo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-01-04",
        "code": "PG-GC-003-P",
        "name": "PG-GC-003 Programa de Control de Agua Potable.docx",
        "relPath": "./invima_docs/1. AGUA POTABLE/PG-GC-003 Programa de Control de Agua Potable.docx",
        "size": "770 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-02-almacenamiento",
    "folderNumber": "02",
    "folderName": "2. ALMACENAMIENTO",
    "title": "2. ALMACENAMIENTO",
    "code": "PG-GC-010",
    "fileCount": 9,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-015",
    "files": [
      {
        "id": "DOC-02-01",
        "code": "FO-GC-009-M",
        "name": "FO-GC-009 Movimiento de producto en cuarto frio.docx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-009 Movimiento de producto en cuarto frio.docx",
        "size": "42 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-02",
        "code": "FO-GC-010-C",
        "name": "FO-GC-010 Control diario de temperatura de cuarto frio.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-010 Control diario de temperatura de cuarto frio.xlsx",
        "size": "46 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-03",
        "code": "FO-GC-015-F",
        "name": "FO-GC-015 Formato de ingreso de materiales.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-015 Formato de ingreso de materiales.xlsx",
        "size": "79 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-04",
        "code": "FO-GC-029-S",
        "name": "FO-GC-029 Seguimiento de temperatura y humedad de areas.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-029 Seguimiento de temperatura y humedad de areas.xlsx",
        "size": "91 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-05",
        "code": "FO-GC-031-C",
        "name": "FO-GC-031 Control de inventarios - kardex.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-031 Control de inventarios - kardex.xlsx",
        "size": "323 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-06",
        "code": "FO-GC-046-R",
        "name": "FO-GC-046 Rotulos de identificacion de sustancias y soluciones.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/FO-GC-046 Rotulos de identificacion de sustancias y soluciones.xlsx",
        "size": "33 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-07",
        "code": "PG-GC-010-P",
        "name": "PG-GC-010 Programa de Almacenamiento.docx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/PG-GC-010 Programa de Almacenamiento.docx",
        "size": "43 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-08",
        "code": "PR-GC-005-P",
        "name": "PR-GC-005 Procedimiento de Almacenamiento y Manejo de Sustancias Quimicas.docx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/PR-GC-005 Procedimiento de Almacenamiento y Manejo de Sustancias Quimicas.docx",
        "size": "58 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-02-09",
        "code": "PR-GC-005-A01-I",
        "name": "PR-GC-005-A01 Inventario de sustancias quimicas.xlsx",
        "relPath": "./invima_docs/2. ALMACENAMIENTO/PR-GC-005-A01 Inventario de sustancias quimicas.xlsx",
        "size": "25 KB",
        "extension": ".xlsx",
        "type": "Anexo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-03-calibracion",
    "folderNumber": "03",
    "folderName": "3. CALIBRACION",
    "title": "3. CALIBRACION",
    "code": "PG-GC-006",
    "fileCount": 6,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-019",
    "files": [
      {
        "id": "DOC-03-01",
        "code": "FO-GC-008-V",
        "name": "FO-GC-008 Verificacion de equipos de medicion.docx",
        "relPath": "./invima_docs/3. CALIBRACION/FO-GC-008 Verificacion de equipos de medicion.docx",
        "size": "46 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-03-02",
        "code": "FO-GC-017-C",
        "name": "FO-GC-017 Cronograma de calibracion.xlsx",
        "relPath": "./invima_docs/3. CALIBRACION/FO-GC-017 Cronograma de calibracion.xlsx",
        "size": "29 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-03-03",
        "code": "FO-GC-018-IN-GC-003",
        "name": "FO-GC-018 IN-GC-003 Registro de calibracion e instrucciones de operacion.xlsx",
        "relPath": "./invima_docs/3. CALIBRACION/FO-GC-018 IN-GC-003 Registro de calibracion e instrucciones de operacion.xlsx",
        "size": "162 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-03-04",
        "code": "IN-GC-003-I",
        "name": "IN-GC-003 Instrucciones de operacion de instrumentos de medicion.xlsx",
        "relPath": "./invima_docs/3. CALIBRACION/IN-GC-003 Instrucciones de operacion de instrumentos de medicion.xlsx",
        "size": "26 KB",
        "extension": ".xlsx",
        "type": "Instructivo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-03-05",
        "code": "IN-GC-004-FO-GC-019",
        "name": "IN-GC-004 FO-GC-019 Verificacion del pHmetro.xlsx",
        "relPath": "./invima_docs/3. CALIBRACION/IN-GC-004 FO-GC-019 Verificacion del pHmetro.xlsx",
        "size": "38 KB",
        "extension": ".xlsx",
        "type": "Instructivo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-03-06",
        "code": "PG-GC-006-P",
        "name": "PG-GC-006 Programa de Calibración.docx",
        "relPath": "./invima_docs/3. CALIBRACION/PG-GC-006 Programa de Calibración.docx",
        "size": "61 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-04-capacitacion",
    "folderNumber": "04",
    "folderName": "4. CAPACITACION",
    "title": "4. CAPACITACION",
    "code": "PG-GC-007",
    "fileCount": 6,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-021",
    "files": [
      {
        "id": "DOC-04-01",
        "code": "FO-GC-020-C",
        "name": "FO-GC-020 Cronograma de capacitaciones.xlsx",
        "relPath": "./invima_docs/4. CAPACITACION/FO-GC-020 Cronograma de capacitaciones.xlsx",
        "size": "34 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-04-02",
        "code": "FO-GC-021-A",
        "name": "FO-GC-021 Asistencia a capacitaciones.xlsx",
        "relPath": "./invima_docs/4. CAPACITACION/FO-GC-021 Asistencia a capacitaciones.xlsx",
        "size": "30 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-04-03",
        "code": "FO-GC-032-R",
        "name": "FO-GC-032 Registro de ingreso de visitantes.xlsx",
        "relPath": "./invima_docs/4. CAPACITACION/FO-GC-032 Registro de ingreso de visitantes.xlsx",
        "size": "31 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-04-04",
        "code": "FO-GC-033-E",
        "name": "FO-GC-033 Entrega de dotacion y EPP.xlsx",
        "relPath": "./invima_docs/4. CAPACITACION/FO-GC-033 Entrega de dotacion y EPP.xlsx",
        "size": "28 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-04-05",
        "code": "FO-GC-034-V",
        "name": "FO-GC-034 Verificacion de practicas higienicas del personal.xlsx",
        "relPath": "./invima_docs/4. CAPACITACION/FO-GC-034 Verificacion de practicas higienicas del personal.xlsx",
        "size": "92 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-04-06",
        "code": "PG-GC-007-P",
        "name": "PG-GC-007 Programa de Capacitación.docx",
        "relPath": "./invima_docs/4. CAPACITACION/PG-GC-007 Programa de Capacitación.docx",
        "size": "95 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-05-plagas",
    "folderNumber": "05",
    "folderName": "5. CONTROL DE PLAGAS",
    "title": "5. CONTROL DE PLAGAS",
    "code": "PG-GC-002",
    "fileCount": 3,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-004",
    "files": [
      {
        "id": "DOC-05-01",
        "code": "FO-GC-004-C",
        "name": "FO-GC-004 Control de plagas y hermetizacion.docx",
        "relPath": "./invima_docs/5. CONTROL DE PLAGAS/FO-GC-004 Control de plagas y hermetizacion.docx",
        "size": "39 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-05-02",
        "code": "FO-GC-044-D",
        "name": "FO-GC-044 Diagnostico de control de plagas.xlsx",
        "relPath": "./invima_docs/5. CONTROL DE PLAGAS/FO-GC-044 Diagnostico de control de plagas.xlsx",
        "size": "25 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-05-03",
        "code": "PG-GC-002-P",
        "name": "PG-GC-002 Programa de Manejo Integrado de Plagas.docx",
        "relPath": "./invima_docs/5. CONTROL DE PLAGAS/PG-GC-002 Programa de Manejo Integrado de Plagas.docx",
        "size": "66 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-06-limpieza",
    "folderNumber": "06",
    "folderName": "6. LIMPIEZA Y DESINFECCIÓN",
    "title": "6. LIMPIEZA Y DESINFECCIÓN",
    "code": "PG-GC-001",
    "fileCount": 6,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-003",
    "files": [
      {
        "id": "DOC-06-01",
        "code": "BPM-PR-01",
        "name": "BPM-PR-01a25   PROCEDIMIENTOS LIMPIEZA Y DESINFECCION.xlsx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/BPM-PR-01a25   PROCEDIMIENTOS LIMPIEZA Y DESINFECCION.xlsx",
        "size": "589 KB",
        "extension": ".xlsx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-06-02",
        "code": "FO-GC-002-F",
        "name": "FO-GC-002 Formato operacional diario de limpieza y desinfeccion.docx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/FO-GC-002 Formato operacional diario de limpieza y desinfeccion.docx",
        "size": "57 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-06-03",
        "code": "FO-GC-003-R",
        "name": "FO-GC-003 Registro de limpieza CIP de equipos.xlsx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/FO-GC-003 Registro de limpieza CIP de equipos.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-06-04",
        "code": "FO-GC-024-R",
        "name": "FO-GC-024 Registro de lavado y desinfeccion de barriles.xlsx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/FO-GC-024 Registro de lavado y desinfeccion de barriles.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-06-05",
        "code": "PG-GC-001-A",
        "name": "PG-GC-001 Anexo POES de limpieza y desinfeccion.xlsx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/PG-GC-001 Anexo POES de limpieza y desinfeccion.xlsx",
        "size": "83 KB",
        "extension": ".xlsx",
        "type": "Anexo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-06-06",
        "code": "PG-GC-001-P",
        "name": "PG-GC-001 Programa de Limpieza y Desinfección.docx",
        "relPath": "./invima_docs/6. LIMPIEZA Y DESINFECCIÓN/PG-GC-001 Programa de Limpieza y Desinfección.docx",
        "size": "279 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-07-residuos",
    "folderNumber": "07",
    "folderName": "7. MANEJO DE RESIDUOS",
    "title": "7. MANEJO DE RESIDUOS",
    "code": "PG-GC-004",
    "fileCount": 3,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-005",
    "files": [
      {
        "id": "DOC-07-01",
        "code": "FO-GC-005-R",
        "name": "FO-GC-005 Registro de manejo de residuos solidos.docx",
        "relPath": "./invima_docs/7. MANEJO DE RESIDUOS/FO-GC-005 Registro de manejo de residuos solidos.docx",
        "size": "48 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-07-02",
        "code": "FO-GC-006-F",
        "name": "FO-GC-006 Formato de disposicion de residuos.xlsx",
        "relPath": "./invima_docs/7. MANEJO DE RESIDUOS/FO-GC-006 Formato de disposicion de residuos.xlsx",
        "size": "31 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-07-03",
        "code": "PG-GC-004-P",
        "name": "PG-GC-004 Programa de Residuos Sólidos y Líquidos.docx",
        "relPath": "./invima_docs/7. MANEJO DE RESIDUOS/PG-GC-004 Programa de Residuos Sólidos y Líquidos.docx",
        "size": "1056 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-08-mantenimiento",
    "folderNumber": "08",
    "folderName": "8. MANTENIMIENTO",
    "title": "8. MANTENIMIENTO",
    "code": "PG-GC-005",
    "fileCount": 5,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-007",
    "files": [
      {
        "id": "DOC-08-01",
        "code": "FO-GC-007-R",
        "name": "FO-GC-007 Registro de mantenimiento y liberacion de equipos.docx",
        "relPath": "./invima_docs/8. MANTENIMIENTO/FO-GC-007 Registro de mantenimiento y liberacion de equipos.docx",
        "size": "54 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-08-02",
        "code": "FO-GC-022-C",
        "name": "FO-GC-022 Cronograma de mantenimiento.xlsx",
        "relPath": "./invima_docs/8. MANTENIMIENTO/FO-GC-022 Cronograma de mantenimiento.xlsx",
        "size": "42 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-08-03",
        "code": "FO-GC-027-028",
        "name": "FO-GC-027 028 Listado maestro y hojas de vida de equipos.xlsx",
        "relPath": "./invima_docs/8. MANTENIMIENTO/FO-GC-027 028 Listado maestro y hojas de vida de equipos.xlsx",
        "size": "260 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-08-04",
        "code": "PG-GC-005-P",
        "name": "PG-GC-005 Programa de Mantenimiento.docx",
        "relPath": "./invima_docs/8. MANTENIMIENTO/PG-GC-005 Programa de Mantenimiento.docx",
        "size": "61 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-08-05",
        "code": "PR-GC-006-P",
        "name": "PR-GC-006 Procedimiento de Identificacion y Senalizacion de Tuberias.docx",
        "relPath": "./invima_docs/8. MANTENIMIENTO/PR-GC-006 Procedimiento de Identificacion y Senalizacion de Tuberias.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-09-muestreo",
    "folderNumber": "09",
    "folderName": "9. MUESTREO",
    "title": "9. MUESTREO",
    "code": "PG-GC-011",
    "fileCount": 3,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-023",
    "files": [
      {
        "id": "DOC-09-01",
        "code": "FO-GC-023-C",
        "name": "FO-GC-023 Cronograma de muestreo de laboratorio externo.xlsx",
        "relPath": "./invima_docs/9. MUESTREO/FO-GC-023 Cronograma de muestreo de laboratorio externo.xlsx",
        "size": "31 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-09-02",
        "code": "PG-GC-011-P",
        "name": "PG-GC-011 Programa de Muestreo.docx",
        "relPath": "./invima_docs/9. MUESTREO/PG-GC-011 Programa de Muestreo.docx",
        "size": "62 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-09-03",
        "code": "PR-GC-002-P",
        "name": "PR-GC-002 Procedimiento de Inspección de Materias Primas.docx",
        "relPath": "./invima_docs/9. MUESTREO/PR-GC-002 Procedimiento de Inspección de Materias Primas.docx",
        "size": "55 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-10-proveedores",
    "folderNumber": "10",
    "folderName": "10. PROVEEDORES",
    "title": "10. PROVEEDORES",
    "code": "PG-GC-008",
    "fileCount": 3,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-016",
    "files": [
      {
        "id": "DOC-10-01",
        "code": "FO-GC-016-L",
        "name": "FO-GC-016 Listado de proveedores.xlsx",
        "relPath": "./invima_docs/10. PROVEEDORES/FO-GC-016 Listado de proveedores.xlsx",
        "size": "29 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-10-02",
        "code": "FO-GC-045-E",
        "name": "FO-GC-045 Evaluacion de proveedores.xlsx",
        "relPath": "./invima_docs/10. PROVEEDORES/FO-GC-045 Evaluacion de proveedores.xlsx",
        "size": "31 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-10-03",
        "code": "PG-GC-008-P",
        "name": "PG-GC-008 Programa de Control de Proveedores.docx",
        "relPath": "./invima_docs/10. PROVEEDORES/PG-GC-008 Programa de Control de Proveedores.docx",
        "size": "63 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-11-trazabilidad",
    "folderNumber": "11",
    "folderName": "11. TRAZABILIDAD",
    "title": "11. TRAZABILIDAD",
    "code": "PG-GC-009",
    "fileCount": 10,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-014",
    "files": [
      {
        "id": "DOC-11-01",
        "code": "FO-GC-012-C",
        "name": "FO-GC-012 Control de produccion - registro de lote.docx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-012 Control de produccion - registro de lote.docx",
        "size": "64 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-02",
        "code": "FO-GC-012-P",
        "name": "FO-GC-012 Planilla de control de proceso - registro de lote.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-012 Planilla de control de proceso - registro de lote.xlsx",
        "size": "38 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-03",
        "code": "FO-GC-013-I",
        "name": "FO-GC-013 Inspeccion de vehiculo.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-013 Inspeccion de vehiculo.xlsx",
        "size": "31 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-04",
        "code": "FO-GC-014-R",
        "name": "FO-GC-014 Registro de contramuestras.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-014 Registro de contramuestras.xlsx",
        "size": "30 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-05",
        "code": "FO-GC-035-C",
        "name": "FO-GC-035 Certificado de analisis y liberacion de producto terminado.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-035 Certificado de analisis y liberacion de producto terminado.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-06",
        "code": "FO-GC-037-L",
        "name": "FO-GC-037 Lista de chequeo del rotulo del barril.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-037 Lista de chequeo del rotulo del barril.xlsx",
        "size": "24 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-07",
        "code": "FO-GC-038-A",
        "name": "FO-GC-038 Acta de simulacro de retiro de producto.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-038 Acta de simulacro de retiro de producto.xlsx",
        "size": "23 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-08",
        "code": "FO-GC-047-R",
        "name": "FO-GC-047 Registro de PQRS de clientes.xlsx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/FO-GC-047 Registro de PQRS de clientes.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-09",
        "code": "PG-GC-009-P",
        "name": "PG-GC-009 Programa de Trazabilidad.docx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/PG-GC-009 Programa de Trazabilidad.docx",
        "size": "69 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-11-10",
        "code": "PR-GC-008-P",
        "name": "PR-GC-008 Procedimiento de Atencion de PQRS.docx",
        "relPath": "./invima_docs/11. TRAZABILIDAD/PR-GC-008 Procedimiento de Atencion de PQRS.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-12-recepcion-mp",
    "folderNumber": "12",
    "folderName": "12. RECEPCION DE MATERIAS PRIMAS",
    "title": "12. RECEPCION DE MATERIAS PRIMAS",
    "code": "PG-GC-012",
    "fileCount": 13,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-011",
    "files": [
      {
        "id": "DOC-12-01",
        "code": "FT-GC-005-F",
        "name": "FT-GC-005 Ficha Tecnica Maltas.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-005 Ficha Tecnica Maltas.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-02",
        "code": "FT-GC-006-F",
        "name": "FT-GC-006 Ficha Tecnica Lupulo.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-006 Ficha Tecnica Lupulo.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-03",
        "code": "FT-GC-007-F",
        "name": "FT-GC-007 Ficha Tecnica Levadura.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-007 Ficha Tecnica Levadura.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-04",
        "code": "FT-GC-008-F",
        "name": "FT-GC-008 Ficha Tecnica Sales Clarificantes y Nutrientes.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-008 Ficha Tecnica Sales Clarificantes y Nutrientes.docx",
        "size": "108 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-05",
        "code": "FT-GC-009-F",
        "name": "FT-GC-009 Ficha Tecnica CO2 Grado Alimenticio.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-009 Ficha Tecnica CO2 Grado Alimenticio.docx",
        "size": "108 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-06",
        "code": "FT-GC-010-F",
        "name": "FT-GC-010 Ficha Tecnica Barriles.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-010 Ficha Tecnica Barriles.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-07",
        "code": "FT-GC-011-F",
        "name": "FT-GC-011 Ficha Tecnica Productos de Limpieza y Desinfeccion.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/Fichas tecnicas MP/FT-GC-011 Ficha Tecnica Productos de Limpieza y Desinfeccion.docx",
        "size": "109 KB",
        "extension": ".docx",
        "type": "Ficha Técnica",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-08",
        "code": "FO-GC-011-R",
        "name": "FO-GC-011 Registro de recepcion de materias primas e insumos.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/FO-GC-011 Registro de recepcion de materias primas e insumos.docx",
        "size": "46 KB",
        "extension": ".docx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-09",
        "code": "FO-GC-026-R",
        "name": "FO-GC-026 Registro de rechazos y devoluciones de materiales.xlsx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/FO-GC-026 Registro de rechazos y devoluciones de materiales.xlsx",
        "size": "27 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-10",
        "code": "FO-GC-039-040",
        "name": "FO-GC-039 040 041 Tarjetas de estado de materiales.xlsx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/FO-GC-039 040 041 Tarjetas de estado de materiales.xlsx",
        "size": "118 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-11",
        "code": "FO-GC-042-I",
        "name": "FO-GC-042 Informe de pruebas fisicoquimicas y organolepticas de recepcion.xlsx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/FO-GC-042 Informe de pruebas fisicoquimicas y organolepticas de recepcion.xlsx",
        "size": "297 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-12",
        "code": "FO-GC-043-P",
        "name": "FO-GC-043 Planilla de ensayos.xlsx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/FO-GC-043 Planilla de ensayos.xlsx",
        "size": "90 KB",
        "extension": ".xlsx",
        "type": "Formato",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-12-13",
        "code": "PG-GC-012-P",
        "name": "PG-GC-012 Programa de Recepción de Materias Primas e Insumos.docx",
        "relPath": "./invima_docs/12. RECEPCION DE MATERIAS PRIMAS/PG-GC-012 Programa de Recepción de Materias Primas e Insumos.docx",
        "size": "64 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  },
  {
    "id": "prog-13-control-calidad",
    "folderNumber": "13",
    "folderName": "13. CONTROL DE CALIDAD",
    "title": "13. CONTROL DE CALIDAD",
    "code": "PG-GC-013",
    "fileCount": 3,
    "status": "Vigente 🟢",
    "interactiveFormId": "FO-GC-035",
    "files": [
      {
        "id": "DOC-13-01",
        "code": "PG-GC-013-A",
        "name": "PG-GC-013 Anexo Tabla de carbonatacion.xlsx",
        "relPath": "./invima_docs/13. CONTROL DE CALIDAD/PG-GC-013 Anexo Tabla de carbonatacion.xlsx",
        "size": "26 KB",
        "extension": ".xlsx",
        "type": "Anexo",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-13-02",
        "code": "PG-GC-013-P",
        "name": "PG-GC-013 Programa de Control de Calidad.docx",
        "relPath": "./invima_docs/13. CONTROL DE CALIDAD/PG-GC-013 Programa de Control de Calidad.docx",
        "size": "114 KB",
        "extension": ".docx",
        "type": "Programa",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      },
      {
        "id": "DOC-13-03",
        "code": "PR-GC-004-P",
        "name": "PR-GC-004 Procedimiento de Producto No Conforme.docx",
        "relPath": "./invima_docs/13. CONTROL DE CALIDAD/PR-GC-004 Procedimiento de Producto No Conforme.docx",
        "size": "59 KB",
        "extension": ".docx",
        "type": "Procedimiento",
        "status": "Vigente & Aprobado",
        "updatedAt": "2026-10-16"
      }
    ]
  }
],

  // 8. MATRIZ COMPARATIVA INTEGRADA Y DIAGNÓSTICO ARQUITECTÓNICO (BREWW, BEER30, EKOS, ODOO vs NORTA OS)
  architectureBenchmarking: {
    matrix: [
      { platform: "Breww", focus: "Producción, trazabilidad B2B y logística multi-sitio", crm: "Incluido (Portal Autopedidos B2B)", docRepo: "Adjuntos por lote, receta e insumos", accounting: "QuickBooks, Xero, Sage", learningCurve: "Baja (Nativa Cervecerías)" },
      { platform: "Beer30", focus: "Análisis fermentativo, COGS tiempo real y genealogía", crm: "Módulo Add-on fuerza comercial", docRepo: "Registro digital CIP y calidad", accounting: "QuickBooks, Xero", learningCurve: "Baja - Media" },
      { platform: "Ekos Brewmaster", focus: "Gestión operativa 'grain-to-glass' y financiera", crm: "Integrado", docRepo: "Fichas técnicas y reportes de mermas", accounting: "QuickBooks, NetSuite", learningCurve: "Media" },
      { platform: "Odoo ERP", focus: "ERP Genérico Abierto y Modular Configurable", crm: "Avanzado", docRepo: "Módulo nativo Odoo Documents con versiones", accounting: "Módulo nativo Odoo Accounting / DIAN", learningCurve: "Media - Alta" },
      { platform: "NORTA OS 5.0", focus: "Suite Integrada de Gestión Cervecera Escusable (React)", crm: "Integrado + Portal Autopedidos B2B", docRepo: "Repositorio DMS (BPM, INVIMA y COA)", accounting: "Exportador CSV / Siigo / QuickBooks", learningCurve: "Baja (Interfaz Intuitiva NORTA)" }
    ]
  }
};
