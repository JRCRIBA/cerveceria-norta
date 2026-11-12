import os
import sys
import re

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
data_path = os.path.join(base_dir, 'data.js')
app_path = os.path.join(base_dir, 'app.js')
output_path = os.path.join(base_dir, 'index.html')

# Módulos y servicios forenses de arquitectura V15
services_and_components_files = [
    ('AuditLogger', os.path.join(base_dir, 'src', 'services', 'AuditLogger.js')),
    ('StorageService', os.path.join(base_dir, 'src', 'services', 'StorageService.js')),
    ('DataRepository', os.path.join(base_dir, 'src', 'services', 'DataRepository.js')),
    ('ErrorBoundary', os.path.join(base_dir, 'src', 'components', 'ErrorBoundary.js')),
    ('DiagnosticsModal', os.path.join(base_dir, 'src', 'components', 'DiagnosticsModal.js')),
    ('InventoryMovementModal', os.path.join(base_dir, 'new_movement_modal.jsx'))
]

print("================================================================")
print("   AUDITORIA FORENSE DE SINTAXIS Y COMPILACION LOCAL - NORTA BREWERY")
print("================================================================")

with open(data_path, 'r', encoding='utf-8') as f:
    data_code = f.read()

with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

# Sincronización canónica con new_bim.jsx si existe
bim_path = os.path.join(base_dir, 'new_bim.jsx')
if os.path.exists(bim_path):
    with open(bim_path, 'r', encoding='utf-8') as bf:
        bim_code = bf.read()
    bim_start = app_code.find("// COMPONENTE: BrandIdentityModule")
    app_start = app_code.find("// ==========================================================================\n// COMPONENTE: BreweryApp")
    if bim_start != -1 and app_start != -1:
        app_code = app_code[:bim_start] + bim_code + "\n\n// MODALES NUEVOS\n\n" + app_code[app_start:]
        print(f"[OK] BrandIdentityModule actualizado desde new_bim.jsx ({len(bim_code)} bytes)")

# Cargar servicios y componentes modulares
services_code_parts = []
for name, filepath in services_and_components_files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as sf:
            code = sf.read()
            services_code_parts.append(f"// === MÓDULO: {name} ===\n" + code)
            print(f"[OK] Módulo modular cargado: {name} ({len(code)} bytes)")
    else:
        print(f"[ERROR] Archivo modular no encontrado: {filepath}")

services_code = "\n\n".join(services_code_parts)

# 1. Audit unescaped multiline quotes in single/double quotes
print("\n--- AUDITORIA DE STRING LITERALS MULTILINEA ---")
lines_app = app_code.splitlines()
unclosed_count = 0
for idx, line in enumerate(lines_app, 1):
    clean = re.sub(r'//.*$', '', line)
    in_s = False
    in_d = False
    escaped = False
    for char in clean:
        if escaped:
            escaped = False
            continue
        if char == '\\':
            escaped = True
        elif char == '"' and not in_s:
            in_d = not in_d
        elif char == "'" and not in_d:
            in_s = not in_s
    if in_s:
        unclosed_count += 1
        print(f"[ALERTA] app.js L{idx}: Comilla simple (') sin cerrar en la linea! Contenido: {line}")
    if in_d:
        unclosed_count += 1
        print(f"[ALERTA] app.js L{idx}: Comilla doble (\") sin cerrar en la linea! Contenido: {line}")

if unclosed_count == 0:
    print("[OK] No se detectaron comillas sin cerrar en líneas de app.js.")

# 2. Audit key data properties in data.js
required_data_keys = [
    'info', 'brandIdentity', 'documentRepository', 'recipes', 'batches',
    'tanks', 'rawInventory', 'finishedGoods', 'clients',
    'salesOrders', 'cipLogs', 'qualityTests', 'employees', 'legal',
    'waterControlMetadata', 'waterControlLogs', 'storageIngressMetadata', 'storageIngressLogs', 'invimaControlSystem',
    'machineryAndEquipment', 'inventoryMovements', 'architectureBenchmarking'
]

print("\n--- ESTRUCTURA DE DATOS EN data.js ---")
missing_keys = [key for key in required_data_keys if f"{key}:" not in data_code]
if missing_keys:
    print(f"[ERROR] Claves de datos faltantes en data.js: {missing_keys}")
else:
    print(f"[OK] Las {len(required_data_keys)} estructuras de datos requeridas existen en data.js.")

# 3. Audit component definitions
print("\n--- DEFINICIONES DE COMPONENTES EN JS ---")
def_pattern = re.compile(r'(?:function|class|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*=?')
for idx, line in enumerate(lines_app, 1):
    for m in def_pattern.finditer(line):
        comp = m.group(1)
        if comp in ['React', 'ReactDOM', 'INITIAL_BREWERY_DATA']:
            continue
        # print first few or suppress verbose

# 4. Check JSX usages vs Definitions
full_js = data_code + "\n" + services_code + "\n" + app_code
jsx_pattern = re.compile(r'<\s*([A-Z][A-Za-z0-9_]*)')
jsx_components = set(jsx_pattern.findall(full_js))

all_defs = set(def_pattern.findall(full_js))
all_defs.add('React')
all_defs.add('ReactDOM')
all_defs.add('ErrorBoundary')
all_defs.add('DiagnosticsModal')
all_defs.add('StorageService')
all_defs.add('DataRepository')
all_defs.add('AuditLogger')

missing = jsx_components - all_defs
print(f"\n--- COMPONENTES JSX USADOS PERO NO DEFINIDOS ---")
if missing:
    print(f"[ERROR] COMPONENTES FALTANTES: {missing}")
else:
    print("[OK] Todos los componentes JSX usados tienen definición en el scope JS.")

# 5. Check ReactDOM.createRoot position
create_root_pos = app_code.rfind('ReactDOM.createRoot')
if create_root_pos != -1:
    line_num = app_code[:create_root_pos].count('\n') + 1
    total_lines = app_code.count('\n') + 1
    print(f"\n[OK] ReactDOM.createRoot está en la línea JS #{line_num} (de {total_lines} líneas en app.js).")

html_template = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NORTA - Sistema Integral de Gestión Cervecera (Brewery OS 5.0)</title>
  
  <!-- Meta SEO -->
  <meta name="description" content="Plataforma de gestión integral para Cervecería NORTA. Fuerza silenciosa, calma con carácter y aventura interior. ERP, CRM, Lotes, CIP y Cumplimiento Sanitario.">
  <meta name="author" content="Cervecería NORTA">

  <!-- Favicon Oficial NORTA -->
  <link rel="icon" type="image/png" href="./assets/logo_norta_principal.png">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Google Fonts: Linux Libertine match (Cinzel / Libre Baskerville) + Lato -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Estilos Personalizados con la Identidad NORTA -->
  <link rel="stylesheet" href="./styles.css">

  <!-- React 18 & Babel Standalone (Librerías Locales + Fallbacks CDN) -->
  <script src="./vendor/react.min.js"></script>
  <script src="./vendor/react-dom.min.js"></script>
  <script src="./vendor/babel.min.js"></script>
  
  <script>
    if (typeof React === 'undefined') {
      document.write('<script src="https://unpkg.com/react@18/umd/react.production.min.js"><\\/script>');
      document.write('<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\\/script>');
      document.write('<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\\/script>');
    }
  </script>
  <script>
    // Inicializar tema inmediatamente antes de renderizar para prevenir destellos blancos
    try {
      var savedTheme = localStorage.getItem('NORTA_THEME') || 'dark';
      document.documentElement.className = savedTheme === 'dark' ? 'theme-dark' : 'theme-light';
      document.documentElement.setAttribute('data-theme', savedTheme);
    } catch(e) {}
  </script>
</head>
<body class="theme-dark bg-[var(--bg-main)] text-[var(--text-primary)] antialiased">

  <!-- Raíz de la Aplicación React -->
  <div id="root"></div>

  <!-- Salvaguarda Arquitectónica Pre-Vuelo NORTA: Intercepción contra White Screen of Death -->
  <script>
    window.addEventListener('error', function(event) {
      var root = document.getElementById('root');
      if (root && (!root.children || root.children.length === 0)) {
        root.innerHTML = '<div class="min-h-screen bg-[#161410] text-[#f7f4ed] flex items-center justify-center p-6 norta-preflight-error">' +
          '<div class="max-w-2xl w-full p-8 rounded-2xl border-2 border-[#b89764] bg-[#1a1714] shadow-2xl space-y-6">' +
            '<div class="flex items-center gap-4 border-b border-[#2d2a24] pb-6">' +
              '<div class="w-14 h-14 rounded-2xl bg-[#0e2334] border-2 border-[#b89764] flex items-center justify-center text-3xl shadow">🛡️</div>' +
              '<div>' +
                '<span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/50 uppercase font-mono font-bold tracking-wider">' +
                  'NORTA RESILIENCE SYSTEM • FAILSAFE DE ARRANQUE' +
                '</span>' +
                '<h1 class="text-2xl font-cinzel font-bold text-[#c9b38f] mt-1">Intercepción de Fallo Pre-Vuelo</h1>' +
                '<p class="text-xs text-stone-400">Se detectó una excepción en la fase de arranque o compilación en el navegador.</p>' +
              '</div>' +
            '</div>' +
            '<div class="p-4 rounded-xl bg-black/50 border border-stone-800 text-xs font-mono text-amber-300 break-words space-y-1">' +
              '<strong class="text-stone-300 block font-sans text-xs">Mensaje del Transpilador / Runtime:</strong>' +
              '<div>' + (event.message || 'Error no identificado') + '</div>' +
              (event.filename ? '<div class="text-stone-400 text-[11px] pt-1">Origen: ' + event.filename + ':' + event.lineno + ':' + event.colno + '</div>' : '') +
            '</div>' +
            '<div class="flex items-center gap-3">' +
              '<button onclick="window.location.reload()" class="px-5 py-2.5 rounded-xl bg-[#b89764] hover:bg-[#c9b38f] text-[#1d1d1b] font-bold text-xs shadow-md transition flex items-center gap-2">' +
                '<span>🔄</span> Recargar Plataforma' +
              '</button>' +
              '<button onclick="try{localStorage.clear();}catch(e){} window.location.reload();" class="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs border border-stone-700 transition flex items-center gap-2">' +
                '<span>🧹</span> Limpiar Caché & Reiniciar' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }
    });
  </script>

  <!-- Script Integrado NORTA (Data + Servicios + Componentes Forenses + Core) -->
  <script type="text/babel">
{DATA_CODE}

// ==========================================================================
// CAPAS MODULARES DE SERVICIOS Y RESILIENCIA (ARQUITECTURA V15)
// ==========================================================================
{SERVICES_CODE}

// ==========================================================================
// NORTA CORE APPLICATION (UI & MODULOS)
// ==========================================================================
{APP_CODE}
  </script>

</body>
</html>
"""

final_html = html_template.replace('{DATA_CODE}', data_code).replace('{SERVICES_CODE}', services_code).replace('{APP_CODE}', app_code)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(final_html)

print("\n[OK] index.html reconstruido exitosamente con arquitectura modular, servicios de persistencia, telemetría y ErrorBoundaries.")
