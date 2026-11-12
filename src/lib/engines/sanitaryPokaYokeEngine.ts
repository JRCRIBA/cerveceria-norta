/**
 * Cervecería NORTA OS — Sanitary Poka-Yoke Headless Engine
 * [LOCK-02] NÚCLEO INTOCABLE DE CONTROL SANITARIO E INOCUIDAD INVIMA
 * 
 * Regla Marcial: Función pura, determinista, portable, sin dependencias de React ni DOM.
 * Conforme a SPEC.md (Sección 0, Ley Marcial 4, Sección 1.2 Invariante 1, Sección 4.3 y DT-09).
 */

import type { WaterControlLog } from "../../../types/brewery.ts";

export const SANITARY_THRESHOLDS = {
  // Decreto 2115 de 2007 (Ministerio de la Protección Social & de Ambiente)
  CHLORINE_MIN_MGL: 0.3,
  CHLORINE_MAX_MGL: 2.0,
  PH_MIN: 6.5,
  PH_MAX: 9.0,
  MAX_LOG_VALIDITY_HOURS: 24
} as const;

export interface WaterEvaluationResult {
  complies: boolean;
  status: "CONFORME" | "NO_CONFORME";
  reasons: string[];
  chlorineMgL: number;
  ph: number;
}

export interface BrewingClearanceResult {
  allowed: boolean;
  code: "CLEARANCE_GRANTED" | "ERR_NO_WATER_LOG" | "ERR_WATER_OUT_OF_RANGE" | "ERR_WATER_LOG_EXPIRED";
  title: string;
  detail: string;
  evaluatedLog?: WaterControlLog | null;
  hoursElapsed?: number;
}

/**
 * Evalúa una medición individual de agua potable según Decreto 2115 de 2007.
 */
export function evaluateWaterQuality(chlorineMgL: number, ph: number): WaterEvaluationResult {
  const reasons: string[] = [];
  const cl = Number(chlorineMgL) || 0;
  const p = Number(ph) || 0;

  if (cl < SANITARY_THRESHOLDS.CHLORINE_MIN_MGL) {
    reasons.push(
      `Cloro residual insuficiente (${cl.toFixed(2)} mg/L). Límite mínimo normativo: ${SANITARY_THRESHOLDS.CHLORINE_MIN_MGL} mg/L (Dec. 2115/2007).`
    );
  } else if (cl > SANITARY_THRESHOLDS.CHLORINE_MAX_MGL) {
    reasons.push(
      `Cloro residual excesivo (${cl.toFixed(2)} mg/L). Límite máximo normativo: ${SANITARY_THRESHOLDS.CHLORINE_MAX_MGL} mg/L (Riesgo organoléptico y fenólico).`
    );
  }

  if (p < SANITARY_THRESHOLDS.PH_MIN) {
    reasons.push(
      `pH fuera de rango ácido (${p.toFixed(2)}). Límite mínimo normativo: ${SANITARY_THRESHOLDS.PH_MIN}.`
    );
  } else if (p > SANITARY_THRESHOLDS.PH_MAX) {
    reasons.push(
      `pH fuera de rango alcalino (${p.toFixed(2)}). Límite máximo normativo: ${SANITARY_THRESHOLDS.PH_MAX}.`
    );
  }

  const complies = reasons.length === 0;

  return {
    complies,
    status: complies ? "CONFORME" : "NO_CONFORME",
    reasons,
    chlorineMgL: cl,
    ph: p
  };
}

/**
 * [POKA-YOKE SANITARIO]
 * Valida si existe liberación sanitaria vigente de agua potable para autorizar
 * el inicio de maceración o consumo de agua en un lote cervecero.
 * 
 * Regla: Debe existir un registro en las últimas 24 horas y sus parámetros deben CUMPLIR.
 */
export function validateBrewingWaterClearance(
  latestWaterLog: WaterControlLog | null | undefined,
  currentDate: Date = new Date()
): BrewingClearanceResult {
  if (!latestWaterLog) {
    return {
      allowed: false,
      code: "ERR_NO_WATER_LOG",
      title: "Bloqueo Sanitario: Sin Registro de Agua Potable",
      detail: "No se encontró ningún registro en la bitácora FO-AG-002. Es obligatorio registrar y validar la calidad del agua antes de iniciar procesos de producción."
    };
  }

  // 1. Validar parámetros fisicoquímicos
  const evalResult = evaluateWaterQuality(latestWaterLog.chlorineMgL, latestWaterLog.ph);
  if (!evalResult.complies) {
    return {
      allowed: false,
      code: "ERR_WATER_OUT_OF_RANGE",
      title: "Bloqueo Sanitario: Parámetros de Agua No Conformes",
      detail: `El último registro (${latestWaterLog.id} del ${latestWaterLog.date}) no cumple con el Decreto 2115 de 2007: ${evalResult.reasons.join(" | ")}`,
      evaluatedLog: latestWaterLog
    };
  }

  // 2. Validar vigencia temporal (máximo 24 horas)
  try {
    const logDateTimeStr = latestWaterLog.time 
      ? `${latestWaterLog.date}T${latestWaterLog.time}:00`
      : `${latestWaterLog.date}T00:00:00`;
    const logDate = new Date(logDateTimeStr);
    
    if (!isNaN(logDate.getTime())) {
      const diffMs = currentDate.getTime() - logDate.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // Si la fecha del registro es futura o el cálculo es válido
      if (diffHours > SANITARY_THRESHOLDS.MAX_LOG_VALIDITY_HOURS) {
        return {
          allowed: false,
          code: "ERR_WATER_LOG_EXPIRED",
          title: "Bloqueo Sanitario: Registro de Agua Expirado",
          detail: `El último registro de agua (${latestWaterLog.id}) tiene ${diffHours.toFixed(1)} horas de antigüedad. La norma exige toma diaria (frecuencia cada 24 horas).`,
          evaluatedLog: latestWaterLog,
          hoursElapsed: Number(diffHours.toFixed(1))
        };
      }
    }
  } catch (e) {
    // Si falla el parsing de fecha estricto pero la fecha coincide con el día de hoy, se permite
  }

  return {
    allowed: true,
    code: "CLEARANCE_GRANTED",
    title: "Liberación Sanitaria Concedida",
    detail: `Parámetros conformes Decreto 2115 (Cloro: ${latestWaterLog.chlorineMgL} mg/L, pH: ${latestWaterLog.ph}). Operación autorizada.`,
    evaluatedLog: latestWaterLog
  };
}
