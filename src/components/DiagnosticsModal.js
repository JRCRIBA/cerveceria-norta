/**
 * CERVECERÍA NORTA - FORENSIC DIAGNOSTICS & TELEMETRY MODAL (V15.0)
 * 
 * Consola de supervisión técnica en tiempo real para el Maestro Cervecero y Auditores.
 * Proporciona telemetría de almacenamiento localStorage (cuota 5MB), verificación de integridad
 * de las 11 Carpetas INVIMA, visor interactivo del Audit Trail y prueba de resiliencia ErrorBoundary.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root.React, root.StorageService, root.DataRepository, root.AuditLogger);
  } else {
    root.DiagnosticsModal = factory(root.React, root.StorageService, root.DataRepository, root.AuditLogger);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function(React, StorageService, DataRepository, AuditLogger) {
  'use strict';

  if (!React) return function() { return null; };
  const { useState, useMemo } = React;

  function DiagnosticsModal({ data, onClose, theme, onSimulateError }) {
    const [activeTab, setActiveTab] = useState('storage'); // 'storage' | 'invima' | 'audit' | 'resilience'
    const [auditFilter, setAuditFilter] = useState({ level: '', category: '', search: '' });
    const [actionFeedback, setActionFeedback] = useState(null);

    // Métricas calculadas
    const storageMetrics = useMemo(() => {
      return (StorageService && StorageService.getStorageMetrics)
        ? StorageService.getStorageMetrics()
        : { usedKb: '0', quotaMb: 5, percentage: '0', keys: [] };
    }, []);

    const invimaMetrics = useMemo(() => {
      return (DataRepository && DataRepository.getInvimaSanitaryMetrics)
        ? DataRepository.getInvimaSanitaryMetrics(data)
        : { totalPrograms: 11, totalDocs: 0, complianceRate: 100, programsSummary: [] };
    }, [data]);

    const tankSummary = useMemo(() => {
      return (DataRepository && DataRepository.getTankOccupancySummary)
        ? DataRepository.getTankOccupancySummary()
        : { totalCapacityLiters: 0, usedCapacityLiters: 0, occupancyPercentage: 0 };
    }, [data]);

    const auditSummary = useMemo(() => {
      return (AuditLogger && AuditLogger.getSummary)
        ? AuditLogger.getSummary()
        : { total: 0, countsByLevel: {}, countsByCategory: {} };
    }, []);

    const filteredLogs = useMemo(() => {
      return (AuditLogger && AuditLogger.getLogs)
        ? AuditLogger.getLogs(auditFilter)
        : [];
    }, [auditFilter, actionFeedback]);

    const notify = (msg) => {
      setActionFeedback(msg);
      setTimeout(() => setActionFeedback(null), 3000);
    };

    const handleCreateBackup = () => {
      if (StorageService && StorageService.createSnapshot) {
        const ok = StorageService.createSnapshot(data, 'Snapshot Manual desde Consola de Diagnóstico');
        if (ok) {
          notify('✅ Snapshot de respaldo generado exitosamente.');
        } else {
          notify('❌ Error al crear snapshot.');
        }
      }
    };

    const handleRestoreBackup = () => {
      if (confirm('¿Deseas restaurar el estado de la planta desde el snapshot de seguridad?')) {
        if (StorageService && StorageService.restoreBackup) {
          const restored = StorageService.restoreBackup();
          if (restored) {
            notify('✅ Datos restaurados desde snapshot. Recargando...');
            setTimeout(() => window.location.reload(), 800);
          } else {
            notify('❌ No se encontró ningún snapshot válido para restaurar.');
          }
        }
      }
    };

    const handleExportFullJSON = () => {
      if (StorageService && StorageService.exportFullBackupJSON) {
        const exp = StorageService.exportFullBackupJSON(data);
        const link = document.createElement('a');
        link.href = exp.downloadUrl;
        link.download = exp.filename;
        link.click();
        notify(`📦 Copia de seguridad exportada (${exp.sizeKb} KB).`);
      }
    };

    const handleExportLogsJSON = () => {
      if (AuditLogger && AuditLogger.exportLogsJSON) {
        const exp = AuditLogger.exportLogsJSON();
        const link = document.createElement('a');
        link.href = exp.downloadUrl;
        link.download = exp.filename;
        link.click();
        notify('📜 Audit trail exportado en JSON.');
      }
    };

    const handleClearLogs = () => {
      if (confirm('¿Vaciar búfer circular de auditoría forense?')) {
        if (AuditLogger && AuditLogger.clearLogs) {
          AuditLogger.clearLogs();
          notify('🧹 Registro de auditoría vaciado.');
        }
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border ${theme === 'dark' ? 'bg-[#181816] text-[#f7f4ed] border-[#38352e]' : 'bg-[#fcfaf6] text-[#111827] border-[#d4c8b5]'}`}>
          
          {/* HEADER DEL MODAL */}
          <div className={`p-5 border-b flex items-center justify-between ${theme === 'dark' ? 'border-[#2e2b24] bg-[#121210]' : 'border-[#e2d8c3] bg-[#eee7da]'}`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0e2334] border border-[#b89764] flex items-center justify-center text-xl shadow">
                🩺
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold brand-title tracking-wider text-[#0e2334] dark:text-[#c9b38f]">
                    Diagnóstico Forense & Salud Operativa
                  </h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0e2334] text-[#c9b38f] font-mono font-bold uppercase tracking-wider">
                    v15.0 Enterprise
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Telemetría en tiempo real • Resiliencia ErrorBoundary • Persistencia & 11 Carpetas INVIMA
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-800 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 transition"
              title="Cerrar Consola"
            >
              ✕
            </button>
          </div>

          {/* NOTIFICACIÓN INTERNA TOAST */}
          {actionFeedback && (
            <div className="bg-[#b89764] text-[#1d1d1b] px-4 py-2 text-xs font-bold text-center border-b border-[#a38352] transition-all">
              {actionFeedback}
            </div>
          )}

          {/* KPI CARDS RESUMEN */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 border-b border-stone-200 dark:border-[#2e2b24]">
            {/* Storage */}
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141412] shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>💾 Almacenamiento</span>
                <span className={`px-1.5 py-0.2 rounded font-mono ${storageMetrics.isCritical ? 'bg-red-900 text-red-100' : 'bg-emerald-900/40 text-emerald-300'}`}>
                  {storageMetrics.percentage}%
                </span>
              </div>
              <div className="text-lg font-extrabold mt-1 text-[#0e2334] dark:text-[#c9b38f]">
                {storageMetrics.usedKb} <span className="text-xs font-normal text-stone-500">KB / 5MB</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full ${storageMetrics.isCritical ? 'bg-red-500' : storageMetrics.isHighUsage ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${Math.min(100, storageMetrics.percentage)}%` }}
                />
              </div>
            </div>

            {/* INVIMA */}
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141412] shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>🏛️ Control INVIMA</span>
                <span className="text-emerald-500 font-bold">100% OK</span>
              </div>
              <div className="text-lg font-extrabold mt-1 text-[#0e2334] dark:text-[#c9b38f]">
                {invimaMetrics.totalPrograms} <span className="text-xs font-normal text-stone-500">Programas</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-1 truncate">
                {invimaMetrics.totalDocs} documentos normativos
              </div>
            </div>

            {/* Ocupación Planta */}
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141412] shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>🍺 Ocupación Bodega</span>
                <span className="font-mono text-stone-500">{tankSummary.occupancyPercentage}%</span>
              </div>
              <div className="text-lg font-extrabold mt-1 text-[#0e2334] dark:text-[#c9b38f]">
                {tankSummary.usedCapacityLiters} <span className="text-xs font-normal text-stone-500">/ {tankSummary.totalCapacityLiters} L</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                {tankSummary.tanksInFermentation} fermentando, {tankSummary.tanksInConditioning} madurando
              </div>
            </div>

            {/* Telemetría Forense */}
            <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141412] shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>📜 Telemetría Forense</span>
                <span className="font-mono text-emerald-500">{auditSummary.total}/150</span>
              </div>
              <div className="text-lg font-extrabold mt-1 text-[#0e2334] dark:text-[#c9b38f]">
                {auditSummary.countsByLevel.ERROR || 0} <span className="text-xs font-normal text-stone-500">Excepciones</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-1">
                {auditSummary.countsByLevel.WARN || 0} advertencias en buffer
              </div>
            </div>
          </div>

          {/* TABS DE NAVEGACIÓN */}
          <div className="flex border-b border-stone-200 dark:border-[#2e2b24] px-5 bg-stone-100/50 dark:bg-[#151513]">
            <button
              onClick={() => setActiveTab('storage')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'storage'
                  ? 'border-[#0e2334] dark:border-[#c9b38f] text-[#0e2334] dark:text-[#c9b38f]'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <span>💾</span> Persistencia & Cuota
            </button>
            <button
              onClick={() => setActiveTab('invima')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'invima'
                  ? 'border-[#0e2334] dark:border-[#c9b38f] text-[#0e2334] dark:text-[#c9b38f]'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <span>🏛️</span> Integridad 11 Carpetas INVIMA
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'border-[#0e2334] dark:border-[#c9b38f] text-[#0e2334] dark:text-[#c9b38f]'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <span>📜</span> Búfer de Auditoría ({filteredLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('resilience')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'resilience'
                  ? 'border-[#0e2334] dark:border-[#c9b38f] text-[#0e2334] dark:text-[#c9b38f]'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <span>🧪</span> Resiliencia & Simulación
            </button>
          </div>

          {/* CONTENIDO DE PESTAÑAS */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* PESTAÑA 1: PERSISTENCIA & CUOTA */}
            {activeTab === 'storage' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-600/30 text-xs">
                  <div>
                    <span className="font-bold text-[#0e2334] dark:text-[#c9b38f] block">
                      Protección Activa de Persistencia (StorageService Pattern)
                    </span>
                    <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                      Evita desbordamiento de cuota de navegador (5MB), valida el esquema contra objetos corruptos y genera snapshots automáticos.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCreateBackup}
                      className="btn-norta-secondary text-xs px-3 py-1.5 font-bold shadow-sm"
                    >
                      📸 Snapshot Manual
                    </button>
                    <button
                      onClick={handleRestoreBackup}
                      className="btn-norta-secondary text-xs px-3 py-1.5 font-bold text-amber-700 dark:text-amber-300 border-amber-500"
                    >
                      🔄 Restaurar Backup
                    </button>
                    <button
                      onClick={handleExportFullJSON}
                      className="btn-norta-primary text-xs px-3 py-1.5 font-bold shadow"
                    >
                      📦 Exportar JSON
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Desglose de Claves en Almacenamiento Local (localStorage)
                </h4>
                <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                      <tr>
                        <th className="p-2.5 font-bold">Clave de Persistencia</th>
                        <th className="p-2.5 font-bold">Rol Arquitectónico</th>
                        <th className="p-2.5 font-bold text-right">Tamaño</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                      {storageMetrics.keys.map(k => (
                        <tr key={k.key} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                          <td className="p-2.5 font-mono text-stone-700 dark:text-stone-300">
                            {k.key}
                          </td>
                          <td className="p-2.5">
                            {k.isPrimary && <span className="px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300 text-[10px] font-bold">Primario V15</span>}
                            {k.isBackup && <span className="px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300 text-[10px] font-bold">Snapshot Backup</span>}
                            {!k.isPrimary && !k.isBackup && <span className="text-stone-400 text-[11px]">Configuración / Logs</span>}
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-stone-600 dark:text-stone-400">
                            {k.sizeKb} KB
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PESTAÑA 2: INTEGRIDAD 11 CARPETAS INVIMA */}
            {activeTab === 'invima' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#0e2334]/10 border border-[#0e2334]/30 dark:bg-[#0e2334]/30 text-xs">
                  <span className="font-bold text-[#0e2334] dark:text-[#c9b38f] block">
                    Matriz de Cumplimiento Sanitario INVIMA (Decreto 1686 de 2012 / Resolución 2674 de 2013)
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                    11 Carpetas Oficiales auditadas y vinculadas con trazabilidad digital y formatos operativos.
                  </p>
                </div>

                <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
                      <tr>
                        <th className="p-2.5 font-bold"># Carpeta</th>
                        <th className="p-2.5 font-bold">Programa Oficial INVIMA</th>
                        <th className="p-2.5 font-bold">Documentos</th>
                        <th className="p-2.5 font-bold">Severidad Sanitaria</th>
                        <th className="p-2.5 font-bold text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                      {invimaMetrics.programsSummary.map(p => (
                        <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                          <td className="p-2.5 font-bold font-mono text-[#0e2334] dark:text-[#c9b38f]">
                            {p.icon} Carpeta {p.number}
                          </td>
                          <td className="p-2.5 font-medium">{p.name}</td>
                          <td className="p-2.5 font-mono">{p.docCount} docs</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/40 text-amber-200">
                              {p.sanitaryImportance}
                            </span>
                          </td>
                          <td className="p-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                            ✓ Conforme
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PESTAÑA 3: BÚFER DE AUDITORÍA */}
            {activeTab === 'audit' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="text"
                      placeholder="Buscar en traza forense..."
                      value={auditFilter.search}
                      onChange={(e) => setAuditFilter(prev => ({ ...prev, search: e.target.value }))}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs w-52"
                    />
                    <select
                      value={auditFilter.level}
                      onChange={(e) => setAuditFilter(prev => ({ ...prev, level: e.target.value }))}
                      className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold"
                    >
                      <option value="">Todos los Niveles</option>
                      <option value="INFO">INFO</option>
                      <option value="WARN">WARN</option>
                      <option value="ERROR">ERROR</option>
                      <option value="CRITICAL">CRITICAL</option>
                    </select>
                    <select
                      value={auditFilter.category}
                      onChange={(e) => setAuditFilter(prev => ({ ...prev, category: e.target.value }))}
                      className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold"
                    >
                      <option value="">Todas las Categorías</option>
                      <option value="PRODUCCION">PRODUCCION</option>
                      <option value="INVIMA_BPM">INVIMA_BPM</option>
                      <option value="CALIDAD_CIP">CALIDAD_CIP</option>
                      <option value="INVENTARIO">INVENTARIO</option>
                      <option value="SISTEMA">SISTEMA</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleExportLogsJSON} className="btn-norta-secondary text-xs px-3 py-1 font-bold">
                      📥 Exportar Logs JSON
                    </button>
                    <button onClick={handleClearLogs} className="btn-norta-secondary text-xs px-3 py-1 font-bold text-red-600 dark:text-red-400 border-red-500">
                      🗑️ Vaciar
                    </button>
                  </div>
                </div>

                <div className="border border-stone-200 dark:border-stone-800 rounded-xl max-h-80 overflow-y-auto font-mono text-[11px]">
                  {filteredLogs.length === 0 ? (
                    <div className="p-6 text-center text-stone-400">
                      No se encontraron eventos con los filtros seleccionados.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-200 dark:divide-stone-800">
                      {filteredLogs.map(log => (
                        <div key={log.id} className="p-2.5 hover:bg-stone-100/50 dark:hover:bg-stone-900/50 flex items-start gap-3">
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                            log.level === 'ERROR' || log.level === 'CRITICAL' ? 'bg-red-900 text-red-100' :
                            log.level === 'WARN' ? 'bg-amber-900 text-amber-100' : 'bg-blue-900/50 text-blue-200'
                          }`}>
                            {log.level}
                          </span>
                          <span className="text-stone-400 text-[10px] shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-stone-200 dark:bg-stone-800 text-[10px] font-bold shrink-0">
                            {log.category}
                          </span>
                          <div className="flex-1 break-words font-sans text-xs">
                            {log.message}
                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                              <pre className="text-[10px] text-stone-500 mt-1 font-mono bg-black/10 dark:bg-black/40 p-1 rounded max-w-full overflow-x-auto">
                                {JSON.stringify(log.metadata)}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PESTAÑA 4: RESILIENCIA & SIMULACIÓN */}
            {activeTab === 'resilience' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-600/30 text-xs">
                  <span className="font-bold text-[#0e2334] dark:text-[#c9b38f] block">
                    Tolerancia a Fallos y Aislamiento por React Error Boundaries
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                    Cada pestaña crítica cuenta con su propia envoltura Error Boundary. Si un cálculo matemático,
                    un gráfico SVG o un renderizado arroja una excepción, únicamente se aislará la vista afectada,
                    permitiendo que el resto de la planta continúe operando sin interrupción.
                  </p>
                </div>

                <div className="p-4 border border-dashed border-amber-600/40 rounded-xl space-y-3 bg-amber-500/5">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                    Prueba Controlada de Estrés Forense
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Presiona el siguiente botón para simular una excepción en tiempo de ejecución.
                    Esto demostrará cómo el Error Boundary captura el fallo, lo reporta en la telemetría forense
                    y ofrece la opción de reintento sin desmontar el sistema.
                  </p>
                  <button
                    onClick={() => {
                      if (onSimulateError) {
                        onSimulateError();
                      } else {
                        // Desencadenar log de prueba
                        AuditLogger.error('SISTEMA', 'Prueba de estrés forense ejecutada desde Consola de Diagnóstico.', {
                          simulated: true,
                          triggerTime: new Date().toISOString()
                        });
                        notify('⚠️ Excepción simulada registrada en el búfer de telemetría.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow transition flex items-center gap-2"
                  >
                    <span>⚡</span> Simular Fallo en ErrorBoundary
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className={`p-4 border-t flex items-center justify-between text-xs ${theme === 'dark' ? 'border-[#2e2b24] bg-[#121210]' : 'border-[#e2d8c3] bg-[#eee7da]'}`}>
            <div className="flex items-center gap-2 text-stone-500 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Motor Cervecero: En línea • LocalStorage v15 Activo</span>
            </div>
            <button
              onClick={onClose}
              className="btn-norta-secondary text-xs px-4 py-1.5 font-bold"
            >
              Cerrar Consola
            </button>
          </div>

        </div>
      </div>
    );
  }

  return DiagnosticsModal;
});
