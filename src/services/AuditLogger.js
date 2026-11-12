/**
 * CERVECERÍA NORTA - AUDIT LOGGER & TELEMETRY SERVICE (V15.0)
 * 
 * Búfer circular forense de hasta 150 eventos operativos y de sistema.
 * Persiste trazabilidad inmutable en localStorage para auditoría sanitaria INVIMA,
 * eventos de producción, inocuidad BPM, desinfección CIP y excepciones en tiempo de ejecución.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AuditLogger = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';

  const STORAGE_KEY = 'CERVECERIA_NORTA_AUDIT_V15';
  const MAX_LOGS = 150;

  // Niveles soportados
  const LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL'
  };

  // Categorías operativas
  const CATEGORIES = {
    PRODUCCION: 'PRODUCCION',
    INVIMA_BPM: 'INVIMA_BPM',
    CALIDAD_CIP: 'CALIDAD_CIP',
    INVENTARIO: 'INVENTARIO',
    SEGURIDAD: 'SEGURIDAD',
    SISTEMA: 'SISTEMA'
  };

  class AuditLoggerService {
    constructor() {
      this.logs = [];
      this.init();
    }

    init() {
      try {
        if (typeof localStorage !== 'undefined') {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            this.logs = JSON.parse(raw);
            if (!Array.isArray(this.logs)) this.logs = [];
          }
        }
      } catch (e) {
        console.warn('[AuditLogger] No se pudo inicializar buffer desde localStorage:', e);
        this.logs = [];
      }

      // Log de inicialización si buffer está vacío
      if (this.logs.length === 0) {
        this.log(LEVELS.INFO, CATEGORIES.SISTEMA, 'Auditoría Forense NORTA OS Inicializada.', {
          version: '5.0-Enterprise',
          timestamp: new Date().toISOString()
        });
      }
    }

    _persist() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
        }
      } catch (e) {
        console.error('[AuditLogger] Error al persistir logs de auditoría:', e);
      }
    }

    log(level, category, message, metadata = {}) {
      const entry = {
        id: `AUD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        level: LEVELS[level] || LEVELS.INFO,
        category: CATEGORIES[category] || CATEGORIES.SISTEMA,
        message: String(message || ''),
        metadata: metadata || {}
      };

      // Agregar al inicio (más reciente primero)
      this.logs.unshift(entry);

      // Mantener tamaño máximo de 150 eventos (búfer circular)
      if (this.logs.length > MAX_LOGS) {
        this.logs = this.logs.slice(0, MAX_LOGS);
      }

      this._persist();

      // Reflejar en consola para observabilidad en DevTools
      if (entry.level === LEVELS.ERROR || entry.level === LEVELS.CRITICAL) {
        console.error(`[NORTA ${entry.category}]`, entry.message, entry.metadata);
      } else if (entry.level === LEVELS.WARN) {
        console.warn(`[NORTA ${entry.category}]`, entry.message, entry.metadata);
      }

      return entry;
    }

    info(category, message, metadata) {
      return this.log(LEVELS.INFO, category, message, metadata);
    }

    warn(category, message, metadata) {
      return this.log(LEVELS.WARN, category, message, metadata);
    }

    error(category, message, metadata) {
      return this.log(LEVELS.ERROR, category, message, metadata);
    }

    critical(category, message, metadata) {
      return this.log(LEVELS.CRITICAL, category, message, metadata);
    }

    getLogs(filters = {}) {
      let result = [...this.logs];
      if (filters.level) {
        result = result.filter(l => l.level === filters.level);
      }
      if (filters.category) {
        result = result.filter(l => l.category === filters.category);
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(l => 
          l.message.toLowerCase().includes(q) || 
          l.category.toLowerCase().includes(q) ||
          JSON.stringify(l.metadata).toLowerCase().includes(q)
        );
      }
      if (filters.limit && typeof filters.limit === 'number') {
        result = result.slice(0, filters.limit);
      }
      return result;
    }

    clearLogs() {
      this.logs = [];
      this.log(LEVELS.WARN, CATEGORIES.SISTEMA, 'Búfer de auditoría forense reseteado por el usuario.');
      return true;
    }

    exportLogsJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.logs, null, 2));
      return {
        data: this.logs,
        jsonString: JSON.stringify(this.logs, null, 2),
        downloadUrl: dataStr,
        filename: `NORTA_AUDIT_TRAIL_${new Date().toISOString().replace(/[:.]/g, '-')}.json`
      };
    }

    getSummary() {
      const countsByLevel = { INFO: 0, WARN: 0, ERROR: 0, CRITICAL: 0 };
      const countsByCategory = {};

      this.logs.forEach(l => {
        countsByLevel[l.level] = (countsByLevel[l.level] || 0) + 1;
        countsByCategory[l.category] = (countsByCategory[l.category] || 0) + 1;
      });

      return {
        total: this.logs.length,
        maxCapacity: MAX_LOGS,
        countsByLevel,
        countsByCategory,
        latestEntry: this.logs[0] || null
      };
    }
  }

  return new AuditLoggerService();
});
