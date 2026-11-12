/**
 * Cervecería NORTA OS — Sembrador de Alta Velocidad Cloud Firestore REST
 * Cero dependencias de NPM (100% nativo con Node.js 24 fetch)
 * Sube las 37 colecciones y singletons directamente a Cloud Firestore.
 */

const fs = require("fs");
const path = require("path");

const API_KEY = "AIzaSyD78PPIRK6GS-XVFlAu7LLgUL7HKPav8aE";
const PROJECT_ID = "cerveceria-norta";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Función pura de conversión de tipos JavaScript a Firestore REST FieldValue
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

async function seedCollection(collectionName, items, idKey = "id") {
  if (!Array.isArray(items) || items.length === 0) {
    console.log(`  [SKIP] '${collectionName}' vacía.`);
    return 0;
  }

  console.log(`  [SUBIENDO] '${collectionName}' (${items.length} documentos)...`);
  
  // Concurrencia controlada en lotes de 5 para no saturar rate limit
  const batchSize = 5;
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    await Promise.all(
      chunk.map((item, idx) => {
        const docId = item[idKey] || item.serial || item.day || `item_${i + idx + 1}`;
        const cleanDocId = String(docId).replace(/\//g, "_");
        return writeDocument(`${collectionName}/${cleanDocId}`, item);
      })
    );
  }

  console.log(`  [OK] '${collectionName}' completada (${items.length} docs).`);
  return items.length;
}

async function seedSingleton(collectionName, docId, obj) {
  if (!obj || typeof obj !== "object") return 0;
  console.log(`  [SUBIENDO] Singleton '${collectionName}/${docId}'...`);
  await writeDocument(`${collectionName}/${docId}`, obj);
  console.log(`  [OK] Singleton '${collectionName}/${docId}' subido.`);
  return 1;
}

async function run() {
  console.log("=================================================================");
  console.log("  INICIANDO SIEMBRA MAESTRA CLOUD FIRESTORE REST (NORTA OS)");
  console.log("=================================================================\n");

  const backupPath = path.join(__dirname, "..", "documentos_soporte", "NORTA_FULL_BACKUP_2026-09-23.json");
  if (!fs.existsSync(backupPath)) {
    console.error("No se encontró el archivo de respaldo maestro:", backupPath);
    process.exit(1);
  }

  const rawBackup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
  const data = rawBackup.data || rawBackup;

  let totalDocs = 0;

  try {
    // 1. Singletons
    console.log("--- 1. Singletons y Metadatos Corporativos ---");
    totalDocs += await seedSingleton("config", "info", data.info);
    totalDocs += await seedSingleton("branding", "identity", data.brandIdentity);
    totalDocs += await seedSingleton("legal", "framework", data.legal);

    // 2. Entidades Principales de Producción
    console.log("\n--- 2. Dominio de Producción & Brewhouse ---");
    totalDocs += await seedCollection("recipes", data.recipes);
    totalDocs += await seedCollection("batches", data.batches);
    totalDocs += await seedCollection("tanks", data.tanks);

    // 3. Dominio ERP & Kardex COP
    console.log("\n--- 3. Dominio ERP, Inventarios & Kardex COP ---");
    totalDocs += await seedCollection("rawInventory", data.rawInventory);
    totalDocs += await seedCollection("finishedGoods", data.finishedGoods);
    totalDocs += await seedCollection("machineryAndEquipment", data.machineryAndEquipment);
    totalDocs += await seedCollection("inventoryMovements", data.inventoryMovements);

    // 4. Dominio Comercial & CRM
    console.log("\n--- 4. Dominio Comercial, CRM & Barriles ---");
    totalDocs += await seedCollection("clients", data.clients);
    totalDocs += await seedCollection("salesOrders", data.salesOrders);
    totalDocs += await seedCollection("kegs", data.kegs);

    // 5. Procesos, CIP y Calidad
    console.log("\n--- 5. Dominio de Calidad, CIP & Laboratorio ---");
    totalDocs += await seedCollection("cipLogs", data.cipLogs);
    totalDocs += await seedCollection("qualityTests", data.qualityTests);

    // 6. Talento Humano
    console.log("\n--- 6. Talento Humano & Turnos ---");
    totalDocs += await seedCollection("employees", data.employees);
    totalDocs += await seedCollection("shifts", data.shifts, "day");
    totalDocs += await seedCollection("certifications", data.certifications, "employee");

    // 7. Sistema INVIMA (Los 11 Programas de Inocuidad)
    console.log("\n--- 7. Sistema de Inocuidad INVIMA (11 Programas BPM) ---");
    totalDocs += await seedCollection("invimaPrograms", data.invimaControlSystem);
    totalDocs += await seedCollection("documentRepository", data.documentRepository);
    totalDocs += await seedCollection("invimaWaterLogs", data.waterControlLogs);
    totalDocs += await seedCollection("invimaStorageLogs", data.storageIngressLogs);
    totalDocs += await seedCollection("phMeterLogs", data.phMeterLogs);
    totalDocs += await seedCollection("calibrationSchedule", data.calibrationSchedule);
    totalDocs += await seedCollection("trainingSchedule", data.trainingSchedule);
    totalDocs += await seedCollection("trainingAttendance", data.trainingAttendance);
    totalDocs += await seedCollection("invimaPestLogs", data.pestControlLogs);
    totalDocs += await seedCollection("invimaCleaningLogs", data.cleaningSanitationLogs);
    totalDocs += await seedCollection("invimaWasteLogs", data.wasteManagementLogs);
    totalDocs += await seedCollection("invimaMaintenanceLogs", data.maintenanceLogs);
    totalDocs += await seedCollection("invimaSamplingLogs", data.samplingLogs);
    totalDocs += await seedCollection("invimaColdRoomLogs", data.coldRoomLogs);
    totalDocs += await seedCollection("suppliersList", data.suppliersList);
    totalDocs += await seedCollection("retainedSamplesLogs", data.retainedSamplesLogs);

    // Eliminar documento de prueba temporal _ping
    try {
      await fetch(`${BASE_URL}/_ping/test_doc?key=${API_KEY}`, { method: "DELETE" });
    } catch (_) {}

    console.log("\n=================================================================");
    console.log(`  ¡SIEMBRA FINALIZADA CON ÉXITO TOTAL EN CLOUD FIRESTORE!`);
    console.log(`  Total de documentos sembrados: ${totalDocs}`);
    console.log(`  Proyecto: ${PROJECT_ID} | Modo: REST Nativo sin NPM`);
    console.log("=================================================================\n");
  } catch (error) {
    console.error("\n[ERROR CRÍTICO EN SIEMBRA]:", error.message);
    process.exit(1);
  }
}

run();
