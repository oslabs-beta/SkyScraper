import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'dist');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Unable to scan directory: ' + err);
    return;
  }
  files.forEach((file) => {
    // Check for files ending with .js or .jsx
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // Replace '.js' with '.jsx' in the imported module paths if needed
        const result = data.replace(/\.js(['"]\)?)/g, '.jsx$1');
        fs.writeFile(filePath, result, 'utf8', (err) => {
          if (err) console.error(err);
        });
      });
    }
  });
});
