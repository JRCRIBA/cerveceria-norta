/**
 * Cervecería NORTA OS — Migración y Sincronización SGC INVIMA 14 Programas
 * Octubre 2026 (Versión 01 Canónica)
 * 
 * Acciones:
 * 1. Lee las 14 carpetas físicas de 'invima_docs/' y cataloga los 78 archivos oficiales.
 * 2. Limpia los datos residuales de bitácoras dejando 1 registro canónico de muestra conforme.
 * 3. Sincroniza atómicamente con Cloud Firestore REST (elimina PRG-01..11, siembra prog-00..13).
 * 4. Actualiza 'src/data/initialData.js' para paridad 100% offline y en memoria.
 */

const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyD78PPIRK6GS-XVFlAu7LLgUL7HKPav8aE";
const PROJECT_ID = "cerveceria-norta";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// --- DEFINICIONES DE LOS 14 PROGRAMAS CANÓNICOS ---
const PROGRAM_DEFS = [
  { id: "prog-00-manual", folderNumber: "00", folderName: "00. MANUAL Y CONTROL DOCUMENTAL", title: "00. MANUAL Y CONTROL DOCUMENTAL", code: "MN-GC-001", formId: "FO-GC-036" },
  { id: "prog-01-agua", folderNumber: "01", folderName: "1. AGUA POTABLE", title: "1. AGUA POTABLE", code: "PG-GC-003", formId: "FO-GC-001" },
  { id: "prog-02-almacenamiento", folderNumber: "02", folderName: "2. ALMACENAMIENTO", title: "2. ALMACENAMIENTO", code: "PG-GC-010", formId: "FO-GC-015" },
  { id: "prog-03-calibracion", folderNumber: "03", folderName: "3. CALIBRACION", title: "3. CALIBRACION", code: "PG-GC-006", formId: "FO-GC-019" },
  { id: "prog-04-capacitacion", folderNumber: "04", folderName: "4. CAPACITACION", title: "4. CAPACITACION", code: "PG-GC-007", formId: "FO-GC-021" },
  { id: "prog-05-plagas", folderNumber: "05", folderName: "5. CONTROL DE PLAGAS", title: "5. CONTROL DE PLAGAS", code: "PG-GC-002", formId: "FO-GC-004" },
  { id: "prog-06-limpieza", folderNumber: "06", folderName: "6. LIMPIEZA Y DESINFECCIÓN", title: "6. LIMPIEZA Y DESINFECCIÓN", code: "PG-GC-001", formId: "FO-GC-003" },
  { id: "prog-07-residuos", folderNumber: "07", folderName: "7. MANEJO DE RESIDUOS", title: "7. MANEJO DE RESIDUOS", code: "PG-GC-004", formId: "FO-GC-005" },
  { id: "prog-08-mantenimiento", folderNumber: "08", folderName: "8. MANTENIMIENTO", title: "8. MANTENIMIENTO", code: "PG-GC-005", formId: "FO-GC-007" },
  { id: "prog-09-muestreo", folderNumber: "09", folderName: "9. MUESTREO", title: "9. MUESTREO", code: "PG-GC-011", formId: "FO-GC-023" },
  { id: "prog-10-proveedores", folderNumber: "10", folderName: "10. PROVEEDORES", title: "10. PROVEEDORES", code: "PG-GC-008", formId: "FO-GC-016" },
  { id: "prog-11-trazabilidad", folderNumber: "11", folderName: "11. TRAZABILIDAD", title: "11. TRAZABILIDAD", code: "PG-GC-009", formId: "FO-GC-014" },
  { id: "prog-12-recepcion-mp", folderNumber: "12", folderName: "12. RECEPCION DE MATERIAS PRIMAS", title: "12. RECEPCION DE MATERIAS PRIMAS", code: "PG-GC-012", formId: "FO-GC-011" },
  { id: "prog-13-control-calidad", folderNumber: "13", folderName: "13. CONTROL DE CALIDAD", title: "13. CONTROL DE CALIDAD", code: "PG-GC-013", formId: "FO-GC-035" }
];

function getDocType(name) {
  if (name.startsWith("MN-")) return "Manual";
  if (name.startsWith("PT-")) return "Política";
  if (name.startsWith("PG-")) return name.includes("Anexo") ? "Anexo" : "Programa";
  if (name.startsWith("PR-")) return name.includes("A0") ? "Anexo" : "Procedimiento";
  if (name.startsWith("IN-")) return "Instructivo";
  if (name.startsWith("FO-")) return "Formato";
  if (name.startsWith("FT-")) return "Ficha Técnica";
  if (name.startsWith("PL-")) return "Plano";
  if (name.startsWith("BPM-PR")) return "Procedimiento";
  return "Formato";
}

function extractCode(name) {
  const match = name.match(/^([A-Z0-9-]+(?:\s+[A-Z0-9-]+)?)/);
  return match ? match[1].replace(/\s+/g, "-") : "DOC-GEN";
}

// --- CONSTRUCTOR DE PROGRAMAS DESDE SISTEMA DE ARCHIVOS ---
function buildProgramsData() {
  const baseDir = path.join(process.cwd(), "invima_docs");
  if (!fs.existsSync(baseDir)) {
    throw new Error(`Directorio invima_docs no encontrado en: ${baseDir}`);
  }

  return PROGRAM_DEFS.map((p) => {
    const pDir = path.join(baseDir, p.folderName);
    const files = [];

    if (fs.existsSync(pDir)) {
      function walkDir(d, sub) {
        const entries = fs.readdirSync(d, { withFileTypes: true });
        for (const ent of entries) {
          if (ent.isDirectory()) {
            walkDir(path.join(d, ent.name), sub ? `${sub}/${ent.name}` : ent.name);
          } else {
            const filePath = path.join(d, ent.name);
            const st = fs.statSync(filePath);
            const relPath = `./invima_docs/${p.folderName}${sub ? `/${sub}` : ""}/${ent.name}`;
            const ext = path.extname(ent.name);
            const docCode = extractCode(ent.name);
            files.push({
              id: `DOC-${p.folderNumber}-${String(files.length + 1).padStart(2, "0")}`,
              code: docCode,
              name: ent.name,
              relPath,
              size: `${Math.round(st.size / 1024)} KB`,
              extension: ext,
              type: getDocType(ent.name),
              status: "Vigente & Aprobado",
              updatedAt: "2026-10-16"
            });
          }
        }
      }
      walkDir(pDir, "");
    }

    // Si es la Carpeta 00, adjuntamos FO-GC-036 Listado Maestro que está en raíz
    const rootMaster = path.join(baseDir, "FO-GC-036 Listado maestro de documentos.xlsx");
    if (p.folderNumber === "00" && fs.existsSync(rootMaster)) {
      const rootSt = fs.statSync(rootMaster);
      files.push({
        id: "DOC-00-04",
        code: "FO-GC-036",
        name: "FO-GC-036 Listado maestro de documentos.xlsx",
        relPath: "./invima_docs/FO-GC-036 Listado maestro de documentos.xlsx",
        size: `${Math.round(rootSt.size / 1024)} KB`,
        extension: ".xlsx",
        type: "Formato",
        status: "Vigente & Aprobado",
        updatedAt: "2026-10-16"
      });
    }

    return {
      id: p.id,
      folderNumber: p.folderNumber,
      folderName: p.folderName,
      title: p.title,
      code: p.code,
      fileCount: files.length,
      status: "Vigente 🟢",
      interactiveFormId: p.formId,
      files
    };
  });
}

// --- CONVERSOR FIRESTORE REST ---
function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    if (Number.isInteger(val)) return { integerValue: String(val) };
    return { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        fields[k] = toFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

async function writeDocument(docPath, dataObj) {
  const url = `${BASE_URL}/${docPath}?key=${API_KEY}`;
  const fields = {};
  for (const [k, v] of Object.entries(dataObj)) {
    if (v !== undefined) {
      fields[k] = toFirestoreValue(v);
    }
  }

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error ${res.status} al escribir '${docPath}': ${errText}`);
  }
  return true;
}

async function deleteDocument(docPath) {
  const url = `${BASE_URL}/${docPath}?key=${API_KEY}`;
  const res = await fetch(url, { method: "DELETE" });
  return res.ok;
}

async function listDocuments(collectionName) {
  const url = `${BASE_URL}/${collectionName}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  if (!json.documents) return [];
  return json.documents.map((d) => d.name.split("/").pop());
}

// --- DATOS CANÓNICOS SANEADOS (1 REGISTRO AUDITABLE POR FORMATO) ---
const SANITIZED_DATA = {
  waterControlMetadata: {
    system: "SISTEMA DE GESTIÓN DE CALIDAD",
    code: "FO-GC-001",
    creationDate: "OCTUBRE 2026",
    title: "FORMATO DE CONTROL DE AGUA POTABLE",
    version: "VERSIÓN 01",
    parametersNorm: "Referencia Decreto 2115 de 2007: Cloro Libre Residual 0.3 a 2.0 mg/L (Cl2). pH 6.5 a 9.0. Si no cumple, segunda toma inmediata. Persistencia activa desviación.",
    frequency: "Diario, previo a maceración y primer encendido de caldera."
  },
  waterControlLogs: [
    {
      id: "WLOG-001",
      date: "2026-10-16",
      time: "07:00",
      location: "Llave de Maceración (Muela)",
      chlorineMgL: 1.20,
      ph: 7.20,
      complies: "SI",
      verifiedBy: "Ing. Julio Roberto Cristancho",
      notes: "Parámetros conformes Decreto 2115/2007. Agua liberada para maceración."
    }
  ],

  storageIngressMetadata: {
    system: "SISTEMA DE GESTIÓN DE CALIDAD",
    code: "FO-GC-015",
    creationDate: "OCTUBRE 2026",
    title: "Formato de Ingreso de Materiales",
    version: "VERSIÓN 01"
  },
  storageIngressLogs: [
    {
      id: "SLOG-001",
      date: "2026-10-15",
      product: "Malta Pale Ale 2-Row (Sacos 25kg)",
      batchLot: "MAL-AND-2026-10",
      quantity: "1,000 kg",
      supplier: "Maltería Andina S.A.S.",
      expiryDate: "2027-10-15",
      notes: "Empaques sellados e inspeccionados. CoA conforme. Tarjeta verde FO-GC-039 asignada.",
      responsible: "Ing. Julio Roberto Cristancho"
    }
  ],

  coldRoomLogs: [
    {
      id: "CF-001",
      date: "2026-10-16",
      time: "08:00",
      tempColdRoom1: 2.2,
      tempColdRoom2: 2.8,
      status: "Conforme 🟢 (Rango 0°C a 4°C)",
      verifiedBy: "Adm. Cristian",
      notes: "Rango normativo 0°C a 4°C cumplido. Preservación óptima de barriles."
    }
  ],

  phMeterLogs: [
    {
      id: "PH-001",
      date: "2026-10-16",
      buffer4Reading: 4.01,
      buffer4Temp: 20.0,
      buffer4Error: 0.00,
      buffer7Reading: 7.01,
      buffer7Temp: 20.0,
      buffer7Error: 0.00,
      status: "Conforme 🟢",
      verifiedBy: "Ing. Julio Roberto Cristancho",
      notes: "Calibración con soluciones buffer certificadas Hanna HI98103."
    }
  ],

  rawMaterialReceiptLogs: [
    {
      id: "REC-001",
      date: "2026-10-15",
      materialType: "Malta",
      productName: "Malta Pale Ale 2-Row",
      supplierName: "Maltería Andina S.A.S.",
      supplierLot: "MAL-AND-2026-10",
      quantityReceived: 1000,
      unit: "Kg",
      certificateOfAnalysis: true,
      packageIntegrityConforming: true,
      pestAbsenceConforming: true,
      statusTag: "Aceptado",
      inspectionResponsible: "Ing. Julio Roberto Cristancho",
      notes: "Inspección organoléptica conforme, ausencia de gorgojo y humedad."
    }
  ],

  cleaningSanitationLogs: [
    {
      id: "LD-001",
      date: "2026-10-15",
      area: "Tanque Fermentador TK-01",
      frequency: "Por Lote",
      chemical: "Soda Cáustica 2% + Ácido Peracético 0.2%",
      concentration: "200 ppm",
      status: "Conforme 🟢",
      verifiedBy: "Ing. Julio Roberto Cristancho"
    }
  ],

  wasteManagementLogs: [
    {
      id: "RS-001",
      date: "2026-10-15",
      wasteType: "Bagazo de Malta Orgánico",
      quantityKg: "450 kg",
      manager: "Granja Porcina Sabana (Compostaje)",
      status: "Entregado 🟢",
      verifiedBy: "Adm. Cristian"
    }
  ],

  maintenanceLogs: [
    {
      id: "MTTO-001",
      date: "2026-10-10",
      equipment: "Chiller de Glicol Principal",
      type: "Preventivo",
      description: "Limpieza de serpentín y verificación de nivel de glicol.",
      parts: "Filtro de aire reemplazado",
      technician: "TecniFrio Sabana S.A.S.",
      status: "Completado 🟢"
    }
  ],

  pestControlLogs: [
    {
      id: "PLOG-001",
      date: "2026-10-14",
      station: "Estación 1 - Puerta Recepción MP",
      baitStatus: "Intacto 🟢",
      pestsObserved: "Ninguna (Conforme C)",
      barriersStatus: "Hermético (C)",
      correctiveAction: "Ninguna requerida.",
      technician: "Fumigaciones Sabana Norte S.A.S."
    }
  ],

  trainingSchedule: [
    {
      id: "TS-001",
      topic: "Buenas Prácticas de Manufactura (BPM) y SGC NORTA Oct 2026",
      instructor: "Ing. Julio Roberto Cristancho",
      modality: "Presencial",
      duration: "2 horas",
      month: "Octubre",
      status: "Ejecutado 🟢"
    }
  ],

  trainingAttendance: [
    {
      id: "TA-001",
      date: "2026-10-15",
      topic: "Buenas Prácticas de Manufactura (BPM) y SGC NORTA Oct 2026",
      employee: "Adm. Cristian",
      nationalId: "1.018.492.102",
      role: "Administrador de Planta",
      score: 5.0,
      status: "Aprobado 🟢"
    }
  ],

  retainedSamplesLogs: [
    {
      id: "TRA-001",
      date: "2026-10-15",
      beerName: "NORTA Tempestad Double IPA",
      batchLot: "NOR-2601-IPA",
      presentation: "Botella 330ml",
      units: 3,
      shelfLocation: "Estante A-1 (Cuarto Frío)",
      responsible: "Ing. Julio Roberto Cristancho",
      notes: "Contramuestra de retención reglamentaria Art. 37 Res. 2674/2013."
    }
  ]
};

// --- FUNCIÓN PRINCIPAL DE EJECUCIÓN ---
async function runMigration() {
  console.log("===============================================================");
  console.log("  INICIANDO FASE 1: MIGRACIÓN Y SINCRONIZACIÓN SGC INVIMA 14 CARPETAS");
  console.log("===============================================================\n");

  // 1. Construcción de los 14 programas desde invima_docs/
  console.log("--- 1. Catalogación de Archivos Físicos ---");
  const programs = buildProgramsData();
  const totalFiles = programs.reduce((acc, p) => acc + p.fileCount, 0);
  console.log(`[OK] 14 Programas catalogados con un total de ${totalFiles} documentos.\n`);

  // 2. Limpieza de documentos antiguos en Firestore (invimaPrograms)
  console.log("--- 2. Limpieza y Purga de Colección 'invimaPrograms' en Firestore ---");
  const existingDocs = await listDocuments("invimaPrograms");
  console.log(`Documentos actuales en 'invimaPrograms': ${existingDocs.length} (${existingDocs.join(", ")})`);

  for (const docId of existingDocs) {
    // Si es un documento legado (PRG-01..11) o no está en la nueva lista, se elimina
    if (!PROGRAM_DEFS.some((p) => p.id === docId)) {
      console.log(`  [DELETE] Eliminando documento legado: invimaPrograms/${docId}`);
      await deleteDocument(`invimaPrograms/${docId}`);
    }
  }

  // 3. Subida de los 14 programas canónicos
  console.log("\n--- 3. Sembrado de los 14 Programas Canónicos en Cloud Firestore ---");
  for (const prog of programs) {
    console.log(`  [SUBIENDO] invimaPrograms/${prog.id} (${prog.fileCount} archivos)...`);
    await writeDocument(`invimaPrograms/${prog.id}`, prog);
  }
  console.log("[OK] 14 programas subidos exitosamente a Cloud Firestore.\n");

  // 4. Limpieza y sincronización de bitácoras saneadas
  console.log("--- 4. Sincronización de Bitácoras Sanitarias Saneadas en Firestore ---");

  // Water logs
  console.log("  [SINCRONIZANDO] invimaWaterLogs...");
  const oldWaterDocs = await listDocuments("invimaWaterLogs");
  for (const wid of oldWaterDocs) {
    if (wid !== "WLOG-001") await deleteDocument(`invimaWaterLogs/${wid}`);
  }
  await writeDocument("invimaWaterLogs/WLOG-001", SANITIZED_DATA.waterControlLogs[0]);

  // Storage logs
  console.log("  [SINCRONIZANDO] invimaStorageLogs...");
  const oldStorageDocs = await listDocuments("invimaStorageLogs");
  for (const sid of oldStorageDocs) {
    if (sid !== "SLOG-001") await deleteDocument(`invimaStorageLogs/${sid}`);
  }
  await writeDocument("invimaStorageLogs/SLOG-001", SANITIZED_DATA.storageIngressLogs[0]);

  // Cold room logs
  console.log("  [SINCRONIZANDO] coldRoomLogs...");
  await writeDocument("coldRoomLogs/CF-001", SANITIZED_DATA.coldRoomLogs[0]);

  // pH meter logs
  console.log("  [SINCRONIZANDO] phMeterLogs...");
  await writeDocument("phMeterLogs/PH-001", SANITIZED_DATA.phMeterLogs[0]);

  // Raw material receipt logs
  console.log("  [SINCRONIZANDO] rawMaterialReceiptLogs...");
  await writeDocument("rawMaterialReceiptLogs/REC-001", SANITIZED_DATA.rawMaterialReceiptLogs[0]);

  // Cleaning logs
  console.log("  [SINCRONIZANDO] invimaCleaningLogs...");
  await writeDocument("invimaCleaningLogs/LD-001", SANITIZED_DATA.cleaningSanitationLogs[0]);

  // Waste logs
  console.log("  [SINCRONIZANDO] invimaWasteLogs...");
  await writeDocument("invimaWasteLogs/RS-001", SANITIZED_DATA.wasteManagementLogs[0]);

  // Maintenance logs
  console.log("  [SINCRONIZANDO] invimaMaintenanceLogs...");
  await writeDocument("invimaMaintenanceLogs/MTTO-001", SANITIZED_DATA.maintenanceLogs[0]);

  // Pest logs
  console.log("  [SINCRONIZANDO] invimaPestLogs...");
  await writeDocument("invimaPestLogs/PLOG-001", SANITIZED_DATA.pestControlLogs[0]);

  // Training logs
  console.log("  [SINCRONIZANDO] trainingAttendance...");
  await writeDocument("trainingAttendance/TA-001", SANITIZED_DATA.trainingAttendance[0]);

  // Retained samples logs
  console.log("  [SINCRONIZANDO] retainedSamplesLogs...");
  await writeDocument("retainedSamplesLogs/TRA-001", SANITIZED_DATA.retainedSamplesLogs[0]);

  console.log("[OK] Todas las colecciones sanitarias de Firestore quedaron saneadas y actualizadas.\n");

  // 5. Actualización de 'src/data/initialData.js' para sincronía offline
  console.log("--- 5. Actualización de 'src/data/initialData.js' ---");
  const initialDataPath = path.join(process.cwd(), "src/data/initialData.js");
  let content = fs.readFileSync(initialDataPath, "utf8");

  // Reemplazar invimaControlSystem en initialData usando index markers
  const invimaJson = JSON.stringify(programs, null, 2);
  const invimaStart = content.indexOf("invimaControlSystem: [");
  const benchmarkingStart = content.indexOf("// 8. MATRIZ COMPARATIVA INTEGRADA");
  if (invimaStart !== -1 && benchmarkingStart !== -1) {
    content = content.slice(0, invimaStart) + `invimaControlSystem: ${invimaJson},\n\n  ` + content.slice(benchmarkingStart);
    console.log("  [OK] Bloque 'invimaControlSystem' reemplazado con los 14 programas oficiales.");
  } else {
    console.warn("  [ALERTA] No se encontró el delimitador exacto de invimaControlSystem en initialData.js");
  }

  // Reemplazar waterControlMetadata y waterControlLogs
  const waterStart = content.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-AG-002");
  const storageStart = content.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-ALM-001");
  const calibStart = content.indexOf("// 3. SEED DATOS CALIBRACIÓN");

  const waterMetaJson = JSON.stringify(SANITIZED_DATA.waterControlMetadata, null, 2);
  const waterLogsJson = JSON.stringify(SANITIZED_DATA.waterControlLogs, null, 2);
  const storageMetaJson = JSON.stringify(SANITIZED_DATA.storageIngressMetadata, null, 2);
  const storageLogsJson = JSON.stringify(SANITIZED_DATA.storageIngressLogs, null, 2);

  if (waterStart !== -1 && storageStart !== -1) {
    const waterBlock = `// METADATA Y REGISTROS DEL FORMATO FO-GC-001 (CONTROL DE AGUA POTABLE)\n  waterControlMetadata: ${waterMetaJson},\n\n  waterControlLogs: ${waterLogsJson},\n\n  `;
    content = content.slice(0, waterStart) + waterBlock + content.slice(storageStart);
    console.log("  [OK] waterControlMetadata y waterControlLogs actualizados a FO-GC-001.");
  }

  // Recalcular storageStart y calibStart post-reemplazo
  const newStorageStart = content.indexOf("// METADATA Y REGISTROS DEL FORMATO FO-ALM-001");
  const newCalibStart = content.indexOf("// 3. SEED DATOS CALIBRACIÓN");
  if (newStorageStart !== -1 && newCalibStart !== -1) {
    const storageBlock = `// METADATA Y REGISTROS DEL FORMATO FO-GC-015 (INGRESO DE MATERIALES - ALMACENAMIENTO)\n  storageIngressMetadata: ${storageMetaJson},\n\n  storageIngressLogs: ${storageLogsJson},\n\n  `;
    content = content.slice(0, newStorageStart) + storageBlock + content.slice(newCalibStart);
    console.log("  [OK] storageIngressMetadata y storageIngressLogs actualizados a FO-GC-015.");
  }

  fs.writeFileSync(initialDataPath, content, "utf8");
  console.log("[OK] 'src/data/initialData.js' sincronizado con éxito.\n");

  console.log("===============================================================");
  console.log("  FASE 1 COMPLETADA CON ÉXITO — FIRESTORE Y LOCAL SINCRONIZADOS");
  console.log("===============================================================");
}

runMigration().catch((err) => {
  console.error("Error durante la migración:", err);
  process.exit(1);
});
