import os
import shutil

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'
public_dir = os.path.join(base_dir, 'public')

os.makedirs(public_dir, exist_ok=True)

# Copy assets folder if exists
src_assets = os.path.join(base_dir, 'assets')
dst_assets = os.path.join(public_dir, 'assets')
if os.path.exists(src_assets):
    if os.path.exists(dst_assets):
        shutil.rmtree(dst_assets)
    shutil.copytree(src_assets, dst_assets)

# Copy invima_docs folder if exists
src_docs = os.path.join(base_dir, 'invima_docs')
dst_docs = os.path.join(public_dir, 'invima_docs')
if os.path.exists(src_docs):
    if os.path.exists(dst_docs):
        shutil.rmtree(dst_docs)
    shutil.copytree(src_docs, dst_docs)

# Copy vendor folder if exists
src_vendor = os.path.join(base_dir, 'vendor')
dst_vendor = os.path.join(public_dir, 'vendor')
if os.path.exists(src_vendor):
    if os.path.exists(dst_vendor):
        shutil.rmtree(dst_vendor)
    shutil.copytree(src_vendor, dst_vendor)

print("Archivos públicos (assets, invima_docs, vendor) copiados a public/ para Next.js.")
