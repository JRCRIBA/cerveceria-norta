const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// Extract babel script blocks
const regex = /<script\s+type="text\/babel">([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = regex.exec(content)) !== null) {
  count++;
  const code = match[1];
  console.log(`Found Babel block #${count}, length: ${code.length} chars`);
  
  // Basic brace matching
  let curly = 0;
  let paren = 0;
  let square = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '{') curly++;
    else if (ch === '}') curly--;
    else if (ch === '(') paren++;
    else if (ch === ')') paren--;
    else if (ch === '[') square++;
    else if (ch === ']') square--;
  }
  console.log(`Babel block #${count} balance: curly=${curly}, paren=${paren}, square=${square}`);
  if (curly !== 0 || paren !== 0 || square !== 0) {
    console.error(`WARNING: Unbalanced brackets in block #${count}`);
  }
}
