import os
import json

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
data_path = os.path.join(base_dir, 'data.js')

with open(data_path, 'r', encoding='utf-8') as f:
    data_code = f.read()

# 21 nuevos ítems de insumos
new_raw_items_code = '''    {
      id: "RAW-12",
      name: "Malta Pale Ale - Best Pale Ale",
      category: "Maltas",
      stockInitial: 252,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 7059,
      exits: 0,
      stock: 252,
      unit: "kg",
      minStock: 50,
      costPerUnit: 7059,
      supplier: "BestMalz Alemania / Distribuidor",
      status: "Óptimo"
    },
    {
      id: "RAW-13",
      name: "Malta Caramel Amber",
      category: "Maltas",
      stockInitial: 10,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 8151,
      exits: 0,
      stock: 10,
      unit: "kg",
      minStock: 5,
      costPerUnit: 8151,
      supplier: "BestMalz / Weyermann",
      status: "Óptimo"
    },
    {
      id: "RAW-14",
      name: "Malta Avena",
      category: "Maltas",
      stockInitial: 8,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 17899,
      exits: 0,
      stock: 8,
      unit: "kg",
      minStock: 4,
      costPerUnit: 17899,
      supplier: "Maltería Especializada",
      status: "Óptimo"
    },
    {
      id: "RAW-15",
      name: "Malta Chocolate",
      category: "Maltas",
      stockInitial: 3,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 9580,
      exits: 0,
      stock: 3,
      unit: "kg",
      minStock: 2,
      costPerUnit: 9580,
      supplier: "Weyermann Specialty",
      status: "Óptimo"
    },
    {
      id: "RAW-16",
      name: "Malta Biscuit",
      category: "Maltas",
      stockInitial: 2,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 9496,
      exits: 0,
      stock: 2,
      unit: "kg",
      minStock: 2,
      costPerUnit: 9496,
      supplier: "Castle Malting",
      status: "Óptimo"
    },
    {
      id: "RAW-17",
      name: "Malta Melano (Melanoidina)",
      category: "Maltas",
      stockInitial: 4,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 7983,
      exits: 0,
      stock: 4,
      unit: "kg",
      minStock: 2,
      costPerUnit: 7983,
      supplier: "Weyermann Specialty",
      status: "Óptimo"
    },
    {
      id: "RAW-18",
      name: "Malta Trigo",
      category: "Maltas",
      stockInitial: 4,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 7311,
      exits: 0,
      stock: 4,
      unit: "kg",
      minStock: 2,
      costPerUnit: 7311,
      supplier: "BestMalz / Maltería Andina",
      status: "Óptimo"
    },
    {
      id: "RAW-19",
      name: "Malta Caramel Pils",
      category: "Maltas",
      stockInitial: 7,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 7815,
      exits: 0,
      stock: 7,
      unit: "kg",
      minStock: 3,
      costPerUnit: 7815,
      supplier: "BestMalz / Weyermann",
      status: "Óptimo"
    },
    {
      id: "RAW-20",
      name: "Malta Negra Extra",
      category: "Maltas",
      stockInitial: 2,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 12017,
      exits: 0,
      stock: 2,
      unit: "kg",
      minStock: 2,
      costPerUnit: 12017,
      supplier: "Castle Malting / Weyermann",
      status: "Óptimo"
    },
    {
      id: "RAW-21",
      name: "Malta Caramel Munich 2",
      category: "Maltas",
      stockInitial: 3,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 9748,
      exits: 0,
      stock: 3,
      unit: "kg",
      minStock: 2,
      costPerUnit: 9748,
      supplier: "Weyermann Specialty",
      status: "Óptimo"
    },
    {
      id: "RAW-22",
      name: "Cebada Tostada",
      category: "Maltas",
      stockInitial: 5,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 8487,
      exits: 0,
      stock: 5,
      unit: "kg",
      minStock: 2,
      costPerUnit: 8487,
      supplier: "Maltería Especializada",
      status: "Óptimo"
    },
    {
      id: "RAW-23",
      name: "Lúpulo Cascade T-90 Pellets",
      category: "Lúpulos",
      stockInitial: 1.85,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 126050,
      exits: 0,
      stock: 1.85,
      unit: "kg",
      minStock: 1.0,
      costPerUnit: 126050,
      supplier: "Yakima Chief Hops / Distribuidor",
      status: "Óptimo"
    },
    {
      id: "RAW-24",
      name: "Lúpulo East Kent Golding (EKG)",
      category: "Lúpulos",
      stockInitial: 0.80,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 193277,
      exits: 0,
      stock: 0.80,
      unit: "kg",
      minStock: 0.5,
      costPerUnit: 193277,
      supplier: "Hopunion / BarthHaas",
      status: "Óptimo"
    },
    {
      id: "RAW-25",
      name: "Levadura SafAle US-05",
      category: "Levaduras",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-03-20",
      entryUnitPrice: 277311,
      exits: 0,
      stock: 1.0,
      unit: "paquetes (500g)",
      minStock: 1.0,
      costPerUnit: 277311,
      supplier: "Fermentis by Lesaffre",
      status: "Óptimo"
    },
    {
      id: "RAW-26",
      name: "Clarificante Whirlfloc",
      category: "Químicos CIP",
      stockInitial: 0.50,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2028-09-20",
      entryUnitPrice: 260504,
      exits: 0,
      stock: 0.50,
      unit: "kg",
      minStock: 0.2,
      costPerUnit: 260504,
      supplier: "Ecolab / Proveedor Cervecero",
      status: "Óptimo"
    },
    {
      id: "RAW-27",
      name: "Saborizante Natural Cereza (4 Oz)",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 32773,
      exits: 0,
      stock: 1.0,
      unit: "frascos (4oz)",
      minStock: 1.0,
      costPerUnit: 32773,
      supplier: "Insumos Cerveceros & Esencias",
      status: "Óptimo"
    },
    {
      id: "RAW-28",
      name: "Cáscara de Naranja Dulce Seca (1 Oz)",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 2.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 15126,
      exits: 0,
      stock: 2.0,
      unit: "bolsas (1oz)",
      minStock: 1.0,
      costPerUnit: 15126,
      supplier: "Insumos Botánicos & Especias",
      status: "Óptimo"
    },
    {
      id: "RAW-29",
      name: "Romero Seco Especial",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2027-09-20",
      entryUnitPrice: 20000,
      exits: 0,
      stock: 1.0,
      unit: "kg",
      minStock: 0.5,
      costPerUnit: 20000,
      supplier: "Hierbas y Especias de Origen",
      status: "Óptimo"
    },
    {
      id: "RAW-30",
      name: "Miel Pura de Abejas",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2028-09-20",
      entryUnitPrice: 217800,
      exits: 0,
      stock: 1.0,
      unit: "kg",
      minStock: 0.5,
      costPerUnit: 217800,
      supplier: "Apiarios Andinos",
      status: "Óptimo"
    },
    {
      id: "RAW-31",
      name: "Pimienta Negra en Pepa",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2028-09-20",
      entryUnitPrice: 5000,
      exits: 0,
      stock: 1.0,
      unit: "kg",
      minStock: 0.5,
      costPerUnit: 5000,
      supplier: "Especias del Campo",
      status: "Óptimo"
    },
    {
      id: "RAW-32",
      name: "Jalapeños Frescos Seleccionados",
      category: "Adjuntos e Ingredientes Especiales",
      stockInitial: 1.0,
      entries: 0,
      entryDate: "2026-09-20",
      expiryDate: "2026-10-20",
      entryUnitPrice: 12500,
      exits: 0,
      stock: 1.0,
      unit: "kg",
      minStock: 0.5,
      costPerUnit: 12500,
      supplier: "Huerta Andina Agropecuaria",
      status: "Por vencer"
    }'''

# Nuevo ítem de maquinaria
new_machinery_code = '''    {
      id: "ACT-CRB-01",
      name: "Piedra Carbonadora Inox 316L (2 Micrones)",
      category: "Maduración y Carbonatación",
      purchaseDate: "2026-09-20",
      acquisitionCost: 33613,
      usefulLifeYears: 5,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 0
    }'''

# Inserción en rawInventory
raw_target = '''      supplier: "Químicos Industriales S.A.",
      status: "Óptimo"
    }
  ],'''

raw_replacement = f'''      supplier: "Químicos Industriales S.A.",
      status: "Óptimo"
    }},
{new_raw_items_code}
  ],'''

if raw_target in data_code:
    data_code = data_code.replace(raw_target, raw_replacement, 1)
    print("[OK] 21 nuevos ítems agregados a rawInventory en data.js.")
else:
    print("[ERROR] No se encontró el ancla de cierre de rawInventory en data.js")

# Inserción en machineryAndEquipment
mach_target = '''      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 15708333
    }
  ],'''

mach_replacement = f'''      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 15708333
    }},
{new_machinery_code}
  ],'''

if mach_target in data_code:
    data_code = data_code.replace(mach_target, mach_replacement, 1)
    print("[OK] ACT-CRB-01 agregado a machineryAndEquipment en data.js.")
else:
    print("[ERROR] No se encontró el ancla de cierre de machineryAndEquipment en data.js")

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(data_code)

print("[OK] data.js actualizado y guardado.")
