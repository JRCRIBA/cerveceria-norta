const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// 1. Program count check in INITIAL_DATA
const progMatches = content.match(/\"id\":\s*\"prog-\d+/g);
console.log('Programs defined in index.html:', progMatches ? progMatches.length : 0);

// 2. Check 14-program IDs
const expectedProgIds = [
  'prog-00-manual',
  'prog-01-agua',
  'prog-02-almacenamiento',
  'prog-03-calibracion',
  'prog-04-capacitacion',
  'prog-05-plagas',
  'prog-06-limpieza',
  'prog-07-residuos',
  'prog-08-mantenimiento',
  'prog-09-muestreo',
  'prog-10-proveedores',
  'prog-11-trazabilidad',
  'prog-12-recepcion',
  'prog-13-control-calidad'
];

let allPresent = true;
expectedProgIds.forEach(id => {
  if (!content.includes(id)) {
    console.error('Missing program id:', id);
    allPresent = false;
  }
});

if (allPresent) {
  console.log('All 14 program IDs present in index.html!');
}

// 3. Check for FO-GC-001 (Agua) and FO-GC-015 (Almacenamiento)
console.log('FO-GC-001 present:', content.includes('FO-GC-001'));
console.log('FO-GC-015 present:', content.includes('FO-GC-015'));

// 4. Check folder conditions
console.log('00 condition:', content.includes('selectedProg.folderName.includes("00. MANUAL")'));
console.log('01 condition:', content.includes('selectedProg.folderName.includes("1. AGUA POTABLE")'));
console.log('02 condition:', content.includes('selectedProg.folderName.includes("2. ALMACENAMIENTO")'));
console.log('03 condition:', content.includes('selectedProg.folderName.includes("3. CALIBRACION")'));
console.log('04 condition:', content.includes('selectedProg.folderName.includes("4. CAPACITACION")'));
console.log('05 condition:', content.includes('selectedProg.folderName.includes("5. CONTROL DE PLAGAS")'));
console.log('06 condition:', content.includes('selectedProg.folderName.includes("6. LIMPIEZA Y DESINFECCI")'));
console.log('07 condition:', content.includes('selectedProg.folderName.includes("7. MANEJO DE RESIDUOS")'));
console.log('08 condition:', content.includes('selectedProg.folderName.includes("8. MANTENIMIENTO")'));
console.log('09 condition:', content.includes('selectedProg.folderName.includes("9. MUESTREO")'));
console.log('10 condition:', content.includes('selectedProg.folderName.includes("10. PROVEEDORES")'));
console.log('11 condition:', content.includes('selectedProg.folderName.includes("11. TRAZABILIDAD")'));
console.log('12 condition:', content.includes('selectedProg.folderName.includes("12. RECEPCION")'));
console.log('13 condition:', content.includes('selectedProg.folderName.includes("13. CONTROL DE CALIDAD")'));

// 5. Check Lucide SVG icon components
console.log('SvgFolder present:', content.includes('function SvgFolder('));
console.log('SvgFolderOpen present:', content.includes('function SvgFolderOpen('));
console.log('SvgFileText present:', content.includes('function SvgFileText('));
console.log('SvgFileSpreadsheet present:', content.includes('function SvgFileSpreadsheet('));

// 6. Check localhost:3000 server status
const http = require('http');
http.get('http://localhost:3000', (res) => {
  console.log('Localhost:3000 HTTP Status:', res.statusCode);
}).on('error', (err) => {
  console.log('Localhost:3000 HTTP Error:', err.message);
});
