const fs = require('fs');

const files = ['src/components/NextBreweryApp.js', 'index.html'];

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA70}-\u{1FAFF}\u{200D}\u{FE0F}]/gu;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Specific phrases clean-up
  content = content.replace(/<span>✏️<\/span>/g, '');
  content = content.replace(/<span>🎯<\/span>/g, '');
  content = content.replace(/<span>🎓<\/span>/g, '');
  content = content.replace(/<span>🐀<\/span>/g, '');
  content = content.replace(/<span>🧹<\/span>/g, '');
  content = content.replace(/<span>♻️<\/span>/g, '');
  content = content.replace(/<span>🛠️<\/span>/g, '');
  content = content.replace(/<span>🧪<\/span>/g, '');
  content = content.replace(/<span>❄️<\/span>/g, '');
  content = content.replace(/<span>🏬<\/span>/g, '');
  content = content.replace(/<span>📜<\/span>/g, '');
  content = content.replace(/<span>🍺<\/span>/g, '');
  content = content.replace(/<span>🌾<\/span>/g, '');
  content = content.replace(/<span>🔥<\/span>/g, '');
  content = content.replace(/<span>🫧<\/span>/g, '');
  content = content.replace(/<span>🏺<\/span>/g, '');
  content = content.replace(/<span>🛡️<\/span>/g, '');
  content = content.replace(/<span>🌲<\/span>/g, '');
  content = content.replace(/<span>✨<\/span>/g, '');
  content = content.replace(/<span>🧭<\/span>/g, '');
  content = content.replace(/<span>⚖️<\/span>/g, '');
  content = content.replace(/<span>🤝<\/span>/g, '');
  content = content.replace(/<span>🌱<\/span>/g, '');
  content = content.replace(/<span>💡<\/span>/g, '');
  content = content.replace(/<span>❤️<\/span>/g, '');
  content = content.replace(/<span>👥<\/span>/g, '');
  content = content.replace(/<span>🥂<\/span>/g, '');
  content = content.replace(/<span>🏔️<\/span>/g, '');
  content = content.replace(/<span>🍽️<\/span>/g, '');
  content = content.replace(/<span>🍷<\/span>/g, '');
  content = content.replace(/<span>🌿<\/span>/g, '');
  content = content.replace(/<span>🔬<\/span>/g, '');
  content = content.replace(/<span>🧼<\/span>/g, '');
  content = content.replace(/<span>🚚<\/span>/g, '');
  content = content.replace(/<span>🛒<\/span>/g, '');
  content = content.replace(/<span>🚀<\/span>/g, '');
  content = content.replace(/<span>🏛️<\/span>/g, '');
  content = content.replace(/<span>🔄<\/span>/g, '');
  content = content.replace(/<span>🧹<\/span>/g, '');
  content = content.replace(/<span>📦<\/span>/g, '');
  content = content.replace(/<span>📋<\/span>/g, '');
  content = content.replace(/<span>📊<\/span>/g, '');
  content = content.replace(/<span>📄<\/span>/g, '');

  // Strip remaining standalone emojis
  content = content.replace(emojiRegex, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Purged emojis from:', file);
});
