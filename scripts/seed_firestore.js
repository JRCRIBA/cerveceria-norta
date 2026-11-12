// =============================================================================
// SCRIPT DE SIEMBRA DIRECTA: DATA.JS -> CLOUD FIRESTORE
// Preserva el 100% de la información actual de Cervecería NORTA en la nube
// =============================================================================

const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, writeBatch } = require("firebase/firestore");
const fs = require("fs");
const path = require("path");

const firebaseConfig = {
  apiKey: "AIzaSyD78PPIRK6GS-XVFlAu7LLgUL7HKPav8aE",
  authDomain: "cerveceria-norta.firebaseapp.com",
  projectId: "cerveceria-norta",
  storageBucket: "cerveceria-norta.firebasestorage.app",
  messagingSenderId: "490600339993",
  appId: "1:490600339993:web:e02e7005f979edd13d6888",
  measurementId: "G-DM3JTWJDCS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Extraer datos maestros desde el respaldo oficial JSON o data.js en la raíz
let data = null;
const backupPath = path.join(__dirname, "..", "documentos_soporte", "NORTA_FULL_BACKUP_2026-09-23.json");
const rootDataPath = path.join(__dirname, "..", "data.js");

if (fs.existsSync(backupPath)) {
  console.log(`[INFO] Cargando datos desde respaldo oficial: ${backupPath}`);
  const rawBackup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
  data = rawBackup.data || rawBackup;
} else if (fs.existsSync(rootDataPath)) {
  console.log(`[INFO] Cargando datos desde: ${rootDataPath}`);
  const dataCode = fs.readFileSync(rootDataPath, "utf8");
  const sandbox = {};
  const fn = new Function("sandbox", dataCode + "\nsandbox.INITIAL_BREWERY_DATA = INITIAL_BREWERY_DATA;");
  fn(sandbox);
  data = sandbox.INITIAL_BREWERY_DATA;
}

if (!data) {
  console.error("No se pudo cargar la fuente de datos (ni NORTA_FULL_BACKUP ni data.js).");
  process.exit(1);
}

async function seedCollection(collectionName, items, idKey = "id") {
  if (!Array.isArray(items) || items.length === 0) {
    console.log(`[SKIP] Colección ${collectionName}: vacía o no es arreglo.`);
    return;
  }

  console.log(`[SIEMBRA] Subiendo ${items.length} documentos a '${collectionName}'...`);
  const batch = writeBatch(db);
  let count = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const docId = item[idKey] ? String(item[idKey]) : `item_${i + 1}`;
    const docRef = doc(db, collectionName, docId);
    batch.set(docRef, item, { merge: true });
    count++;

    // Límite de batch de Firestore es 500 operaciones
    if (count % 400 === 0) {
      await batch.commit();
    }
  }

  await batch.commit();
  console.log(`[OK] Colección '${collectionName}' completada (${items.length} items).`);
}

async function seedSingleton(docPath, obj) {
  if (!obj || typeof obj !== "object") return;
  console.log(`[SIEMBRA] Subiendo documento singleton '${docPath}'...`);
  const parts = docPath.split("/");
  const docRef = doc(db, parts[0], parts[1]);
  await setDoc(docRef, obj, { merge: true });
  console.log(`[OK] Singleton '${docPath}' subido exitosamente.`);
}

async function run() {
  console.log("=================================================================");
  console.log("  INICIANDO SIEMBRA DE CERVECERÍA NORTA EN CLOUD FIRESTORE");
  console.log("=================================================================");

  try {
    // 1. Singletons principales
    await seedSingleton("config/info", data.info);
    await seedSingleton("branding/identity", data.brandIdentity);
    await seedSingleton("legal/framework", data.legal);

    // 2. Entidades maestras de producción e inventario
    await seedCollection("recipes", data.recipes);
    await seedCollection("batches", data.batches);
    await seedCollection("tanks", data.tanks);
    await seedCollection("rawInventory", data.rawInventory);
    await seedCollection("finishedGoods", data.finishedGoods);
    await seedCollection("machineryAndEquipment", data.machineryAndEquipment);
    await seedCollection("inventoryMovements", data.inventoryMovements);

    // 3. Comercial y Operaciones
    await seedCollection("clients", data.clients);
    await seedCollection("salesOrders", data.salesOrders);
    await seedCollection("kegs", data.kegs);
    await seedCollection("employees", data.employees);
    await seedCollection("shifts", data.shifts);
    await seedCollection("cipLogs", data.cipLogs);
    await seedCollection("qualityTests", data.qualityTests);

    // 4. Sistema INVIMA (Los 11 Programas y bitácoras sanitarias)
    await seedCollection("invimaPrograms", data.invimaControlSystem);
    await seedCollection("documentRepository", data.documentRepository);
    await seedCollection("invimaWaterLogs", data.waterControlLogs);
    await seedCollection("invimaStorageLogs", data.storageIngressLogs);
    await seedCollection("phMeterLogs", data.phMeterLogs);
    await seedCollection("calibrationSchedule", data.calibrationSchedule);
    await seedCollection("trainingSchedule", data.trainingSchedule);
    await seedCollection("trainingAttendance", data.trainingAttendance);
    await seedCollection("invimaPestLogs", data.pestControlLogs);
    await seedCollection("invimaCleaningLogs", data.cleaningSanitationLogs);
    await seedCollection("invimaWasteLogs", data.wasteManagementLogs);
    await seedCollection("invimaMaintenanceLogs", data.maintenanceLogs);
    await seedCollection("invimaSamplingLogs", data.samplingLogs);
    await seedCollection("invimaColdRoomLogs", data.coldRoomLogs);
    await seedCollection("suppliersList", data.suppliersList);
    await seedCollection("retainedSamplesLogs", data.retainedSamplesLogs);
    await seedCollection("certifications", data.certifications);

    console.log("=================================================================");
    console.log("  ¡SIEMBRA FINALIZADA CON ÉXITO TOTAL EN FIREBASE!");
    console.log("=================================================================");
    process.exit(0);
  } catch (error) {
    console.error("[ERROR] Falló la siembra en Firestore:", error);
    process.exit(1);
  }
}

run();
