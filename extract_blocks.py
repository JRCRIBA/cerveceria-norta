import re

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()

comp_pattern = re.compile(r'^(?:function|const|var|let)\s+([A-Z][A-Za-z0-9_]*)\b')

comp_indices = []
for idx, line in enumerate(lines):
    m = comp_pattern.match(line)
    if m:
        comp_indices.append((m.group(1), idx))

# Also find mounting block: const rootElement = ...
root_idx = None
for idx, line in enumerate(lines):
    if 'const rootElement' in line or 'ReactDOM.createRoot' in line:
        root_idx = idx
        break

print(f"Header lines: 0 to {comp_indices[0][1]-1}")
print(f"Root mounting lines: {root_idx} to {len(lines)-1}")

blocks = {}
for i in range(len(comp_indices)):
    name, start = comp_indices[i]
    if i + 1 < len(comp_indices):
        end = comp_indices[i+1][1]
    else:
        end = root_idx if root_idx is not None else len(lines)
    
    blocks[name] = "\n".join(lines[start:end]).strip()
    print(f"Component '{name}': lines {start} to {end-1} ({end - start} lines)")
