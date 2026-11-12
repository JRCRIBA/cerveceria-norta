const fs = require('fs');

const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

const target = '{/* SECCIÓN ESTRUCTURADA 3. CALIBRACIÓN: FORMATO OFICIAL BPM-FO-27 & CRONOGRAMA */}';

if (!content.includes(target)) {
  console.error('Target comment not found in index.html');
  process.exit(1);
}

// Check if already injected
if (content.includes('SECCIÓN ESTRUCTURADA 00. MANUAL')) {
  console.log('Sections already present in index.html');
  process.exit(0);
}

const addition = `{/* SECCIÓN ESTRUCTURADA 00. MANUAL Y CONTROL DOCUMENTAL */}
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

          ` + target;

content = content.replace(target, addition);
fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully injected sections 00, 12, 13 into index.html');
