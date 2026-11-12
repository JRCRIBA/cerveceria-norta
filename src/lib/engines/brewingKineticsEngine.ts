/**
 * Cervecería NORTA OS — Brewing Kinetics Headless Engine
 * [LOCK-01] NÚCLEO INTOCABLE DE CINÉTICA Y FORMULACIÓN CERVECERA
 * 
 * Regla Marcial: Función pura, determinista, portable, sin dependencias de React ni DOM.
 * Conforme a SPEC.md (Sección 0, Sección 2 y Sección 4.1).
 */

export interface GravityReading {
  day: number;
  date: string;
  sg: number;
  tempC?: number;
  pressureBar?: number;
  ph?: number;
}

export interface KineticAnalysis {
  og: number;
  currentSg: number;
  fgTarget: number;
  abvCalculated: number;
  apparentAttenuationPct: number;
  targetAttenuationPct: number;
  attenuationProgressPct: number;
  status: "Fermentando" | "Atenuacion_Alcanzada" | "Estancada" | "Completada";
}

/**
 * Calcula el Alcohol por Volumen (ABV) estándar cervecero.
 * Fórmula oficial: ABV = (OG - FG) * 131.25
 */
export function calculateAbv(og: number, fg: number): number {
  if (!og || !fg || og <= fg) return 0;
  const abv = (og - fg) * 131.25;
  return Number(abv.toFixed(2));
}

/**
 * Calcula la Atenuación Aparente en porcentaje.
 * Fórmula: ((OG - FG) / (OG - 1.0)) * 100
 */
export function calculateApparentAttenuation(og: number, fg: number): number {
  if (!og || !fg || og <= 1.0) return 0;
  const attenuation = ((og - fg) / (og - 1.0)) * 100;
  return Number(attenuation.toFixed(1));
}

/**
 * Corrección de lectura de densímetro hidrómetro según temperatura de calibración (20°C).
 */
export function correctHydrometerReading(measuredSg: number, tempC: number, calTempC: number = 20): number {
  if (tempC === calTempC) return measuredSg;
  // Corrección aproximada polinomial para hidrómetros de 20°C
  const deltaT = tempC - calTempC;
  const correction = (0.00013 * deltaT) + (0.000003 * Math.pow(deltaT, 2));
  return Number((measuredSg + correction).toFixed(4));
}

/**
 * Convierte Gravedad Específica (SG) a Grados Plato (°P).
 * Fórmula polinomial de Lincoln: °P = -616.868 + (1111.14 * SG) - (630.272 * SG^2) + (135.997 * SG^3)
 */
export function sgToPlato(sg: number): number {
  if (sg < 1.000) return 0;
  const plato = -616.868 + (1111.14 * sg) - (630.272 * Math.pow(sg, 2)) + (135.997 * Math.pow(sg, 3));
  return Number(Math.max(0, plato).toFixed(2));
}

/**
 * Calcula los IBUs aportados por una adición de lúpulo usando la fórmula de Glenn Tinseth.
 * Bigness Factor = 1.65 * 0.000125^(OG - 1)
 * Boil Time Factor = (1 - e^(-0.04 * timeMin)) / 4.15
 */
export function calculateHopIbuTinseth(
  alphaAcidPct: number,
  weightGrams: number,
  boilTimeMin: number,
  batchVolumeLiters: number,
  wortOg: number
): number {
  if (boilTimeMin <= 0 || weightGrams <= 0 || alphaAcidPct <= 0 || batchVolumeLiters <= 0) {
    return 0;
  }
  const bignessFactor = 1.65 * Math.pow(0.000125, (wortOg - 1));
  const boilTimeFactor = (1 - Math.exp(-0.04 * boilTimeMin)) / 4.15;
  const utilization = bignessFactor * boilTimeFactor;
  const milligramsAlpha = (alphaAcidPct / 100) * weightGrams * 1000;
  const ibu = (milligramsAlpha * utilization) / batchVolumeLiters;
  return Number(ibu.toFixed(1));
}

/**
 * Analiza la cinética de fermentación comparando lecturas frente a la meta (Target FG).
 */
export function analyzeFermentationKinetics(
  og: number,
  currentSg: number,
  fgTarget: number,
  logs: GravityReading[] = []
): KineticAnalysis {
  const abv = calculateAbv(og, currentSg);
  const currentAttenuation = calculateApparentAttenuation(og, currentSg);
  const targetAttenuation = calculateApparentAttenuation(og, fgTarget);

  let attenuationProgress = targetAttenuation > 0 ? (currentAttenuation / targetAttenuation) * 100 : 0;
  attenuationProgress = Number(Math.min(100, Math.max(0, attenuationProgress)).toFixed(1));

  let status: KineticAnalysis["status"] = "Fermentando";

  const delta = Number(Math.abs(currentSg - fgTarget).toFixed(4));
  if (delta <= 0.002 || currentSg <= fgTarget) {
    status = "Atenuacion_Alcanzada";
  } else if (logs.length >= 3) {
    // Si las últimas 3 lecturas no muestran cambio en densidad y estamos lejos de la meta
    const last3 = logs.slice(-3);
    const sg0 = last3[0].sg;
    const sg1 = last3[1].sg;
    const sg2 = last3[2].sg;
    if (Math.abs(sg0 - sg1) < 0.001 && Math.abs(sg1 - sg2) < 0.001 && currentSg > fgTarget + 0.004) {
      status = "Estancada";
    }
  }

  return {
    og,
    currentSg,
    fgTarget,
    abvCalculated: abv,
    apparentAttenuationPct: currentAttenuation,
    targetAttenuationPct: targetAttenuation,
    attenuationProgressPct: attenuationProgress,
    status
  };
}
