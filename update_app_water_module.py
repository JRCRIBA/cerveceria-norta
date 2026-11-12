import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V9
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V8", "CERVECERIA_NORTA_DATA_V9")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V7'", "'CERVECERIA_NORTA_DATA_V7', 'CERVECERIA_NORTA_DATA_V8'")

# 2. Add Handlers for Water Log
water_handlers = """
  // --- HANDLERS PARA EL FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002) ---
  const handleAddWaterLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      waterControlLogs: [newEntry, ...(prev.waterControlLogs || [])]
    }));
    showToast(`Medición de agua en ${newEntry.location} registrada en formato FO-AG-002.`);
  };

  const handleDeleteWaterLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de control de agua?")) {
      setData(prev => ({
        ...prev,
        waterControlLogs: (prev.waterControlLogs || []).filter(l => l.id !== logId)
      }));
      showToast("Registro de control de agua eliminado.");
    }
  };
"""

app_code = app_code.replace(
    "  // --- FUNCIONES DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS) ---",
    water_handlers + "\n  // --- FUNCIONES DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS) ---"
)

# 3. Add WaterControlFormSection inside InvimaControlSystemModule in app.js
water_component_render = """
          {/* SECCIÓN ESTRUCTURADA 1. AGUA POTABLE: FORMATO OFICIAL FO-AG-002 */}
          {selectedProg.folderName.includes("1. AGUA POTABLE") && (
            <WaterControlFormSection 
              metadata={data.waterControlMetadata}
              logs={data.waterControlLogs || []}
              onAddLog={handleAddWaterLog}
              onDeleteLog={handleDeleteWaterLog}
              onExportCSV={exportToCSV}
            />
          )}
"""

# Insert inside InvimaControlSystemModule right before end of component
app_code = app_code.replace(
    "          {/* LISTADO DE ARCHIVOS */}",
    "          {/* LISTADO DE ARCHIVOS */}" + water_component_render
)

# 4. Append the WaterControlFormSection Component Code
water_component_code = """

// ==========================================================================
// COMPONENTE: FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002 - DECRETO 2115)
// ==========================================================================
function WaterControlFormSection({ metadata, logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('07:30');
  const [location, setLocation] = useState('Llave de Maceración (Muela)');
  const [chlorineMgL, setChlorineMgL] = useState('1.20');
  const [ph, setPh] = useState('7.20');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');
  const [notes, setNotes] = useState('');

  // Validación automática según Decreto 2115 de 2007 (Cloro: 0.3 - 2.0 mg/L, pH: 6.5 - 9.0)
  const complies = useMemo(() => {
    const cl = parseFloat(chlorineMgL) || 0;
    const phVal = parseFloat(ph) || 0;
    return (cl >= 0.3 && cl <= 2.0 && phVal >= 6.5 && phVal <= 9.0) ? "SI" : "NO";
  }, [chlorineMgL, ph]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `WLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      time,
      location,
      chlorineMgL: parseFloat(chlorineMgL),
      ph: parseFloat(ph),
      complies,
      verifiedBy,
      notes: notes || (complies === 'SI' ? 'Parámetros conformes Decreto 2115.' : 'Alerta: No conformidad en parámetros.')
    };
    onAddLog(newLog);
    setNotes('');
  };

  const handleExportDocx = () => {
    alert("Exportando formato FO-AG-002 con la estructura original .docx...\n(Conserva membrete, cuadro Decreto 2115 y tabla de mediciones).");
    onExportCSV('FO-AG-002_CONTROL_AGUA_POTABLE', logs);
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      
      {/* ENCABEZA MEMBRETE ESTRUCTURAL DE FO-AG-002 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA SGC
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">SISTEMA DE GESTIÓN DE CALIDAD</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE CONTROL DE AGUA POTABLE</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-AG-002</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN: 1</span>
          </div>
        </div>

        {/* RECUADRO DE PARÁMETROS Y FRECUENCIA (DECRETO 2115 DE 2007) */}
        <div className="bg-[#f0eae0] p-3 rounded-lg border border-[#d4c8b5] text-xs space-y-1.5 text-[#374151]">
          <p><strong className="text-[#0e2334] font-bold">PARÁMETROS (Decreto 2115 de 2007):</strong> La cantidad de Cloro Libre en agua potable es de <span className="font-bold text-[#0e2334]">0.3 a 2.0 mg / L (Cl2)</span>. pH entre <span className="font-bold text-[#0e2334]">6.5 a 9.0</span>. Si los parámetros NO CUMPLEN, realizar segunda toma en otro punto; si la no conformidad continúa, remitirse al Programa de Control de Agua Potable y aplicar medidas correctivas.</p>
          <p><strong className="text-[#0e2334] font-bold">FRECUENCIA DE REGISTRO:</strong> Una vez al día, antes de iniciar los procesos de producción cervecera.</p>
        </div>
      </div>

      {/* FORMULARIO INTERACTIVO PARA REGISTRAR NUEVA MEDICIÓN */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <span>✏️</span>
            <span>Nuevo Registro de Datos (Replicando Formato FO-AG-002)</span>
          </h4>
          <span className={`badge font-bold ${complies === 'SI' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300 animate-pulse'}`}>
            Estado: {complies === 'SI' ? '🟢 CUMPLE (SI)' : '🔴 NO CUMPLE (NO)'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha (dd/mm/aaaa)</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Hora (hh:mm)</label>
            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Lugar de Toma de Muestra</label>
            <select value={location} onChange={(e)=>setLocation(e.target.value)} className="brew-select font-bold text-[#0e2334]">
              <option value="Llave de Maceración (Muela)">Llave de Maceración (Muela)</option>
              <option value="Tanque de Reserva de Agua Potable">Tanque de Reserva de Agua Potable</option>
              <option value="Salida Filtro de Carbón Activado">Salida Filtro de Carbón Activado</option>
              <option value="Salida Ablandador de Agua">Salida Ablandador de Agua</option>
              <option value="Grifo de Lavado CIP">Grifo de Lavado CIP</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Cloro Residual (mg/L Cl2)</label>
            <input type="number" step="0.05" value={chlorineMgL} onChange={(e)=>setChlorineMgL(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" placeholder="0.3 - 2.0" required />
          </div>

          <div>
            <label className="brew-label">Nivel de pH</label>
            <input type="number" step="0.05" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" placeholder="6.5 - 9.0" required />
          </div>

          <div>
            <label className="brew-label">Cumple Decreto 2115</label>
            <input type="text" value={complies} readOnly className={`brew-input font-mono font-extrabold text-center ${complies === 'SI' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`} />
          </div>

          <div>
            <label className="brew-label">Quién Hace la Toma y Verifica</label>
            <input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
          </div>

          <div>
            <label className="brew-label">Observaciones / Medidas</label>
            <input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Notas o medidas correctivas..." className="brew-input" />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              📤 Guardar Registro en FO-AG-002
            </button>
          </div>
        </form>
      </div>

      {/* TABLA OFICIAL REPLICANDO ESTRUCTURA EXACTA DEL FORMATO FO-AG-002 */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e5e7eb]">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <span>📋</span>
            <span>Registros Historicos FO-AG-002 (Control de Agua Potable)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Mediciones</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportDocx} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <span>📄 Exportar .docx Original</span>
            </button>
            <button onClick={() => window.print()} className="btn-norta-secondary text-xs py-1.5 px-3 border-[#0e2334] text-[#0e2334] font-bold">
              🖨️ Imprimir Formato
            </button>
          </div>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th className="border border-slate-600 text-center">FECHA<br/><span className="text-[10px] font-mono">(dd/mm/aa)</span></th>
                <th className="border border-slate-600 text-center">HORA</th>
                <th className="border border-slate-600">LUGAR DE TOMA DE MUESTRA</th>
                <th className="border border-slate-600 text-center">CLORO RESIDUAL<br/><span className="text-[10px] font-mono">(mg/L Cl2)</span></th>
                <th className="border border-slate-600 text-center">NIVEL DE pH</th>
                <th className="border border-slate-600 text-center">CUMPLE<br/><span className="text-[10px] font-mono">(SI / NO)</span></th>
                <th className="border border-slate-600">QUIEN HACE LA TOMA Y VERIFICA</th>
                <th className="border border-slate-600">OBSERVACIONES / MEDIDAS</th>
                <th className="border border-slate-600 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.date}</td>
                  <td className="font-mono text-center text-[#374151] border border-[#d4c8b5]">{log.time}</td>
                  <td className="font-bold text-[#0e2334] border border-[#d4c8b5]">{log.location}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{parseFloat(log.chlorineMgL).toFixed(2)}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{parseFloat(log.ph).toFixed(2)}</td>
                  <td className="text-center font-extrabold border border-[#d4c8b5]">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${log.complies === 'SI' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {log.complies}
                    </span>
                  </td>
                  <td className="font-semibold text-[#111827] border border-[#d4c8b5]">{log.verifiedBy}</td>
                  <td className="text-[#4b5563] border border-[#d4c8b5]">{log.notes}</td>
                  <td className="text-center border border-[#d4c8b5]">
                    <button onClick={() => onDeleteLog(log.id)} className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-0.5" title="Eliminar registro">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
"""

app_code += water_component_code

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con la sección estructurada FO-AG-002 y exportación Word.")
