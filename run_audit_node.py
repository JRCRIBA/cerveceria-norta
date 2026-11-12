import subprocess
import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

with open('data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

output = []
output.append("=== AUDIT RESULTS ===")

# 1. Check line by line for unclosed quotes across newlines
def check_unclosed_string(code, filename):
    lines = code.splitlines()
    for idx, line in enumerate(lines, 1):
        # strip comments
        clean_line = re.sub(r'//.*$', '', line)
        # count double quotes and single quotes (excluding escaped ones)
        dquotes = len(re.findall(r'(?<!\\)"', clean_line))
        squotes = len(re.findall(r"(?<!\\)'", clean_line))
        # template literals use backticks ` which allow multiline
        if dquotes % 2 != 0:
            output.append(f"[{filename}] Line {idx}: Odd number of double quotes! Content: {clean_line.strip()}")
        if squotes % 2 != 0:
            output.append(f"[{filename}] Line {idx}: Odd number of single quotes! Content: {clean_line.strip()}")

output.append("\n--- QUOTE BALANCE CHECK ---")
check_unclosed_string(data_js, "data.js")
check_unclosed_string(app_js, "app.js")

with open('audit_result.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Audit written to audit_result.txt")
