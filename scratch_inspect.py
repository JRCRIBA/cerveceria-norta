with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

import re
start = text.find("recipes:")
end = text.find("inventory:", start)
sub = text[start:end]
names = re.findall(r'name:\s*"([^"]+)"', sub)
print("Recipe names:", names)
