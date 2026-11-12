import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update localStorage key to V8
app_code = app_code.replace("CERVECERIA_NORTA_DATA_V7", "CERVECERIA_NORTA_DATA_V8")
app_code = app_code.replace("'CERVECERIA_NORTA_DATA_V6'", "'CERVECERIA_NORTA_DATA_V6', 'CERVECERIA_NORTA_DATA_V7'")

# 2. Update NavItem in sidebar: Move Control INVIMA right below Dashboard Ejecutivo and make title clear and prominent
sidebar_new = """            <NavItem icon="📊" label="Dashboard Ejecutivo" active={activeModule === 'dashboard'} badge="En Vivo" badgeColor="bg-[#3a452d]/80 text-white" onClick={() => setActiveModule('dashboard')} theme={theme} />
            <NavItem icon="🏛️" label="Control INVIMA (11 Carpetas)" active={activeModule === 'invima_system'} badge="11 Carpetas" badgeColor="bg-[#0e2334] text-[#c9b38f] font-bold shadow" onClick={() => setActiveModule('invima_system')} theme={theme} />"""

app_code = re.sub(
    r'<NavItem icon="📊" label="Dashboard Ejecutivo"[\s\S]*?theme={theme} />',
    sidebar_new,
    app_code
)

# Remove old NavItem line if present elsewhere
app_code = app_code.replace(
    """<NavItem icon="🏛️" label="Documentos del sistema de control INVIMA" active={activeModule === 'invima_system'} badge={`${(data.invimaControlSystem || []).length} Carpetas`} badgeColor="bg-[#0e2334] text-white font-bold" onClick={() => setActiveModule('invima_system')} theme={theme} />\n""",
    ""
)

# 3. Add direct shortcut button in Header Topbar
header_shortcut = """            <button onClick={() => setActiveModule('invima_system')} className="btn-norta-primary text-xs font-bold shadow flex items-center gap-1.5 bg-[#0e2334] text-white border border-[#c9b38f]" title="Abrir las 11 Carpetas del Sistema de Control INVIMA">
              <span>🏛️</span>
              <span>11 Carpetas INVIMA</span>
            </button>"""

app_code = app_code.replace(
    """<button onClick={() => setModalType('uploadInvimaDoc')} className="btn-norta-primary text-xs font-bold shadow" title="Subir Documento al Sistema de Control INVIMA">
              📤 Subir Doc INVIMA
            </button>""",
    header_shortcut + """\n            <button onClick={() => setModalType('uploadInvimaDoc')} className="btn-norta-primary text-xs font-bold shadow" title="Subir Documento al Sistema de Control INVIMA">
              📤 Subir Doc INVIMA
            </button>"""
)

# 4. Add direct shortcut button in Dashboard Banner
dashboard_shortcut = """          <button onClick={() => onSelectModule('invima_system')} className="btn-norta-primary text-xs bg-[#0e2334] text-white border border-[#c9b38f]">🏛️ Abrir 11 Carpetas INVIMA</button>"""

app_code = app_code.replace(
    """<button onClick={() => onSelectModule('b2b_portal')} className="btn-norta-secondary text-xs">🛒 Portal B2B Clientes</button>""",
    dashboard_shortcut + """\n          <button onClick={() => onSelectModule('b2b_portal')} className="btn-norta-secondary text-xs">🛒 Portal B2B Clientes</button>"""
)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js actualizado con acceso prominente y directo a las 11 Carpetas INVIMA.")
