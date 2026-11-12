import re

new_raw_inventory = '''  // 5. INVENTARIO DE MATERIAS PRIMAS (DEDUCT-ON-BREW BOM LINKED)
  rawInventory: [
    {
      id: "RAW-01",
      name: "Malta Pale Ale 2-Row (Sacos 25kg)",
      category: "Maltas",
      stockInitial: 3000,
      entries: 1000,
      entryDate: "2026-08-01",
      expiryDate: "2027-08-01",
      entryUnitPrice: 7800,
      exits: 550,
      stock: 3450,
      unit: "kg",
      minStock: 1000,
      costPerUnit: 7800,
      supplier: "Maltería Andina S.A.S.",
      status: "Óptimo"
    },
    {
      id: "RAW-02",
      name: "Malta Pilsner Premium (Sacos 25kg)",
      category: "Maltas",
      stockInitial: 1800,
      entries: 800,
      entryDate: "2026-08-03",
      expiryDate: "2027-08-03",
      entryUnitPrice: 8200,
      exits: 500,
      stock: 2100,
      unit: "kg",
      minStock: 800,
      costPerUnit: 8200,
      supplier: "Maltería Andina S.A.S.",
      status: "Óptimo"
    },
    {
      id: "RAW-03",
      name: "Malta Caramelo 60L",
      category: "Maltas",
      stockInitial: 350,
      entries: 150,
      entryDate: "2026-07-20",
      expiryDate: "2027-07-20",
      entryUnitPrice: 10500,
      exits: 80,
      stock: 420,
      unit: "kg",
      minStock: 200,
      costPerUnit: 10500,
      supplier: "Weyermann Specialty",
      status: "Óptimo"
    },
    {
      id: "RAW-04",
      name: "Malta Chocolate Roasted",
      category: "Maltas",
      stockInitial: 220,
      entries: 50,
      entryDate: "2026-06-15",
      expiryDate: "2027-06-15",
      entryUnitPrice: 12500,
      exits: 80,
      stock: 190,
      unit: "kg",
      minStock: 150,
      costPerUnit: 12500,
      supplier: "Weyermann Specialty",
      status: "Precaución"
    },
    {
      id: "RAW-05",
      name: "Lúpulo Citra T-90 Pellets (-18°C)",
      category: "Lúpulos",
      stockInitial: 30.0,
      entries: 15.0,
      entryDate: "2026-07-10",
      expiryDate: "2026-10-15",
      entryUnitPrice: 210000,
      exits: 6.5,
      stock: 38.5,
      unit: "kg",
      minStock: 15.0,
      costPerUnit: 210000,
      supplier: "Yakima Chief Hops",
      status: "Por vencer"
    },
    {
      id: "RAW-06",
      name: "Lúpulo Mosaic T-90 Pellets (-18°C)",
      category: "Lúpulos",
      stockInitial: 18.0,
      entries: 10.0,
      entryDate: "2026-07-15",
      expiryDate: "2027-07-15",
      entryUnitPrice: 230000,
      exits: 6.0,
      stock: 22.0,
      unit: "kg",
      minStock: 12.0,
      costPerUnit: 230000,
      supplier: "Yakima Chief Hops",
      status: "Óptimo"
    },
    {
      id: "RAW-07",
      name: "Lúpulo Columbus (Amargor Base)",
      category: "Lúpulos",
      stockInitial: 15.0,
      entries: 8.0,
      entryDate: "2026-06-01",
      expiryDate: "2027-06-01",
      entryUnitPrice: 145000,
      exits: 5.0,
      stock: 18.0,
      unit: "kg",
      minStock: 10.0,
      costPerUnit: 145000,
      supplier: "Yakima Chief Hops",
      status: "Óptimo"
    },
    {
      id: "RAW-08",
      name: "Levadura SafAle US-05 (Paq. 500g)",
      category: "Levaduras",
      stockInitial: 12,
      entries: 8,
      entryDate: "2026-06-25",
      expiryDate: "2026-10-30",
      entryUnitPrice: 410000,
      exits: 4,
      stock: 16,
      unit: "paquetes",
      minStock: 6,
      costPerUnit: 410000,
      supplier: "Fermentis",
      status: "Por vencer"
    },
    {
      id: "RAW-09",
      name: "Botellas Cerámicas NORTA 500ml",
      category: "Empaques",
      stockInitial: 3500,
      entries: 2500,
      entryDate: "2026-08-05",
      expiryDate: "2030-01-01",
      entryUnitPrice: 5200,
      exits: 1200,
      stock: 4800,
      unit: "unidades",
      minStock: 1500,
      costPerUnit: 5200,
      supplier: "Envases Rústicos S.A.",
      status: "Óptimo"
    },
    {
      id: "RAW-10",
      name: "Latas de Aluminio 473ml NORTA",
      category: "Empaques",
      stockInitial: 10000,
      entries: 8000,
      entryDate: "2026-08-10",
      expiryDate: "2030-01-01",
      entryUnitPrice: 1200,
      exits: 3800,
      stock: 14200,
      unit: "unidades",
      minStock: 5000,
      costPerUnit: 1200,
      supplier: "Crown Can Packaging",
      status: "Óptimo"
    },
    {
      id: "RAW-11",
      name: "Soda Cáustica Escamas 99% (CIP)",
      category: "Químicos CIP",
      stockInitial: 200,
      entries: 100,
      entryDate: "2026-07-28",
      expiryDate: "2028-07-28",
      entryUnitPrice: 9200,
      exits: 60,
      stock: 240,
      unit: "kg",
      minStock: 100,
      costPerUnit: 9200,
      supplier: "Químicos Industriales S.A.",
      status: "Óptimo"
    }
  ],

  // 6. PRODUCTO TERMINADO (FINISHED GOODS EN COP)
  finishedGoods: [
    {
      id: "FG-01",
      name: "Barril Inox 30L - NORTA Montana",
      style: "Amber Mountain Ale",
      packaging: "Barril 30L",
      brewDate: "2026-07-20",
      stockUnits: 28,
      litersPerUnit: 30,
      cogsCost: 245000,
      wholesalePrice: 620000,
      marginPct: "60.5%",
      marginAbs: 375000
    },
    {
      id: "FG-02",
      name: "Barril Inox 50L - NORTA Montana",
      style: "Amber Mountain Ale",
      packaging: "Barril 50L",
      brewDate: "2026-07-15",
      stockUnits: 19,
      litersPerUnit: 50,
      cogsCost: 310000,
      wholesalePrice: 850000,
      marginPct: "63.5%",
      marginAbs: 540000
    },
    {
      id: "FG-03",
      name: "Caja 12x500ml Swing-Top - NORTA Cumbre",
      style: "Imperial Golden Ale",
      packaging: "Caja 12x500ml",
      brewDate: "2026-07-01",
      stockUnits: 95,
      litersPerUnit: 6.0,
      cogsCost: 98000,
      wholesalePrice: 260000,
      marginPct: "62.3%",
      marginAbs: 162000
    },
    {
      id: "FG-04",
      name: "Pack 6 Latas 473ml - NORTA Tempestad",
      style: "Storm Cold IPA",
      packaging: "Pack 6 Latas",
      brewDate: "2026-08-05",
      stockUnits: 380,
      litersPerUnit: 2.84,
      cogsCost: 32000,
      wholesalePrice: 82000,
      marginPct: "61.0%",
      marginAbs: 50000
    },
    {
      id: "FG-05",
      name: "Pack 6 Latas 473ml - NORTA Niebla",
      style: "Witbier / Hazy Ale",
      packaging: "Pack 6 Latas",
      brewDate: "2026-08-02",
      stockUnits: 195,
      litersPerUnit: 2.84,
      cogsCost: 33500,
      wholesalePrice: 85000,
      marginPct: "60.6%",
      marginAbs: 51500
    },
    {
      id: "FG-06",
      name: "Barril Inox 30L - NORTA Tempestad",
      style: "Storm Cold IPA",
      packaging: "Barril 30L",
      brewDate: "2026-07-28",
      stockUnits: 15,
      litersPerUnit: 30,
      cogsCost: 250000,
      wholesalePrice: 640000,
      marginPct: "60.9%",
      marginAbs: 390000
    }
  ],

  // 6.1 MAQUINARIA Y EQUIPO (ACTIVOS FIJOS NORTA EN COP)
  machineryAndEquipment: [
    {
      id: "ACT-BLH-01",
      name: "Bloque de Cocción 1000L Inox 304 (Macerador, Paila, Whirlpool)",
      category: "Cocción",
      purchaseDate: "2023-01-15",
      acquisitionCost: 145000000,
      usefulLifeYears: 15,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 33833333
    },
    {
      id: "ACT-FER-01",
      name: "Fermentador Cónico Unitank Chaquetado 1500L F-01",
      category: "Fermentación",
      purchaseDate: "2023-02-10",
      acquisitionCost: 38000000,
      usefulLifeYears: 12,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 11083333
    },
    {
      id: "ACT-FER-02",
      name: "Fermentador Cónico Unitank Chaquetado 1000L F-02",
      category: "Fermentación",
      purchaseDate: "2023-02-10",
      acquisitionCost: 28500000,
      usefulLifeYears: 12,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 8312500
    },
    {
      id: "ACT-BBT-01",
      name: "Tanque de Servicio y Gasificado BBT-01 2000L",
      category: "Acondicionado",
      purchaseDate: "2023-04-05",
      acquisitionCost: 44000000,
      usefulLifeYears: 12,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 12222222
    },
    {
      id: "ACT-CHL-01",
      name: "Chiller Enfriador de Glicol 10 HP Doble Compresor",
      category: "Servicios Industriales",
      purchaseDate: "2023-01-20",
      acquisitionCost: 52000000,
      usefulLifeYears: 10,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 18200000
    },
    {
      id: "ACT-CIP-01",
      name: "Sistema CIP Móvil Automático 2 Tanques (150L c/u) con Bomba Sanitaria",
      category: "Limpieza y Calidad",
      purchaseDate: "2023-05-18",
      acquisitionCost: 19500000,
      usefulLifeYears: 10,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 6175000
    },
    {
      id: "ACT-MOL-01",
      name: "Molino Industrial de 2 Rodillos Ajustables para Granos 3 HP",
      category: "Molienda",
      purchaseDate: "2023-01-25",
      acquisitionCost: 11800000,
      usefulLifeYears: 10,
      currentStatus: "Mantenimiento Preventivo 🟡",
      depreciationAccumulated: 4130000
    },
    {
      id: "ACT-ENV-01",
      name: "Llenadora y Enlatadora Isobárica Automática 1 Cabezal (Latas 473ml)",
      category: "Envasado",
      purchaseDate: "2024-03-10",
      acquisitionCost: 65000000,
      usefulLifeYears: 10,
      currentStatus: "Operativo 🟢",
      depreciationAccumulated: 15708333
    }
  ],'''

with open('data.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('// 5. INVENTARIO DE MATERIAS PRIMAS')
end_idx = code.find('// 7. CRM & PORTAL B2B CLIENTES')

if start_idx != -1 and end_idx != -1:
    code = code[:start_idx] + new_raw_inventory + '\n\n  ' + code[end_idx:]
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print('[SUCCESS] data.js actualizado con inventarios COP y maquinaria/equipo.')
else:
    print(f'[ERROR] Delimitadores no encontrados: {start_idx}, {end_idx}')
