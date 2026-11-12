import os
import re

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta'

with open(os.path.join(base_dir, 'app.js'), 'r', encoding='utf-8') as f:
    app_code = f.read()

# Remove old React hooks declaration: const { useState, useEffect, useMemo } = React;
app_code = re.sub(r'const\s*{\s*useState,\s*useEffect,\s*useMemo\s*}\s*=\s*React;', '', app_code)

# Remove ReactDOM.createRoot mount at the bottom of app.js
render_pos = app_code.rfind("// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT")
if render_pos != -1:
    app_code = app_code[:render_pos]

next_app_header = """'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_BREWERY_DATA } from '../data/initialData';

"""

next_app_code = next_app_header + app_code + "\n\nexport default BreweryApp;\n"

with open(os.path.join(base_dir, 'src', 'components', 'NextBreweryApp.js'), 'w', encoding='utf-8') as f:
    f.write(next_app_code)

# Create app/page.js
page_js = """'use client';

import dynamic from 'next/dynamic';

const NextBreweryApp = dynamic(() => import('../src/components/NextBreweryApp'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f4ed]">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-[#0e2334] flex items-center justify-center text-[#c9b38f] font-bold text-xl mx-auto shadow-lg border border-[#c9b38f]">
          NORTA
        </div>
        <h2 className="brand-title text-xl font-bold text-[#0e2334]">Cervecería NORTA OS 5.0</h2>
        <p className="text-xs text-[#4d3720] font-mono font-bold animate-pulse">Cargando Next.js App Router Engine...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return <NextBreweryApp />;
}
"""

with open(os.path.join(base_dir, 'app', 'page.js'), 'w', encoding='utf-8') as f:
    f.write(page_js)

print("src/components/NextBreweryApp.js y app/page.js creados exitosamente.")
