const fs = require('fs');
const vm = require('vm');

const babelCode = fs.readFileSync('vendor/babel.min.js', 'utf8');

const sandbox = {
  window: {},
  navigator: { userAgent: 'Mozilla/5.0' },
  console: console
};
sandbox.window = sandbox;
sandbox.self = sandbox;

vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel;
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/i);
const code = match[1];

console.log('Testing EXACT browser presets: [["react", { runtime: "classic" }], "env"]...');
try {
  const result = Babel.transform(code, {
    filename: 'Inline Babel script',
    presets: [['react', { runtime: 'classic' }], 'env'],
    sourceMaps: 'inline'
  });
  console.log('SUCCESS: Transformed code length:', result.code.length);
} catch (err) {
  console.error('EXACT_BROWSER_TRANSFORM_ERROR:', err.message);
  if (err.loc) console.error('Location:', err.loc);
  process.exit(1);
}
