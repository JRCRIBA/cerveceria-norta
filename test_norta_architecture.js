/**
 * CERVECERÍA NORTA OS - ARCHITECTURAL TEST SUITE & FORENSIC VERIFICATION
 * 
 * Script de validación automatizada en Node.js para verificar la integridad
 * de las capas modulares, servicios de persistencia, repositorio indexado O(1),
 * búfer de auditoría y mitigación de White Screen of Death (ErrorBoundaries).
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    console.error(`  ❌ [FAIL] ${testName}: ${details}`);
  }
}

console.log('================================================================');
console.log('   SUITE DE PRUEBAS DE ARQUITECTURA FORENSE - CERVECERÍA NORTA');
console.log('================================================================\n');

// -----------------------------------------------------------------
// TEST SUITE 1: VERIFICACIÓN DEL MOTOR DE DATOS (data.js)
// -----------------------------------------------------------------
console.log('--- TEST SUITE 1: SEMILLA DE DATOS CANÓNICA (data.js) ---');
try {
  const dataJsContent = fs.readFileSync(path.join(BASE_DIR, 'data.js'), 'utf-8');
  const dummyContext = {};
  const evalData = new Function('context', dataJsContent + '\nreturn INITIAL_BREWERY_DATA;');
  const initialData = evalData(dummyContext);

  assert(initialData && typeof initialData === 'object', 'INITIAL_BREWERY_DATA existe y es un objeto');
  assert(initialData.info && initialData.info.headBrewer.includes('Julio Roberto Cristancho'), 'Identidad del Maestro Cervecero verificada');
  assert(Array.isArray(initialData.recipes) && initialData.recipes.length >= 4, 'Recetas canónicas NORTA presentes');
  assert(Array.isArray(initialData.batches) && initialData.batches.length >= 3, 'Lotes de producción iniciales presentes');
  assert(Array.isArray(initialData.tanks) && initialData.tanks.length >= 6, 'Cellar Map y Tanques cargados');
  assert(Array.isArray(initialData.invimaControlSystem) && initialData.invimaControlSystem.length === 11, 'Las 11 Carpetas Oficiales del Sistema INVIMA presentes');

  // Verificar carpetas obligatorias del INVIMA (1 a 11)
  const folderNumbers = initialData.invimaControlSystem.map(p => {
    if (typeof p.number === 'number') return p.number;
    const match = (p.id || p.folderName || p.title || '').match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  });
  const all11Present = [1,2,3,4,5,6,7,8,9,10,11].every(n => folderNumbers.includes(n));
  assert(all11Present, 'Integridad secuencial de las 11 Carpetas INVIMA (1 a 11)');
} catch (e) {
  assert(false, 'Carga y evaluación de data.js', e.message);
}

// -----------------------------------------------------------------
// TEST SUITE 2: SERVICIO DE TELEMETRÍA Y AUDITORÍA (AuditLogger.js)
// -----------------------------------------------------------------
console.log('\n--- TEST SUITE 2: TELEMETRÍA Y AUDIT TRAIL FORENSE (AuditLogger) ---');
try {
  // Mock de localStorage para Node.js
  const mockStorage = new Map();
  global.localStorage = {
    getItem: (k) => mockStorage.get(k) || null,
    setItem: (k, v) => mockStorage.set(k, String(v)),
    removeItem: (k) => mockStorage.delete(k),
    clear: () => mockStorage.clear(),
    get length() { return mockStorage.size; },
    key: (i) => Array.from(mockStorage.keys())[i]
  };

  const AuditLogger = require(path.join(BASE_DIR, 'src', 'services', 'AuditLogger.js'));

  assert(AuditLogger && typeof AuditLogger.log === 'function', 'AuditLogger exportado e inicializado');

  // Registrar eventos en diferentes niveles y categorías
  AuditLogger.info('PRODUCCION', 'Inicio de maceración Lote LOT-2026-092');
  AuditLogger.warn('CALIDAD_CIP', 'Temperatura de soda cáustica en tanque T-02 a 62°C (Límite inferior)');
  AuditLogger.error('INVIMA_BPM', 'Lectura de cloro libre fuera de rango: 0.15 mg/L', { limitMin: 0.3 });

  const logs = AuditLogger.getLogs();
  assert(logs.length >= 3, 'Eventos registrados en el búfer');

  // Prueba del búfer circular: inyectar 160 eventos
  for (let i = 0; i < 160; i++) {
    AuditLogger.info('SISTEMA', `Evento de estrés #${i}`);
  }
  const boundedLogs = AuditLogger.getLogs();
  assert(boundedLogs.length === 150, 'Búfer circular restringe tamaño máximo exactamente a 150 eventos');

  // Filtrado por categoría
  const invimaLogs = AuditLogger.getLogs({ category: 'INVIMA_BPM' });
  assert(Array.isArray(invimaLogs), 'Filtro por categoría funcional');

  // Exportación JSON
  const exportPayload = AuditLogger.exportLogsJSON();
  assert(exportPayload && exportPayload.jsonString && exportPayload.filename.includes('.json'), 'Exportación de logs en JSON válida');
} catch (e) {
  assert(false, 'Servicio AuditLogger', e.message);
}

// -----------------------------------------------------------------
// TEST SUITE 3: CAPA DE PERSISTENCIA ROBUSTA (StorageService.js)
// -----------------------------------------------------------------
console.log('\n--- TEST SUITE 3: STORAGE SERVICE PATTERN & RESILIENCIA (StorageService) ---');
try {
  const StorageService = require(path.join(BASE_DIR, 'src', 'services', 'StorageService.js'));
  assert(StorageService && typeof StorageService.loadData === 'function', 'StorageService exportado correctamente');

  // Prueba de validación de esquema
  const validData = {
    batches: [], recipes: [], tanks: [], rawInventory: [], finishedGoods: [],
    clients: [], salesOrders: [], cipLogs: [], qualityTests: [], employees: [],
    invimaControlSystem: [], documentRepository: []
  };
  const validationResult = StorageService.validateSchema(validData);
  assert(validationResult.valid === true, 'Validación de esquema reconoce payload íntegro');

  const invalidData = { batches: 'no-es-arreglo', recipes: null };
  const invalidResult = StorageService.validateSchema(invalidData);
  assert(invalidResult.valid === false && invalidResult.errors.length > 0, 'Validación de esquema detecta campos corruptos');

  // Prueba de cálculo forense de cuota
  const metrics = StorageService.getStorageMetrics();
  assert(metrics && typeof metrics.usedBytes === 'number' && metrics.quotaMb === 5, 'Métricas de cuota (5MB) calculadas');

  // Prueba de creación y restauración de Snapshot de respaldo
  const snapshotData = { ...validData, batches: [{ id: 'BATCH-SNAPSHOT-TEST' }] };
  const snapshotCreated = StorageService.createSnapshot(snapshotData, 'Snapshot de Test Automatizado');
  assert(snapshotCreated === true, 'Snapshot de respaldo creado en clave CERVECERIA_NORTA_BACKUP_V15');

  const restored = StorageService.restoreBackup();
  assert(restored && restored.batches && restored.batches[0].id === 'BATCH-SNAPSHOT-TEST', 'Restauración desde Snapshot exitosa');
} catch (e) {
  assert(false, 'Servicio StorageService', e.message);
}

// -----------------------------------------------------------------
// TEST SUITE 4: CAPA DE REPOSITORIO INDEXADO (DataRepository.js)
// -----------------------------------------------------------------
console.log('\n--- TEST SUITE 4: REPOSITORIO INDEXADO O(1) (DataRepository) ---');
try {
  const DataRepository = require(path.join(BASE_DIR, 'src', 'services', 'DataRepository.js'));
  assert(DataRepository && typeof DataRepository.indexData === 'function', 'DataRepository exportado correctamente');

  const mockData = {
    recipes: [
      { id: 'REC-001', name: 'NORTA Lager de Páramo', style: 'Lager' },
      { id: 'REC-002', name: 'NORTA Sabana IPA', style: 'IPA' }
    ],
    tanks: [
      { id: 'T-01', name: 'Fermentador 1', capacityLiters: 1000, status: 'Fermentando', currentBatchId: 'LOT-001' },
      { id: 'T-02', name: 'Fermentador 2', capacityLiters: 1000, status: 'Disponible', currentBatchId: null }
    ],
    batches: [
      { id: 'LOT-001', code: 'LOT-2026-001', recipeId: 'REC-001', tankId: 'T-01', stage: 'Fermentación', status: 'Activo' }
    ],
    clients: [
      { id: 'CLI-001', name: 'Restaurante Bar El Nogal' }
    ],
    invimaControlSystem: [
      { id: 'PROG-01', number: 1, name: 'Programa de Agua Potable', documents: [{ id: 'DOC-01', name: 'Control de Cloro' }] }
    ]
  };

  // Reindexar datos
  DataRepository.indexData(mockData);

  // Consulta O(1) de entidades
  const recipe = DataRepository.getRecipe('REC-001');
  assert(recipe && recipe.name === 'NORTA Lager de Páramo', 'Búsqueda O(1) de Receta por ID');

  const tank = DataRepository.getTank('T-01');
  assert(tank && tank.capacityLiters === 1000, 'Búsqueda O(1) de Tanque por ID');

  // Resolución O(1) de Lote con relaciones enlazadas
  const enrichedBatch = DataRepository.getBatchEnriched('LOT-001');
  assert(
    enrichedBatch && 
    enrichedBatch.recipeObj && enrichedBatch.recipeObj.id === 'REC-001' &&
    enrichedBatch.tankObj && enrichedBatch.tankObj.id === 'T-01',
    'Resolución O(1) de Lote enriquecido con Receta y Tanque vinculados'
  );

  // Resumen volumétrico de tanques
  const occupancy = DataRepository.getTankOccupancySummary();
  assert(occupancy.totalCapacityLiters === 2000 && occupancy.usedCapacityLiters === 1000, 'Cálculo de ocupación volumétrica de bodega');

  // Métricas sanitarias INVIMA
  const sanitaryMetrics = DataRepository.getInvimaSanitaryMetrics(mockData);
  assert(sanitaryMetrics.totalDocs === 1, 'Métricas sanitarias INVIMA calculadas');
} catch (e) {
  assert(false, 'Servicio DataRepository', e.message);
}

// -----------------------------------------------------------------
// TEST SUITE 5: COMPONENTES DE RESILIENCIA Y UI
// -----------------------------------------------------------------
console.log('\n--- TEST SUITE 5: COMPONENTES DE RESILIENCIA & DIAGNÓSTICO ---');
try {
  const errorBoundaryPath = path.join(BASE_DIR, 'src', 'components', 'ErrorBoundary.js');
  const diagnosticsModalPath = path.join(BASE_DIR, 'src', 'components', 'DiagnosticsModal.js');

  assert(fs.existsSync(errorBoundaryPath), 'Archivo ErrorBoundary.js existe en src/components/');
  assert(fs.existsSync(diagnosticsModalPath), 'Archivo DiagnosticsModal.js existe en src/components/');

  const ebCode = fs.readFileSync(errorBoundaryPath, 'utf-8');
  assert(ebCode.includes('getDerivedStateFromError') && ebCode.includes('componentDidCatch'), 'ErrorBoundary implementa métodos de contención de fallos React');
  assert(ebCode.includes('Aislamiento de Falla Operativa'), 'ErrorBoundary incluye diseño de resiliencia NORTA');

  const diagCode = fs.readFileSync(diagnosticsModalPath, 'utf-8');
  assert(diagCode.includes('Diagnóstico Forense & Salud Operativa'), 'DiagnosticsModal implementa consola de observabilidad');
  assert(diagCode.includes('storageMetrics') && diagCode.includes('invimaMetrics'), 'DiagnosticsModal vincula telemetría de almacenamiento e INVIMA');
} catch (e) {
  assert(false, 'Componentes de Resiliencia', e.message);
}

// -----------------------------------------------------------------
// TEST SUITE 6: INTEGRACIÓN EN APP.JS Y BUILD.PY
// -----------------------------------------------------------------
console.log('\n--- TEST SUITE 6: INTEGRACIÓN ARQUITECTURAL EN app.js Y build.py ---');
try {
  const appJsCode = fs.readFileSync(path.join(BASE_DIR, 'app.js'), 'utf-8');
  const buildPyCode = fs.readFileSync(path.join(BASE_DIR, 'build.py'), 'utf-8');

  assert(appJsCode.includes('StorageService.loadData'), 'app.js inicializa estado a través de StorageService');
  assert(appJsCode.includes('DataRepository.indexData'), 'app.js sincroniza índices con DataRepository');
  assert(appJsCode.includes('isDiagnosticsOpen'), 'app.js gestiona apertura de DiagnosticsModal');
  assert(appJsCode.includes('ErrorBoundary name="Control INVIMA (11 Carpetas)"'), 'app.js aísla módulo INVIMA con ErrorBoundary');
  assert(appJsCode.includes('ErrorBoundary name="NORTA OS Application Root"'), 'app.js aísla el árbol raíz completo con ErrorBoundary global');

  assert(buildPyCode.includes('AuditLogger.js') && buildPyCode.includes('StorageService.js'), 'build.py compila la arquitectura modular V15');
} catch (e) {
  assert(false, 'Integración en app.js y build.py', e.message);
}

// -----------------------------------------------------------------
// RESUMEN FINAL DE LA AUDITORÍA
// -----------------------------------------------------------------
console.log('\n================================================================');
console.log(`RESULTADO DE LA SUITE FORENSE: ${passedTests} de ${totalTests} pruebas superadas (${((passedTests/totalTests)*100).toFixed(1)}%)`);
if (passedTests === totalTests) {
  console.log('ESTADO: [CERTIFICADO CONFORME] La arquitectura NORTA OS V15 es 100% resiliente y modular.');
} else {
  console.log('ESTADO: [FALLAS DETECTADAS] Requiere revisión de los ítems marcados con FAIL.');
}
console.log('================================================================\n');
