/**
 * Cervecería NORTA OS — Actualizador de UI para SGC INVIMA 14 Carpetas (Fase 2)
 * Aplica en index.html y src/components/NextBreweryApp.js
 */

const fs = require("fs");
const path = require("path");

// 1. Cargar la definición canónica de los 14 programas generados en Fase 1
const initialDataPath = path.join(process.cwd(), "src/data/initialData.js");
const { INITIAL_BREWERY_DATA } = require(initialDataPath);
const programsJson = JSON.stringify(INITIAL_BREWERY_DATA.invimaControlSystem, null, 2);

console.log("Cargados", INITIAL_BREWERY_DATA.invimaControlSystem.length, "programas canónicos.");

// 2. Actualizar index.html
const indexPath = path.join(process.cwd(), "index.html");
let indexContent = fs.readFileSync(indexPath, "utf8");

// A. Sincronizar initialData.invimaControlSystem dentro de index.html
const invimaStart = indexContent.indexOf("  invimaControlSystem: [");
const benchmarkingStart = indexContent.indexOf("  // 8. MATRIZ COMPARATIVA INTEGRADA");

if (invimaStart !== -1 && benchmarkingStart !== -1) {
  indexContent = indexContent.slice(0, invimaStart) + `  invimaControlSystem: ${programsJson},\n\n` + indexContent.slice(benchmarkingStart);
  console.log("[OK] initialData.invimaControlSystem actualizado en index.html.");
} else {
  console.warn("[ALERTA] No se encontró bloque invimaControlSystem en index.html");
}

// B. Actualizar metadata de agua y almacenamiento en index.html
const waterMetaJson = JSON.stringify(INITIAL_BREWERY_DATA.waterControlMetadata, null, 2);
const waterLogsJson = JSON.stringify(INITIAL_BREWERY_DATA.waterControlLogs, null, 2);
const storageMetaJson = JSON.stringify(INITIAL_BREWERY_DATA.storageIngressMetadata, null, 2);
const storageLogsJson = JSON.stringify(INITIAL_BREWERY_DATA.storageIngressLogs, null, 2);

const wMetaStart = indexContent.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-AG-002");
const sMetaStart = indexContent.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-ALM-001");
const cMetaStart = indexContent.indexOf("// 3. SEED DATOS CALIBRACIÓN");

if (wMetaStart !== -1 && sMetaStart !== -1) {
  const wBlock = `// METADATA Y REGISTROS DEL FORMATO FO-GC-001 (CONTROL DE AGUA POTABLE)\n  waterControlMetadata: ${waterMetaJson},\n\n  waterControlLogs: ${waterLogsJson},\n\n  `;
  indexContent = indexContent.slice(0, wMetaStart) + wBlock + indexContent.slice(sMetaStart);
  console.log("[OK] waterControlMetadata actualizada a FO-GC-001 en index.html.");
}

const newSMetaStart = indexContent.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-ALM-001");
const newCMetaStart = indexContent.indexOf("// 3. SEED DATOS CALIBRACIÓN");
if (newSMetaStart !== -1 && newCMetaStart !== -1) {
  const sBlock = `// METADATA Y REGISTROS DEL FORMATO FO-GC-015 (INGRESO DE MATERIALES - ALMACENAMIENTO)\n  storageIngressMetadata: ${storageMetaJson},\n\n  storageIngressLogs: ${storageLogsJson},\n\n  `;
  indexContent = indexContent.slice(0, newSMetaStart) + sBlock + indexContent.slice(newCMetaStart);
  console.log("[OK] storageIngressMetadata actualizada a FO-GC-015 en index.html.");
}

// C. Actualizar Poka-Yoke de caché de localStorage (>= 11 -> >= 14)
indexContent = indexContent.replace(
  /parsed\.invimaControlSystem\s*&&\s*parsed\.invimaControlSystem\.length\s*>=\s*11/g,
  "parsed.invimaControlSystem && parsed.invimaControlSystem.length >= 14"
);
console.log("[OK] Condición de caché actualizada a >= 14 en index.html.");

// D. Actualizar textos de navegación en index.html
indexContent = indexContent.replace(/Control INVIMA \(11 Carpetas\)/g, "Control INVIMA (14 Carpetas)");
indexContent = indexContent.replace(/badge="11 Carpetas"/g, 'badge="14 Carpetas"');
indexContent = indexContent.replace(/11 Programas •/g, "14 Programas Oficiales •");
indexContent = indexContent.replace(/11 Carpetas Oficiales/g, "14 Carpetas Oficiales");
indexContent = indexContent.replace(/Estructura oficial de los 11 programas de control de inocuidad/g, "Estructura oficial de los 14 programas del SGC (Carpetas 00 a 13, Octubre 2026)");
indexContent = indexContent.replace(/Carpetas & Programas Sanitarios \(11\)/g, "Carpetas & Programas Sanitarios (14)");

// E. Actualizar membretes de formularios en index.html
indexContent = indexContent.replace(/CÓDIGO:\s*FO-AG-002/g, "CÓDIGO: FO-GC-001");
indexContent = indexContent.replace(/ELABORACIÓN:\s*AGOSTO 2024/g, "ELABORACIÓN: OCTUBRE 2026");
indexContent = indexContent.replace(/VERSIÓN:\s*1/g, "VERSIÓN: 01");
indexContent = indexContent.replace(/Replicando Formato FO-AG-002/g, "Replicando Formato FO-GC-001 (Decreto 2115/2007)");
indexContent = indexContent.replace(/Registros Historicos FO-AG-002/g, "Registros Históricos FO-GC-001 (Control de Agua Potable)");
indexContent = indexContent.replace(/FO-AG-002_CONTROL_AGUA_POTABLE/g, "FO-GC-001_CONTROL_AGUA_POTABLE");

indexContent = indexContent.replace(/CÓDIGO:\s*FO-ALM-001/g, "CÓDIGO: FO-GC-015");
indexContent = indexContent.replace(/ELABORACIÓN:\s*DICIEMBRE 2025/g, "ELABORACIÓN: OCTUBRE 2026");
indexContent = indexContent.replace(/Replicando Formato FO-ALM-001/g, "Replicando Formato FO-GC-015 (Ingreso de Materiales)");
indexContent = indexContent.replace(/Registros Historicos FO-ALM-001/g, "Registros Históricos FO-GC-015 (Ingreso de Materiales)");
indexContent = indexContent.replace(/FO-ALM-001_INGRESO_MATERIALES/g, "FO-GC-015_INGRESO_MATERIALES");

fs.writeFileSync(indexPath, indexContent, "utf8");
console.log("[OK] index.html actualizado y sincronizado.");

// 3. Actualizar NextBreweryApp.js de la misma forma
const nextAppPath = path.join(process.cwd(), "src/components/NextBreweryApp.js");
let nextAppContent = fs.readFileSync(nextAppPath, "utf8");

nextAppContent = nextAppContent.replace(/Control INVIMA \(11 Carpetas\)/g, "Control INVIMA (14 Carpetas)");
nextAppContent = nextAppContent.replace(/badge="11 Carpetas"/g, 'badge="14 Carpetas"');
nextAppContent = nextAppContent.replace(/11 Programas •/g, "14 Programas Oficiales •");
nextAppContent = nextAppContent.replace(/11 Carpetas Oficiales/g, "14 Carpetas Oficiales");
nextAppContent = nextAppContent.replace(/Estructura oficial de los 11 programas de control de inocuidad/g, "Estructura oficial de los 14 programas del SGC (Carpetas 00 a 13, Octubre 2026)");
nextAppContent = nextAppContent.replace(/Carpetas & Programas Sanitarios \(11\)/g, "Carpetas & Programas Sanitarios (14)");

nextAppContent = nextAppContent.replace(/CÓDIGO:\s*FO-AG-002/g, "CÓDIGO: FO-GC-001");
nextAppContent = nextAppContent.replace(/ELABORACIÓN:\s*AGOSTO 2024/g, "ELABORACIÓN: OCTUBRE 2026");
nextAppContent = nextAppContent.replace(/VERSIÓN:\s*1/g, "VERSIÓN: 01");
nextAppContent = nextAppContent.replace(/Replicando Formato FO-AG-002/g, "Replicando Formato FO-GC-001 (Decreto 2115/2007)");
nextAppContent = nextAppContent.replace(/Registros Historicos FO-AG-002/g, "Registros Históricos FO-GC-001 (Control de Agua Potable)");
nextAppContent = nextAppContent.replace(/FO-AG-002_CONTROL_AGUA_POTABLE/g, "FO-GC-001_CONTROL_AGUA_POTABLE");

nextAppContent = nextAppContent.replace(/CÓDIGO:\s*FO-ALM-001/g, "CÓDIGO: FO-GC-015");
nextAppContent = nextAppContent.replace(/ELABORACIÓN:\s*DICIEMBRE 2025/g, "ELABORACIÓN: OCTUBRE 2026");
nextAppContent = nextAppContent.replace(/Replicando Formato FO-ALM-001/g, "Replicando Formato FO-GC-015 (Ingreso de Materiales)");
nextAppContent = nextAppContent.replace(/Registros Historicos FO-ALM-001/g, "Registros Históricos FO-GC-015 (Ingreso de Materiales)");
nextAppContent = nextAppContent.replace(/FO-ALM-001_INGRESO_MATERIALES/g, "FO-GC-015_INGRESO_MATERIALES");

fs.writeFileSync(nextAppPath, nextAppContent, "utf8");
console.log("[OK] src/components/NextBreweryApp.js actualizado y sincronizado.");

console.log("Fase 2 de actualización base completada exitosamente.");
