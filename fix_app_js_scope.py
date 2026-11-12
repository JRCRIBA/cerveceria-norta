import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Remove premature root render around line 1510
old_render_block = """// RENDERIZAR LA APLICACIÓN
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<BreweryApp />);
}"""

app_code = app_code.replace(old_render_block, "")

# 2. Append root render to the very end of app.js
new_render_block = """

// ==========================================================================
// RENDERIZAR LA APLICACIÓN REACT (MONTAJE AL FINAL TRAS DEFINIR COMPONENTES)
// ==========================================================================
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<BreweryApp />);
}
"""

app_code += new_render_block

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js corregido exitosamente. El montaje React quedó trasladado al final del archivo.")
