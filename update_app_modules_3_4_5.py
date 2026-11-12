import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V11
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V10", "CERVECERIA_NORTA_DATA_V11")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V9'", "'CERVECERIA_NORTA_DATA_V9', 'CERVECERIA_NORTA_DATA_V10'")

# 2. Add Handlers in BreweryApp
handlers_345 = """
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
"""

app_code = app_code.replace(
    "  // --- HANDLERS PARA EL FORMATO DE INGRESO DE MATERIALES (FO-ALM-001) ---",
    handlers_345 + "\n  // --- HANDLERS PARA EL FORMATO DE INGRESO DE MATERIALES (FO-ALM-001) ---"
)

# 3. Add destructured props to InvimaControlSystemModule signature
app_code = app_code.replace(
  "function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onExportCSV }) {",
  "function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc, onAddStorageLog, onDeleteStorageLog, onAddWaterLog, onDeleteWaterLog, onAddPhMeterLog, onDeletePhMeterLog, onAddTrainingAttendance, onDeleteTrainingAttendance, onAddPestLog, onDeletePestLog, onExportCSV }) {"
)

# 4. Pass handlers to InvimaControlSystemModule call in BreweryApp
app_code = app_code.replace(
  "onDeleteStorageLog={handleDeleteStorageLog} onAddWaterLog={handleAddWaterLog} onDeleteWaterLog={handleDeleteWaterLog} onExportCSV={exportToCSV} />}",
  "onDeleteStorageLog={handleDeleteStorageLog} onAddWaterLog={handleAddWaterLog} onDeleteWaterLog={handleDeleteWaterLog} onAddPhMeterLog={handleAddPhMeterLog} onDeletePhMeterLog={handleDeletePhMeterLog} onAddTrainingAttendance={handleAddTrainingAttendance} onDeleteTrainingAttendance={handleDeleteTrainingAttendance} onAddPestLog={handleAddPestLog} onDeletePestLog={handleDeletePestLog} onExportCSV={exportToCSV} />}"
)

# 5. Render Sections 3, 4, 5 inside InvimaControlSystemModule
renders_345 = """
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

          {/* SECCIÓN ESTRUCTURADA 5. CONTROL DE PLAGAS: FORMATO PG-GC-004 */}
          {selectedProg.folderName.includes("5. CONTROL DE PLAGAS") && (
            <PestControlModuleSection 
              logs={data.pestControlLogs || []}
              onAddPestLog={onAddPestLog}
              onDeletePestLog={onDeletePestLog}
              onExportCSV={onExportCSV}
            />
          )}
"""

app_code = app_code.replace(
  "{/* SECCIÓN ESTRUCTURADA 2. ALMACENAMIENTO: FORMATO OFICIAL FO-ALM-001 */}",
  renders_345 + "\n          {/* SECCIÓN ESTRUCTURADA 2. ALMACENAMIENTO: FORMATO OFICIAL FO-ALM-001 */}"
)

# 6. Append Component Codes for 3, 4, 5 before render marker
components_code_345 = """

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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL DE BPM-FO-27 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAL
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE CALIBRACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">VERIFICACIÓN DE pH-METRO & CRONOGRAMA DE EQUIPOS</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: BPM-FO-27</span>
            <span className="block text-[#4b5563]">INSTRUCTIVO: BPM-IN-10</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 0</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE VERIFICACIÓN DE pH-METRO */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Registros de Resultados pH-Metro (BPM-FO-27)</h4>
          <button onClick={() => onExportCSV('VERIFICACION_PH_METRO_BPM_FO_27', phLogs)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
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
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">📅 Cronograma & Codificación de Instrumentos de Medición (BPM-FO-26)</h4>
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
                  <td className="font-bold text-[#0e2334]">{item.equipment}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL FO-CAP-001 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA CAP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE CAPACITACIÓN</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE ASISTENCIA & CRONOGRAMA DE CAPACITACIONES</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-CAP-001</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE ASISTENCIA Y EVALUACIÓN */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
          <span>🎓</span>
          <span>Nuevo Registro de Asistencia a Capacitaciones</span>
        </h4>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="brew-label">Tema de Capacitación</label>
            <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="brew-select font-bold text-[#0e2334]">
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
            <input type="number" step="0.1" max="5.0" min="1.0" value={score} onChange={(e)=>setScore(e.target.value)} className="brew-input font-mono font-bold text-[#0e2334]" required />
          </div>

          <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-2 pt-2">
            <button type="submit" className="btn-norta-primary text-xs py-2 px-4 shadow">
              🎓 Registrar Asistencia y Nota
            </button>
          </div>
        </form>
      </div>

      {/* TABLA HISTÓRICA DE ASISTENCIA */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Asistencias & Evaluaciones Registradas (FO-CAP-001)</h4>
          <button onClick={() => onExportCSV('ASISTENCIA_CAPACITACIONES_FO_CAP_001', attendance)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
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
                <tr key={item.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{item.date}</td>
                  <td className="font-bold text-[#111827]">{item.topic}</td>
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <h4 className="brand-title text-sm font-bold text-[#0e2334]">📅 Cronograma Anual de Capacitaciones NORTA</h4>
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
                  <td className="font-bold text-[#0e2334]">{item.topic}</td>
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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      {/* ENCABEZA MEMBRETE OFICIAL PG-GC-004 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA MIP
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">MANEJO INTEGRADO DE PLAGAS</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">FORMATO DE CONTROL DE PLAGAS Y HERMETIZACIÓN</h3>
            </div>
          </div>
          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: PG-GC-004</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: AGOSTO 2024</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE CONTROL DE PLAGAS */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
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
            <select value={station} onChange={(e)=>setStation(e.target.value)} className="brew-select font-bold text-[#0e2334]">
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
            <input type="text" value={technician} onChange={(e)=>setTechnician(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334]">📋 Histórico de Inspecciones de Plagas (PG-GC-004)</h4>
          <button onClick={() => onExportCSV('CONTROL_PLAGAS_PG_GC_004', logs)} className="btn-norta-primary text-xs py-1 px-3">
            📊 Exportar CSV
          </button>
        </div>

        <div className="brew-table-container">
          <table className="brew-table border border-[#0e2334]">
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
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono font-bold text-[#0e2334]">{log.date}</td>
                  <td className="font-bold text-[#111827]">{log.station}</td>
                  <td className="font-semibold">{log.baitStatus}</td>
                  <td>{log.pestsObserved}</td>
                  <td>{log.barriersStatus}</td>
                  <td className="text-[#4b5563]">{log.correctiveAction}</td>
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
"""

marker = "// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT"
app_code = app_code.replace(marker, components_code_345 + "\n\n" + marker)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con componentes para carpetas 3, 4 y 5.")
