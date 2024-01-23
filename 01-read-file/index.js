const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', (dataFromFile) => {
  console.log(dataFromFile);
});

readStream.on('error', (err) => {
  console.error(err);
});
