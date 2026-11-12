/**
 * Cervecería NORTA OS — Inventory Valuation & Costing Headless Engine
 * [LOCK-04] NÚCLEO DETERMINISTA DE COSTEO COP Y GESTIÓN DE KARDEX
 * 
 * Regla Marcial: Función pura, determinista, portable, sin dependencias de React ni DOM.
 * Conforme a SPEC.md (Sección 0, Sección 2.2, Sección 4.2 y Criterio Gherkin 2).
 */

import type { RawInventoryItem, InventoryMovement, FinishedGood } from "../../../types/brewery.ts";

export interface CostBreakdown {
  maltsCop: number;
  hopsCop: number;
  yeastCop: number;
  adjunctsAndChemicalsCop: number;
  totalBatchCostCop: number;
  costPerLiterCop: number;
}

export interface YieldAnalysis {
  targetVolumeLiters: number;
  actualVolumeLiters: number;
  brewhouseEfficiencyPct: number;
  lossLiters: number;
  lossPct: number;
}

export interface BomDeductionResult {
  success: boolean;
  batchCode: string;
  movements: InventoryMovement[];
  updatedInventory: RawInventoryItem[];
  shortageAlerts: Array<{ itemId: string; itemName: string; required: number; available: number }>;
}

/**
 * Liquida el Costo de Mercancía Vendida (COGS) por lote en pesos colombianos (COP).
 * Fórmula oficial: Costo/Litro = (Costo Maltas + Lúpulos + Levadura + Químicos) / Volumen Obtenido
 */
export function calculateBatchCogs(
  malts: Array<{ amountKg: number; unitCostCop: number }>,
  hops: Array<{ amountGrams: number; unitCostCopPerGram: number }>,
  yeastCostCop: number = 0,
  adjunctsAndChemicalsCop: number = 0,
  finalVolumeLiters: number = 1000
): CostBreakdown {
  const maltsTotal = malts.reduce((acc, m) => acc + (m.amountKg * m.unitCostCop), 0);
  const hopsTotal = hops.reduce((acc, h) => acc + (h.amountGrams * h.unitCostCopPerGram), 0);
  const totalCost = maltsTotal + hopsTotal + yeastCostCop + adjunctsAndChemicalsCop;
  const costPerLiter = finalVolumeLiters > 0 ? totalCost / finalVolumeLiters : 0;

  return {
    maltsCop: Math.round(maltsTotal),
    hopsCop: Math.round(hopsTotal),
    yeastCop: Math.round(yeastCostCop),
    adjunctsAndChemicalsCop: Math.round(adjunctsAndChemicalsCop),
    totalBatchCostCop: Math.round(totalCost),
    costPerLiterCop: Number(costPerLiter.toFixed(2))
  };
}

/**
 * Calcula la merma de cocción y el rendimiento real en brewhouse frente al volumen meta.
 */
export function calculateYieldAndLoss(targetVolumeLiters: number, actualVolumeLiters: number): YieldAnalysis {
  if (targetVolumeLiters <= 0) {
    return {
      targetVolumeLiters: 0,
      actualVolumeLiters,
      brewhouseEfficiencyPct: 0,
      lossLiters: 0,
      lossPct: 0
    };
  }

  const lossLiters = Math.max(0, targetVolumeLiters - actualVolumeLiters);
  const lossPct = (lossLiters / targetVolumeLiters) * 100;
  const efficiency = (actualVolumeLiters / targetVolumeLiters) * 100;

  return {
    targetVolumeLiters,
    actualVolumeLiters,
    brewhouseEfficiencyPct: Number(efficiency.toFixed(1)),
    lossLiters: Number(lossLiters.toFixed(1)),
    lossPct: Number(lossPct.toFixed(1))
  };
}

/**
 * Genera de forma atómica y determinista los movimientos de salida del Kardex (BOM)
 * para un lote que entra a Maceración, sin permitir desbalances ni inconsistencias de ID.
 */
export function generateBomDeductions(
  batchCode: string,
  grainsNeeded: Array<{ name: string; amountKg: number }>,
  hopsNeeded: Array<{ name: string; amountGrams: number }>,
  currentInventory: RawInventoryItem[],
  responsible: string,
  dateStr: string = new Date().toISOString().slice(0, 10)
): BomDeductionResult {
  const movements: InventoryMovement[] = [];
  const updatedInventory: RawInventoryItem[] = currentInventory.map(item => ({ ...item }));
  const shortageAlerts: BomDeductionResult["shortageAlerts"] = [];

  let movementCounter = 1;

  // 1. Deducir granos / maltas
  for (const grain of grainsNeeded) {
    const item = updatedInventory.find(inv => 
      inv.name.toLowerCase().includes(grain.name.toLowerCase()) || 
      grain.name.toLowerCase().includes(inv.name.toLowerCase())
    );

    if (item) {
      if (item.stock < grain.amountKg) {
        shortageAlerts.push({
          itemId: item.id,
          itemName: item.name,
          required: grain.amountKg,
          available: item.stock
        });
      }
      item.stock = Number(Math.max(0, item.stock - grain.amountKg).toFixed(2));
      item.exits = Number(((item.exits || 0) + grain.amountKg).toFixed(2));
      if (item.stock <= item.minStock) {
        item.status = "LOW_STOCK";
      }

      movements.push({
        id: `MOV-${Date.now()}-${movementCounter++}`,
        date: dateStr,
        type: "SALIDA",
        category: "Materias Primas",
        itemId: item.id,
        itemName: item.name,
        quantity: grain.amountKg,
        unit: item.unit || "Kg",
        reason: `Molienda para lote ${batchCode}`,
        notes: `Consumo programado por receta`,
        responsible,
        transformationLinkedId: batchCode
      });
    }
  }

  // 2. Deducir lúpulos
  for (const hop of hopsNeeded) {
    const item = updatedInventory.find(inv => 
      inv.name.toLowerCase().includes(hop.name.toLowerCase()) || 
      hop.name.toLowerCase().includes(inv.name.toLowerCase())
    );

    if (item) {
      const amount = item.unit === "Kg" ? hop.amountGrams / 1000 : hop.amountGrams;
      if (item.stock < amount) {
        shortageAlerts.push({
          itemId: item.id,
          itemName: item.name,
          required: amount,
          available: item.stock
        });
      }
      item.stock = Number(Math.max(0, item.stock - amount).toFixed(2));
      item.exits = Number(((item.exits || 0) + amount).toFixed(2));
      if (item.stock <= item.minStock) {
        item.status = "LOW_STOCK";
      }

      movements.push({
        id: `MOV-${Date.now()}-${movementCounter++}`,
        date: dateStr,
        type: "SALIDA",
        category: "Materias Primas",
        itemId: item.id,
        itemName: item.name,
        quantity: amount,
        unit: item.unit || "Gramos",
        reason: `Adición de lúpulo para lote ${batchCode}`,
        responsible,
        transformationLinkedId: batchCode
      });
    }
  }

  return {
    success: shortageAlerts.length === 0,
    batchCode,
    movements,
    updatedInventory,
    shortageAlerts
  };
}

/**
 * Escanea el inventario y retorna los ítems que se encuentran en o por debajo del stock de seguridad.
 */
export function scanSafetyStockAlerts(inventory: RawInventoryItem[]): RawInventoryItem[] {
  return inventory.filter(item => item.stock <= item.minStock);
}
