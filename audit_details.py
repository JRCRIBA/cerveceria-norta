import os
import re

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')

with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Modules from router:
# invima_system -> InvimaControlSystemModule
# brand -> BrandIdentityModule
# dashboard -> DashboardModule
# production -> ProductionModule
# erp -> ErpModule
# crm -> CrmModule
# b2b_portal -> B2bPortalModule
# docs -> DocumentRepositoryModule
# processes -> ProcessesModule
# hr -> HrModule
# legal -> LegalModule
# architecture -> ArchitectureModule

modules = [
    'InvimaControlSystemModule',
    'BrandIdentityModule',
    'DashboardModule',
    'ProductionModule',
    'ErpModule',
    'CrmModule',
    'B2bPortalModule',
    'DocumentRepositoryModule',
    'ProcessesModule',
    'HrModule',
    'LegalModule',
    'ArchitectureModule'
]

print("=== AUDIT OF MODULE SIGNATURES & PROPS ===")
for m in modules:
    match = re.search(r'function\s+' + m + r'\s*\(([^)]*)\)', text)
    if match:
        params = match.group(1).strip()
        print(f"\n[{m}]")
        print(f"  Params: {params}")
        # Look for export buttons or mentions in module code
        m_start = text.find(f"function {m}")
        # Next function or 15000 chars
        m_end = text.find("\nfunction ", m_start + 20)
        if m_end == -1:
            m_end = m_start + 15000
        m_body = text[m_start:m_end]
        
        has_export = 'exportToCSV' in m_body or 'onExportCSV' in m_body or 'Exportar' in m_body
        has_delete = 'delete' in m_body.lower() or 'eliminar' in m_body.lower() or 'retirar' in m_body.lower()
        has_add = 'add' in m_body.lower() or 'nuevo' in m_body.lower() or 'registrar' in m_body.lower()
        has_table = '<table' in m_body
        
        print(f"  Has export? {has_export}")
        print(f"  Has delete/retire action? {has_delete}")
        print(f"  Has add/create action? {has_add}")
        print(f"  Has table element? {has_table}")
    else:
        print(f"\n[NOT FOUND: {m}]")
