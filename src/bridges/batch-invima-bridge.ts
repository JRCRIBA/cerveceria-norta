/**
 * Cervecería NORTA OS — Clean Boundary Harness (Caja de Empalme)
 * ARNÉS DE FRONTERA: PRODUCCIÓN (BATCHES) <--> INOCUIDAD (INVIMA)
 * 
 * Regla Marcial: No acopla componentes de React ni altera núcleos intocables.
 * Conforme a SPEC.md (Sección 0 Ley 5, Sección 1.2 Invariante 1, Sección 5 y Criterios Gherkin).
 */

import type { Batch, BatchStage, WaterControlLog, Tank } from "../../types/brewery.ts";
import { validateBrewingWaterClearance, type BrewingClearanceResult } from "../lib/engines/sanitaryPokaYokeEngine.ts";

export interface BatchAdvanceContext {
  latestWaterLog?: WaterControlLog | null;
  tank?: Tank | null;
  currentDate?: Date;
  operatorRole?: string;
}

export interface BatchAdvanceEvaluation {
  canAdvance: boolean;
  targetStage: BatchStage;
  currentStage: BatchStage;
  batchCode: string;
  blockReason?: {
    code: string;
    title: string;
    detail: string;
    rfc7807Type: string;
  };
  sanitaryClearance?: BrewingClearanceResult;
  updatedTankStatus?: string;
}

/**
 * [CLEAN BOUNDARY HARNESS]
 * Evalúa si un lote de producción puede avanzar a la siguiente etapa o etapa destino,
 * aplicando de forma rigurosa los Poka-Yokes sanitarios y de capacidad de tanque.
 */
export function evaluateBatchStageAdvance(
  batch: Batch,
  targetStage: BatchStage,
  context: BatchAdvanceContext
): BatchAdvanceEvaluation {
  const batchCode = batch.batchCode || batch.id;
  if (!batchCode) {
    throw new Error("ERR_INVALID_BATCH_CODE: El lote evaluado carece de identificador único.");
  }
  const currentStage = batch.stage;

  // 1. REGLA POKA-YOKE SANITARIO: Entrada a 'Maceración' o 'Hervor'
  // El agua es el 90-95% de la cerveza. Ninguna cocción puede iniciar sin agua liberada.
  if (targetStage === "Maceración" || targetStage === "Hervor") {
    const clearance = validateBrewingWaterClearance(context.latestWaterLog, context.currentDate);

    if (!clearance.allowed) {
      return {
        canAdvance: false,
        targetStage,
        currentStage,
        batchCode,
        sanitaryClearance: clearance,
        blockReason: {
          code: clearance.code,
          title: clearance.title,
          detail: clearance.detail,
          rfc7807Type: "https://cervecerianorta.com/errors/sanitary-precondition-failed"
        }
      };
    }
  }

  // 2. REGLA POKA-YOKE DE EQUIPO: Asignación y estado de Tanque
  if (targetStage === "Fermentación") {
    if (context.tank) {
      if (context.tank.status === "CIP_Pendiente" || context.tank.status.includes("Requiere CIP")) {
        return {
          canAdvance: false,
          targetStage,
          currentStage,
          batchCode,
          blockReason: {
            code: "ERR_TANK_CIP_PENDING",
            title: "Bloqueo de Equipo: Tanque Requiere Lavado CIP",
            detail: `El tanque ${context.tank.name} (${context.tank.id}) no se encuentra estéril. Se requiere ciclo CIP conforme antes de inocular mosto.`,
            rfc7807Type: "https://cervecerianorta.com/errors/tank-not-sanitized"
          }
        };
      }
      if (context.tank.status === "Mantenimiento") {
        return {
          canAdvance: false,
          targetStage,
          currentStage,
          batchCode,
          blockReason: {
            code: "ERR_TANK_IN_MAINTENANCE",
            title: "Bloqueo de Equipo: Tanque en Mantenimiento",
            detail: `El equipo ${context.tank.name} está reportado fuera de servicio por mantenimiento preventivo/correctivo.`,
            rfc7807Type: "https://cervecerianorta.com/errors/tank-in-maintenance"
          }
        };
      }
    }
  }

  // 3. Transición autorizada
  let updatedTankStatus: string | undefined;
  if (targetStage === "Finalizado" && context.tank) {
    updatedTankStatus = "CIP_Pendiente"; // Al vaciar el tanque, pasa automáticamente a requerir lavado
  }

  return {
    canAdvance: true,
    targetStage,
    currentStage,
    batchCode,
    updatedTankStatus
  };
}

/**
 * Obtiene la siguiente etapa secuencial según la FSM de producción definida en SPEC.md.
 */
export function getNextBatchStage(currentStage: BatchStage): BatchStage | null {
  const sequence: BatchStage[] = [
    "Maceración",
    "Hervor",
    "Fermentación",
    "Maduración",
    "Envasado",
    "Finalizado"
  ];
  const idx = sequence.indexOf(currentStage);
  if (idx === -1 || idx === sequence.length - 1) return null;
  return sequence[idx + 1];
}
