/**
 * Cervecería NORTA OS - Enterprise Type Definitions
 * Generado a partir de la especificación SDD v3.0.0 (SSOT)
 */

export interface Recipe {
  id: string;
  name: string;
  style: string;
  targetVolumeL: number;
  og: number;
  fg: number;
  abv: number;
  ibu: number;
  srmColor: number;
  mashTemp: number;
  boilTimeMin: number;
  brandPillar?: string;
  liquidColor?: string;
  image?: string;
  glassware?: string;
  servingTemp?: string;
  pairing?: string;
  intensity?: string;
  sensoryTags?: string[];
  grains: Array<{ name: string; amountKg: number; pct: number }>;
  hops: Array<{ name: string; amountGrams: number; timeMin: number; use: string }>;
  yeast: { strain: string; form: string; amountGrams: number };
  essence?: string;
  sensoryDescription?: string;
}

export type BatchStage = "Maceración" | "Hervor" | "Fermentación" | "Maduración" | "Envasado" | "Finalizado";
export type BatchStatus = "Activo" | "En Pausa" | "Cuarentena" | "Completado";

export interface Batch {
  id: string;
  batchCode?: string; // Código canónico único (ej. NOR-2601-IPA)
  recipeName: string;
  style: string;
  tankId: string;
  volumeLiters: number;
  brewDate: string;
  targetPackDate: string;
  stage: BatchStage;
  stageProgress: number;
  originalGravity: number;
  currentGravity: number;
  finalGravityTarget: number;
  currentTemp: number;
  targetTemp: number;
  abvCalculated: number;
  abvTarget: number;
  ibu: number;
  brewer: string;
  status: BatchStatus;
  dryHopStatus?: string;
  notes?: string;
  cogsCostPerLiter?: number;
  fermentationLogs: Array<{
    day: number;
    date: string;
    gravity: number;
    temp: number;
    pressureBar?: number;
    ph?: number;
  }>;
  maltsUsed?: Array<{ name: string; lot: string; amountKg: number }>;
  hopsUsed?: Array<{ name: string; lot: string; amountGrams: number }>;
  yeastUsed?: { strain: string; lot: string; pitchRate: string };
}

export type TankStatus = "Disponible" | "Ocupado" | "Limpio" | "CIP_Pendiente" | "Mantenimiento";
export type TankType = "Fermentador" | "Madurador" | "BBT" | "Macerador";

export interface Tank {
  id: string;
  name: string;
  type: TankType;
  capacityL: number;
  currentL: number;
  currentBatchId: string | null;
  beerName: string;
  status: TankStatus;
  tempC: number;
  pressureBar: number;
  daysInTank: number;
  glycolValve: "AUTO" | "OPEN" | "CLOSED";
  lastCipDate: string;
}

export interface RawInventoryItem {
  id: string;
  name: string;
  category: "Maltas" | "Lúpulos" | "Levaduras" | "Químicos" | "Empaques";
  stockInitial: number;
  entries: number;
  entryDate: string;
  expiryDate: string;
  entryUnitPrice: number;
  exits: number;
  stock: number;
  unit: "Kg" | "Gramos" | "Litros" | "Unidades";
  minStock: number;
  costPerUnit: number;
  supplier: string;
  status: "NORMAL" | "LOW_STOCK" | "EXPIRED";
}

export interface FinishedGood {
  id: string;
  name: string;
  style: string;
  packaging: "Botella 330ml" | "Botella 750ml" | "Barril 30L" | "Barril 50L";
  brewDate: string;
  stockUnits: number;
  litersPerUnit: number;
  cogsCost: number;
  wholesalePrice: number;
  marginPct: number;
  marginAbs: number;
}

export interface InventoryMovement {
  id: string;
  date: string;
  type: "ENTRADA" | "SALIDA" | "MERMA" | "TRANSFERENCIA";
  category: "Materias Primas" | "Producto Terminado";
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  reason: string;
  notes?: string;
  responsible: string;
  transformationLinkedId?: string;
}

export interface MachineryEquipment {
  id: string;
  name: string;
  category: "Cocción" | "Frío" | "Envasado" | "Servicios";
  purchaseDate: string;
  acquisitionCost: number;
  usefulLifeYears: number;
  currentStatus: "Operativo" | "En Mantenimiento" | "Fuera de Servicio";
  depreciationAccumulated: number;
}

export interface Client {
  id: string;
  name: string;
  type: "Bar" | "Restaurante" | "Tienda Especializada" | "Distribuidor";
  contactName: string;
  phone: string;
  email: string;
  city: string;
  creditLimit: number;
  kegsInPossession: number;
  totalPurchasesUSD: number;
  status: "ACTIVO" | "EN_MORA" | "INACTIVO";
  pinCode?: string;
}

export interface SalesOrder {
  id: string;
  clientName: string;
  date: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  totalAmountUSD: number;
  status: "Cotización" | "Aprobada" | "En Preparación" | "Despachada" | "Entregada";
  paymentStatus: "Pendiente" | "Pagado" | "Crédito 30D";
  deliveryDate: string;
}

export interface Keg {
  serial: string;
  capacityL: number;
  style: string;
  client: string | null;
  sentDate: string | null;
  daysOut: number;
  alert: "OK" | "WARNING" | "CRITICAL_OVERDUE";
}

export interface CipLog {
  id: string;
  date: string;
  equipment: string;
  operator: string;
  cycleType: "Cáustico" | "Ácido" | "Sanitizante" | "Completo 3 Pasos";
  causticTempC: number;
  causticConcentrationPct: number;
  peraceticConcentrationPpm: number;
  rinseFinalPh: number;
  swabAdenosineTriphosphateRlu: number;
  status: "CONFORME" | "NO_CONFORME";
  supervisor: string;
}

export interface QualityTest {
  id: string;
  batchId: string;
  date: string;
  style: string;
  tank: string;
  ph: number;
  dissolvedOxygenPpb: number;
  carbonationVolCo2: number;
  turbidityNtu: number;
  diacetylSensoryScore: number;
  sensoryScore100: number;
  analyst: string;
  overallVerdict: "APROBADO_ENVASADO" | "EN_OBSERVACION" | "RECHAZADO";
}

export interface WaterControlLog {
  id: string;
  date: string;
  time: string;
  location: string;
  chlorineMgL: number;
  ph: number;
  complies: "SI" | "NO";
  verifiedBy: string;
  notes: string;
}

export interface StorageIngressLog {
  id: string;
  date: string;
  product: string;
  batchLot: string;
  quantity: string;
  supplier: string;
  expiryDate: string;
  notes: string;
  responsible: string;
}

export interface ColdRoomTempLog {
  id: string;
  date: string;
  time: string;
  tempColdRoom1: number;
  tempColdRoom2: number;
  status: "Conforme" | "No Conforme";
  verifiedBy: string;
  correctiveAction?: string;
}

export interface PhMeterVerificationLog {
  id: string;
  date: string;
  buffer4Reading: number;
  buffer4Temp: number;
  buffer4Error: number;
  buffer7Reading: number;
  buffer7Temp: number;
  buffer7Error: number;
  status: "Conforme" | "No Conforme";
  verifiedBy: string;
  notes?: string;
}

export interface RawMaterialReceiptLog {
  id: string;
  date: string;
  materialType: "Malta" | "Lúpulo" | "Levadura" | "Químico" | "Empaque" | "Insumo";
  productName: string;
  supplierName: string;
  supplierLot: string;
  quantityReceived: number;
  unit: "Kg" | "Gramos" | "Litros" | "Unidades";
  certificateOfAnalysis: boolean;
  packageIntegrityConforming: boolean;
  pestAbsenceConforming: boolean;
  statusTag: "Aceptado" | "Condicionado" | "Rechazado";
  inspectionResponsible: string;
  notes?: string;
}

export interface FinishedGoodReleaseLog {
  id: string;
  batchCode: string;
  beerStyle: string;
  packagingDate: string;
  abvPct: number;
  phReading: number;
  turbidityNtu: number;
  carbonationVolCo2: number;
  sensoryScore100: number;
  retentionSampleShelved: boolean;
  verdict: "Aprobado_Envasado" | "Retenido" | "Rechazado";
  releaseResponsible: string;
  notes?: string;
}

export type CipStatus = "Conforme" | "No_Conforme" | "En_Progreso" | "Pendiente" | "NO_REGISTRADO";

export interface RetainedSampleLog {
  id: string;
  batchCode: string;
  beerStyle?: string;
  packagingDate?: string;
  sampleCount?: number;
  containerType?: string;
  shelfLocation?: string;
  targetRetentionMonths?: number;
  status?: "Custodia_Activa" | "Liberada" | "Desechada";
  responsiblePerson?: string;
  notes?: string;
}

export type InvimaProgramId =
  | "prog-00-manual"
  | "prog-01-agua"
  | "prog-02-almacenamiento"
  | "prog-03-calibracion"
  | "prog-04-capacitacion"
  | "prog-05-plagas"
  | "prog-06-limpieza"
  | "prog-07-residuos"
  | "prog-08-mantenimiento"
  | "prog-09-muestreo"
  | "prog-10-proveedores"
  | "prog-11-trazabilidad"
  | "prog-12-recepcion-mp"
  | "prog-13-control-calidad";

export type InvimaDocumentType =
  | "Manual"
  | "Política"
  | "Programa"
  | "Procedimiento"
  | "Instructivo"
  | "Formato"
  | "Ficha Técnica"
  | "Plano"
  | "Anexo";

export interface InvimaDocumentFile {
  id: string;
  code: string;
  name: string;
  relPath: string;
  size: string;
  extension: ".docx" | ".xlsx" | ".pdf";
  type: InvimaDocumentType;
  status: "Vigente & Aprobado" | "En Revisión";
  updatedAt: string;
  gcsPath?: string;
}

export interface InvimaProgram {
  id: InvimaProgramId | string;
  folderNumber: string;
  folderName: string;
  title: string;
  code: string;
  fileCount: number;
  status: string;
  interactiveFormId?: string;
  files?: Array<InvimaDocumentFile | {
    name: string;
    sizeMb: string;
    gcsPath?: string;
  }>;
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
}

