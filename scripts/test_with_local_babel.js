const fs = require('fs');
const vm = require('vm');

// 1. Read vendor/babel.min.js
const babelCode = fs.readFileSync('vendor/babel.min.js', 'utf8');

// Set up minimal browser-like global context
const sandbox = {
  window: {},
  navigator: { userAgent: 'node' },
  console: console
};
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);

const Babel = sandbox.Babel || sandbox.window.Babel;
if (!Babel) {
  console.error('Could not find Babel in sandbox');
  process.exit(1);
}

// 2. Read index.html babel script
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/i);
if (!match) {
  console.error('No babel script found in index.html');
  process.exit(1);
}

const code = match[1];

try {
  const result = Babel.transform(code, {
    presets: ['react']
  });
  console.log('TRANSPILED_SUCCESS: Babel transpiled index.html successfully!');
  console.log('Output code length:', result.code.length, 'chars');
} catch (err) {
  console.error('TRANSPILE_SYNTAX_ERROR:', err.message);
  process.exit(1);
}
