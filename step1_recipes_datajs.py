import sys

with open("data.js", "r", encoding="utf-8") as f:
    djs = f.read()

recipes_start = djs.find("recipes: [")
if recipes_start == -1:
    print("Error: recipes: [ not found in data.js")
    sys.exit(1)

if 'name: "NORTA Montaña"' not in djs:
    with open("test_recipes_syntax.py", "r", encoding="utf-8") as f:
        tcode = f.read()
    start_rec = tcode.find('FOUR_RECIPES_JS = """') + len('FOUR_RECIPES_JS = """')
    end_rec = tcode.find('"""', start_rec)
    four_recipes_code = tcode[start_rec:end_rec]

    insert_pos = recipes_start + len("recipes: [\n")
    djs = djs[:insert_pos] + four_recipes_code + "\n" + djs[insert_pos:]
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(djs)
    print("Inserted 4 canonical recipes into data.js")
else:
    print("NORTA Montaña already present in data.js")
