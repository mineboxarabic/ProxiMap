const fs = require('fs');
const path = require('path');

const projectDirectory = '.';

function isJSXFile(content) {
  // Simple regex to detect JSX. You might want to refine this.
  return /<\/?[A-Z][\s\S]*>/.test(content);
}

function renameJSFilesToJSX(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        renameJSFilesToJSX(fullPath);
      } else if (file.name.endsWith('.js')) {
        fs.readFile(fullPath, 'utf8', (err, content) => {
          if (err) {
            console.error('Error reading file:', err);
            return;
          }
          if (isJSXFile(content)) {
            const newFullPath = fullPath.replace(/\.js$/, '.jsx');
            fs.rename(fullPath, newFullPath, (err) => {
              if (err) {
                console.error('Error renaming file:', err);
                return;
              }
              console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
            });
          }
        });
      }
    });
  });
}

renameJSFilesToJSX(projectDirectory);
