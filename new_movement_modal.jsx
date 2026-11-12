// ==========================================================================
// COMPONENTE: InventoryMovementModal (CENTRAL DE MOVIMIENTOS E INTERCONEXIÓN)
// ACCESIBILIDAD, CONTRASTE DINÁMICO Y ERGONOMÍA DE TECLADO WCAG
// ==========================================================================
function InventoryMovementModal({ data, onClose, onSubmit }) {
  const [direction, setDirection] = useState('ENTRADA'); // 'ENTRADA' | 'SALIDA'
  const [category, setCategory] = useState('RAW'); // 'RAW' | 'WIP' | 'FINISHED' | 'EQUIPMENT'
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [responsible, setResponsible] = useState('Ing. Julio Roberto Cristancho');
  const [linkTargetId, setLinkTargetId] = useState(''); // Lote WIP destino o SKU Terminado destino

  const rawInventory = data.rawInventory || [];
  const batches = data.batches || [];
  const finishedGoods = data.finishedGoods || [];
  const machinery = data.machineryAndEquipment || [];

  // Ergonomía: Listener de tecla Escape para cerrar modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Opciones de motivo según dirección y categoría
  const getReasonOptions = () => {
    if (direction === 'ENTRADA') {
      if (category === 'RAW') {
        return [
          { val: 'Compra a proveedor', label: '🛒 Compra a Proveedor' },
          { val: 'Devolución de producción', label: '↩️ Devolución de Producción' },
          { val: 'Ajuste inicial de inventario', label: '📝 Ajuste Inicial / Conteo Físico' }
        ];
      }
      if (category === 'WIP') {
        return [
          { val: 'Inicio de cocción directa', label: '🍺 Inicio de Cocción Directa' },
          { val: 'Ajuste de volumen en tanque', label: '⚖️ Ajuste de Volumen en Tanque' }
        ];
      }
      if (category === 'FINISHED') {
        return [
          { val: 'Envasado directo de bodega', label: '📦 Envasado Directo de Bodega' },
          { val: 'Devolución de cliente B2B', label: '↩️ Devolución de Cliente B2B' },
          { val: 'Ajuste de inventario físico', label: '📝 Ajuste de Inventario Físico' }
        ];
      }
      if (category === 'EQUIPMENT') {
        return [
          { val: 'Adquisición de nuevo activo', label: '✨ Adquisición de Nuevo Activo' },
          { val: 'Retorno de mantenimiento externo', label: '🛠️ Retorno de Mantenimiento Externo' }
        ];
      }
    } else {
      // SALIDAS
      if (category === 'RAW') {
        return [
          { val: 'Uso en producción', label: '⚡ Uso en Producción (Transformación -> Genera WIP)', isTransform: true },
          { val: 'Baja / Pérdida / Merma', label: '⚠️ Baja / Pérdida / Merma (Requiere Justificación Obligatoria)', isLoss: true },
          { val: 'Caducidad de insumo', label: '⏳ Caducidad de Insumo (Requiere Justificación Obligatoria)', isLoss: true },
          { val: 'Muestra a laboratorio o análisis', label: '🔬 Muestra a Laboratorio o Análisis' },
          { val: 'Ajuste negativo por inventario', label: '📉 Ajuste Negativo por Inventario' }
        ];
      }
      if (category === 'WIP') {
        return [
          { val: 'Finalización de lote', label: '🍺 Finalización de Lote (Transformación -> Genera Producto Terminado)', isTransform: true },
          { val: 'Merma por contaminación o fallo microbiológico', label: '⚠️ Merma por Contaminación / Fallo (Baja Obligatoria)', isLoss: true },
          { val: 'Merma en trasiego / purga de levadura', label: '📉 Merma en Trasiego / Purga', isLoss: true }
        ];
      }
      if (category === 'FINISHED') {
        return [
          { val: 'Despacho comercial B2B', label: '🚚 Despacho Comercial B2B / Venta' },
          { val: 'Baja por rotura o pérdida de gas', label: '⚠️ Baja por Daño Físico / Rotura / Pérdida de Gas', isLoss: true },
          { val: 'Consumo interno / Degustación Taproom', label: '🍻 Consumo Interno / Degustación' },
          { val: 'Vencimiento en cava fría', label: '⏳ Vencimiento en Cava Fría (Baja Obligatoria)', isLoss: true }
        ];
      }
      if (category === 'EQUIPMENT') {
        return [
          { val: 'Baja por avería irreparable', label: '💥 Baja por Avería Irreparable (Baja Obligatoria)', isLoss: true },
          { val: 'Envío a mantenimiento preventivo/correctivo', label: '🛠️ Envío a Mantenimiento' },
          { val: 'Desincorporación por obsolescencia', label: '📦 Desincorporación por Obsolescencia', isLoss: true }
        ];
      }
    }
    return [{ val: 'Ajuste general', label: 'Ajuste General' }];
  };

  // Inicializar ítem y motivo por defecto al cambiar categoría o dirección
  useEffect(() => {
    const reasons = getReasonOptions();
    setReason(reasons[0].val);

    if (category === 'RAW' && rawInventory.length > 0) {
      setSelectedItemId(rawInventory[0].id);
    } else if (category === 'WIP' && batches.length > 0) {
      setSelectedItemId(batches[0].id);
    } else if (category === 'FINISHED' && finishedGoods.length > 0) {
      setSelectedItemId(finishedGoods[0].id);
    } else if (category === 'EQUIPMENT' && machinery.length > 0) {
      setSelectedItemId(machinery[0].id);
    }

    if (batches.length > 0) setLinkTargetId(batches[0].id);
  }, [category, direction]);

  const selectedItemObj = useMemo(() => {
    if (category === 'RAW') return rawInventory.find(i => i.id === selectedItemId);
    if (category === 'WIP') return batches.find(b => b.id === selectedItemId);
    if (category === 'FINISHED') return finishedGoods.find(f => f.id === selectedItemId);
    if (category === 'EQUIPMENT') return machinery.find(m => m.id === selectedItemId);
    return null;
  }, [category, selectedItemId, rawInventory, batches, finishedGoods, machinery]);

  // Es una baja que exige motivo/observación obligatoria
  const isLossOrDamage = useMemo(() => {
    if (direction !== 'SALIDA') return false;
    const r = reason.toLowerCase();
    return r.includes('baja') || r.includes('merma') || r.includes('caducidad') || r.includes('avería') || r.includes('vencimiento') || r.includes('daño');
  }, [direction, reason]);

  // Es transformación
  const isTransformation = useMemo(() => {
    if (direction !== 'SALIDA') return false;
    return (category === 'RAW' && reason === 'Uso en producción') ||
           (category === 'WIP' && reason === 'Finalización de lote');
  }, [direction, category, reason]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      alert('Ingresa una cantidad numérica válida mayor a 0.');
      return;
    }

    // Validación de justificación obligatoria en bajas
    if (isLossOrDamage && (!notes || notes.trim().length < 8)) {
      alert('⚠️ ATENCIÓN: El campo de "Observaciones / Motivo de la transacción" es OBLIGATORIO para bajas, mermas o averías (mínimo 8 caracteres para auditoría).');
      return;
    }

    const payload = {
      direction,
      category,
      itemId: selectedItemId,
      itemObj: selectedItemObj,
      quantity: qtyNum,
      reason,
      notes: notes.trim(),
      responsible,
      isTransformation,
      isLossOrDamage,
      linkTargetId: isTransformation ? linkTargetId : null
    };

    onSubmit(payload);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content max-w-2xl w-full p-6 rounded-2xl shadow-2xl space-y-5" role="dialog" aria-modal="true" aria-labelledby="modal-movements-title">
        {/* ENCABEZADO */}
        <div className="flex justify-between items-start border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--norta-azul-profundo)] border border-[var(--border-medium)] flex items-center justify-center text-xl shadow text-amber-200">
              🔄
            </div>
            <div>
              <h3 id="modal-movements-title" className="brand-title text-lg font-bold text-[var(--text-primary)]">
                Registro Universal de Movimientos de Inventario
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Kardex centralizado, trazabilidad de bajas y flujo automatizado de producción.
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-lg font-bold p-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--norta-dorado-tenue)]"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* TIPO DE MOVIMIENTO (ENTRADA / SALIDA) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDirection('ENTRADA')}
              className={`py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all active:scale-[0.98] ${
                direction === 'ENTRADA'
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 shadow-md ring-2 ring-emerald-500/40'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="text-base">📥</span> ENTRADA (Compra / Retorno)
            </button>
            <button
              type="button"
              onClick={() => setDirection('SALIDA')}
              className={`py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all active:scale-[0.98] ${
                direction === 'SALIDA'
                  ? 'bg-red-600/20 border-red-500 text-red-600 dark:text-red-300 shadow-md ring-2 ring-red-500/40'
                  : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="text-base">📤</span> SALIDA (Uso / Merma / Venta)
            </button>
          </div>

          {/* SELECCIÓN DE CATEGORÍA */}
          <div>
            <label className="brew-label text-[11px]">Categoría de Inventario Afectada</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'RAW', label: '🌾 Insumos (Raw)', count: rawInventory.length },
                { id: 'WIP', label: '🍺 Proceso (WIP)', count: batches.length },
                { id: 'FINISHED', label: '📦 Terminado', count: finishedGoods.length },
                { id: 'EQUIPMENT', label: '⚙️ Maquinaria', count: machinery.length }
              ].map(c => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`p-2 rounded-xl border text-center transition-all active:scale-[0.98] ${
                    category === c.id
                      ? 'bg-[#b89764] text-[#121210] font-bold border-[#b89764] shadow-md ring-1 ring-[#b89764]'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className="text-xs font-semibold">{c.label}</div>
                  <div className="text-[10px] opacity-75">{c.count} registrados</div>
                </button>
              ))}
            </div>
          </div>

          {/* SELECCIÓN DEL ARTÍCULO / LOTE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="brew-label text-[11px]">Artículo / Equipo / Lote Específico</label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="brew-select w-full font-bold"
                required
              >
                {category === 'RAW' && rawInventory.map(i => (
                  <option key={i.id} value={i.id}>
                    [{i.id}] {i.name} (Stock: {i.stock} {i.unit})
                  </option>
                ))}
                {category === 'WIP' && batches.map(b => (
                  <option key={b.id} value={b.id}>
                    [{b.id}] {b.recipeName} - Tanque {b.tankId} ({b.volumeLiters} L)
                  </option>
                ))}
                {category === 'FINISHED' && finishedGoods.map(f => (
                  <option key={f.id} value={f.id}>
                    [{f.id}] {f.name} - {f.packaging} ({f.stockUnits} uds)
                  </option>
                ))}
                {category === 'EQUIPMENT' && machinery.map(m => (
                  <option key={m.id} value={m.id}>
                    [{m.id}] {m.name} ({m.currentStatus})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="brew-label text-[11px]">
                Cantidad ({selectedItemObj && (selectedItemObj.unit || (category === 'WIP' ? 'Litros' : 'Unidades'))})
              </label>
              <input
                type="number"
                step="any"
                min="0.01"
                autoFocus
                onFocus={(e) => e.target.select()}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ej. 100"
                className="brew-input font-mono font-bold w-full"
                required
              />
            </div>
          </div>

          {/* MOTIVO DE LA TRANSACCIÓN */}
          <div>
            <label className="brew-label text-[11px]">Motivo / Tipificación de la Transacción</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="brew-select w-full font-semibold"
              required
            >
              {getReasonOptions().map((opt, idx) => (
                <option key={idx} value={opt.val}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* ALERTA DE FLUJO DE PRODUCCIÓN AUTOMATIZADO */}
          {isTransformation && (
            <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border-2 border-[var(--norta-dorado-tenue)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--norta-dorado-tenue)] font-bold text-xs">
                <span>🔄</span>
                <span>Interconexión de Flujo de Producción Activada</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                {category === 'RAW' && (
                  <>
                    Esta salida descontará los insumos de bodega y generará automáticamente un movimiento de entrada en <strong>Producto en Proceso (WIP)</strong> para alimentar el lote seleccionado:
                  </>
                )}
                {category === 'WIP' && (
                  <>
                    Esta salida liberará el tanque en proceso y generará automáticamente la entrada correspondiente en el inventario de <strong>Producto Terminado</strong>:
                  </>
                )}
              </p>
              <div>
                <label className="text-[10px] text-[var(--text-muted)] font-bold uppercase block mb-1">
                  {category === 'RAW' ? 'Lote Destino en Fermentador / Tanque' : 'Presentación / SKU Destino en Bodega'}
                </label>
                <select
                  value={linkTargetId}
                  onChange={(e) => setLinkTargetId(e.target.value)}
                  className="brew-select w-full font-bold text-xs"
                >
                  {category === 'RAW' && batches.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.id} • {b.recipeName} ({b.tankId})
                    </option>
                  ))}
                  {category === 'WIP' && finishedGoods.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.id} • {f.name} ({f.packaging})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* OBSERVACIONES / JUSTIFICACIÓN DE AUDITORÍA */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="brew-label text-[11px] mb-0">
                Observaciones / Motivo de la Transacción
              </label>
              {isLossOrDamage ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-900/40 text-red-600 dark:text-red-300 border border-red-500/60 animate-pulse">
                  ⚠️ OBLIGATORIO PARA BAJAS / MERMAS
                </span>
              ) : (
                <span className="text-[10px] text-[var(--text-dim)]">Opcional</span>
              )}
            </div>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isLossOrDamage
                  ? "Describe detalladamente la causa de la baja, lote de origen, rotura, merma o resultado microbiológico para auditoría..."
                  : "Notas operativas adicionales, número de factura, lote del proveedor, etc."
              }
              className={`brew-input w-full ${isLossOrDamage ? 'border-red-500/70 focus:border-red-500 ring-1 ring-red-500/20' : ''}`}
              required={isLossOrDamage}
            ></textarea>
          </div>

          {/* RESPONSABLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="brew-label text-[11px]">Responsable del Movimiento</label>
              <input
                type="text"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                className="brew-input font-semibold w-full"
                required
              />
            </div>
            <div className="flex items-end">
              <div className="text-[10px] text-[var(--text-muted)] p-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] w-full">
                Sincronización en tiempo real con recálculo dinámico de stock y balances contables en COP.
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={onClose}
              className="btn-norta-secondary text-xs py-2 px-4"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`btn-norta-primary text-xs py-2 px-5 font-bold shadow-lg ${
                direction === 'SALIDA' ? 'bg-gradient-to-r from-red-800 to-amber-700 text-white' : ''
              }`}
            >
              {direction === 'ENTRADA' ? '📥 Registrar Entrada' : '📤 Registrar Salida'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
