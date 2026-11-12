import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V13
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V12", "CERVECERIA_NORTA_DATA_V13")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V11'", "'CERVECERIA_NORTA_DATA_V11', 'CERVECERIA_NORTA_DATA_V12'")

# 2. Upgrade handleCreateOrder to automatically deduct finishedGoods stock
old_handle_create_order = """  const handleCreateOrder = (order) => {
    setData(prev => ({
      ...prev,
      salesOrders: [order, ...prev.salesOrders]
    }));
    setModalType(null);
    showToast(`Pedido ${order.id} registrado para ${order.clientName}.`);
  };"""

new_handle_create_order = """  const handleCreateOrder = (order) => {
    setData(prev => {
      // 1. Deducción automática de stock de Producto Terminado (finishedGoods)
      const updatedFinishedGoods = prev.finishedGoods.map(fg => {
        let totalDeduct = 0;
        
        // Si el pedido proviene del Portal B2B con múltiples ítems en carrito
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            if (item.beerName === fg.beerName || fg.beerName.includes(item.beerName) || item.beerName.includes(fg.beerName)) {
              totalDeduct += (item.quantity || 0);
            }
          });
        } 
        // Si el pedido es directo por formulario simple
        else if (order.beerName && (fg.beerName === order.beerName || fg.beerName.includes(order.beerName) || order.beerName.includes(fg.beerName))) {
          totalDeduct += (order.quantity || 0);
        }

        if (totalDeduct > 0) {
          const newStock = Math.max(0, fg.stockUnits - totalDeduct);
          return { ...fg, stockUnits: newStock };
        }
        return fg;
      });

      return {
        ...prev,
        salesOrders: [order, ...prev.salesOrders],
        finishedGoods: updatedFinishedGoods
      };
    });
    setModalType(null);
    showToast(`Pedido ${order.id} registrado y stock de producto terminado descontado en ERP.`);
  };"""

app_code = app_code.replace(old_handle_create_order, new_handle_create_order)

# 3. Create FermentationSvgChart component
svg_chart_component = """

// ==========================================================================
// COMPONENTE: FermentationSvgChart (GRAFICADOR VECTORIAL SVG TIME-SERIES)
// ==========================================================================
function FermentationSvgChart({ logs = [], og = 1.055, fgTarget = 1.010 }) {
  if (!logs || logs.length === 0) return null;

  const width = 540;
  const height = 170;
  const padding = 35;

  // Calculo de rangos SG
  const sgValues = logs.map(l => parseFloat(l.sg) || og);
  const minSg = Math.min(Math.min(...sgValues), parseFloat(fgTarget) || 1.008) - 0.003;
  const maxSg = Math.max(Math.max(...sgValues), parseFloat(og) || 1.060) + 0.003;

  // Calculo de rangos Temp
  const tempValues = logs.map(l => parseFloat(l.tempC) || 18);
  const minTemp = Math.min(...tempValues) - 2;
  const maxTemp = Math.max(...tempValues) + 2;

  const getX = (index) => {
    if (logs.length === 1) return width / 2;
    return padding + (index / (logs.length - 1)) * (width - 2 * padding);
  };

  const getSgY = (sg) => {
    return height - padding - ((sg - minSg) / (maxSg - minSg)) * (height - 2 * padding);
  };

  const getTempY = (temp) => {
    return height - padding - ((temp - minTemp) / (maxTemp - minTemp)) * (height - 2 * padding);
  };

  // Coordenadas SG
  const sgPoints = logs.map((l, i) => `${getX(i)},${getSgY(parseFloat(l.sg))}`).join(' ');
  // Coordenadas Temp
  const tempPoints = logs.map((l, i) => `${getX(i)},${getTempY(parseFloat(l.tempC))}`).join(' ');
  // Linea Meta FG Target
  const targetY = getSgY(parseFloat(fgTarget));

  return (
    <div className="w-full bg-[#121210] p-3 rounded-xl border border-[#2d2a24] shadow-inner space-y-2">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#c9b38f] font-bold"><span className="w-2.5 h-2.5 rounded-full bg-[#c9b38f] inline-block"></span> Densidad (SG)</span>
          <span className="flex items-center gap-1 text-amber-500 font-bold"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Temp (°C)</span>
        </div>
        <span className="text-emerald-400 font-bold">Meta FG: {fgTarget}</span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Grilla horizontal */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#2d2a24" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#2d2a24" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#2d2a24" strokeWidth="1" />

          {/* Linea meta FG */}
          <line x1={padding} y1={targetY} x2={width - padding} y2={targetY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Curva de Densidad (SG) - Oro NORTA */}
          {logs.length > 1 && <polyline fill="none" stroke="#c9b38f" strokeWidth="3" points={sgPoints} strokeLinecap="round" strokeLinejoin="round" />}

          {/* Curva de Temperatura - Ambar */}
          {logs.length > 1 && <polyline fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" points={tempPoints} strokeLinecap="round" strokeLinejoin="round" />}

          {/* Puntos de datos SG & Temp */}
          {logs.map((l, i) => {
            const x = getX(i);
            const sgY = getSgY(parseFloat(l.sg));
            const tempY = getTempY(parseFloat(l.tempC));
            return (
              <g key={i}>
                {/* Punto SG */}
                <circle cx={x} cy={sgY} r="4" fill="#c9b38f" stroke="#121210" strokeWidth="2" />
                <text x={x} y={sgY - 8} fill="#c9b38f" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{l.sg}</text>

                {/* Punto Temp */}
                <circle cx={x} cy={tempY} r="3" fill="#f59e0b" stroke="#121210" strokeWidth="1.5" />
                <text x={x} y={tempY + 12} fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="monospace">{l.tempC}°C</text>

                {/* Etiqueta Dia */}
                <text x={x} y={height - 10} fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="monospace">D{l.dayNum}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
"""

# Insert FermentationSvgChart into BatchDetailModal
old_batch_modal_table = """            {logs.length > 0 ? (
              <div className="space-y-2">
                <div className="brew-table-container">"""

new_batch_modal_table = """            {logs.length > 0 ? (
              <div className="space-y-3">
                <FermentationSvgChart logs={logs} og={batch.og} fgTarget={batch.fgTarget} />
                <div className="brew-table-container">"""

app_code = app_code.replace(old_batch_modal_table, new_batch_modal_table)

# Append component before render marker
marker = "// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT"
app_code = app_code.replace(marker, svg_chart_component + "\n\n" + marker)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado exitosamente con la Fase 1 (Deducción B2B y Curvas SVG).")
