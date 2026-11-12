import shutil, os, re

print("Backing up index.html and data.js...")
shutil.copyfile("index.html", "index.html.bak_gamma")
shutil.copyfile("data.js", "data.js.bak_gamma")
print("Backups created.")
