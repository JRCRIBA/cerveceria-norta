const fs = require('fs');
const vm = require('vm');

const babelCode = fs.readFileSync('vendor/babel.min.js', 'utf8');

const domSandbox = {
  window: {},
  navigator: { userAgent: 'Mozilla/5.0' },
  console: console
};
domSandbox.window = domSandbox;
domSandbox.self = domSandbox;

vm.createContext(domSandbox);
vm.runInContext(babelCode, domSandbox);

const Babel = domSandbox.Babel;

// Test default transformation
const testSnippet = '<div><span>Test</span></div>';
const res1 = Babel.transform(testSnippet, { presets: ['react'] }).code;
console.log('Result with presets: [\"react\"]:\n', res1);

const res2 = Babel.transform(testSnippet, { presets: [['react', { runtime: 'classic' }]] }).code;
console.log('Result with runtime: \"classic\":\n', res2);

// Check what Babel.transformScript or automatic transform uses
console.log('Babel version/info:', typeof Babel);
