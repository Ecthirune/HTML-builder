const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log('Error reading folder:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(`Error retrieving file stats for ${file}:`, err);
        return;
      }

      if (stats.isFile()) {
        const fileSize = (stats.size / 1024).toFixed(3);
        const fileExtension = path.extname(file).slice(1);
        const fileName = path.basename(file, path.extname(file));

        console.log(`${fileName} - ${fileExtension} - ${fileSize} kb`);
      }
    });
  });
});
