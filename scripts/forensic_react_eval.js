const fs = require('fs');
const vm = require('vm');

const babelCode = fs.readFileSync('vendor/babel.min.js', 'utf8');
const reactCode = fs.readFileSync('vendor/react.min.js', 'utf8');
const reactDomCode = fs.readFileSync('vendor/react-dom.min.js', 'utf8');

const domSandbox = {
  window: {},
  document: {
    createElement: () => ({ setAttribute: () => {}, style: {} }),
    getElementById: (id) => ({ innerHTML: '', appendChild: () => {}, children: [] }),
    documentElement: { className: '', setAttribute: () => {} },
    addEventListener: () => {}
  },
  navigator: { userAgent: 'Mozilla/5.0' },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};
domSandbox.window = domSandbox;
domSandbox.self = domSandbox;
domSandbox.global = domSandbox;

vm.createContext(domSandbox);
vm.runInContext(reactCode, domSandbox);
vm.runInContext(reactDomCode, domSandbox);
vm.runInContext(babelCode, domSandbox);

const Babel = domSandbox.Babel;
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/i);
const code = match[1];

console.log('Transforming code with Babel...');
const transformed = Babel.transform(code, { presets: ['react'] }).code;
console.log('Transformed length:', transformed.length);

console.log('Evaluating transformed code in simulated browser environment...');
try {
  vm.runInContext(transformed, domSandbox);
  console.log('REACT_EXECUTION_SUCCESS: Root components defined and evaluated without runtime crash!');
} catch (e) {
  console.error('RUNTIME_CRASH_DETECTED:', e.message, e.stack);
}
