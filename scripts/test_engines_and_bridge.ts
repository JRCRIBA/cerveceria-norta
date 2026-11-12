/**
 * Cervecería NORTA OS — Suite Automatizada de Pruebas de Contrato (Silicon Valley SDD)
 * Verifica:
 *   1. brewingKineticsEngine.ts
 *   2. sanitaryPokaYokeEngine.ts
 *   3. inventoryValuationEngine.ts
 *   4. recallGraphEngine.ts
 *   5. batch-invima-bridge.ts
 *   6. production-inventory-bridge.ts
 * Conforme a SPEC.md (Sección 7 - Criterios de Aceptación Gherkin).
 */

import {
  calculateAbv,
  calculateApparentAttenuation,
  sgToPlato,
  calculateHopIbuTinseth,
  analyzeFermentationKinetics
} from "../src/lib/engines/brewingKineticsEngine.ts";

import {
  evaluateWaterQuality,
  validateBrewingWaterClearance,
  SANITARY_THRESHOLDS
} from "../src/lib/engines/sanitaryPokaYokeEngine.ts";

import {
  calculateBatchCogs,
  calculateYieldAndLoss,
  generateBomDeductions,
  scanSafetyStockAlerts
} from "../src/lib/engines/inventoryValuationEngine.ts";

import {
  buildRecallTraceabilityDossier
} from "../src/lib/engines/recallGraphEngine.ts";

import {
  evaluateBatchStageAdvance,
  getNextBatchStage
} from "../src/bridges/batch-invima-bridge.ts";

import {
  executeMashingInventoryDeduction,
  executePackagingFinishedGoodsCredit
} from "../src/bridges/production-inventory-bridge.ts";

import type {
  Batch,
  Recipe,
  WaterControlLog,
  Tank,
  RawInventoryItem,
  FinishedGood,
  CipLog,
  QualityTest,
  SalesOrder,
  Keg
} from "../types/brewery.ts";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`  [FAIL] ${testName} ${detail ? `-> ${detail}` : ""}`);
    failedCount++;
  }
}

console.log("=================================================================");
console.log("  INICIANDO BATERÍA COMPLETA DE PRUEBAS DE CONTRATO (SPEC.md)");
console.log("=================================================================\n");

// -----------------------------------------------------------------------------
// 1. HEADLESS ENGINE: brewingKineticsEngine.ts
// -----------------------------------------------------------------------------
console.log("--- 1. Pruebas de brewingKineticsEngine (Cinética Cervecera) ---");

const abv1 = calculateAbv(1.082, 1.018); // Tempestad del Norte
assert(abv1 === 8.4, `ABV Tempestad (OG: 1.082, FG: 1.018) calculado: ${abv1} (Esperado: 8.4%)`);

const abv2 = calculateAbv(1.048, 1.009); // Cumbre Golden Ale
assert(abv2 === 5.12, `ABV Cumbre (OG: 1.048, FG: 1.009) calculado: ${abv2} (Esperado: 5.12%)`);

const att1 = calculateApparentAttenuation(1.082, 1.018);
assert(att1 === 78.0, `Atenuación Aparente calculada: ${att1}% (Esperado: 78.0%)`);

const plato = sgToPlato(1.048);
assert(plato >= 11.8 && plato <= 12.0, `Conversión a Grados Plato para SG 1.048: ${plato} °P`);

const ibu = calculateHopIbuTinseth(12.0, 50, 60, 1000, 1.050);
assert(Math.abs(ibu - 1.4) < 0.05, `Cálculo Tinseth IBU dimensional cuantitativo (Esperado: 1.40 +/- 0.05): ${ibu} IBUs`);

const kinetic = analyzeFermentationKinetics(1.050, 1.012, 1.010, [
  { day: 1, date: "2026-10-01", sg: 1.050 },
  { day: 2, date: "2026-10-02", sg: 1.030 },
  { day: 3, date: "2026-10-03", sg: 1.012 }
]);
assert(kinetic.status === "Atenuacion_Alcanzada", `Estado cinético detectado: ${kinetic.status}`);


// -----------------------------------------------------------------------------
// 2. HEADLESS ENGINE: sanitaryPokaYokeEngine.ts
// -----------------------------------------------------------------------------
console.log("\n--- 2. Pruebas de sanitaryPokaYokeEngine (Decreto 2115 de 2007) ---");

const waterOk = evaluateWaterQuality(1.20, 7.20);
assert(waterOk.complies === true && waterOk.status === "CONFORME", "Agua con Cloro 1.20 mg/L y pH 7.20 es CONFORME");

const waterLowCl = evaluateWaterQuality(0.15, 7.20);
assert(waterLowCl.complies === false && waterLowCl.status === "NO_CONFORME", "Agua con Cloro 0.15 mg/L es NO_CONFORME");

const waterHighCl = evaluateWaterQuality(2.50, 7.20);
assert(waterHighCl.complies === false, "Agua con Cloro 2.50 mg/L es NO_CONFORME");

const waterLowPh = evaluateWaterQuality(1.00, 6.10);
assert(waterLowPh.complies === false, "Agua con pH 6.10 es NO_CONFORME");

const waterHighPh = evaluateWaterQuality(1.00, 9.40);
assert(waterHighPh.complies === false, "Agua con pH 9.40 es NO_CONFORME");

const now = new Date("2026-10-16T15:00:00");
const freshLog: WaterControlLog = {
  id: "WLOG-101",
  date: "2026-10-16",
  time: "08:00",
  location: "Llave Maceración",
  chlorineMgL: 1.20,
  ph: 7.20,
  complies: "SI",
  verifiedBy: "Ing. Julio Cristancho",
  notes: "OK"
};
const clearanceFresh = validateBrewingWaterClearance(freshLog, now);
assert(clearanceFresh.allowed === true && clearanceFresh.code === "CLEARANCE_GRANTED", "Liberación sanitaria concedida para registro fresco de hoy");

const oldLog: WaterControlLog = {
  id: "WLOG-099",
  date: "2026-10-14",
  time: "08:00",
  location: "Llave Maceración",
  chlorineMgL: 1.20,
  ph: 7.20,
  complies: "SI",
  verifiedBy: "Ing. Julio Cristancho",
  notes: "OK"
};
const clearanceOld = validateBrewingWaterClearance(oldLog, now);
assert(clearanceOld.allowed === false && clearanceOld.code === "ERR_WATER_LOG_EXPIRED", "Bloqueo sanitario por registro de agua expirado (> 24h)");


// -----------------------------------------------------------------------------
// 3. HEADLESS ENGINE: inventoryValuationEngine.ts (Costeo COP y BOM)
// -----------------------------------------------------------------------------
console.log("\n--- 3. Pruebas de inventoryValuationEngine (Costeo COP & BOM) ---");

// Costeo COGS por Lote
const cogs = calculateBatchCogs(
  [{ amountKg: 200, unitCostCop: 7800 }, { amountKg: 30, unitCostCop: 10500 }],
  [{ amountGrams: 1500, unitCostCopPerGram: 180 }],
  120000, // Levadura
  50000,  // Sanitizantes y sales
  1000    // 1000 Litros
);
assert(cogs.totalBatchCostCop === 2315000, `Costo Total del Lote COP: $${cogs.totalBatchCostCop.toLocaleString()}`);
assert(cogs.costPerLiterCop === 2315.00, `Costo por Litro COP: $${cogs.costPerLiterCop}/L (Esperado: $2315.00/L)`);

// Rendimiento y Merma
const yieldData = calculateYieldAndLoss(1000, 950);
assert(yieldData.brewhouseEfficiencyPct === 95.0, `Eficiencia en brewhouse: ${yieldData.brewhouseEfficiencyPct}%`);
assert(yieldData.lossLiters === 50 && yieldData.lossPct === 5.0, `Merma de cocción: ${yieldData.lossLiters} L (${yieldData.lossPct}%)`);

// BOM Deductions
const sampleInventory: RawInventoryItem[] = [
  { id: "RAW-MAL-001", name: "Malta Pilsen Viking", category: "Maltas", stockInitial: 1000, entries: 0, entryDate: "2026-10-01", expiryDate: "2027-10-01", entryUnitPrice: 7800, exits: 0, stock: 500, unit: "Kg", minStock: 100, costPerUnit: 7800, supplier: "Insumos Cerveceros", status: "NORMAL" },
  { id: "RAW-HOP-001", name: "Lúpulo Citra T90", category: "Lúpulos", stockInitial: 20, entries: 0, entryDate: "2026-10-01", expiryDate: "2027-10-01", entryUnitPrice: 180000, exits: 0, stock: 5, unit: "Kg", minStock: 2, costPerUnit: 180000, supplier: "Hopsteiner", status: "NORMAL" }
];

const bomResult = generateBomDeductions(
  "NOR-2601-IPA",
  [{ name: "Malta Pilsen", amountKg: 150 }],
  [{ name: "Lúpulo Citra", amountGrams: 1000 }], // 1 Kg
  sampleInventory,
  "Julio Cristancho"
);
assert(bomResult.success === true, "Deducción de BOM ejecutada con éxito (Stock suficiente)");
assert(bomResult.movements.length === 2, `Generados ${bomResult.movements.length} movimientos de Kardex con tipo SALIDA`);
assert(bomResult.movements[0].transformationLinkedId === "NOR-2601-IPA", "Movimiento de Kardex vinculado a transformationLinkedId = NOR-2601-IPA");
assert(bomResult.updatedInventory[0].stock === 350, "Stock de Malta Pilsen actualizado: 500 - 150 = 350 Kg");
assert(bomResult.updatedInventory[1].stock === 4, "Stock de Lúpulo Citra actualizado: 5 - 1 = 4 Kg");

// Escaneo de Stock de Seguridad
const lowStockSample: RawInventoryItem[] = [
  { ...sampleInventory[0], stock: 80, minStock: 100 }
];
const alerts = scanSafetyStockAlerts(lowStockSample);
assert(alerts.length === 1 && alerts[0].id === "RAW-MAL-001", "Alerta de stock de seguridad disparada para malta bajo mínimo");


// -----------------------------------------------------------------------------
// 4. CLEAN BOUNDARY HARNESS: batch-invima-bridge.ts
// -----------------------------------------------------------------------------
console.log("\n--- 4. Pruebas de batch-invima-bridge (Escenarios Gherkin SPEC.md) ---");

const testBatch: Batch = {
  id: "NOR-2601-IPA",
  recipeName: "Niebla Hazy IPA",
  style: "Hazy IPA",
  tankId: "TK-01",
  volumeLiters: 1000,
  brewDate: "2026-10-16",
  targetPackDate: "2026-11-05",
  stage: "Planificado" as any,
  stageProgress: 0,
  originalGravity: 1.062,
  currentGravity: 1.062,
  finalGravityTarget: 1.012,
  currentTemp: 20,
  targetTemp: 20,
  abvCalculated: 0,
  abvTarget: 6.5,
  ibu: 45,
  brewer: "Julio Cristancho",
  status: "Activo",
  fermentationLogs: []
};

const cleanTank: Tank = {
  id: "TK-01",
  name: "Fermentador F1",
  type: "Fermentador",
  capacityL: 2000,
  currentL: 0,
  currentBatchId: null,
  beerName: "Disponible",
  status: "Limpio",
  tempC: 18,
  pressureBar: 0,
  daysInTank: 0,
  glycolValve: "AUTO",
  lastCipDate: "2026-10-15"
};

const dirtyTank: Tank = {
  ...cleanTank,
  status: "CIP_Pendiente"
};

const nonCompliantWaterLog: WaterControlLog = {
  id: "WLOG-102",
  date: "2026-10-16",
  time: "07:30",
  location: "Llave Maceración",
  chlorineMgL: 0.15, // NO CONFORME
  ph: 7.20,
  complies: "NO",
  verifiedBy: "Operario",
  notes: "Cloro bajo"
};

// Gherkin Escenario 1: Rechazo de avance a Maceración con agua no conforme
const gherkin1 = evaluateBatchStageAdvance(testBatch, "Maceración", {
  latestWaterLog: nonCompliantWaterLog,
  tank: cleanTank,
  currentDate: now
});
assert(
  gherkin1.canAdvance === false && gherkin1.blockReason?.code === "ERR_WATER_OUT_OF_RANGE",
  "GHERKIN ESCENARIO 1: Intento de Maceración con Cloro 0.15 mg/L es RECHAZADO con ERR_WATER_OUT_OF_RANGE"
);

// Gherkin Escenario 1 (Caso Exitoso): Avance a Maceración con agua conforme
const gherkin1Success = evaluateBatchStageAdvance(testBatch, "Maceración", {
  latestWaterLog: freshLog,
  tank: cleanTank,
  currentDate: now
});
assert(gherkin1Success.canAdvance === true, "GHERKIN ESCENARIO 1 (ÉXITO): Avance a Maceración con agua conforme es AUTORIZADO");

// Gherkin Escenario Adicional: Bloqueo de fermentación si el tanque requiere CIP
const gherkinTankBlocked = evaluateBatchStageAdvance(testBatch, "Fermentación", {
  latestWaterLog: freshLog,
  tank: dirtyTank,
  currentDate: now
});
assert(
  gherkinTankBlocked.canAdvance === false && gherkinTankBlocked.blockReason?.code === "ERR_TANK_CIP_PENDING",
  "POKA-YOKE TANQUE: Avance a Fermentación con tanque 'CIP_Pendiente' es RECHAZADO con ERR_TANK_CIP_PENDING"
);

const nextStage = getNextBatchStage("Maceración");
assert(nextStage === "Hervor", `Transición secuencial FSM: Maceración -> ${nextStage}`);


// -----------------------------------------------------------------------------
// 5. CLEAN BOUNDARY HARNESS: production-inventory-bridge.ts (Gherkin Escenario 2)
// -----------------------------------------------------------------------------
console.log("\n--- 5. Pruebas de production-inventory-bridge (Gherkin Escenario 2) ---");

const testRecipe: Recipe = {
  id: "rec-niebla-ipa",
  name: "Niebla Hazy IPA",
  style: "Hazy IPA",
  targetVolumeL: 1000,
  og: 1.062,
  fg: 1.012,
  abv: 6.5,
  ibu: 45,
  srmColor: 5.5,
  mashTemp: 66,
  boilTimeMin: 60,
  grains: [{ name: "Malta Pilsen", amountKg: 150, pct: 100 }],
  hops: [{ name: "Lúpulo Citra", amountGrams: 1000, timeMin: 15, use: "Whirlpool" }],
  yeast: { strain: "London Ale III", form: "Líquida", amountGrams: 200 }
};

const mashingResult = executeMashingInventoryDeduction(
  testBatch,
  testRecipe,
  sampleInventory,
  "Ing. Julio Cristancho"
);

assert(mashingResult.success === true, "GHERKIN ESCENARIO 2: Mashing deduction ejecutada exitosamente sin Babel de IDs");
assert(mashingResult.movementsGenerated.length === 2, "GHERKIN ESCENARIO 2: Movimientos generados para granos y lúpulos");
assert(mashingResult.movementsGenerated[0].transformationLinkedId === "NOR-2601-IPA", "GHERKIN ESCENARIO 2: transformationLinkedId coincide con NOR-2601-IPA");

// Envasado y Acreditación de Producto Terminado
const initialGoods: FinishedGood[] = [];
const packResult = executePackagingFinishedGoodsCredit(testBatch, initialGoods, "Botella 330ml");
assert(packResult.updatedFinishedGoods.length === 1, "Acreditada referencia en catálogo de Producto Terminado");
assert(packResult.unitsAdded === 3030, `Unidades de 330ml calculadas y agregadas a stock: ${packResult.unitsAdded}`);
assert(packResult.newInventoryMovement?.type === "ENTRADA", "Movimiento de Kardex de entrada generado para PT");


// -----------------------------------------------------------------------------
// 6. HEADLESS ENGINE: recallGraphEngine.ts (Gherkin Escenario 3: Recall < 2 horas)
// -----------------------------------------------------------------------------
console.log("\n--- 6. Pruebas de recallGraphEngine (Gherkin Escenario 3: Trazabilidad Art. 37) ---");

const sampleCipLog: CipLog = {
  id: "CIP-2026-001",
  date: "2026-10-15",
  equipment: "Fermentador F1 (TK-01)",
  operator: "Julio Cristancho",
  cycleType: "Completo 3 Pasos",
  causticTempC: 75,
  causticConcentrationPct: 2.0,
  peraceticConcentrationPpm: 150,
  rinseFinalPh: 7.0,
  swabAdenosineTriphosphateRlu: 12, // < 30 RLU conforme
  status: "CONFORME",
  supervisor: "Calidad"
};

const sampleLabTest: QualityTest = {
  id: "LAB-2026-001",
  batchId: "NOR-2601-IPA",
  date: "2026-10-25",
  style: "Hazy IPA",
  tank: "TK-01",
  ph: 4.35,
  dissolvedOxygenPpb: 25,
  carbonationVolCo2: 2.5,
  turbidityNtu: 45,
  diacetylSensoryScore: 1,
  sensoryScore100: 94,
  analyst: "Ing. Julio Cristancho",
  overallVerdict: "APROBADO_ENVASADO"
};

const sampleSalesOrder: SalesOrder = {
  id: "ORD-2026-089",
  clientName: "The Craft House Bar",
  date: "2026-11-01",
  items: [{ productId: "FG-NIE-B330", productName: "Niebla Hazy IPA Botella 330ml", quantity: 240, unitPrice: 9500, total: 2280000 }],
  totalAmountUSD: 600,
  status: "Entregada",
  paymentStatus: "Pagado",
  deliveryDate: "2026-11-02"
};

const sampleKeg: Keg = {
  serial: "NOR-K50-008",
  capacityL: 50,
  style: "Hazy IPA",
  client: "The Craft House Bar",
  sentDate: "2026-11-01",
  daysOut: 5,
  alert: "OK"
};

const sampleRetainedSample = {
  id: "SAMPLE-088",
  date: "2026-10-28",
  beerName: "Niebla Hazy IPA",
  batchLot: "NOR-2601-IPA",
  presentation: "Botella 330ml",
  units: 3,
  shelfLocation: "Cámara Fría P3-Estante-A",
  responsible: "Calidad NORTA",
  notes: "Contramuestra oficial INVIMA"
};

const dossier = buildRecallTraceabilityDossier("NOR-2601-IPA", {
  batches: [{
    ...testBatch,
    maltsUsed: [{ name: "Malta Pilsen Viking", lot: "LOT-VIK-26A", amountKg: 150 }],
    hopsUsed: [{ name: "Lúpulo Citra T90", lot: "LOT-CIT-2026-9", amountGrams: 1000 }]
  }],
  rawInventory: sampleInventory,
  inventoryMovements: mashingResult.movementsGenerated,
  cipLogs: [sampleCipLog],
  qualityTests: [sampleLabTest],
  salesOrders: [sampleSalesOrder],
  kegs: [sampleKeg],
  retainedSamplesLogs: [sampleRetainedSample]
});

assert(dossier !== null, "GHERKIN ESCENARIO 3: Dossier de Recall emitido con éxito");
assert(dossier!.rawMaterialsTrace.length > 0, "GHERKIN ESCENARIO 3: Trazabilidad hacia atrás de insumos identificada");
assert(dossier!.equipmentTrace.cipStatus === "CONFORME", "GHERKIN ESCENARIO 3: Lavado CIP previo de tanque verificado");
assert(dossier!.qualityTrace.verdict === "APROBADO_ENVASADO", "GHERKIN ESCENARIO 3: Ensayos de laboratorio trazados");
assert(dossier!.commercialDispatchTrace.affectedClients.length === 1, "GHERKIN ESCENARIO 3: Clientes B2B con producto en plaza identificados");
assert(dossier!.retainedSamplesTrace.length === 1, "GHERKIN ESCENARIO 3: Contramuestra en estantería fría identificada");
assert(dossier!.auditSummary.executionTimeMs < 1000, `GHERKIN ESCENARIO 3: Tiempo de ejecución de recall: ${dossier!.auditSummary.executionTimeMs} ms (< 1 seg vs límite legal de 2 horas)`);

console.log("\n=================================================================");
console.log(`  RESUMEN TOTAL: ${passedCount} PASADAS | ${failedCount} FALLIDAS`);
if (failedCount === 0) {
  console.log("  >>> TODOS LOS CONTRATOS ARQUITECTÓNICOS VERIFICADOS CON ÉXITO <<<");
} else {
  console.error("  >>> EXISTEN DISCREPANCIAS EN LOS CONTRATOS ARQUITECTÓNICOS <<<");
}
console.log("=================================================================\n");

process.exit(failedCount === 0 ? 0 : 1);
