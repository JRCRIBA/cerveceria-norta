// ==========================================================================
// CERVECERÍA NORTA - REACT APPLICATION CORE (ENTERPRISE V5.0)
// ==========================================================================

const { useState, useEffect, useMemo } = React;

// ==========================================================================
// COMPONENTE: NavItem
// ==========================================================================
function NavItem({ icon, label, active, badge, badgeColor, onClick, theme }) {
  const activeClass = theme === 'dark'
    ? 'bg-gradient-to-r from-[#b89764]/25 to-[#4d3720]/30 text-[#fbfbfa] border border-[#b89764]/50 shadow-sm font-bold'
    : 'bg-[#0a1926] text-white border border-[#0a1926] shadow-md font-bold';
  const inactiveClass = theme === 'dark'
    ? 'text-[#b5ada0] hover:text-[#fbfbfa] hover:bg-[#262420]'
    : 'text-[#4d3720] hover:text-[#0a1926] hover:bg-[#e6dfce] font-semibold';

  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${active ? activeClass : inactiveClass}`}>
      <div className="flex items-center gap-3"><span className="text-base">{icon}</span><span className="truncate">{label}</span></div>
      {badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${badgeColor || (theme === 'dark' ? 'bg-[#262420] text-[#dfcaa7] border border-[#b89764]/30' : 'bg-[#e2d8c3] text-[#0a1926]')}`}>{badge}</span>}
    </button>
  );
}




// ==========================================================================
// MÓDULO NUEVO: DOCUMENTOS DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS OFICIALES)
// ==========================================================================

// ==========================================================================
// COMPONENTE: WaterControlFormSection
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
    alert("Exportando formato FO-AG-002 con la estructura original .docx...\\n(Conserva membrete, cuadro Decreto 2115 y tabla de mediciones).");
    onExportCSV('FO-AG-002_CONTROL_AGUA_POTABLE', logs);
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      
      {/* ENCABEZA MEMBRETE ESTRUCTURAL DE FO-AG-002 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-medium)]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA SGC
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">SISTEMA DE GESTIÓN DE CALIDAD</span>
              <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">FORMATO DE CONTROL DE AGUA POTABLE</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[var(--text-primary)]">CÓDIGO: FO-AG-002</span>
            <span className="block text-[var(--text-muted)]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN: 1</span>
          </div>
        </div>

        {/* RECUADRO DE PARÁMETROS Y FRECUENCIA (DECRETO 2115 DE 2007) */}
        <div className="bg-[var(--bg-elevated)] p-3 rounded-lg border border-[var(--border-subtle)] text-xs space-y-1.5 text-[var(--text-secondary)]">
          <p><strong className="text-[var(--text-primary)] font-bold">PARÁMETROS (Decreto 2115 de 2007):</strong> La cantidad de Cloro Libre en agua potable es de <span className="font-bold text-[var(--text-primary)]">0.3 a 2.0 mg / L (Cl2)</span>. pH entre <span className="font-bold text-[var(--text-primary)]">6.5 a 9.0</span>. Si los parámetros NO CUMPLEN, realizar segunda toma en otro punto; si la no conformidad continúa, remitirse al Programa de Control de Agua Potable y aplicar medidas correctivas.</p>
          <p><strong className="text-[var(--text-primary)] font-bold">FRECUENCIA DE REGISTRO:</strong> Una vez al día, antes de iniciar los procesos de producción cervecera.</p>
        </div>
      </div>

      {/* FORMULARIO INTERACTIVO PARA REGISTRAR NUEVA MEDICIÓN */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
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
            <select value={location} onChange={(e)=>setLocation(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]">
              <option value="Llave de Maceración (Muela)">Llave de Maceración (Muela)</option>
              <option value="Tanque de Reserva de Agua Potable">Tanque de Reserva de Agua Potable</option>
              <option value="Salida Filtro de Carbón Activado">Salida Filtro de Carbón Activado</option>
              <option value="Salida Ablandador de Agua">Salida Ablandador de Agua</option>
              <option value="Grifo de Lavado CIP">Grifo de Lavado CIP</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Cloro Residual (mg/L Cl2)</label>
            <input type="number" step="0.05" value={chlorineMgL} onChange={(e)=>setChlorineMgL(e.target.value)} className="brew-input font-mono font-bold text-[var(--text-primary)]" placeholder="0.3 - 2.0" required />
          </div>

          <div>
            <label className="brew-label">Nivel de pH</label>
            <input type="number" step="0.05" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold text-[var(--text-primary)]" placeholder="6.5 - 9.0" required />
          </div>

          <div>
            <label className="brew-label">Cumple Decreto 2115</label>
            <input type="text" value={complies} readOnly className={`brew-input font-mono font-extrabold text-center ${complies === 'SI' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`} />
          </div>

          <div>
            <label className="brew-label">Quién Hace la Toma y Verifica</label>
            <input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-semibold text-[var(--text-primary)]" required />
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
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--border-subtle)]">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>📋</span>
            <span>Registros Historicos FO-AG-002 (Control de Agua Potable)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Mediciones</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportDocx} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <span>📄 Exportar .docx Original</span>
            </button>
            <button onClick={() => window.print()} className="btn-norta-secondary text-xs py-1.5 px-3 border-[var(--border-medium)] text-[var(--text-primary)] font-bold">
              🖨️ Imprimir Formato
            </button>
          </div>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
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
                <tr key={log.id} className="hover:bg-[var(--bg-card)] text-xs">
                  <td className="font-mono text-center font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.date}</td>
                  <td className="font-mono text-center text-[var(--text-secondary)] border border-[var(--border-subtle)]">{log.time}</td>
                  <td className="font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.location}</td>
                  <td className="font-mono text-center font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{parseFloat(log.chlorineMgL).toFixed(2)}</td>
                  <td className="font-mono text-center font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{parseFloat(log.ph).toFixed(2)}</td>
                  <td className="text-center font-extrabold border border-[var(--border-subtle)]">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${log.complies === 'SI' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {log.complies}
                    </span>
                  </td>
                  <td className="font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.verifiedBy}</td>
                  <td className="text-[var(--text-muted)] border border-[var(--border-subtle)]">{log.notes}</td>
                  <td className="text-center border border-[var(--border-subtle)]">
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




// ==========================================================================
// COMPONENTE: FORMATO DE INGRESO DE MATERIALES (FO-ALM-001 - ALMACENAMIENTO)
// ==========================================================================
function StorageIngressFormSection({ metadata, logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [product, setProduct] = useState('Malta Pale Ale 2-Row (Sacos 25kg)');
  const [batchLot, setBatchLot] = useState('MAL-AND-2026-09');
  const [quantity, setQuantity] = useState('500 kg');
  const [supplier, setSupplier] = useState('Maltería Andina S.A.S.');
  const [expiryDate, setExpiryDate] = useState('2027-08-30');
  const [notes, setNotes] = useState('Empaques e inspección de calidad conformes.');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: `SLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      product,
      batchLot,
      quantity,
      supplier,
      expiryDate,
      notes,
      responsible
    };
    onAddLog(newLog);
  };

  const handleExportExcel = () => {
    alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");
    onExportCSV('FO-ALM-001_INGRESO_MATERIALES', logs);
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      
      {/* ENCABEZADO MEMBRETE OFICIAL DE FO-ALM-001 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-medium)]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA ALM
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">PROGRAMA DE ALMACENAMIENTO</span>
              <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">Formato de Ingreso de Materiales</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[var(--text-primary)]">CÓDIGO: FO-ALM-001</span>
            <span className="block text-[var(--text-muted)]">ELABORACIÓN: DICIEMBRE 2025</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>

        <div className="bg-[var(--bg-elevated)] p-3 rounded-lg border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
          <p><strong className="text-[var(--text-primary)] font-bold">OBJETIVO DE ALMACENAMIENTO:</strong> Registro y control de ingreso de materias primas, insumos y empaques en la bodega principal de Cervecería NORTA, garantizando la inspección de lotes, vida útil y condiciones sanitarias de recepción.</p>
        </div>
      </div>

      {/* FORMULARIO DE INGRESO DE MATERIALES */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>📦</span>
            <span>Nuevo Registro de Ingreso (Replicando Formato FO-ALM-001)</span>
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Ingreso</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Producto / Material</label>
            <input type="text" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="Ej: Malta Pilsner Premium (Sacos 25kg)" className="brew-input font-semibold text-[var(--text-primary)]" required />
          </div>

          <div>
            <label className="brew-label">Lote del Proveedor</label>
            <input type="text" value={batchLot} onChange={(e)=>setBatchLot(e.target.value)} placeholder="Ej: MAL-AND-2026-09" className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Cantidad Ingresa</label>
            <input type="text" value={quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder="Ej: 500 kg / 25 kg / 2,400 uds" className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Proveedor</label>
            <select value={supplier} onChange={(e)=>setSupplier(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]">
              <option value="Maltería Andina S.A.S.">Maltería Andina S.A.S.</option>
              <option value="Weyermann Specialty">Weyermann Specialty</option>
              <option value="Yakima Chief Hops">Yakima Chief Hops</option>
              <option value="Fermentis">Fermentis</option>
              <option value="Envases Rústicos S.A.">Envases Rústicos S.A.</option>
              <option value="Crown Can Packaging">Crown Can Packaging</option>
              <option value="Químicos Industriales S.A.">Químicos Industriales S.A.</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Fecha de Vencimiento</label>
            <input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Responsable que Recibe</label>
            <input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-semibold text-[var(--text-primary)]" required />
          </div>

          <div>
            <label className="brew-label">Observaciones / Estado</label>
            <input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Ej: Empaques sellados e inspeccionados..." className="brew-input" />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              📦 Registrar Ingreso de Material
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA REPLICANDO FORMATO EXCEL FO-ALM-001 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[var(--border-subtle)]">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>📋</span>
            <span>Registros Historicos FO-ALM-001 (Ingreso de Materiales)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Entradas</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportExcel} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <span>📊 Exportar Excel (.xlsx) Original</span>
            </button>
            <button onClick={() => window.print()} className="btn-norta-secondary text-xs py-1.5 px-3 border-[var(--border-medium)] text-[var(--text-primary)] font-bold">
              🖨️ Imprimir Formato
            </button>
          </div>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th className="border border-slate-600 text-center">FECHA DE INGRESO</th>
                <th className="border border-slate-600">PRODUCTO / MATERIAL</th>
                <th className="border border-slate-600 text-center">LOTE PROVEEDOR</th>
                <th className="border border-slate-600 text-center">CANTIDAD</th>
                <th className="border border-slate-600">PROVEEDOR</th>
                <th className="border border-slate-600 text-center">VENCIMIENTO</th>
                <th className="border border-slate-600">OBSERVACIONES</th>
                <th className="border border-slate-600">RESPONSABLE</th>
                <th className="border border-slate-600 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--bg-card)] text-xs">
                  <td className="font-mono text-center font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.product}</td>
                  <td className="font-mono text-center font-bold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.batchLot}</td>
                  <td className="font-mono text-center font-extrabold text-emerald-700 border border-[var(--border-subtle)]">{log.quantity}</td>
                  <td className="font-semibold text-[var(--text-secondary)] border border-[var(--border-subtle)]">{log.supplier}</td>
                  <td className="font-mono text-center text-[#6b7280] border border-[var(--border-subtle)]">{log.expiryDate}</td>
                  <td className="text-[var(--text-muted)] border border-[var(--border-subtle)]">{log.notes}</td>
                  <td className="font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)]">{log.responsible}</td>
                  <td className="text-center border border-[var(--border-subtle)]">
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




// ==========================================================================
// MÓDULO 3: CALIBRACIÓN & VERIFICACIÓN DE pH-METRO (BPM-FO-27 / BPM-FO-26)
// ==========================================================================
function CalibrationModuleSection({ phLogs, schedule, onAddPhLog, onDeletePhLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [buffer4Reading, setBuffer4Reading] = useState('4.02');
  const [buffer4Temp, setBuffer4Temp] = useState('20.0');
  const [buffer7Reading, setBuffer7Reading] = useState('7.01');
  const [buffer7Temp, setBuffer7Temp] = useState('20.0');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const b4Error = Math.abs(parseFloat(buffer4Reading) - 4.01).toFixed(2);
  const b7Error = Math.abs(parseFloat(buffer7Reading) - 7.01).toFixed(2);
  const status = (parseFloat(b4Error) <= 0.05 && parseFloat(b7Error) <= 0.05) ? "Conforme 🟢" : "No Conforme 🔴";

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPhLog({
      id: `PH-${Math.floor(100 + Math.random() * 900)}`,
      date,
      buffer4Reading: parseFloat(buffer4Reading),
      buffer4Temp: parseFloat(buffer4Temp),
      buffer4Error: parseFloat(b4Error),
      buffer7Reading: parseFloat(buffer7Reading),
      buffer7Temp: parseFloat(buffer7Temp),
      buffer7Error: parseFloat(b7Error),
      status,
      verifiedBy
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL DE BPM-FO-27 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-medium)]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAL
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">PROGRAMA DE CALIBRACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">VERIFICACIÓN DE pH-METRO & CRONOGRAMA DE EQUIPOS</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[var(--text-primary)]">CÓDIGO: BPM-FO-27</span>
            <span className="block text-[var(--text-muted)]">INSTRUCTIVO: BPM-IN-10</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 0</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE VERIFICACIÓN DE pH-METRO */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <span>🎯</span>
            <span>Nuevo Registro de Verificación pH-Metro (BPM-FO-27)</span>
          </h4>
          <span className={`badge font-bold ${status.includes('Conforme') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {status}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Verificación</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Lectura Buffer 4.01</label>
            <input type="number" step="0.01" value={buffer4Reading} onChange={(e)=>setBuffer4Reading(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Temp °C (Buffer 4.01)</label>
            <input type="number" step="0.1" value={buffer4Temp} onChange={(e)=>setBuffer4Temp(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Error Buffer 4 (calc)</label>
            <input type="text" value={`${b4Error} pH`} readOnly className="brew-input font-mono bg-slate-100 font-bold" />
          </div>

          <div>
            <label className="brew-label">Lectura Buffer 7.01</label>
            <input type="number" step="0.01" value={buffer7Reading} onChange={(e)=>setBuffer7Reading(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Temp °C (Buffer 7.01)</label>
            <input type="number" step="0.1" value={buffer7Temp} onChange={(e)=>setBuffer7Temp(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Error Buffer 7 (calc)</label>
            <input type="text" value={`${b7Error} pH`} readOnly className="brew-input font-mono bg-slate-100 font-bold" />
          </div>

          <div>
            <label className="brew-label">Verificado Por</label>
            <input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              🎯 Guardar Verificación pH-Metro
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE pH-METRO */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Registros de Resultados pH-Metro (BPM-FO-27)</h4>
          <button onClick={() => onExportCSV('VERIFICACION_PH_METRO_BPM_FO_27', phLogs)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>BUFFER 4.01</th>
                <th>TEMP (°C)</th>
                <th>ERROR (4)</th>
                <th>BUFFER 7.01</th>
                <th>TEMP (°C)</th>
                <th>ERROR (7)</th>
                <th>ESTADO</th>
                <th>VERIFICADOR</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {phLogs.map(log => (
                <tr key={log.id} className="hover:bg-[var(--bg-card)] text-xs">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-mono text-center">{log.buffer4Reading}</td>
                  <td className="font-mono text-center">{log.buffer4Temp} °C</td>
                  <td className="font-mono text-center font-bold text-emerald-700">{log.buffer4Error}</td>
                  <td className="font-mono text-center">{log.buffer7Reading}</td>
                  <td className="font-mono text-center">{log.buffer7Temp} °C</td>
                  <td className="font-mono text-center font-bold text-emerald-700">{log.buffer7Error}</td>
                  <td className="font-bold">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center">
                    <button onClick={() => onDeletePhLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRONOGRAMA DE CALIBRACIÓN DE EQUIPOS */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📅 Cronograma & Codificación de Instrumentos de Medición (BPM-FO-26)</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr className="bg-[#4d3720] text-white text-xs">
                <th>EQUIPO DE MEDICIÓN</th>
                <th>FRECUENCIA</th>
                <th>ÚLTIMA CALIBRACIÓN</th>
                <th>PRÓXIMA CALIBRACIÓN</th>
                <th>LABORATORIO / CERTIFICADOR</th>
                <th>CERTIFICADO #</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-bold text-[var(--text-primary)]">{item.equipment}</td>
                  <td className="font-mono">{item.frequency}</td>
                  <td className="font-mono">{item.lastCal}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.nextCal}</td>
                  <td>{item.lab}</td>
                  <td className="font-mono text-xs">{item.cert}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 4: CAPACITACIÓN EN INOCUIDAD & BPM (FO-CAP-001)
// ==========================================================================
function TrainingModuleSection({ schedule, attendance, onAddAttendance, onDeleteAttendance, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState('Inducción sobre las BPM (Buenas Prácticas de Manufactura)');
  const [employee, setEmployee] = useState('Ing. Julio Roberto Cristancho');
  const [nationalId, setNationalId] = useState('1.018.492.102');
  const [role, setRole] = useState('Maestro Cervecero & Planta');
  const [score, setScore] = useState('5.0');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAttendance({
      id: `TA-${Math.floor(100 + Math.random() * 900)}`,
      date,
      topic,
      employee,
      nationalId,
      role,
      score: parseFloat(score),
      status: parseFloat(score) >= 3.5 ? "Aprobado 🟢" : "Reprobado 🔴"
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL FO-CAP-001 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-medium)]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">PROGRAMA DE CAPACITACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">FORMATO DE ASISTENCIA & CRONOGRAMA DE CAPACITACIONES</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[var(--text-primary)]">CÓDIGO: FO-CAP-001</span>
            <span className="block text-[var(--text-muted)]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE ASISTENCIA Y EVALUACIÓN */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span>🎓</span>
          <span>Nuevo Registro de Asistencia a Capacitaciones</span>
        </h4>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="brew-label">Tema de Capacitación</label>
            <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]">
              <option value="Inducción sobre las BPM (Buenas Prácticas de Manufactura)">Inducción sobre las BPM (Buenas Prácticas de Manufactura)</option>
              <option value="Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)">Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)</option>
              <option value="Procedimientos POES de Limpieza y Desinfección CIP">Procedimientos POES de Limpieza y Desinfección CIP</option>
              <option value="Peligros Físicos, Químicos y Biológicos en Cerveza">Peligros Físicos, Químicos y Biológicos en Cerveza</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Fecha de Capacitación</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Nombre del Colaborador</label>
            <input type="text" value={employee} onChange={(e)=>setEmployee(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Cédula / Documento ID</label>
            <input type="text" value={nationalId} onChange={(e)=>setNationalId(e.target.value)} className="brew-input font-mono" required />
          </div>

          <div>
            <label className="brew-label">Cargo / Función</label>
            <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} className="brew-input" required />
          </div>

          <div>
            <label className="brew-label">Calificación Evaluación (1.0 a 5.0)</label>
            <input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold text-[var(--text-primary)]" required />
          </div>

          <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              🎓 Registrar Asistencia y Nota
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE ASISTENCIA */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Asistencias & Evaluaciones Registradas (FO-CAP-001)</h4>
          <button onClick={() => onExportCSV('ASISTENCIA_CAPACITACIONES_FO_CAP_001', attendance)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>TEMA</th>
                <th>COLABORADOR</th>
                <th>CÉDULA</th>
                <th>CARGO</th>
                <th>NOTA EVALUACIÓN</th>
                <th>ESTADO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(item => (
                <tr key={item.id} className="hover:bg-[var(--bg-card)] text-xs">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{item.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{item.topic}</td>
                  <td className="font-semibold">{item.employee}</td>
                  <td className="font-mono">{item.nationalId}</td>
                  <td>{item.role}</td>
                  <td className="font-mono font-bold text-center">{item.score} / 5.0</td>
                  <td className="font-bold">{item.status}</td>
                  <td className="text-center">
                    <button onClick={() => onDeleteAttendance(item.id)} className="text-red-600 font-bold text-xs">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRONOGRAMA DE CAPACITACIONES */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📅 Cronograma Anual de Capacitaciones NORTA</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead>
              <tr className="bg-[#4d3720] text-white text-xs">
                <th>ACTIVIDAD / TEMA</th>
                <th>FACILITADOR</th>
                <th>MODALIDAD</th>
                <th>DURACIÓN</th>
                <th>MES PROGRAMADO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-bold text-[var(--text-primary)]">{item.topic}</td>
                  <td>{item.instructor}</td>
                  <td>{item.modality}</td>
                  <td className="font-mono">{item.duration}</td>
                  <td className="font-mono font-bold">{item.month}</td>
                  <td className="font-bold">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 5: MANEJO INTEGRADO DE PLAGAS & HERMETIZACIÓN (PG-GC-004)
// ==========================================================================
function PestControlModuleSection({ logs, onAddPestLog, onDeletePestLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [station, setStation] = useState('Estación 1 - Puerta Recepción MP');
  const [baitStatus, setBaitStatus] = useState('Intacto 🟢');
  const [pestsObserved, setPestsObserved] = useState('Ninguna (Conforme C)');
  const [barriersStatus, setBarriersStatus] = useState('Hermético (C)');
  const [correctiveAction, setCorrectiveAction] = useState('Ninguna requerida.');
  const [technician, setTechnician] = useState('Fumigaciones Sabana Norte S.A.S.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPestLog({
      id: `PLOG-${Math.floor(100 + Math.random() * 900)}`,
      date,
      station,
      baitStatus,
      pestsObserved,
      barriersStatus,
      correctiveAction,
      technician
    });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL PG-GC-004 */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[var(--border-medium)]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA MIP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">MANEJO INTEGRADO DE PLAGAS</span>
              <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">FORMATO DE CONTROL DE PLAGAS Y HERMETIZACIÓN</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[var(--text-primary)]">CÓDIGO: PG-GC-004</span>
            <span className="block text-[var(--text-muted)]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE CONTROL DE PLAGAS */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
          <span>🐀</span>
          <span>Nuevo Registro de Inspección de Plagas & Cebos</span>
        </h4>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="brew-label">Fecha de Inspección</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-mono font-bold" required />
          </div>

          <div>
            <label className="brew-label">Estación / Trampa de Cebo</label>
            <select value={station} onChange={(e)=>setStation(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]">
              <option value="Estación 1 - Puerta Recepción MP">Estación 1 - Puerta Recepción MP</option>
              <option value="Estación 2 - Bodega de Insumos & Maltas">Estación 2 - Bodega de Insumos & Maltas</option>
              <option value="Estación 3 - Zona de Cocción & Fermentación">Estación 3 - Zona de Cocción & Fermentación</option>
              <option value="Estación 4 - Zona Externa Residuos">Estación 4 - Zona Externa Residuos</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Estado de Cebo</label>
            <select value={baitStatus} onChange={(e)=>setBaitStatus(e.target.value)} className="brew-select font-bold">
              <option value="Intacto 🟢">Intacto 🟢</option>
              <option value="Cebo Consumido (Reemplazado 🟡)">Cebo Consumido (Reemplazado 🟡)</option>
              <option value="Dañado por Humedad 🟠">Dañado por Humedad 🟠</option>
            </select>
          </div>

          <div>
            <label className="brew-label">Presencia Plagas</label>
            <input type="text" value={pestsObserved} onChange={(e)=>setPestsObserved(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Hermetización Barreras</label>
            <input type="text" value={barriersStatus} onChange={(e)=>setBarriersStatus(e.target.value)} className="brew-input font-semibold" required />
          </div>

          <div>
            <label className="brew-label">Empresa / Técnico Inspección</label>
            <input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-semibold text-[var(--text-primary)]" required />
          </div>

          <div className="sm:col-span-2">
            <label className="brew-label">Medida Correctiva / Nota</label>
            <input type="text" value={correctiveAction} onChange={(e)=>setCorrectiveAction(e.target.value)} className="brew-input" required />
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              🐀 Guardar Inspección de Plagas
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE CONTROL DE PLAGAS */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Histórico de Inspecciones de Plagas (PG-GC-004)</h4>
          <button onClick={() => onExportCSV('CONTROL_PLAGAS_PG_GC_004', logs)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead>
              <tr className="bg-[#0e2334] text-white text-xs">
                <th>FECHA</th>
                <th>ESTACIÓN DE CONTROL</th>
                <th>ESTADO CEBO</th>
                <th>PRESENCIA PLAGAS</th>
                <th>HERMETIZACIÓN</th>
                <th>MEDIDA CORRECTIVA</th>
                <th>TÉCNICO / EMPRESA</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-[var(--bg-card)] text-xs">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{log.station}</td>
                  <td className="font-semibold">{log.baitStatus}</td>
                  <td>{log.pestsObserved}</td>
                  <td>{log.barriersStatus}</td>
                  <td className="text-[var(--text-muted)]">{log.correctiveAction}</td>
                  <td className="font-semibold">{log.technician}</td>
                  <td className="text-center">
                    <button onClick={() => onDeletePestLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button>
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




// ==========================================================================
// MÓDULO 6: LIMPIEZA Y DESINFECCIÓN POES (FO-LD-001 / BPM-PR-01a25)
// ==========================================================================
function CleaningSanitationModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [area, setArea] = useState('Tanque Fermentador F-01');
  const [frequency, setFrequency] = useState('Por Lote');
  const [chemical, setChemical] = useState('Soda Cáustica 2% + Ácido Peracético 0.2%');
  const [concentration, setConcentration] = useState('200 ppm');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `LD-${Math.floor(100 + Math.random() * 900)}`, date, area, frequency, chemical, concentration, status: "Conforme 🟢", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE LIMPIEZA Y DESINFECCIÓN (FO-LD-001 / POES)</h3>
        <p className="text-xs text-[var(--text-muted)]">Registro diario de saneamiento, dosificación de productos químicos y liberación sanitaria de equipos de fermentación, cocción y envasado.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">🧹 Nuevo Registro de Sanitización POES</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Área / Equipo</label><input type="text" value={area} onChange={(e)=>setArea(e.target.value)} className="brew-input font-bold text-[var(--text-primary)]" required /></div>
          <div><label className="brew-label">Frecuencia</label><input type="text" value={frequency} onChange={(e)=>setFrequency(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Químico Sanitizante</label><input type="text" value={chemical} onChange={(e)=>setChemical(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Concentración (ppm / %)</label><input type="text" value={concentration} onChange={(e)=>setConcentration(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-2 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🧹 Guardar Registro POES</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Registros POES Limpieza & Desinfección</h4>
          <button onClick={() => onExportCSV('LIMPIEZA_DESINFECCION_FO_LD_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>ÁREA / EQUIPO</th><th>FRECUENCIA</th><th>QUÍMICO DOSIFICADO</th><th>CONCENTRACIÓN</th><th>ESTADO SANITARIO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{log.area}</td>
                  <td>{log.frequency}</td>
                  <td>{log.chemical}</td>
                  <td className="font-mono font-bold">{log.concentration}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 7: MANEJO DE RESIDUOS SÓLIDOS & ORGÁNICOS (FO-RS-001)
// ==========================================================================
function WasteManagementModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [wasteType, setWasteType] = useState('Bagazo de Malta Orgánico');
  const [quantityKg, setQuantityKg] = useState('450 kg');
  const [manager, setManager] = useState('Granja Porcina Sabana (Compostaje)');
  const [verifiedBy, setVerifiedBy] = useState('Adm. Cristian');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `RS-${Math.floor(100 + Math.random() * 900)}`, date, wasteType, quantityKg, manager, status: "Entregado 🟢", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE MANEJO DE RESIDUOS (FO-RS-001)</h3>
        <p className="text-xs text-[var(--text-muted)]">Control de disposición de bagazo de malta, trub de levadura, residuos reciclables y peligrosos de planta.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">♻️ Registro de Entrega y Disposición de Residuos</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha Entrega</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Tipo de Residuo</label><input type="text" value={wasteType} onChange={(e)=>setWasteType(e.target.value)} className="brew-input font-bold text-[var(--text-primary)]" required /></div>
          <div><label className="brew-label">Cantidad (kg / L)</label><input type="text" value={quantityKg} onChange={(e)=>setQuantityKg(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Gestor / Receptor</label><input type="text" value={manager} onChange={(e)=>setManager(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Responsable Entrega</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">♻️ Registrar Disposición</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Histórico de Control de Residuos</h4>
          <button onClick={() => onExportCSV('DISPOSICION_RESIDUOS_FO_RS_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>TIPO DE RESIDUO</th><th>CANTIDAD</th><th>GESTOR / EMPRESA RECEPTORA</th><th>ESTADO</th><th>RESPONSABLE</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{log.wasteType}</td>
                  <td className="font-mono font-bold text-emerald-700">{log.quantityKg}</td>
                  <td>{log.manager}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 8: MANTENIMIENTO PREVENTIVO & CORRECTIVO (FO-MTTO-001)
// ==========================================================================
function MaintenanceModuleSection({ logs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [equipment, setEquipment] = useState('Chiller de Glicol Principal');
  const [type, setType] = useState('Preventivo');
  const [description, setDescription] = useState('Revisión de compresión, filtros y nivel de glicol.');
  const [parts, setParts] = useState('Filtro de aire, Glicol USP');
  const [technician, setTechnician] = useState('TecniFrio Sabana S.A.S.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `MTTO-${Math.floor(100 + Math.random() * 900)}`, date, equipment, type, description, parts, technician, status: "Completado 🟢" });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE MANTENIMIENTO DE MAQUINARIA (FO-MTTO-001)</h3>
        <p className="text-xs text-[var(--text-muted)]">Histórico de mantenimientos preventivos y correctivos en marmitas, fermentadores, molino, chiller y envasadora.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">🛠️ Registro de Mantenimiento de Maquinaria</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Equipo / Maquinaria</label><input type="text" value={equipment} onChange={(e)=>setEquipment(e.target.value)} className="brew-input font-bold text-[var(--text-primary)]" required /></div>
          <div><label className="brew-label">Tipo Mantenimiento</label><select value={type} onChange={(e)=>setType(e.target.value)} className="brew-select font-bold"><option value="Preventivo">Preventivo</option><option value="Correctivo">Correctivo</option><option value="Locativo">Locativo</option></select></div>
          <div><label className="brew-label">Descripción del Trabajo</label><input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Repuestos Utilizados</label><input type="text" value={parts} onChange={(e)=>setParts(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Técnico / Empresa</label><input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🛠️ Guardar Mantenimiento</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Registros de Mantenimiento Realizado</h4>
          <button onClick={() => onExportCSV('MANTENIMIENTO_EQUIPOS_FO_MTTO_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>EQUIPO</th><th>TIPO</th><th>TRABAJO REALIZADO</th><th>REPUESTOS</th><th>TÉCNICO / EMPRESA</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{log.equipment}</td>
                  <td className="font-mono">{log.type}</td>
                  <td>{log.description}</td>
                  <td className="font-mono text-xs">{log.parts}</td>
                  <td className="font-semibold">{log.technician}</td>
                  <td className="font-bold text-emerald-700">{log.status}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 9: MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
// ==========================================================================
function SamplingModuleSection({ samplingLogs, coldLogs, onAddLog, onDeleteLog, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [sampleObject, setSampleObject] = useState('NORTA Furia (Lote LOT-2026-088)');
  const [testType, setTestType] = useState('Microbiológico & Fisicoquímico');
  const [sampleVolume, setSampleVolume] = useState('2 Botellas 500ml');
  const [lab, setLab] = useState('Biotecnología & Alimentos Lab Acreditado');
  const [verifiedBy, setVerifiedBy] = useState('Ing. Julio Roberto Cristancho');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddLog({ id: `MUE-${Math.floor(100 + Math.random() * 900)}`, date, sampleObject, testType, sampleVolume, lab, result: "Conforme 🟢", verifiedBy });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE MUESTREO & CONTROL DE CUARTOS FRÍOS (FO-MUE-001)</h3>
        <p className="text-xs text-[var(--text-muted)]">Análisis de laboratorio externo para producto terminado, agua de proceso y control diario de temperatura de cuartos fríos.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">🧪 Nuevo Registro de Muestreo de Laboratorio</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha Toma Muestra</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Objeto de Muestra (Lote/Producto)</label><input type="text" value={sampleObject} onChange={(e)=>setSampleObject(e.target.value)} className="brew-input font-bold text-[var(--text-primary)]" required /></div>
          <div><label className="brew-label">Tipo de Análisis</label><input type="text" value={testType} onChange={(e)=>setTestType(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Cantidad de Muestra</label><input type="text" value={sampleVolume} onChange={(e)=>setSampleVolume(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Laboratorio Acreditado</label><input type="text" value={lab} onChange={(e)=>setLab(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🧪 Registrar Muestreo</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Envíos & Resultados de Laboratorio (FO-MUE-001)</h4>
          <button onClick={() => onExportCSV('MUESTREO_LABORATORIO_FO_MUE_001', samplingLogs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>MUESTRA / LOTE</th><th>TIPO ANÁLISIS</th><th>CANTIDAD</th><th>LABORATORIO</th><th>RESULTADO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samplingLogs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{log.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{log.sampleObject}</td>
                  <td>{log.testType}</td>
                  <td className="font-mono">{log.sampleVolume}</td>
                  <td className="font-semibold">{log.lab}</td>
                  <td className="font-bold text-emerald-700">{log.result}</td>
                  <td className="font-semibold">{log.verifiedBy}</td>
                  <td className="text-center"><button onClick={() => onDeleteLog(log.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTRO DE CUARTOS FRÍOS */}
      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">❄️ Registro Diario de Temperatura de Cuartos Fríos (0°C a 4°C)</h4>
        <div className="brew-table-container">
          <table className="brew-table">
            <thead><tr className="bg-[#4d3720] text-white text-xs"><th>FECHA</th><th>HORA</th><th>TEMP CUARTO FRÍO 1 (MADURACIÓN)</th><th>TEMP CUARTO FRÍO 2 (BODEGA B2B)</th><th>ESTADO</th><th>RESPONSABLE</th></tr></thead>
            <tbody>
              {coldLogs.map(item => (
                <tr key={item.id} className="text-xs">
                  <td className="font-mono font-bold">{item.date}</td>
                  <td className="font-mono">{item.time}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.tempColdRoom1} °C</td>
                  <td className="font-mono font-bold text-emerald-700">{item.tempColdRoom2} °C</td>
                  <td className="font-bold">{item.status}</td>
                  <td>{item.verifiedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 10: CONTROL DE PROVEEDORES HOMOLOGADOS (FO-PROV-001)
// ==========================================================================
function SuppliersModuleSection({ suppliers, onAddSupplier, onDeleteSupplier, onExportCSV }) {
  const [name, setName] = useState('Weyermann Specialty Malts');
  const [nit, setNit] = useState('900.829.102-3');
  const [contact, setContact] = useState('Matthias Weyermann');
  const [productProvided, setProductProvided] = useState('Maltas Especiales Caramelo & Carafa');
  const [phone, setPhone] = useState('312-901-2910');
  const [email, setEmail] = useState('info@weyermann.de');
  const [score, setScore] = useState('5.0');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupplier({ id: `PROV-${Math.floor(100 + Math.random() * 900)}`, name, nit, contact, productProvided, phone, email, score: parseFloat(score), status: "Homologado 🟢" });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE EVALUACIÓN & HOMOLOGACIÓN DE PROVEEDORES (FO-PROV-001)</h3>
        <p className="text-xs text-[var(--text-muted)]">Listado maestro de proveedores autorizados de maltas, lúpulos, levaduras, empaques y químicos sanitarios.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">🏬 Registrar Nuevo Proveedor Homologado</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Nombre Proveedor</label><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="brew-input font-bold text-[var(--text-primary)]" required /></div>
          <div><label className="brew-label">NIT / ID Fiscal</label><input type="text" value={nit} onChange={(e)=>setNit(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Nombre de Contacto</label><input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Producto / Servicio</label><input type="text" value={productProvided} onChange={(e)=>setProductProvided(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Teléfono</label><input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Correo Electrónico</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Calificación (1.0 a 5.0)</label><input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div className="flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🏬 Registrar Proveedor</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Listado Maestro de Proveedores (FO-PROV-001)</h4>
          <button onClick={() => onExportCSV('LISTADO_PROVEEDORES_FO_PROV_001', suppliers)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>PROVEEDOR</th><th>NIT</th><th>CONTACTO</th><th>PRODUCTO / INSUMO</th><th>TELÉFONO</th><th>CORREO</th><th>CALIFICACIÓN</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {suppliers.map(prov => (
                <tr key={prov.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-bold text-[var(--text-primary)]">{prov.name}</td>
                  <td className="font-mono">{prov.nit}</td>
                  <td>{prov.contact}</td>
                  <td className="font-semibold text-[var(--text-primary)]">{prov.productProvided}</td>
                  <td className="font-mono">{prov.phone}</td>
                  <td className="text-blue-700 underline font-mono text-[11px]">{prov.email}</td>
                  <td className="font-mono font-bold text-center">{prov.score} / 5.0</td>
                  <td className="font-bold text-emerald-700">{prov.status}</td>
                  <td className="text-center"><button onClick={() => onDeleteSupplier(prov.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO 11: TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)
// ==========================================================================
function TraceabilityModuleSection({ samples, onAddSample, onDeleteSample, onExportCSV }) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [beerName, setBeerName] = useState('NORTA Furia');
  const [batchLot, setBatchLot] = useState('LOT-2026-089');
  const [presentation, setPresentation] = useState('Botella 500ml');
  const [units, setUnits] = useState('3');
  const [shelfLocation, setShelfLocation] = useState('Estante A-3 (Contramuestras)');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');
  const [notes, setNotes] = useState('Contramuestra retenida conforme a norma INVIMA.');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSample({ id: `TRA-${Math.floor(100 + Math.random() * 900)}`, date, beerName, batchLot, presentation, units: parseInt(units), shelfLocation, responsible, notes });
  };

  return (
    <div className="mt-8 pt-6 border-t-2 border-[var(--border-medium)] space-y-6">
      <div className="brew-card p-5 bg-[var(--bg-card)] border-2 border-[var(--border-medium)]">
        <h3 className="brand-title text-lg font-extrabold text-[var(--text-primary)]">PROGRAMA DE TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)</h3>
        <p className="text-xs text-[var(--text-muted)]">Trazabilidad grain-to-glass, loteado de cerveza terminada y registro de contramuestras retenidas por lote.</p>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">🍺 Registrar Contramuestra Retenida de Lote</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha de Loteado</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Estilo / Cerveza NORTA</label><select value={beerName} onChange={(e)=>setBeerName(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]"><option value="NORTA Furia">NORTA Furia</option><option value="NORTA Picosa">NORTA Picosa</option><option value="NORTA Origen">NORTA Origen</option><option value="NORTA Briosa">NORTA Briosa</option><option value="NORTA Montana">NORTA Montana</option><option value="NORTA Tradicional">NORTA Tradicional</option></select></div>
          <div><label className="brew-label">Número de Lote (Batch)</label><input type="text" value={batchLot} onChange={(e)=>setBatchLot(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Presentación</label><input type="text" value={presentation} onChange={(e)=>setPresentation(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Unidades Retenidas</label><input type="number" value={units} onChange={(e)=>setUnits(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Ubicación Estantería</label><input type="text" value={shelfLocation} onChange={(e)=>setShelfLocation(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Responsable</label><input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Observaciones</label><input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} className="brew-input" /></div>
          <div className="sm:col-span-4 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🍺 Guardar Contramuestra</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">📋 Contramuestras de Lotes Registradas (CONTROL DE LOTEADO)</h4>
          <button onClick={() => onExportCSV('CONTRAMUESTRAS_TRAZABILIDAD_FO_TRA_001', samples)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[var(--border-medium)]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>CERVEZA NORTA</th><th>LOTE</th><th>PRESENTACIÓN</th><th>UNIDADES</th><th>UBICACIÓN EN BODEGA</th><th>RESPONSABLE</th><th>OBSERVACIONES</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samples.map(item => (
                <tr key={item.id} className="text-xs hover:bg-[var(--bg-card)]">
                  <td className="font-mono font-bold text-[var(--text-primary)]">{item.date}</td>
                  <td className="font-bold text-[var(--text-primary)]">{item.beerName}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.batchLot}</td>
                  <td className="font-mono">{item.presentation}</td>
                  <td className="font-mono font-bold text-center">{item.units} uds</td>
                  <td className="font-semibold">{item.shelfLocation}</td>
                  <td className="font-semibold">{item.responsible}</td>
                  <td className="text-[var(--text-muted)]">{item.notes}</td>
                  <td className="text-center"><button onClick={() => onDeleteSample(item.id)} className="text-red-600 font-bold text-xs">🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}




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


// ==========================================================================
// RENDERIZAR LA APLICACIÓN REACT (MONTAJE AL FINAL TRAS DEFINIR COMPONENTES)
// ==========================================================================

// ==========================================================================
// COMPONENTE: UploadInvimaDocModal
// ==========================================================================
function UploadInvimaDocModal({ programs, onClose, onSubmit }) {
  const [folderName, setFolderName] = useState(programs[0]?.folderName || '1. AGUA POTABLE');
  const [name, setName] = useState('');
  const [ext, setExt] = useState('.docx');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Por favor ingresa el nombre del documento.");
    
    const finalName = name.toLowerCase().endsWith(ext) ? name : `${name}${ext}`;
    const newDoc = {
      id: `INV-DOC-${Math.floor(100 + Math.random() * 900)}`,
      name: finalName,
      relPath: `./invima_docs/${folderName}/${finalName}`,
      size: "1.25 MB",
      extension: ext,
      type: ext === '.xlsx' ? 'Microsoft Excel' : 'Microsoft Word',
      status: "Vigente & Aprobado",
      updatedAt: new Date().toISOString().split('T')[0]
    };
    onSubmit({ folderName, ...newDoc });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[var(--text-primary)]">📤 Subir Documento INVIMA</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label">Selecciona la Carpeta / Programa Destino</label>
              <select value={folderName} onChange={(e) => setFolderName(e.target.value)} className="brew-select font-bold text-[var(--text-primary)]">
                {programs.map(p => (
                  <option key={p.id} value={p.folderName}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="brew-label">Nombre del Documento</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ej: FORMATO REGISTRO DE TEMPERATURAS - Norta"
                className="brew-input"
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label">Tipo / Formato</label>
                <select value={ext} onChange={(e) => setExt(e.target.value)} className="brew-select font-mono font-bold">
                  <option value=".docx">Documento Word (.docx)</option>
                  <option value=".xlsx">Hoja de Cálculo Excel (.xlsx)</option>
                  <option value=".pdf">Documento PDF (.pdf)</option>
                </select>
              </div>
              <div>
                <label className="brew-label">Estado de Aprobación</label>
                <input type="text" value="Vigente & Aprobado" readOnly className="brew-input bg-[#f3f4f6] font-bold text-emerald-700" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs">Subir e Indexar Documento</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// MODAL PARA CREAR NUEVAS CARPETAS/PROGRAMAS SANITARIOS

// ==========================================================================
// COMPONENTE: NewInvimaProgramModal
// ==========================================================================
function NewInvimaProgramModal({ onClose, onSubmit }) {
  const [programName, setProgramName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!programName.trim()) return alert("Por favor ingresa el nombre de la carpeta.");
    onSubmit(programName.trim());
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[var(--text-primary)]">📁 Crear Nueva Carpeta / Programa INVIMA</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label">Nombre del Programa / Carpeta Sanitarios</label>
              <input 
                type="text" 
                value={programName} 
                onChange={(e) => setProgramName(e.target.value)} 
                placeholder="Ej: 12. GESTIÓN DE ALÉRGENOS"
                className="brew-input"
                required 
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs">Crear Carpeta</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ==========================================================================
// COMPONENTE: FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002 - DECRETO 2115)
// ==========================================================================

// ==========================================================================
// COMPONENTE: NewDocumentModal
// ==========================================================================
function NewDocumentModal({ batches, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Registros INVIMA');
  const [fileName, setFileName] = useState('documento_norta.pdf');
  const [version, setVersion] = useState('v1.0');
  const [expiryDate, setExpiryDate] = useState('2028-12-31');
  const [linkedBatch, setLinkedBatch] = useState('Todos los Lotes');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      fileName,
      version,
      uploadDate: new Date().toISOString().split('T')[0],
      expiryDate,
      linkedBatch,
      status: "Vigente & Aprobado",
      verifiedBy: "Ing. Julio Roberto Cristancho",
      fileSize: "1.8 MB",
      fileType: "application/pdf"
    };
    onSubmit(newDoc);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">📄 Cargar Documento al Repositorio DMS</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Título del Documento</label><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ej: Registro Sanitario INVIMA NORTA Furia" className="brew-input" required /></div>
            <div><label className="brew-label">Categoría</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="brew-select font-bold">
                <option value="Registros INVIMA">Registros INVIMA</option>
                <option value="Certificados COA Insumos">Certificados COA Insumos</option>
                <option value="Manuales BPM & POES">Manuales BPM & POES</option>
                <option value="Carnets Sanitarios Personal">Carnets Sanitarios Personal</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Nombre de Archivo</label><input type="text" value={fileName} onChange={(e)=>setFileName(e.target.value)} className="brew-input" required /></div>
              <div><label className="brew-label">Versión</label><input type="text" value={version} onChange={(e)=>setVersion(e.target.value)} className="brew-input" required /></div>
            </div>
            <div><label className="brew-label">Fecha Caducidad</label><input type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} className="brew-input font-mono" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Cargar e Indexar Documento</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: LogFermentationModal
// ==========================================================================
function LogFermentationModal({ batch, onClose, onSubmit }) {
  const [sg, setSg] = useState(batch.currentGravity || 1.020);
  const [tempC, setTempC] = useState(batch.currentTemp || 19.5);
  const [ph, setPh] = useState(4.4);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentLogs = batch.fermentationLogs || [];
    const newLog = {
      dayNum: currentLogs.length + 1,
      date: new Date().toISOString().split('T')[0],
      sg: parseFloat(sg),
      tempC: parseFloat(tempC),
      ph: parseFloat(ph),
      notes: notes || "Lectura diaria registrada"
    };
    onSubmit(newLog);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">📈 Registrar Lectura Fermentativa ({batch.id})</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div><label className="brew-label">Densidad (SG)</label><input type="number" step="0.001" value={sg} onChange={(e)=>setSg(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">Temp (°C)</label><input type="number" step="0.1" value={tempC} onChange={(e)=>setTempC(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">pH</label><input type="number" step="0.01" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold" required /></div>
            </div>
            <div><label className="brew-label">Observaciones</label><textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Comentarios sobre aroma, purga de trub..." className="brew-textarea" rows="2"></textarea></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Guardar Lectura Time-Series</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewBatchModal
// ==========================================================================
function NewBatchModal({ recipes, tanks, onClose, onSubmit }) {
  const [recipeId, setRecipeId] = useState(recipes[0]?.id || '');
  const [tankId, setTankId] = useState('F-03');
  const [volumeLiters, setVolumeLiters] = useState(1000);
  const [brewer, setBrewer] = useState('Ing. Julio Roberto Cristancho');

  const selectedRecipe = recipes.find(r => r.id === recipeId) || recipes[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      id: `LOT-2026-${Math.floor(100 + Math.random() * 900)}`,
      recipeId,
      recipeName: selectedRecipe.name,
      style: selectedRecipe.style,
      tankId,
      volumeLiters: parseInt(volumeLiters),
      brewDate: new Date().toISOString().split('T')[0],
      targetPackDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: "Maceración",
      stageProgress: 15,
      originalGravity: selectedRecipe.og,
      currentGravity: selectedRecipe.og,
      finalGravityTarget: selectedRecipe.fg,
      currentTemp: 20.0,
      targetTemp: 19.0,
      abvCalculated: 0.0,
      abvTarget: selectedRecipe.abv,
      ibu: selectedRecipe.ibu,
      brewer,
      status: "Activo",
      dryHopStatus: "Pendiente",
      notes: `Lote NORTA iniciado con descuento automático BOM.`,
      cogsCostPerLiter: 1.45,
      fermentationLogs: [{ dayNum: 1, date: new Date().toISOString().split('T')[0], sg: selectedRecipe.og, tempC: 20.0, ph: 5.2, notes: "Inicio de cocción" }],
      maltsUsed: selectedRecipe.grains.map(g => ({ name: g.name, batchLot: "MAL-AND-2026-04", qtyKg: g.kg })),
      hopsUsed: selectedRecipe.hops.map(h => ({ name: h.name, batchLot: "HOP-YAK-2026-12", qtyG: h.g })),
      yeastUsed: selectedRecipe.yeast
    };
    onSubmit(newBatch);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">🍺 Iniciar Nuevo Lote NORTA</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Receta Maestra (Lista BOM)</label><select value={recipeId} onChange={(e)=>setRecipeId(e.target.value)} className="brew-select font-bold text-[#c9b38f]">{recipes.map(r=><option key={r.id} value={r.id}>{r.name} ({r.style})</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Tanque</label><select value={tankId} onChange={(e)=>setTankId(e.target.value)} className="brew-select font-mono">{tanks.map(t=><option key={t.id} value={t.id}>{t.id} - {t.name}</option>)}</select></div>
              <div><label className="brew-label">Volumen (Litros)</label><input type="number" value={volumeLiters} onChange={(e)=>setVolumeLiters(e.target.value)} className="brew-input font-mono font-bold" required /></div>
            </div>
            <div><label className="brew-label">Maestro Cervecero</label><input type="text" value={brewer} onChange={(e)=>setBrewer(e.target.value)} className="brew-input" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Iniciar Cocción & Descontar Insumos</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: BatchDetailModal
// ==========================================================================
function BatchDetailModal({ batch, onClose, onAdvance, onOpenLogFerment }) {
  const logs = batch.fermentationLogs || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div><span className="font-mono text-xs font-bold text-[#c9b38f]">{batch.id}</span><h3 className="brand-title text-base font-bold text-white">{batch.recipeName} ({batch.style})</h3></div>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <div className="modal-body space-y-4 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Etapa</span><p className="font-bold text-[#c9b38f] text-xs mt-0.5">{batch.stage}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Tanque</span><p className="font-mono font-bold text-white text-xs mt-0.5">{batch.tankId}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">Volumen</span><p className="font-bold text-white text-xs mt-0.5">{batch.volumeLiters} L</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">ABV</span><p className="font-bold text-emerald-400 text-xs mt-0.5">{batch.abvCalculated}%</p></div>
          </div>

          {/* VISUALIZACIÓN DE CURVA DE FERMENTACIÓN (TIME-SERIES) */}
          <div className="p-4 bg-[#181816] rounded-xl border border-[#2d2a24]">
            <div className="flex justify-between items-center mb-3">
              <h4 className="brand-title font-bold text-[#c9b38f] text-xs">📈 Histórico & Curva Fermentativa (Beer30 Style)</h4>
              <button onClick={() => { onClose(); onOpenLogFerment(); }} className="btn-norta-secondary text-[11px] py-1 px-2">
                + Registrar Lectura SG
              </button>
            </div>
            
            {logs.length > 0 ? (
              <div className="space-y-3">
                <FermentationSvgChart logs={logs} og={batch.og} fgTarget={batch.fgTarget} />
                <div className="brew-table-container">
                  <table className="brew-table text-[11px]">
                    <thead><tr><th>Día</th><th>Fecha</th><th>Densidad (SG)</th><th>Temp (°C)</th><th>pH</th><th>Notas</th></tr></thead>
                    <tbody>
                      {logs.map((l, i) => (
                        <tr key={i}>
                          <td className="font-bold text-[#c9b38f]">Día {l.dayNum}</td>
                          <td className="font-mono text-[#a39e93]">{l.date}</td>
                          <td className="font-mono font-bold text-emerald-400">{l.sg}</td>
                          <td className="font-mono text-slate-300">{l.tempC}°C</td>
                          <td className="font-mono text-blue-300">{l.ph}</td>
                          <td className="text-slate-400">{l.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : <p className="text-slate-400 italic">No hay lecturas time-series registradas aún.</p>}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-norta-secondary text-xs">Cerrar</button>
          {batch.status === 'Activo' && <button onClick={onAdvance} className="btn-norta-primary text-xs">Avanzar Etapa ➔</button>}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: TankDetailModal
// ==========================================================================
function TankDetailModal({ tank, onClose, onUpdate }) {
  const [status, setStatus] = useState(tank.status);
  const [temp, setTemp] = useState(tank.tempC);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">⚙️ Ajustes {tank.name}</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <div className="modal-body space-y-3">
          <div><label className="brew-label">Estado</label><select value={status} onChange={(e)=>setStatus(e.target.value)} className="brew-select font-bold text-[#c9b38f]"><option value="Fermentando">Fermentando</option><option value="Madurando">Madurando</option><option value="Cold Crash">Cold Crash</option><option value="Listo para Envasar">Listo para Envasar</option><option value="Pendiente CIP">Pendiente CIP</option><option value="CIP Aprobado">CIP Aprobado</option></select></div>
          <div><label className="brew-label">Temp (°C)</label><input type="number" step="0.5" value={temp} onChange={(e)=>setTemp(e.target.value)} className="brew-input font-mono font-bold" /></div>
        </div>
        <div className="modal-footer"><button onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button onClick={() => onUpdate(tank.id, status, temp)} className="btn-norta-primary text-xs">Guardar Ajustes</button></div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewOrderModal
// ==========================================================================
function NewOrderModal({ clients, finishedGoods, onClose, onSubmit }) {
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [selectedProduct, setSelectedProduct] = useState(finishedGoods[0]?.name || '');
  const [qty, setQty] = useState(2);
  const selectedClient = clients.find(c => c.id === clientId) || clients[0];
  const prod = finishedGoods.find(f => f.name === selectedProduct) || finishedGoods[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    const total = (prod ? prod.wholesalePrice : 100) * qty;
    const newOrder = { id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`, clientName: selectedClient.name, date: new Date().toISOString().split('T')[0], items: `${qty}x ${selectedProduct}`, totalAmountUSD: total, status: "En Preparación", paymentStatus: "Pendiente", deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] };
    onSubmit(newOrder);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">📝 Venta B2B Directa</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Cliente</label><select value={clientId} onChange={(e)=>setClientId(e.target.value)} className="brew-select font-bold">{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="brew-label">Producto</label><select value={selectedProduct} onChange={(e)=>setSelectedProduct(e.target.value)} className="brew-select">{finishedGoods.map(fg=><option key={fg.id} value={fg.name}>{fg.name}</option>)}</select></div>
              <div><label className="brew-label">Cantidad</label><input type="number" min="1" value={qty} onChange={(e)=>setQty(parseInt(e.target.value))} className="brew-input font-bold" required /></div>
            </div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Generar Venta B2B</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewCipModal
// ==========================================================================
function NewCipModal({ tanks, onClose, onSubmit }) {
  const [equipment, setEquipment] = useState(tanks[0]?.name || 'Fermentador F-01');
  const [operator, setOperator] = useState('Adm. Cristian');
  const [temp, setTemp] = useState(76.0);
  const [rlu, setRlu] = useState(7);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCip = { id: `CIP-2026-${Math.floor(100 + Math.random() * 900)}`, date: new Date().toISOString().replace('T', ' ').slice(0, 16), equipment, operator, cycleType: "Lavado Completo Cáustica + Peracético", causticTempC: parseFloat(temp), causticConcentrationPct: "2.0%", peraceticConcentrationPpm: 200, rinseFinalPh: 7.0, swabAdenosineTriphosphateRlu: parseInt(rlu), status: "Aprobado Sanitariamente", supervisor: "Ing. Julio Roberto Cristancho" };
    onSubmit(newCip);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">🧼 Registrar Limpieza CIP</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Equipo Intervenido</label><select value={equipment} onChange={(e)=>setEquipment(e.target.value)} className="brew-select font-bold">{tanks.map(t=><option key={t.id} value={t.name}>{t.name}</option>)}</select></div>
            <div><label className="brew-label">Operador Responsable</label><input type="text" value={operator} onChange={(e)=>setOperator(e.target.value)} className="brew-input" required /></div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Aprobar CIP</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewLabModal
// ==========================================================================
function NewLabModal({ batches, onClose, onSubmit }) {
  const [batchId, setBatchId] = useState(batches[0]?.id || '');
  const [ph, setPh] = useState(4.30);
  const [doPpb, setDoPpb] = useState(25);
  const [sensory, setSensory] = useState(95);
  const selectedBatch = batches.find(b => b.id === batchId) || batches[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTest = { id: `LAB-2026-${Math.floor(100 + Math.random() * 900)}`, batchId, date: new Date().toISOString().split('T')[0], style: selectedBatch ? selectedBatch.recipeName : "Cerveza NORTA", tank: selectedBatch ? selectedBatch.tankId : "F-01", ph: parseFloat(ph), dissolvedOxygenPpb: parseInt(doPpb), carbonationVolCo2: 2.50, turbidityNtu: 25.0, diacetylSensoryScore: "0 / 5 (Ausente)", sensoryScore100: parseInt(sensory), analyst: "Ing. Julio Roberto Cristancho", overallVerdict: "Conforme a Calidad NORTA" };
    onSubmit(newTest);
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><h3 className="brand-title text-base font-bold text-[#c9b38f]">🔬 Test de Calidad & Cata</h3><button onClick={onClose} className="text-slate-400">✕</button></div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div><label className="brew-label">Lote</label><select value={batchId} onChange={(e)=>setBatchId(e.target.value)} className="brew-select font-bold">{batches.map(b=><option key={b.id} value={b.id}>{b.id} - {b.recipeName}</option>)}</select></div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="brew-label">pH</label><input type="number" step="0.01" value={ph} onChange={(e)=>setPh(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">DO (ppb)</label><input type="number" value={doPpb} onChange={(e)=>setDoPpb(e.target.value)} className="brew-input font-mono font-bold" required /></div>
              <div><label className="brew-label">Puntaje Cata</label><input type="number" value={sensory} onChange={(e)=>setSensory(e.target.value)} className="brew-input font-mono font-bold text-[#c9b38f]" required /></div>
            </div>
          </div>
          <div className="modal-footer"><button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button><button type="submit" className="btn-norta-primary text-xs">Guardar Test</button></div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewClientModal
// ==========================================================================
function NewClientModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Gastrobar Premium');
  const [city, setCity] = useState('Bogotá D.C.');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditLimit, setCreditLimit] = useState(5000000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      id: `CLI-B2B-${Math.floor(100 + Math.random() * 900)}`,
      name,
      type,
      city,
      contactName,
      phone,
      pinCode: `${Math.floor(1000 + Math.random() * 9000)}`,
      creditLimit: parseFloat(creditLimit) || 0,
      totalPurchasesUSD: 0,
      kegsInPossession: 0,
      status: "Activo"
    };
    onSubmit(newClient);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[#c9b38f] flex items-center gap-2">
            <span>🤝</span>
            <span>Registrar Nuevo Cliente B2B</span>
          </h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label text-[11px]">Razón Social / Nombre Comercial</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Gastrobar El Roble" className="brew-input w-full" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label text-[11px]">Tipo de Establecimiento</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="brew-select w-full">
                  <option value="Gastrobar Premium">Gastrobar Premium</option>
                  <option value="Taproom Aliado">Taproom Aliado</option>
                  <option value="Restaurante Gourmet">Restaurante Gourmet</option>
                  <option value="Hotel Boutique">Hotel Boutique</option>
                  <option value="Distribuidor Regional">Distribuidor Regional</option>
                </select>
              </div>
              <div>
                <label className="brew-label text-[11px]">Ciudad / Ubicación</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="brew-input w-full" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label text-[11px]">Persona de Contacto</label>
                <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Ej: Carlos Gómez" className="brew-input w-full" required />
              </div>
              <div>
                <label className="brew-label text-[11px]">Teléfono / WhatsApp</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57 310..." className="brew-input w-full" required />
              </div>
            </div>
            <div>
              <label className="brew-label text-[11px]">Cupo de Crédito Inicial (COP)</label>
              <input type="number" step="100000" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} className="brew-input font-mono font-bold w-full" required />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs font-bold">Registrar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewEmployeeModal
// ==========================================================================
function NewEmployeeModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Operador de Planta');
  const [dept, setDept] = useState('Producción & Molienda');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmp = {
      id: `EMP-${Math.floor(10 + Math.random() * 90)}`,
      name,
      role,
      dept,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@norta.co`,
      phone: phone || '+57 310 000 0000',
      joinDate: new Date().toISOString().split('T')[0],
      certStatus: "Al Día"
    };
    onSubmit(newEmp);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[#c9b38f] flex items-center gap-2">
            <span>👥</span>
            <span>Nuevo Colaborador NORTA</span>
          </h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label text-[11px]">Nombre Completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Santiago Ruiz" className="brew-input w-full" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label text-[11px]">Cargo / Función</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ej: Maestro Cervecero" className="brew-input w-full" required />
              </div>
              <div>
                <label className="brew-label text-[11px]">Departamento</label>
                <select value={dept} onChange={(e) => setDept(e.target.value)} className="brew-select w-full">
                  <option value="Producción & Planta">Producción & Planta</option>
                  <option value="Calidad & Laboratorio">Calidad & Laboratorio</option>
                  <option value="Mantenimiento & Servicios">Mantenimiento & Servicios</option>
                  <option value="Logística & Almacén">Logística & Almacén</option>
                  <option value="Comercial & Taproom">Comercial & Taproom</option>
                  <option value="Administración & Finanzas">Administración & Finanzas</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label text-[11px]">Correo Corporativo</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@norta.co" className="brew-input w-full" />
              </div>
              <div>
                <label className="brew-label text-[11px]">Teléfono de Contacto</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+57 312..." className="brew-input w-full" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs font-bold">Registrar Colaborador</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: NewSanitaryRegistryModal
// ==========================================================================
function NewSanitaryRegistryModal({ onClose, onSubmit }) {
  const [code, setCode] = useState('');
  const [beer, setBeer] = useState('');
  const [validUntil, setValidUntil] = useState('2031-12-31');
  const [category, setCategory] = useState('Cerveza Especial Artesanal');
  const [status, setStatus] = useState('Vigente 🟢');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReg = {
      code: code || `INVIMA-2026-ALM-${Math.floor(1000 + Math.random() * 9000)}`,
      beer,
      validUntil,
      category,
      status
    };
    onSubmit(newReg);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="brand-title text-base font-bold text-[#c9b38f] flex items-center gap-2">
            <span>⚖️</span>
            <span>Nuevo Registro Sanitario INVIMA</span>
          </h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label text-[11px]">Nombre de la Cerveza / Referencia</label>
              <input type="text" value={beer} onChange={(e) => setBeer(e.target.value)} placeholder="Ej: NORTA Pale Ale" className="brew-input w-full" required />
            </div>
            <div>
              <label className="brew-label text-[11px]">Código Registro Sanitario INVIMA</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ej: RSA-0012345-2026" className="brew-input font-mono w-full" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="brew-label text-[11px]">Categoría INVIMA</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="brew-input w-full" required />
              </div>
              <div>
                <label className="brew-label text-[11px]">Fecha de Vencimiento</label>
                <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="brew-input font-mono w-full" required />
              </div>
            </div>
            <div>
              <label className="brew-label text-[11px]">Estado Legal</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="brew-select w-full">
                <option value="Vigente 🟢">Vigente 🟢</option>
                <option value="En Trámite de Renovación 🟡">En Trámite de Renovación 🟡</option>
                <option value="Próximo a Vencer 🟠">Próximo a Vencer 🟠</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-norta-secondary text-xs">Cancelar</button>
            <button type="submit" className="btn-norta-primary text-xs font-bold">Guardar Registro</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: RecipeDetailModal
// ==========================================================================
function RecipeDetailModal({ recipe, onClose, onBrew }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header"><div><span className="font-mono text-xs font-bold text-[#c9b38f]">{recipe.id}</span><h3 className="brand-title text-base font-bold text-white">{recipe.name} ({recipe.style})</h3></div><button onClick={onClose} className="text-slate-400">✕</button></div>
        <div className="modal-body space-y-3 text-xs">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">ABV Meta</span><p className="font-bold text-[#c9b38f] text-sm mt-0.5">{recipe.abv}%</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">IBU</span><p className="font-bold text-emerald-400 text-sm mt-0.5">{recipe.ibu}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">OG</span><p className="font-mono font-bold text-white text-sm mt-0.5">{recipe.og}</p></div>
            <div className="p-2.5 bg-[#181816] rounded-xl border border-[#2d2a24]"><span className="text-[#a39e93]">FG</span><p className="font-mono font-bold text-white text-sm mt-0.5">{recipe.fg}</p></div>
          </div>
          <div className="p-3 bg-[#181816] rounded-xl border border-[#2d2a24] space-y-1">
            <p className="font-bold text-[#c9b38f]">Insumos BOM Requeridos:</p>
            {recipe.grains.map((g, i)=><p key={i} className="text-slate-300">• Malta: {g.name} ({g.kg} kg)</p>)}
            {recipe.hops.map((h, i)=><p key={i} className="text-slate-300">• Lúpulo: {h.name} ({h.g}g - {h.timing})</p>)}
          </div>
        </div>
        <div className="modal-footer"><button onClick={onClose} className="btn-norta-secondary text-xs">Cerrar</button><button onClick={onBrew} className="btn-norta-primary text-xs">Cocinar este Lote (Descontar Insumos) ➔</button></div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: InvimaControlSystemModule
// ==========================================================================
function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onAddPhMeterLog, onDeletePhMeterLog, onAddTrainingAttendance, onDeleteTrainingAttendance, onAddPestLog, onDeletePestLog, onAddCleaningLog, onDeleteCleaningLog, onAddWasteLog, onDeleteWasteLog, onAddMaintenanceLog, onDeleteMaintenanceLog, onAddSamplingLog, onDeleteSamplingLog, onAddSupplier, onDeleteSupplier, onAddRetainedSample, onDeleteRetainedSample, onExportCSV }) {
  const programs = data.invimaControlSystem || [];
  const [selectedProgId, setSelectedProgId] = useState(programs[0]?.id || 'PRG-01');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedProg = programs.find(p => p.id === selectedProgId) || programs[0];

  const totalDocsCount = programs.reduce((acc, p) => acc + (p.files ? p.files.length : 0), 0);

  // Filtrado de archivos por búsqueda
  const displayedFiles = useMemo(() => {
    if (!selectedProg || !selectedProg.files) return [];
    if (!searchTerm.trim()) return selectedProg.files;
    return selectedProg.files.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedProg, searchTerm]);

  return (
    <div className="space-y-6">
      {/* HEADER INSTITUCIONAL DEL MÓDULO INVIMA */}
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#3a452d]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-dorado font-bold">Sistema de Control Sanitario INVIMA</span>
            <span className="text-xs text-[#c9b38f] font-mono">11 Programas • {totalDocsCount} Documentos Oficiales</span>
          </div>
          <h2 className="brand-title text-2xl font-bold text-white tracking-wide">Documentos del Sistema de Control INVIMA</h2>
          <p className="text-xs text-[#a39e93] mt-1">Estructura oficial de los 11 programas de control de inocuidad (Agua Potable, Almacenamiento, Calibración, Capacitación, Plagas, Limpieza, Residuos, Mantenimiento, Muestreo, Proveedores y Trazabilidad).</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenUploadDoc} className="btn-norta-primary text-xs font-bold shadow">
            📤 Subir Documento INVIMA
          </button>
          <button onClick={onOpenNewProgram} className="btn-norta-secondary text-xs font-bold border-white text-white">
            📁 + Nueva Carpeta
          </button>
        </div>
      </div>

      {/* SELECTOR / GRILLA DE LAS 11 CARPETAS Y PROGRAMAS SANITARIOS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="brand-title text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Carpetas & Programas Sanitarios ({programs.length})</h3>
          <span className="text-xs text-[var(--text-muted)] font-mono">Selecciona una carpeta para explorar sus archivos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {programs.map(prog => {
            const isSelected = selectedProgId === prog.id;
            return (
              <div 
                key={prog.id} 
                onClick={() => { setSelectedProgId(prog.id); setSearchTerm(''); }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-gradient-to-br from-[#b89764] to-[#8c734b] text-[#121210] border-[#b89764] shadow-lg shadow-[#b89764]/25 scale-105 font-bold' 
                    : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[#b89764] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📁</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${isSelected ? 'bg-[#121210] text-[#fbfbfa]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'}`}>
                    {prog.files ? prog.files.length : 0} archivos
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-snug line-clamp-2">{prog.title}</h4>
                  <p className={`text-[10px] mt-1 ${isSelected ? 'text-[#2a2010] font-semibold' : 'text-[var(--text-muted)]'}`}>{prog.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONTENIDO DE LA CARPETA SELECCIONADA */}
      {selectedProg && (
        <div className="brew-card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📂</span>
                <h3 className="brand-title text-lg font-bold text-[var(--text-primary)]">{selectedProg.title}</h3>
                <span className="badge badge-dorado text-xs font-mono">{selectedProg.files ? selectedProg.files.length : 0} Archivos Registrados</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">Ruta Origen: <code className="font-mono text-[11px] text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2 py-0.5 rounded mr-2">Documents\jr bk\Norta\{selectedProg.folderName}</code> | Ruta Local: <code className="font-mono text-[11px] text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">invima_docs/{selectedProg.folderName}</code></p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar archivo en esta carpeta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="brew-input text-xs pl-8 pr-3 py-1.5 w-64 focus:outline-none"
                />
                <span className="absolute left-2.5 top-2 text-[var(--text-muted)] text-xs">🔍</span>
              </div>

              <button onClick={onOpenUploadDoc} className="btn-norta-primary text-xs py-1.5 px-3">
                + Subir a esta carpeta
              </button>
            </div>
          </div>

          {/* LISTADO DE ARCHIVOS */}
          
          
          {/* SECCIÓN ESTRUCTURADA 3. CALIBRACIÓN: FORMATO OFICIAL BPM-FO-27 & CRONOGRAMA */}
          {selectedProg.folderName.includes("3. CALIBRACION") && (
            <CalibrationModuleSection 
              phLogs={data.phMeterLogs || []}
              schedule={data.calibrationSchedule || []}
              onAddPhLog={onAddPhMeterLog}
              onDeletePhLog={onDeletePhMeterLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 4. CAPACITACIÓN: ASISTENCIA Y CRONOGRAMA FO-CAP-001 */}
          {selectedProg.folderName.includes("4. CAPACITACION") && (
            <TrainingModuleSection 
              schedule={data.trainingSchedule || []}
              attendance={data.trainingAttendance || []}
              onAddAttendance={onAddTrainingAttendance}
              onDeleteAttendance={onDeleteTrainingAttendance}
              onExportCSV={onExportCSV}
            />
          )}

          
          {/* SECCIÓN ESTRUCTURADA 6. LIMPIEZA Y DESINFECCIÓN: FO-LD-001 */}
          {selectedProg.folderName.includes("6. LIMPIEZA Y DESINFECCI") && (
            <CleaningSanitationModuleSection logs={data.cleaningSanitationLogs || []} onAddLog={onAddCleaningLog} onDeleteLog={onDeleteCleaningLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 7. MANEJO DE RESIDUOS: FO-RS-001 */}
          {selectedProg.folderName.includes("7. MANEJO DE RESIDUOS") && (
            <WasteManagementModuleSection logs={data.wasteManagementLogs || []} onAddLog={onAddWasteLog} onDeleteLog={onDeleteWasteLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 8. MANTENIMIENTO: FO-MTTO-001 */}
          {selectedProg.folderName.includes("8. MANTENIMIENTO") && (
            <MaintenanceModuleSection logs={data.maintenanceLogs || []} onAddLog={onAddMaintenanceLog} onDeleteLog={onDeleteMaintenanceLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 9. MUESTREO & CUARTOS FRÍOS: FO-MUE-001 */}
          {selectedProg.folderName.includes("9. MUESTREO") && (
            <SamplingModuleSection samplingLogs={data.samplingLogs || []} coldLogs={data.coldRoomLogs || []} onAddLog={onAddSamplingLog} onDeleteLog={onDeleteSamplingLog} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 10. PROVEEDORES: FO-PROV-001 */}
          {selectedProg.folderName.includes("10. PROVEEDORES") && (
            <SuppliersModuleSection suppliers={data.suppliersList || []} onAddSupplier={onAddSupplier} onDeleteSupplier={onDeleteSupplier} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 11. TRAZABILIDAD & CONTRAMUESTRAS: FO-TRA-001 */}
          {selectedProg.folderName.includes("11. TRAZABILIDAD") && (
            <TraceabilityModuleSection samples={data.retainedSamplesLogs || []} onAddSample={onAddRetainedSample} onDeleteSample={onDeleteRetainedSample} onExportCSV={onExportCSV} />
          )}

          {/* SECCIÓN ESTRUCTURADA 5. CONTROL DE PLAGAS: FORMATO PG-GC-004 */}
          {selectedProg.folderName.includes("5. CONTROL DE PLAGAS") && (
            <PestControlModuleSection 
              logs={data.pestControlLogs || []}
              onAddPestLog={onAddPestLog}
              onDeletePestLog={onDeletePestLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 2. ALMACENAMIENTO: FORMATO OFICIAL FO-ALM-001 */}
          {selectedProg.folderName.includes("2. ALMACENAMIENTO") && (
            <StorageIngressFormSection 
              metadata={data.storageIngressMetadata}
              logs={data.storageIngressLogs || []}
              onAddLog={onAddStorageLog}
              onDeleteLog={onDeleteStorageLog}
              onExportCSV={onExportCSV}
            />
          )}

          {/* SECCIÓN ESTRUCTURADA 1. AGUA POTABLE: FORMATO OFICIAL FO-AG-002 */}
          {selectedProg.folderName.includes("1. AGUA POTABLE") && (
            <WaterControlFormSection 
              metadata={data.waterControlMetadata}
              logs={data.waterControlLogs || []}
              onAddLog={onAddWaterLog}
              onDeleteLog={onDeleteWaterLog}
              onExportCSV={onExportCSV}
            />
          )}

          {displayedFiles.length === 0 ? (
            <div className="py-10 text-center text-[#6b7280]">
              <span className="text-3xl block mb-2">📄</span>
              <p className="text-xs italic">No se encontraron archivos en esta carpeta que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <div className="brew-table-container">
              <table className="brew-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre del Documento</th>
                    <th>Tipo de Archivo</th>
                    <th>Tamaño</th>
                    <th>Actualizado</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedFiles.map(file => (
                    <tr key={file.id}>
                      <td className="font-mono text-xs font-bold text-[#b89764]">{file.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{file.extension === '.xlsx' ? '📊' : (file.extension === '.docx' ? '📝' : '📄')}</span>
                          <div>
                            <p className="font-bold text-[var(--text-primary)] text-xs">{file.name}</p>
                            <span className="text-[10px] font-mono text-[var(--text-dim)]">{file.relPath}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge text-[10px] ${file.extension === '.xlsx' ? 'badge-verde' : 'badge-azul'}`}>
                          {file.type} ({file.extension})
                        </span>
                      </td>
                      <td className="font-mono text-xs text-[var(--text-secondary)]">{file.size}</td>
                      <td className="font-mono text-xs text-[var(--text-muted)]">{file.updatedAt}</td>
                      <td><span className="badge badge-verde text-[10px]">{file.status}</span></td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <a 
                            href={encodeURI(file.relPath)} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-norta-secondary text-[11px] py-1 px-2.5 font-bold flex items-center gap-1 border-[var(--border-subtle)]"
                            title="Abrir directamente en navegador / aplicación predeterminada"
                          >
                            <span>👁️ Abrir</span>
                          </a>
                          <a 
                            href={encodeURI(file.relPath)} 
                            download={file.name}
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn-norta-primary text-[11px] py-1 px-2.5 font-bold flex items-center gap-1"
                            title="Descargar y guardar copia local"
                          >
                            <span>📥 Descargar</span>
                          </a>
                          <button 
                            onClick={() => onDeleteDoc(selectedProg.id, file.id, file.name)}
                            className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 text-[11px] py-1 px-2 rounded-lg font-bold transition"
                            title="Eliminar documento del registro"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// MODAL PARA SUBIR DOCUMENTOS INVIMA

// ==========================================================================
// COMPONENTE: DocumentRepositoryModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function DocumentRepositoryModule({ data, onOpenNewDoc, onDeleteDocument, onExportCSV }) {
  const [catFilter, setCatFilter] = useState('Todos');
  const docs = data.documentRepository || [];

  const filteredDocs = catFilter === 'Todos' ? docs : docs.filter(d => d.category === catFilter);

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#4d3720]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge badge-dorado mb-2">Document Management System (DMS)</span>
          <h2 className="brand-title text-2xl font-bold text-white">Repositorio Documental Inteligente</h2>
          <p className="text-xs text-[#a39e93] mt-1">Almacenamiento centralizado con versión, caducidad y trazabilidad para INVIMA, BPM (Res. 2674) y Certificados COA.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onExportCSV && (
            <button 
              onClick={() => onExportCSV('Repositorio_DMS_Documentos_NORTA', docs)}
              className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
              title="Exportar inventario de documentos a Excel"
            >
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Exportar Excel</span>
            </button>
          )}
          <button onClick={onOpenNewDoc} className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Cargar Nuevo Documento</span>
          </button>
        </div>
      </div>

      {/* FILTROS POR CATEGORÍA */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
        {['Todos', 'Registros INVIMA', 'Certificados COA Insumos', 'Manuales BPM & POES', 'Carnets Sanitarios Personal'].map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)} className={`brew-tab ${catFilter === cat ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* LISTADO DE DOCUMENTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-in-luxury">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="kpi-luxury-card relative">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e2334] border border-[#c9b38f]/30 flex items-center justify-center text-lg text-[#c9b38f] shrink-0 shadow">
                  📄
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#b89764]">{doc.id} • {doc.version}</span>
                  <h3 className="brand-title text-sm font-bold text-[var(--text-primary)] leading-tight mt-0.5">{doc.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{doc.fileName} ({doc.fileSize})</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`badge text-[10px] ${doc.status.includes('Alerta') || doc.status.includes('Próximo') ? 'badge-red animate-pulse' : 'badge-verde'}`}>
                  {doc.status}
                </span>
                {onDeleteDocument && (
                  <button 
                    onClick={() => onDeleteDocument(doc.id, doc.title)}
                    className="text-red-500 hover:text-red-700 p-1 text-xs font-bold"
                    title="Retirar documento del DMS"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[var(--text-muted)]">Categoría:</span>
                <p className="font-semibold text-[var(--text-secondary)]">{doc.category}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Fecha Caducidad:</span>
                <p className="font-mono font-bold text-[#b89764]">{doc.expiryDate}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Aprobado Por:</span>
                <p className="text-[var(--text-secondary)]">{doc.verifiedBy}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Vinc. a Lote / Planta:</span>
                <p className="font-mono text-[var(--text-secondary)]">{doc.linkedBatch}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
              <span className="text-[var(--text-muted)]">Cargado: {doc.uploadDate}</span>
              <button onClick={() => alert(`Previsualizando ${doc.fileName}... (Documento certificado NORTA)`)} className="btn-norta-secondary text-xs py-1 px-3">
                👁️ Abrir / Visualizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO: PORTAL B2B DE AUTOGESTIÓN DE CLIENTES (BREWW STYLE PORTAL)
// ==========================================================================
function B2bPortalModule({ data, client, setClient, cart, setCart, onSubmitOrder, onExportCSV, showToast }) {
  const finished = data.finishedGoods || [];

  const formatCOP = (val) => {
    const num = Math.round(Number(val) || 0);
    return '$ ' + num.toLocaleString('es-CO') + ' COP';
  };

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    showToast(`Agregado 1x ${product.name} al carrito B2B.`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(i => i.id !== productId));
    showToast("Ítem retirado del carrito.");
  };

  const clearCart = () => {
    setCart([]);
    showToast("Carrito vaciado.");
  };

  const totalOrderCOP = cart.reduce((acc, i) => acc + ((Number(i.wholesalePrice) || 0) * i.qty), 0);

  const handleSendB2bOrder = () => {
    if (!cart.length) return alert("Tu carrito B2B está vacío.");
    const itemsDesc = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    const newOrder = {
      id: `ORD-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: client ? client.name : "Cliente B2B",
      date: new Date().toISOString().split('T')[0],
      items: itemsDesc,
      totalAmountUSD: totalOrderCOP, // Compatibilidad de campo almacenado
      status: "En Preparación",
      paymentStatus: "Autopedido Portal B2B",
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onSubmitOrder(newOrder);
    setCart([]);
    alert(`¡Gracias ${client ? client.name : 'Aliado'}! Tu pedido ${newOrder.id} ha sido enviado directamente a la planta Cervecería NORTA.`);
  };

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#3a452d]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge badge-dorado mb-2">Breww B2B Customer Portal 24/7</span>
          <h2 className="brand-title text-2xl font-bold text-white">Portal B2B de Autogestión para Bares & Restaurantes</h2>
          <p className="text-xs text-[#a39e93] mt-1">Haz autopedidos de barriles y latas en tiempo real, consulta tu cupo de crédito en COP y solicita recolección de envases vacíos.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {onExportCSV && (
            <button 
              onClick={() => onExportCSV('Catalogo_B2B_Disponibilidad_NORTA', finished)}
              className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
              title="Exportar catálogo B2B a Excel"
            >
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Exportar Excel</span>
            </button>
          )}
          <div className="flex items-center gap-2 bg-[#181816] p-2 rounded-xl border border-[#2d2a24]">
            <span className="text-xs text-[#a39e93]">Cliente Autenticado:</span>
            <select value={client ? client.id : ''} onChange={(e) => setClient(data.clients.find(c=>c.id===e.target.value))} className="brew-select text-xs font-bold text-[#c9b38f]">
              {(data.clients || []).map(c => <option key={c.id} value={c.id}>{c.name} ({c.city})</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ESTADO DE CUENTA CLIENTE */}
      {client && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs fade-in-luxury">
          <div className="kpi-luxury-card p-4">
            <span className="text-[var(--text-muted)] font-semibold uppercase text-[10px]">Cupo de Crédito Disponible</span>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCOP(client.creditLimit)}</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">Condición: Crédito 15 días</p>
          </div>
          <div className="kpi-luxury-card p-4">
            <span className="text-[var(--text-muted)] font-semibold uppercase text-[10px]">Barriles en tu Posesión</span>
            <p className="text-2xl font-bold text-[#b89764] mt-1">{client.kegsInPossession || 0} Barriles Inox</p>
            <button onClick={() => alert(`Solicitud enviada a logística NORTA para recoger ${client.kegsInPossession} barriles vacíos en ${client.name}.`)} className="mt-2 btn-norta-secondary text-[11px] py-1 px-2.5 w-full">
              🚚 Solicitar Recogida Vacíos
            </button>
          </div>
          <div className="kpi-luxury-card p-4">
            <span className="text-[var(--text-muted)] font-semibold uppercase text-[10px]">Compras Acumuladas NORTA</span>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{formatCOP(client.totalPurchasesUSD || 0)}</p>
            <span className="badge badge-dorado text-[10px] mt-1">{client.status}</span>
          </div>
        </div>
      )}

      {/* CATÁLOGO DE PRODUCTOS Y CARRITO B2B */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="brand-title text-sm font-bold text-[#b89764] uppercase tracking-wider">Cervezas Frescas Disponibles para Despacho</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-in-luxury">
            {finished.map(prod => (
              <div key={prod.id} className="kpi-luxury-card p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="badge badge-dorado text-[10px]">{prod.style}</span>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">{prod.stockUnits} en stock</span>
                  </div>
                  <h4 className="brand-title font-bold text-[var(--text-primary)] text-base mt-2">{prod.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Formato: {prod.packaging}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-[#b89764]">{formatCOP(prod.wholesalePrice)}</span>
                  <button onClick={() => addToCart(prod)} className="btn-norta-primary text-xs py-1.5 px-3">
                    + Agregar al Pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RESUMEN DEL PEDIDO B2B */}
        <div className="kpi-luxury-card p-5 h-fit">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
            <h3 className="brand-title text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <span>🛒 Tu Carrito B2B</span>
              <span className="badge badge-dorado text-[10px]">{cart.length} ítems</span>
            </h3>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-xs font-semibold" title="Vaciar carrito">
                Vaciar
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic py-6 text-center">No has agregado productos a tu pedido.</p>
          ) : (
            <div className="space-y-3 text-xs">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-[var(--bg-elevated)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{item.qty} x {formatCOP(item.wholesalePrice)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#b89764]">{formatCOP(item.qty * item.wholesalePrice)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold p-1" title="Eliminar ítem">
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between font-bold text-sm">
                <span className="text-[var(--text-primary)]">Total Pedido B2B:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatCOP(totalOrderCOP)}</span>
              </div>

              <button onClick={handleSendB2bOrder} className="w-full btn-norta-primary text-xs py-2.5 justify-center mt-2 font-bold shadow-lg">
                🚀 Enviar Autopedido a Planta NORTA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// MÓDULO: MATRIZ DE ARQUITECTURAS & BENCHMARKING
// ==========================================================================
function ArchitectureModule({ data, onExportCSV }) {
  const matrix = data.architectureBenchmarking?.matrix || [];

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#4d3720]/40 border-[#c9b38f]/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="badge badge-dorado mb-2">Benchmarking & Optimización Tecnológica</span>
          <h2 className="brand-title text-2xl font-bold text-white">Matriz Comparativa de Arquitecturas Cerveceras</h2>
          <p className="text-xs text-[#a39e93] mt-1">Evaluación diagnóstica entre Software Especializado (Breww, Beer30, Ekos), ERP Modular Open-Source (Odoo) y NORTA OS 5.0 Enterprise.</p>
        </div>
        {onExportCSV && (
          <button 
            onClick={() => onExportCSV('Matriz_Arquitecturas_Benchmarking_NORTA', matrix)}
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar matriz a Excel"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Matriz Excel</span>
          </button>
        )}
      </div>

      <div className="brew-table-container shadow-md fade-in-luxury">
        <table className="brew-table text-xs">
          <thead>
            <tr>
              <th className="py-2.5 px-3">Plataforma / Sistema</th>
              <th className="py-2.5 px-3">Enfoque Principal</th>
              <th className="py-2.5 px-2 text-center">Módulo CRM / B2B</th>
              <th className="py-2.5 px-3">Repositorio Documental (BPM/INVIMA)</th>
              <th className="py-2.5 px-2 text-center">Integración Contable</th>
              <th className="py-2.5 px-2 text-center">Curva de Aprendizaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {matrix.map((row, idx) => (
              <tr key={idx} className={row.platform.includes('NORTA') ? 'bg-[#b89764]/10 font-bold' : 'hover:bg-[var(--table-tr-hover)] transition'}>
                <td className="py-2.5 px-3 font-bold text-[#b89764] brand-title">{row.platform}</td>
                <td className="py-2.5 px-3 text-[var(--text-primary)] text-xs">{row.focus}</td>
                <td className="py-2.5 px-2 text-center"><span className="badge badge-dorado text-[10px]">{row.crm}</span></td>
                <td className="py-2.5 px-3 text-xs text-[var(--text-secondary)]">{row.docRepo}</td>
                <td className="py-2.5 px-2 text-center font-mono text-xs text-emerald-600 dark:text-emerald-400">{row.accounting}</td>
                <td className="py-2.5 px-2 text-center"><span className="badge badge-verde text-[10px]">{row.learningCurve}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECOMENDACIONES DE ESCALAMIENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs fade-in-luxury">
        <div className="kpi-luxury-card p-5">
          <h3 className="brand-title text-sm font-bold text-[#b89764] mb-2">1. Modelo Híbrido Recomendado</h3>
          <p className="text-[var(--text-secondary)]">Mantener **NORTA OS** como frontend ligero, rápido e intuitivo para el cervecero en planta y conectar vía exportación CSV/API a software contable especializado (Siigo / Alegra / QuickBooks).</p>
        </div>

        <div className="kpi-luxury-card p-5">
          <h3 className="brand-title text-sm font-bold text-[#b89764] mb-2">2. Repositorio DMS Integrado</h3>
          <p className="text-[var(--text-secondary)]">Almacenar digitalmente los adjuntos de auditoría (Certificados de Análisis COA, Resoluciones INVIMA y manuales POES/BPM) para aprobar visitas sanitarias sin hojas impresas.</p>
        </div>

        <div className="kpi-luxury-card p-5">
          <h3 className="brand-title text-sm font-bold text-[#b89764] mb-2">3. Autogestión B2B para Bares</h3>
          <p className="text-[var(--text-secondary)]">El Portal B2B permite que los bares realicen sus pedidos 24/7 sin intermediarios, optimizando la rotación del stock y reduciendo la mora en el retorno de barriles vacíos.</p>
        </div>
      </div>
    </div>
  );
}

// OTROS MÓDULOS DE SOPORTE MANTENIDOS Y MEJORADOS

// ==========================================================================
// COMPONENTE: DashboardModule
// ==========================================================================
function DashboardModule({ data, onOpenNewBatch, onOpenNewOrder, onOpenBatchDetail, onOpenTankDetail, onSelectModule }) {
  const activeBatchesCount = data.batches.filter(b => b.status === 'Activo').length;
  const litersInCellar = data.tanks.reduce((acc, t) => acc + (t.currentL || 0), 0);
  const totalSalesUSD = data.salesOrders.reduce((acc, o) => acc + o.totalAmountUSD, 0);

  return (
    <div className="space-y-6">
      <div className="brew-card p-6 bg-gradient-to-r from-[#0e2334] via-[#1a1c1a] to-[#1f1f1c] border border-[#c9b38f]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-dorado">Centro de Mando NORTA 5.0</span>
            <span className="text-xs text-[#c9b38f] font-mono">Planta Sabana Norte</span>
          </div>
          <h2 className="brand-title text-2xl font-bold text-white tracking-wide">Plataforma Operativa NORTA</h2>
          <p className="text-[#a39e93] text-xs mt-1">Gestión integral grain-to-glass, trazabilidad de lotes, DMS documental e inteligencia comercial.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={onOpenNewBatch} className="btn-norta-primary text-xs">🍺 Iniciar Cocción</button>
          <button onClick={onOpenNewOrder} className="btn-norta-secondary text-xs">📝 Crear Venta B2B</button>
                    <button onClick={() => onSelectModule('invima_system')} className="btn-norta-primary text-xs bg-[#0e2334] text-white border border-[#c9b38f]">🏛️ Abrir 11 Carpetas INVIMA</button>
          <button onClick={() => onSelectModule('b2b_portal')} className="btn-norta-secondary text-xs">🛒 Portal B2B Clientes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-in-luxury">
        <div className="kpi-luxury-card p-5">
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">Litros en Bodega</span>
          <p className="text-3xl font-extrabold text-[var(--text-primary)] mt-2">{litersInCellar.toLocaleString()} <span className="text-sm font-normal text-[#b89764]">L</span></p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">↑ 82% Ocupación Tanques</p>
        </div>
        <div className="kpi-luxury-card p-5">
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">Lotes Activos</span>
          <p className="text-3xl font-extrabold text-[var(--text-primary)] mt-2">{activeBatchesCount} <span className="text-sm font-normal text-[var(--text-muted)]">Lotes</span></p>
          <p className="text-xs text-[#b89764] mt-2 font-semibold">Curvas Time-Series Activas</p>
        </div>
        <div className="kpi-luxury-card p-5">
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">Ventas Facturadas</span>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">${Math.round(totalSalesUSD).toLocaleString('es-CO')} <span className="text-sm font-normal text-[var(--text-muted)]">COP</span></p>
          <p className="text-xs text-[var(--text-muted)] mt-2 font-semibold">Canal B2B Directo</p>
        </div>
        <div className="kpi-luxury-card p-5">
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider">Documentos DMS</span>
          <p className="text-3xl font-extrabold text-[var(--text-primary)] mt-2">{data.documentRepository.length} <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">Archivos Válidos</span></p>
          <p className="text-xs text-[#b89764] mt-2 font-semibold">⚠️ 1 Registro INVIMA a renovar</p>
        </div>
      </div>

      <div className="brew-card">
        <div className="brew-card-header">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-pulse"></span>
            <h3 className="brand-title text-sm font-bold text-slate-100">Estado de Fermentadores en Vivo (Cellar Map)</h3>
          </div>
          <button onClick={() => onSelectModule('production')} className="text-xs text-[#c9b38f] hover:underline">Ver Bodega Completa →</button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.tanks.map(tank => (
            <div key={tank.id} onClick={() => onOpenTankDetail(tank)} className="tank-visualizer cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#c9b38f] font-mono">{tank.id}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#c9b38f]/20 text-[#c9b38f]">{tank.status}</span>
              </div>
              <div className="w-full h-28 bg-[#151513] rounded-xl border border-[#2d2a24] relative flex flex-col justify-end p-1.5 overflow-hidden">
                <div className="tank-gauge-fill fermenting rounded-lg transition-all" style={{ height: `${Math.max(Math.round((tank.currentL/tank.capacityL)*100), 8)}%` }}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
                  <span className="text-sm font-extrabold text-white drop-shadow-md">{tank.currentL} L</span>
                  <span className="text-[10px] text-[#c9b38f] font-mono">{Math.round((tank.currentL/tank.capacityL)*100)}%</span>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-[11px]">
                <p className="font-semibold text-slate-200 truncate">{tank.beerName}</p>
                <div className="flex justify-between text-slate-400"><span>Temp:</span><span className="font-mono text-[#c9b38f]">{tank.tempC}°C</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: ProductionModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function ProductionModule({ data, tab, setTab, onAdvanceBatch, onOpenNewBatch, onOpenBatchDetail, onOpenRecipeDetail, onOpenTankDetail, onOpenLogFerment, onDeleteBatch, onExportCSV }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Producción Cervecera & Curvas Fermentativas</span>
            </h2>
            <span className="badge badge-dorado text-[10px]">Brewery OS</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Control metrológico de lotes activos, cellar map de fermentadores y recetas maestras BOM.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-pestañas con micro-iconos SVG */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <button onClick={() => setTab('batches')} className={`brew-subtab-btn ${tab === 'batches' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Lotes Activos</span>
            </button>
            <button onClick={() => setTab('tanks')} className={`brew-subtab-btn ${tab === 'tanks' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Cellar Map</span>
            </button>
            <button onClick={() => setTab('recipes')} className={`brew-subtab-btn ${tab === 'recipes' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Recetas Maestras</span>
            </button>
          </div>

          {/* Exportación Excel / CSV con cabeceras íntegras */}
          <button 
            onClick={() => onExportCSV(
              tab === 'batches' ? 'Lotes_Produccion_NORTA' : (tab === 'tanks' ? 'Tanques_CellarMap_NORTA' : 'Recetas_Maestras_NORTA'),
              tab === 'batches' ? data.batches : (tab === 'tanks' ? data.tanks : data.recipes)
            )}
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar datos a formato compatible con Excel"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Excel</span>
          </button>

          {/* Ingreso manual de Lote */}
          <button onClick={onOpenNewBatch} className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Lote</span>
          </button>
        </div>
      </div>

      {tab === 'batches' && (
        <div className="brew-table-container shadow-md fade-in-luxury">
          <table className="brew-table text-xs">
            <thead>
              <tr>
                <th className="py-2.5 px-3 font-mono text-[10px] w-24">Código Lote</th>
                <th className="py-2.5 px-3 min-w-[180px]">Cerveza & Estilo</th>
                <th className="py-2.5 px-2 text-center w-20">Tanque</th>
                <th className="py-2.5 px-2 text-right w-24">Volumen</th>
                <th className="py-2.5 px-2 text-center w-28">Etapa Actual</th>
                <th className="py-2.5 px-3 text-center w-36">SG / Temp</th>
                <th className="py-2.5 px-3 text-center w-48">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {data.batches.map(batch => (
                <tr key={batch.id} className="hover:bg-[var(--table-tr-hover)] transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#b89764]">{batch.id}</td>
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-[var(--text-primary)] brand-title text-sm">{batch.recipeName}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{batch.style}</p>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="badge badge-dorado font-mono text-[10px]">{batch.tankId}</span>
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-[var(--text-primary)]">
                    {batch.volumeLiters} L
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className={`badge text-[10px] ${batch.stage === 'Completado' ? 'badge-verde' : 'badge-dorado'}`}>
                      {batch.stage} ({batch.stageProgress}%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-xs">
                    <span className="text-[#b89764] font-bold">SG: {batch.currentGravity}</span> | <span className="text-[var(--text-secondary)]">{batch.currentTemp}°C</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => onOpenBatchDetail(batch)} className="btn-norta-secondary text-[11px] py-1 px-2.5 font-semibold" title="Ver trazabilidad y curva">
                        Curva & BOM
                      </button>
                      <button onClick={() => onOpenLogFerment(batch)} className="btn-norta-primary text-[11px] py-1 px-2 font-semibold" title="Registrar lectura diaria">
                        SG
                      </button>
                      {onDeleteBatch && (
                        <button 
                          onClick={() => onDeleteBatch(batch.id)} 
                          className="bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800 text-[11px] py-1 px-2 rounded-lg font-bold transition"
                          title="Retirar o dar de baja este lote"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'tanks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-in-luxury">
          {data.tanks.map(tank => (
            <div key={tank.id} className="kpi-luxury-card cursor-pointer" onClick={() => onOpenTankDetail(tank)}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-base font-bold text-[#b89764]">{tank.id}</span>
                  <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">{tank.name}</h4>
                </div>
                <span className={`badge text-[10px] ${tank.status.includes('Aprobado') || tank.status.includes('Fermentando') ? 'badge-verde' : 'badge-dorado'}`}>
                  {tank.status}
                </span>
              </div>
              <div className="mt-4 p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Cerveza en tanque:</span><span className="font-bold text-[#b89764]">{tank.beerName}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Ocupación:</span><span className="font-mono text-[var(--text-primary)] font-bold">{tank.currentL} L / {tank.capacityL} L</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Temperatura:</span><span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{tank.tempC} °C</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'recipes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-in-luxury">
          {data.recipes.map(recipe => (
            <div key={recipe.id} className="kpi-luxury-card">
              <div className="flex justify-between items-start">
                <div>
                  <span className="badge badge-dorado text-[10px] mb-1">{recipe.brandPillar}</span>
                  <h3 className="brand-title text-lg font-bold text-[var(--text-primary)]">{recipe.name}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{recipe.style}</p>
                </div>
                <span className="text-xl font-extrabold font-mono text-[#b89764]">{recipe.abv}% ABV</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] my-3 italic bg-[var(--bg-elevated)] p-3 rounded-xl border border-[var(--border-subtle)] leading-relaxed">
                "{recipe.sensoryDescription}"
              </p>
              <button onClick={() => onOpenRecipeDetail(recipe)} className="w-full btn-norta-primary text-xs py-2 justify-center font-bold">
                Ficha Técnica & Desglose BOM
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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


// ==========================================================================
// COMPONENTE: CrmModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function CrmModule({ data, tab, setTab, onOpenNewOrder, onOpenNewClient, onDeleteClient, onDeleteOrder, onExportCSV }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>CRM Comercial & Clientes B2B</span>
            </h2>
            <span className="badge badge-dorado text-[10px]">Canal B2B</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Bares aliados, pedidos mayoristas, facturación y trazabilidad comercial.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-pestañas con micro-iconos SVG */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <button onClick={() => setTab('clients')} className={`brew-subtab-btn ${tab === 'clients' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Clientes B2B</span>
            </button>
            <button onClick={() => setTab('sales')} className={`brew-subtab-btn ${tab === 'sales' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Pedidos B2B</span>
            </button>
          </div>

          {/* Botón Exportar Excel */}
          <button 
            onClick={() => onExportCSV(
              tab === 'clients' ? 'Clientes_B2B_NORTA' : 'Ventas_B2B_NORTA', 
              tab === 'clients' ? data.clients : data.salesOrders
            )} 
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar a formato Excel compatible"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Excel</span>
          </button>

          {/* Ingreso manual de Cliente o Pedido */}
          <button 
            onClick={tab === 'clients' ? onOpenNewClient : onOpenNewOrder} 
            className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{tab === 'clients' ? 'Nuevo Cliente' : 'Nueva Venta B2B'}</span>
          </button>
        </div>
      </div>

      {tab === 'clients' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-luxury">
          {data.clients.map(client => (
            <div key={client.id} className="kpi-luxury-card">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-[#b89764] font-bold">{client.id}</span>
                  <h3 className="brand-title text-base font-bold text-[var(--text-primary)]">{client.name}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{client.type} • {client.city || 'Bogotá'}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="badge badge-verde text-[10px]">{client.status}</span>
                  {onDeleteClient && (
                    <button 
                      onClick={() => onDeleteClient(client.id, client.name)}
                      className="text-red-500 hover:text-red-700 p-1 text-xs font-bold"
                      title="Retirar cliente"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Contacto:</span><span className="text-[var(--text-secondary)] font-semibold">{client.contactName}</span></div>
                <div className="flex justify-between items-center"><span className="text-[var(--text-muted)]">PIN Autopedido B2B:</span><span className="font-mono font-bold text-[#8c6a2c] dark:text-[#dfcaa7] bg-[#b89764]/15 px-2 py-0.5 rounded">{client.pinCode}</span></div>
                <div className="flex justify-between pt-1 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">Compras Acumuladas:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">${client.totalPurchasesUSD ? client.totalPurchasesUSD.toLocaleString() : '0'} USD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'sales' && (
        <div className="brew-table-container shadow-md fade-in-luxury">
          <table className="brew-table text-xs">
            <thead>
              <tr>
                <th className="py-2.5 px-3 font-mono text-[10px] w-24">N° Pedido</th>
                <th className="py-2.5 px-3 min-w-[180px]">Cliente B2B</th>
                <th className="py-2.5 px-2 text-center w-28">Fecha</th>
                <th className="py-2.5 px-3 min-w-[200px]">Productos / Formato</th>
                <th className="py-2.5 px-2 text-right w-28">Total Venta</th>
                <th className="py-2.5 px-2 text-center w-28">Estado</th>
                <th className="py-2.5 px-2 text-center w-20">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {data.salesOrders.map(order => (
                <tr key={order.id} className="hover:bg-[var(--table-tr-hover)] transition">
                  <td className="py-2.5 px-3 font-mono text-xs font-bold text-[#b89764]">{order.id}</td>
                  <td className="py-2.5 px-3 font-bold text-[var(--text-primary)] brand-title">{order.clientName}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs text-[var(--text-muted)]">{order.date}</td>
                  <td className="py-2.5 px-3 text-xs text-[var(--text-secondary)]">{order.items}</td>
                  <td className="py-2.5 px-2 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ${(order.totalAmountUSD || 0).toFixed(2)} USD
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <span className="badge badge-dorado text-[10px]">{order.status}</span>
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    {onDeleteOrder && (
                      <button 
                        onClick={() => onDeleteOrder(order.id)} 
                        className="bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800 text-[10px] py-1 px-2 rounded-lg font-bold transition"
                        title="Anular / retirar este pedido"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: ProcessesModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function ProcessesModule({ data, tab, setTab, onOpenNewCip, onOpenNewLab, onDeleteCipLog, onDeleteQualityTest, onExportCSV }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Procesos Operativos, Limpieza CIP & Calidad</span>
            </h2>
            <span className="badge badge-dorado text-[10px]">BPM & Inocuidad</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Control sanitario de tanques, hisopados ATP y análisis fisicoquímico/organoléptico en laboratorio.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-pestañas con micro-iconos SVG */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <button onClick={() => setTab('cip')} className={`brew-subtab-btn ${tab === 'cip' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Limpieza CIP</span>
            </button>
            <button onClick={() => setTab('lab')} className={`brew-subtab-btn ${tab === 'lab' ? 'active' : ''}`}>
              <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Laboratorio & Cata</span>
            </button>
          </div>

          {/* Botón Exportar Excel */}
          <button 
            onClick={() => onExportCSV(
              tab === 'cip' ? 'Registros_CIP_NORTA' : 'Analisis_Calidad_Laboratorio_NORTA', 
              tab === 'cip' ? data.cipLogs : data.qualityTests
            )} 
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar registros a Excel"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Excel</span>
          </button>

          {/* Ingreso manual */}
          <button 
            onClick={tab === 'cip' ? onOpenNewCip : onOpenNewLab} 
            className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{tab === 'cip' ? 'Nuevo Registro CIP' : 'Nuevo Test de Calidad'}</span>
          </button>
        </div>
      </div>

      {tab === 'cip' && (
        <div className="brew-table-container shadow-md fade-in-luxury">
          <table className="brew-table text-xs">
            <thead>
              <tr>
                <th className="py-2.5 px-3 font-mono text-[10px] w-24">Código CIP</th>
                <th className="py-2.5 px-2 text-center w-28">Fecha & Hora</th>
                <th className="py-2.5 px-3 min-w-[160px]">Equipo Intervenido</th>
                <th className="py-2.5 px-3 min-w-[140px]">Operador</th>
                <th className="py-2.5 px-2 text-center w-28">Temp. Cáustica</th>
                <th className="py-2.5 px-2 text-center w-28">ATP Hisopado</th>
                <th className="py-2.5 px-2 text-center w-32">Estado</th>
                <th className="py-2.5 px-2 text-center w-20">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {data.cipLogs.map(log => (
                <tr key={log.id} className="hover:bg-[var(--table-tr-hover)] transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#b89764]">{log.id}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs text-[var(--text-muted)]">{log.date}</td>
                  <td className="py-2.5 px-3 font-bold text-[var(--text-primary)]">{log.equipment}</td>
                  <td className="py-2.5 px-3 text-xs text-[var(--text-secondary)]">{log.operator}</td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">{log.causticTempC}°C</td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs font-bold text-[#b89764]">{log.swabAdenosineTriphosphateRlu} RLU</td>
                  <td className="py-2.5 px-2 text-center"><span className="badge badge-verde text-[10px]">{log.status}</span></td>
                  <td className="py-2.5 px-2 text-center">
                    {onDeleteCipLog && (
                      <button 
                        onClick={() => onDeleteCipLog(log.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800 text-[10px] py-1 px-2 rounded-lg font-bold transition"
                        title="Retirar registro CIP"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'lab' && (
        <div className="brew-table-container shadow-md fade-in-luxury">
          <table className="brew-table text-xs">
            <thead>
              <tr>
                <th className="py-2.5 px-3 font-mono text-[10px] w-24">Código Lab</th>
                <th className="py-2.5 px-3 min-w-[140px]">Lote / Tanque</th>
                <th className="py-2.5 px-2 text-center w-24">Fecha</th>
                <th className="py-2.5 px-2 text-center w-20">pH</th>
                <th className="py-2.5 px-2 text-center w-24">DO (ppb)</th>
                <th className="py-2.5 px-2 text-center w-24">Cata (100)</th>
                <th className="py-2.5 px-3 min-w-[160px]">Veredicto</th>
                <th className="py-2.5 px-2 text-center w-20">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {(data.qualityTests || []).map(test => (
                <tr key={test.id} className="hover:bg-[var(--table-tr-hover)] transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-[#b89764]">{test.id}</td>
                  <td className="py-2.5 px-3 font-bold text-[var(--text-primary)]">
                    <p className="brand-title">{test.batchId}</p>
                    <p className="text-[11px] text-[var(--text-muted)] font-normal">{test.style} ({test.tank})</p>
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono text-xs text-[var(--text-muted)]">{test.date}</td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-[var(--text-primary)]">{test.ph}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-emerald-600 dark:text-emerald-400 font-bold">{test.dissolvedOxygenPpb} ppb</td>
                  <td className="py-2.5 px-2 text-center font-mono font-bold text-[#b89764]">{test.sensoryScore100} / 100</td>
                  <td className="py-2.5 px-3"><span className="badge badge-dorado text-[10px]">{test.overallVerdict}</span></td>
                  <td className="py-2.5 px-2 text-center">
                    {onDeleteQualityTest && (
                      <button 
                        onClick={() => onDeleteQualityTest(test.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/30 dark:hover:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800 text-[10px] py-1 px-2 rounded-lg font-bold transition"
                        title="Retirar test de laboratorio"
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
// COMPONENTE: HrModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function HrModule({ data, tab, setTab, onOpenNewEmployee, onDeleteEmployee, onExportCSV }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Talento Humano NORTA</span>
            </h2>
            <span className="badge badge-dorado text-[10px]">Equipo & Cuadrantes</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Nómina operativa, perfiles de planta, carnets de manipulación de alimentos y cuadrantes de turno.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Botón Exportar Excel */}
          <button 
            onClick={() => onExportCSV('Talento_Humano_Colaboradores_NORTA', data.employees)} 
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar nómina y colaboradores a Excel"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Excel</span>
          </button>

          {/* Ingreso manual de colaborador */}
          <button 
            onClick={onOpenNewEmployee} 
            className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Colaborador</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-luxury">
        {data.employees.map(emp => (
          <div key={emp.id} className="kpi-luxury-card relative group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0e2334] border border-[#c9b38f]/50 flex items-center justify-center font-bold text-[#c9b38f] text-xs shrink-0 shadow-md">
                  {emp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <h3 className="brand-title text-sm font-bold text-[var(--text-primary)]">{emp.name}</h3>
                  <p className="text-xs text-[#b89764] font-semibold">{emp.role}</p>
                </div>
              </div>
              {onDeleteEmployee && (
                <button 
                  onClick={() => onDeleteEmployee(emp.id, emp.name)}
                  className="text-red-500 hover:text-red-700 p-1 text-xs font-bold"
                  title="Dar de baja colaborador"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="mt-3 p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Área / Depto:</span>
                <span className="text-[var(--text-secondary)] font-semibold">{emp.dept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Correo:</span>
                <span className="text-[var(--text-secondary)] font-mono text-[11px]">{emp.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Teléfono:</span>
                <span className="text-[var(--text-secondary)] font-mono text-[11px]">{emp.phone || '+57 310 000 0000'}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">Carnet BPM:</span>
                <span className="badge badge-verde text-[10px]">{emp.certStatus || 'Al Día'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: LegalModule
// HOMOGENEIZACIÓN DE LAS 3 FASES: SVG, GESTIÓN MANUAL Y EXPORTACIÓN EXCEL
// ==========================================================================
function LegalModule({ data, tab, setTab, recallSearchLot, setRecallSearchLot, onOpenNewRegistry, onDeleteRegistry, onExportCSV }) {
  const searchedBatch = data.batches.find(b => b.id.toUpperCase() === (recallSearchLot || '').trim().toUpperCase()) || data.batches[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="brand-title text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>Cumplimiento Legal, Sanitario & Fiscal INVIMA</span>
            </h2>
            <span className="badge badge-dorado text-[10px]">Decreto 1686 / Res. 2674</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Control de registros sanitarios por referencia cervecera, vencimientos y simulación de recall sanitario.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Botón Exportar Excel */}
          <button 
            onClick={() => onExportCSV('Registros_Sanitarios_INVIMA_NORTA', data.legal.sanitaryRegistries)} 
            className="btn-norta-secondary text-xs py-2 px-3 shadow-sm flex items-center gap-1.5"
            title="Exportar registros sanitarios a Excel"
          >
            <svg className="w-3.5 h-3.5 text-[#b89764]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Exportar Excel</span>
          </button>

          {/* Ingreso manual de registro sanitario */}
          <button 
            onClick={onOpenNewRegistry} 
            className="btn-norta-primary text-xs py-2 px-3.5 font-bold shadow flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Registro INVIMA</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-in-luxury">
        {data.legal.sanitaryRegistries.map(reg => (
          <div key={reg.code} className="kpi-luxury-card relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-[#b89764]">{reg.code}</span>
                <h3 className="brand-title text-base font-bold text-[var(--text-primary)] mt-0.5">{reg.beer}</h3>
                <p className="text-xs text-[var(--text-muted)]">{reg.category || 'Cerveza Especial Artesanal'}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="badge badge-dorado text-[10px]">{reg.status}</span>
                {onDeleteRegistry && (
                  <button 
                    onClick={() => onDeleteRegistry(reg.code)}
                    className="text-red-500 hover:text-red-700 p-1 text-xs font-bold"
                    title="Retirar registro sanitario"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 p-3 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Vigencia Hasta:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{reg.validUntil || '2031-12-31'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Norma Aplicable:</span>
                <span className="text-[var(--text-secondary)] font-mono text-[11px]">Decreto 1686 / 2012</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================================================
// COMPONENTE: BrandIdentityModule (BRAND BOOK DIGITAL INTERACTIVO NORTA)
// ==========================================================================
function BrandIdentityModule({ data }) {
  const [activeTab, setActiveTab] = useState('manifesto');
  const [copiedHex, setCopiedHex] = useState(null);
  const [selectedBeerModal, setSelectedBeerModal] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [catalogFilter, setCatalogFilter] = useState('all');
  const [contrastBg, setContrastBg] = useState('#0e2334');
  const [contrastFg, setContrastFg] = useState('#b89764');

  const brand = data.brandIdentity || {};
  const recipes = data.recipes || [];
  const colors = brand.colors || [];
  const pillars = brand.pillars || [];
  const typographySpec = brand.typographySpec || [];
  const decalogo = brand.decalogo || [];
  const packagingConcepts = brand.packagingConcepts || [];

  const handleCopyColor = (hex, name) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(hex).catch(() => {});
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const filteredBeers = useMemo(() => {
    if (catalogFilter === 'high') {
      return recipes.filter(r => r.abv >= 7.0);
    }
    if (catalogFilter === 'hops') {
      return recipes.filter(r => r.ibu >= 30);
    }
    if (catalogFilter === 'classic') {
      return recipes.filter(r => r.abv < 6.0 && r.ibu <= 30);
    }
    return recipes;
  }, [recipes, catalogFilter]);

  const tabs = [
    { id: 'manifesto', label: 'Manifiesto & Pilares', icon: '📜' },
    { id: 'palette', label: 'Sistema Cromático', icon: '🎨' },
    { id: 'catalog', label: 'Catálogo de 6 Cervezas', icon: '🍺' },
    { id: 'typography', label: 'Sistema Tipográfico', icon: '✒️' },
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
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-brew font-bold tracking-widest uppercase bg-[#3a452d]/60 text-emerald-300 border border-[#3a452d]">
                Suite Cervecera 5.0
              </span>
            </div>
            <div>
              <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-[#f7f4ed] leading-tight">
                CERVECERÍA <span className="text-[#b89764]">NORTA</span>
              </h1>
              <p className="font-baskerville italic text-lg md:text-2xl text-[#c9b38f] mt-2 font-medium">
                "{brand.manifesto || "Fuerza silenciosa • Calma con carácter • Aventura interior"}"
              </p>
            </div>
            <p className="font-lato text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              {brand.manifestoLong || "Forjada en la meseta de la Sabana Norte, Cervecería NORTA nace de una devoción austera por la pureza del oficio. Nuestras cervezas dialogan con el frío andino, los cereales seleccionados y la precisión metrológica para despertar el espíritu de aventura interior."}
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
                <p className="text-xl">🌾</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">6 Perfiles Autor</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Maltas de Origen</p>
              </div>
              <div className="bg-[#0e2334]/60 backdrop-blur border border-[#b89764]/30 rounded-xl p-3 text-center">
                <p className="text-xl">🛡️</p>
                <p className="font-cinzel text-xs font-bold text-[#c9b38f] mt-1">11 Carpetas BPM</p>
                <p className="text-[10px] text-slate-300 font-mono-brew">Auditoría INVIMA</p>
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

      {/* 2. CONTENIDO SEGÚN LA PESTAÑA ACTIVA */}

      {/* TAB 1: MANIFIESTO & 6 PILARES RECTORES */}
      {activeTab === 'manifesto' && (
        <div className="space-y-8 animate-fadeIn">
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
                  {/* Imagen de fondo con overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-35"
                    style={{ backgroundImage: `url('${p.image || "./assets/brand_moodboard.jpg"}')` }}
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
                      {p.subtitle || "Pilar de Identidad"}
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

      {/* TAB 2: SISTEMA CROMÁTICO OFICIAL INTERACTIVO */}
      {activeTab === 'palette' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                Sistema Cromático Oficial NORTA
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
                  {/* Muestra grande de color */}
                  <div
                    className="h-36 w-full relative flex items-end justify-between p-4 cursor-pointer group transition-transform"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleCopyColor(c.hex, c.name)}
                    title="Clic para copiar código HEX"
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <span className={`text-xs font-mono-brew px-3 py-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur font-bold`}>
                        📋 Copiar {c.hex}
                      </span>
                    </div>
                    <span className={`text-xs font-mono-brew font-extrabold px-2.5 py-1 rounded shadow-sm ${isDark ? 'bg-white/90 text-[#1d1d1b]' : 'bg-black/80 text-white'}`}>
                      {c.hex}
                    </span>
                    <span className={`text-[10px] font-mono-brew uppercase tracking-wider font-bold ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                      {c.pantone || "Pantone Std"}
                    </span>
                  </div>

                  {/* Detalle del Color */}
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
                        RGB: {c.rgb || "rgb(---)"} • Pantone: {c.pantone || "---"}
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
              {/* Selectores de color */}
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

              {/* Caja de preview en vivo */}
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
                  CERVECERÍA NORTA • EDICIÓN MAESTRA
                </h5>
                <p className="font-baskerville italic text-sm" style={{ color: contrastFg }}>
                  "Fuerza silenciosa • Calma con carácter • Aventura interior"
                </p>
                <p className="font-lato text-xs leading-relaxed opacity-90" style={{ color: contrastFg }}>
                  La maduración prolongada en frío templa la cerveza como el viento de páramo esculpe la roca andina. Maceración infusional a 66°C con maltas de cebada y agua mineralizada pura.
                </p>
                <p className="font-mono-brew text-[11px] font-bold" style={{ color: contrastFg }}>
                  ABV: 8.5% | IBU: 65 | SRM: 14 | LOTE: LOT-2026-088
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CATÁLOGO OFICIAL DE LAS 6 CERVEZAS NORTA */}
      {activeTab === 'catalog' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header y Filtros */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
                Catálogo Oficial de Autor • Las 6 Cervezas NORTA
              </h3>
              <p className="text-xs text-[#4d3720] font-lato">
                Fichas organolépticas, parámetros fisicoquímicos (ABV, IBU, SRM), servicio y maridaje sommelier.
              </p>
            </div>

            {/* Filtros de Estilo */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCatalogFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'all'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                Todas (6)
              </button>
              <button
                onClick={() => setCatalogFilter('high')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'high'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                🔥 Alta Gravedad (≥7.0%)
              </button>
              <button
                onClick={() => setCatalogFilter('hops')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'hops'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                🌿 Lupuladas (IBU ≥30)
              </button>
              <button
                onClick={() => setCatalogFilter('classic')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono-brew transition-all ${
                  catalogFilter === 'classic'
                    ? 'bg-[#0e2334] text-white shadow'
                    : 'bg-[#eee7da] text-[#4d3720] hover:bg-[#e2d8c3]'
                }`}
              >
                🌾 Clásicas & Frescas
              </button>
            </div>
          </div>

          {/* Grid de las 6 Cervezas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeers.map((beer) => {
              const liquid = beer.liquidColor || '#c4591f';
              return (
                <div
                  key={beer.id}
                  className="papiro-card border-2 border-[#b89764]/30 hover:border-[#b89764] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Encabezado de la Tarjeta */}
                  <div className="p-6 pb-4 border-b border-[#4d3720]/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                        {beer.id}
                      </span>
                      <span className="text-[10px] font-mono-brew font-bold uppercase tracking-wider text-[#4d3720]">
                        {beer.brandPillar || "Calma con carácter"}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Muestra SRM cilíndrica */}
                      <div className="shrink-0 flex flex-col items-center">
                        <div
                          className="w-10 h-16 rounded-lg border-2 border-white/80 shadow-md relative overflow-hidden"
                          style={{ backgroundColor: liquid }}
                          title={`Color de cerveza SRM: ${beer.srmColor}`}
                        >
                          <div className="absolute top-0 inset-x-0 h-2.5 bg-white/70 rounded-t-sm"></div>
                        </div>
                        <span className="font-mono-brew text-[9px] font-bold text-[#4d3720] mt-1">
                          SRM {beer.srmColor}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-cinzel text-xl font-extrabold text-[#0e2334] group-hover:text-[#b89764] transition-colors leading-snug">
                          {beer.name}
                        </h4>
                        <p className="font-baskerville italic text-xs text-[#4d3720] font-medium mt-0.5">
                          {beer.style}
                        </p>
                      </div>
                    </div>

                    {/* Métricas Primarias */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Graduación</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.abv}% ABV</p>
                      </div>
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Amargor</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.ibu} IBU</p>
                      </div>
                      <div className="bg-[#eee7da]/80 rounded-xl p-2 border border-[#4d3720]/10">
                        <p className="text-[9px] font-mono-brew uppercase text-[#4d3720] font-bold">Tonalidad</p>
                        <p className="font-mono-brew text-sm font-extrabold text-[#0e2334]">{beer.srmColor} SRM</p>
                      </div>
                    </div>
                  </div>

                  {/* Cuerpo y Descriptores */}
                  <div className="p-6 py-4 space-y-4 flex-1">
                    {/* Barras Visuales de Intensidad */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Intensidad de Malta</span>
                        <span className="font-bold">{Math.min(10, Math.round(beer.abv * 1.1))}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#b89764] to-[#4d3720]"
                          style={{ width: `${Math.min(100, (beer.abv / 10) * 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono-brew text-[#4d3720]">
                        <span>Amargor de Lúpulo</span>
                        <span className="font-bold">{Math.min(10, Math.round(beer.ibu / 9))}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e2d8c3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#3a452d] to-[#0e2334]"
                          style={{ width: `${Math.min(100, (beer.ibu / 90) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Descripción Sommelier */}
                    <p className="font-lato text-xs text-slate-700 leading-relaxed italic line-clamp-3">
                      "{beer.sensoryDescription}"
                    </p>

                    {/* Tags Sensoriales */}
                    <div className="flex flex-wrap gap-1.5">
                      {(beer.sensoryTags || ["Artesanal", "Maduración Lenta"]).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono-brew px-2 py-0.5 rounded-full bg-[#0e2334]/10 text-[#0e2334] font-semibold border border-[#0e2334]/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Ficha de Servicio y Maridaje */}
                    <div className="pt-2 border-t border-[#4d3720]/15 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Temp. Óptima:</span>
                        <span className="font-mono-brew">{beer.servingTemp || "6°C - 8°C"}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-[#4d3720]">Cristalería:</span>
                        <span className="font-lato truncate max-w-[180px]">{beer.glassware || "Copa Sommelier"}</span>
                      </div>
                      <div className="text-slate-600 pt-1">
                        <span className="font-bold text-[#4d3720] block">Maridaje Recomendado:</span>
                        <p className="text-[11px] text-slate-700 italic leading-snug mt-0.5">
                          {beer.pairing || "Carnes asadas, quesos de guarda y gastronomía andina de autor."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botón Ver Ficha de Cata Completa */}
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

      {/* TAB 4: SISTEMA TIPOGRÁFICO EDITORIAL & JERARQUÍAS */}
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

                {/* Espécimen Visual en Vivo */}
                <div className="bg-[#f2ebd9] rounded-xl p-4 border border-[#4d3720]/15 space-y-2">
                  <p className="text-[10px] font-mono-brew font-bold text-[#4d3720] uppercase">
                    Espécimen en Vivo:
                  </p>
                  {t.family === 'Cinzel' && (
                    <div className="space-y-1 font-cinzel text-[#0e2334]">
                      <p className="text-xl font-extrabold tracking-widest">CERVECERÍA NORTA 2026</p>
                      <p className="text-sm tracking-wider">ABCDEFGHIJKLMNÑOPQRSTUVWXYZ 0123456789</p>
                    </div>
                  )}
                  {t.family === 'Libre Baskerville' && (
                    <div className="space-y-1 font-baskerville text-[#4d3720]">
                      <p className="text-base italic font-bold">"Fuerza silenciosa • Calma con carácter • Aventura interior"</p>
                      <p className="text-xs italic leading-relaxed">
                        En la quietud de los tanques de guarda, la cebada y el agua de manantial alcanzan su máximo esplendor biológico.
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
                      <p className="font-bold">LOTE: LOT-2026-088 | OG: 1.092 | FG: 1.022 | pH: 5.20</p>
                      <p className="text-[11px] text-[#4d3720]">METROLOGÍA: 9.2% ABV • 65 IBU • 75 SRM • GRAVEDAD OK</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de Jerarquías Tipográficas */}
          <div className="brew-card overflow-hidden shadow-lg border border-[#b89764]/30">
            <div className="p-5 bg-[#0e2334] text-white flex items-center justify-between">
              <h4 className="font-cinzel text-base font-bold text-[#c9b38f]">
                Escala & Jerarquía Tipográfica Institucional
              </h4>
              <span className="text-xs font-mono-brew text-slate-300">Escala Modular 1.25 (Major Third)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f2ebd9] text-[#4d3720] font-mono-brew border-b border-[#4d3720]/20">
                    <th className="p-3.5 font-bold">Nivel</th>
                    <th className="p-3.5 font-bold">Familia</th>
                    <th className="p-3.5 font-bold">Tamaño / Peso</th>
                    <th className="p-3.5 font-bold">Tracking</th>
                    <th className="p-3.5 font-bold">Aplicación Principal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4d3720]/10 font-lato text-slate-700 bg-[#fdfbf7]">
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H1 Monumental</td>
                    <td className="p-3.5 font-cinzel font-bold">Cinzel</td>
                    <td className="p-3.5 font-mono-brew">42px (2.6rem) / 900</td>
                    <td className="p-3.5 font-mono-brew">0.08em</td>
                    <td className="p-3.5">Logo y Títulos de Pliego Principal</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H2 Sección</td>
                    <td className="p-3.5 font-cinzel font-bold">Cinzel</td>
                    <td className="p-3.5 font-mono-brew">28px (1.75rem) / 700</td>
                    <td className="p-3.5 font-mono-brew">0.05em</td>
                    <td className="p-3.5">Encabezados de Módulo & Nombres de Cerveza</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">H3 Subtítulo</td>
                    <td className="p-3.5 font-baskerville italic font-bold">Libre Baskerville</td>
                    <td className="p-3.5 font-mono-brew">20px (1.25rem) / 700</td>
                    <td className="p-3.5 font-mono-brew">0.02em</td>
                    <td className="p-3.5">Epígrafes, Manifiesto y Citas de Autor</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">Body Lectura</td>
                    <td className="p-3.5 font-lato">Lato</td>
                    <td className="p-3.5 font-mono-brew">14px (0.875rem) / 400</td>
                    <td className="p-3.5 font-mono-brew">Normal</td>
                    <td className="p-3.5">Párrafos, notas de cata y tablas del ERP</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono-brew font-bold text-[#0e2334]">Metrología Code</td>
                    <td className="p-3.5 font-mono-brew">JetBrains Mono</td>
                    <td className="p-3.5 font-mono-brew">12px (0.75rem) / 600</td>
                    <td className="p-3.5 font-mono-brew">0.04em</td>
                    <td className="p-3.5">Códigos de Lote, pH, ABV, IBU y Telemetría</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EMPAQUE, CRISTALERÍA & MOODBOARD FOTOGRÁFICO */}
      {activeTab === 'packaging' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-[#0e2334]">
              Aplicaciones de Empaque & Galería de Marca
            </h3>
            <p className="text-xs text-[#4d3720] font-lato">
              Conceptos industriales para botellas cerámicas de guarda, latas craft con barniz táctil y cristalería de firma.
            </p>
          </div>

          {/* 3 Conceptos de Empaque */}
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

          {/* Moodboard Fotográfico de Gran Formato */}
          <div className="papiro-card p-6 md:p-8 border border-[#b89764]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#4d3720]/20">
              <div>
                <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">Galería Visual</span>
                <h4 className="font-cinzel text-lg font-bold text-[#0e2334] mt-1">
                  Moodboard de Atmósfera & Territorio NORTA
                </h4>
              </div>
              <p className="text-xs text-[#4d3720] font-lato">
                Haz clic en cualquier imagen para expandir en pantalla completa.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setLightboxImage({ url: './assets/brand_moodboard.jpg', title: 'Atmósfera NORTA', subtitle: 'Pizarra, roca volcánica andina y sobriedad terrosa' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/brand_moodboard.jpg" alt="Moodboard NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Atmósfera & Pizarra</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Materia Prima Noble</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/beers.jpg', title: 'Cervezas en Copa', subtitle: 'Espuma aterciopelada y color ámbar profundo' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/beers.jpg" alt="Cervezas NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Cata en Copa</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Cristal y Retención</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/compass.jpg', title: 'Brújula Artesanal', subtitle: 'La orientación cervecera hacia la excelencia' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow"
              >
                <img src="./assets/compass.jpg" alt="Brújula NORTA" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">La Brújula</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Aventura Interior</p>
                </div>
              </div>

              <div
                onClick={() => setLightboxImage({ url: './assets/logo_norta_principal.png', title: 'Emblema Oficial', subtitle: 'Monograma heráldico de Cervecería NORTA' })}
                className="relative h-60 rounded-xl overflow-hidden cursor-pointer group border border-[#b89764]/30 shadow bg-[#1d1d1b] p-4 flex items-center justify-center"
              >
                <img src="./assets/logo_norta_principal.png" alt="Logo NORTA" className="w-full h-full object-contain group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="font-cinzel text-xs font-bold text-white">Emblema Institucional</p>
                  <p className="text-[10px] text-[#c9b38f] font-mono-brew">Identidad Gráfica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DECÁLOGO DE CALIDAD & FILOSOFÍA GRAIN-TO-GLASS */}
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

          {/* Dos Columnas Numeradas */}
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

          {/* Sello de Garantía y Firma del Maestro Cervecero */}
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

      {/* 3. MODAL: FICHA DE CATA SOMMELIER & RECETA MAESTRA */}
      {selectedBeerModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#fdfbf7] border-2 border-[#b89764] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-modalScale">
            {/* Header Modal */}
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

            {/* Contenido del Modal */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-lato text-slate-800">
              {/* Métricas Técnicas */}
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
                  <p className="font-mono-brew text-xs font-extrabold text-[#0e2334] mt-1">{selectedBeerModal.servingTemp || "6-8°C"}</p>
                </div>
              </div>

              {/* Perfil Sensorial */}
              <div className="space-y-2 bg-[#fdfbf7] p-4 rounded-xl border border-[#4d3720]/15">
                <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                  <span>🍷</span> Notas de Cata del Sommelier
                </h4>
                <p className="font-baskerville italic text-slate-700 text-sm leading-relaxed">
                  "{selectedBeerModal.sensoryDescription}"
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(selectedBeerModal.sensoryTags || []).map((tag, idx) => (
                    <span key={idx} className="spec-badge bg-[#0e2334]/10 text-[#0e2334]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formulación de Granos (Malt Bill) */}
              <div className="space-y-2">
                <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                  <span>🌾</span> Formulación de Granos (Malt Bill)
                </h4>
                <div className="bg-white rounded-xl border border-[#4d3720]/15 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#f2ebd9] text-[#4d3720] font-mono-brew">
                      <tr>
                        <th className="p-2.5">Variedad de Malta</th>
                        <th className="p-2.5 text-center">% Grist</th>
                        <th className="p-2.5 text-right">Peso (1000L)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(selectedBeerModal.grains || []).map((g, idx) => (
                        <tr key={idx}>
                          <td className="p-2.5 font-medium text-slate-700">{g.name}</td>
                          <td className="p-2.5 text-center font-mono-brew font-bold text-[#b89764]">{g.percentage}%</td>
                          <td className="p-2.5 text-right font-mono-brew text-slate-600">{g.kg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lúpulos y Levadura */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                    <span>🌿</span> Cronograma de Lúpulos
                  </h4>
                  <div className="bg-white rounded-xl border border-[#4d3720]/15 p-3 space-y-2 text-xs">
                    {(selectedBeerModal.hops || []).map((h, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-1 last:border-b-0">
                        <span className="font-medium text-slate-700">{h.name}</span>
                        <span className="font-mono-brew font-bold text-[#3a452d]">{h.g}g</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-cinzel text-sm font-bold text-[#0e2334] flex items-center gap-2">
                    <span>🔬</span> Levadura & Maceración
                  </h4>
                  <div className="bg-white rounded-xl border border-[#4d3720]/15 p-3 space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-[#4d3720] block">Cepa de Levadura:</span>
                      <p className="text-slate-600">{selectedBeerModal.yeast}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#4d3720] block">Perfil Macerado:</span>
                      <p className="font-mono-brew text-slate-600">{selectedBeerModal.mashTemp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maridaje y Cristalería */}
              <div className="p-4 bg-[#eee7da] rounded-xl border border-[#4d3720]/15 space-y-1 text-xs">
                <span className="font-cinzel font-bold text-[#0e2334] block">Maridaje Sommelier Sugerido:</span>
                <p className="text-slate-700 italic">
                  {selectedBeerModal.pairing || "Carnes maduradas, quesos de guarda y platos de autor."}
                </p>
                <p className="text-[11px] text-[#4d3720] font-mono-brew pt-1">
                  Cristalería sugerida: {selectedBeerModal.glassware}
                </p>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#f2ebd9] border-t border-[#4d3720]/20 flex justify-end">
              <button
                onClick={() => setSelectedBeerModal(null)}
                className="px-6 py-2 rounded-xl bg-[#0e2334] text-white font-cinzel text-xs font-bold hover:bg-[#b89764] hover:text-[#1d1d1b] transition shadow"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: LIGHTBOX DE FOTOGRAFÍA / MOODBOARD */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1d1d1b] border-2 border-[#b89764] rounded-2xl overflow-hidden shadow-2xl my-8 animate-modalScale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[65vh] bg-black flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-[#b89764] text-white hover:text-[#1d1d1b] flex items-center justify-center text-lg font-bold transition shadow"
              >
                ✕
              </button>
            </div>
            <div className="p-5 bg-[#1d1d1b] border-t border-[#b89764]/40 flex items-center justify-between text-white">
              <div>
                <h4 className="font-cinzel text-lg font-bold text-[#c9b38f]">
                  {lightboxImage.title}
                </h4>
                <p className="font-lato text-xs text-slate-300">
                  {lightboxImage.subtitle}
                </p>
              </div>
              <span className="spec-badge bg-[#0e2334] text-[#c9b38f]">
                Archivo Visual NORTA
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// MODALES NUEVOS

// ==========================================================================
// COMPONENTE: InventoryMovementModal (CENTRAL DE MOVIMIENTOS E INTERCONEXIÓN)
// ==========================================================================
function InventoryMovementModal({ data, onClose, onSubmit }) {
  const [direction, setDirection] = useState('ENTRADA'); // 'ENTRADA' | 'SALIDA'
  const [category, setCategory] = useState('RAW'); // 'RAW' | 'WIP' | 'FINISHED' | 'EQUIPMENT'
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');
  const [linkTargetId, setLinkTargetId] = useState(''); // Lote WIP destino o SKU Terminado destino

  const rawInventory = data.rawInventory || [];
  const batches = data.batches || [];
  const finishedGoods = data.finishedGoods || [];
  const machinery = data.machineryAndEquipment || [];

  // Opciones de motivo según dirección y categoría
  const getReasonOptions = () => {
    if (direction === 'ENTRADA') {
      if (category === 'RAW') {
        return [
          { val: 'Compra a proveedor', label: '🛒 Compra a Proveedor' },
          { val: 'Devolución de producción', label: '↩️ Devolución de Producción' },
          { val: 'Ajuste inicial de inventario', label: '📝 Ajuste Inicial / Conteo Físico' }
        ];
      }
      if (category === 'WIP') {
        return [
          { val: 'Inicio de cocción directa', label: '🍺 Inicio de Cocción Directa' },
          { val: 'Ajuste de volumen en tanque', label: '⚖️ Ajuste de Volumen en Tanque' }
        ];
      }
      if (category === 'FINISHED') {
        return [
          { val: 'Envasado directo de bodega', label: '📦 Envasado Directo de Bodega' },
          { val: 'Devolución de cliente B2B', label: '↩️ Devolución de Cliente B2B' },
          { val: 'Ajuste de inventario físico', label: '📝 Ajuste de Inventario Físico' }
        ];
      }
      if (category === 'EQUIPMENT') {
        return [
          { val: 'Adquisición de nuevo activo', label: '✨ Adquisición de Nuevo Activo' },
          { val: 'Retorno de mantenimiento externo', label: '🛠️ Retorno de Mantenimiento Externo' }
        ];
      }
    } else {
      // SALIDAS
      if (category === 'RAW') {
        return [
          { val: 'Uso en producción', label: '⚡ Uso en Producción (Transformación -> Genera WIP)', isTransform: true },
          { val: 'Baja / Pérdida / Merma', label: '⚠️ Baja / Pérdida / Merma (Requiere Justificación Obligatoria)', isLoss: true },
          { val: 'Caducidad de insumo', label: '⏳ Caducidad de Insumo (Requiere Justificación Obligatoria)', isLoss: true },
          { val: 'Muestra a laboratorio o análisis', label: '🔬 Muestra a Laboratorio o Análisis' },
          { val: 'Ajuste negativo por inventario', label: '📉 Ajuste Negativo por Inventario' }
        ];
      }
      if (category === 'WIP') {
        return [
          { val: 'Finalización de lote', label: '🍺 Finalización de Lote (Transformación -> Genera Producto Terminado)', isTransform: true },
          { val: 'Merma por contaminación o fallo microbiológico', label: '⚠️ Merma por Contaminación / Fallo (Baja Obligatoria)', isLoss: true },
          { val: 'Merma en trasiego / purga de levadura', label: '📉 Merma en Trasiego / Purga', isLoss: true }
        ];
      }
      if (category === 'FINISHED') {
        return [
          { val: 'Despacho comercial B2B', label: '🚚 Despacho Comercial B2B / Venta' },
          { val: 'Baja por rotura o pérdida de gas', label: '⚠️ Baja por Daño Físico / Rotura / Pérdida de Gas', isLoss: true },
          { val: 'Consumo interno / Degustación Taproom', label: '🍻 Consumo Interno / Degustación' },
          { val: 'Vencimiento en cava fría', label: '⏳ Vencimiento en Cava Fría (Baja Obligatoria)', isLoss: true }
        ];
      }
      if (category === 'EQUIPMENT') {
        return [
          { val: 'Baja por avería irreparable', label: '💥 Baja por Avería Irreparable (Baja Obligatoria)', isLoss: true },
          { val: 'Envío a mantenimiento preventivo/correctivo', label: '🛠️ Envío a Mantenimiento' },
          { val: 'Desincorporación por obsolescencia', label: '📦 Desincorporación por Obsolescencia', isLoss: true }
        ];
      }
    }
    return [{ val: 'Ajuste general', label: 'Ajuste General' }];
  };

  // Inicializar ítem y motivo por defecto al cambiar categoría o dirección
  useEffect(() => {
    const reasons = getReasonOptions();
    setReason(reasons[0].val);

    if (category === 'RAW' && rawInventory.length > 0) {
      setSelectedItemId(rawInventory[0].id);
    } else if (category === 'WIP' && batches.length > 0) {
      setSelectedItemId(batches[0].id);
    } else if (category === 'FINISHED' && finishedGoods.length > 0) {
      setSelectedItemId(finishedGoods[0].id);
    } else if (category === 'EQUIPMENT' && machinery.length > 0) {
      setSelectedItemId(machinery[0].id);
    }

    if (batches.length > 0) setLinkTargetId(batches[0].id);
  }, [category, direction]);

  const selectedItemObj = useMemo(() => {
    if (category === 'RAW') return rawInventory.find(i => i.id === selectedItemId);
    if (category === 'WIP') return batches.find(b => b.id === selectedItemId);
    if (category === 'FINISHED') return finishedGoods.find(f => f.id === selectedItemId);
    if (category === 'EQUIPMENT') return machinery.find(m => m.id === selectedItemId);
    return null;
  }, [category, selectedItemId, rawInventory, batches, finishedGoods, machinery]);

  // Es una baja que exige motivo/observación obligatoria
  const isLossOrDamage = useMemo(() => {
    if (direction !== 'SALIDA') return false;
    const r = reason.toLowerCase();
    return r.includes('baja') || r.includes('merma') || r.includes('caducidad') || r.includes('avería') || r.includes('vencimiento') || r.includes('daño');
  }, [direction, reason]);

  // Es transformación
  const isTransformation = useMemo(() => {
    if (direction !== 'SALIDA') return false;
    return (category === 'RAW' && reason === 'Uso en producción') ||
           (category === 'WIP' && reason === 'Finalización de lote');
  }, [direction, category, reason]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      alert('Ingresa una cantidad numérica válida mayor a 0.');
      return;
    }

    // Validación de justificación obligatoria en bajas
    if (isLossOrDamage && (!notes || notes.trim().length < 8)) {
      alert('⚠️ ATENCIÓN: El campo de "Observaciones / Motivo de la transacción" es OBLIGATORIO para bajas, mermas o averías (mínimo 8 caracteres para auditoría).');
      return;
    }

    const payload = {
      direction,
      category,
      itemId: selectedItemId,
      itemObj: selectedItemObj,
      quantity: qtyNum,
      reason,
      notes: notes.trim(),
      responsible,
      isTransformation,
      isLossOrDamage,
      linkTargetId: isTransformation ? linkTargetId : null
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="max-w-2xl w-full p-6 rounded-2xl border border-[#b89764]/40 bg-[#161512] shadow-2xl space-y-5 text-white max-h-[92vh] overflow-y-auto">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-start border-b border-[#2d2a24] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0e2334] border border-[#b89764]/50 flex items-center justify-center text-xl shadow">
              🔄
            </div>
            <div>
              <h3 className="brand-title text-lg font-bold text-[#b89764]">
                Registro Universal de Movimientos de Inventario
              </h3>
              <p className="text-xs text-[#a39e93]">
                Kardex centralizado, trazabilidad de bajas y flujo automatizado de producción.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a39e93] hover:text-white text-lg font-bold p-1">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* TIPO DE MOVIMIENTO (ENTRADA / SALIDA) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDirection('ENTRADA')}
              className={`py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                direction === 'ENTRADA'
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50'
                  : 'bg-[#1f1e1a] border-[#2d2a24] text-[#a39e93] hover:text-white'
              }`}
            >
              <span className="text-base">📥</span> ENTRADA (Compra / Ingreso / Retorno)
            </button>
            <button
              type="button"
              onClick={() => setDirection('SALIDA')}
              className={`py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                direction === 'SALIDA'
                  ? 'bg-red-600/30 border-red-500 text-red-300 shadow-md ring-1 ring-red-500/50'
                  : 'bg-[#1f1e1a] border-[#2d2a24] text-[#a39e93] hover:text-white'
              }`}
            >
              <span className="text-base">📤</span> SALIDA (Uso / Merma / Baja / Venta)
            </button>
          </div>

          {/* SELECCIÓN DE CATEGORÍA */}
          <div>
            <label className="brew-label text-[11px]">Categoría de Inventario Afectada</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'RAW', label: '🌾 Insumos (Raw)', count: rawInventory.length },
                { id: 'WIP', label: '🍺 Proceso (WIP)', count: batches.length },
                { id: 'FINISHED', label: '📦 Terminado', count: finishedGoods.length },
                { id: 'EQUIPMENT', label: '⚙️ Maquinaria', count: machinery.length }
              ].map(c => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    category === c.id
                      ? 'bg-[#b89764] text-[#121210] font-bold border-[#b89764] shadow'
                      : 'bg-[#1c1b17] border-[#2d2a24] text-[#a39e93] hover:text-white'
                  }`}
                >
                  <div className="text-xs">{c.label}</div>
                  <div className="text-[10px] opacity-75">{c.count} registrados</div>
                </button>
              ))}
            </div>
          </div>

          {/* SELECCIÓN DEL ARTÍCULO / LOTE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="brew-label text-[11px]">Artículo / Equipo / Lote Específico</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="brew-select w-full font-bold"
                required
              >
                {category === 'RAW' && rawInventory.map(i => (
                  <option key={i.id} value={i.id}>
                    [{i.id}] {i.name} (Stock: {i.stock} {i.unit})
                  </option>
                ))}
                {category === 'WIP' && batches.map(b => (
                  <option key={b.id} value={b.id}>
                    [{b.id}] {b.recipeName} - Tanque {b.tankId} ({b.volumeLiters} L)
                  </option>
                ))}
                {category === 'FINISHED' && finishedGoods.map(f => (
                  <option key={f.id} value={f.id}>
                    [{f.id}] {f.name} - {f.packaging} ({f.stockUnits} uds)
                  </option>
                ))}
                {category === 'EQUIPMENT' && machinery.map(m => (
                  <option key={m.id} value={m.id}>
                    [{m.id}] {m.name} ({m.currentStatus})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="brew-label text-[11px]">
                Cantidad ({selectedItemObj && (selectedItemObj.unit || (category === 'WIP' ? 'Litros' : 'Unidades'))})
              </label>
              <input
                type="number"
                step="any"
                min="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ej. 100"
                className="brew-input font-mono font-bold w-full"
                required
              />
            </div>
          </div>

          {/* MOTIVO DE LA TRANSACCIÓN */}
          <div>
            <label className="brew-label text-[11px]">Motivo / Tipificación de la Transacción</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="brew-select w-full font-semibold"
              required
            >
              {getReasonOptions().map((opt, idx) => (
                <option key={idx} value={opt.val}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* ALERTA DE FLUJO DE PRODUCCIÓN AUTOMATIZADO */}
          {isTransformation && (
            <div className="p-3.5 rounded-xl bg-[#0e2334]/70 border border-[#b89764] space-y-2">
              <div className="flex items-center gap-2 text-[#b89764] font-bold text-xs">
                <span>🔄</span>
                <span>Interconexión de Flujo de Producción Activada</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {category === 'RAW' && (
                  <>
                    Esta salida descontará los insumos de bodega y generará automáticamente un movimiento de entrada en <strong>Producto en Proceso (WIP)</strong> para alimentar el lote seleccionado:
                  </>
                )}
                {category === 'WIP' && (
                  <>
                    Esta salida liberará el tanque en proceso y generará automáticamente la entrada correspondiente en el inventario de <strong>Producto Terminado</strong>:
                  </>
                )}
              </p>
              <div>
                <label className="text-[10px] text-[#a39e93] font-bold uppercase block mb-1">
                  {category === 'RAW' ? 'Lote Destino en Fermentador / Tanque' : 'Presentación / SKU Destino en Bodega'}
                </label>
                <select
                  value={linkTargetId}
                  onChange={(e) => setLinkTargetId(e.target.value)}
                  className="brew-select w-full font-bold text-xs"
                >
                  {category === 'RAW' && batches.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} • {b.recipeName} ({b.tankId})
                    </option>
                  ))}
                  {category === 'WIP' && finishedGoods.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.id} • {f.name} ({f.packaging})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* OBSERVACIONES / JUSTIFICACIÓN DE AUDITORÍA */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="brew-label text-[11px] mb-0">
                Observaciones / Motivo de la Transacción
              </label>
              {isLossOrDamage ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-900/60 text-red-200 border border-red-700 animate-pulse">
                  ⚠️ OBLIGATORIO PARA BAJAS / MERMAS
                </span>
              ) : (
                <span className="text-[10px] text-[#a39e93]">Opcional</span>
              )}
            </div>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isLossOrDamage
                  ? "Describe detalladamente la causa de la baja, lote de origen, rotura, merma o resultado microbiológico para auditoría..."
                  : "Notas operativas adicionales, número de factura, lote del proveedor, etc."
              }
              className={`brew-input w-full ${isLossOrDamage ? 'border-red-500/70 focus:border-red-400' : ''}`}
              required={isLossOrDamage}
            ></textarea>
          </div>

          {/* RESPONSABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="brew-label text-[11px]">Responsable del Movimiento</label>
              <input
                type="text"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                className="brew-input font-semibold w-full"
                required
              />
            </div>
            <div className="flex items-end">
              <div className="text-[10px] text-[#a39e93] p-2 rounded-lg bg-[#141310] border border-[#2d2a24] w-full">
                Sincronización en tiempo real con recálculo dinámico de stock y balances contables.
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#2d2a24]">
            <button
              type="button"
              onClick={onClose}
              className="btn-norta-secondary text-xs py-2 px-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn-norta-primary text-xs py-2 px-5 font-bold shadow-lg ${
                direction === 'SALIDA' ? 'bg-gradient-to-r from-red-800 to-amber-700 text-white' : ''
              }`}
            >
              {direction === 'ENTRADA' ? '📥 Registrar Entrada' : '📤 Registrar Salida'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ==========================================================================
// COMPONENTE: BreweryApp
// ==========================================================================
function BreweryApp() {
  const [data, setData] = useState(() => {
    let loaded = INITIAL_BREWERY_DATA;
    if (typeof StorageService !== 'undefined' && StorageService.loadData) {
      loaded = StorageService.loadData(INITIAL_BREWERY_DATA);
    }
    if (typeof DataRepository !== 'undefined' && DataRepository.indexData) {
      DataRepository.indexData(loaded);
    }
    return loaded;
  });

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("NORTA_THEME") || 'light'; } catch (_) { return 'light'; }
  });
  
  // Módulos: 'dashboard' | 'brand' | 'production' | 'erp' | 'crm' | 'b2b_portal' | 'docs' | 'processes' | 'hr' | 'legal' | 'architecture'
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Sub-pestañas
  const [prodTab, setProdTab] = useState('batches');
  const [erpTab, setErpTab] = useState('raw');
  const [crmTab, setCrmTab] = useState('clients');
  const [procTab, setProcTab] = useState('cip');
  const [hrTab, setHrTab] = useState('team');
  const [legalTab, setLegalTab] = useState('sanitary');

  // Modales y estados
  const [modalType, setModalType] = useState(null); // 'newBatch' | 'batchDetail' | 'tankDetail' | 'newOrder' | 'newCip' | 'newLab' | 'recipeDetail' | 'newDocument' | 'logFermentation'
  const [selectedItem, setSelectedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recallSearchLot, setRecallSearchLot] = useState('LOT-2026-088');
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);

  // Portal B2B State
  const [b2bClient, setB2bClient] = useState(data.clients && data.clients[0] ? data.clients[0] : null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (typeof StorageService !== 'undefined' && StorageService.saveData) {
      StorageService.saveData(data);
    }
    if (typeof DataRepository !== 'undefined' && DataRepository.indexData) {
      DataRepository.indexData(data);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem("NORTA_THEME", theme);
      if (typeof document !== 'undefined') {
        document.documentElement.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
          document.body.className = `${theme === 'dark' ? 'theme-dark bg-[#141412] text-[#fbfbfa]' : 'theme-light bg-[#f5f2eb] text-[#0a1926]'} antialiased selection:bg-[#b89764] selection:text-[#121210]`;
        }
      }
    } catch (_) {}
  }, [theme]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // --- HANDLER CENTRAL: MOVIMIENTOS DE INVENTARIO E INTERCONEXIÓN ---
  const handleCreateInventoryMovement = (movement) => {
    setData(prev => {
      const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
      const isEntry = movement.direction === 'ENTRADA';
      const qty = movement.quantity;
      const movId = `MOV-${Date.now().toString().slice(-6)}`;

      let updatedRaw = prev.rawInventory || [];
      let updatedBatches = prev.batches || [];
      let updatedFinished = prev.finishedGoods || [];
      let updatedMachinery = prev.machineryAndEquipment || [];
      const newMovements = [...(prev.inventoryMovements || [])];

      // Registro principal en Kardex
      const primaryRecord = {
        id: movId,
        date: nowStr,
        type: movement.isTransformation ? 'TRANSFORMACION' : (isEntry ? 'ENTRADA' : 'SALIDA'),
        category: movement.category === 'RAW' ? 'Insumos (Raw)' :
                  movement.category === 'WIP' ? 'Proceso (WIP)' :
                  movement.category === 'FINISHED' ? 'Terminado (Finished)' : 'Maquinaria',
        itemCode: movement.itemId,
        itemName: movement.itemObj ? (movement.itemObj.name || movement.itemObj.recipeName || movement.itemObj.equipmentName || movement.itemId) : movement.itemId,
        quantity: isEntry ? `+${qty}` : `-${qty}`,
        unit: movement.itemObj ? (movement.itemObj.unit || (movement.category === 'WIP' ? 'L' : 'unidades')) : 'unidades',
        reason: movement.reason,
        notes: movement.notes || (movement.isLossOrDamage ? 'Baja justificada por auditoría técnica.' : 'Transacción operativa estándar.'),
        responsible: movement.responsible || 'Ing. Julio Roberto Cristancho'
      };
      newMovements.unshift(primaryRecord);

      // CASO 1: MATERIAS PRIMAS (RAW)
      if (movement.category === 'RAW') {
        updatedRaw = updatedRaw.map(item => {
          if (item.id === movement.itemId) {
            const currentEntries = Number(item.entries) || 0;
            const currentExits = Number(item.exits) || 0;
            const newEntries = isEntry ? currentEntries + qty : currentEntries;
            const newExits = !isEntry ? currentExits + qty : currentExits;
            const stockInit = Number(item.stockInitial) || 0;
            const newStock = Math.max(0, parseFloat((stockInit + newEntries - newExits).toFixed(2)));
            return {
              ...item,
              entries: newEntries,
              exits: newExits,
              stock: newStock
            };
          }
          return item;
        });

        // Interconexión Automática: Uso en Producción -> Alimenta Lote WIP
        if (!isEntry && movement.isTransformation && movement.linkTargetId) {
          const targetBatch = updatedBatches.find(b => b.id === movement.linkTargetId);
          const autoBatchId = targetBatch ? targetBatch.id : movement.linkTargetId;
          const autoWipMov = {
            id: `MOV-TR-${Date.now().toString().slice(-5)}`,
            date: nowStr,
            type: 'TRANSFORMACION_AUTO',
            category: 'Proceso (WIP)',
            itemCode: autoBatchId,
            itemName: targetBatch ? `${targetBatch.recipeName} (${targetBatch.id})` : `Lote ${autoBatchId}`,
            quantity: `+${qty}`,
            unit: movement.itemObj ? movement.itemObj.unit : 'kg',
            reason: `Insumo incorporado desde salida de ${movement.itemObj ? movement.itemObj.name : movement.itemId}`,
            notes: `Auto-generado por transformación en producción. Lote destino: ${autoBatchId}.`,
            responsible: movement.responsible
          };
          newMovements.unshift(autoWipMov);
        }
      }

      // CASO 2: PRODUCTO EN PROCESO (WIP)
      else if (movement.category === 'WIP') {
        // Interconexión Automática: Finalización de Lote -> Alimenta Producto Terminado (Finished)
        if (!isEntry && movement.isTransformation) {
          const batch = updatedBatches.find(b => b.id === movement.itemId);
          const recipeName = batch ? batch.recipeName : '';
          const unitsCreated = Math.round(qty * 2.5);

          let targetFound = false;
          updatedFinished = updatedFinished.map(fg => {
            const matches = (movement.linkTargetId && fg.id === movement.linkTargetId) ||
                            (recipeName && (fg.name.includes(recipeName) || recipeName.includes(fg.beerName)));
            if (matches && !targetFound) {
              targetFound = true;
              return {
                ...fg,
                stockUnits: (Number(fg.stockUnits) || 0) + unitsCreated
              };
            }
            return fg;
          });

          if (!targetFound && updatedFinished.length > 0) {
            updatedFinished[0] = {
              ...updatedFinished[0],
              stockUnits: (Number(updatedFinished[0].stockUnits) || 0) + unitsCreated
            };
          }

          const autoFgMov = {
            id: `MOV-TR-${Date.now().toString().slice(-5)}`,
            date: nowStr,
            type: 'TRANSFORMACION_AUTO',
            category: 'Terminado (Finished)',
            itemCode: movement.linkTargetId || 'FG-AUTO',
            itemName: recipeName ? `Stock Terminado: ${recipeName}` : 'Stock Envasado Terminado',
            quantity: `+${unitsCreated}`,
            unit: 'unidades',
            reason: `Envasado finalizado desde Lote ${movement.itemId}`,
            notes: `Auto-generado por finalización y empaque de lote (${qty} L procesados).`,
            responsible: movement.responsible
          };
          newMovements.unshift(autoFgMov);

          updatedBatches = updatedBatches.map(b => {
            if (b.id === movement.itemId) {
              return { ...b, stage: 'Completado', status: 'Completado', stageProgress: 100 };
            }
            return b;
          });
        }
      }

      // CASO 3: PRODUCTO TERMINADO (FINISHED)
      else if (movement.category === 'FINISHED') {
        updatedFinished = updatedFinished.map(fg => {
          if (fg.id === movement.itemId) {
            const currentUnits = Number(fg.stockUnits) || 0;
            const newUnits = isEntry ? currentUnits + Math.round(qty) : Math.max(0, currentUnits - Math.round(qty));
            return {
              ...fg,
              stockUnits: newUnits
            };
          }
          return fg;
        });
      }

      // CASO 4: MAQUINARIA Y EQUIPO (EQUIPMENT)
      else if (movement.category === 'EQUIPMENT') {
        updatedMachinery = updatedMachinery.map(m => {
          if (m.id === movement.itemId) {
            if (!isEntry && movement.isLossOrDamage) {
              return {
                ...m,
                operationalStatus: 'Fuera de Servicio / En Reparación',
                maintenanceNotes: `Baja/Novedad reportada: ${movement.notes} (${nowStr})`
              };
            }
            return m;
          }
          return m;
        });
      }

      // Sincronización final de rawInventory
      const finalRaw = updatedRaw.map(it => {
        const stockInit = Number(it.stockInitial) || 0;
        const ent = Number(it.entries) || 0;
        const ex = Number(it.exits) || 0;
        return {
          ...it,
          stock: Math.max(0, parseFloat((stockInit + ent - ex).toFixed(2)))
        };
      });

      return {
        ...prev,
        rawInventory: finalRaw,
        batches: updatedBatches,
        finishedGoods: updatedFinished,
        machineryAndEquipment: updatedMachinery,
        inventoryMovements: newMovements
      };
    });

    setModalType(null);
    showToast(`Movimiento ${movement.direction} registrado exitosamente.`);
  };






  // --- HANDLERS MÓDULO 3: CALIBRACIÓN (BPM-FO-27) ---
  const handleAddPhMeterLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      phMeterLogs: [newEntry, ...(prev.phMeterLogs || [])]
    }));
    showToast(`Verificación de pH-metro del ${newEntry.date} registrada en BPM-FO-27.`);
  };

  const handleDeletePhMeterLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de verificación de pH-metro?")) {
      setData(prev => ({ ...prev, phMeterLogs: (prev.phMeterLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro de pH-metro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 4: CAPACITACIÓN (FO-CAP-001) ---
  const handleAddTrainingAttendance = (newEntry) => {
    setData(prev => ({
      ...prev,
      trainingAttendance: [newEntry, ...(prev.trainingAttendance || [])]
    }));
    showToast(`Asistencia de ${newEntry.employee} a capacitaciones registrada.`);
  };

  const handleDeleteTrainingAttendance = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de asistencia?")) {
      setData(prev => ({ ...prev, trainingAttendance: (prev.trainingAttendance || []).filter(l => l.id !== logId) }));
      showToast("Registro de asistencia eliminado.");
    }
  };


  // --- HANDLERS MÓDULO 6: LIMPIEZA Y DESINFECCIÓN (FO-LD-001) ---
  const handleAddCleaningLog = (newEntry) => {
    setData(prev => ({ ...prev, cleaningSanitationLogs: [newEntry, ...(prev.cleaningSanitationLogs || [])] }));
    showToast(`Limpieza POES de ${newEntry.area} registrada.`);
  };
  const handleDeleteCleaningLog = (logId) => {
    if (confirm("¿Eliminar registro de limpieza?")) {
      setData(prev => ({ ...prev, cleaningSanitationLogs: (prev.cleaningSanitationLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 7: MANEJO DE RESIDUOS (FO-RS-001) ---
  const handleAddWasteLog = (newEntry) => {
    setData(prev => ({ ...prev, wasteManagementLogs: [newEntry, ...(prev.wasteManagementLogs || [])] }));
    showToast(`Entrega de ${newEntry.wasteType} registrada.`);
  };
  const handleDeleteWasteLog = (logId) => {
    if (confirm("¿Eliminar registro de residuos?")) {
      setData(prev => ({ ...prev, wasteManagementLogs: (prev.wasteManagementLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 8: MANTENIMIENTO (FO-MTTO-001) ---
  const handleAddMaintenanceLog = (newEntry) => {
    setData(prev => ({ ...prev, maintenanceLogs: [newEntry, ...(prev.maintenanceLogs || [])] }));
    showToast(`Mantenimiento de ${newEntry.equipment} registrado.`);
  };
  const handleDeleteMaintenanceLog = (logId) => {
    if (confirm("¿Eliminar registro de mantenimiento?")) {
      setData(prev => ({ ...prev, maintenanceLogs: (prev.maintenanceLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 9: MUESTREO Y CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001) ---
  const handleAddSamplingLog = (newEntry) => {
    setData(prev => ({ ...prev, samplingLogs: [newEntry, ...(prev.samplingLogs || [])] }));
    showToast(`Muestreo de ${newEntry.sampleObject} registrado.`);
  };
  const handleDeleteSamplingLog = (logId) => {
    if (confirm("¿Eliminar registro de muestreo?")) {
      setData(prev => ({ ...prev, samplingLogs: (prev.samplingLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 10: PROVEEDORES (FO-PROV-001) ---
  const handleAddSupplier = (newEntry) => {
    setData(prev => ({ ...prev, suppliersList: [newEntry, ...(prev.suppliersList || [])] }));
    showToast(`Proveedor ${newEntry.name} registrado.`);
  };
  const handleDeleteSupplier = (logId) => {
    if (confirm("¿Eliminar proveedor?")) {
      setData(prev => ({ ...prev, suppliersList: (prev.suppliersList || []).filter(l => l.id !== logId) }));
      showToast("Proveedor eliminado.");
    }
  };

  // --- HANDLERS MÓDULO 11: TRAZABILIDAD Y CONTRAMUESTRAS (FO-TRA-001) ---
  const handleAddRetainedSample = (newEntry) => {
    setData(prev => ({ ...prev, retainedSamplesLogs: [newEntry, ...(prev.retainedSamplesLogs || [])] }));
    showToast(`Contramuestra de ${newEntry.beerName} (${newEntry.batchLot}) registrada.`);
  };
  const handleDeleteRetainedSample = (logId) => {
    if (confirm("¿Eliminar registro de contramuestra?")) {
      setData(prev => ({ ...prev, retainedSamplesLogs: (prev.retainedSamplesLogs || []).filter(l => l.id !== logId) }));
      showToast("Contramuestra eliminada.");
    }
  };

  // --- HANDLERS MÓDULO 5: CONTROL DE PLAGAS (PG-GC-004) ---
  const handleAddPestLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      pestControlLogs: [newEntry, ...(prev.pestControlLogs || [])]
    }));
    showToast(`Inspección de plagas en ${newEntry.station} registrada.`);
  };

  const handleDeletePestLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de control de plagas?")) {
      setData(prev => ({ ...prev, pestControlLogs: (prev.pestControlLogs || []).filter(l => l.id !== logId) }));
      showToast("Registro de inspección de plagas eliminado.");
    }
  };

  // --- HANDLERS PARA EL FORMATO DE INGRESO DE MATERIALES (FO-ALM-001) ---
  const handleAddStorageLog = (newEntry) => {
    setData(prev => ({
      ...prev,
      storageIngressLogs: [newEntry, ...(prev.storageIngressLogs || [])]
    }));
    showToast(`Ingreso de ${newEntry.product} registrado en formato FO-ALM-001.`);
  };

  const handleDeleteStorageLog = (logId) => {
    if (confirm("¿Estás seguro de eliminar este registro de ingreso de material?")) {
      setData(prev => ({
        ...prev,
        storageIngressLogs: (prev.storageIngressLogs || []).filter(l => l.id !== logId)
      }));
      showToast("Registro de ingreso de material eliminado.");
    }
  };

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

  // --- FUNCIONES DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS) ---
  const handleAddInvimaDoc = (docData) => {
    setData(prev => {
      const programs = prev.invimaControlSystem || [];
      const updatedPrograms = programs.map(p => {
        if (p.folderName === docData.folderName) {
          return {
            ...p,
            fileCount: p.fileCount + 1,
            files: [docData, ...p.files]
          };
        }
        return p;
      });
      return { ...prev, invimaControlSystem: updatedPrograms };
    });
    setModalType(null);
    showToast(`Documento "${docData.name}" subido a la carpeta ${docData.folderName}.`);
  };

  const handleDeleteInvimaDoc = (programId, docId, docName) => {
    if (confirm(`¿Estás seguro de eliminar el documento "${docName}" del sistema INVIMA?`)) {
      setData(prev => {
        const programs = prev.invimaControlSystem || [];
        const updatedPrograms = programs.map(p => {
          if (p.id === programId) {
            const filteredFiles = p.files.filter(f => f.id !== docId);
            return {
              ...p,
              fileCount: filteredFiles.length,
              files: filteredFiles
            };
          }
          return p;
        });
        return { ...prev, invimaControlSystem: updatedPrograms };
      });
      showToast(`Documento "${docName}" eliminado del sistema INVIMA.`);
    }
  };

  const handleAddInvimaProgram = (newProgramName) => {
    const newProg = {
      id: `PRG-${Math.floor(10 + Math.random() * 90)}`,
      folderName: newProgramName,
      title: newProgramName,
      fileCount: 0,
      status: "Vigente 🟢",
      files: []
    };
    setData(prev => ({
      ...prev,
      invimaControlSystem: [...(prev.invimaControlSystem || []), newProg]
    }));
    setModalType(null);
    showToast(`Nueva carpeta/programa "${newProgramName}" creada.`);
  };

  // --- DESCUENTO AUTOMÁTICO DE INVENTARIO (BOM DEDUCT-ON-BREW) ---
  const handleCreateBatch = (newBatchData) => {
    // Buscar la receta seleccionada
    const recipe = data.recipes.find(r => r.id === newBatchData.recipeId) || data.recipes[0];
    
    // Descuento automático de stock de materia prima
    const updatedRawInventory = data.rawInventory.map(item => {
      let deductedAmount = 0;
      // Verificar maltas
      recipe.grains.forEach(g => {
        if (g.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) {
          deductedAmount += g.kg;
        }
      });
      // Verificar lúpulos
      recipe.hops.forEach(h => {
        if (h.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) {
          deductedAmount += (h.g / 1000); // gramos a kg
        }
      });
      return {
        ...item,
        stock: Math.max(0, parseFloat((item.stock - deductedAmount).toFixed(2)))
      };
    });

    setData(prev => ({
      ...prev,
      rawInventory: updatedRawInventory,
      batches: [newBatchData, ...prev.batches],
      tanks: prev.tanks.map(t => {
        if (t.id === newBatchData.tankId) {
          return {
            ...t,
            currentBatchId: newBatchData.id,
            beerName: newBatchData.recipeName,
            status: "Fermentando",
            currentL: newBatchData.volumeLiters,
            daysInTank: 1
          };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`¡Nuevo lote ${newBatchData.id} registrado! Se descontó materia prima del inventario BOM.`);
  };

  // --- REGISTRO DIARIO DE LECTURA FERMENTATIVA (BEER30 STYLE TIME-SERIES) ---
  const handleAddFermentationLog = (batchId, logEntry) => {
    setData(prev => ({
      ...prev,
      batches: prev.batches.map(b => {
        if (b.id === batchId) {
          const currentLogs = b.fermentationLogs || [];
          return {
            ...b,
            currentGravity: logEntry.sg,
            currentTemp: logEntry.tempC,
            fermentationLogs: [...currentLogs, logEntry]
          };
        }
        return b;
      })
    }));
    setModalType(null);
    showToast(`Lectura fermentativa registrada para el lote ${batchId}.`);
  };

  // --- CARGA DE DOCUMENTOS AL REPOSITORIO DMS ---
  const handleAddDocument = (newDoc) => {
    setData(prev => ({
      ...prev,
      documentRepository: [newDoc, ...prev.documentRepository]
    }));
    setModalType(null);
    showToast(`Documento "${newDoc.title}" cargado al Repositorio DMS.`);
  };

  // --- EXPORTADOR EXCEL / CSV UNIVERSAL (COMPATIBLE CON EXCEL, SIIGO, QUICKBOOKS) ---
  const exportToCSV = (filename, rows) => {
    if (!rows || !rows.length) {
      showToast("No hay registros para exportar en esta vista.");
      return;
    }
    const separator = ';'; // Delimitador estándar preferido por Excel en español
    // Extraer todas las llaves preservando el orden original
    const keys = Object.keys(rows[0]).filter(k => typeof rows[0][k] !== 'function' && k !== 'fermentationLogs' && k !== 'grains' && k !== 'hops' && k !== 'items');
    
    // Cabeceras limpias y legibles
    const headerRow = keys.join(separator);
    
    const bodyRows = rows.map(row => {
      return keys.map(k => {
        let cell = row[k];
        if (cell === null || cell === undefined) return '""';
        if (cell instanceof Date) {
          cell = cell.toISOString().slice(0, 10);
        } else if (typeof cell === 'object') {
          cell = JSON.stringify(cell);
        } else {
          cell = cell.toString();
        }
        // Escapar comillas dobles
        cell = cell.replace(/"/g, '""');
        return `"${cell}"`;
      }).join(separator);
    }).join('\r\n');

    // UTF-8 BOM (\uFEFF) para garantizar que Excel reconozca tildes, caracteres especiales y delimite columnas
    const csvContent = '\uFEFF' + headerRow + '\r\n' + bodyRows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const cleanFilename = filename.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.setAttribute('download', `${cleanFilename}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Reporte ${filename} exportado exitosamente con compatibilidad Excel.`);
  };

    const handleAdvanceBatchStage = (batchId) => {
    const stages = ["Maceración", "Hervor", "Fermentación", "Maduración", "Acondicionado", "Envasado", "Completado"];
    setData(prev => {
      let targetBatch = null;
      const updatedBatches = prev.batches.map(b => {
        if (b.id === batchId) {
          const currentIndex = stages.indexOf(b.stage);
          const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];
          const newProgress = Math.min(Math.round(((currentIndex + 2) / stages.length) * 100), 100);
          targetBatch = {
            ...b,
            stage: nextStage,
            stageProgress: newProgress,
            status: nextStage === "Completado" ? "Completado" : "Activo"
          };
          return targetBatch;
        }
        return b;
      });

      // 1. Si el lote avanza a 'Envasado' o 'Completado', incrementar stock de Producto Terminado (finishedGoods)
      let updatedFinishedGoods = prev.finishedGoods;
      if (targetBatch && (targetBatch.stage === "Envasado" || targetBatch.stage === "Completado")) {
        const unitsProduced = Math.round((targetBatch.volumeLiters || 500) / 0.5); // Botellas de 500ml
        updatedFinishedGoods = prev.finishedGoods.map(fg => {
          if (fg.beerName.toLowerCase().includes(targetBatch.recipeName.toLowerCase()) || 
              targetBatch.recipeName.toLowerCase().includes(fg.beerName.toLowerCase())) {
            return { ...fg, stockUnits: fg.stockUnits + unitsProduced };
          }
          return fg;
        });
      }

      // 2. Si el lote se completa, liberar el tanque y marcarlo 'Requiere CIP' en el Cellar Map
      let updatedTanks = prev.tanks;
      if (targetBatch && targetBatch.stage === "Completado") {
        updatedTanks = prev.tanks.map(t => {
          if (t.id === targetBatch.tankId) {
            return { ...t, status: "Requiere CIP 🟡", currentL: 0, beerName: "Vacío (Pendiente Lavado CIP)" };
          }
          return t;
        });
      }

      return {
        ...prev,
        batches: updatedBatches,
        finishedGoods: updatedFinishedGoods,
        tanks: updatedTanks
      };
    });
    showToast(`Lote ${batchId} avanzado a etapa siguiente con actualización en stock y Cellar Map.`);
  };

  const handleUpdateTankStatus = (tankId, newStatus, newTemp) => {
    setData(prev => ({
      ...prev,
      tanks: prev.tanks.map(t => {
        if (t.id === tankId) {
          return {
            ...t,
            status: newStatus,
            tempC: newTemp !== undefined ? parseFloat(newTemp) : t.tempC,
            currentL: newStatus === "CIP Aprobado" || newStatus === "Pendiente CIP" ? 0 : t.currentL
          };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`Tanque ${tankId} actualizado.`);
  };

  const handleCreateOrder = (order) => {
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
  };

  const handleCreateCipLog = (cip) => {
    setData(prev => ({
      ...prev,
      cipLogs: [cip, ...prev.cipLogs],
      tanks: prev.tanks.map(t => {
        if (cip.equipment.includes(t.id)) {
          return { ...t, status: "CIP Aprobado", lastCipDate: cip.date.split(' ')[0], currentL: 0, beerName: "Disponible para siembra" };
        }
        return t;
      })
    }));
    setModalType(null);
    showToast(`Registro CIP ${cip.id} completado.`);
  };

  const handleDeleteCipLog = (cipId) => {
    if (confirm(`¿Estás seguro de retirar el registro de lavado CIP ${cipId}?`)) {
      setData(prev => ({
        ...prev,
        cipLogs: prev.cipLogs.filter(c => c.id !== cipId)
      }));
      showToast(`Registro CIP ${cipId} retirado.`);
    }
  };

  const handleCreateQualityTest = (test) => {
    setData(prev => ({
      ...prev,
      qualityTests: [test, ...prev.qualityTests]
    }));
    setModalType(null);
    showToast(`Análisis de laboratorio ${test.id} guardado.`);
  };

  const handleDeleteQualityTest = (testId) => {
    if (confirm(`¿Estás seguro de retirar el análisis de calidad ${testId}?`)) {
      setData(prev => ({
        ...prev,
        qualityTests: prev.qualityTests.filter(t => t.id !== testId)
      }));
      showToast(`Análisis ${testId} retirado.`);
    }
  };

  // --- RETIRO DE LOTES Y ORDENES ---
  const handleDeleteBatch = (batchId) => {
    if (confirm(`¿Estás seguro de retirar/dar de baja el lote ${batchId}?`)) {
      setData(prev => ({
        ...prev,
        batches: prev.batches.filter(b => b.id !== batchId),
        tanks: prev.tanks.map(t => t.currentBatchId === batchId ? { ...t, currentBatchId: null, beerName: "Disponible", status: "Disponible" } : t)
      }));
      showToast(`Lote ${batchId} retirado del sistema.`);
    }
  };

  // --- GESTIÓN MANUAL CLIENTES B2B ---
  const handleAddClient = (client) => {
    setData(prev => ({
      ...prev,
      clients: [client, ...prev.clients]
    }));
    setModalType(null);
    showToast(`Cliente B2B "${client.name}" registrado.`);
  };

  const handleDeleteClient = (clientId, clientName) => {
    if (confirm(`¿Estás seguro de retirar al cliente "${clientName}" del CRM B2B?`)) {
      setData(prev => ({
        ...prev,
        clients: prev.clients.filter(c => c.id !== clientId)
      }));
      showToast(`Cliente "${clientName}" retirado.`);
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm(`¿Estás seguro de anular el pedido ${orderId}?`)) {
      setData(prev => ({
        ...prev,
        salesOrders: prev.salesOrders.filter(o => o.id !== orderId)
      }));
      showToast(`Pedido ${orderId} retirado.`);
    }
  };

  // --- GESTIÓN MANUAL TALENTO HUMANO ---
  const handleAddEmployee = (emp) => {
    setData(prev => ({
      ...prev,
      employees: [emp, ...prev.employees]
    }));
    setModalType(null);
    showToast(`Colaborador "${emp.name}" registrado en Talento Humano.`);
  };

  const handleDeleteEmployee = (empId, empName) => {
    if (confirm(`¿Estás seguro de dar de baja al colaborador "${empName}" de la planta?`)) {
      setData(prev => ({
        ...prev,
        employees: prev.employees.filter(e => e.id !== empId)
      }));
      showToast(`Colaborador "${empName}" retirado.`);
    }
  };

  // --- GESTIÓN MANUAL REGISTROS SANITARIOS / LEGAL ---
  const handleAddSanitaryRegistry = (reg) => {
    setData(prev => ({
      ...prev,
      legal: {
        ...prev.legal,
        sanitaryRegistries: [reg, ...(prev.legal?.sanitaryRegistries || [])]
      }
    }));
    setModalType(null);
    showToast(`Registro sanitario "${reg.beer}" agregado.`);
  };

  const handleDeleteSanitaryRegistry = (regCode) => {
    if (confirm(`¿Estás seguro de retirar el registro sanitario ${regCode}?`)) {
      setData(prev => ({
        ...prev,
        legal: {
          ...prev.legal,
          sanitaryRegistries: (prev.legal?.sanitaryRegistries || []).filter(r => r.code !== regCode)
        }
      }));
      showToast(`Registro sanitario ${regCode} retirado.`);
    }
  };

  // --- RETIRO DE DOCUMENTOS DMS ---
  const handleDeleteDocument = (docId, docTitle) => {
    if (confirm(`¿Estás seguro de retirar el documento "${docTitle}" del Repositorio DMS?`)) {
      setData(prev => ({
        ...prev,
        documentRepository: (prev.documentRepository || []).filter(d => d.id !== docId)
      }));
      showToast(`Documento "${docTitle}" retirado del DMS.`);
    }
  };

  const handleResetData = () => {
    if (confirm("¿Deseas restaurar los datos de fábrica de NORTA Brand Book 5.0?")) {
      const reset = (typeof StorageService !== 'undefined' && StorageService.resetFactory)
        ? StorageService.resetFactory(INITIAL_BREWERY_DATA)
        : INITIAL_BREWERY_DATA;
      setData(reset);
      if (typeof DataRepository !== 'undefined' && DataRepository.indexData) {
        DataRepository.indexData(reset);
      }
      showToast("Datos empresariales & Brand Book restaurados.");
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'theme-dark bg-[var(--bg-main)] text-[var(--text-primary)]' : 'theme-light bg-[var(--bg-main)] text-[var(--text-primary)]'} font-sans transition-colors duration-300`}>
      
      {/* SIDEBAR NORTA */}
      <aside className={`w-64 ${theme === 'dark' ? 'bg-[#181816] border-[#2d2a24]' : 'bg-[#eee7da] border-[#d4c8b5]'} border-r flex flex-col justify-between shrink-0 select-none`}>
        <div>
          <div className={`p-5 border-b ${theme === 'dark' ? 'border-[#2d2a24] bg-[#121210]' : 'border-[#d4c8b5] bg-[#e6dfce]'} flex items-center gap-3`}>
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#c9b38f]/60 shadow-md shrink-0 bg-[#0e2334] flex items-center justify-center p-0.5">
              <img src="./assets/logo_norta_principal.png" alt="Logo NORTA" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className={`brand-title text-xl font-bold ${theme === 'dark' ? 'text-[#c9b38f]' : 'text-[#0e2334]'} tracking-widest leading-none`}>NORTA</h1>
              <p className={`text-[10px] ${theme === 'dark' ? 'text-[#a39e93]' : 'text-[#4d3720]'} tracking-widest uppercase mt-1 font-bold`}>Enterprise Suite 5.0</p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            <NavItem icon="🧭" label="Identidad NORTA" active={activeModule === 'brand'} badge="Brand Book" badgeColor="bg-[#b89764] text-[#1d1d1b] font-bold shadow" onClick={() => setActiveModule('brand')} theme={theme} />
                        <NavItem icon="📊" label="Dashboard Ejecutivo" active={activeModule === 'dashboard'} badge="En Vivo" badgeColor="bg-[#3a452d]/80 text-white" onClick={() => setActiveModule('dashboard')} theme={theme} />
            <NavItem icon="🏛️" label="Control INVIMA (11 Carpetas)" active={activeModule === 'invima_system'} badge="11 Carpetas" badgeColor="bg-[#0e2334] text-[#c9b38f] font-bold shadow" onClick={() => setActiveModule('invima_system')} theme={theme} />
            <NavItem icon="🍺" label="Producción & Lotes" active={activeModule === 'production'} badge={`${data.batches.filter(b => b.status === 'Activo').length} Activos`} badgeColor="bg-[#4d3720]/80 text-white" onClick={() => setActiveModule('production')} theme={theme} />
            <NavItem icon="📦" label="ERP & Inventarios" active={activeModule === 'erp'} onClick={() => setActiveModule('erp')} theme={theme} />
            <NavItem icon="🤝" label="CRM & Ventas B2B" active={activeModule === 'crm'} onClick={() => setActiveModule('crm')} theme={theme} />
            <NavItem icon="🛒" label="Portal Autopedidos B2B" active={activeModule === 'b2b_portal'} badge="Breww B2B" badgeColor="bg-[#0e2334] text-white" onClick={() => setActiveModule('b2b_portal')} theme={theme} />
                                    <NavItem icon="📁" label="Repositorio DMS / BPM" active={activeModule === 'docs'} badge={`${data.documentRepository.length} Docs`} badgeColor="bg-[#4d3720] text-white" onClick={() => setActiveModule('docs')} theme={theme} />
            <NavItem icon="🔬" label="Procesos & Calidad CIP" active={activeModule === 'processes'} onClick={() => setActiveModule('processes')} theme={theme} />
            <NavItem icon="👥" label="Talento Humano" active={activeModule === 'hr'} onClick={() => setActiveModule('hr')} theme={theme} />
            <NavItem icon="⚖️" label="Cumplimiento Legal" active={activeModule === 'legal'} badge="1 Alerta" badgeColor="bg-red-700 text-white animate-pulse" onClick={() => setActiveModule('legal')} theme={theme} />
            <NavItem icon="🏗️" label="Matriz de Arquitecturas" active={activeModule === 'architecture'} badge="Benchmarking" badgeColor="bg-[#0e2334] text-white" onClick={() => setActiveModule('architecture')} theme={theme} />
          </nav>
        </div>

        <div className={`p-4 border-t ${theme === 'dark' ? 'border-[#2d2a24] bg-[#121210]' : 'border-[#d4c8b5] bg-[#e6dfce]'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#0e2334] border border-[#c9b38f]/60 flex items-center justify-center text-[#c9b38f] font-bold text-xs shrink-0 shadow">JC</div>
            <div className="overflow-hidden">
              <p className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-[#0e2334]'} truncate`}>{data.info.headBrewer}</p>
              <p className={`text-[10px] ${theme === 'dark' ? 'text-[#c9b38f]' : 'text-[#4d3720]'} font-bold truncate`}>Maestro Cervecero & Planta</p>
            </div>
          </div>
          <div className={`flex items-center justify-between pt-2 border-t ${theme === 'dark' ? 'border-[#242420]' : 'border-[#d4c8b5]'} text-[11px] ${theme === 'dark' ? 'text-[#a39e93]' : 'text-[#4d3720]'}`}>
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3a452d]"></span>
              Planta Activa
            </span>
            <button onClick={handleResetData} title="Restaurar demo" className="font-bold hover:text-[#0e2334] transition">
              🔄 Demo V5.0
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-y-auto h-screen">
        <header className={`h-16 border-b ${theme === 'dark' ? 'border-[#2d2a24] bg-[#181816]/95' : 'border-[#d4c8b5] bg-[#eee7da]/95'} backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className={`text-sm font-semibold flex items-center gap-2`}>
              <span className="brand-title text-[#b89764] font-extrabold tracking-widest uppercase">NORTA</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="capitalize font-bold text-[var(--text-primary)]">
                {activeModule === 'invima_system' && 'Documentos del Sistema de Control INVIMA (11 Carpetas Oficiales)'}
                {activeModule === 'brand' && 'Identidad NORTA • Brand Book Digital Oficial'}
                {activeModule === 'dashboard' && 'Dashboard Ejecutivo & Cellar Map en Vivo'}
                {activeModule === 'production' && 'Control de Producción & Curvas Fermentativas'}
                {activeModule === 'erp' && 'ERP, Inventarios BOM & Costeo COGS'}
                {activeModule === 'crm' && 'CRM Comercial & Despachos B2B'}
                {activeModule === 'b2b_portal' && 'Portal de Autogestión B2B para Bares & Restaurantes'}
                {activeModule === 'docs' && 'Repositorio Documental Inteligente (DMS / BPM / INVIMA / COA)'}
                {activeModule === 'processes' && 'Procesos Operativos, Limpieza CIP & Laboratorio'}
                {activeModule === 'hr' && 'Gestión de Talento Humano & Cuadrantes'}
                {activeModule === 'legal' && 'Cumplimiento Regulatorio, Sanitario & Legal'}
                {activeModule === 'architecture' && 'Matriz Comparativa de Arquitecturas (Breww, Beer30, Ekos, Odoo)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="btn-norta-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 font-extrabold border-[var(--border-subtle)]" title="Cambiar tema">
              <span>{theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}</span>
            </button>

            {/* BOTÓN DIAGNÓSTICO FORENSE Y SALUD OPERATIVA */}
            <button
              onClick={() => setIsDiagnosticsOpen(true)}
              className="btn-norta-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 font-extrabold border-[var(--border-subtle)] bg-amber-500/10 hover:bg-amber-500/20 text-[#b89764] shadow-sm"
              title="Abrir Consola de Diagnóstico Forense y Salud Operativa"
            >
              <span>🩺</span>
              <span>Diagnóstico de Planta</span>
            </button>

            <button onClick={() => setActiveModule('invima_system')} className="btn-norta-primary text-xs font-bold shadow flex items-center gap-1.5 bg-[#0e2334] text-white border border-[#c9b38f]" title="Abrir las 11 Carpetas del Sistema de Control INVIMA">
              <span>🏛️</span>
              <span>11 Carpetas INVIMA</span>
            </button>
            <button onClick={() => setModalType('uploadInvimaDoc')} className="btn-norta-primary text-xs font-bold shadow" title="Subir Documento al Sistema de Control INVIMA">
              📤 Subir Doc INVIMA
            </button>
            <button onClick={() => setModalType('newDocument')} className="btn-norta-secondary text-xs font-bold border-[var(--border-subtle)]" title="Cargar archivo al Repositorio DMS">
              📄 Cargar Doc DMS
            </button>

            <button onClick={() => setModalType('newBatch')} className="btn-norta-primary text-xs">
              <span>+</span> Nuevo Lote
            </button>
          </div>
        </header>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#c9b38f] text-[#1d1d1b] font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#dfcaa8] animate-bounce">
            <span>🧭</span>
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {activeModule === 'invima_system' && (
            <ErrorBoundary name="Control INVIMA (11 Carpetas)" onNavigateHome={() => setActiveModule('dashboard')}>
              <InvimaControlSystemModule data={data} onOpenUploadDoc={() => setModalType('uploadInvimaDoc')} onOpenNewProgram={() => setModalType('newInvimaProgram')} onDeleteDoc={handleDeleteInvimaDoc} onAddStorageLog={handleAddStorageLog} onDeleteStorageLog={handleDeleteStorageLog} onAddWaterLog={handleAddWaterLog} onDeleteWaterLog={handleDeleteWaterLog} onAddPhMeterLog={handleAddPhMeterLog} onDeletePhMeterLog={handleDeletePhMeterLog} onAddTrainingAttendance={handleAddTrainingAttendance} onDeleteTrainingAttendance={handleDeleteTrainingAttendance} onAddPestLog={handleAddPestLog} onDeletePestLog={handleDeletePestLog} onAddCleaningLog={handleAddCleaningLog} onDeleteCleaningLog={handleDeleteCleaningLog} onAddWasteLog={handleAddWasteLog} onDeleteWasteLog={handleDeleteWasteLog} onAddMaintenanceLog={handleAddMaintenanceLog} onDeleteMaintenanceLog={handleDeleteMaintenanceLog} onAddSamplingLog={handleAddSamplingLog} onDeleteSamplingLog={handleDeleteSamplingLog} onAddSupplier={handleAddSupplier} onDeleteSupplier={handleDeleteSupplier} onAddRetainedSample={handleAddRetainedSample} onDeleteRetainedSample={handleDeleteRetainedSample} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'brand' && (
            <ErrorBoundary name="Identidad NORTA Brand Book" onNavigateHome={() => setActiveModule('dashboard')}>
              <BrandIdentityModule data={data} />
            </ErrorBoundary>
          )}
          {activeModule === 'dashboard' && (
            <ErrorBoundary name="Dashboard Ejecutivo & Cellar Map" onNavigateHome={() => setActiveModule('dashboard')}>
              <DashboardModule data={data} onOpenNewBatch={() => setModalType('newBatch')} onOpenNewOrder={() => setModalType('newOrder')} onOpenBatchDetail={(b) => { setSelectedItem(b); setModalType('batchDetail'); }} onOpenTankDetail={(t) => { setSelectedItem(t); setModalType('tankDetail'); }} onSelectModule={setActiveModule} />
            </ErrorBoundary>
          )}
          {activeModule === 'production' && (
            <ErrorBoundary name="Control de Producción & Curvas Fermentativas" onNavigateHome={() => setActiveModule('dashboard')}>
              <ProductionModule data={data} tab={prodTab} setTab={setProdTab} onAdvanceBatch={handleAdvanceBatchStage} onOpenNewBatch={() => setModalType('newBatch')} onOpenBatchDetail={(b) => { setSelectedItem(b); setModalType('batchDetail'); }} onOpenRecipeDetail={(r) => { setSelectedItem(r); setModalType('recipeDetail'); }} onOpenTankDetail={(t) => { setSelectedItem(t); setModalType('tankDetail'); }} onOpenLogFerment={(b) => { setSelectedItem(b); setModalType('logFermentation'); }} onDeleteBatch={handleDeleteBatch} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'erp' && (
            <ErrorBoundary name="ERP & Inventarios" onNavigateHome={() => setActiveModule('dashboard')}>
              <ErpModule data={data} tab={erpTab} setTab={setErpTab} onOpenMovement={() => setModalType("newMovement")} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'crm' && (
            <ErrorBoundary name="CRM Comercial & Ventas B2B" onNavigateHome={() => setActiveModule('dashboard')}>
              <CrmModule data={data} tab={crmTab} setTab={setCrmTab} onOpenNewOrder={() => setModalType('newOrder')} onOpenNewClient={() => setModalType('newClient')} onDeleteClient={handleDeleteClient} onDeleteOrder={handleDeleteOrder} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'b2b_portal' && (
            <ErrorBoundary name="Portal Autopedidos B2B" onNavigateHome={() => setActiveModule('dashboard')}>
              <B2bPortalModule data={data} client={b2bClient} setClient={setB2bClient} cart={cart} setCart={setCart} onSubmitOrder={handleCreateOrder} onExportCSV={exportToCSV} showToast={showToast} />
            </ErrorBoundary>
          )}
          {activeModule === 'docs' && (
            <ErrorBoundary name="Repositorio Documental DMS" onNavigateHome={() => setActiveModule('dashboard')}>
              <DocumentRepositoryModule data={data} onOpenNewDoc={() => setModalType('newDocument')} onDeleteDocument={handleDeleteDocument} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'processes' && (
            <ErrorBoundary name="Procesos Operativos & Limpieza CIP" onNavigateHome={() => setActiveModule('dashboard')}>
              <ProcessesModule data={data} tab={procTab} setTab={setProcTab} onOpenNewCip={() => setModalType('newCip')} onOpenNewLab={() => setModalType('newLab')} onDeleteCipLog={handleDeleteCipLog} onDeleteQualityTest={handleDeleteQualityTest} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'hr' && (
            <ErrorBoundary name="Talento Humano & Inocuidad" onNavigateHome={() => setActiveModule('dashboard')}>
              <HrModule data={data} tab={hrTab} setTab={setHrTab} onOpenNewEmployee={() => setModalType('newEmployee')} onDeleteEmployee={handleDeleteEmployee} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'legal' && (
            <ErrorBoundary name="Cumplimiento Regulatorio & Legal" onNavigateHome={() => setActiveModule('dashboard')}>
              <LegalModule data={data} tab={legalTab} setTab={setLegalTab} recallSearchLot={recallSearchLot} setRecallSearchLot={setRecallSearchLot} onOpenNewRegistry={() => setModalType('newRegistry')} onDeleteRegistry={handleDeleteSanitaryRegistry} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
          {activeModule === 'architecture' && (
            <ErrorBoundary name="Matriz de Arquitecturas" onNavigateHome={() => setActiveModule('dashboard')}>
              <ArchitectureModule data={data} onExportCSV={exportToCSV} />
            </ErrorBoundary>
          )}
        </div>
      </main>

      {/* MODALES */}
      {modalType === 'newMovement' && <InventoryMovementModal data={data} onClose={() => setModalType(null)} onSubmit={handleCreateInventoryMovement} />}
      {modalType === 'newBatch' && <NewBatchModal recipes={data.recipes} tanks={data.tanks} onClose={() => setModalType(null)} onSubmit={handleCreateBatch} />}
      {modalType === 'batchDetail' && selectedItem && <BatchDetailModal batch={selectedItem} onClose={() => setModalType(null)} onAdvance={() => { handleAdvanceBatchStage(selectedItem.id); setModalType(null); }} onOpenLogFerment={() => setModalType('logFermentation')} />}
      {modalType === 'tankDetail' && selectedItem && <TankDetailModal tank={selectedItem} onClose={() => setModalType(null)} onUpdate={handleUpdateTankStatus} />}
      {modalType === 'newOrder' && <NewOrderModal clients={data.clients} finishedGoods={data.finishedGoods} onClose={() => setModalType(null)} onSubmit={handleCreateOrder} />}
      {modalType === 'newClient' && <NewClientModal onClose={() => setModalType(null)} onSubmit={handleAddClient} />}
      {modalType === 'newEmployee' && <NewEmployeeModal onClose={() => setModalType(null)} onSubmit={handleAddEmployee} />}
      {modalType === 'newRegistry' && <NewSanitaryRegistryModal onClose={() => setModalType(null)} onSubmit={handleAddSanitaryRegistry} />}
      {modalType === 'newCip' && <NewCipModal tanks={data.tanks} onClose={() => setModalType(null)} onSubmit={handleCreateCipLog} />}
      {modalType === 'newLab' && <NewLabModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleCreateQualityTest} />}
      {modalType === 'recipeDetail' && selectedItem && <RecipeDetailModal recipe={selectedItem} onClose={() => setModalType(null)} onBrew={() => setModalType('newBatch')} />}
      {modalType === 'uploadInvimaDoc' && <UploadInvimaDocModal programs={data.invimaControlSystem || []} onClose={() => setModalType(null)} onSubmit={handleAddInvimaDoc} />}
      {modalType === 'newInvimaProgram' && <NewInvimaProgramModal onClose={() => setModalType(null)} onSubmit={handleAddInvimaProgram} />}
      {modalType === 'newDocument' && <NewDocumentModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleAddDocument} />}
      {modalType === 'logFermentation' && selectedItem && <LogFermentationModal batch={selectedItem} onClose={() => setModalType(null)} onSubmit={(log) => handleAddFermentationLog(selectedItem.id, log)} />}

      {/* CONSOLA DE DIAGNÓSTICO FORENSE Y SALUD OPERATIVA */}
      {isDiagnosticsOpen && (
        <DiagnosticsModal
          data={data}
          theme={theme}
          onClose={() => setIsDiagnosticsOpen(false)}
          onSimulateError={() => {
            if (typeof AuditLogger !== 'undefined' && AuditLogger.error) {
              AuditLogger.error('SISTEMA', 'Prueba de estrés forense ejecutada desde Consola de Diagnóstico.', {
                simulated: true,
                triggerTime: new Date().toISOString()
              });
            }
            showToast('⚠️ Excepción simulada registrada en el búfer de telemetría.');
          }}
        />
      )}
    </div>
  );
}



// ==========================================================================
// COMPONENTE: FORMATO DE INGRESO DE MATERIALES (FO-ALM-001 - ALMACENAMIENTO)
// ==========================================================================


// ==========================================================================
// MÓDULO 3: CALIBRACIÓN & VERIFICACIÓN DE pH-METRO (BPM-FO-27 / BPM-FO-26)
// ==========================================================================
// ==========================================================================
// MÓDULO 4: CAPACITACIÓN EN INOCUIDAD & BPM (FO-CAP-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 5: MANEJO INTEGRADO DE PLAGAS & HERMETIZACIÓN (PG-GC-004)
// ==========================================================================


// ==========================================================================
// MÓDULO 6: LIMPIEZA Y DESINFECCIÓN POES (FO-LD-001 / BPM-PR-01a25)
// ==========================================================================
// ==========================================================================
// MÓDULO 7: MANEJO DE RESIDUOS SÓLIDOS & ORGÁNICOS (FO-RS-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 8: MANTENIMIENTO PREVENTIVO & CORRECTIVO (FO-MTTO-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 9: MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 10: CONTROL DE PROVEEDORES HOMOLOGADOS (FO-PROV-001)
// ==========================================================================
// ==========================================================================
// MÓDULO 11: TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)
// ==========================================================================


// ==========================================================================
// COMPONENTE: FermentationSvgChart (GRAFICADOR VECTORIAL SVG TIME-SERIES)
// ==========================================================================
// ==========================================================================
// RENDERIZAR LA APLICACIÓN REACT (MONTAJE AL FINAL TRAS DEFINIR COMPONENTES)
// ==========================================================================
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary name="NORTA OS Application Root">
      <BreweryApp />
    </ErrorBoundary>
  );
}