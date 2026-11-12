import re, sys

def check_file():
    with open('app.js', 'r', encoding='utf-8') as f:
        app_text = f.read()
    with open('data.js', 'r', encoding='utf-8') as f:
        data_text = f.read()
    with open('index.html', 'r', encoding='utf-8') as f:
        html_text = f.read()

    full_js = data_text + "\n" + app_text

    print("=== CHECKING COMPONENT DEFINITIONS AND USAGES IN app.js + data.js ===")

    # Find component definitions: function ComponentName or const ComponentName =
    def_pattern = re.compile(r'(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*=?')
    definitions = {}
    for line_num, line in enumerate(full_js.splitlines(), 1):
        for m in def_pattern.finditer(line):
            comp_name = m.group(1)
            if comp_name not in definitions:
                definitions[comp_name] = line_num

    # Find JSX components used: <ComponentName ...> or <ComponentName/>
    jsx_pattern = re.compile(r'<\s*([A-Z][A-Za-z0-9_]*)')
    jsx_usages = {}
    for line_num, line in enumerate(full_js.splitlines(), 1):
        for m in jsx_pattern.finditer(line):
            comp_name = m.group(1)
            if comp_name not in jsx_usages:
                jsx_usages[comp_name] = []
            jsx_usages[comp_name].append(line_num)

    print(f"Total defined React components / capital identifiers: {len(definitions)}")

    # Check specifically requested components:
    target_components = [
        'InvimaControlSystemModule',
        'WaterControlFormSection',
        'UploadInvimaDocModal',
        'NewInvimaProgramModal',
        'BreweryApp',
        'App'
    ]

    for comp in target_components:
        def_line = definitions.get(comp, None)
        usages = jsx_usages.get(comp, [])
        print(f"Component '{comp}': Defined line = {def_line}, Usages at lines = {usages}")
        if usages and def_line is not None:
            first_usage = min(usages)
            if def_line > first_usage:
                print(f"  ⚠️ WARNING: '{comp}' used at line {first_usage} before definition at line {def_line}!")
        elif usages and def_line is None:
            print(f"  ❌ ERROR: '{comp}' used at lines {usages} but NEVER DEFINED!")

    # Check all used JSX components
    print("\n--- ALL JSX USAGES VS DEFINITIONS ---")
    for comp, lines in jsx_usages.items():
        def_line = definitions.get(comp)
        if def_line is None:
            print(f"❌ UNDEFINED COMPONENT USED IN JSX: <{comp}> at lines {lines}")
        else:
            first_usage = min(lines)
            if def_line > first_usage:
                print(f"⚠️ COMPONENT <{comp}> DEFINED AFTER FIRST USAGE! Def line: {def_line}, First usage line: {first_usage}")
            else:
                print(f"✅ <{comp}> defined at L{def_line}, used at L{lines[:3]}...")

    # Check ReactDOM.createRoot position
    createroot_lines = [i+1 for i, l in enumerate(full_js.splitlines()) if 'createRoot' in l]
    print(f"\nReactDOM.createRoot lines in full concatenated code: {createroot_lines}")
    print(f"Total lines in concatenated JS: {len(full_js.splitlines())}")

    # Check index.html for createRoot as well
    html_createroot_lines = [i+1 for i, l in enumerate(html_text.splitlines()) if 'createRoot' in l]
    print(f"ReactDOM.createRoot lines in index.html: {html_createroot_lines}")
    print(f"Total lines in index.html: {len(html_text.splitlines())}")

if __name__ == '__main__':
    check_file()
