import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V12
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V11", "CERVECERIA_NORTA_DATA_V12")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V10'", "'CERVECERIA_NORTA_DATA_V10', 'CERVECERIA_NORTA_DATA_V11'")

# 2. Add Handlers for Modules 6 to 11
handlers_6_11 = """
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
"""

app_code = app_code.replace(
    "  // --- HANDLERS MÓDULO 5: CONTROL DE PLAGAS (PG-GC-004) ---",
    handlers_6_11 + "\n  // --- HANDLERS MÓDULO 5: CONTROL DE PLAGAS (PG-GC-004) ---"
)

# 3. Update InvimaControlSystemModule signature to receive all props
app_code = app_code.replace(
  "function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onAddPhMeterLog, onDeletePhMeterLog, onAddTrainingAttendance, onDeleteTrainingAttendance, onAddPestLog, onDeletePestLog, onExportCSV }) {",
  "function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onAddPhMeterLog, onDeletePhMeterLog, onAddTrainingAttendance, onDeleteTrainingAttendance, onAddPestLog, onDeletePestLog, onAddCleaningLog, onDeleteCleaningLog, onAddWasteLog, onDeleteWasteLog, onAddMaintenanceLog, onDeleteMaintenanceLog, onAddSamplingLog, onDeleteSamplingLog, onAddSupplier, onDeleteSupplier, onAddRetainedSample, onDeleteRetainedSample, onExportCSV }) {"
)

# 4. Pass props from BreweryApp
app_code = app_code.replace(
  "onDeletePestLog={handleDeletePestLog} onExportCSV={exportToCSV} />}",
  "onDeletePestLog={handleDeletePestLog} onAddCleaningLog={handleAddCleaningLog} onDeleteCleaningLog={handleDeleteCleaningLog} onAddWasteLog={handleAddWasteLog} onDeleteWasteLog={handleDeleteWasteLog} onAddMaintenanceLog={handleAddMaintenanceLog} onDeleteMaintenanceLog={handleDeleteMaintenanceLog} onAddSamplingLog={handleAddSamplingLog} onDeleteSamplingLog={handleDeleteSamplingLog} onAddSupplier={handleAddSupplier} onDeleteSupplier={handleDeleteSupplier} onAddRetainedSample={handleAddRetainedSample} onDeleteRetainedSample={handleDeleteRetainedSample} onExportCSV={exportToCSV} />}"
)

# 5. Render Sections 6 to 11
renders_6_11 = """
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
"""

app_code = app_code.replace(
  "{/* SECCIÓN ESTRUCTURADA 5. CONTROL DE PLAGAS: FORMATO PG-GC-004 */}",
  renders_6_11 + "\n          {/* SECCIÓN ESTRUCTURADA 5. CONTROL DE PLAGAS: FORMATO PG-GC-004 */}"
)

# 6. Append component code blocks before end marker
components_6_11 = """

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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE LIMPIEZA Y DESINFECCIÓN (FO-LD-001 / POES)</h3>
        <p className="text-xs text-[#4b5563]">Registro diario de saneamiento, dosificación de productos químicos y liberación sanitaria de equipos de fermentación, cocción y envasado.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">🧹 Nuevo Registro de Sanitización POES</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Área / Equipo</label><input type="text" value={area} onChange={(e)=>setArea(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Frecuencia</label><input type="text" value={frequency} onChange={(e)=>setFrequency(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Químico Sanitizante</label><input type="text" value={chemical} onChange={(e)=>setChemical(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Concentración (ppm / %)</label><input type="text" value={concentration} onChange={(e)=>setConcentration(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-2 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🧹 Guardar Registro POES</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Registros POES Limpieza & Desinfección</h4>
          <button onClick={() => onExportCSV('LIMPIEZA_DESINFECCION_FO_LD_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>ÁREA / EQUIPO</th><th>FRECUENCIA</th><th>QUÍMICO DOSIFICADO</th><th>CONCENTRACIÓN</th><th>ESTADO SANITARIO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.area}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MANEJO DE RESIDUOS (FO-RS-001)</h3>
        <p className="text-xs text-[#4b5563]">Control de disposición de bagazo de malta, trub de levadura, residuos reciclables y peligrosos de planta.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">♻️ Registro de Entrega y Disposición de Residuos</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha Entrega</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Tipo de Residuo</label><input type="text" value={wasteType} onChange={(e)=>setWasteType(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Cantidad (kg / L)</label><input type="text" value={quantityKg} onChange={(e)=>setQuantityKg(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Gestor / Receptor</label><input type="text" value={manager} onChange={(e)=>setManager(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Responsable Entrega</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">♻️ Registrar Disposición</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Histórico de Control de Residuos</h4>
          <button onClick={() => onExportCSV('DISPOSICION_RESIDUOS_FO_RS_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>TIPO DE RESIDUO</th><th>CANTIDAD</th><th>GESTOR / EMPRESA RECEPTORA</th><th>ESTADO</th><th>RESPONSABLE</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.wasteType}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MANTENIMIENTO DE MAQUINARIA (FO-MTTO-001)</h3>
        <p className="text-xs text-[#4b5563]">Histórico de mantenimientos preventivos y correctivos en marmitas, fermentadores, molino, chiller y envasadora.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">🛠️ Registro de Mantenimiento de Maquinaria</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Equipo / Maquinaria</label><input type="text" value={equipment} onChange={(e)=>setEquipment(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Tipo Mantenimiento</label><select value={type} onChange={(e)=>setType(e.target.value)} className="brew-select font-bold"><option value="Preventivo">Preventivo</option><option value="Correctivo">Correctivo</option><option value="Locativo">Locativo</option></select></div>
          <div><label className="brew-label">Descripción del Trabajo</label><input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Repuestos Utilizados</label><input type="text" value={parts} onChange={(e)=>setParts(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Técnico / Empresa</label><input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🛠️ Guardar Mantenimiento</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Registros de Mantenimiento Realizado</h4>
          <button onClick={() => onExportCSV('MANTENIMIENTO_EQUIPOS_FO_MTTO_001', logs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>EQUIPO</th><th>TIPO</th><th>TRABAJO REALIZADO</th><th>REPUESTOS</th><th>TÉCNICO / EMPRESA</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.equipment}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE MUESTREO & CONTROL DE CUARTOS FRÍOS (FO-MUE-001)</h3>
        <p className="text-xs text-[#4b5563]">Análisis de laboratorio externo para producto terminado, agua de proceso y control diario de temperatura de cuartos fríos.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">🧪 Nuevo Registro de Muestreo de Laboratorio</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div><label className="brew-label">Fecha Toma Muestra</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Objeto de Muestra (Lote/Producto)</label><input type="text" value={sampleObject} onChange={(e)=>setSampleObject(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">Tipo de Análisis</label><input type="text" value={testType} onChange={(e)=>setTestType(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Cantidad de Muestra</label><input type="text" value={sampleVolume} onChange={(e)=>setSampleVolume(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Laboratorio Acreditado</label><input type="text" value={lab} onChange={(e)=>setLab(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Verificado Por</label><input type="text" value={verifiedBy} onChange={(e)=>setVerifiedBy(e.target.value)} className="brew-input font-bold" required /></div>
          <div className="sm:col-span-3 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🧪 Registrar Muestreo</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Envíos & Resultados de Laboratorio (FO-MUE-001)</h4>
          <button onClick={() => onExportCSV('MUESTREO_LABORATORIO_FO_MUE_001', samplingLogs)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>MUESTRA / LOTE</th><th>TIPO ANÁLISIS</th><th>CANTIDAD</th><th>LABORATORIO</th><th>RESULTADO</th><th>VERIFICADOR</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samplingLogs.map(log => (
                <tr key={log.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.sampleObject}</td>
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">❄️ Registro Diario de Temperatura de Cuartos Fríos (0°C a 4°C)</h4>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE EVALUACIÓN & HOMOLOGACIÓN DE PROVEEDORES (FO-PROV-001)</h3>
        <p className="text-xs text-[#4b5563]">Listado maestro de proveedores autorizados de maltas, lúpulos, levaduras, empaques y químicos sanitarios.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">🏬 Registrar Nuevo Proveedor Homologado</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Nombre Proveedor</label><input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="brew-input font-bold text-[#0e2334]" required /></div>
          <div><label className="brew-label">NIT / ID Fiscal</label><input type="text" value={nit} onChange={(e)=>setNit(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Nombre de Contacto</label><input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Producto / Servicio</label><input type="text" value={productProvided} onChange={(e)=>setProductProvided(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Teléfono</label><input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="brew-input font-mono" required /></div>
          <div><label className="brew-label">Correo Electrónico</label><input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Calificación (1.0 a 5.0)</label><input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div className="flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🏬 Registrar Proveedor</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Listado Maestro de Proveedores (FO-PROV-001)</h4>
          <button onClick={() => onExportCSV('LISTADO_PROVEEDORES_FO_PROV_001', suppliers)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>PROVEEDOR</th><th>NIT</th><th>CONTACTO</th><th>PRODUCTO / INSUMO</th><th>TELÉFONO</th><th>CORREO</th><th>CALIFICACIÓN</th><th>ESTADO</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {suppliers.map(prov => (
                <tr key={prov.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-bold text-[#0e2334]">{prov.name}</td>
                  <td className="font-mono">{prov.nit}</td>
                  <td>{prov.contact}</td>
                  <td className="font-semibold text-[#111827]">{prov.productProvided}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334]">
        <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">PROGRAMA DE TRAZABILIDAD & CONTROL DE CONTRAMUESTRAS (FO-TRA-001)</h3>
        <p className="text-xs text-[#4b5563]">Trazabilidad grain-to-glass, loteado de cerveza terminada y registro de contramuestras retenidas por lote.</p>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">🍺 Registrar Contramuestra Retenida de Lote</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div><label className="brew-label">Fecha de Loteado</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Estilo / Cerveza NORTA</label><select value={beerName} onChange={(e)=>setBeerName(e.target.value)} className="brew-select font-bold text-[#0e2334]"><option value="NORTA Furia">NORTA Furia</option><option value="NORTA Picosa">NORTA Picosa</option><option value="NORTA Origen">NORTA Origen</option><option value="NORTA Briosa">NORTA Briosa</option><option value="NORTA Máxima">NORTA Máxima</option><option value="NORTA Tradicional">NORTA Tradicional</option></select></div>
          <div><label className="brew-label">Número de Lote (Batch)</label><input type="text" value={batchLot} onChange={(e)=>setBatchLot(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Presentación</label><input type="text" value={presentation} onChange={(e)=>setPresentation(e.target.value)} className="brew-input" required /></div>
          <div><label className="brew-label">Unidades Retenidas</label><input type="number" value={units} onChange={(e)=>setUnits(e.target.value)} className="brew-input font-mono font-bold" required /></div>
          <div><label className="brew-label">Ubicación Estantería</label><input type="text" value={shelfLocation} onChange={(e)=>setShelfLocation(e.target.value)} className="brew-input font-semibold" required /></div>
          <div><label className="brew-label">Responsable</label><input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-bold" required /></div>
          <div><label className="brew-label">Observaciones</label><input type="text" value={notes} onChange={(e)=>setNotes(e.target.value)} className="brew-input" /></div>
          <div className="sm:col-span-4 flex items-end justify-end"><button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">🍺 Guardar Contramuestra</button></div>
        </form>
      </div>

      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Contramuestras de Lotes Registradas (CONTROL DE LOTEADO)</h4>
          <button onClick={() => onExportCSV('CONTRAMUESTRAS_TRAZABILIDAD_FO_TRA_001', samples)} className="btn-norta-primary text-xs py-1 px-3">📊 Exportar CSV</button>
        </div>
        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
            <thead><tr className="bg-[#0e2334] text-white text-xs"><th>FECHA</th><th>CERVEZA NORTA</th><th>LOTE</th><th>PRESENTACIÓN</th><th>UNIDADES</th><th>UBICACIÓN EN BODEGA</th><th>RESPONSABLE</th><th>OBSERVACIONES</th><th>ACCIÓN</th></tr></thead>
            <tbody>
              {samples.map(item => (
                <tr key={item.id} className="text-xs hover:bg-[#faf8f3]">
                  <td className="font-mono font-bold text-[#0e2334]">{item.date}</td>
                  <td className="font-bold text-[#111827]">{item.beerName}</td>
                  <td className="font-mono font-bold text-emerald-700">{item.batchLot}</td>
                  <td className="font-mono">{item.presentation}</td>
                  <td className="font-mono font-bold text-center">{item.units} uds</td>
                  <td className="font-semibold">{item.shelfLocation}</td>
                  <td className="font-semibold">{item.responsible}</td>
                  <td className="text-[#4b5563]">{item.notes}</td>
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
"""

marker = "// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT"
app_code = app_code.replace(marker, components_6_11 + "\n\n" + marker)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con componentes para carpetas 6, 7, 8, 9, 10 y 11.")
