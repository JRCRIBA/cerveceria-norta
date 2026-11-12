import json
import re

# 1. UPDATE DATA.JS
with open('data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

seed_data_345 = """
  // 3. SEED DATOS CALIBRACIÓN (BPM-FO-27)
  phMeterLogs: [
    { id: "PH-001", date: "2026-08-24", buffer4Reading: 4.02, buffer4Temp: 20.1, buffer4Error: 0.01, buffer7Reading: 7.02, buffer7Temp: 20.0, buffer7Error: 0.01, status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" },
    { id: "PH-002", date: "2026-08-17", buffer4Reading: 4.01, buffer4Temp: 20.5, buffer4Error: 0.00, buffer7Reading: 7.00, buffer7Temp: 20.4, buffer7Error: 0.00, status: "Conforme 🟢", verifiedBy: "Adm. Cristian" },
    { id: "PH-003", date: "2026-08-10", buffer4Reading: 4.03, buffer4Temp: 21.0, buffer4Error: 0.02, buffer7Reading: 7.03, buffer7Temp: 21.0, buffer7Error: 0.02, status: "Conforme 🟢", verifiedBy: "Ing. Julio Roberto Cristancho" }
  ],
  calibrationSchedule: [
    { id: "CAL-001", equipment: "pH-Metro Hanna HI98103", frequency: "Semanal", lastCal: "2026-08-24", nextCal: "2026-08-31", lab: "Interno NORTA", cert: "CERT-PH-2026-08" },
    { id: "CAL-002", equipment: "Balanza Analítica OHAUS 50kg", frequency: "Semestral", lastCal: "2026-06-15", nextCal: "2026-12-15", lab: "Metrología Colombia S.A.S.", cert: "CERT-BAL-2026-06" },
    { id: "CAL-003", equipment: "Termómetro Digital de Inmersión PT100", frequency: "Trimestral", lastCal: "2026-07-01", nextCal: "2026-10-01", lab: "Metrología Colombia S.A.S.", cert: "CERT-TERM-2026-07" },
    { id: "CAL-004", equipment: "Manómetro de CO2 Tanques BBT", frequency: "Anual", lastCal: "2026-02-10", nextCal: "2027-02-10", lab: "Metrología Colombia S.A.S.", cert: "CERT-MAN-2026-02" }
  ],

  // 4. SEED DATOS CAPACITACIÓN (FO-CAP-001)
  trainingSchedule: [
    { id: "TS-001", topic: "Inducción sobre las BPM (Buenas Prácticas de Manufactura)", instructor: "Ing. Julio Roberto Cristancho", modality: "Presencial", duration: "2 horas", month: "Enero", status: "Ejecutado 🟢" },
    { id: "TS-002", topic: "Plan de Saneamiento Básico (L&D, Residuos, Plagas y Agua)", instructor: "Asesor Calidad", modality: "Presencial", duration: "2 horas", month: "Marzo", status: "Ejecutado 🟢" },
    { id: "TS-003", topic: "Procedimientos POES de Limpieza y Desinfección CIP", instructor: "Ing. Julio Roberto Cristancho", modality: "Teórico-Práctico", duration: "3 horas", month: "Junio", status: "Ejecutado 🟢" },
    { id: "TS-004", topic: "Peligros Físicos, Químicos y Biológicos en Cervecería", instructor: "Calidad NORTA", modality: "Presencial", duration: "2 horas", month: "Septiembre", status: "Programado 📅" }
  ],
  trainingAttendance: [
    { id: "TA-001", date: "2026-06-15", topic: "Procedimientos POES de Limpieza y Desinfección CIP", employee: "Adm. Cristian", nationalId: "1.018.492.102", role: "Administrador de Planta", score: 4.8, status: "Aprobado 🟢" },
    { id: "TA-002", date: "2026-06-15", topic: "Procedimientos POES de Limpieza y Desinfección CIP", employee: "Comercial Ivan Ahumada", nationalId: "80.192.304", role: "Director Comercial", score: 4.5, status: "Aprobado 🟢" },
    { id: "TA-003", date: "2026-03-20", topic: "Plan de Saneamiento Básico", employee: "CP Yesid Ariza", nationalId: "52.391.029", role: "Directora Financiera", score: 5.0, status: "Aprobado 🟢" }
  ],

  // 5. SEED DATOS CONTROL DE PLAGAS (PG-GC-004)
  pestControlLogs: [
    { id: "PLOG-001", date: "2026-08-24", station: "Estación 1 - Puerta Recepción MP", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Ninguna requerida.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-002", date: "2026-08-24", station: "Estación 2 - Bodega de Insumos & Maltas", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Limpieza periódica estibas.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-003", date: "2026-08-24", station: "Estación 3 - Zona de Cocción & Fermentación", baitStatus: "Intacto 🟢", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Sellamiento de sifón verificado.", technician: "Fumigaciones Sabana Norte S.A.S." },
    { id: "PLOG-004", date: "2026-08-24", station: "Estación 4 - Zona Externa Residuos", baitStatus: "Cebo Consumido (Reemplazado 🟡)", pestsObserved: "Ninguna (Conforme C)", barriersStatus: "Hermético (C)", correctiveAction: "Reemplazo de cebos raticidas.", technician: "Fumigaciones Sabana Norte S.A.S." }
  ],
"""

if "phMeterLogs:" not in data_content:
    data_content = data_content.replace("  invimaControlSystem:", seed_data_345 + "\n  invimaControlSystem:")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print("data.js actualizado con semillas de datos para módulos 3, 4 y 5.")
