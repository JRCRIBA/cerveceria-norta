with open('data.js', 'r', encoding='utf-8') as f:
    c = f.read()

movements_seed = '''  // 6.2 HISTORIAL CENTRALIZADO DE MOVIMIENTOS DE INVENTARIO (AUDITORÍA & KARDEX NORTA)
  inventoryMovements: [
    {
      id: "MOV-2026-001",
      date: "2026-08-20 09:30",
      type: "ENTRADA",
      category: "RAW",
      itemId: "RAW-01",
      itemName: "Malta Pale Ale 2-Row (Sacos 25kg)",
      quantity: 1000,
      unit: "kg",
      reason: "Compra a proveedor",
      notes: "Factura FAC-8921 Maltería Andina. Lote MAL-AND-2026-08 ingresado a estibas B-1.",
      responsible: "Ing. Julio Roberto Cristancho",
      transformationLinkedId: null
    },
    {
      id: "MOV-2026-002",
      date: "2026-08-21 14:15",
      type: "SALIDA_TRANSFORMACION",
      category: "RAW",
      itemId: "RAW-01",
      itemName: "Malta Pale Ale 2-Row (Sacos 25kg)",
      quantity: 280,
      unit: "kg",
      reason: "Uso en producción",
      notes: "Carga de molienda y macerado para nuevo lote NORTA Montana en F-01.",
      responsible: "Ing. Julio Roberto Cristancho",
      transformationLinkedId: "LOT-2026-088"
    },
    {
      id: "MOV-2026-003",
      date: "2026-08-21 14:15",
      type: "ENTRADA_TRANSFORMACION",
      category: "WIP",
      itemId: "LOT-2026-088",
      itemName: "NORTA Montana en F-01",
      quantity: 1200,
      unit: "L",
      reason: "Transformación desde Insumos",
      notes: "Siembra de levadura e inicio de fermentación a 19.5°C.",
      responsible: "Ing. Julio Roberto Cristancho",
      transformationLinkedId: "MOV-2026-002"
    },
    {
      id: "MOV-2026-004",
      date: "2026-08-22 11:00",
      type: "SALIDA_TRANSFORMACION",
      category: "WIP",
      itemId: "LOT-2026-086",
      itemName: "NORTA Tempestad en BBT-01",
      quantity: 1500,
      unit: "L",
      reason: "Finalización de lote",
      notes: "Lote acondicionado, gasificado a 2.55 vol CO2 y envasado en Barriles 30L y Latas 473ml.",
      responsible: "Cristian Fonseca",
      transformationLinkedId: "FG-04"
    },
    {
      id: "MOV-2026-005",
      date: "2026-08-22 11:00",
      type: "ENTRADA_TRANSFORMACION",
      category: "FINISHED",
      itemId: "FG-04",
      itemName: "Pack 6 Latas 473ml - NORTA Tempestad",
      quantity: 380,
      unit: "packs",
      reason: "Transformación desde Proceso (WIP)",
      notes: "Ingreso de 380 packs a cámara fría tras pase de control de calidad LAB-2026-078.",
      responsible: "Cristian Fonseca",
      transformationLinkedId: "MOV-2026-004"
    },
    {
      id: "MOV-2026-006",
      date: "2026-08-23 16:45",
      type: "SALIDA",
      category: "RAW",
      itemId: "RAW-04",
      itemName: "Malta Chocolate Roasted",
      quantity: 15,
      unit: "kg",
      reason: "Baja / Pérdida / Merma",
      notes: "Humedad detectada en saco por rotura en estiba. Insumo dado de baja de acuerdo con POES de almacenamiento.",
      responsible: "Cristian Fonseca",
      transformationLinkedId: null
    }
  ],'''

pos = c.find('// 7. CRM & PORTAL B2B CLIENTES')
if pos != -1:
    c = c[:pos] + movements_seed + '\n\n  ' + c[pos:]
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(c)
    print('[SUCCESS] data.js actualizado con inventoryMovements.')
else:
    print('[ERROR] Marcador no encontrado en data.js')
