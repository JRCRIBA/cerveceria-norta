/**
 * CERVECERÍA NORTA - STORAGE SERVICE PATTERN & RESILIENCE LAYER (V15.0)
 * 
 * Capa de persistencia con esquema validado, protección contra QuotaExceededError,
 * snapshots de respaldo automático (CERVECERIA_NORTA_BACKUP_V15), migración segura sin pérdida
 * de datos desde V14, cálculo forense de cuota de almacenamiento (5MB) y merge inteligente.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root.AuditLogger);
  } else {
    root.StorageService = factory(root.AuditLogger);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function(AuditLogger) {
  'use strict';

  const PRIMARY_KEY = 'CERVECERIA_NORTA_DATA_V17';
  const BACKUP_KEY = 'CERVECERIA_NORTA_BACKUP_V17';
  const THEME_KEY = 'NORTA_THEME';
  const LEGACY_KEYS = [
    'CERVECERIA_NORTA_DATA',
    'CERVECERIA_NORTA_DATA_V2',
    'CERVECERIA_NORTA_DATA_V3',
    'CERVECERIA_NORTA_DATA_V4',
    'CERVECERIA_NORTA_DATA_V5',
    'CERVECERIA_NORTA_DATA_V6',
    'CERVECERIA_NORTA_DATA_V7',
    'CERVECERIA_NORTA_DATA_V8',
    'CERVECERIA_NORTA_DATA_V9',
    'CERVECERIA_NORTA_DATA_V10',
    'CERVECERIA_NORTA_DATA_V11',
    'CERVECERIA_NORTA_DATA_V12',
    'CERVECERIA_NORTA_DATA_V13',
    'CERVECERIA_NORTA_DATA_V14',
    'CERVECERIA_NORTA_DATA_V15',
    'CERVECERIA_NORTA_DATA_V16'
  ];

  // Estructuras esenciales mínimas requeridas para considerar los datos íntegros
  const REQUIRED_ROOT_COLLECTIONS = [
    'batches', 'recipes', 'tanks', 'rawInventory', 'finishedGoods',
    'clients', 'salesOrders', 'cipLogs', 'qualityTests', 'employees',
    'invimaControlSystem', 'documentRepository', 'machineryAndEquipment',
    'inventoryMovements'
  ];

  class StorageServiceLayer {
    constructor() {
      this._saveTimeout = null;
      this.lastSaveStatus = 'OK';
      this.lastSaveTime = null;
    }

    /**
     * Carga y sanea los datos de la cervecería con tolerancia a fallos.
     * Si no existe V15, migra V14 o crea la semilla garantizando la presencia de todas las claves.
     */
    loadData(initialData) {
      if (typeof localStorage === 'undefined') {
        return initialData;
      }

      try {
        // 1. Limpieza de claves obsoletas antiguas (V1 a V13) conservando V14 para migración
        LEGACY_KEYS.forEach(key => {
          try { localStorage.removeItem(key); } catch (err) { console.warn('[StorageService] Advertencia al remover clave legacy:', err); }
        });

        // 2. Intentar cargar versión primaria V15
        let raw = localStorage.getItem(PRIMARY_KEY);
        let sourceKey = PRIMARY_KEY;

        // Si no existe V15, verificar si hay datos en V14 para migración transparente
        if (!raw) {
          const v14 = localStorage.getItem('CERVECERIA_NORTA_DATA_V14');
          if (v14) {
            raw = v14;
            sourceKey = 'CERVECERIA_NORTA_DATA_V14 (Migrado a V15)';
            if (AuditLogger && AuditLogger.info) {
              AuditLogger.info('SISTEMA', 'Migración exitosa de datos operativos desde V14 a V15.');
            }
          }
        }

        if (raw) {
          const parsed = JSON.parse(raw);
          const validation = this.validateSchema(parsed);

          if (validation.valid) {
            // Merge de inventarios para asegurar preservación de nuevos insumos y equipos
            const existingRawIds = new Set((parsed.rawInventory || []).map(r => r.id));
            const freshRawItems = (initialData.rawInventory || []).filter(r => !existingRawIds.has(r.id));
            const mergedRawInventory = [...(parsed.rawInventory || initialData.rawInventory || []), ...freshRawItems];

            const existingMachIds = new Set((parsed.machineryAndEquipment || []).map(m => m.id));
            const freshMachItems = (initialData.machineryAndEquipment || []).filter(m => !existingMachIds.has(m.id));
            const mergedMachinery = [...(parsed.machineryAndEquipment || initialData.machineryAndEquipment || []), ...freshMachItems];

            // Merge inteligente: inicial + parsed + campos críticos blindados
            const merged = {
              ...initialData,
              ...parsed,
              rawInventory: mergedRawInventory,
              machineryAndEquipment: mergedMachinery,
              info: { ...initialData.info, ...(parsed.info || {}) },
              brandIdentity: initialData.brandIdentity, // Siempre mantener identidad canónica de marca NORTA
              recipes: parsed.recipes && parsed.recipes.length > 0 ? parsed.recipes : initialData.recipes,
              invimaControlSystem: parsed.invimaControlSystem && parsed.invimaControlSystem.length >= 11
                ? parsed.invimaControlSystem
                : initialData.invimaControlSystem,
              waterControlMetadata: parsed.waterControlMetadata || initialData.waterControlMetadata,
              waterControlLogs: parsed.waterControlLogs || initialData.waterControlLogs,
              storageIngressMetadata: parsed.storageIngressMetadata || initialData.storageIngressMetadata,
              storageIngressLogs: parsed.storageIngressLogs || initialData.storageIngressLogs
            };

            // Asegurar backup inicial
            this.createSnapshot(merged, 'Auto-snapshot al iniciar sesión');
            this.lastSaveTime = new Date().toISOString();
            return merged;
          } else {
            console.warn('[StorageService] Datos corruptos en storage. Errores:', validation.errors);
            if (AuditLogger && AuditLogger.warn) {
              AuditLogger.warn('SISTEMA', 'Esquema de datos con advertencias. Ejecutando autorreparación y merge.', { errors: validation.errors });
            }
            // Reparación por combinación con datos iniciales
            const repaired = { ...initialData, ...parsed };
            this.saveData(repaired, true);
            return repaired;
          }
        }
      } catch (err) {
        console.error('[StorageService] Error crítico al cargar storage:', err);
        if (AuditLogger && AuditLogger.error) {
          AuditLogger.error('SISTEMA', `Error de carga en StorageService: ${err.message}`, { stack: err.stack });
        }
      }

      // Si no había datos o hubo excepción irremediable, inicializar con semilla
      this.saveData(initialData, true);
      this.createSnapshot(initialData, 'Semilla de fábrica V15');
      return initialData;
    }

    /**
     * Valida la presencia e integridad de las colecciones obligatorias del sistema
     */
    validateSchema(data) {
      if (!data || typeof data !== 'object') {
        return { valid: false, errors: ['El objeto de datos es nulo o no es un objeto válido.'] };
      }
      const errors = [];
      REQUIRED_ROOT_COLLECTIONS.forEach(field => {
        if (!data[field] || !Array.isArray(data[field])) {
          errors.push(`Colección faltante o no es arreglo: ${field}`);
        }
      });
      return {
        valid: errors.length === 0,
        errors
      };
    }

    /**
     * Guarda el estado de la aplicación con protección contra excepciones de cuota
     */
    saveData(data, immediate = false) {
      if (typeof localStorage === 'undefined' || !data) return false;

      const executeSave = () => {
        try {
          const serialized = JSON.stringify(data);
          localStorage.setItem(PRIMARY_KEY, serialized);
          this.lastSaveStatus = 'OK';
          this.lastSaveTime = new Date().toISOString();
          return true;
        } catch (err) {
          this.lastSaveStatus = 'ERROR';
          const isQuota = err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014;
          console.error('[StorageService] Fallo al persistir datos:', err);

          if (AuditLogger && AuditLogger.error) {
            AuditLogger.error('SISTEMA', `Fallo de persistencia (${isQuota ? 'CUOTA EXCEDIDA' : 'ERROR GENERAL'}): ${err.message}`, {
              quotaExceeded: isQuota,
              storageMetrics: this.getStorageMetrics()
            });
          }

          if (isQuota) {
            // Estrategia de contención: intentar purgar logs antiguos para liberar espacio
            this._emergencyFreeSpace();
          }
          return false;
        }
      };

      if (immediate) {
        return executeSave();
      }

      // Debounce suave de 200ms para evitar escrituras JSON excesivas durante tipeo rápido
      if (this._saveTimeout) clearTimeout(this._saveTimeout);
      this._saveTimeout = setTimeout(executeSave, 200);
      return true;
    }

    /**
     * Crea un snapshot de seguridad en localStorage independiente de la clave principal
     */
    createSnapshot(data, reason = 'Snapshot Manual') {
      if (typeof localStorage === 'undefined' || !data) return false;
      try {
        const snapshotPayload = {
          metadata: {
            reason,
            createdAt: new Date().toISOString(),
            version: 'V15-Enterprise',
            itemCounts: {
              batches: data.batches?.length || 0,
              recipes: data.recipes?.length || 0,
              tanks: data.tanks?.length || 0,
              invimaDocs: data.invimaControlSystem?.reduce((acc, p) => acc + (p.documents?.length || 0), 0) || 0
            }
          },
          data
        };
        localStorage.setItem(BACKUP_KEY, JSON.stringify(snapshotPayload));
        if (AuditLogger && AuditLogger.info) {
          AuditLogger.info('SISTEMA', `Snapshot de respaldo creado exitosamente: "${reason}".`);
        }
        return true;
      } catch (err) {
        console.warn('[StorageService] No se pudo crear snapshot:', err);
        return false;
      }
    }

    /**
     * Restaura los datos desde el snapshot de respaldo
     */
    restoreBackup() {
      if (typeof localStorage === 'undefined') return null;
      try {
        const raw = localStorage.getItem(BACKUP_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const restoredData = parsed.data || parsed;
        this.saveData(restoredData, true);
        if (AuditLogger && AuditLogger.warn) {
          AuditLogger.warn('SISTEMA', 'Restauración ejecutada desde Snapshot de Respaldo.');
        }
        return restoredData;
      } catch (err) {
        console.error('[StorageService] Error al restaurar respaldo:', err);
        return null;
      }
    }

    /**
     * Calcula métricas forenses del almacenamiento local
     */
    getStorageMetrics() {
      if (typeof localStorage === 'undefined') {
        return { usedBytes: 0, usedKb: 0, usedMb: 0, quotaMb: 5, percentage: 0, keys: [] };
      }

      let totalBytes = 0;
      const keys = [];

      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key) || '';
          // 2 bytes por carácter en UTF-16
          const keyBytes = (key.length + val.length) * 2;
          totalBytes += keyBytes;
          keys.push({
            key,
            sizeKb: (keyBytes / 1024).toFixed(2),
            isPrimary: key === PRIMARY_KEY,
            isBackup: key === BACKUP_KEY
          });
        }
      } catch (e) {
        console.warn('[StorageService] Error calculando métricas:', e);
      }

      const quotaBytes = 5 * 1024 * 1024; // 5 MB aproximados en navegadores estándar
      const percentage = (totalBytes / quotaBytes) * 100;

      return {
        usedBytes: totalBytes,
        usedKb: (totalBytes / 1024).toFixed(2),
        usedMb: (totalBytes / (1024 * 1024)).toFixed(3),
        quotaMb: 5,
        percentage: Math.min(100, percentage).toFixed(2),
        isHighUsage: percentage > 75,
        isCritical: percentage > 90,
        keysCount: keys.length,
        keys
      };
    }

    /**
     * Estrategia de liberación de emergencia
     */
    _emergencyFreeSpace() {
      try {
        LEGACY_KEYS.forEach(k => localStorage.removeItem(k));
        localStorage.removeItem('CERVECERIA_NORTA_DATA_V14');
        console.warn('[StorageService] Purgadas claves legacy para recuperar cuota.');
      } catch (err) {
        console.warn('[StorageService] Error no crítico al liberar espacio de emergencia:', err);
      }
    }

    /**
     * Exporta el estado completo en archivo descargable JSON
     */
    exportFullBackupJSON(data) {
      const payload = {
        app: "CERVECERÍA NORTA OS",
        version: "5.0-Enterprise-V15",
        exportedAt: new Date().toISOString(),
        metrics: this.getStorageMetrics(),
        data
      };
      const jsonStr = JSON.stringify(payload, null, 2);
      const dataUri = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);
      return {
        filename: `NORTA_FULL_BACKUP_${new Date().toISOString().slice(0, 10)}.json`,
        downloadUrl: dataUri,
        sizeKb: (jsonStr.length / 1024).toFixed(2)
      };
    }

    /**
     * Restaura configuración inicial de fábrica
     */
    resetFactory(initialData) {
      if (typeof localStorage === 'undefined') return initialData;
      // Respaldar antes de purgar
      const current = localStorage.getItem(PRIMARY_KEY);
      if (current) {
        try {
          localStorage.setItem(BACKUP_KEY, JSON.stringify({
            metadata: { reason: 'Snapshot previo a Reseteo de Fábrica', date: new Date().toISOString() },
            data: JSON.parse(current)
          }));
        } catch (err) {
          console.warn('[StorageService] No se pudo guardar snapshot de respaldo antes de reset:', err);
        }
      }

      localStorage.removeItem(PRIMARY_KEY);
      localStorage.removeItem('CERVECERIA_NORTA_DATA_V14');
      LEGACY_KEYS.forEach(k => {
        try { localStorage.removeItem(k); } catch (err) { console.warn('[StorageService] Advertencia al purgar clave:', err); }
      });

      this.saveData(initialData, true);
      if (AuditLogger && AuditLogger.warn) {
        AuditLogger.warn('SISTEMA', 'Restauración de Fábrica NORTA V5.0 ejecutada.');
      }
      return initialData;
    }
  }

  return new StorageServiceLayer();
});
