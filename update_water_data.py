import json
import re

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

water_data_js = """
  // METADATA Y REGISTROS DEL FORMATO FO-AG-002 (CONTROL DE AGUA POTABLE)
  waterControlMetadata: {
    system: "SISTEMA DE GESTIÓN DE CALIDAD",
    code: "FO-AG-002",
    creationDate: "AGOSTO 2024",
    title: "FORMATO DE CONTROL DE AGUA POTABLE",
    version: "VERSIÓN 1",
    parametersNorm: "Referencia Decreto 2115 de 2007, la cantidad de Cloro Libre en Agua potable es de 0.3 a 2.0 expresada en mg / L (Cl2). pH 6.5 a 9.0. Si los parámetros No Cumplen hacer una segunda toma en otro punto diferente, si la No Conformidad continúa remitirse al Programa de Control de Agua Potable y verificar las medidas correctivas a tomar.",
    frequency: "Una vez al día, antes de iniciar procesos."
  },

  waterControlLogs: [
    { id: "WLOG-001", date: "2026-08-24", time: "07:30", location: "Llave de Maceración (Muela)", chlorineMgL: 1.20, ph: 7.20, complies: "SI", verifiedBy: "Ing. Julio Roberto Cristancho", notes: "Parámetros óptimos en norma Decreto 2115." },
    { id: "WLOG-002", date: "2026-08-23", time: "07:15", location: "Tanque de Reserva de Agua Potable", chlorineMgL: 1.15, ph: 7.10, complies: "SI", verifiedBy: "Adm. Cristian", notes: "Lavado previo verificado." },
    { id: "WLOG-003", date: "2026-08-22", time: "07:45", location: "Salida Filtro de Carbón Activado", chlorineMgL: 0.95, ph: 7.30, complies: "SI", verifiedBy: "Ing. Julio Roberto Cristancho", notes: "Filtro operando con flujo normal." }
  ],
"""

if "waterControlMetadata:" not in content:
    content = content.replace("  invimaControlSystem:", water_data_js + "\n  invimaControlSystem:")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("data.js actualizado con datos de agua potable FO-AG-002.")
