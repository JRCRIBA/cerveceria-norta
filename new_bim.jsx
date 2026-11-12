// ==========================================================================
// COMPONENTE: BrandIdentityModule (BRAND BOOK DIGITAL INTERACTIVO NORTA)
// ==========================================================================
function BrandIdentityModule({ data }) {
  const [activeTab, setActiveTab] = useState('manifesto');
  const [copiedHex, setCopiedHex] = useState(null);
  const [selectedBeerModal, setSelectedBeerModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState('canonical');
  const [contrastBg, setContrastBg] = useState('#0e2334');
  const [contrastFg, setContrastFg] = useState('#b89764');

  const brand = data.brandIdentity || {};
  const recipes = data.recipes || [];
  const colors = brand.colors || [];
  const pillars = brand.pillars || [];
  const typographySpec = brand.typographySpec || [];
  const decalogo = brand.decalogo || [];
  const packagingConcepts = brand.packagingConcepts || [];
  const craftsmanship = brand.craftsmanship || {};
  const coreValuesGamma = brand.coreValuesGamma || [];
  const audienceProfiles = brand.audienceProfiles || [];
  const brandMoments = brand.brandMoments || [];
  const designPurpose = brand.designPurpose || {};
  const corporatePhilosophy = brand.corporatePhilosophy || {};

  const handleCopyColor = (hex, name) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // 4 Cervezas Canónicas Principales NORTA
  const canonicalBeers = useMemo(() => {
    return recipes.filter(r => 
      r.name.includes('Montana') || 
      r.name.includes('Tempestad') || 
      r.name.includes('Niebla') || 
      r.name.includes('Cumbre')
    );
  }, [recipes]);

  const filteredBeers = useMemo(() => {
    if (catalogFilter === 'canonical') {
      return canonicalBeers.length > 0 ? canonicalBeers : recipes.slice(0, 4);
    }
    if (catalogFilter === 'montana') {
      return recipes.filter(r => r.name.includes('Montana'));
    }
    if (catalogFilter === 'tempestad') {
      return recipes.filter(r => r.name.includes('Tempestad'));
    }
    if (catalogFilter === 'niebla') {
      return recipes.filter(r => r.name.includes('Niebla'));
    }
    if (catalogFilter === 'cumbre') {
      return recipes.filter(r => r.name.includes('Cumbre'));
    }
    return recipes;
  }, [recipes, catalogFilter, canonicalBeers]);

  const tabs = [
    { id: 'manifesto', label: 'Manifiesto & Pilares', icon: '📜' },
    { id: 'philosophy', label: 'Misión, Visión & Valores', icon: '🏛️' },
    { id: 'craftsmanship', label: 'Arte de la Elaboración', icon: '⚗️' },
    { id: 'catalog', label: 'Las 4 Cervezas NORTA', icon: '🍺' },
    { id: 'palette', label: 'Sistema Cromático', icon: '🎨' },
    { id: 'typography', label: 'Sistema Tipográfico', icon: '✒️' },
    { id: 'audience', label: 'Momentos & Audiencia', icon: '🧭' },
    { id: 'packaging', label: 'Empaque & Galería', icon: '🏺' },
    { id: 'decalogo', label: 'Decálogo de Calidad', icon: '⚖️' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. HERO BANNER EDITORIAL DE LUJO */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e2334] via-[#1a1714] to-[#4d3720] border-2 border-[#b89764]/40 shadow-2xl p-8 md:p-10 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#b89764]/20 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#b89764]/20 text-[#c9b38f] border border-[#b89764]/40">
                Manual Oficial de Identidad • Brand Book Digital
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#98d4c9]/20 text-[#98d4c9] border border-[#98d4c9]/40 font-bold">
                Fuerza Ancestral del Norte
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#3a452d]/60 text-emerald-300 border border-[#3a452d]">
                4 Variedades Canónicas
              </span>
            </div>
            <div>
              <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-[#f7f4ed] leading-tight">
                CERVECERÍA <span className="text-[#b89764]">NORTA</span>
              </h1>
              <p className="font-baskerville italic text-lg md:text-2xl text-[#c9b38f] mt-2 font-medium">
                "{brand.manifesto || 'Fuerza silenciosa • Calma con carácter • Aventura interior'}"
              </p>
            </div>
            <p className="font-lato text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              {brand.manifestoLong || 'Forjada en la meseta de la Sabana Norte, Cervecería NORTA nace de una devoción austera por la pureza del oficio. Nuestras cervezas dialogan con el frío andino, los cereales seleccionados y la precisión metrológica para despertar el espíritu de aventura interior.'}
            </p>
            {/* 4 Credenciales de Prestigio */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">🏔️</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">100% Agua Sabana</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Decreto 2115</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">⏱️</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">21-45 Días Guarda</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Cero Aceleradores</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">🍺</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">4 Variedades Canónicas</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Montana • Tempestad • Niebla • Cumbre</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">🛡️</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">11 Carpetas BPM</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Habilitación INVIMA</p>
              </div>
            </div>
          </div>
          {/* Emblema Circular */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl bg-[#1d1d1b] border-2 border-[#b89764] shadow-2xl p-4 flex items-center justify-center group transform transition duration-500 hover:scale-105">
              <div className="absolute inset-2 border border-[#b89764]/40 rounded-xl pointer-events-none"></div>
              <img
                src="./assets/logo_norta_principal.png"
                alt="Emblema Oficial Cervecería NORTA"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <span className="font-cinzel text-[11px] font-bold text-[#c9b38f] tracking-widest uppercase mt-3 text-center">
              Emblema Heráldico Registrado
            </span>
          </div>
        </div>

        {/* Barra de Pestañas del Brand Book */}
        <div className="mt-8 pt-6 border-t border-[#b89764]/30 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#b89764] text-[#1d1d1b] shadow-lg shadow-[#b89764]/20 scale-105'
                    : 'bg-[#1d1d1b]/70 text-slate-200 hover:bg-[#b89764]/20 hover:text-[#c9b38f] border border-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-cinzel tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FEEDBACK DE COLOR COPIADO */}
      {copiedHex && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#b89764] text-[#1d1d1b] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/40 animate-bounce">
          <span className="text-lg">✨</span>
          <span className="font-mono-brew text-xs">Código {copiedHex} copiado al portapapeles</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 1: MANIFIESTO & PILARES RECTORES */}
      {/* ==================================================================== */}
      {activeTab === 'manifesto' && (
        <div className="space-y-8 animate-fadeIn">
          {/* PLIEGO FUNDACIONAL: EL ESPÍRITU DEL NORTE */}
          {/* BANNER LUXURY: EL ESPÍRITU DEL NORTE (ARMONIZADO CON LA IDENTIDAD OFICIAL NORTA) */}
          <div className="rounded-3xl overflow-hidden border-2 border-[#b89764]/50 shadow-2xl bg-gradient-to-br from-[#0e2334] via-[#102436] to-[#0a1824] text-[#f7f4ed] relative group ring-1 ring-[#b89764]/20">
            {/* Resplandor áureo sutil de fondo */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#b89764]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 relative z-10">
              <div className="space-y-5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#b89764] text-[#1d1d1b] shadow-sm">
                    Filosofía Fundacional • Arquetipo Canónico
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-white/10 text-[#c9b38f] border border-[#b89764]/30">
                    Tradiciones Nórdicas Milenarias
                  </span>
                </div>

                <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-[#f7f4ed] tracking-tight drop-shadow-md">
                  El Espíritu del Norte
                </h2>

                <div className="font-lato text-slate-200 space-y-3.5 text-sm md:text-base leading-relaxed">
                  <p>
                    NORTA nace de la fuerza ancestral del norte, ese punto cardinal que representa más que una dirección: simboliza <strong className="text-[#b89764] font-bold">propósito, equilibrio y resiliencia</strong>. Como el viento frío que guía a los navegantes, nuestra cerveza rinde homenaje a quienes enfrentan la adversidad con firmeza y se reinventan sin perder su rumbo.
                  </p>
                  <p className="text-slate-300">
                    Inspirada en tradiciones nórdicas milenarias, cada botella cuenta una historia de autenticidad y carácter. Para quienes aprecian lo genuino, lo elaborado con dedicación y lo que trasciende el simple sabor.
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-2 rounded-xl bg-white/10 border border-[#b89764]/30 text-xs font-mono-brew font-bold text-[#f7f4ed] shadow-sm hover:border-[#b89764] transition">
                    🧭 Propósito
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-white/10 border border-[#b89764]/30 text-xs font-mono-brew font-bold text-[#f7f4ed] shadow-sm hover:border-[#b89764] transition">
                    ⚖️ Equilibrio
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-white/10 border border-[#b89764]/30 text-xs font-mono-brew font-bold text-[#f7f4ed] shadow-sm hover:border-[#b89764] transition">
                    🛡️ Resiliencia
                  </span>
                  <span className="px-3.5 py-2 rounded-xl bg-[#b89764] text-[#1d1d1b] text-xs font-mono-brew font-bold shadow-md hover:bg-[#c9a673] transition">
                    ✨ Luces del Norte & Sabana
                  </span>
                </div>
              </div>

              {/* FOTOGRAFÍA ARTÍSTICA FINE-ART DE AURORAS Y CORDILLERA */}
              <div
                className="shrink-0 w-full lg:w-[460px] rounded-2xl overflow-hidden border-2 border-[#b89764]/40 hover:border-[#b89764] shadow-2xl group relative cursor-pointer bg-[#0e2334] ring-1 ring-[#b89764]/20 transition-all duration-500"
                onClick={() => setLightboxImage({ url: './assets/aurora_montana_norta.png', title: 'El Espíritu del Norte', subtitle: 'Fotografía fine-art de cumbres nevadas y aurora boreal • Colección NORTA Luxury' })}
                title="Clic para ver pliego completo en alta resolución"
              >
                <img
                  src="./assets/aurora_montana_norta.png"
                  alt="El Espíritu del Norte - Fotografía Fine-Art de Auroras y Cordillera"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2334]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
                  <span className="text-white text-xs font-mono-brew font-bold flex items-center gap-1.5">
                    🔍 Ver arte en alta resolución
                  </span>
                  <span className="text-[#b89764] text-xs font-cinzel font-bold">
                    NORTA LUXURY
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pliego Editorial del Manifiesto */}
          <div className="papiro-card p-8 md:p-12 relative overflow-hidden border border-[#b89764]/40 shadow-xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2 border-b border-[#4d3720]/20 pb-6">
                <span className="text-xs font-mono-brew font-bold tracking-widest text-[#4d3720] uppercase">
                  Declaración de Principios • Manifiesto 2026
                </span>
                <h2 className="font-cinzel text-2xl md:text-4xl font-extrabold text-[#0e2334]">
                  La Alquimia del Frío y la Paciencia
                </h2>
                <p className="font-baskerville italic text-[#4d3720] text-sm md:text-base">
                  Por el Maestro Cervecero {data.info.headBrewer}
                </p>
              </div>

              <div className="font-baskerville text-slate-800 space-y-4 text-base md:text-lg leading-relaxed text-justify">
                <p>
                  <span className="float-left text-5xl md:text-6xl font-cinzel font-bold text-[#b89764] pr-3 leading-none">
                    E
                  </span>
                  n la inmensidad de la meseta del norte, donde los vientos fríos descienden desde los páramos andinos, aprendimos que el tiempo no es un enemigo a vencer sino un ingrediente que se añade gota a gota. Cervecería NORTA fue fundada bajo el principio de que la grandeza reside en la calma: en la quietud de los tanques de guarda, en la fermentación que no se apresura y en la nobleza inalterable del agua cristalina de manantial.
                </p>
                <p>
                  Nuestra brújula no apunta hacia las modas efímeras del mercado. Apunta hacia la autenticidad radical de los cereales seleccionados, el aroma fragante de lúpulos cosechados con devoción y la densidad de una espuma que resiste el paso de los minutos. Cada botella que sale de nuestra planta es una obra viva de ingeniería sensorial y respeto a la tradición milenaria.
                </p>
              </div>

              <div className="pt-6 border-t border-[#4d3720]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-brew text-[#4d3720]">
                <span>Planta Sabana Norte • NIT: {data.info.nit}</span>
                <span className="font-bold text-[#0e2334]">Certificación de Inocuidad & Buenas Prácticas de Manufactura</span>
              </div>
            </div>
          </div>

          {/* Grid de los 6 Pilares Rectores */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                  Los 6 Pilares Conceptuales de NORTA
                </h3>
                <p className="text-xs text-[#4d3720] font-lato">
                  Dimensiones filosóficas que rigen nuestras formulaciones, diseño y cultura de bodega.
                </p>
              </div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                6 Dimensiones Canónicas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="group relative overflow-hidden rounded-2xl bg-[#1d1d1b] border border-[#b89764]/30 shadow-lg hover:border-[#b89764] transition-all duration-300 flex flex-col justify-between min-h-[320px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-35"
                    style={{ backgroundImage: `url('${p.image || './assets/brand_moodboard.jpg'}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b] via-[#1d1d1b]/80 to-transparent"></div>

                  <div className="relative z-10 p-6 flex justify-between items-start">
                    <span className="font-mono-brew text-xs font-bold px-2.5 py-1 rounded bg-[#0e2334]/80 text-[#c9b38f] border border-[#b89764]/40">
                      0{idx + 1}
                    </span>
                    <button
                      onClick={() => setLightboxImage({ url: p.image, title: p.title, subtitle: p.subtitle })}
                      className="text-slate-300 hover:text-white bg-black/40 hover:bg-black/80 rounded-full p-2 text-xs transition"
                      title="Ver fotografía en alta resolución"
                    >
                      🔍
                    </button>
                  </div>

                  <div className="relative z-10 p-6 space-y-2">
                    <p className="text-[11px] font-mono-brew font-bold tracking-widest text-[#b89764] uppercase">
                      {p.subtitle || 'Pilar de Identidad'}
                    </p>
                    <h4 className="font-cinzel text-xl font-bold text-white group-hover:text-[#c9b38f] transition-colors">
                      {p.title}
                    </h4>
                    <p className="font-lato text-xs text-slate-300 leading-relaxed">
                      {p.concept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: FILOSOFÍA CORPORATIVA (MISIÓN, VISIÓN & 4 VALORES GAMMA) */}
      {/* ==================================================================== */}
      {activeTab === 'philosophy' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header de Filosofía */}
          <div className="papiro-card p-8 md:p-10 border-2 border-[#b89764]/40 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#4d3720]/20">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                    Fundamentos Estratégicos & Identidad Corporativa
                  </span>
                  <span className="text-xs font-mono-brew text-[#4d3720] font-bold">
                    NORTA 2026
                  </span>
                </div>
                <h2 className="font-cinzel text-2xl md:text-4xl font-extrabold text-[#0e2334]">
                  Nuestra Visión, Misión & Valores Canónicos
                </h2>
                <p className="font-baskerville italic text-[#4d3720] text-sm md:text-base">
                  Construcción armónica entre la identidad oficial NORTA y los fundamentos estratégicos del Ing. Julio Roberto Cristancho B.
                </p>
              </div>

              <div className="shrink-0 bg-[#eee7da] border border-[#4d3720]/20 rounded-2xl p-4 text-center">
                <span className="text-xs font-mono-brew font-bold text-[#0e2334] block uppercase">
                  Brújula de Liderazgo
                </span>
                <p className="font-cinzel text-sm font-bold text-[#b89764] mt-1">
                  Resiliencia • Autenticidad • Excelencia • Propósito
                </p>
              </div>
            </div>

            {/* DÚO MISIÓN & VISIÓN CANÓNICAS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
              {/* VISIÓN */}
              <div className="rounded-2xl bg-[#fdfbf7] border-2 border-[#0e2334]/30 p-6 md:p-8 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#0e2334] text-[#f7f4ed]">
                      Visión Oficial NORTA • El Futuro
                    </span>
                    <span className="text-xs font-mono-brew text-[#4d3720] font-bold">
                      ¿Qué aspira ser NORTA?
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0e2334]/5 border-l-4 border-[#0e2334] space-y-2">
                    <p className="font-mono-brew text-[10px] font-bold uppercase text-[#0e2334]">
                      Declaración de Visión Oficial:
                    </p>
                    <p className="font-baskerville text-lg md:text-xl italic font-bold text-[#0e2334] leading-snug">
                      "Ser la marca referente de cerveza artesanal reconocida por su carácter y elegancia. Trascender el sabor para convertirnos en una experiencia selecta, elegida por quienes valoran la autenticidad y el arte de lo bien hecho."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#4d3720]/15 space-y-1">
                    <span className="font-mono-brew text-[10px] font-bold uppercase text-[#4d3720] block">
                      Dimensión Socio-Cultural (Por Julio Roberto Cristancho):
                    </span>
                    <p className="font-lato text-xs text-slate-700 italic">
                      "Reivindicar la autenticidad de la cerveza artesanal como expresión socio-cultural, catalizadora de momentos únicos, donde la amistad y la autenticidad son protagonistas."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-lato">
                    <div className="bg-[#eee7da] p-2.5 rounded-lg border border-[#4d3720]/15">
                      <strong className="text-[#0e2334] block font-mono-brew">Clientes:</strong>
                      Innovación, diferenciación y calidad accesible.
                    </div>
                    <div className="bg-[#eee7da] p-2.5 rounded-lg border border-[#4d3720]/15">
                      <strong className="text-[#0e2334] block font-mono-brew">Sociedad:</strong>
                      Símbolo de amistad y cultura de encuentro.
                    </div>
                    <div className="bg-[#eee7da] p-2.5 rounded-lg border border-[#4d3720]/15">
                      <strong className="text-[#0e2334] block font-mono-brew">Equipo:</strong>
                      Proyecto de vida: hacer lo que nos gusta con maestría.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#4d3720]/15 flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                  <span>Horizonte: Excelencia & Trascendencia</span>
                  <span className="font-bold text-[#0e2334]">Marca Referente</span>
                </div>
              </div>

              {/* MISIÓN */}
              <div className="rounded-2xl bg-[#fdfbf7] border-2 border-[#b89764]/40 p-6 md:p-8 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#b89764] text-[#1d1d1b]">
                      Misión Oficial NORTA • El Presente
                    </span>
                    <span className="text-xs font-mono-brew text-[#4d3720] font-bold">
                      ¿Por qué existe NORTA y qué hace?
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#b89764]/10 border-l-4 border-[#b89764] space-y-2">
                    <p className="font-mono-brew text-[10px] font-bold uppercase text-[#4d3720]">
                      Declaración de Misión Oficial:
                    </p>
                    <p className="font-baskerville text-lg md:text-xl italic font-bold text-[#0e2334] leading-snug">
                      "Crear cervezas con identidad, elaboradas con pasión y respeto por procesos auténticos. Inspiramos a quienes valoran el esfuerzo y la dirección en la vida, ofreciendo una experiencia sensorial que celebra la fuerza del norte."
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#4d3720]/15 space-y-1">
                    <span className="font-mono-brew text-[10px] font-bold uppercase text-[#4d3720] block">
                      El Puente de la Amistad (Por Julio Roberto Cristancho):
                    </span>
                    <p className="font-lato text-xs text-slate-700 italic">
                      "Creamos experiencias y momentos memorables donde una cerveza artesanal se convierte en el puente para valorar el verdadero significado de la amistad."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-lato">
                    <div className="bg-[#eee7da] p-2.5 rounded-lg border border-[#4d3720]/15">
                      <strong className="text-[#0e2334] block font-mono-brew">Propósito:</strong>
                      Momentos memorables en torno a cerveza auténtica.
                    </div>
                    <div className="bg-[#eee7da] p-2.5 rounded-lg border border-[#4d3720]/15">
                      <strong className="text-[#0e2334] block font-mono-brew">Oferta de Valor:</strong>
                      Calidad superior, rigor sensorial y fácil acceso.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#4d3720]/15 flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                  <span>Dirección: Pasión & Identidad Pura</span>
                  <span className="font-bold text-[#b89764]">Fuerza del Norte</span>
                </div>
              </div>
            </div>
          </div>

          {/* LOS 4 VALORES CANÓNICOS DE NORTA (GAMMA SITE OFICIAL) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Columnas Maestras</span>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334] mt-1">
                  Nuestros 4 Valores Canónicos
                </h3>
                <p className="text-xs text-[#4d3720] font-lato">
                  Los principios fundamentales que rigen cada lote producido en Cervecería NORTA.
                </p>
              </div>
              <span className="text-xs font-mono-brew text-[#4d3720] font-bold">
                Identidad y Carácter Innegociable
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Resiliencia",
                  desc: "Como el norte que permanece firme ante cualquier tormenta, nuestras cervezas representan la fortaleza de quienes se reinventan y perseveran. Cada botella es un tributo a la capacidad de levantarse.",
                  icon: "🛡️",
                  accent: "#0e2334",
                  badge: "Firmeza ante la Tormenta"
                },
                {
                  name: "Autenticidad",
                  desc: "Elaboramos cada cerveza respetando procesos ancestrales y técnicas artesanales. Sin atajos, sin artificios. Solo ingredientes naturales y dedicación absoluta al arte cervecero tradicional.",
                  icon: "🌲",
                  accent: "#3a452d",
                  badge: "Sin Atajos • Procesos Ancestrales"
                },
                {
                  name: "Excelencia",
                  desc: "La perfección está en los detalles. Desde la selección de maltas hasta el diseño de cada etiqueta, buscamos la máxima calidad en cada aspecto de NORTA. Lo bien hecho es nuestra firma.",
                  icon: "✨",
                  accent: "#b89764",
                  badge: "Lo Bien Hecho es Nuestra Firma"
                },
                {
                  name: "Propósito",
                  desc: "Más que una cerveza, somos una filosofía de vida. Para quienes tienen claro su rumbo, valoran las experiencias exclusivas y celebran cada momento con carácter e intención.",
                  icon: "🧭",
                  accent: "#4d3720",
                  badge: "Rumbo Claro • Filosofía de Vida"
                }
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="papiro-card p-6 border-t-4 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4"
                  style={{ borderTopColor: val.accent }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl p-2.5 rounded-xl bg-[#eee7da] shadow-sm">{val.icon}</span>
                      <span className="text-[10px] font-mono-brew font-bold px-2 py-0.5 rounded bg-white border border-[#4d3720]/15 text-[#0e2334]">
                        0{idx + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xl font-bold text-[#0e2334]">{val.name}</h4>
                      <span className="text-[10.5px] font-mono-brew font-bold text-[#b89764] block mt-0.5 uppercase tracking-wider">
                        {val.badge}
                      </span>
                    </div>
                    <p className="font-lato text-xs text-slate-700 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#4d3720]/15 text-[10px] font-mono-brew text-[#4d3720]">
                    Pilar Cultural Canónico NORTA
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRINCIPIOS RECTORES Y VALORES DE EQUIPO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="papiro-card p-6 md:p-8 border border-[#0e2334]/30 shadow-lg space-y-5">
              <div className="border-b border-[#4d3720]/15 pb-4">
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Ética Organizacional</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0e2334] mt-1">
                  Principios Rectores de Decisión
                </h3>
                <p className="font-lato text-xs text-slate-600 mt-1">
                  Reglas universales que orientan nuestras acciones éticas y técnicas cotidianas.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Integridad", desc: "Coherencia innegociable entre lo que pensamos, decimos y hacemos en planta y mercado.", icon: "⚖️" },
                  { name: "Responsabilidad", desc: "Asumimos conscientemente las consecuencias de nuestras decisiones de formulación y gestión.", icon: "🛡️" },
                  { name: "Respeto", desc: "Reconocemos la dignidad de cada persona: socio, colaborador, cliente y proveedor.", icon: "🤝" },
                  { name: "Colaboración", desc: "Trabajamos en conjunto para lograr nuestros objetivos colectivos y potenciar a Norta.", icon: "🌱" }
                ].map((principle, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#4d3720]/15 shadow-sm flex items-start gap-3.5">
                    <span className="text-xl shrink-0 p-2 rounded-lg bg-[#eee7da]">{principle.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="font-cinzel text-sm font-bold text-[#0e2334]">{principle.name}</h4>
                      <p className="font-lato text-xs text-slate-700 leading-relaxed">{principle.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="papiro-card p-6 md:p-8 border border-[#b89764]/40 shadow-lg space-y-5">
              <div className="border-b border-[#4d3720]/15 pb-4">
                <span className="spec-badge bg-[#b89764] text-[#1d1d1b]">Cultura & Equipo</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0e2334] mt-1">
                  Valores del Equipo Operativo
                </h3>
                <p className="font-lato text-xs text-slate-600 mt-1">
                  Cualidades y comportamientos compartidos en la sala de cocción y administración.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Innovación", desc: "En Norta creamos soluciones nuevas, relevantes y sostenibles para nuestro producto y trabajo diario.", icon: "💡" },
                  { name: "Empatía", desc: "Conectamos con las personas con escucha activa, sensibilidad relacional y toma de decisiones conscientes.", icon: "❤️" },
                  { name: "Compromiso", desc: "Cumplimos con las responsabilidades y objetivos con acciones confiables, consistentes y orientadas al logro colectivo.", icon: "🎯" },
                  { name: "Trabajo en Equipo", desc: "Construimos relaciones basadas en confianza y respeto mutuo, respondiendo y ayudando en las tareas que edifican a Norta.", icon: "👥" }
                ].map((val, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#4d3720]/15 shadow-sm flex items-start gap-3.5">
                    <span className="text-xl shrink-0 p-2 rounded-lg bg-[#eee7da]">{val.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="font-cinzel text-sm font-bold text-[#0e2334]">{val.name}</h4>
                      <p className="font-lato text-xs text-slate-700 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: EL ARTE DE LA ELABORACIÓN (PROCESO ANCESTRAL & TÉCNICA MODERNA) */}
      {/* ==================================================================== */}
      {activeTab === 'craftsmanship' && (
        <div className="space-y-8 animate-fadeIn">
          {/* HERO BANNER DE SALA DE COCCIÓN */}
          <div className="relative overflow-hidden rounded-2xl bg-[#1d1d1b] border-2 border-[#b89764]/40 shadow-2xl group">
            <div className="relative h-[340px] md:h-[420px] overflow-hidden">
              <img
                src="./assets/arte_elaboracion_norta.jpg"
                alt="El Arte de la Elaboración NORTA - Brewhouse"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2334] via-[#0e2334]/60 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#b89764] text-[#1d1d1b]">
                    Grain-to-Glass Rigor
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-white/20 text-[#c9b38f] backdrop-blur border border-white/20">
                    5 Fases Canónicas
                  </span>
                </div>
                <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold text-[#f7f4ed]">
                  El Arte de la Elaboración
                </h2>
                <p className="font-baskerville italic text-lg md:text-xl text-[#c9b38f]">
                  "{craftsmanship.motto || 'Proceso Ancestral, Técnica Moderna'}"
                </p>
                <p className="font-lato text-xs md:text-sm text-slate-200 max-w-3xl leading-relaxed">
                  {craftsmanship.intro || 'En NORTA fusionamos sabiduría tradicional nórdica con precisión contemporánea. Cada lote se elabora en pequeñas cantidades, supervisando personalmente cada fase del proceso. Seleccionamos maltas europeas premium, lúpulos aromáticos y levaduras especializadas. Nuestro método respeta los tiempos naturales de fermentación y maduración, sin prisas ni compromisos.'}
                </p>
              </div>

              <button
                onClick={() => setLightboxImage({ url: './assets/arte_elaboracion_norta.jpg', title: 'Sala de Cocción NORTA', subtitle: 'Proceso Ancestral, Técnica Moderna con maestros cerveceros' })}
                className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur border border-white/30 text-xs transition"
                title="Ampliar fotografía"
              >
                🔍 Ver Brewhouse HD
              </button>
            </div>
          </div>

          {/* 5 FASES CANÓNICAS DEL PROCESO */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Ruta Metrológica</span>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334] mt-1">
                  Las 5 Fases del Proceso Grain-to-Glass
                </h3>
              </div>
              <span className="text-xs font-mono-brew text-[#4d3720]">
                Supervisión Directa Lote a Lote
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {(craftsmanship.phases || [
                { num: "01", title: "Selección de Ingredientes", desc: "Maltas escandinavas, lúpulos nobles y agua pura sabana", icon: "🌾", badge: "100% Granos Nobles" },
                { num: "02", title: "Maceración Artesanal", desc: "Control preciso de temperatura e infusión escalonada", icon: "🔥", badge: "64°C - 67.5°C" },
                { num: "03", title: "Fermentación Natural", desc: "Levaduras seleccionadas en frío, proceso lento", icon: "🫧", badge: "Cinética Lenta" },
                { num: "04", title: "Maduración Paciente", desc: "Guarda prolongada de 21 a 45 días a 0°C", icon: "❄️", badge: "21 a 45 Días" },
                { num: "05", title: "Embotellado Selectivo", desc: "Envasado isobárico con purga de CO2 estéril", icon: "🏺", badge: "Control Lote x Lote" }
              ]).map((phase, idx) => (
                <div
                  key={idx}
                  className="papiro-card p-5 border-t-4 border-t-[#0e2334] shadow hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-brew text-xs font-extrabold px-2 py-0.5 rounded bg-[#0e2334] text-[#c9b38f]">
                        {phase.num}
                      </span>
                      <span className="text-2xl">{phase.icon}</span>
                    </div>
                    <h4 className="font-cinzel text-sm font-bold text-[#0e2334] leading-snug">
                      {phase.title}
                    </h4>
                    <p className="font-lato text-xs text-slate-700 leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#4d3720]/15 space-y-1">
                    <span className="px-2 py-0.5 rounded bg-[#eee7da] text-[10px] font-mono-brew font-bold text-[#4d3720] block text-center">
                      {phase.badge || 'Paso Canónico'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGOR METROLÓGICO E INOCUIDAD INVIMA */}
          <div className="brew-card p-8 bg-gradient-to-r from-[#0e2334] via-[#1a1714] to-[#4d3720] text-white border-2 border-[#b89764]/60 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
                Metrología & Cumplimiento Sanitario
              </span>
              <h4 className="font-cinzel text-2xl font-bold text-[#c9b38f]">
                Garantía Sanitaria Decreto 1686 & Res. 2674
              </h4>
              <p className="font-lato text-xs md:text-sm text-slate-200 leading-relaxed">
                El arte cervecero tradicional no riñe con la metrología científica. En Cervecería NORTA mantenemos un estricto control de laboratorio sobre cada variable: curvas de pH, turbiedad NTU, cloro libre en agua (&lt;0.1 ppm post-filtración), viabilidad celular de levadura y control de oxígeno disuelto en envasado.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono-brew border border-white/20">💧 Agua Decreto 2115</span>
                <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono-brew border border-white/20">🔬 Laboratorio Físico-Químico</span>
                <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono-brew border border-white/20">🏷️ Trazabilidad Total</span>
              </div>
            </div>

            <div className="bg-[#1d1d1b]/90 border border-[#b89764]/40 rounded-2xl p-6 text-center shrink-0 min-w-[260px] space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#0e2334] border-2 border-[#c9b38f] mx-auto flex items-center justify-center text-2xl shadow">
                📜
              </div>
              <p className="font-baskerville italic text-base font-bold text-[#c9b38f]">
                {data.info.headBrewer}
              </p>
              <p className="text-xs font-mono-brew text-slate-300">
                Maestro Cervecero Responsable
              </p>
              <p className="text-[10px] font-mono-brew text-[#b89764] uppercase font-bold pt-1">
                Sello de Calidad Aprobado
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: CATÁLOGO OFICIAL: LAS 4 CERVEZAS CANÓNICAS NORTA */}
      {/* ==================================================================== */}
      {activeTab === 'catalog' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header y Filtros */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Colección Canónica Oficial</span>
                <span className="text-xs font-mono-brew text-[#4d3720] font-bold">NORTA 2026</span>
              </div>
              <h3 className="font-cinzel text-xl md:text-3xl font-extrabold text-[#0e2334] mt-1">
                Las Cuatro Cervezas de Cervecería NORTA
              </h3>
              <p className="text-xs text-[#4d3720] font-lato max-w-2xl">
                Cada variedad captura un aspecto único del espíritu nórdico: Montana, Tempestad, Niebla y Cumbre. Cuatro estilos distintos, unidos por la misma búsqueda de excelencia y autenticidad ancestral.
              </p>
            </div>

            {/* Filtros de las 4 cervezas */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCatalogFilter('canonical')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'canonical'
                    ? 'bg-[#0e2334] text-white shadow ring-2 ring-[#b89764]'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                ⭐ Las 4 Canónicas
              </button>
              <button
                onClick={() => setCatalogFilter('montana')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'montana'
                    ? 'bg-[#0e2334] text-white shadow ring-2 ring-[#b89764]'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                🏔️ Montana (4.8%)
              </button>
              <button
                onClick={() => setCatalogFilter('tempestad')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'tempestad'
                    ? 'bg-[#0e2334] text-white shadow ring-2 ring-[#b89764]'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                ⚡ Tempestad (5.5%)
              </button>
              <button
                onClick={() => setCatalogFilter('niebla')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'niebla'
                    ? 'bg-[#0e2334] text-white shadow ring-2 ring-[#b89764]'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                🌫️ Niebla (6.2%)
              </button>
              <button
                onClick={() => setCatalogFilter('cumbre')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'cumbre'
                    ? 'bg-[#b89764] text-[#1d1d1b] shadow ring-2 ring-[#0e2334]'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                👑 Cumbre (6.8% Insignia)
              </button>
              <button
                onClick={() => setCatalogFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'all'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                📦 Bodega Completa
              </button>
            </div>
          </div>

          {/* GRID DE LAS CERVEZAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredBeers.map((beer) => {
              const liquid = beer.liquidColor || '#c4591f';
              const isCumbre = beer.name.includes('Cumbre');
              return (
                <div
                  key={beer.id}
                  className={`papiro-card border-2 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                    isCumbre ? 'border-[#b89764] ring-2 ring-[#b89764]/30' : 'border-[#b89764]/40 hover:border-[#b89764]'
                  }`}
                >
                  {/* FOTOGRAFÍA GENERADA EXCLUSIVA A SANGRE */}
                  <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[#1d1d1b]">
                    <img
                      src={beer.image || './assets/beers.jpg'}
                      alt={beer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b] via-[#1d1d1b]/20 to-transparent"></div>

                    {/* Insignias Superiores */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="spec-badge bg-[#0e2334]/90 text-[#c9b38f] backdrop-blur border border-[#b89764]/40 font-mono-brew font-bold">
                        {beer.id}
                      </span>
                      {isCumbre && (
                        <span className="px-3 py-1 rounded-full bg-[#b89764] text-[#1d1d1b] text-xs font-cinzel font-bold shadow-lg flex items-center gap-1.5">
                          👑 LA INSIGNIA NORTA
                        </span>
                      )}
                      <button
                        onClick={() => setLightboxImage({ url: beer.image || './assets/beers.jpg', title: beer.name, subtitle: `${beer.style} • ${beer.abv}% ABV • ${beer.ibu} IBU` })}
                        className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur border border-white/30 text-xs transition"
                        title="Ver fotografía en alta resolución"
                      >
                        🔍
                      </button>
                    </div>

                    {/* Título sobre fotografía */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h4 className="font-cinzel text-2xl md:text-3xl font-extrabold text-[#f7f4ed] drop-shadow-md">
                          {beer.name}
                        </h4>
                        <p className="font-baskerville italic text-xs md:text-sm text-[#c9b38f] drop-shadow">
                          {beer.style}
                        </p>
                      </div>
                      <span className="text-xl font-mono-brew font-extrabold text-[#b89764] bg-[#0e2334]/80 px-3 py-1 rounded-xl border border-[#b89764]/40">
                        {beer.abv}% ABV
                      </span>
                    </div>
                  </div>

                  {/* CUERPO TÉCNICO & DESCRIPCIÓN POÉTICA */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    {/* Parámetros Metrológicos */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-[#eee7da] rounded-xl p-2 border border-[#4d3720]/15">
                        <span className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Graduación</span>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.abv}% ABV</p>
                      </div>
                      <div className="bg-[#eee7da] rounded-xl p-2 border border-[#4d3720]/15">
                        <span className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Amargor IBU</span>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.ibu} IBU</p>
                      </div>
                      <div className="bg-[#eee7da] rounded-xl p-2 border border-[#4d3720]/15 flex flex-col items-center justify-center">
                        <span className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Color SRM</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-sm" style={{ backgroundColor: liquid }}></div>
                          <span className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.srmColor} SRM</span>
                        </div>
                      </div>
                    </div>

                    {/* Esencia y Narrativa Oficial de Gamma */}
                    <div className="p-4 rounded-xl bg-[#eee7da]/60 border-l-4 border-[#b89764] space-y-1">
                      <span className="font-mono-brew text-[9px] font-bold uppercase text-[#4d3720] block">
                        Carácter & Arquetipo Canónico:
                      </span>
                      <p className="font-lato text-xs text-slate-800 leading-relaxed italic">
                        "{beer.essence || beer.sensoryDescription}"
                      </p>
                    </div>

                    {/* Barras de Intensidad Malta / Lúpulo */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Intensidad de Malta Noble</span>
                        <span className="font-bold">{beer.intensity ? beer.intensity.malt : 7}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b89764] to-[#4d3720]"
                          style={{ width: `${((beer.intensity ? beer.intensity.malt : 7) / 10) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Amargor & Carácter de Lúpulo</span>
                        <span className="font-bold">{beer.intensity ? beer.intensity.hops : 6}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3a452d] to-[#0e2334]"
                          style={{ width: `${((beer.intensity ? beer.intensity.hops : 6) / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tags Sensoriales */}
                    <div className="flex flex-wrap gap-1.5">
                      {(beer.sensoryTags || ['Artesanal', 'Nórdica']).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono-brew px-2.5 py-0.5 rounded-full bg-[#0e2334]/10 text-[#0e2334] font-semibold border border-[#0e2334]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Ficha Sommelier */}
                    <div className="pt-2 border-t border-[#4d3720]/15 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Temperatura:</span>
                        <span className="font-mono-brew font-bold text-[#0e2334]">{beer.servingTemp || '6°C - 8°C'}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Cristalería:</span>
                        <span className="font-lato truncate max-w-[200px]">{beer.glassware || 'Copa Teku NORTA'}</span>
                      </div>
                      <div className="text-slate-600 pt-1">
                        <span className="font-bold text-[#4d3720] block">Maridaje Sommelier:</span>
                        <p className="text-[11px] text-slate-700 italic leading-snug mt-0.5">
                          {beer.pairing || 'Gastronomía de autor y platos de autor y cordillera.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón Ver Ficha Sommelier Completa */}
                  <div className="p-4 bg-[#f2ebd9] border-t border-[#4d3720]/20">
                    <button
                      onClick={() => setSelectedBeerModal(beer)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0e2334] hover:bg-[#b89764] text-white hover:text-[#1d1d1b] font-cinzel text-xs font-bold tracking-wider transition-all duration-300 shadow flex items-center justify-center gap-2"
                    >
                      <span>📜</span>
                      <span>Ficha Sommelier & Receta Maestra</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 5: SISTEMA CROMÁTICO OFICIAL INTERACTIVO */}
      {/* ==================================================================== */}
      {activeTab === 'palette' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Rigor Cromático</span>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334] mt-1">
                Sistema Cromático Canónico NORTA
              </h3>
              <p className="text-xs text-[#4d3720] font-lato">
                Paleta regulada para interfaces digitales, etiquetas de empaque, rotulación de bodega y cristalería.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-brew text-[#4d3720]">Haz clic en cualquier tarjeta para copiar HEX</span>
            </div>
          </div>

          {/* Grid de Tarjetas de Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((c, i) => {
              const isDark = c.hex === '#0e2334' || c.hex === '#4d3720' || c.hex === '#3a452d' || c.hex === '#1d1d1b';
              return (
                <div
                  key={i}
                  className="papiro-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#b89764]/30 flex flex-col"
                >
                  <div
                    className="h-36 w-full relative flex items-end justify-between p-4 cursor-pointer group transition-transform"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleCopyColor(c.hex, c.name)}
                    title="Clic para copiar código HEX"
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <span className="text-xs font-mono-brew px-3 py-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur font-bold">
                        📋 Copiar {c.hex}
                      </span>
                    </div>
                    <span className={`text-xs font-mono-brew font-extrabold px-2.5 py-1 rounded shadow-sm ${isDark ? 'bg-white/90 text-[#1d1d1b]' : 'bg-black/80 text-white'}`}>
                      {c.hex}
                    </span>
                    <span className={`text-[10px] font-mono-brew uppercase tracking-wider font-bold ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                      {c.pantone || 'Pantone Std'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                          {c.name}
                        </h4>
                        <button
                          onClick={() => handleCopyColor(c.hex, c.name)}
                          className="text-[11px] font-mono-brew text-[#b89764] hover:text-[#4d3720] font-bold"
                        >
                          Copiar
                        </button>
                      </div>
                      <p className="text-[11px] font-mono-brew text-slate-500 mt-0.5">
                        RGB: {c.rgb || 'rgb(---)'} • Pantone: {c.pantone || '---'}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-[#4d3720] block text-[11px] uppercase tracking-wider">
                          Uso Oficial:
                        </span>
                        <p className="text-slate-700 font-lato leading-relaxed mt-0.5">
                          {c.usage}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-[#0e2334] block text-[11px] uppercase tracking-wider">
                          Simbolismo & Alma:
                        </span>
                        <p className="text-slate-600 font-baskerville italic text-[11.5px] leading-relaxed mt-0.5">
                          "{c.symbolism}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Laboratorio de Contraste y Accesibilidad WCAG */}
          <div className="brew-card p-6 md:p-8 bg-[#fdfbf7] border-2 border-[#b89764]/30 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4d3720]/20">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Laboratorio Tipográfico</span>
                <h4 className="font-cinzel text-lg font-bold text-[#0e2334] mt-1">
                  Simulador de Contraste & Legibilidad Editorial
                </h4>
              </div>
              <p className="text-xs text-[#4d3720] font-lato max-w-md">
                Prueba cómo interactúan los colores de la paleta oficial para títulos y textos en packaging e interfaces.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4d3720] font-mono-brew uppercase mb-2">
                    Color de Fondo (Background):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setContrastBg(col.hex)}
                        className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                          contrastBg === col.hex ? 'border-[#b89764] scale-110 shadow-md ring-2 ring-[#b89764]/40' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      >
                        {contrastBg === col.hex && <span className="text-white text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4d3720] font-mono-brew uppercase mb-2">
                    Color de Texto (Foreground):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setContrastFg(col.hex)}
                        className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                          contrastFg === col.hex ? 'border-[#0e2334] scale-110 shadow-md ring-2 ring-[#0e2334]/40' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      >
                        {contrastFg === col.hex && <span className="text-white text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="lg:col-span-7 p-6 rounded-2xl border transition-all duration-300 shadow-inner space-y-3"
                style={{ backgroundColor: contrastBg, borderColor: '#b89764' }}
              >
                <div className="flex items-center justify-between border-b pb-2 opacity-75" style={{ borderColor: contrastFg }}>
                  <span className="font-mono-brew text-[10px] uppercase font-bold" style={{ color: contrastFg }}>
                    BG: {contrastBg} | FG: {contrastFg}
                  </span>
                  <span className="font-mono-brew text-[10px] px-2 py-0.5 rounded font-bold" style={{ backgroundColor: contrastFg, color: contrastBg }}>
                    WCAG Preview
                  </span>
                </div>
                <h5 className="font-cinzel text-xl font-bold tracking-wide" style={{ color: contrastFg }}>
                  CERVECERÍA NORTA • LAS 4 CANÓNICAS
                </h5>
                <p className="font-baskerville italic text-sm" style={{ color: contrastFg }}>
                  "Montana • Tempestad • Niebla • Cumbre"
                </p>
                <p className="font-lato text-xs leading-relaxed opacity-90" style={{ color: contrastFg }}>
                  La maduración prolongada en frío templa la cerveza como el viento de páramo esculpe la roca andina. Maceración infusional a 66°C con maltas de cebada y agua mineralizada pura.
                </p>
                <p className="font-mono-brew text-[11px] font-bold" style={{ color: contrastFg }}>
                  ABV: 6.8% | IBU: 36 | SRM: 9 | LOTE: CUMBRE-2026-001
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 6: SISTEMA TIPOGRÁFICO EDITORIAL & JERARQUÍAS */}
      {/* ==================================================================== */}
      {activeTab === 'typography' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Sistema Tipográfico de Marca & Concepto Editorial
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Cuatro familias tipográficas armonizadas para conferir autoridad monumental, cadencia literaria, precisión analítica y rigor metrológico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typographySpec.map((t, idx) => (
              <div
                key={idx}
                className="papiro-card p-6 md:p-8 border border-[#b89764]/30 shadow-lg space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                      0{idx + 1} • Tipografía Oficial
                    </span>
                    <span className="text-[11px] font-mono-brew text-slate-500 font-bold">
                      {t.weights}
                    </span>
                  </div>

                  <h4 className="font-cinzel text-2xl font-bold text-[#0e2334]">
                    {t.family}
                  </h4>
                  <p className="text-xs font-bold text-[#b89764] font-mono-brew uppercase">
                    Rol: {t.role}
                  </p>
                  <p className="font-lato text-xs text-slate-600 leading-relaxed">
                    {t.concept}
                  </p>
                </div>

                <div className="bg-[#f2ebd9] rounded-xl p-4 border border-[#4d3720]/15 space-y-2">
                  <p className="text-[10px] font-mono-brew font-bold text-[#4d3720] uppercase">
                    Espécimen en Vivo:
                  </p>
                  {t.family === 'Cinzel' && (
                    <div className="space-y-1 font-cinzel text-[#0e2334]">
                      <p className="text-xl font-extrabold tracking-widest">MONTANA • TEMPESTAD • NIEBLA • CUMBRE</p>
                      <p className="text-sm tracking-wider">CERVECERÍA NORTA 2026 - 0123456789</p>
                    </div>
                  )}
                  {t.family === 'Libre Baskerville' && (
                    <div className="space-y-1 font-baskerville text-[#4d3720]">
                      <p className="text-base italic font-bold">"Fuerza silenciosa • Calma con carácter • Aventura interior"</p>
                      <p className="text-xs italic leading-relaxed">
                        NORTA nace de la fuerza ancestral del norte, ese punto cardinal que simboliza propósito, equilibrio y resiliencia.
                      </p>
                    </div>
                  )}
                  {t.family === 'Lato' && (
                    <div className="space-y-1 font-lato text-slate-800">
                      <p className="text-sm font-bold">Panel de Control de Planta & Trazabilidad INVIMA</p>
                      <p className="text-xs leading-relaxed">
                        Control de temperaturas de fermentación, monitoreo de tanques y registros de laboratorio bajo Decreto 2115.
                      </p>
                    </div>
                  )}
                  {t.family === 'JetBrains Mono' && (
                    <div className="space-y-1 font-mono-brew text-[#0e2334] text-xs">
                      <p className="font-bold">LOTE: CUMBRE-2026-001 | OG: 1.066 | FG: 1.014 | pH: 5.15</p>
                      <p className="text-[11px] text-[#4d3720]">METROLOGÍA: 6.8% ABV • 36 IBU • 9 SRM • INVIMA OK</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 7: MOMENTOS NORTA & AUDIENCIA (PARA QUIENES VALORAN LO AUTÉNTICO) */}
      {/* ==================================================================== */}
      {activeTab === 'audience' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Target & Estilo de Vida</span>
              <h3 className="font-cinzel text-xl md:text-3xl font-extrabold text-[#0e2334] mt-1">
                Para Quienes Valoran lo Auténtico
              </h3>
              <p className="text-xs text-[#4d3720] font-lato max-w-2xl">
                NORTA no es para todos: es para quienes tienen claro su rumbo, aprecian el esfuerzo detrás de cada detalle y valoran la calidad sobre la cantidad.
              </p>
            </div>
            <span className="text-xs font-mono-brew text-[#4d3720] font-bold">
              Comunidad de Carácter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Profesionales Independientes",
                range: "Entre 25 y 50 años",
                tag: "Liderazgo & Dirección",
                desc: "Líderes con mentalidad emprendedora y carácter fuerte. Personas que inspiran y toman decisiones con convicción, que no siguen tendencias vacías sino rumbos propios.",
                icon: "🧭",
                color: "#0e2334"
              },
              {
                title: "Amantes de lo Exclusivo",
                range: "Consumo Consciente",
                tag: "Experiencia Selecta",
                desc: "Buscan experiencias selectas y productos con historia. Aprecian el esfuerzo detrás de cada detalle y valoran la calidad sobre la cantidad.",
                icon: "✨",
                color: "#b89764"
              },
              {
                title: "Conocedores del Sabor",
                range: "Paladares Educados",
                tag: "Criterio Sommelier",
                desc: "Distingue la diferencia entre lo artesanal y lo industrial. Para quienes la cerveza es un arte de paciencia y no solo una bebida de paso.",
                icon: "🍺",
                color: "#3a452d"
              }
            ].map((aud, idx) => (
              <div
                key={idx}
                className="papiro-card p-6 border-t-4 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4"
                style={{ borderTopColor: aud.color }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2.5 rounded-xl bg-[#eee7da] shadow-sm">{aud.icon}</span>
                    <span className="text-[10px] font-mono-brew font-bold px-2 py-0.5 rounded bg-[#eee7da] text-[#4d3720]">
                      {aud.range}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-[#0e2334]">{aud.title}</h4>
                    <span className="text-[10.5px] font-mono-brew font-bold text-[#b89764] block mt-0.5 uppercase tracking-wider">
                      {aud.tag}
                    </span>
                  </div>
                  <p className="font-lato text-xs text-slate-700 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#4d3720]/15 text-[10px] font-mono-brew text-[#4d3720]">
                  Conexión con el Espíritu del Norte
                </div>
              </div>
            ))}
          </div>

          {/* MOMENTOS NORTA */}
          <div className="papiro-card p-8 border-2 border-[#b89764]/40 shadow-xl space-y-6">
            <div className="border-b border-[#4d3720]/15 pb-4">
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Ocasiones de Consumo</span>
              <h3 className="font-cinzel text-xl font-bold text-[#0e2334] mt-1">
                Momentos NORTA
              </h3>
              <p className="font-lato text-xs text-slate-600 mt-0.5">
                Nuestras cervezas están diseñadas para acompañar los momentos que importan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Encuentros Memorables",
                  desc: "Comparte NORTA con quienes aprecian las conversaciones profundas y los brindis significativos. Para reuniones que trascienden.",
                  icon: "🥂",
                  quote: "Conversaciones profundas & brindis de honor"
                },
                {
                  title: "Pausas Reflexivas",
                  desc: "Momentos de introspección merecen una cerveza a la altura. NORTA te acompaña en tus instantes de claridad y templanza.",
                  icon: "🏔️",
                  quote: "Quietud, lectura y templanza interior"
                },
                {
                  title: "Experiencias Gastronómicas",
                  desc: "Maridar con quesos artesanales, carnes ahumadas o postres complejos. Cada variedad NORTA eleva tu experiencia culinaria.",
                  icon: "🍽️",
                  quote: "Maridaje sommelier de autor"
                }
              ].map((mom, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-[#4d3720]/15 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-[#eee7da]">{mom.icon}</span>
                      <h4 className="font-cinzel text-base font-bold text-[#0e2334]">{mom.title}</h4>
                    </div>
                    <p className="font-lato text-xs text-slate-700 leading-relaxed">
                      {mom.desc}
                    </p>
                  </div>
                  <p className="font-baskerville italic text-[11px] text-[#b89764] border-t border-[#4d3720]/10 pt-2 font-medium">
                    "{mom.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DISEÑO CON PROPÓSITO */}
          <div className="brew-card p-8 bg-gradient-to-br from-[#1d1d1b] via-[#0e2334] to-[#4d3720] text-white border-2 border-[#b89764]/50 shadow-2xl rounded-2xl space-y-4">
            <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
              Estética & Rigor Visual
            </span>
            <h4 className="font-cinzel text-2xl font-bold text-[#f7f4ed]">
              Diseño con Propósito • Minimalismo Nórdico & Simbolismo Ancestral
            </h4>
            <p className="font-lato text-xs md:text-sm text-slate-200 leading-relaxed max-w-4xl">
              Cada elemento visual de NORTA está cuidadosamente diseñado para reflejar nuestros valores. La estética minimalista nórdica se encuentra con simbolismo ancestral: runas, brújulas y patrones geométricos que evocan la navegación vikinga y la imponencia andina. Nuestra paleta de colores combina tonos tierra con acentos de verde nórdico y dorado tenue, representando la conexión con la naturaleza primordial. Las etiquetas texturizadas y la tipografía robusta transmiten solidez y autenticidad. Todo en NORTA comunica carácter, desde el primer vistazo hasta el último sorbo.
            </p>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 8: EMPAQUE, CRISTALERÍA & MOODBOARD FOTOGRÁFICO */}
      {/* ==================================================================== */}
      {activeTab === 'packaging' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Arquitectura de Packaging</span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334] mt-1">
              Aplicaciones de Empaque & Galería de Marca NORTA
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Conceptos industriales para botellas cerámicas de guarda, latas craft con barniz táctil y cristalería de firma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packagingConcepts.map((pk, idx) => (
              <div
                key={idx}
                className="papiro-card overflow-hidden shadow-lg border border-[#b89764]/40 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-[#1d1d1b]">
                  <img
                    src={pk.image}
                    alt={pk.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b] via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-mono-brew font-bold px-2.5 py-1 rounded bg-[#0e2334] text-[#c9b38f] border border-[#b89764]/40">
                    {pk.type}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                      {pk.title}
                    </h4>
                    <p className="font-lato text-xs text-slate-700 leading-relaxed">
                      {pk.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#4d3720]/15 text-[11px] font-mono-brew text-[#4d3720]">
                    <span className="font-bold block uppercase">Acabado & Textura:</span>
                    <p className="text-slate-600 font-lato mt-0.5">{pk.texture}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="papiro-card p-6 md:p-8 border border-[#b89764]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4d3720]/20">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Galería Visual de Alta Resolución</span>
                <h4 className="font-cinzel text-lg font-bold text-[#0e2334] mt-1">
                  Galería Oficial NORTA • Cervezas, Atmósfera y Sala de Cocción
                </h4>
              </div>
              <p className="text-xs text-[#4d3720] font-lato">
                Haz clic en cualquier imagen para expandir en pantalla completa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setLightboxImage({ url: './assets/cerveza_montana.jpg', title: 'NORTA Montana', subtitle: '4.8% ABV • Fuerte y Robusta, como una cima nevada' })}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/40 shadow bg-[#1d1d1b]"
              >
                <img src="./assets/cerveza_montana.jpg" alt="NORTA Montana" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">NORTA Montana</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">4.8% ABV • Cima Nevada</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/cerveza_tempestad.jpg', title: 'NORTA Tempestad', subtitle: '5.5% ABV • Intensa, Chispeante, algo Indomable' })}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/40 shadow bg-[#1d1d1b]"
              >
                <img src="./assets/cerveza_tempestad.jpg" alt="NORTA Tempestad" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">NORTA Tempestad</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">5.5% ABV • Cold IPA</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/cerveza_niebla.jpg', title: 'NORTA Niebla', subtitle: '6.2% ABV • Elegante, Suave y Misteriosa' })}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/40 shadow bg-[#1d1d1b]"
              >
                <img src="./assets/cerveza_niebla.jpg" alt="NORTA Niebla" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">NORTA Niebla</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">6.2% ABV • Bruma Nórdica</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/cerveza_cumbre.jpg', title: 'NORTA Cumbre', subtitle: '6.8% ABV • Es la Insignia. Excelsa, Dorada y Memorable' })}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group border-2 border-[#b89764] shadow bg-[#1d1d1b]"
              >
                <img src="./assets/cerveza_cumbre.jpg" alt="NORTA Cumbre" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-[#b89764]">NORTA Cumbre</p>
                  <p className="text-[10px] text-white font-mono-brew">6.8% ABV • La Insignia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 9: DECÁLOGO DE CALIDAD & FILOSOFÍA GRAIN-TO-GLASS */}
      {/* ==================================================================== */}
      {activeTab === 'decalogo' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Decálogo de Calidad & Filosofía Grain-to-Glass
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Los diez mandamientos innegociables que gobiernan cada lote producido en la planta Cervecería NORTA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decalogo.map((item, idx) => (
              <div
                key={idx}
                className="papiro-card p-6 border-l-4 border-l-[#b89764] border border-[#b89764]/30 shadow-md flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <span className="font-cinzel text-3xl font-extrabold text-[#b89764] leading-none shrink-0">
                  {item.num}
                </span>
                <div className="space-y-1">
                  <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                    {item.title}
                  </h4>
                  <p className="font-lato text-xs text-slate-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="brew-card p-8 bg-gradient-to-r from-[#0e2334] to-[#4d3720] text-white border-2 border-[#b89764]/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
                Compromiso Institucional de Inocuidad
              </span>
              <h4 className="font-cinzel text-2xl font-bold text-[#c9b38f]">
                Trazabilidad y Calidad Certificada
              </h4>
              <p className="font-lato text-xs text-slate-200 leading-relaxed">
                Cada gota de cerveza NORTA cumple con las normativas sanitarias vigentes del INVIMA (Decreto 1686 de 2012 / Resolución 2674 de 2013). La excelencia metrológica y el respeto por los tiempos biológicos son nuestro juramento de honor.
              </p>
            </div>

            <div className="bg-[#1d1d1b]/80 border border-[#b89764]/50 rounded-2xl p-5 text-center shrink-0 min-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-[#0e2334] border border-[#c9b38f] mx-auto flex items-center justify-center text-lg shadow">
                📜
              </div>
              <p className="font-baskerville italic text-sm font-bold text-[#c9b38f] mt-2">
                {data.info.headBrewer}
              </p>
              <p className="text-[10px] font-mono-brew text-slate-300">
                Maestro Cervecero & Jefe de Planta
              </p>
              <p className="text-[9px] font-mono-brew text-[#b89764] mt-1 uppercase">
                Sello de Calidad Aprobado
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: FICHA DE CATA SOMMELIER & RECETA MAESTRA */}
      {/* ==================================================================== */}
      {selectedBeerModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#fdfbf7] border-2 border-[#b89764] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-modalScale">
            <div
              className="p-6 text-white flex items-center justify-between relative"
              style={{ backgroundColor: '#0e2334' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-14 rounded-lg border-2 border-white/80 shadow relative overflow-hidden"
                  style={{ backgroundColor: selectedBeerModal.liquidColor || '#c4591f' }}
                >
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/70"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="spec-badge bg-[#b89764] text-[#1d1d1b] font-bold">
                      {selectedBeerModal.id}
                    </span>
                    <span className="text-xs font-mono-brew text-[#c9b38f]">
                      {selectedBeerModal.srmColor} SRM
                    </span>
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold text-[#f7f4ed]">
                    {selectedBeerModal.name}
                  </h3>
                  <p className="font-baskerville italic text-xs text-[#c9b38f]">
                    {selectedBeerModal.style}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBeerModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-lg font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-lato text-slate-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Graduación</span>
                  <p className="font-mono-brew text-lg font-extrabold text-[#0e2334]">{selectedBeerModal.abv}% ABV</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Amargor IBU</span>
                  <p className="font-mono-brew text-lg font-extrabold text-[#0e2334]">{selectedBeerModal.ibu} IBU</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Densidades</span>
                  <p className="font-mono-brew text-xs font-extrabold text-[#0e2334] mt-1">OG: {selectedBeerModal.og} | FG: {selectedBeerModal.fg}</p>
                </div>
                <div className="bg-[#eee7da] rounded-xl p-3 text-center border border-[#4d3720]/15">
                  <span className="text-[10px] font-mono-brew text-[#4d3720] uppercase font-bold">Servicio</span>
                  <p className="font-mono-brew text-xs font-extrabold text-[#0e2334] mt-1">{selectedBeerModal.servingTemp || '6°C - 8°C'}</p>
                </div>
              </div>

              {selectedBeerModal.essence && (
                <div className="p-4 rounded-xl bg-[#eee7da]/80 border-l-4 border-[#b89764] space-y-1">
                  <span className="font-mono-brew text-[10px] font-bold text-[#4d3720] uppercase">Esencia Canónica NORTA:</span>
                  <p className="font-baskerville italic text-sm text-slate-800 leading-relaxed">
                    "{selectedBeerModal.essence}"
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                  Perfil Sensorial Sommelier
                </h4>
                <p className="font-lato text-sm text-slate-700 leading-relaxed">
                  {selectedBeerModal.sensoryDescription}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                  Composición de Maltas & Granos Nobles
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#eee7da] text-[#4d3720] font-mono-brew font-bold">
                        <th className="p-2.5">Grano / Malta</th>
                        <th className="p-2.5">% Grut</th>
                        <th className="p-2.5">Peso (Lote 1000L)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4d3720]/10">
                      {(selectedBeerModal.grains || []).map((g, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-semibold">{g.name}</td>
                          <td className="p-2.5 font-mono-brew">{g.percentage}%</td>
                          <td className="p-2.5 font-mono-brew">{g.kg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-cinzel text-base font-bold text-[#0e2334]">
                  Lúpulos Nobles & Tiempos de Adición
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#eee7da] text-[#4d3720] font-mono-brew font-bold">
                        <th className="p-2.5">Variedad de Lúpulo</th>
                        <th className="p-2.5">Momento</th>
                        <th className="p-2.5">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4d3720]/10">
                      {(selectedBeerModal.hops || []).map((h, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-semibold">{h.name}</td>
                          <td className="p-2.5">{h.timing}</td>
                          <td className="p-2.5 font-mono-brew">{h.g} g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#eee7da]/80 border border-[#4d3720]/15 space-y-1 text-xs">
                <span className="font-bold text-[#4d3720] block">Cepas de Levadura & Maduración:</span>
                <p className="text-slate-700 font-mono-brew">{selectedBeerModal.yeast}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0e2334] text-white space-y-1 text-xs">
                <span className="font-bold text-[#c9b38f] block uppercase tracking-wider font-cinzel">Maridaje Sommelier Recomendado:</span>
                <p className="font-baskerville italic text-slate-200 text-sm leading-relaxed">
                  "{selectedBeerModal.pairing}"
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#f2ebd9] border-t border-[#4d3720]/20 flex justify-end">
              <button
                onClick={() => setSelectedBeerModal(null)}
                className="px-5 py-2 rounded-xl bg-[#0e2334] text-white font-cinzel text-xs font-bold tracking-wider hover:bg-[#b89764] hover:text-[#1d1d1b] transition"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: LIGHTBOX DE IMAGEN EN PANTALLA COMPLETA */}
      {/* ==================================================================== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#b89764] text-2xl font-bold transition p-2"
            >
              ✕ Cerrar
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-xl border-2 border-[#b89764] shadow-2xl"
            />
            <div className="mt-4 text-center space-y-1">
              <h4 className="font-cinzel text-xl font-bold text-[#f7f4ed]">
                {lightboxImage.title}
              </h4>
              <p className="font-baskerville italic text-xs md:text-sm text-[#c9b38f]">
                {lightboxImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
