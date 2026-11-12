/**
 * CERVECERÍA NORTA - INDEXED DATA REPOSITORY & ACCESS LAYER (V15.0)
 * 
 * Capa de repositorio indexado para sustituir búsquedas lineales O(N) (.find, .filter)
 * por tablas Hash Map con acceso en tiempo constante O(1).
 * Resuelve relaciones entre Lotes, Recetas, Tanques, Clientes y las 11 Carpetas INVIMA.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DataRepository = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';

  class DataRepositoryLayer {
    constructor() {
      this.batchesMap = new Map();
      this.recipesMap = new Map();
      this.tanksMap = new Map();
      this.clientsMap = new Map();
      this.invimaProgramsMap = new Map();
      this.invimaDocsMap = new Map();
      this.activeBatchesCache = [];
      this.availableTanksCache = [];
      this.lastIndexedDataRef = null;
    }

    /**
     * Reconstruye los índices Hash Map a partir del estado de datos
     */
    indexData(data) {
      if (!data) return;
      if (this.lastIndexedDataRef === data) return; // Ya indexado este estado

      this.batchesMap.clear();
      this.recipesMap.clear();
      this.tanksMap.clear();
      this.clientsMap.clear();
      this.invimaProgramsMap.clear();
      this.invimaDocsMap.clear();
      this.activeBatchesCache = [];
      this.availableTanksCache = [];

      // 1. Indexar Recetas O(1)
      if (Array.isArray(data.recipes)) {
        data.recipes.forEach(r => {
          if (r && r.id) this.recipesMap.set(r.id, r);
        });
      }

      // 2. Indexar Tanques O(1)
      if (Array.isArray(data.tanks)) {
        data.tanks.forEach(t => {
          if (t && t.id) {
            this.tanksMap.set(t.id, t);
            if (t.status === 'Disponible' || t.status === 'Limpio') {
              this.availableTanksCache.push(t);
            }
          }
        });
      }

      // 3. Indexar Lotes O(1) y cachear activos
      if (Array.isArray(data.batches)) {
        data.batches.forEach(b => {
          if (b && b.id) {
            this.batchesMap.set(b.id, b);
            if (b.status === 'Activo' || b.stage === 'Fermentación' || b.stage === 'Maduración') {
              this.activeBatchesCache.push(b);
            }
          }
        });
      }

      // 4. Indexar Clientes B2B O(1)
      if (Array.isArray(data.clients)) {
        data.clients.forEach(c => {
          if (c && c.id) this.clientsMap.set(c.id, c);
        });
      }

      // 5. Indexar Sistema INVIMA (11 Carpetas Oficiales)
      if (Array.isArray(data.invimaControlSystem)) {
        data.invimaControlSystem.forEach(p => {
          if (p && p.id) {
            this.invimaProgramsMap.set(p.id, p);
            if (Array.isArray(p.documents)) {
              p.documents.forEach(d => {
                if (d && d.id) {
                  this.invimaDocsMap.set(d.id, { ...d, programId: p.id, programName: p.name });
                }
              });
            }
          }
        });
      }

      this.lastIndexedDataRef = data;
    }

    // --- MÉTODOS DE CONSULTA O(1) ---

    getBatch(batchId) {
      return this.batchesMap.get(batchId) || null;
    }

    getRecipe(recipeId) {
      return this.recipesMap.get(recipeId) || null;
    }

    getTank(tankId) {
      return this.tanksMap.get(tankId) || null;
    }

    getClient(clientId) {
      return this.clientsMap.get(clientId) || null;
    }

    getInvimaProgram(progId) {
      return this.invimaProgramsMap.get(progId) || null;
    }

    getInvimaDoc(docId) {
      return this.invimaDocsMap.get(docId) || null;
    }

    /**
     * Resuelve en O(1) el lote completo enriquecido con la receta y tanque asociados
     */
    getBatchEnriched(batchId) {
      const batch = this.getBatch(batchId);
      if (!batch) return null;
      return {
        ...batch,
        recipeObj: this.getRecipe(batch.recipeId),
        tankObj: this.getTank(batch.tankId)
      };
    }

    /**
     * Retorna lotes activos en O(1) (pre-calculado en index)
     */
    getActiveBatches() {
      return this.activeBatchesCache;
    }

    /**
     * Retorna tanques libres en O(1)
     */
    getAvailableTanks() {
      return this.availableTanksCache;
    }

    /**
     * Resumen de ocupación volumétrica de la bodega
     */
    getTankOccupancySummary() {
      let totalCapacityLiters = 0;
      let usedCapacityLiters = 0;
      let tanksInFermentation = 0;
      let tanksInConditioning = 0;

      this.tanksMap.forEach(tank => {
        totalCapacityLiters += (tank.capacityLiters || 0);
        if (tank.currentBatchId) {
          usedCapacityLiters += (tank.capacityLiters || 0);
          if (tank.status === 'Fermentando') tanksInFermentation++;
          if (tank.status === 'Madurando') tanksInConditioning++;
        }
      });

      const percentage = totalCapacityLiters > 0 
        ? ((usedCapacityLiters / totalCapacityLiters) * 100).toFixed(1) 
        : 0;

      return {
        totalCapacityLiters,
        usedCapacityLiters,
        availableLiters: totalCapacityLiters - usedCapacityLiters,
        occupancyPercentage: Number(percentage),
        totalTanks: this.tanksMap.size,
        tanksInFermentation,
        tanksInConditioning
      };
    }

    /**
     * Auditoría y métricas forenses del Sistema de Control INVIMA (11 Carpetas)
     */
    getInvimaSanitaryMetrics(data) {
      const programs = (data && data.invimaControlSystem) || Array.from(this.invimaProgramsMap.values());
      const totalPrograms = programs.length;
      let totalDocs = 0;
      let digitalizedDocs = 0;
      let physicalFolderOnlyDocs = 0;
      const programsSummary = [];

      programs.forEach(prog => {
        const docs = prog.documents || [];
        const docCount = docs.length;
        totalDocs += docCount;
        
        let digiInProg = 0;
        docs.forEach(d => {
          if (d.digitalFileAvailable || d.fileUrl || d.code) digiInProg++;
        });
        digitalizedDocs += digiInProg;
        physicalFolderOnlyDocs += (docCount - digiInProg);

        programsSummary.push({
          id: prog.id,
          number: prog.number,
          name: prog.name,
          icon: prog.icon,
          docCount,
          sanitaryImportance: prog.sanitaryImportance || 'Alta',
          hasResponsible: Boolean(prog.responsibleLead)
        });
      });

      return {
        totalPrograms,
        targetPrograms: 11,
        isComplete: totalPrograms >= 11,
        totalDocs,
        digitalizedDocs,
        physicalFolderOnlyDocs,
        complianceRate: totalDocs > 0 ? ((digitalizedDocs / totalDocs) * 100).toFixed(1) : 0,
        programsSummary
      };
    }

    /**
     * Búsqueda multi-atributo de documentos INVIMA
     */
    searchInvimaDocs(query) {
      if (!query || query.trim() === '') {
        return Array.from(this.invimaDocsMap.values());
      }
      const q = query.toLowerCase().trim();
      const results = [];
      this.invimaDocsMap.forEach(doc => {
        if (
          (doc.name && doc.name.toLowerCase().includes(q)) ||
          (doc.code && doc.code.toLowerCase().includes(q)) ||
          (doc.programName && doc.programName.toLowerCase().includes(q)) ||
          (doc.legalStandard && doc.legalStandard.toLowerCase().includes(q))
        ) {
          results.push(doc);
        }
      });
      return results;
    }
  }

  return new DataRepositoryLayer();
});
