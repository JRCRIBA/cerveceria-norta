/**
 * Cervecería NORTA OS — Implementador de UI Craft Luxury (14 Carpetas SGC)
 * Erradica emojis en el módulo INVIMA, integra Lucide SVG icons y añade vistas
 * especializadas para Carpetas 00, 12 y 13.
 */

const fs = require("fs");
const path = require("path");

const SVG_ICONS_CODE = `
// ==========================================================================
// COMPONENTES ICONOGRÁFICOS LUCIDE SVG (5S SEIKETSU - CERO EMOJIS)
// ==========================================================================
function SvgFolder({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 8 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
    </svg>
  );
}

function SvgFolderOpen({ className = "w-5 h-5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
    </svg>
  );
}

function SvgFileText({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>
    </svg>
  );
}

function SvgFileSpreadsheet({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>
    </svg>
  );
}

function SvgCheckCircle({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function SvgAlertTriangle({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function SvgDownload({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function SvgExternalLink({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  );
}

function SvgTrash({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  );
}

function SvgShieldCheck({ className = "w-4 h-4", ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
`;

function processFile(filePath) {
  let raw = fs.readFileSync(filePath, "utf8");
  // Normalizar saltos de línea a \n
  let content = raw.replace(/\r\n/g, "\n");

  // Inyectar iconos SVG si no existen
  if (!content.includes("function SvgFolder(")) {
    const marker = "// COMPONENTE: WaterControlFormSection";
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      content = content.slice(0, idx) + SVG_ICONS_CODE.trim() + "\n\n" + content.slice(idx);
      console.log(`[OK] Iconos Lucide SVG inyectados en ${path.basename(filePath)}`);
    } else {
      console.warn(`[WARN] No se encontró target para SVG icons en ${path.basename(filePath)}`);
    }
  }

  // Reemplazar la grilla de carpetas para 14 columnas equilibradas (2x7 en lg)
  content = content.replace(
    'className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"',
    'className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5"'
  );

  // Reemplazar el render del item de carpeta
  const cardStart = content.indexOf('<div className="flex items-center justify-between mb-2">\n                  <span className="text-2xl">📁</span>');
  if (cardStart !== -1) {
    const cardEnd = content.indexOf('</div>\n              </div>\n            );\n          })}', cardStart);
    if (cardEnd !== -1) {
      const newCardBody = `<div className="flex items-center justify-between mb-1.5">
                  <span className={\`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded \${isSelected ? 'bg-[#0e2334] text-[#c9b38f]' : 'bg-[var(--bg-elevated)] text-[#b89764] border border-[var(--border-subtle)]'}\`}>
                    {prog.folderNumber || (prog.id && prog.id.split('-')[1]) || '00'}
                  </span>
                  <span className={\`text-[10px] px-1.5 py-0.5 rounded-full font-bold font-mono \${isSelected ? 'bg-[#121210] text-[#fbfbfa]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'}\`}>
                    {prog.files ? prog.files.length : 0} docs
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <SvgFolder className={\`w-3.5 h-3.5 \${isSelected ? 'text-[#0e2334]' : 'text-[#b89764]'}\`} />
                    <span className={\`text-[10px] font-mono font-bold uppercase tracking-wider truncate \${isSelected ? 'text-[#0e2334]' : 'text-[var(--text-muted)]'}\`}>
                      {prog.code || 'SGC'}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs leading-tight line-clamp-2">{prog.title.replace(/^[0-9]+\\.\\s*/, '')}</h4>
                </div>`;
      
      content = content.slice(0, cardStart) + newCardBody + content.slice(cardEnd + 6);
      console.log(`[OK] Tarjetas de programas actualizadas a diseño Craft Luxury en ${path.basename(filePath)}`);
    }
  }

  // Reemplazar iconos en el selector de carpeta abierta
  content = content.replace('<span className="text-xl">📂</span>', '<SvgFolderOpen className="w-5 h-5 text-[#b89764]" />');

  // Reemplazar botones de la tabla de archivos
  content = content.replace(
    /<span>👁️ Abrir<\/span>/g,
    '<SvgExternalLink className="w-3.5 h-3.5" /> <span>Abrir</span>'
  );
  content = content.replace(
    /<span>📥 Descargar<\/span>/g,
    '<SvgDownload className="w-3.5 h-3.5" /> <span>Descargar</span>'
  );
  content = content.replace(
    /title="Eliminar registro">\s*🗑️\s*<\/button>/g,
    'title="Eliminar registro"><SvgTrash className="w-3.5 h-3.5 text-red-500" /></button>'
  );

  // Inyectar sección interactiva para Carpeta 00 (Control Documental), Carpeta 12 (Recepción MP) y 13 (Control de Calidad)
  const markerSection = '{/* SECCIÓN ESTRUCTURADA 3. CALIBRACIÓN:';
  const secIdx = content.indexOf(markerSection);
  if (secIdx !== -1 && !content.includes("00. MANUAL Y CONTROL DOCUMENTAL")) {
    const specialSections = `
          {/* SECCIÓN ESTRUCTURADA 00. MANUAL Y CONTROL DOCUMENTAL */}
          {selectedProg.folderName.includes("00. MANUAL") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                <SvgShieldCheck className="w-5 h-5 text-[#b89764]" />
                <div>
                  <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Gobernanza del Sistema de Gestión de Calidad (SGC)</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">Marco normativo, política de inocuidad y listado maestro de 78 documentos vigentes (Octubre 2026).</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">MN-GC-001</span>
                  <p className="font-semibold mt-0.5">Manual de BPM & Saneamiento</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">PT-GC-001</span>
                  <p className="font-semibold mt-0.5">Política de Inocuidad e Indicadores</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                  <span className="font-mono font-bold text-[#b89764]">FO-GC-036</span>
                  <p className="font-semibold mt-0.5">Listado Maestro Canónico</p>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN ESTRUCTURADA 12. RECEPCIÓN DE MATERIAS PRIMAS */}
          {selectedProg.folderName.includes("12. RECEPCION") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <SvgFileSpreadsheet className="w-5 h-5 text-[#b89764]" />
                  <div>
                    <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Inspección de Materias Primas e Insumos (FO-GC-011)</h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Sistema de Tarjetas de Estado (FO-GC-039 Verde, FO-GC-040 Roja, FO-GC-041 Naranja) & 7 Fichas Técnicas.</p>
                  </div>
                </div>
                <span className="badge badge-verde font-mono text-[10px]">Poka-Yoke Recepción Activo</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
                  FO-GC-039 • Aceptado (Verde)
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold">
                  FO-GC-041 • Cuarentena (Naranja)
                </div>
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-bold">
                  FO-GC-040 • Rechazado (Rojo)
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN ESTRUCTURADA 13. CONTROL DE CALIDAD */}
          {selectedProg.folderName.includes("13. CONTROL DE CALIDAD") && (
            <div className="brew-card p-4 bg-[var(--bg-elevated)] border border-[#b89764]/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <SvgCheckCircle className="w-5 h-5 text-[#b89764]" />
                  <div>
                    <h4 className="brand-title text-sm font-bold text-[var(--text-primary)]">Control de Calidad por Etapas (PG-GC-013)</h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Tabla de carbonatación para Bogotá (PG-GC-013-A01) y Manejo de Producto No Conforme (PR-GC-004).</p>
                  </div>
                </div>
                <span className="badge badge-dorado font-mono text-[10px]">Liberación de Lote</span>
              </div>
            </div>
          )}
          
          `;
      content = content.slice(0, secIdx) + specialSections + content.slice(secIdx);
      console.log(`[OK] Vistas especializadas 00, 12 y 13 inyectadas en ${path.basename(filePath)}`);
  }

  // Guardar archivo (restaurando saltos de línea consistentes)
  fs.writeFileSync(filePath, content, "utf8");
}

console.log("Aplicando diseño Craft Luxury a index.html y NextBreweryApp.js...");
processFile(path.join(process.cwd(), "index.html"));
processFile(path.join(process.cwd(), "src/components/NextBreweryApp.js"));
console.log("Completado exitosamente.");
