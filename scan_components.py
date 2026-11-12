import re

with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in app.js: {len(lines)}")

# Find top level functions/components in app.js
comp_pattern = re.compile(r'^(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\b')

components = []
for idx, line in enumerate(lines, 1):
    m = comp_pattern.match(line)
    if m:
        comp_name = m.group(1)
        components.append((comp_name, idx))

print("Top-level Component/Const declarations in app.js:")
for name, line_num in components:
    print(f"  Line {line_num:4d}: {name}")

