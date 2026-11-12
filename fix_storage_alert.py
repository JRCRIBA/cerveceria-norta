with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# Fix multiline alert string
app_code = app_code.replace(
    'alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");',
    'alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");'
)

app_code = app_code.replace(
    'alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");',
    'alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");'
)

# Also replace raw multiline literal if exists
raw_multiline = """alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...
(Conserva la estructura, membrete y tabla original de Almacenamiento).");"""

clean_multiline = 'alert("Exportando Formato de Ingreso de Materiales FO-ALM-001 en Excel (.xlsx)...\\n(Conserva la estructura, membrete y tabla original de Almacenamiento).");'

app_code = app_code.replace(raw_multiline, clean_multiline)

# Check if StorageIngressFormSection is duplicated and keep only one definition
first_pos = app_code.find("function StorageIngressFormSection")
if first_pos != -1:
    second_pos = app_code.find("function StorageIngressFormSection", first_pos + 1)
    if second_pos != -1:
        # Cut off duplicate from second_pos to next component or render block
        next_block = app_code.find("// ==========================================================================", second_pos)
        if next_block != -1:
            app_code = app_code[:second_pos] + app_code[next_block:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js depurado y comillas multilinea corregidas.")
