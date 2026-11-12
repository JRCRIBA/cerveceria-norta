import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V7
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V6", "CERVECERIA_NORTA_DATA_V7")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V5'", "'CERVECERIA_NORTA_DATA_V5', 'CERVECERIA_NORTA_DATA_V6'")

# 2. Add handlers for Invima documents and programs
invima_handlers = """
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
"""

# Insert handlers before handleCreateBatch
app_code = app_code.replace("  // --- DESCUENTO AUTOMÁTICO DE INVENTARIO", invima_handlers + "\n  // --- DESCUENTO AUTOMÁTICO DE INVENTARIO")

# 3. Add NavItem for "Documentos del sistema de control INVIMA" in Sidebar
sidebar_nav_item = """            <NavItem icon="🏛️" label="Documentos del sistema de control INVIMA" active={activeModule === 'invima_system'} badge={`${(data.invimaControlSystem || []).length} Carpetas`} badgeColor="bg-[#0e2334] text-white font-bold" onClick={() => setActiveModule('invima_system')} theme={theme} />\n"""

app_code = app_code.replace(
    """<NavItem icon="📁" label="Repositorio DMS / BPM" active={activeModule === 'docs'} badge={`${data.documentRepository.length} Docs`} badgeColor="bg-[#4d3720] text-white" onClick={() => setActiveModule('docs')} theme={theme} />""",
    sidebar_nav_item + """            <NavItem icon="📁" label="Repositorio DMS / BPM" active={activeModule === 'docs'} badge={`${data.documentRepository.length} Docs`} badgeColor="bg-[#4d3720] text-white" onClick={() => setActiveModule('docs')} theme={theme} />"""
)

# 4. Header title for invima_system
app_code = app_code.replace(
    "{activeModule === 'brand' && 'Identidad de Marca & Moodboard Visual'}",
    "{activeModule === 'invima_system' && 'Documentos del Sistema de Control INVIMA (11 Carpetas Oficiales)'}\n                {activeModule === 'brand' && 'Identidad de Marca & Moodboard Visual'}"
)

# 5. Header button for uploading Invima doc
app_code = app_code.replace(
    """<button onClick={() => setModalType('newDocument')} className="btn-norta-secondary text-xs font-bold border-[#0e2334]" title="Cargar archivo al Repositorio DMS">
              📄 Cargar Doc DMS
            </button>""",
    """<button onClick={() => setModalType('uploadInvimaDoc')} className="btn-norta-primary text-xs font-bold shadow" title="Subir Documento al Sistema de Control INVIMA">
              📤 Subir Doc INVIMA
            </button>
            <button onClick={() => setModalType('newDocument')} className="btn-norta-secondary text-xs font-bold border-[#0e2334]" title="Cargar archivo al Repositorio DMS">
              📄 Cargar Doc DMS
            </button>"""
)

# 6. Render InvimaControlSystemModule in main body
main_render_code = """          {activeModule === 'invima_system' && <InvimaControlSystemModule data={data} onOpenUploadDoc={() => setModalType('uploadInvimaDoc')} onOpenNewProgram={() => setModalType('newInvimaProgram')} onDeleteDoc={handleDeleteInvimaDoc} />}\n"""
app_code = app_code.replace(
    "{activeModule === 'brand' && <BrandIdentityModule data={data} />}",
    main_render_code + "          {activeModule === 'brand' && <BrandIdentityModule data={data} />}"
)

# 7. Add Invima Modals to rendered modals
modal_render_code = """      {modalType === 'uploadInvimaDoc' && <UploadInvimaDocModal programs={data.invimaControlSystem || []} onClose={() => setModalType(null)} onSubmit={handleAddInvimaDoc} />}\n      {modalType === 'newInvimaProgram' && <NewInvimaProgramModal onClose={() => setModalType(null)} onSubmit={handleAddInvimaProgram} />}\n"""
app_code = app_code.replace(
    "{modalType === 'newDocument' && <NewDocumentModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleAddDocument} />}",
    modal_render_code + "      {modalType === 'newDocument' && <NewDocumentModal batches={data.batches} onClose={() => setModalType(null)} onSubmit={handleAddDocument} />}"
)

# 8. Append the Component Code for InvimaControlSystemModule and Modals
invima_components = """

// ==========================================================================
// MÓDULO NUEVO: DOCUMENTOS DEL SISTEMA DE CONTROL INVIMA (11 CARPETAS OFICIALES)
// ==========================================================================
function InvimaControlSystemModule({ data, onOpenUploadDoc, onOpenNewProgram, onDeleteDoc }) {
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
          <h3 className="brand-title text-sm font-bold text-[#0e2334] uppercase tracking-wider">Carpetas & Programas Sanitarios ({programs.length})</h3>
          <span className="text-xs text-[#4b5563] font-mono">Selecciona una carpeta para explorar sus archivos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {programs.map(prog => (
            <div 
              key={prog.id} 
              onClick={() => { setSelectedProgId(prog.id); setSearchTerm(''); }}
              className={`cursor-pointer p-3.5 rounded-xl border transition-all flex flex-col justify-between ${selectedProgId === prog.id ? 'bg-[#0e2334] text-white border-[#0e2334] shadow-lg scale-105' : 'bg-white text-[#111827] border-[#d4c8b5] hover:border-[#0e2334] hover:bg-[#faf8f3]'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">📁</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${selectedProgId === prog.id ? 'bg-[#c9b38f] text-[#0e2334]' : 'bg-[#e2d8c3] text-[#0e2334]'}`}>
                  {prog.files ? prog.files.length : 0} archivos
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs leading-snug line-clamp-2">{prog.title}</h4>
                <p className={`text-[10px] mt-1 ${selectedProgId === prog.id ? 'text-[#c9b38f]' : 'text-[#4b5563]'}`}>{prog.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENIDO DE LA CARPETA SELECCIONADA */}
      {selectedProg && (
        <div className="brew-card p-6 border-[#d4c8b5] bg-white space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📂</span>
                <h3 className="brand-title text-lg font-bold text-[#0e2334]">{selectedProg.title}</h3>
                <span className="badge badge-dorado text-xs font-mono">{selectedProg.files.length} Archivos Registrados</span>
              </div>
              <p className="text-xs text-[#4b5563] mt-1">Ubicación local en servidor: <code className="font-mono text-[11px] text-[#0e2334] bg-[#f3f4f6] px-2 py-0.5 rounded">documentos/jr bk/Norta/{selectedProg.folderName}</code></p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Buscar archivo en esta carpeta..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#f9fafb] border border-[#d1d5db] text-xs rounded-lg pl-8 pr-3 py-1.5 w-64 text-[#111827] focus:outline-none focus:border-[#0e2334]"
                />
                <span className="absolute left-2.5 top-2 text-[#9ca3af] text-xs">🔍</span>
              </div>

              <button onClick={onOpenUploadDoc} className="btn-norta-primary text-xs py-1.5 px-3">
                + Subir a esta carpeta
              </button>
            </div>
          </div>

          {/* LISTADO DE ARCHIVOS */}
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
                      <td className="font-mono text-xs font-bold text-[#0e2334]">{file.id}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{file.extension === '.xlsx' ? '📊' : (file.extension === '.docx' ? '📝' : '📄')}</span>
                          <div>
                            <p className="font-bold text-[#111827] text-xs">{file.name}</p>
                            <span className="text-[10px] font-mono text-[#6b7280]">{file.relPath}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge text-[10px] ${file.extension === '.xlsx' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                          {file.type} ({file.extension})
                        </span>
                      </td>
                      <td className="font-mono text-xs text-[#374151]">{file.size}</td>
                      <td className="font-mono text-xs text-[#6b7280]">{file.updatedAt}</td>
                      <td><span className="badge badge-verde text-[10px]">{file.status}</span></td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <a 
                            href={file.relPath} 
                            target="_blank" 
                            rel="noreferrer" 
                            download={file.name}
                            className="btn-norta-secondary text-[11px] py-1 px-2.5 font-bold flex items-center gap-1 border-[#0e2334]"
                            title="Descargar / Abrir archivo original"
                          >
                            <span>📥 Descargar</span>
                          </a>
                          <button 
                            onClick={() => onDeleteDoc(selectedProg.id, file.id, file.name)}
                            className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-[11px] py-1 px-2 rounded-lg font-bold transition"
                            title="Eliminar documento del registro"
                          >
                            🗑️ Eliminar
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
          <h3 className="brand-title text-base font-bold text-[#0e2334]">📤 Subir Documento INVIMA</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body space-y-3">
            <div>
              <label className="brew-label">Selecciona la Carpeta / Programa Destino</label>
              <select value={folderName} onChange={(e) => setFolderName(e.target.value)} className="brew-select font-bold text-[#0e2334]">
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
          <h3 className="brand-title text-base font-bold text-[#0e2334]">📁 Crear Nueva Carpeta / Programa INVIMA</h3>
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
"""

app_code += invima_components

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con el módulo Documentos del sistema de control INVIMA correctamente.")
