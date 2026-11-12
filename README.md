# 🍺 Cervecería Norta OS (Brewery Enterprise Suite 4.0)

Sistema integral de gestión y operaciones para **Cervecería Norta**, diseñado para unificar en una sola plataforma:

- 📊 **Dashboard Ejecutivo**: Métricas en vivo de bodega, ventas, eficiencia y estados de tanques.
- 🍺 **Producción & Lotes**: Batch tracking en 6 etapas, Cellar Map (fermentadores/tanques), recetas maestras y calculadora cervecera interactiva (ABV, IBU, atenuación, Plato).
- 📦 **ERP, Finanzas & Inventarios**: Control de materias primas (maltas, lúpulos, levaduras, químicos), producto terminado (barriles, latas, botellas) y desglose de costeo por litro (COGS).
- 🤝 **CRM & Ventas B2B**: Directorio de bares y clientes retail, pipeline de pedidos y trazabilidad de barriles en consignación (Keg Tracking).
- 🔬 **Procesos Operativos & Calidad (QA/BPM)**: Bitácora de limpieza CIP con lecturas ATP, análisis físico-químico de laboratorio, cata sensorial y manual de SOPs.
- 👥 **Talento Humano (HR)**: Directorio del equipo cervecero, cuadrante de turnos de cocción y semáforo de certificaciones/carnets sanitarios.
- ⚖️ **Cumplimiento Legal, Sanitario & Fiscal**: Registros sanitarios INVIMA con alertas de vigencia, motor de auditoría y simulacro de retiro de lote (Recall), impuesto al consumo y licencias de planta.

---

## 🚀 Cómo Iniciar la Aplicación

### Opción 1: Servidor Local con Python (Recomendada)
Ejecuta en tu terminal dentro de esta carpeta:
```bash
python servidor.py
```
O simplemente haz doble clic en el archivo **`iniciar.bat`**. La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`.

### Opción 2: Abrir Directamente en el Navegador
Abre el archivo [`index.html`](./index.html) directamente con Google Chrome, Microsoft Edge o cualquier navegador web moderno.

---

## 🎨 Características de Diseño y Arquitectura
- **Dark Luxury Craft Brewery Theme**: Paleta inspirada en malta tostada (`#0c0b0a`), cobre cálido y oro ámbar (`#f59e0b`).
- **Persistencia React**: Guarda cualquier cambio o creación de lotes/pedidos/análisis directamente en `localStorage`.
- **Modo Auditoría e Impresión**: Generación e impresión de fichas técnicas oficiales sanitarias para inspecciones del INVIMA.
