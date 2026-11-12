import json

BRAND_ADDITIONS = """
    // El Arte de la Elaboración Oficial (Grain-to-Glass NORTA)
    craftsmanship: {
      motto: "Proceso Ancestral, Técnica Moderna",
      intro: "En NORTA fusionamos sabiduría tradicional nórdica con precisión contemporánea. Cada lote se elabora en pequeñas cantidades, supervisando personalmente cada fase del proceso. Seleccionamos maltas europeas premium, lúpulos aromáticos y levaduras especializadas. Nuestro método respeta los tiempos naturales de fermentación y maduración, sin prisas ni compromisos. El resultado: cervezas de complejidad excepcional que honran siglos de tradición cervecera.",
      image: "./assets/arte_elaboracion_norta.jpg",
      phases: [
        {
          num: "01",
          title: "Selección de Ingredientes Nobles",
          desc: "Maltas escandinavas y continentales seleccionadas, lúpulos nobles en flor fresca y agua mineral pura tratada iónicamente según Decreto 2115.",
          icon: "🌾",
          badge: "Materia Prima 100% Pura",
          temp: "Agua Sabana Desmineralizada"
        },
        {
          num: "02",
          title: "Maceración Artesanal Escalonada",
          desc: "Control micrométrico de temperatura en infusión escalonada para extraer el perfil enzimático exacto de maltas base y especiales.",
          icon: "🔥",
          badge: "Infusión 64°C - 67.5°C",
          temp: "Rendimiento Brewhouse 88%"
        },
        {
          num: "03",
          title: "Fermentación Natural & Control de Frío",
          desc: "Levaduras seleccionadas nórdicas y kveik en fermentación limpia, lenta y a baja temperatura para preservar ésteres frutales delicados.",
          icon: "🫧",
          badge: "Cinética Lenta sin Químicos",
          temp: "Control Térmico ±0.2°C"
        },
        {
          num: "04",
          title: "Maduración Paciente en Bodega",
          desc: "Guarda prolongada de 21 a 45 días a 0°C. El reposo en frío permite la clarificación biológica espontánea y el redondeo de los taninos.",
          icon: "❄️",
          badge: "21 a 45 Días de Guarda",
          temp: "Cero Aceleradores Industriales"
        },
        {
          num: "05",
          title: "Embotellado Selectivo con Purga CO2",
          desc: "Envasado isobárico con contrapresión de CO2 estéril y sellado de alta hermeticidad. Cada botella cuenta con trazabilidad total de lote.",
          icon: "🏺",
          badge: "Trazabilidad Lote x Lote",
          temp: "Oxígeno Disuelto < 30 ppb"
        }
      ]
    },

    // Valores Rectores Canónicos NORTA (Fuente: Gamma Site Oficial)
    coreValuesGamma: [
      {
        name: "Resiliencia",
        desc: "Como el norte que permanece firme ante cualquier tormenta, nuestras cervezas representan la fortaleza de quienes se reinventan y perseveran. Cada botella es un tributo a la capacidad de levantarse.",
        icon: "🛡️",
        color: "#0e2334"
      },
      {
        name: "Autenticidad",
        desc: "Elaboramos cada cerveza respetando procesos ancestrales y técnicas artesanales. Sin atajos, sin artificios. Solo ingredientes naturales y dedicación absoluta al arte cervecero tradicional.",
        icon: "🌲",
        color: "#3a452d"
      },
      {
        name: "Excelencia",
        desc: "La perfección está en los detalles. Desde la selección de maltas hasta el diseño de cada etiqueta, buscamos la máxima calidad en cada aspecto de NORTA. Lo bien hecho es nuestra firma.",
        icon: "✨",
        color: "#b89764"
      },
      {
        name: "Propósito",
        desc: "Más que una cerveza, somos una filosofía de vida. Para quienes tienen claro su rumbo, valoran las experiencias exclusivas y celebran cada momento con carácter e intención.",
        icon: "🧭",
        color: "#4d3720"
      }
    ],

    // Audiencia y Filosofía ("Para Quienes Valoran lo Auténtico")
    audienceProfiles: [
      {
        id: "aud-1",
        title: "Profesionales Independientes",
        tag: "Liderazgo & Dirección",
        range: "25 a 50 años",
        desc: "Líderes con mentalidad emprendedora y carácter fuerte. Personas que inspiran y toman decisiones con convicción, que no siguen modas pasajeras sino rumbos propios.",
        icon: "🧭"
      },
      {
        id: "aud-2",
        title: "Amantes de lo Exclusivo",
        tag: "Experiencia Selecta",
        range: "Consumo Consciente",
        desc: "Buscan experiencias selectas y productos con historia. Aprecian el esfuerzo detrás de cada detalle y valoran la calidad sobre la cantidad.",
        icon: "✨"
      },
      {
        id: "aud-3",
        title: "Conocedores del Sabor",
        tag: "Criterio Sommelier",
        range: "Paladares Educados",
        desc: "Distingue la diferencia entre lo artesanal y lo industrial. Para quienes la cerveza es un arte de paciencia y no solo una bebida de paso.",
        icon: "🍺"
      }
    ],

    // Momentos NORTA
    brandMoments: [
      {
        title: "Encuentros Memorables",
        desc: "Comparte NORTA con quienes aprecian las conversaciones profundas y los brindis significativos. Para reuniones que trascienden lo ordinario.",
        icon: "🥂",
        setting: "Celebraciones íntimas y tertulias de valor"
      },
      {
        title: "Pausas Reflexivas",
        desc: "Momentos de introspección merecen una cerveza a la altura. NORTA te acompaña en tus instantes de claridad y templanza interior.",
        icon: "🏔️",
        setting: "Introspección, calma y lectura"
      },
      {
        title: "Experiencias Gastronómicas",
        desc: "Maridar con quesos de guarda, carnes ahumadas, pescados de aguas frías o postres complejos. Cada variedad NORTA eleva la alta cocina.",
        icon: "🍽️",
        setting: "Maridaje sommelier de autor"
      }
    ],

    // Diseño con Propósito
    designPurpose: {
      title: "Diseño con Propósito & Simbolismo Ancestral",
      statement: "Cada elemento visual de NORTA está cuidadosamente diseñado para reflejar nuestros valores. La estética minimalista nórdica se encuentra con simbolismo ancestral: runas, brújulas y patrones geométricos que evocan la navegación vikinga y la imponencia andina.",
      paletteNote: "Nuestra paleta combina tonos tierra con azul profundo y acentos de verde nórdico / glacial y dorado tenue. Las etiquetas texturizadas y la tipografía robusta transmiten solidez y autenticidad. Todo en NORTA comunica carácter, desde el primer vistazo hasta el último sorbo."
    },
"""

for fname in ["index.html", "data.js"]:
    with open(fname, "r", encoding="utf-8") as f:
        txt = f.read()
    if "craftsmanship:" not in txt:
        pos = txt.find("corporatePhilosophy:")
        if pos != -1:
            txt = txt[:pos] + BRAND_ADDITIONS + "\n    " + txt[pos:]
            with open(fname, "w", encoding="utf-8") as f:
                f.write(txt)
            print(f"Added craftsmanship, values, audience to {fname}")
        else:
            print(f"Could not find corporatePhilosophy: in {fname}")
    else:
        print(f"craftsmanship already exists in {fname}")
