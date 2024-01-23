const fs = require('fs');
const readline = require('readline');

const path = require('path');
const filePath = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileStream = fs.createWriteStream(filePath, {
  flags: 'a',
});

console.log('Welcome! Please enter some text (or type "exit" to quit):');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
    fileStream.end();
  } else {
    fileStream.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('Goodbye!');
  fileStream.end();
});

process.on('SIGINT', () => {
  rl.close();
  fileStream.end();
});
