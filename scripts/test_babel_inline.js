const fs = require('fs');

// We can use a simple node script to test syntax parsing
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/i);

if (!scriptMatch) {
  console.error('No babel script found');
  process.exit(1);
}

const code = scriptMatch[1];

try {
  // Test with standard parser if available or dynamic import
  const parser = require('@babel/parser');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('BABEL_PARSER_SUCCESS: El script Babel en index.html compila al 100% sin errores de sintaxis!');
} catch (e) {
  console.error('BABEL_PARSER_ERROR:', e.message, e.loc);
  process.exit(1);
}
