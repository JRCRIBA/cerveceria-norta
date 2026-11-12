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

comp_positions.append(('END_OF_FILE', len(lines) + 1))

print("=== COMPONENT DEPENDENCIES IN APP.JS ===")
jsx_regex = re.compile(r'<\s*([A-Z][A-Za-z0-9_]*)[\s/>]')

for i in range(len(comp_positions) - 1):
    name, start_line = comp_positions[i]
    end_line = comp_positions[i+1][1] - 1
    
    comp_body = "\n".join(lines[start_line-1:end_line])
    
    used_components = set()
    for m in jsx_regex.finditer(comp_body):
        used_comp = m.group(1)
        if used_comp != name:
            used_components.add(used_comp)
            
    print(f"Component '{name}' (Lines {start_line}-{end_line}) uses:")
    if used_components:
        for u in sorted(used_components):
            print(f"   -> <{u}>")
    else:
        print("   -> (None)")
