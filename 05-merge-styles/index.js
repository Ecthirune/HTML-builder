const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const targetFolderName = 'project-dist';

createFolder(__dirname, targetFolderName);
const distDir = path.join(__dirname, 'project-dist');
createFile(distDir, 'bundle.css');
const bundleFilePath = path.join(distDir, 'bundle.css');

async function createFolder(__dirname, name) {
  const toCreate = path.join(__dirname, name);
  await fs.access(toCreate, (err) => {
    if (err) {
      fs.mkdir(toCreate, { recursive: true }, (err) => {
        if (err) {
          console.log('Error creating destination directory:', err);
          return;
        } else {
          console.log('Directory created: ', toCreate);
        }
      });
    } else {
      console.log('Directory already exists:', toCreate);
      return;
    }
  });
}

async function createFile(directory, name) {
  const filePath = path.join(directory, name);
  await fs.access(filePath, (err) => {
    if (err) {
      fs.writeFile(filePath, '', (err) => {
        if (err) {
          console.log('Error:', err, ' creating file in: ', filePath);
          return;
        } else {
          console.log('File created: ', filePath);
        }
      });
    } else {
      console.log('File already exists: ', filePath);
      return;
    }
  });
}

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
