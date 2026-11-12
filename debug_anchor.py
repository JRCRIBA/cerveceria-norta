import os

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')

with open(app_path, 'r', encoding='utf-8') as f:
    code = f.read()

lines = code.splitlines()
for i, l in enumerate(lines[5300:5330], start=5301):
    print(f"{i}: {repr(l)}")
