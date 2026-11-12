import os

# Let us verify the replace points in index.html
with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = None
end_idx = None
for i, l in enumerate(lines):
    if "function BrandIdentityModule" in l:
        start_idx = i
    if "function BreweryApp" in l:
        end_idx = i
        break

print(f"BIM spans lines {start_idx+1} to {end_idx+1}")
