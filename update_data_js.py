import json
import re

with open('invima_seed.json', 'r', encoding='utf-8') as f:
    invima_seed = json.load(f)

with open('data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# Replace or insert invimaControlSystem into INITIAL_BREWERY_DATA
invima_js_str = "  // 9. MÓDULO CONTROL SANITARIO INVIMA (11 PROGRAMAS Y CARPETAS OFICIALES)\n"
invima_js_str += "  invimaControlSystem: " + json.dumps(invima_seed, ensure_ascii=False, indent=4) + ",\n"

# Insert before architectureBenchmarking or info
if "invimaControlSystem:" in data_content:
    # Replace existing
    data_content = re.sub(r'  invimaControlSystem:\s*\[[\s\S]*?\],\n', invima_js_str, data_content)
else:
    # Insert right before architectureBenchmarking
    data_content = data_content.replace(
        "  // 8. MATRIZ COMPARATIVA INTEGRADA",
        invima_js_str + "\n  // 8. MATRIZ COMPARATIVA INTEGRADA"
    )

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print("data.js actualizado con invimaControlSystem correctamente.")
