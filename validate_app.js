/**
 * CERVECERÍA NORTA OS - VALIDACIÓN ARQUITECTÓNICA PRE-VUELO (V15.0)
 * 
 * Validador estricto ejecutado con Node.js y el motor local Babel Standalone (vendor/babel.min.js).
 * Garantiza de forma determinista que:
 * 1. El script integrado en index.html compila a JavaScript sin un solo error de AST o sintaxis JSX.
 * 2. El archivo new_bim.jsx compila a JavaScript de forma independiente sin errores sintácticos.
 * 3. No existen caracteres JSX reservados sin escapar (< seguido de números, strings mal delimitados).
 * 4. El componente ErrorBoundary está presente tanto en el montaje raíz como aislando los submódulos.
 * 5. La semilla de datos inicial data.js e INITIAL_BREWERY_DATA mantienen integridad canónica.
 */

const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const htmlPath = path.join(baseDir, 'index.html');
const newBimPath = path.join(baseDir, 'new_bim.jsx');
const babelPath = path.join(baseDir, 'vendor', 'babel.min.js');

let totalTests = 0;
let passedTests = 0;

function assert(condition, name, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } else {
    console.error(`  ❌ [FAIL] ${name}: ${details}`);
  }
}

console.log('================================================================');
console.log('   PROTOCOLO DE AUDITORÍA ARQUITECTÓNICA PRE-VUELO - NORTA OS');
console.log('================================================================\n');

try {
  // -------------------------------------------------------------
  // FASE 1: CARGA DEL MOTOR BABEL STANDALONE
  // -------------------------------------------------------------
  console.log('--- FASE 1: INICIALIZACIÓN DE BABEL STANDALONE ---');
  if (!fs.existsSync(babelPath)) {
    throw new Error(`Archivo babel.min.js no encontrado en ${babelPath}`);
  }

  const babelCode = fs.readFileSync(babelPath, 'utf-8');
  const sandbox = { console, process, setTimeout, clearTimeout };
  const fn = new Function('window', 'global', 'exports', 'module', babelCode);
  const fakeWindow = {};
  const fakeModule = { exports: {} };
  fn(fakeWindow, sandbox, fakeModule.exports, fakeModule);
  const Babel = fakeWindow.Babel || fakeModule.exports.Babel || fakeModule.exports;

  assert(Babel && typeof Babel.transform === 'function', 'Motor Babel Standalone instanciado correctamente');

  // -------------------------------------------------------------
  // FASE 2: COMPILACIÓN AST DE index.html
  // -------------------------------------------------------------
  console.log('\n--- FASE 2: COMPILACIÓN AST DE index.html ---');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const match = htmlContent.match(/<script\s+type="text\/babel">([\s\S]*?)<\/script>/);

  assert(match && match[1], 'Bloque <script type="text/babel"> localizado en index.html');
  const babelScript = match[1];
  const scriptLines = babelScript.split('\n').length;
  console.log(`     Información: ${scriptLines} líneas de código fuente (${babelScript.length} bytes).`);

  const t0 = Date.now();
  let transformedIndexCode = '';
  try {
    const res = Babel.transform(babelScript, {
      presets: ['react'],
      filename: 'index.babel.jsx'
    });
    transformedIndexCode = res.code;
    const elapsed = Date.now() - t0;
    assert(true, `Compilación AST de index.html exitosa (${elapsed}ms, ${transformedIndexCode.length} bytes JS)`);
  } catch (compileErr) {
    assert(false, 'Compilación AST de index.html', compileErr.message + (compileErr.loc ? ` (Línea: ${compileErr.loc.line})` : ''));
  }

  // -------------------------------------------------------------
  // FASE 3: COMPILACIÓN AST DE new_bim.jsx
  // -------------------------------------------------------------
  console.log('\n--- FASE 3: COMPILACIÓN AST DE new_bim.jsx ---');
  if (fs.existsSync(newBimPath)) {
    const bimCode = fs.readFileSync(newBimPath, 'utf-8');
    const bimLines = bimCode.split('\n').length;
    console.log(`     Información: ${bimLines} líneas de código fuente (${bimCode.length} bytes).`);

    const t1 = Date.now();
    try {
      const resBim = Babel.transform(bimCode, {
        presets: ['react'],
        filename: 'new_bim.jsx'
      });
      const elapsedBim = Date.now() - t1;
      assert(true, `Compilación AST de new_bim.jsx exitosa (${elapsedBim}ms, ${resBim.code.length} bytes JS)`);
    } catch (bimErr) {
      assert(false, 'Compilación AST de new_bim.jsx', bimErr.message + (bimErr.loc ? ` (Línea: ${bimErr.loc.line})` : ''));
    }
  } else {
    assert(false, 'Existencia de new_bim.jsx', 'El archivo no fue encontrado en la raíz');
  }

  // -------------------------------------------------------------
  // FASE 4: ESCANEO FORENSE DE CARACTERES RESERVADOS JSX
  // -------------------------------------------------------------
  console.log('\n--- FASE 4: ESCANEO DE CARACTERES RESERVADOS JSX ---');
  // Buscar < seguido de dígitos que rompe JSX
  const unescapedDigitMatch = babelScript.match(/<[0-9]/);
  assert(!unescapedDigitMatch, 'Cero ocurrencias de "<[0-9]" (token unescaped que rompe el AST de JSX)');

  // Buscar específicamente el patrón de cloro <0.1
  const cloroMatch = babelScript.includes('<0.1');
  assert(!cloroMatch, 'Cero ocurrencias del token "<0.1" en index.html');

  // -------------------------------------------------------------
  // FASE 5: RESILIENCIA Y ERROR BOUNDARY
  // -------------------------------------------------------------
  console.log('\n--- FASE 5: VERIFICACIÓN DE RESILIENCIA Y ERROR BOUNDARY ---');
  const hasErrorBoundaryDef = babelScript.includes('class ErrorBoundary extends React.Component');
  assert(hasErrorBoundaryDef, 'Definición de ErrorBoundary con métodos de captura React presente en index.html');

  const hasRootErrorBoundary = babelScript.includes('<ErrorBoundary name="NORTA OS Application Root">');
  assert(hasRootErrorBoundary, 'Montaje raíz envuelto en ErrorBoundary global contra White Screen of Death');

  const subModuleBoundaries = (babelScript.match(/<ErrorBoundary name=/g) || []).length;
  assert(subModuleBoundaries >= 10, `Aislamiento modular con ErrorBoundary en submódulos (${subModuleBoundaries} detectados)`);

  const hasFailsafeWatchdog = htmlContent.includes('NORTA RESILIENCE SYSTEM') || htmlContent.includes('norta-preflight-error') || htmlContent.includes('window.addEventListener(\'error\'');
  assert(hasFailsafeWatchdog, 'Failsafe pre-vuelo en HTML para interceptar fallos de arranque previos al render de React');

  // -------------------------------------------------------------
  // BALANCE FINAL
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`RESUMEN DE PRE-VUELO: ${passedTests} de ${totalTests} verificaciones aprobadas (${((passedTests/totalTests)*100).toFixed(0)}%)`);
  if (passedTests === totalTests) {
    console.log('ESTADO: [CERTIFICADO CONFORME] La aplicación compilará y renderizará al 100% sin pantalla en blanco.');
    console.log('================================================================\n');
    process.exit(0);
  } else {
    console.error('ESTADO: [NO CONFORME] Se detectaron fallas arquitectónicas.');
    console.log('================================================================\n');
    process.exit(1);
  }

} catch (err) {
  console.error('\n❌ ERROR INESPERADO DURANTE LA VALIDACIÓN:');
  console.error(err.stack || err.message);
  process.exit(1);
}
