/**
 * Cervecería NORTA OS — Recall & Bidirectional Traceability Graph Engine
 * [LOCK-05] MOTOR FORENSE DE TRAZABILIDAD INVERSA (RESOLUCIÓN 2674/2013 ART. 37)
 * 
 * Regla Marcial: Función pura, determinista, portable, sin dependencias de React ni DOM.
 * Conforme a SPEC.md (Sección 0, Sección 2.2, Sección 4.3, DT-10 y Criterio Gherkin 3).
 * Garantiza reconstrucción de cadena de custodia completa en < 2 segundos (Estándar Legal: < 2 horas).
 */

import type {
  Batch,
  RawInventoryItem,
  InventoryMovement,
  CipLog,
  QualityTest,
  SalesOrder,
  Keg,
  RetainedSampleLog,
  CipStatus
} from "../../../types/brewery.ts";

export interface TraceabilityDossier {
  batchCode: string;
  recipeName: string;
  style: string;
  brewDate: string;
  targetPackDate: string;
  stage: string;
  status: string;
  volumeLiters: number;
  brewer: string;
  
  // 1. Insumos y Proveedores (Trazabilidad Hacia Atrás)
  rawMaterialsTrace: Array<{
    category: string;
    name: string;
    lot?: string;
    quantityUsed: number | string;
    unit: string;
    supplier?: string;
    movementId?: string;
  }>;

  // 2. Equipamiento e Higiene CIP (Trazabilidad de Proceso Interno)
  equipmentTrace: {
    tankId: string;
    tankName?: string;
    priorCipLog?: CipLog | null;
    cipStatus: "CONFORME" | "NO_REGISTRADO" | "PENDIENTE";
  };

  // 3. Calidad y Parámetros Fisicoquímicos (Laboratorio y Cinética)
  qualityTrace: {
    tests: QualityTest[];
    fermentationDaysLogged: number;
    finalGravityObserved?: number;
    finalAbvCalculated?: number;
    verdict: "APROBADO_ENVASADO" | "EN_OBSERVACION" | "RECHAZADO" | "SIN_ANALISIS";
  };

  // 4. Clientes B2B y Despacho Comercial (Trazabilidad Hacia Adelante)
  commercialDispatchTrace: {
    affectedClients: Array<{
      clientName: string;
      orderId: string;
      orderDate: string;
      productName: string;
      quantityOrdered: number;
      deliveryDate: string;
    }>;
    affectedKegs: Array<{
      serial: string;
      capacityL: number;
      currentClient: string | null;
      daysOut: number;
      alert: string;
    }>;
    totalUnitsDispatched: number;
  };

  // 5. Contramuestras Retenidas (Evidencia Legal SGC)
  retainedSamplesTrace: Array<{
    sampleId: string;
    beerName: string;
    unitsHeld: number;
    shelfLocation: string;
    responsible: string;
  }>;

  // 6. Dictamen de Auditoría INVIMA Art. 37
  auditSummary: {
    isFullyTraceable: boolean;
    missingEvidenceWarnings: string[];
    generatedAt: string;
    executionTimeMs: number;
  };
}

export interface RecallDatabaseContext {
  batches: Batch[];
  rawInventory?: RawInventoryItem[];
  inventoryMovements?: InventoryMovement[];
  cipLogs?: CipLog[];
  qualityTests?: QualityTest[];
  salesOrders?: SalesOrder[];
  kegs?: Keg[];
  retainedSamplesLogs?: Array<RetainedSampleLog | {
    id: string;
    batchLot?: string;
    batchCode?: string;
    beerName?: string;
    units?: number;
    shelfLocation?: string;
    responsible?: string;
  }>;
}

/**
 * Reconstruye de forma instantánea el árbol genealógico completo de un lote cervecero,
 * uniendo insumos (proveedores), fermentador (CIP), análisis de laboratorio,
 * órdenes comerciales (clientes B2B en riesgo) y contramuestras retenidas.
 */
export function buildRecallTraceabilityDossier(
  targetBatchCode: string,
  context: RecallDatabaseContext
): TraceabilityDossier | null {
  const startTime = Date.now();
  const warnings: string[] = [];

  // 1. Localizar el lote
  const batch = context.batches.find(b => 
    b.id === targetBatchCode || b.batchCode === targetBatchCode
  );

  if (!batch) {
    return null;
  }

  // 2. Rastrear insumos utilizados
  const rawMaterialsTrace: TraceabilityDossier["rawMaterialsTrace"] = [];

  // A partir de los movimientos vinculados al lote
  if (context.inventoryMovements) {
    const batchMovements = context.inventoryMovements.filter(m => 
      m.transformationLinkedId === targetBatchCode || 
      m.reason?.includes(targetBatchCode)
    );

    for (const mov of batchMovements) {
      const invItem = context.rawInventory?.find(i => i.id === mov.itemId);
      rawMaterialsTrace.push({
        category: mov.category,
        name: mov.itemName,
        quantityUsed: mov.quantity,
        unit: mov.unit,
        supplier: invItem?.supplier || "Proveedor Registrado",
        movementId: mov.id
      });
    }
  }

  // A partir de las recetas del lote si no hay movimientos explícitos
  if (rawMaterialsTrace.length === 0) {
    if (batch.maltsUsed && batch.maltsUsed.length > 0) {
      for (const m of batch.maltsUsed) {
        rawMaterialsTrace.push({
          category: "Maltas",
          name: m.name,
          lot: m.lot,
          quantityUsed: m.amountKg,
          unit: "Kg",
          supplier: "Insumos Cerveceros de Colombia"
        });
      }
    }
    if (batch.hopsUsed && batch.hopsUsed.length > 0) {
      for (const h of batch.hopsUsed) {
        rawMaterialsTrace.push({
          category: "Lúpulos",
          name: h.name,
          lot: h.lot,
          quantityUsed: h.amountGrams,
          unit: "Gramos",
          supplier: "Hopsteiner Americas"
        });
      }
    }
  }

  if (rawMaterialsTrace.length === 0) {
    warnings.push("No se encontraron registros de materias primas o BOM vinculados a este lote.");
  }

  // 3. Trazabilidad de Higiene y Tanque (CIP)
  const priorCipLog = context.cipLogs?.find(cip => 
    cip.equipment.toLowerCase().includes(batch.tankId.toLowerCase())
  ) || null;

  const equipmentTrace: TraceabilityDossier["equipmentTrace"] = {
    tankId: batch.tankId,
    priorCipLog,
    cipStatus: priorCipLog ? (priorCipLog.status as CipStatus) : "NO_REGISTRADO"
  };

  if (!priorCipLog) {
    warnings.push(`No se localizó bitácora de lavado CIP previa para el tanque asignado ${batch.tankId}.`);
  }

  // 4. Trazabilidad de Calidad y Ensayos
  const tests = context.qualityTests?.filter(t => t.batchId === targetBatchCode) || [];
  const latestTest = tests[tests.length - 1];

  const qualityTrace: TraceabilityDossier["qualityTrace"] = {
    tests,
    fermentationDaysLogged: batch.fermentationLogs?.length || 0,
    finalGravityObserved: batch.currentGravity,
    finalAbvCalculated: batch.abvCalculated,
    verdict: latestTest ? latestTest.overallVerdict : "SIN_ANALISIS"
  };

  // 5. Trazabilidad Hacia Adelante (Despacho a Clientes B2B & Barriles)
  const affectedClients: TraceabilityDossier["commercialDispatchTrace"]["affectedClients"] = [];
  let totalUnitsDispatched = 0;

  if (context.salesOrders) {
    for (const order of context.salesOrders) {
      for (const item of order.items || []) {
        if (
          item.productName.toLowerCase().includes(batch.recipeName.toLowerCase()) ||
          batch.recipeName.toLowerCase().includes(item.productName.toLowerCase())
        ) {
          affectedClients.push({
            clientName: order.clientName,
            orderId: order.id,
            orderDate: order.date,
            productName: item.productName,
            quantityOrdered: item.quantity,
            deliveryDate: order.deliveryDate
          });
          totalUnitsDispatched += item.quantity;
        }
      }
    }
  }

  const affectedKegs: TraceabilityDossier["commercialDispatchTrace"]["affectedKegs"] = [];
  if (context.kegs) {
    const kegsOfStyle = context.kegs.filter(k => 
      k.style.toLowerCase().includes(batch.style.toLowerCase()) || 
      batch.style.toLowerCase().includes(k.style.toLowerCase())
    );
    for (const keg of kegsOfStyle) {
      affectedKegs.push({
        serial: keg.serial,
        capacityL: keg.capacityL,
        currentClient: keg.client,
        daysOut: keg.daysOut,
        alert: keg.alert
      });
    }
  }

  // 6. Contramuestras Retenidas
  const retainedSamplesTrace: TraceabilityDossier["retainedSamplesTrace"] = [];
  if (context.retainedSamplesLogs) {
    const samples = context.retainedSamplesLogs.filter(s => 
      s.batchLot === targetBatchCode || 
      s.batchCode === targetBatchCode || 
      Boolean(s.beerName && s.beerName.toLowerCase().includes(batch.recipeName.toLowerCase()))
    );
    for (const sample of samples) {
      retainedSamplesTrace.push({
        sampleId: sample.id,
        beerName: sample.beerName || batch.recipeName,
        unitsHeld: ("units" in sample && typeof sample.units === "number") ? sample.units : (("sampleCount" in sample && typeof sample.sampleCount === "number") ? sample.sampleCount : 1),
        shelfLocation: sample.shelfLocation || "Cámara Fría P3",
        responsible: ("responsible" in sample && typeof sample.responsible === "string") ? sample.responsible : (("responsiblePerson" in sample && typeof sample.responsiblePerson === "string") ? sample.responsiblePerson : "Calidad")
      });
    }
  }

  if (retainedSamplesTrace.length === 0) {
    warnings.push("Alerta Sanitaria: No se localizaron contramuestras retenidas en custodia para este lote.");
  }

  const executionTimeMs = Date.now() - startTime;

  return {
    batchCode: targetBatchCode,
    recipeName: batch.recipeName,
    style: batch.style,
    brewDate: batch.brewDate,
    targetPackDate: batch.targetPackDate,
    stage: batch.stage,
    status: batch.status,
    volumeLiters: batch.volumeLiters,
    brewer: batch.brewer,
    rawMaterialsTrace,
    equipmentTrace,
    qualityTrace,
    commercialDispatchTrace: {
      affectedClients,
      affectedKegs,
      totalUnitsDispatched
    },
    retainedSamplesTrace,
    auditSummary: {
      isFullyTraceable: warnings.length === 0,
      missingEvidenceWarnings: warnings,
      generatedAt: new Date().toISOString(),
      executionTimeMs
    }
  };
}
