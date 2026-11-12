import json
import re

# 1. Update data.js
with open('data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

storage_data_js = """
  // METADATA Y REGISTROS DEL FORMATO FO-ALM-001 (INGRESO DE MATERIALES - ALMACENAMIENTO)
  storageIngressMetadata: {
    system: "PROGRAMA DE ALMACENAMIENTO",
    code: "FO-ALM-001",
    creationDate: "DICIEMBRE 2025",
    title: "Formato de Ingreso de Materiales",
    version: "VERSIÓN 1"
  },

  storageIngressLogs: [
    { id: "SLOG-001", date: "2026-08-24", product: "Malta Pale Ale 2-Row (Sacos 25kg)", batchLot: "MAL-AND-2026-08", quantity: "1,000 kg", supplier: "Maltería Andina S.A.S.", expiryDate: "2027-08-15", notes: "Empaques sellados e inspeccionados. COA adjunto.", responsible: "Ing. Julio Roberto Cristancho" },
    { id: "SLOG-002", date: "2026-08-22", product: "Lúpulo Citra T-90 Pellets", batchLot: "HOP-YAK-2026-19", quantity: "25 kg", supplier: "Yakima Chief Hops", expiryDate: "2027-11-30", notes: "Empaque al vacío a -18°C conforme.", responsible: "Adm. Cristian" },
    { id: "SLOG-003", date: "2026-08-20", product: "Botellas Cerámicas NORTA 500ml", batchLot: "BOT-ENV-2026-04", quantity: "2,400 uds", supplier: "Envases Rústicos S.A.", expiryDate: "N/A", notes: "Estibas limpias sin rupturas.", responsible: "Ing. Julio Roberto Cristancho" }
  ],
"""

if "storageIngressMetadata:" not in data_content:
    data_content = data_content.replace("  invimaControlSystem:", storage_data_js + "\n  invimaControlSystem:")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print("data.js actualizado con datos de almacenamiento FO-ALM-001.")

# 2. Update app.js
with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Bump localStorage key to V10
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V9", "CERVECERIA_NORTA_DATA_V10")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V8'", "'CERVECERIA_NORTA_DATA_V8', 'CERVECERIA_NORTA_DATA_V9'")

# Handlers for Storage Ingress
storage_handlers = """
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
"""

app_code = app_code.replace(
    "  // --- HANDLERS PARA EL FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002) ---",
    storage_handlers + "\n  // --- HANDLERS PARA EL FORMATO DE CONTROL DE AGUA POTABLE (FO-AG-002) ---"
)

# Render section inside InvimaControlSystemModule
storage_render = """
          {/* SECCIÓN ESTRUCTURADA 2. ALMACENAMIENTO: FORMATO OFICIAL FO-ALM-001 */}
          {selectedProg.folderName.includes("2. ALMACENAMIENTO") && (
            <StorageIngressFormSection 
              metadata={data.storageIngressMetadata}
              logs={data.storageIngressLogs || []}
              onAddLog={handleAddStorageLog}
              onDeleteLog={handleDeleteStorageLog}
              onExportCSV={exportToCSV}
            />
          )}
"""

app_code = app_code.replace(
    "{/* SECCIÓN ESTRUCTURADA 1. AGUA POTABLE: FORMATO OFICIAL FO-AG-002 */}",
    storage_render + "\n          {/* SECCIÓN ESTRUCTURADA 1. AGUA POTABLE: FORMATO OFICIAL FO-AG-002 */}"
)

# Append component code before render block
storage_component_code = """

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
    <div className="mt-8 pt-6 border-t-2 border-[#0e2334] space-y-6">
      
      {/* ENCABEZADO MEMBRETE OFICIAL DE FO-ALM-001 */}
      <div className="brew-card p-5 bg-[#faf8f3] border-2 border-[#0e2334] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#0e2334]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0e2334] text-white flex items-center justify-center font-bold text-xs p-1 text-center border border-[#c9b38f]">
              NORTA ALM
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4d3720]">PROGRAMA DE ALMACENAMIENTO</span>
              <h3 className="brand-title text-lg font-extrabold text-[#0e2334]">Formato de Ingreso de Materiales</h3>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold text-[#0e2334]">CÓDIGO: FO-ALM-001</span>
            <span className="block text-[#4b5563]">ELABORACIÓN: DICIEMBRE 2025</span>
            <span className="block font-bold text-emerald-700">VERSIÓN 1</span>
          </div>
        </div>

        <div className="bg-[#f0eae0] p-3 rounded-lg border border-[#d4c8b5] text-xs text-[#374151]">
          <p><strong className="text-[#0e2334] font-bold">OBJETIVO DE ALMACENAMIENTO:</strong> Registro y control de ingreso de materias primas, insumos y empaques en la bodega principal de Cervecería NORTA, garantizando la inspección de lotes, vida útil y condiciones sanitarias de recepción.</p>
        </div>
      </div>

      {/* FORMULARIO DE INGRESO DE MATERIALES */}
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
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
            <input type="text" value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="Ej: Malta Pilsner Premium (Sacos 25kg)" className="brew-input font-semibold text-[#0e2334]" required />
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
            <select value={supplier} onChange={(e)=>setSupplier(e.target.value)} className="brew-select font-bold text-[#0e2334]">
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
            <input type="text" value={responsible} onChange={(e)=>setResponsible(e.target.value)} className="brew-input font-semibold text-[#0e2334]" required />
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
      <div className="brew-card p-5 bg-white border border-[#d4c8b5] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e5e7eb]">
          <h4 className="brand-title text-sm font-bold text-[#0e2334] flex items-center gap-2">
            <span>📋</span>
            <span>Registros Historicos FO-ALM-001 (Ingreso de Materiales)</span>
            <span className="badge badge-dorado font-mono">{logs.length} Entradas</span>
          </h4>

          <div className="flex items-center gap-2">
            <button onClick={handleExportExcel} className="btn-norta-primary text-xs py-1.5 px-3 bg-[#0e2334] text-white border border-[#c9b38f] flex items-center gap-1 font-bold">
              <span>📊 Exportar Excel (.xlsx) Original</span>
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
                <tr key={log.id} className="hover:bg-[#faf8f3] text-xs">
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.date}</td>
                  <td className="font-bold text-[#111827] border border-[#d4c8b5]">{log.product}</td>
                  <td className="font-mono text-center font-bold text-[#0e2334] border border-[#d4c8b5]">{log.batchLot}</td>
                  <td className="font-mono text-center font-extrabold text-emerald-700 border border-[#d4c8b5]">{log.quantity}</td>
                  <td className="font-semibold text-[#374151] border border-[#d4c8b5]">{log.supplier}</td>
                  <td className="font-mono text-center text-[#6b7280] border border-[#d4c8b5]">{log.expiryDate}</td>
                  <td className="text-[#4b5563] border border-[#d4c8b5]">{log.notes}</td>
                  <td className="font-semibold text-[#111827] border border-[#d4c8b5]">{log.responsible}</td>
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

# Render block insertion: add handlers to InvimaControlSystemModule in app.js
app_code = app_code.replace(
    "onDeleteDoc={handleDeleteInvimaDoc} />}",
    "onDeleteDoc={handleDeleteInvimaDoc} onAddStorageLog={handleAddStorageLog} onDeleteStorageLog={handleDeleteStorageLog} />}"
)

# Append component before end render block
render_marker = "// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT"
app_code = app_code.replace(render_marker, storage_component_code + "\n\n" + render_marker)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con el Formato de Ingreso de Materiales FO-ALM-001.")
