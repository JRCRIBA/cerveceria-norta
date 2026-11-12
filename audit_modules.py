import os
import re

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
app_path = os.path.join(base_dir, 'app.js')

with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

headers = re.findall(r'// =+\s*\n// COMPONENTE:\s*([^\n]+)', text)
print('--- Component Headers ---')
for h in headers:
    print('-', h)

brewery_pos = text.find('function BreweryApp')
if brewery_pos != -1:
    brewery_code = text[brewery_pos:]
    tabs = re.findall(r"activeTab\s*===\s*'([^']+)'", brewery_code)
    print('\n--- Active Tab Conditions in BreweryApp ---')
    print(list(dict.fromkeys(tabs)))
    
    # Also look for navigation items in sidebar/navbar
    nav_items = re.findall(r"id:\s*'([^']+)',\s*label:\s*'([^']+)'", brewery_code)
    print('\n--- Nav Items ---')
    for nid, nlabel in nav_items:
        print(f"  {nid}: {nlabel}")
