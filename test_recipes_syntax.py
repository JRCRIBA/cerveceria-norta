import re, json

# 1. Prepare the JSON-like snippet for the 4 beers
FOUR_RECIPES_JS = """    {
      id: "REC-MONTANA-01",
      name: "NORTA Montaña",
      style: "Amber Mountain Ale / Cerveza de Cima",
      targetVolumeL: 1000,
      og: 1.050,
      fg: 1.013,
      abv: 4.8,
      ibu: 28,
      srmColor: 16.0,
      mashTemp: "66.0 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Fuerza y Poder Natural",
      liquidColor: "#b2541f",
      image: "./assets/cerveza_montana.jpg",
      glassware: "Copa Teku o Cáliz de Montaña",
      servingTemp: "6°C - 8°C",
      pairing: "Carnes a la brasa, embutidos artesanales de montaña, quesos semicurados y guisos tradicionales.",
      intensity: { malt: 7, hops: 5, body: 6, roast: 3 },
      sensoryTags: ["Fuerte y Robusta", "Cima Nevada", "Cereal Tostado", "Carácter Andino", "Poder Natural"],
      grains: [
        { name: "Malta Escandinava Pale Ale", percentage: 75, kg: 175, rawId: "RAW-01" },
        { name: "Malta Caramelo Amber 60L", percentage: 15, kg: 35, rawId: "RAW-03" },
        { name: "Malta Munich Type I", percentage: 10, kg: 23, rawId: "RAW-02" }
      ],
      hops: [
        { name: "Saaz (Hervor 60m)", timing: "Hervor 60 min", g: 850, rawId: "RAW-07" },
        { name: "East Kent Goldings (Whirlpool)", timing: "Whirlpool 10 min", g: 600, rawId: "RAW-07" }
      ],
      yeast: "Levadura Nórdica de Guarda Fría / 21 días de maduración",
      essence: "Fuerte y Robusta, como una cima nevada. Habla de carácter, altura y poder natural. En tierras agrestes del norte, escalar una montaña no era solo un reto físico sino una prueba de carácter y grandeza. Las cimas nevadas eran el símbolo de quienes se elevan por encima de lo común. Esta cerveza encarna ese espíritu: fuerte, robusto y con un poder natural que marca el camino.",
      sensoryDescription: "Cuerpo medio-robusto con hermosa tonalidad ámbar cobriza y corona blanca densa. Notas a corteza de pan tostado, frutos secos, sutil toque de miel de bosque y amargor herbal equilibrado que deja una sensación limpia y persistente."
    },
    {
      id: "REC-TEMPESTAD-01",
      name: "NORTA Tempestad",
      style: "Storm Cold IPA / Chispeante & Audaz",
      targetVolumeL: 1000,
      og: 1.054,
      fg: 1.012,
      abv: 5.5,
      ibu: 45,
      srmColor: 7.0,
      mashTemp: "64.5 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Intensa e Indomable",
      liquidColor: "#dfa125",
      image: "./assets/cerveza_tempestad.jpg",
      glassware: "Copa Sommelier Craft o Tulipa",
      servingTemp: "4°C - 6°C",
      pairing: "Comida especiada, ceviches frescos, hamburguesas de autor, tacos de cordero y quesos de corteza lavada.",
      intensity: { malt: 5, hops: 8, body: 6, roast: 1 },
      sensoryTags: ["Intensa", "Chispeante", "Indomable", "Lúpulos Nobles", "Impacto Memorable"],
      grains: [
        { name: "Malta Pilsner Escandinava Extra Pale", percentage: 80, kg: 176, rawId: "RAW-02" },
        { name: "Malta de Trigo Blanco", percentage: 12, kg: 26, rawId: "RAW-03" },
        { name: "Copos de Avena", percentage: 8, kg: 18, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Centennial (Hervor)", timing: "Hervor 60 min", g: 900, rawId: "RAW-06" },
        { name: "Citra & Mosaic (Whirlpool)", timing: "Whirlpool 80°C", g: 2000, rawId: "RAW-05" },
        { name: "Simcoe (Dry Hop en frío)", timing: "Dry Hop Día 5", g: 3000, rawId: "RAW-06" }
      ],
      yeast: "Lager / Kveik Híbrida en fermentación fría (14°C) para máxima frescura chispeante",
      essence: "Intensa, Chispeante, algo Indomable. Deja huella desde el primer trago. Las tempestades del norte no piden permiso. Son intensas y dejan una impresión que no se olvida. Esta cerveza chispeante y adictiva representa la osadía de quién no teme al impacto. Es una bebida que desafía los sentidos y enciende el deseo de repetir la experiencia.",
      sensoryDescription: "Dorado eléctrico brillante con espuma viva. Explosión aromática de toronja, resina de pino y frutas tropicales ácidas. En boca es electrizante, chispeante, con un final seco y un amargor audaz que resuena en el paladar."
    },
    {
      id: "REC-NIEBLA-01",
      name: "NORTA Niebla",
      style: "Hazy Wheat & Pale Ale / Bruma Nórdica",
      targetVolumeL: 1000,
      og: 1.060,
      fg: 1.013,
      abv: 6.2,
      ibu: 24,
      srmColor: 5.0,
      mashTemp: "66.5 °C (60 min)",
      boilTimeMin: 60,
      brandPillar: "Elegante y Misteriosa",
      liquidColor: "#eedc82",
      image: "./assets/cerveza_niebla.jpg",
      glassware: "Vaso Flauta Alto o Copa Teku",
      servingTemp: "5°C - 7°C",
      pairing: "Pescados blancos, salmón ahumado, quesos de cabra frescos, risotto de hongos y panadería de masa madre.",
      intensity: { malt: 6, hops: 5, body: 7, roast: 1 },
      sensoryTags: ["Elegante", "Suave y Misteriosa", "Bruma Velada", "Sedosa", "Autoridad Serena"],
      grains: [
        { name: "Malta Pale Ale Nórdica", percentage: 55, kg: 135, rawId: "RAW-01" },
        { name: "Trigo Malteado Claro", percentage: 30, kg: 74, rawId: "RAW-03" },
        { name: "Copos de Avena Suaves", percentage: 15, kg: 37, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Hallertau Blanc", timing: "Hervor 60 min", g: 650, rawId: "RAW-07" },
        { name: "Nelson Sauvin & Cascade", timing: "Whirlpool 15 min", g: 1800, rawId: "RAW-05" }
      ],
      yeast: "Levadura Witbier / Hazy Ale de esteres sedosos y maduración a 1°C",
      essence: "Elegante, Suave y Misteriosa. Una cerveza con sutileza y profundidad. La niebla suave pero envolvente, es símbolo de lo que se impone sin gritar. En el norte, los verdaderos líderes no siempre eran los más ruidosos, sino los más firmes en su visión. Esta cerveza elegante y profunda, representa esa autoridad serena, esa sofisticación que se percibe en cada trago.",
      sensoryDescription: "Tonalidad pajiza opalescente con velo etéreo de bruma natural y corona de espuma cremosa y aterciopelada. Aromas sutiles a uva blanca, lichi, corteza de trigo y flores silvestres. Textura en boca sedosa, envolvente y de una elegancia silenciosa imborrable."
    },
    {
      id: "REC-CUMBRE-01",
      name: "NORTA Cumbre",
      style: "Imperial Golden Ale • La Insignia NORTA",
      targetVolumeL: 1000,
      og: 1.066,
      fg: 1.014,
      abv: 6.8,
      ibu: 36,
      srmColor: 9.0,
      mashTemp: "65.0 °C (75 min)",
      boilTimeMin: 75,
      brandPillar: "Excelencia & Visión",
      liquidColor: "#e6b022",
      image: "./assets/cerveza_cumbre.jpg",
      glassware: "Copa Cáliz Dorada o Snifter de Autor",
      servingTemp: "8°C - 10°C",
      pairing: "Cortes nobles de res, quesos curados de larga guarda, magret de pato, postres con frutos secos y miel de páramo.",
      intensity: { malt: 8, hops: 7, body: 8, roast: 2 },
      sensoryTags: ["La Insignia", "Excelsa y Dorada", "Memorable", "Cima de Excelencia", "Legado de Honor"],
      grains: [
        { name: "Malta Pilsner Escandinava Superior", percentage: 78, kg: 205, rawId: "RAW-02" },
        { name: "Malta Munich Gold", percentage: 14, kg: 37, rawId: "RAW-02" },
        { name: "Malta Aromatic / Melano", percentage: 8, kg: 21, rawId: "RAW-03" }
      ],
      hops: [
        { name: "Saaz Select (Noble)", timing: "Hervor 60 min", g: 1200, rawId: "RAW-07" },
        { name: "Styrian Goldings", timing: "Hervor 20 min", g: 900, rawId: "RAW-07" },
        { name: "Amarillo (Aroma Sublime)", timing: "Whirlpool", g: 1400, rawId: "RAW-05" }
      ],
      yeast: "Levadura Monástica / Abadía Nórdica de alta atenuación y guarda prolongada de 45 días",
      essence: "Es la Insignia. Una cerveza que representa lo más alto, lo más refinado. Habla de excelencia y visión. La cumbre no es solo el punto más alto: es la meta, el orgullo, el legado. En NORTA esta cerveza representa lo más refinado, lo que define la identidad y eleva el estándar. Como una insignia conquistada con honor, esta variedad es la esencia de la marca: Excelsa, Dorada y Memorable.",
      sensoryDescription: "Oro resplandeciente con destellos de sol naciente y corona majestuosa de espuma blanca. Aromas ricos a miel de brezo, damasco deshidratado, pera madura y especias nobles. En boca es densa, cálida, de complejidad soberbia y un final largo y aristocrático que consagra la cumbre del arte cervecero."
    },"""

print("Four recipes block defined.")
