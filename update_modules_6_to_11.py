import json
import re

# 1. UPDATE DATA.JS
with open('data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

seed_data_6_to_11 = """
  // 6. SEED DATOS LIMPIEZA Y DESINFECCIÓN (FO-LD-001)
  cleaningSanitationLogs: [
    { id: "LD-001", date: "2026-08-24", area: "Tanque Fermentador F-01", frequency: "Por Lote", chemical: "Soda Cáustica 2% + Ácido Peracético 0.2%", concentration: "200 ppm", status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "LD-002", date: "2026-08-24", area: "Marmita de Cocción & Tuberías", frequency: "Diario", chemical: "Detergente Alcalino Sanicid", concentration: "1.5%", status: "Conforme 🟢", verifiedBy: "Adm. Cristian" },
    { id: "LD-003", date: "2026-08-23", area: "Zona de Envasado & Llenadora", frequency: "Diario", chemical: "Alcohol Antiséptico 70%", concentration: "70%", status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],

  // 7. SEED DATOS MANEJO DE RESIDUOS (FO-RS-001)
  wasteManagementLogs: [
    { id: "RS-001", date: "2026-08-24", wasteType: "Bagazo de Malta Orgánico", quantityKg: "450 kg", manager: "Granja Porcina Sabana (Compostaje)", status: "Entregado 🟢", verifiedBy: "Adm. Cristian" },
    { id: "RS-002", date: "2026-08-22", wasteType: "Trub & Levadura Residual", quantityKg: "80 L", manager: "Planta Biogás Local", status: "Entregado 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "RS-003", date: "2026-08-20", wasteType: "Empaques Cartón & Plástico Reciclable", quantityKg: "35 kg", manager: "Asociación Recicladores Norte", status: "Entregado 🟢", verifiedBy: "Adm. Cristian" }
  ],

  // 8. SEED DATOS MANTENIMIENTO (FO-MTTO-001)
  maintenanceLogs: [
    { id: "MTTO-001", date: "2026-08-15", equipment: "Chiller de Glicol Principal", type: "Preventivo", description: "Cambio de filtros y verificación nivel de glicol.", parts: "Filtro de aire, 5L Glicol USP", technician: "TecniFrio Sabana S.A.S.", status: "Completado 🟢" },
    { id: "MTTO-002", date: "2026-08-10", equipment: "Molino de Rodillos de Malta", type: "Preventivo", description: "Ajuste de luz de rodillos (1.2mm) y lubricación de rodamientos.", parts: "Grasa de grado alimenticio NSF H1", technician: "Ing. Julio Roberto Cristancho", status: "Completado 🟢" },
    { id: "MTTO-003", date: "2026-07-28", equipment: "Intercambiador de Calor a Placas", type: "Preventivo", description: "Desarme, empaquetadura y lavado químico CIP desincrustante.", parts: "Empaques EPDM Grado Alimenticio", technician: "Mantenimiento NORTA", status: "Completado 🟢" }
  ],

  // 9. SEED DATOS MUESTREO & CUARTOS FRÍOS (FO-MUE-001 / FO-CF-001)
  samplingLogs: [
    { id: "MUE-001", date: "2026-08-24", sampleObject: "NORTA Furia (Lote LOT-2026-088)", testType: "Microbiológico & Fisicoquímico", sampleVolume: "2 Botellas 500ml", lab: "Biotecnología & Alimentos Lab Acreditado", result: "Conforme (Ausencia de Coliformes & Silvestres) 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "MUE-002", date: "2026-08-15", sampleObject: "Agua Potable Salida Filtro Carbón", testType: "Fisicoquímico Completo (Decreto 2115)", sampleVolume: "1 Litro", lab: "Laboratorio Ambiental Sabana", result: "Cumple Norma Decreto 2115 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],
  coldRoomLogs: [
    { id: "CF-001", date: "2026-08-24", time: "08:00", tempColdRoom1: 2.5, tempColdRoom2: 3.0, status: "Conforme 🟢 (Rango 0°C a 4°C)", verifiedBy: "Adm. Cristian" },
    { id: "CF-002", date: "2026-08-23", time: "08:00", tempColdRoom1: 2.1, tempColdRoom2: 2.8, status: "Conforme 🟢 (Rango 0°C a 4°C)", verifiedBy: "Adm. Cristian" }
  ],

  // 10. SEED DATOS PROVEEDORES (FO-PROV-001)
  suppliersList: [
    { id: "PROV-001", name: "Maltería Andina S.A.S.", nit: "890.102.391-1", contact: "Carlos Mendoza", productProvided: "Maltas Base Pale Ale y Pilsner", phone: "310-482-9102", email: "ventas@malteriaandina.com", score: 4.9, status: "Homologado 🟢" },
    { id: "PROV-002", name: "Yakima Chief Hops", nit: "900.291.029-4", contact: "Lorena Gómez", productProvided: "Lúpulos T-90 Citra, Mosaic, Cascade", phone: "315-920-1920", email: "latam@yakimachief.com", score: 5.0, status: "Homologado 🟢" },
    { id: "PROV-003", name: "Envases Rústicos S.A.", nit: "800.192.301-8", contact: "Hernando Silva", productProvided: "Botellas Cerámicas y Vidrio 500ml", phone: "300-192-8301", email: "contacto@envasesrusticos.com", score: 4.7, status: "Homologado 🟢" }
  ],

  // 11. SEED DATOS TRAZABILIDAD (FO-TRA-001 / REGISTRO CONTRAMUESTRAS)
  retainedSamplesLogs: [
    { id: "TRA-001", date: "2026-08-24", beerName: "NORTA Furia", batchLot: "LOT-2026-088", presentation: "Botella 500ml", units: 3, shelfLocation: "Estante A-2 (Contramuestras)", responsible: "Ing. Julio Roberto Cristancho", notes: "Contramuestra de retenido reglamentaria." },
    { id: "TRA-002", date: "2026-08-20", beerName: "NORTA Picosa", batchLot: "LOT-2026-087", presentation: "Botella 500ml", units: 3, shelfLocation: "Estante A-1 (Contramuestras)", responsible: "Ing. Julio Roberto Cristancho", notes: "Lote de producción con COA verificado." },
    { id: "TRA-003", date: "2026-08-15", beerName: "NORTA Máxima", batchLot: "LOT-2026-086", presentation: "Barril 30L Stainless", units: 1, shelfLocation: "Cámara Fría B-1", responsible: "Adm. Cristian", notes: "Retenido de barril B2B." }
  ],
"""

if "cleaningSanitationLogs:" not in data_content:
    data_content = data_content.replace("  invimaControlSystem:", seed_data_6_to_11 + "\n  invimaControlSystem:")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print("data.js actualizado con semillas de datos para carpetas 6 a 11.")
