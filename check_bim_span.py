with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

start = text.find("function BrandIdentityModule")
end = text.find("function BreweryApp")
print("BrandIdentityModule length in characters:", end - start)
print("Start snippet:\n", text[start:start+300])
