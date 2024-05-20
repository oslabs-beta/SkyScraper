const fs = require('fs');
const path = require('path');

function addJsExtensions(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      addJsExtensions(fullPath);
    } else if (path.extname(file) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(/(import\s+.*\s+from\s+['"])(.*)(['"])/g, (match, p1, p2, p3) => {
        if (!p2.endsWith('.js') && !p2.startsWith('.') && !p2.startsWith('/')) {
          return `${p1}${p2}.js${p3}`;
        }
        return match;
      });
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

addJsExtensions(path.resolve(__dirname, 'dist'));
