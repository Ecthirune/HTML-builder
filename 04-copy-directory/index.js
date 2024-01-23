const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

function copyDir(source, destination) {
  fs.rm(destination, { recursive: true }, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.log('Error removing destination directory:', err);
      return;
    }

    fs.mkdir(destination, { recursive: true }, (err) => {
      if (err) {
        console.log('Error creating destination directory:', err);
        return;
      }

      fs.readdir(source, (err, files) => {
        if (err) {
          console.log('Error reading source directory:', err);
          return;
        }

        files.forEach((file) => {
          const sourcePath = path.join(source, file);
          const destinationPath = path.join(destination, file);

          fs.stat(sourcePath, (err, stats) => {
            if (err) {
              console.log(`Error retrieving file stats for ${file}:`, err);
              return;
            }

            if (stats.isFile()) {
              fs.copyFile(sourcePath, destinationPath, (err) => {
                if (err) {
                  console.log(`Error copying file ${file}:`, err);
                }
              });
            } else if (stats.isDirectory()) {
              copyDir(sourcePath, destinationPath);
            }
          });
        });
      });
    });
  });
}

copyDir(sourceDir, destinationDir);