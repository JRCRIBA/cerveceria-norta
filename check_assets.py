import re, json

print("Reading index.html...")
with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Verify that all 5 images exist
import os
for img in ["cerveza_montana.jpg", "cerveza_tempestad.jpg", "cerveza_niebla.jpg", "cerveza_cumbre.jpg", "arte_elaboracion_norta.jpg"]:
    p = os.path.join("assets", img)
    print(f"Asset {img}: exists={os.path.exists(p)}, size={os.path.getsize(p) if os.path.exists(p) else 0}")

print("Python script ready for execution.")
