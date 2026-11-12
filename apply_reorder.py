import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()

comp_pattern = re.compile(r'^(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\b')

comp_indices = []
for idx, line in enumerate(lines):
    m = comp_pattern.match(line)
    if m:
        comp_indices.append((m.group(1), idx))

# Header lines: up to first component
header = "\n".join(lines[:comp_indices[0][1]]).strip()

# Find root mounting block
root_idx = None
for idx, line in enumerate(lines):
    if 'const rootElement' in line or 'ReactDOM.createRoot' in line:
        root_idx = idx
        break

mount_block = "\n".join(lines[root_idx:]).strip()

blocks = {}
for i in range(len(comp_indices)):
    name, start = comp_indices[i]
    if i + 1 < len(comp_indices):
        end = comp_indices[i+1][1]
    else:
        end = root_idx if root_idx is not None else len(lines)
    
    # Clean up trailing blank lines
    block_lines = lines[start:end]
    blocks[name] = "\n".join(block_lines).strip()

desired_order = [
    'NavItem',
    'WaterControlFormSection',
    'UploadInvimaDocModal',
    'NewInvimaProgramModal',
    'NewDocumentModal',
    'LogFermentationModal',
    'NewBatchModal',
    'BatchDetailModal',
    'TankDetailModal',
    'NewOrderModal',
    'NewCipModal',
    'NewLabModal',
    'RecipeDetailModal',
    'InvimaControlSystemModule',
    'DocumentRepositoryModule',
    'B2bPortalModule',
    'ArchitectureModule',
    'DashboardModule',
    'ProductionModule',
    'ErpModule',
    'CrmModule',
    'ProcessesModule',
    'HrModule',
    'LegalModule',
    'BrandIdentityModule',
    'BreweryApp'
]

print(f"Extracted {len(blocks)} component blocks.")
missing = set(blocks.keys()) - set(desired_order)
if missing:
    print(f"WARNING: Missing components in desired_order: {missing}")

new_app_js = header + "\n\n"

for name in desired_order:
    if name in blocks:
        new_app_js += f"// ==========================================================================\n"
        new_app_js += f"// COMPONENTE: {name}\n"
        new_app_js += f"// ==========================================================================\n"
        new_app_js += blocks[name] + "\n\n"
    else:
        print(f"ERROR: {name} not found in extracted blocks!")

new_app_js += f"// ==========================================================================\n"
new_app_js += f"// RENDERIZAR LA APLICACION REACT (MONTAJE AL FINAL TRAS DEFINIR COMPONENTES)\n"
new_app_js += f"// ==========================================================================\n"
new_app_js += mount_block + "\n"

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_app_js)

print("app.js reordenado exitosamente!")
