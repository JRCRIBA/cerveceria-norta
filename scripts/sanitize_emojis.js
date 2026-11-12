const fs = require('fs');

// Lucide SVG Icons to add to both index.html and NextBreweryApp.js if missing
const extraSvgIcons = `
function SvgSearch({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function SvgX({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}

function SvgCheck({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function SvgAlertCircle({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  );
}

function SvgRefresh({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  );
}

function SvgPackage({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/>
    </svg>
  );
}

function SvgClipboard({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    </svg>
  );
}

function SvgPrinter({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>
    </svg>
  );
}

function SvgBuilding({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/>
    </svg>
  );
}

function SvgBeer({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>
    </svg>
  );
}

function SvgUsers({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function SvgShoppingCart({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}

function SvgScale({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}

function SvgCompass({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  );
}

function SvgLayoutDashboard({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  );
}

function SvgFlame({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}

function SvgWheat({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"/><path d="M11.47 17.47 13 19l1.53-1.53a3.5 3.5 0 0 0 0-4.94L13 11l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z"/><path d="M15.47 13.47 17 15l1.53-1.53a3.5 3.5 0 0 0 0-4.94L17 7l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z"/>
    </svg>
  );
}

function SvgFlaskConical({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>
    </svg>
  );
}

function SvgBoxes({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>
    </svg>
  );
}
`;

function sanitizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Inject extra SVG icons if missing
  if (!content.includes('function SvgSearch(')) {
    if (content.includes('function SvgShieldCheck(')) {
      content = content.replace('function SvgShieldCheck(', extraSvgIcons + '\nfunction SvgShieldCheck(');
    }
  }

  // 2. Specific textual replacements
  content = content.replace(/Vigente\s*🟢/g, 'Vigente');
  content = content.replace(/🟢\s*CUMPLE\s*\(SI\)/g, 'CUMPLE (SI)');
  content = content.replace(/🔴\s*NO\s*CUMPLE\s*\(NO\)/g, 'NO CUMPLE (NO)');
  content = content.replace(/<span>✏️<\/span>/g, '<SvgEdit className="w-4 h-4 inline" />');
  content = content.replace(/<span>📋<\/span>/g, '<SvgClipboard className="w-4 h-4 inline" />');
  content = content.replace(/<span>📦<\/span>/g, '<SvgPackage className="w-4 h-4 inline" />');
  content = content.replace(/<span>📊/g, '<SvgFileSpreadsheet className="w-4 h-4 inline mr-1" /><span');
  content = content.replace(/<span>📄/g, '<SvgFileText className="w-4 h-4 inline mr-1" /><span');
  content = content.replace(/🖨️ Imprimir Formato/g, 'Imprimir Formato');
  content = content.replace(/📤 Guardar Registro/g, 'Guardar Registro');
  content = content.replace(/📦 Registrar Ingreso/g, 'Registrar Ingreso');
  content = content.replace(/📤 Subir Documento/g, 'Subir Documento');
  content = content.replace(/📤 Subir a esta carpeta/g, '+ Subir a esta carpeta');
  content = content.replace(/📁 \+ Nueva Carpeta/g, '+ Nueva Carpeta');
  content = content.replace(/🔍/g, '');
  content = content.replace(/🗑️/g, '');
  content = content.replace(/⚠️/g, '');
  content = content.replace(/🍺 Iniciar Cocción/g, 'Iniciar Cocción');
  content = content.replace(/📝 Crear Venta B2B/g, 'Crear Venta B2B');
  content = content.replace(/🏛️ Abrir 11 Carpetas/g, 'Abrir Carpetas');
  content = content.replace(/🏛️ Abrir 14 Carpetas/g, 'Abrir 14 Carpetas');
  content = content.replace(/🛒 Portal B2B Clientes/g, 'Portal B2B Clientes');
  content = content.replace(/🛒 Tu Carrito B2B/g, 'Tu Carrito B2B');
  content = content.replace(/🚀 Enviar Autopedido/g, 'Enviar Autopedido');
  content = content.replace(/🚚 Solicitar Recogida/g, 'Solicitar Recogida');
  content = content.replace(/📈 Registrar SG/g, 'Registrar SG');
  content = content.replace(/📥 Exportar CSV/g, 'Exportar CSV');
  content = content.replace(/📥 Exportar Ventas CSV/g, 'Exportar Ventas CSV');
  content = content.replace(/📥 Exportar Registros CSV/g, 'Exportar Registros CSV');
  content = content.replace(/📋 Copiar/g, 'Copiar');

  // Status badges in table / cards
  content = content.replace(/🟢/g, '');
  content = content.replace(/🔴/g, '');
  content = content.replace(/🟡/g, '');
  content = content.replace(/🟠/g, '');

  // Specific symbols
  content = content.replace(/'✕'/g, "'x'");
  content = content.replace(/"✕"/g, '"x"');
  content = content.replace(/>✕</g, '>x<');
  content = content.replace(/<span>✓<\/span>/g, '<SvgCheck className="w-4 h-4 inline text-emerald-500" />');
  content = content.replace(/{contrastBg === col\.hex && <span className="text-white text-xs">✓<\/span>}/g, '{contrastBg === col.hex && <SvgCheck className="w-3 h-3 text-white inline" />}');
  content = content.replace(/{contrastFg === col\.hex && <span className="text-white text-xs">✓<\/span>}/g, '{contrastFg === col.hex && <SvgCheck className="w-3 h-3 text-white inline" />}');

  // Sidebar NavItems
  content = content.replace(/icon="🧭"/g, 'icon={<SvgCompass className="w-4 h-4 inline" />}');
  content = content.replace(/icon="📊"/g, 'icon={<SvgLayoutDashboard className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🏛️"/g, 'icon={<SvgBuilding className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🍺"/g, 'icon={<SvgBeer className="w-4 h-4 inline" />}');
  content = content.replace(/icon="📦"/g, 'icon={<SvgPackage className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🤝"/g, 'icon={<SvgUsers className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🛒"/g, 'icon={<SvgShoppingCart className="w-4 h-4 inline" />}');
  content = content.replace(/icon="📁"/g, 'icon={<SvgFolder className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🔬"/g, 'icon={<SvgFlaskConical className="w-4 h-4 inline" />}');
  content = content.replace(/icon="👥"/g, 'icon={<SvgUsers className="w-4 h-4 inline" />}');
  content = content.replace(/icon="⚖️"/g, 'icon={<SvgScale className="w-4 h-4 inline" />}');
  content = content.replace(/icon="🏗️"/g, 'icon={<SvgBoxes className="w-4 h-4 inline" />}');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Sanitized:', filePath);
}

sanitizeFile('src/components/NextBreweryApp.js');
sanitizeFile('index.html');
