import os
import json

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'

# 1. Create Package.json
package_json = {
    "name": "cerveceria-norta-os",
    "version": "5.0.0",
    "description": "Plataforma Next.js de Gestión Cervecera NORTA OS - Enterprise Suite 5.0",
    "private": True,
    "scripts": {
        "dev": "next dev -p 3000",
        "build": "next build",
        "start": "next start -p 3000"
    },
    "dependencies": {
        "next": "^14.2.15",
        "react": "^18.3.1",
        "react-dom": "^18.3.1"
    }
}

with open(os.path.join(base_dir, 'package.json'), 'w', encoding='utf-8') as f:
    json.dump(package_json, f, indent=2)

# 2. Create next.config.js
next_config = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
"""
with open(os.path.join(base_dir, 'next.config.js'), 'w', encoding='utf-8') as f:
    f.write(next_config)

# 3. Create App Router Directory Structure
app_dir = os.path.join(base_dir, 'app')
components_dir = os.path.join(base_dir, 'src', 'components')
data_dir = os.path.join(base_dir, 'src', 'data')

os.makedirs(app_dir, exist_ok=True)
os.makedirs(components_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

# 4. Create app/layout.js
layout_js = """import './globals.css';

export const metadata = {
  title: 'NORTA - Next.js Enterprise Suite 5.0',
  description: 'Plataforma Next.js de gestión integral para Cervecería NORTA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/assets/logo_norta_principal.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body class="theme-light bg-[#f7f4ed] text-[#111827] antialiased selection:bg-[#0e2334] selection:text-white">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
"""
with open(os.path.join(app_dir, 'layout.js'), 'w', encoding='utf-8') as f:
    f.write(layout_js)

# 5. Create app/globals.css from styles.css
with open(os.path.join(base_dir, 'styles.css'), 'r', encoding='utf-8') as f:
    styles_content = f.read()

globals_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

""" + styles_content

with open(os.path.join(app_dir, 'globals.css'), 'w', encoding='utf-8') as f:
    f.write(globals_css)

# 6. Copy data.js to src/data/initialData.js
with open(os.path.join(base_dir, 'data.js'), 'r', encoding='utf-8') as f:
    data_code = f.read()

# Replace const INITIAL_BREWERY_DATA = ... with export const INITIAL_BREWERY_DATA = ...
data_code_export = data_code.replace("const INITIAL_BREWERY_DATA = {", "export const INITIAL_BREWERY_DATA = {")

with open(os.path.join(data_dir, 'initialData.js'), 'w', encoding='utf-8') as f:
    f.write(data_code_export)

print("Estructura base de Next.js App Router generada exitosamente.")
