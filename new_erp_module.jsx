// ==========================================================================
// COMPONENTE: ErpModule (GESTIÓN INTEGRAL DE INVENTARIOS, COSTOS COP & ACTIVOS)
// REFINAMIENTO UX/UI: CONTRASTE DINÁMICO MODO CLARO / OSCURO & ERGONOMÍA
// ==========================================================================
function ErpModule({ data, tab, setTab, onOpenMovement, onExportCSV }) {
  const [rawCategoryFilter, setRawCategoryFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [movementFilter, setMovementFilter] = useState('ALL');

  // Formateador monetario oficial Pesos Colombianos (COP)
  const formatCOP = (val) => {
    const num = Math.round(Number(val) || 0);
    return '$ ' + num.toLocaleString('es-CO') + ' COP';
  };

  const rawInventory = data.rawInventory || [];
  const finishedGoods = data.finishedGoods || [];
  const machinery = data.machineryAndEquipment || [];
  const inventoryMovements = data.inventoryMovements || [];

  // Cálculos dinámicos en vivo para Insumos BOM
  const computedRawItems = useMemo(() => {
    return rawInventory.map(item => {
      const stockInit = Number(item.stockInitial) || 0;
      const entries = Number(item.entries) || 0;
      const exits = Number(item.exits) || 0;
      // Fórmula obligatoria: Stock Inicial + Entradas - Salidas
      const stockActual = Math.max(0, parseFloat((stockInit + entries - exits).toFixed(2)));
      const unitVal = Number(item.entryUnitPrice || item.costPerUnit) || 0;
      // Valor Total en Stock: Stock Actual * Valor Unidad
      const totalVal = Math.round(stockActual * unitVal);

      return {
        ...item,
        stockCalculated: stockActual,
        unitVal,
        totalVal
      };
    });
  }, [rawInventory]);

  // Cálculos dinámicos para Producto Terminado
  const computedFinishedGoods = useMemo(() => {
    return finishedGoods.map(fg => {
      const units = Number(fg.stockUnits) || 0;
      const cogs = Number(fg.cogsCost) || 0;
      const wholesale = Number(fg.wholesalePrice) || 0;
      const marginAbs = wholesale - cogs;
      const marginPctVal = wholesale > 0 ? ((marginAbs / wholesale) * 100).toFixed(1) + '%' : '0.0%';
      const totalInventoryVal = units * wholesale;
      const totalCogsVal = units * cogs;

      return {
        ...fg,
        cogs,
        wholesale,
        marginAbs,
        marginPctVal,
        totalInventoryVal,
        totalCogsVal
      };
    });
  }, [finishedGoods]);

  // Totales consolidados de la cervecería en COP
  const totalRawValueCOP = useMemo(() => {
    return computedRawItems.reduce((acc, it) => acc + it.totalVal, 0);
  }, [computedRawItems]);

  const totalFinishedValueCOP = useMemo(() => {
    return computedFinishedGoods.reduce((acc, fg) => acc + fg.totalInventoryVal, 0);
  }, [computedFinishedGoods]);

  const totalMachineryValueCOP = useMemo(() => {
    return machinery.reduce((acc, m) => acc + (Number(m.acquisitionCost) || 0), 0);
  }, [machinery]);

  const averageGrossMarginPct = useMemo(() => {
    if (!computedFinishedGoods.length) return '0.0%';
    const totalWholesale = computedFinishedGoods.reduce((acc, f) => acc + f.wholesale, 0);
    const totalCogs = computedFinishedGoods.reduce((acc, f) => acc + f.cogs, 0);
    if (totalWholesale === 0) return '0.0%';
    return (((totalWholesale - totalCogs) / totalWholesale) * 100).toFixed(1) + '%';
  }, [computedFinishedGoods]);

  // Filtrado de materias primas
  const filteredRawItems = useMemo(() => {
    return computedRawItems.filter(item => {
      const matchesCat = rawCategoryFilter === 'ALL' || item.category === rawCategoryFilter;
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [computedRawItems, rawCategoryFilter, searchTerm]);

  // Filtrado de historial de movimientos
  const filteredMovements = useMemo(() => {
    return inventoryMovements.filter(m => {
      if (movementFilter === 'ALL') return true;
      if (movementFilter === 'ENTRADA') return m.type.startsWith('ENTRADA');
      if (movementFilter === 'SALIDA') return m.type.startsWith('SALIDA');
      if (movementFilter === 'TRANSFORM') return m.type.includes('TRANSFORMACION');
      if (movementFilter === 'BAJA') return m.reason.toLowerCase().includes('baja') || m.reason.toLowerCase().includes('merma') || m.reason.toLowerCase().includes('caducidad');
      return true;
    });
  }, [inventoryMovements, movementFilter]);

  // Categorías de materias primas
  const rawCategories = ['ALL', 'Maltas', 'Lúpulos', 'Levaduras', 'Adjuntos e Ingredientes Especiales', 'Empaques', 'Químicos CIP'];

  // 3. ANALÍTICA COGS POR LÍNEA MAESTRA (Montana, Tempestad, Cumbre, Niebla)
  const cogsAnalyticsLines = useMemo(() => {
    const lines = [
      {
        id: 'LINE-MONTANA',
        beerName: 'NORTA Montana',
        style: 'Amber Mountain Ale',
        batchVolumeL: 1000,
        maltsCostCOP: 1850000,
        hopsCostCOP: 820000,
        yeastCostCOP: 410000,
        packagingCostCOP: 950000,
        energyWaterCostCOP: 380000,
        finishedGoodsSKUs: computedFinishedGoods.filter(f => f.name.includes('Montana'))
      },
      {
        id: 'LINE-TEMPESTAD',
        beerName: 'NORTA Tempestad',
        style: 'Storm Cold IPA',
        batchVolumeL: 1000,
        maltsCostCOP: 1720000,
        hopsCostCOP: 1450000,
        yeastCostCOP: 410000,
        packagingCostCOP: 1100000,
        energyWaterCostCOP: 390000,
        finishedGoodsSKUs: computedFinishedGoods.filter(f => f.name.includes('Tempestad'))
      },
      {
        id: 'LINE-CUMBRE',
        beerName: 'NORTA Cumbre',
        style: 'Imperial Golden Ale',
        batchVolumeL: 1000,
        maltsCostCOP: 2150000,
        hopsCostCOP: 980000,
        yeastCostCOP: 450000,
        packagingCostCOP: 1350000,
        energyWaterCostCOP: 420000,
        finishedGoodsSKUs: computedFinishedGoods.filter(f => f.name.includes('Cumbre'))
      },
      {
        id: 'LINE-NIEBLA',
        beerName: 'NORTA Niebla',
        style: 'Witbier / Hazy Ale',
        batchVolumeL: 1000,
        maltsCostCOP: 1680000,
        hopsCostCOP: 1120000,
        yeastCostCOP: 420000,
        packagingCostCOP: 1080000,
        energyWaterCostCOP: 370000,
        finishedGoodsSKUs: computedFinishedGoods.filter(f => f.name.includes('Niebla'))
      }
    ];

    return lines.map(line => {
      const totalBatchInsumosCOP = line.maltsCostCOP + line.hopsCostCOP + line.yeastCostCOP + line.packagingCostCOP + line.energyWaterCostCOP;
      const costPerLiterCOP = Math.round(totalBatchInsumosCOP / line.batchVolumeL);
      
      const totalInventoryValCOP = line.finishedGoodsSKUs.reduce((acc, s) => acc + s.totalInventoryVal, 0);
      const totalUnits = line.finishedGoodsSKUs.reduce((acc, s) => acc + s.stockUnits, 0);

      // Margen ponderado
      let lineMarginPct = '61.5%';
      if (line.finishedGoodsSKUs.length > 0) {
        const sumWholesale = line.finishedGoodsSKUs.reduce((acc, s) => acc + s.wholesale, 0);
        const sumCogs = line.finishedGoodsSKUs.reduce((acc, s) => acc + s.cogs, 0);
        if (sumWholesale > 0) {
          lineMarginPct = (((sumWholesale - sumCogs) / sumWholesale) * 100).toFixed(1) + '%';
        }
      }

      return {
        ...line,
        totalBatchInsumosCOP,
        costPerLiterCOP,
        totalInventoryValCOP,
        totalUnits,
        lineMarginPct
      };
    });
  }, [computedFinishedGoods]);

  // 5. ALERTAS Y RECOMENDACIONES AUTOMÁTICAS INTELIGENTES
  const recommendations = useMemo(() => {
    const alerts = [];

    // Alertas Insumos
    computedRawItems.forEach(item => {
      if (item.status === 'Crítico' || item.stockCalculated <= item.minStock) {
        alerts.push({
          type: 'danger',
          category: 'Insumos',
          icon: '⚠️',
          title: `Stock Crítico: ${item.name}`,
          description: `Stock actual (${item.stockCalculated} ${item.unit}) por debajo o igual al stock mínimo de seguridad (${item.minStock} ${item.unit}). Se requiere orden de compra inmediata a ${item.supplier}.`,
          metric: `${item.stockCalculated} / ${item.minStock} ${item.unit}`
        });
      }
      if (item.status === 'Por vencer' || (item.expiryDate && item.expiryDate <= '2026-11-01')) {
        alerts.push({
          type: 'warning',
          category: 'Insumos',
          icon: '⏳',
          title: `Insumo próximo a vencer: ${item.name}`,
          description: `Lote con fecha límite ${item.expiryDate}. Priorizar en el programa de cocción inmediato para evitar pérdida por viabilidad biológica / degradación sensorial.`,
          metric: `Vence: ${item.expiryDate}`
        });
      }
    });

    // Alertas WIP (Producto en proceso)
    const batches = data.batches || [];
    batches.forEach(b => {
      if (b.status === 'Activo' && b.stage === 'Fermentación' && b.currentGravity && b.finalGravityTarget) {
        if (Math.abs(b.currentGravity - b.finalGravityTarget) <= 0.003) {
          alerts.push({
            type: 'info',
            category: 'Producto en Proceso (WIP)',
            icon: '❄️',
            title: `Lote ${b.id} listo para Cold Crash`,
            description: `${b.recipeName} en tanque ${b.tankId} alcanzó gravedad terminal (${b.currentGravity}). Iniciar descenso de temperatura a 2°C para clarificación y liberación de glicol.`,
            metric: `SG: ${b.currentGravity}`
          });
        }
      }
    });

    // Alertas Producto Terminado (Rotación FEFO / FIFO)
    computedFinishedGoods.forEach(fg => {
      if (fg.brewDate && fg.brewDate <= '2026-07-20' && fg.stockUnits > 10) {
        alerts.push({
          type: 'warning',
          category: 'Producto Terminado',
          icon: '📦',
          title: `Rotación FIFO Requerida: ${fg.name}`,
          description: `Lote elaborado el ${fg.brewDate} acumula más de 60 días en cava fría. Priorizar en despachos B2B a bares aliados antes de ingresar stock fresco.`,
          metric: `${fg.stockUnits} unidades en cava`
        });
      }
    });

    return alerts;
  }, [computedRawItems, data.batches, computedFinishedGoods]);

  return (
    <div className="space-y-6">
      {/* CABECERA SUPERIOR Y NAVEGACIÓN DE PESTAÑAS (STICKY TOOLBAR CON CONTRASTE ELEGANTE) */}
      <div className="sticky top-0 z-20 bg-[var(--bg-main)]/95 backdrop-blur-md pt-2 pb-4 border-b border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span>📦</span> ERP, Inventarios & Costos Cerveceros
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#b89764] text-[#121210] shadow-sm">
                Moneda: COP 🇨🇴
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Gestión metrológica de materias primas, producto terminado, costeo COGS por línea y activos fijos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* BOTÓN UNIVERSAL DE REGISTRO DE MOVIMIENTOS CON SVG MINIMALISTA */}
            <button
              onClick={onOpenMovement}
              className="btn-norta-primary text-xs py-2 px-3.5 shadow-md flex items-center gap-2 font-bold tracking-wide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Registrar Movimiento</span>
            </button>

            <button 
              onClick={() => onExportCSV(
                tab === 'raw' ? 'Insumos_BOM_NORTA_COP' :
                tab === 'finished' ? 'Producto_Terminado_NORTA_COP' :
                tab === 'equipment' ? 'Activos_Maquinaria_NORTA_COP' :
                tab === 'movements' ? 'Historial_Kardex_NORTA_COP' : 'Reporte_COGS_NORTA_COP',
                tab === 'raw' ? computedRawItems :
                tab === 'finished' ? computedFinishedGoods :
                tab === 'equipment' ? machinery :
                tab === 'movements' ? inventoryMovements : cogsAnalyticsLines
              )} 
              className="btn-norta-secondary text-xs py-2 px-3.5 shadow-sm flex items-center gap-2 font-semibold"
            >
              <svg className="w-4 h-4 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* BARRA DE SUB-PESTAÑAS ERGONÓMICA CON MICRO-ICONOS VECTORIALES */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
          {/* Subpestaña 1: Insumos BOM */}
          <button 
            onClick={() => setTab('raw')} 
            className={`brew-subtab-btn ${tab === 'raw' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Insumos BOM</span>
          </button>

          {/* Subpestaña 2: Producto Terminado */}
          <button 
            onClick={() => setTab('finished')} 
            className={`brew-subtab-btn ${tab === 'finished' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Producto Terminado</span>
          </button>

          {/* Subpestaña 3: Análisis COGS */}
          <button 
            onClick={() => setTab('cogs')} 
            className={`brew-subtab-btn ${tab === 'cogs' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Análisis COGS</span>
          </button>

          {/* Subpestaña 4: Maquinaria y Equipo */}
          <button 
            onClick={() => setTab('equipment')} 
            className={`brew-subtab-btn ${tab === 'equipment' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Maquinaria y Equipo</span>
          </button>

          {/* Subpestaña 5: Kardex */}
          <button 
            onClick={() => setTab('movements')} 
            className={`brew-subtab-btn ${tab === 'movements' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>Kardex / Movimientos</span>
          </button>

          {/* Subpestaña 6: Alertas & Recomendaciones */}
          <button 
            onClick={() => setTab('recommendations')} 
            className={`brew-subtab-btn relative ${tab === 'recommendations' ? 'active' : ''}`}
          >
            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Alertas & Recomendaciones</span>
            {recommendations.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-red-600 text-white font-mono font-bold shadow-sm">
                {recommendations.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TARJETAS RESUMEN EJECUTIVO (ELEVACIÓN DE LUJO & MICRO-BORDES ORO BRUÑIDO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* KPI 1: Valor Insumos */}
        <div className="kpi-luxury-card">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)] uppercase font-bold text-[10px] tracking-wider">Valor Insumos en Bodega</span>
            <div className="w-7 h-7 rounded-lg bg-[rgba(184,151,100,0.12)] flex items-center justify-center text-[#b89764]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-xl font-bold font-mono text-[#b89764] mt-2">{formatCOP(totalRawValueCOP)}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[var(--text-dim)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89764]"></span>
            <span>{computedRawItems.length} materias primas auditadas</span>
          </div>
        </div>

        {/* KPI 2: Stock Producto Terminado */}
        <div className="kpi-luxury-card">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)] uppercase font-bold text-[10px] tracking-wider">Stock Producto Terminado</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
          </div>
          <p className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">{formatCOP(totalFinishedValueCOP)}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Valuación comercial mayorista</span>
          </div>
        </div>

        {/* KPI 3: Activos Fijos */}
        <div className="kpi-luxury-card">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)] uppercase font-bold text-[10px] tracking-wider">Activos Fijos en Planta</span>
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-2">{formatCOP(totalMachineryValueCOP)}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-sky-700/80 dark:text-sky-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            <span>{machinery.length} equipos mayores operativos</span>
          </div>
        </div>

        {/* KPI 4: Margen Bruto */}
        <div className="kpi-luxury-card">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-muted)] uppercase font-bold text-[10px] tracking-wider">Margen Bruto Ponderado</span>
            <div className="w-7 h-7 rounded-lg bg-[rgba(184,151,100,0.12)] flex items-center justify-center text-[var(--text-primary)]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-xl font-bold font-mono text-[var(--text-primary)] mt-2">{averageGrossMarginPct}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-[var(--text-dim)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-dim)]"></span>
            <span>Contribución estimada en portafolio</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. PESTAÑA: INSUMOS BOM (RAW) - TABLA OPTIMIZADA CON 12 COLUMNAS    */}
      {/* ==================================================================== */}
      {tab === 'raw' && (
        <div className="space-y-4 fade-in-luxury">
          {/* BARRA DE FILTROS POR CATEGORÍA Y BÚSQUEDA */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)] shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-[var(--text-muted)] mr-1">Filtrar por:</span>
              {rawCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setRawCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    rawCategoryFilter === cat 
                      ? 'bg-[#b89764] text-[#121210] shadow' 
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat === 'ALL' ? 'Todos los Insumos' : cat}
                </button>
              ))}
            </div>
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar insumo o código..."
                className="brew-input text-xs py-1.5 px-3 w-full"
              />
            </div>
          </div>

          {/* TABLA COMPACTA CON COLUMNAS AJUSTADAS */}
          <div className="brew-table-container shadow-md">
            <table className="brew-table text-[11px]">
              <thead>
                <tr>
                  <th className="py-2.5 px-2.5 font-mono text-[10px] w-16">Código</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Descripción / Marca</th>
                  <th className="py-2.5 px-2 text-center w-24">Categoría</th>
                  <th className="py-2.5 px-2 text-right w-20">Stock Inicial</th>
                  <th className="py-2.5 px-2 text-right w-16 text-emerald-600 dark:text-emerald-400">Entradas</th>
                  <th className="py-2.5 px-2 text-center w-20">F. Entrada</th>
                  <th className="py-2.5 px-2 text-center w-20">F. Venc.</th>
                  <th className="py-2.5 px-2 text-right w-24">Valor Entrada (COP)</th>
                  <th className="py-2.5 px-2 text-right w-16 text-red-600 dark:text-red-400">Salidas</th>
                  <th className="py-2.5 px-2 text-right w-24 font-bold text-[var(--text-primary)] bg-[var(--bg-elevated)]">Stock Actual</th>
                  <th className="py-2.5 px-3 text-right w-28 font-bold text-[#b89764] bg-[var(--bg-elevated)]">Valor en Stock</th>
                  <th className="py-2.5 px-2 text-center w-20">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredRawItems.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center py-6 text-[var(--text-muted)]">
                      No se encontraron materias primas para este filtro.
                    </td>
                  </tr>
                ) : (
                  filteredRawItems.map(item => (
                    <tr key={item.id} className="hover:bg-[var(--table-tr-hover)] transition">
                      {/* Código */}
                      <td className="py-2 px-2.5 font-mono font-bold text-[#b89764] text-[10px]">{item.id}</td>
                      {/* Descripción */}
                      <td className="py-2 px-3">
                        <div className="font-semibold text-[var(--text-primary)] leading-snug">{item.name}</div>
                        <div className="text-[9px] text-[var(--text-muted)] truncate">{item.supplier}</div>
                      </td>
                      {/* Categoría */}
                      <td className="py-2 px-2 text-center">
                        <span className="badge badge-dorado text-[9px] py-0.5 px-2">{item.category}</span>
                      </td>
                      {/* Stock Inicial */}
                      <td className="py-2 px-2 text-right font-mono text-[var(--text-secondary)]">
                        {item.stockInitial} {item.unit}
                      </td>
                      {/* Entradas */}
                      <td className="py-2 px-2 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        +{item.entries}
                      </td>
                      {/* Fecha de Entrada */}
                      <td className="py-2 px-2 text-center font-mono text-[10px] text-[var(--text-dim)]">
                        {item.entryDate || '-'}
                      </td>
                      {/* Fecha de Vencimiento */}
                      <td className="py-2 px-2 text-center font-mono text-[10px] text-amber-600 dark:text-amber-300">
                        {item.expiryDate || '-'}
                      </td>
                      {/* Valor Unidad de Entrada */}
                      <td className="py-2 px-2 text-right font-mono text-[var(--text-secondary)]">
                        {formatCOP(item.unitVal)}
                      </td>
                      {/* Salidas */}
                      <td className="py-2 px-2 text-right font-mono font-semibold text-red-600 dark:text-red-400">
                        -{item.exits}
                      </td>
                      {/* Stock Actual Calculado: Inicial + Entradas - Salidas */}
                      <td className="py-2 px-2 text-right font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-elevated)]">
                        {item.stockCalculated} {item.unit}
                      </td>
                      {/* Valor Total en Stock: Stock Actual * Valor Unidad */}
                      <td className="py-2 px-3 text-right font-mono font-bold text-[#b89764] bg-[var(--bg-elevated)]">
                        {formatCOP(item.totalVal)}
                      </td>
                      {/* Estado */}
                      <td className="py-2 px-2 text-center">
                        <span className={`badge text-[9px] py-0.5 px-1.5 ${
                          item.status === 'Óptimo' ? 'badge-verde' :
                          item.status === 'Por vencer' ? 'badge-dorado bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40' :
                          'badge-red'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. PESTAÑA: PRODUCTO TERMINADO (FINISHED)                            */}
      {/* ==================================================================== */}
      {tab === 'finished' && (
        <div className="space-y-4 fade-in-luxury">
          <div className="brew-table-container shadow-md">
            <table className="brew-table text-xs">
              <thead>
                <tr>
                  <th className="py-3 px-3 font-mono text-[11px] w-20">Código</th>
                  <th className="py-3 px-4 min-w-[200px]">Producto & Estilo</th>
                  <th className="py-3 px-3 text-center w-28">Presentación</th>
                  <th className="py-3 px-3 text-center w-28">Fecha Elaboración</th>
                  <th className="py-3 px-3 text-right w-24">Stock Cava</th>
                  <th className="py-3 px-3 text-right w-32">COGS / Unidad (COP)</th>
                  <th className="py-3 px-3 text-right w-36">Precio Mayorista (COP)</th>
                  <th className="py-3 px-4 text-center w-40">Margen (% & COP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {computedFinishedGoods.map(fg => (
                  <tr key={fg.id} className="hover:bg-[var(--table-tr-hover)] transition">
                    <td className="py-3 px-3 font-mono text-xs font-bold text-[#b89764]">{fg.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[var(--text-primary)] brand-title text-sm">{fg.name}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{fg.style}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="badge badge-dorado text-[10px]">{fg.packaging}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[var(--text-secondary)] text-xs">
                      {fg.brewDate || '2026-08-01'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      {fg.stockUnits} uds
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs text-[var(--text-secondary)]">
                      {formatCOP(fg.cogs)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[#b89764] text-xs">
                      {formatCOP(fg.wholesale)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">{fg.marginPctVal}</span>
                        <span className="text-[10px] font-mono text-[var(--text-dim)]">+{formatCOP(fg.marginAbs)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. PESTAÑA: ANÁLISIS COGS (COGS)                                     */}
      {/* ==================================================================== */}
      {tab === 'cogs' && (
        <div className="space-y-6 fade-in-luxury">
          {/* DESGLOSE POR LAS 4 LÍNEAS CANÓNICAS DE CERVECERÍA NORTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cogsAnalyticsLines.map(line => (
              <div key={line.id} className="brew-card p-5 space-y-4">
                <div className="flex justify-between items-start border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <h3 className="brand-title text-base font-bold text-[#b89764]">{line.beerName}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{line.style} • Lote estándar 1,000 Litros</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[var(--text-muted)] block">Margen Bruto</span>
                    <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">{line.lineMarginPct}</span>
                  </div>
                </div>

                {/* DESGLOSE DETALLADO DE INSUMOS POR LOTE */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">🌾 Maltas Base & Especiales</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] text-xs">{formatCOP(line.maltsCostCOP)}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">🌿 Lúpulos de Aroma & Amargor</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] text-xs">{formatCOP(line.hopsCostCOP)}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">🧪 Levadura Cervecera</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] text-xs">{formatCOP(line.yeastCostCOP)}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-[10px] text-[var(--text-muted)] block">📦 Empaque & Envasado</span>
                    <span className="font-mono font-bold text-[var(--text-primary)] text-xs">{formatCOP(line.packagingCostCOP)}</span>
                  </div>
                </div>

                {/* RESUMEN CONSOLIDADO DE LA LÍNEA */}
                <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-medium)] space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-secondary)]">Costo Total Insumos Lote:</span>
                    <span className="font-mono font-bold text-[var(--text-primary)]">{formatCOP(line.totalBatchInsumosCOP)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--text-muted)]">Costo Directo por Litro:</span>
                    <span className="font-mono font-bold text-[#b89764]">{formatCOP(line.costPerLiterCOP)} / L</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)]">Valor Stock en Bodega:</span>
                    <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{formatCOP(line.totalInventoryValCOP)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. PESTAÑA: MAQUINARIA Y EQUIPO (EQUIPMENT)                          */}
      {/* ==================================================================== */}
      {tab === 'equipment' && (
        <div className="space-y-4 fade-in-luxury">
          <div className="brew-table-container shadow-md">
            <table className="brew-table text-xs">
              <thead>
                <tr>
                  <th className="py-3 px-3 font-mono text-[11px] w-24">Código Activo</th>
                  <th className="py-3 px-4 min-w-[240px]">Descripción del Equipo</th>
                  <th className="py-3 px-3 text-center w-28">Categoría</th>
                  <th className="py-3 px-3 text-center w-28">Fecha de Compra</th>
                  <th className="py-3 px-3 text-right w-36">Valor Adquisición (COP)</th>
                  <th className="py-3 px-3 text-center w-28">Vida Útil</th>
                  <th className="py-3 px-3 text-right w-36">Depreciación Acumulada</th>
                  <th className="py-3 px-3 text-center w-36">Estado Actual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {machinery.map(item => (
                  <tr key={item.id} className="hover:bg-[var(--table-tr-hover)] transition">
                    <td className="py-3 px-3 font-mono text-xs font-bold text-[#b89764]">{item.id}</td>
                    <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">{item.name}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="badge badge-dorado text-[10px]">{item.category}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[var(--text-secondary)]">
                      {item.purchaseDate}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-[var(--text-primary)]">
                      {formatCOP(item.acquisitionCost)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-[var(--text-secondary)]">
                      {item.usefulLifeYears} años
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-[var(--text-dim)]">
                      {formatCOP(item.depreciationAccumulated)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`badge text-[10px] ${
                        item.currentStatus.includes('Operativo') ? 'badge-verde' : 'badge-dorado'
                      }`}>
                        {item.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 5. PESTAÑA: KARDEX / HISTORIAL DE MOVIMIENTOS                        */}
      {/* ==================================================================== */}
      {tab === 'movements' && (
        <div className="space-y-4 fade-in-luxury">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-subtle)] shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-[var(--text-muted)] mr-1">Filtrar Movimientos:</span>
              {[
                { id: 'ALL', label: 'Todos' },
                { id: 'ENTRADA', label: 'Entradas' },
                { id: 'SALIDA', label: 'Salidas' },
                { id: 'TRANSFORM', label: 'Transformaciones' },
                { id: 'BAJA', label: 'Bajas & Mermas' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setMovementFilter(f.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    movementFilter === f.id
                      ? 'bg-[#b89764] text-[#121210] shadow'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button
              onClick={onOpenMovement}
              className="btn-norta-primary text-xs py-1.5 px-3 font-bold flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Nuevo Movimiento</span>
            </button>
          </div>

          <div className="brew-table-container shadow-md">
            <table className="brew-table text-[11px]">
              <thead>
                <tr>
                  <th className="py-2.5 px-2.5 font-mono text-[10px] w-24">N° Movimiento</th>
                  <th className="py-2.5 px-3 text-center w-28">Fecha y Hora</th>
                  <th className="py-2.5 px-2 text-center w-24">Tipo</th>
                  <th className="py-2.5 px-2 text-center w-20">Fase</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Artículo / Lote</th>
                  <th className="py-2.5 px-2 text-right w-20">Cantidad</th>
                  <th className="py-2.5 px-3 w-40">Motivo / Causa</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Observaciones / Justificación</th>
                  <th className="py-2.5 px-2 text-center w-28">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredMovements.map(m => (
                  <tr key={m.id} className="hover:bg-[var(--table-tr-hover)] transition">
                    <td className="py-2 px-2.5 font-mono font-bold text-[#b89764]">{m.id}</td>
                    <td className="py-2 px-3 text-center font-mono text-[var(--text-secondary)] text-[10px]">{m.date}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={`badge text-[9px] py-0.5 px-1.5 font-bold ${
                        m.type.startsWith('ENTRADA')
                          ? 'badge-verde'
                          : m.type.includes('TRANSFORMACION')
                          ? 'badge-dorado'
                          : 'badge-red'
                      }`}>
                        {m.type}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <span className="badge text-[9px] py-0.5 px-1 bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                        {m.category}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-[var(--text-primary)]">
                      <div>{m.itemName}</div>
                      <div className="font-mono text-[9px] text-[var(--text-muted)]">{m.itemId}</div>
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-[var(--text-primary)]">
                      {m.quantity} {m.unit}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-secondary)]">
                      <div className="font-semibold text-[var(--text-primary)]">{m.reason}</div>
                      {m.transformationLinkedId && (
                        <div className="text-[9px] text-[#b89764] font-mono">
                          Vinculado: {m.transformationLinkedId}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 text-[var(--text-secondary)] italic text-[11px]">
                      {m.notes || '-'}
                    </td>
                    <td className="py-2 px-2 text-center text-[var(--text-dim)] text-[10px]">
                      {m.responsible}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. PESTAÑA: ALERTAS & RECOMENDACIONES AUTOMÁTICAS                   */}
      {/* ==================================================================== */}
      {tab === 'recommendations' && (
        <div className="space-y-4 fade-in-luxury">
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-between shadow-sm">
            <div>
              <h3 className="brand-title text-base font-bold text-[#b89764]">
                Centro de Auditoría Operativa & Control de Riesgos
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Monitoreo automático de rotación FIFO, vencimiento de insumos y etapas fermentativas críticas.
              </p>
            </div>
            <span className="badge badge-dorado text-xs font-mono">
              {recommendations.length} Notificaciones Activas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border space-y-2 transition-all shadow-sm ${
                  rec.type === 'danger' 
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800/40 text-red-900 dark:text-red-200' 
                    : rec.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
                    : 'bg-sky-50 dark:bg-sky-950/20 border-sky-300 dark:border-sky-800/40 text-sky-900 dark:text-sky-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{rec.icon}</span>
                    <span className="font-bold text-xs uppercase tracking-wider">{rec.category}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/10 dark:bg-black/40 border border-current font-bold">
                    {rec.metric}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{rec.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
