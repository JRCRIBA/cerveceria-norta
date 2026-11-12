import re

with open('data.js', 'r', encoding='utf-8') as f:
    code = f.read()

raw_matches = re.findall(r'id:\s*["\']RAW-(\d+)["\']', code)
print('Existing RAW IDs count:', len(raw_matches))
print('Max RAW ID number:', max(map(int, raw_matches)) if raw_matches else 0)

act_matches = re.findall(r'id:\s*["\'](ACT-[^"\']+)["\']', code)
print('Existing ACT IDs:', act_matches)
