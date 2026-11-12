import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()

comp_pattern = re.compile(r'^(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\b')

comp_positions = []
for idx, line in enumerate(lines, 1):
    m = comp_pattern.match(line)
    if m:
        comp_positions.append((m.group(1), idx))

for name, line_num in comp_positions:
    print(f"L{line_num:4d}: {name}")
