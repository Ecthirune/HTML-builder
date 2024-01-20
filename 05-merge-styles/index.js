const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(distDir, 'bundle.css');

function buildCSSBundle() {
  fs.readdir(stylesDir, (err, files) => {
    if (err) {
      console.log('Error reading styles directory:', err);
      return;
    }

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = [];

    cssFiles.forEach((file) => {
      const filePath = path.join(stylesDir, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file ${file}:`, err);
          return;
        }

        styles.push(data);

        if (styles.length === cssFiles.length) {
          const bundle = styles.join('\n');

          fs.writeFile(bundleFilePath, bundle, 'utf8', (err) => {
            if (err) {
              console.log('Error writing bundle file:', err);
              return;
            }

            console.log('Bundle file created successfully!');
          });
        }
      });
    });
  });
}

buildCSSBundle();
