import sys

# Script to update index.html with the complete Gamma integration
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update recipes in INITIAL_BREWERY_DATA
# Look for recipes: [
recipes_start = html.find("recipes: [")
if recipes_start == -1:
    print("Error: recipes: [ not found")
    sys.exit(1)

# Check if NORTA Montaña is already in recipes
if 'name: "NORTA Montaña"' not in html:
    # Read the four recipes snippet from test_recipes_syntax.py
    with open("test_recipes_syntax.py", "r", encoding="utf-8") as f:
        tcode = f.read()
    start_rec = tcode.find('FOUR_RECIPES_JS = """') + len('FOUR_RECIPES_JS = """')
    end_rec = tcode.find('"""', start_rec)
    four_recipes_code = tcode[start_rec:end_rec]

    # Insert right after 'recipes: [\n'
    insert_pos = recipes_start + len("recipes: [\n")
    html = html[:insert_pos] + four_recipes_code + "\n" + html[insert_pos:]
    print("Inserted 4 canonical recipes into index.html")
else:
    print("NORTA Montaña already present in recipes")

# Save updated
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Pass 1 completed successfully.")
