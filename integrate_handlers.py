import os

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')

with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update ErpModule invocation to include onOpenMovement
old_erp_tag = '<ErpModule data={data} tab={erpTab} setTab={setErpTab} onExportCSV={exportToCSV} />'
new_erp_tag = '<ErpModule data={data} tab={erpTab} setTab={setErpTab} onOpenMovement={() => setModalType("newMovement")} onExportCSV={exportToCSV} />'

if old_erp_tag in app_code:
    app_code = app_code.replace(old_erp_tag, new_erp_tag, 1)
    print("[OK] Replaced ErpModule tag to pass onOpenMovement.")
else:
    print("[WARN] Could not find exact old_erp_tag.")

# 2. Add modal render for newMovement
old_modal_anchor = '{modalType === \'newBatch\' &&'
new_modal_render = '{modalType === \'newMovement\' && <InventoryMovementModal data={data} onClose={() => setModalType(null)} onSubmit={handleCreateInventoryMovement} />}\n      ' + old_modal_anchor

if old_modal_anchor in app_code and "modalType === 'newMovement'" not in app_code:
    app_code = app_code.replace(old_modal_anchor, new_modal_render, 1)
    print("[OK] Added InventoryMovementModal render under MODALES.")
else:
    print("[INFO] InventoryMovementModal render already present or anchor missing.")

# 3. Add handleCreateInventoryMovement in BreweryApp
handler_code = '''
  // --- HANDLER CENTRAL: MOVIMIENTOS DE INVENTARIO E INTERCONEXIÓN ---
  const handleCreateInventoryMovement = (movement) => {
    setData(prev => {
      const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
      const isEntry = movement.direction === 'ENTRADA';
      const qty = movement.quantity;
      const movId = `MOV-${Date.now().toString().slice(-6)}`;

      let updatedRaw = prev.rawInventory || [];
      let updatedBatches = prev.batches || [];
      let updatedFinished = prev.finishedGoods || [];
      let updatedMachinery = prev.machineryAndEquipment || [];
      const newMovements = [...(prev.inventoryMovements || [])];

      // Registro principal en Kardex
      const primaryRecord = {
        id: movId,
        date: nowStr,
        type: movement.isTransformation ? 'TRANSFORMACION' : (isEntry ? 'ENTRADA' : 'SALIDA'),
        category: movement.category === 'RAW' ? 'Insumos (Raw)' :
                  movement.category === 'WIP' ? 'Proceso (WIP)' :
                  movement.category === 'FINISHED' ? 'Terminado (Finished)' : 'Maquinaria',
        itemCode: movement.itemId,
        itemName: movement.itemObj ? (movement.itemObj.name || movement.itemObj.recipeName || movement.itemObj.equipmentName || movement.itemId) : movement.itemId,
        quantity: isEntry ? `+${qty}` : `-${qty}`,
        unit: movement.itemObj ? (movement.itemObj.unit || (movement.category === 'WIP' ? 'L' : 'unidades')) : 'unidades',
        reason: movement.reason,
        notes: movement.notes || (movement.isLossOrDamage ? 'Baja justificada por auditoría técnica.' : 'Transacción operativa estándar.'),
        responsible: movement.responsible || 'Ing. Julio Roberto Cristancho'
      };
      newMovements.unshift(primaryRecord);

      // CASO 1: MATERIAS PRIMAS (RAW)
      if (movement.category === 'RAW') {
        updatedRaw = updatedRaw.map(item => {
          if (item.id === movement.itemId) {
            const currentEntries = Number(item.entries) || 0;
            const currentExits = Number(item.exits) || 0;
            const newEntries = isEntry ? currentEntries + qty : currentEntries;
            const newExits = !isEntry ? currentExits + qty : currentExits;
            const stockInit = Number(item.stockInitial) || 0;
            const newStock = Math.max(0, parseFloat((stockInit + newEntries - newExits).toFixed(2)));
            return {
              ...item,
              entries: newEntries,
              exits: newExits,
              stock: newStock
            };
          }
          return item;
        });

        // Interconexión Automática: Uso en Producción -> Alimenta Lote WIP
        if (!isEntry && movement.isTransformation && movement.linkTargetId) {
          const targetBatch = updatedBatches.find(b => b.id === movement.linkTargetId);
          const autoBatchId = targetBatch ? targetBatch.id : movement.linkTargetId;
          const autoWipMov = {
            id: `MOV-TR-${Date.now().toString().slice(-5)}`,
            date: nowStr,
            type: 'TRANSFORMACION_AUTO',
            category: 'Proceso (WIP)',
            itemCode: autoBatchId,
            itemName: targetBatch ? `${targetBatch.recipeName} (${targetBatch.id})` : `Lote ${autoBatchId}`,
            quantity: `+${qty}`,
            unit: movement.itemObj ? movement.itemObj.unit : 'kg',
            reason: `Insumo incorporado desde salida de ${movement.itemObj ? movement.itemObj.name : movement.itemId}`,
            notes: `Auto-generado por transformación en producción. Lote destino: ${autoBatchId}.`,
            responsible: movement.responsible
          };
          newMovements.unshift(autoWipMov);
        }
      }

      // CASO 2: PRODUCTO EN PROCESO (WIP)
      else if (movement.category === 'WIP') {
        // Interconexión Automática: Finalización de Lote -> Alimenta Producto Terminado (Finished)
        if (!isEntry && movement.isTransformation) {
          const batch = updatedBatches.find(b => b.id === movement.itemId);
          const recipeName = batch ? batch.recipeName : '';
          // Calcular botellas producidas: ej. litros / 0.33 o por enlace directo
          const unitsCreated = Math.round(qty * 2.5); // ~2.5 botellas/latas por litro estándar o según envase

          let targetFound = false;
          updatedFinished = updatedFinished.map(fg => {
            const matches = (movement.linkTargetId && fg.id === movement.linkTargetId) ||
                            (recipeName && (fg.name.includes(recipeName) || recipeName.includes(fg.beerName)));
            if (matches && !targetFound) {
              targetFound = true;
              return {
                ...fg,
                stockUnits: (Number(fg.stockUnits) || 0) + unitsCreated
              };
            }
            return fg;
          });

          // Si no encontró por nombre, sumamos al primer SKU de la línea
          if (!targetFound && updatedFinished.length > 0) {
            updatedFinished[0] = {
              ...updatedFinished[0],
              stockUnits: (Number(updatedFinished[0].stockUnits) || 0) + unitsCreated
            };
          }

          // Registrar entrada automática en Kardex
          const autoFgMov = {
            id: `MOV-TR-${Date.now().toString().slice(-5)}`,
            date: nowStr,
            type: 'TRANSFORMACION_AUTO',
            category: 'Terminado (Finished)',
            itemCode: movement.linkTargetId || 'FG-AUTO',
            itemName: recipeName ? `Stock Terminado: ${recipeName}` : 'Stock Envasado Terminado',
            quantity: `+${unitsCreated}`,
            unit: 'unidades',
            reason: `Envasado finalizado desde Lote ${movement.itemId}`,
            notes: `Auto-generado por finalización y empaque de lote (${qty} L procesados).`,
            responsible: movement.responsible
          };
          newMovements.unshift(autoFgMov);

          // Si el lote se finalizó, marcar como completado
          updatedBatches = updatedBatches.map(b => {
            if (b.id === movement.itemId) {
              return { ...b, stage: 'Completado', status: 'Completado', stageProgress: 100 };
            }
            return b;
          });
        }
      }

      // CASO 3: PRODUCTO TERMINADO (FINISHED)
      else if (movement.category === 'FINISHED') {
        updatedFinished = updatedFinished.map(fg => {
          if (fg.id === movement.itemId) {
            const currentUnits = Number(fg.stockUnits) || 0;
            const newUnits = isEntry ? currentUnits + Math.round(qty) : Math.max(0, currentUnits - Math.round(qty));
            return {
              ...fg,
              stockUnits: newUnits
            };
          }
          return fg;
        });
      }

      // CASO 4: MAQUINARIA Y EQUIPO (EQUIPMENT)
      else if (movement.category === 'EQUIPMENT') {
        updatedMachinery = updatedMachinery.map(m => {
          if (m.id === movement.itemId) {
            if (!isEntry && movement.isLossOrDamage) {
              return {
                ...m,
                operationalStatus: 'Fuera de Servicio / En Reparación',
                maintenanceNotes: `Baja/Novedad reportada: ${movement.notes} (${nowStr})`
              };
            }
            return m;
          }
          return m;
        });
      }

      return {
        ...prev,
        rawInventory: updatedRawRawSafeguard(updatedRaw),
        batches: updatedBatches,
        finishedGoods: updatedFinished,
        machineryAndEquipment: updatedMachinery,
        inventoryMovements: newMovements
      };
    });

    setModalType(null);
    showToast(`Movimiento ${movement.direction} de ${movement.category} registrado exitosamente con sincronización global.`);
  };

  // Salvaguarda interna para sincronizar stock en raw
  const updatedRawRawSafeguard = (items) => {
    return items.map(it => {
      const stockInit = Number(it.stockInitial) || 0;
      const ent = Number(it.entries) || 0;
      const ex = Number(it.exits) || 0;
      return {
        ...it,
        stock: Math.max(0, parseFloat((stockInit + ent - ex).toFixed(2)))
      };
    });
  };
'''

# Find a good place for handler_code inside BreweryApp: before handleAddPhMeterLog
anchor = '  // --- HANDLERS MÓDULO 3: CALIBRACIÓN (BPM-FO-27) ---'
if anchor in app_code and "handleCreateInventoryMovement" not in app_code:
    app_code = app_code.replace(anchor, handler_code + "\n\n" + anchor, 1)
    print("[OK] handleCreateInventoryMovement inserted into BreweryApp.")
else:
    print("[INFO] handleCreateInventoryMovement already exists or anchor missing.")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("[OK] Integration script completed.")
