import json
import re

with open('data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

# Check raw count
raw_matches = re.findall(r'id:\s*["\']RAW-(\d+)["\']', data_content)
print('Total RAW items count:', len(raw_matches))
assert len(raw_matches) == 32, f"Expected 32 RAW items, found {len(raw_matches)}"

# Check machinery count
mach_matches = re.findall(r'id:\s*["\']ACT-[^"\']+["\']', data_content)
print('Total Machinery items count:', len(mach_matches))
assert len(mach_matches) == 9, f"Expected 9 Machinery items, found {len(mach_matches)}"
assert "ACT-CRB-01" in data_content, "ACT-CRB-01 missing from data.js"

# Check forbidden term
assert 'norta máxima' not in data_content.lower() and 'norta maxima' not in data_content.lower(), "Forbidden term detected!"

print("[SUCCESS] All data verifications passed perfectly!")
