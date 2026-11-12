import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

lines = app_js.splitlines()
defs = []

def_pattern = re.compile(r'^(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*=?', re.MULTILINE)

for idx, line in enumerate(lines, 1):
    m = re.search(r'(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\s*=?', line)
    if m:
        defs.append(f"Line {idx}: {m.group(1)} -> {line[:60]}")

with open('comp_summary.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(defs))

print("Done writing comp_summary.txt")
