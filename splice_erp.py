import os
import re

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')
new_erp_path = os.path.join(base_dir, 'new_erp_module.jsx')
new_modal_path = os.path.join(base_dir, 'new_movement_modal.jsx')

with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

with open(new_erp_path, 'r', encoding='utf-8') as f:
    new_erp_code = f.read()

with open(new_modal_path, 'r', encoding='utf-8') as f:
    new_modal_code = f.read()

# 1. Replace ErpModule
# ErpModule starts at '// ==========================================================================\n// COMPONENTE: ErpModule'
# ErpModule ends right before '// ==========================================================================\n// COMPONENTE: CrmModule'
erp_start = app_code.find("// COMPONENTE: ErpModule")
if erp_start == -1:
    raise Exception("Could not find start of ErpModule in app.js")

# Find the header before ErpModule if any
sep_before_erp = app_code.rfind("// ======", 0, erp_start)
if sep_before_erp != -1 and (erp_start - sep_before_erp) < 100:
    erp_start = sep_before_erp

crm_start = app_code.find("// COMPONENTE: CrmModule")
if crm_start == -1:
    raise Exception("Could not find start of CrmModule in app.js")

sep_before_crm = app_code.rfind("// ======", 0, crm_start)
if sep_before_crm != -1 and (crm_start - sep_before_crm) < 100:
    erp_end = sep_before_crm
else:
    erp_end = crm_start

app_code = app_code[:erp_start] + new_erp_code + "\n\n" + app_code[erp_end:]
print(f"[OK] ErpModule replaced successfully. Length: {len(new_erp_code)} bytes.")

# 2. Insert InventoryMovementModal before BreweryApp
brewery_start = app_code.find("// COMPONENTE: BreweryApp")
if brewery_start == -1:
    raise Exception("Could not find BreweryApp in app.js")

sep_before_brewery = app_code.rfind("// ======", 0, brewery_start)
if sep_before_brewery != -1 and (brewery_start - sep_before_brewery) < 100:
    insert_pos = sep_before_brewery
else:
    insert_pos = brewery_start

# Check if InventoryMovementModal is already in app_code
if "function InventoryMovementModal" not in app_code:
    app_code = app_code[:insert_pos] + new_modal_code + "\n\n" + app_code[insert_pos:]
    print(f"[OK] InventoryMovementModal inserted successfully before BreweryApp. Length: {len(new_modal_code)} bytes.")
else:
    print("[INFO] InventoryMovementModal already exists in app.js.")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("[OK] app.js saved successfully after inserting ErpModule and InventoryMovementModal.")
