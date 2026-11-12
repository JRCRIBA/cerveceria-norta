const fs = require('fs');
const http = require('http');

const html = fs.readFileSync('index.html', 'utf8');

// Find all script src
const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
const scripts = [];
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}
console.log('Scripts found in index.html:', scripts);

// Find all link href
const linkRegex = /<link[^>]+href=["']([^"']+)["']/gi;
const links = [];
while ((match = linkRegex.exec(html)) !== null) {
  links.push(match[1]);
}
console.log('Links found in index.html:', links);

// Test fetching local files via HTTP
const localUrls = [...scripts, ...links].filter(u => !u.startsWith('http') && !u.startsWith('//'));
console.log('\nChecking local resources via HTTP server...');

let pending = localUrls.length;
localUrls.forEach(url => {
  const reqUrl = 'http://localhost:3000/' + (url.startsWith('./') ? url.slice(2) : (url.startsWith('/') ? url.slice(1) : url));
  http.get(reqUrl, res => {
    console.log(`[HTTP ${res.statusCode}] ${reqUrl} (Content-Type: ${res.headers['content-type']}, Size: ${res.headers['content-length'] || 'chunked'})`);
    pending--;
  }).on('error', err => {
    console.error(`[ERROR] ${reqUrl}: ${err.message}`);
    pending--;
  });
});
