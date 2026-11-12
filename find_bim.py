with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = None
end_idx = None
for i, l in enumerate(lines):
    if "function BrandIdentityModule" in l:
        start_idx = i
    if start_idx is not None and i > start_idx:
        # Looking for next top-level function or component comment
        if l.startswith("// COMPONENTE:") or l.startswith("function ") or l.startswith("// =========================================================================="):
            if i > start_idx + 50:
                end_idx = i
                break

print(f"BrandIdentityModule starts at line {start_idx+1} and ends at line {end_idx+1}")
