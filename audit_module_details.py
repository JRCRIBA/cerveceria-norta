import os
import re
import sys

# Force utf-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')

with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

modules = {
    'InvimaControlSystemModule': text.find('function InvimaControlSystemModule'),
    'BrandIdentityModule': text.find('function BrandIdentityModule'),
    'DashboardModule': text.find('function DashboardModule'),
    'ProductionModule': text.find('function ProductionModule'),
    'ErpModule': text.find('function ErpModule'),
    'CrmModule': text.find('function CrmModule'),
    'B2bPortalModule': text.find('function B2bPortalModule'),
    'DocumentRepositoryModule': text.find('function DocumentRepositoryModule'),
    'ProcessesModule': text.find('function ProcessesModule'),
    'HrModule': text.find('function HrModule'),
    'LegalModule': text.find('function LegalModule'),
    'ArchitectureModule': text.find('function ArchitectureModule')
}

sorted_modules = sorted(modules.items(), key=lambda x: x[1])

for i in range(len(sorted_modules)):
    name, start = sorted_modules[i]
    end = sorted_modules[i+1][1] if i+1 < len(sorted_modules) else text.find('function BreweryApp')
    code = text[start:end]
    
    tabs = re.findall(r"tab\s*===\s*'([^']+)'", code)
    set_tabs = list(dict.fromkeys(tabs))
    tables = len(re.findall(r'<table', code))
    
    print(f"\nMODULE: {name} (size: {len(code)} bytes)")
    print(f"  Tabs: {set_tabs}")
    print(f"  Table count: {tables}")
    print(f"  Export to CSV present? {'export' in code.lower()}")
    print(f"  Manual add present? {'nuevo' in code.lower() or 'agregar' in code.lower() or 'add' in code.lower()}")
    print(f"  Manual delete present? {'eliminar' in code.lower() or 'delete' in code.lower() or 'retirar' in code.lower()}")
