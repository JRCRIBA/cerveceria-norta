import re, sys

def audit():
    with open('data.js', 'r', encoding='utf-8') as f:
        data_js = f.read()
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    print("=== AUDIT START ===")
    
    # 1. Check for unescaped newlines inside "..." or '...'
    lines = app_js.splitlines()
    in_dquote = False
    in_squote = False
    for idx, line in enumerate(lines, 1):
        # simple check for raw unescaped multi-line quotes
        # count quotes not preceded by backslash
        pass

    # Better check for syntax by invoking node if available or regex checking string literals
    # Check for multiline string literals in app.js
    pattern_multiline_str = re.compile(r'(?<!\\)(?:"[^"\\]*(?:\\.[^"\\]*)*\n|' + r"'[^'\\]*(?:\\.[^'\\]*)*\n)")
    matches = list(pattern_multiline_str.finditer(app_js))
    print(f"Multiline string literal violations in app.js: {len(matches)}")
    for m in matches[:10]:
        start = m.start()
        line_no = app_js[:start].count('\n') + 1
        snippet = app_js[start:start+100].replace('\n', '\\n')
        print(f"  L{line_no}: {snippet}")

    # Check data.js multiline string literal violations
    matches_data = list(pattern_multiline_str.finditer(data_js))
    print(f"Multiline string literal violations in data.js: {len(matches_data)}")
    for m in matches_data[:10]:
        start = m.start()
        line_no = data_js[:start].count('\n') + 1
        snippet = data_js[start:start+100].replace('\n', '\\n')
        print(f"  L{line_no}: {snippet}")

    # Check for undefined component usages
    def_pattern = re.compile(r'(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*=?')
    full_js = data_js + "\n" + app_js
    defs = set(m.group(1) for m in def_pattern.finditer(full_js))
    
    jsx_pattern = re.compile(r'<\s*([A-Z][A-Za-z0-9_]*)')
    jsx_uses = set(m.group(1) for m in jsx_pattern.finditer(full_js))

    missing = jsx_uses - defs
    print(f"\nJSX components used but NOT defined in JS scope: {missing}")

    # Check where components are defined in app.js vs createRoot
    create_root_pos = app_js.rfind('ReactDOM.createRoot')
    print(f"\nReactDOM.createRoot position in app.js char offset: {create_root_pos}")
    if create_root_pos != -1:
        line_no = app_js[:create_root_pos].count('\n') + 1
        print(f"ReactDOM.createRoot line number: L{line_no} out of {len(lines)} lines")

    # Check for components defined AFTER createRoot
    if create_root_pos != -1:
        after_code = app_js[create_root_pos:]
        after_defs = [m.group(1) for m in def_pattern.finditer(after_code)]
        print(f"Components defined AFTER ReactDOM.createRoot: {after_defs}")

if __name__ == '__main__':
    audit()
