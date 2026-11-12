/**
 * Cervecería NORTA OS — Clean Boundary Harness (Caja de Empalme)
 * ARNÉS DE FRONTERA: PRODUCCIÓN (BATCHES) <--> KARDEX & ERP (INVENTORY)
 * 
 * Regla Marcial: No acopla componentes visuales ni altera núcleos intocables.
 * Conforme a SPEC.md (Sección 0 Ley 5, Sección 1.2 Invariante 3, Sección 5 y Criterio Gherkin 2).
 */

import type {
  Batch,
  Recipe,
  RawInventoryItem,
  InventoryMovement,
  FinishedGood
} from "../../types/brewery.ts";

import { generateBomDeductions, type BomDeductionResult } from "../lib/engines/inventoryValuationEngine.ts";

export interface MashingDeductionResult {
  success: boolean;
  batchCode: string;
  movementsGenerated: InventoryMovement[];
  updatedRawInventory: RawInventoryItem[];
  shortageWarnings: string[];
}

export interface PackagingFinishedGoodsResult {
  updatedFinishedGoods: FinishedGood[];
  unitsAdded: number;
  newInventoryMovement?: InventoryMovement;
}

/**
 * [CLEAN BOUNDARY HARNESS]
 * Procesa la orden de inicio de Maceración de un lote, deduciendo automáticamente
 * los insumos del Kardex y generando las salidas trazables con transformationLinkedId.
 */
export function executeMashingInventoryDeduction(
  batch: Batch,
  recipe: Recipe,
  currentInventory: RawInventoryItem[],
  responsible: string
): MashingDeductionResult {
  const batchCode = batch.batchCode || batch.id;
  if (!batchCode) {
    throw new Error("ERR_INVALID_BATCH_CODE: El lote carece de identificador único.");
  }

  const grainsNeeded = recipe.grains.map(g => ({
    name: g.name,
    amountKg: g.amountKg
  }));

  const hopsNeeded = recipe.hops.map(h => ({
    name: h.name,
    amountGrams: h.amountGrams
  }));

  const bomResult: BomDeductionResult = generateBomDeductions(
    batchCode,
    grainsNeeded,
    hopsNeeded,
    currentInventory,
    responsible
  );

  const warnings = bomResult.shortageAlerts.map(alert => 
    `Alerta de stock insuficiente en ${alert.itemName}: requerido ${alert.required}, disponible ${alert.available}.`
  );

  return {
    success: bomResult.success,
    batchCode,
    movementsGenerated: bomResult.movements,
    updatedRawInventory: bomResult.updatedInventory,
    shortageWarnings: warnings
  };
}

/**
 * [CLEAN BOUNDARY HARNESS]
 * Procesa el cierre de un lote y envasado, acreditando las botellas o barriles
 * resultantes en el catálogo de Producto Terminado (finishedGoods) de forma atómica.
 */
export function executePackagingFinishedGoodsCredit(
  batch: Batch,
  finishedGoods: FinishedGood[],
  packagingType: FinishedGood["packaging"] = "Botella 330ml",
  responsible: string = "Operario Envasado"
): PackagingFinishedGoodsResult {
  const batchCode = batch.batchCode || batch.id;
  if (!batchCode) {
    throw new Error("ERR_INVALID_BATCH_CODE: El lote carece de identificador único.");
  }
  const liters = batch.volumeLiters || 1000;

  let unitVolumeLiters = 0.33;
  if (packagingType === "Botella 750ml") unitVolumeLiters = 0.75;
  if (packagingType === "Barril 30L") unitVolumeLiters = 30.0;
  if (packagingType === "Barril 50L") unitVolumeLiters = 50.0;

  const unitsProduced = Math.round(liters / unitVolumeLiters);
  const updatedGoods = finishedGoods.map(fg => ({ ...fg }));

  // Buscar si ya existe la referencia de producto terminado para esta receta y empaque
  let targetGood = updatedGoods.find(fg => 
    fg.name.toLowerCase().includes(batch.recipeName.toLowerCase()) && 
    fg.packaging === packagingType
  );

  if (targetGood) {
    targetGood.stockUnits += unitsProduced;
    if (batch.cogsCostPerLiter) {
      targetGood.cogsCost = Math.round(batch.cogsCostPerLiter * unitVolumeLiters);
    }
  } else {
    // Si no existe, crear la referencia en el catálogo
    const newId = `FG-${batch.recipeName.slice(0, 3).toUpperCase()}-${packagingType.slice(0, 3).toUpperCase()}`;
    targetGood = {
      id: newId,
      name: `${batch.recipeName} ${packagingType}`,
      style: batch.style,
      packaging: packagingType,
      brewDate: batch.brewDate,
      stockUnits: unitsProduced,
      litersPerUnit: unitVolumeLiters,
      cogsCost: Math.round((batch.cogsCostPerLiter || 4500) * unitVolumeLiters),
      wholesalePrice: Math.round(((batch.cogsCostPerLiter || 4500) * unitVolumeLiters) * 1.6),
      marginPct: 60,
      marginAbs: Math.round(((batch.cogsCostPerLiter || 4500) * unitVolumeLiters) * 0.6)
    };
    updatedGoods.push(targetGood);
  }

  const movement: InventoryMovement = {
    id: `MOV-PT-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    type: "ENTRADA",
    category: "Producto Terminado",
    itemId: targetGood.id,
    itemName: targetGood.name,
    quantity: unitsProduced,
    unit: packagingType.includes("Barril") ? "Barriles" : "Botellas",
    reason: `Envasado lote ${batchCode}`,
    notes: `Acreditación por finalización de cocción`,
    responsible,
    transformationLinkedId: batchCode
  };

  return {
    updatedFinishedGoods: updatedGoods,
    unitsAdded: unitsProduced,
    newInventoryMovement: movement
  };
}
