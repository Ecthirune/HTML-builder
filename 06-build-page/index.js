const fs = require('fs');
const path = require('path');

async function createFolder(directory, name)
{
  const toCreate = path.join(directory, name);
 await fs.access(toCreate, (err) => 
  {
    if (err) 
    {    
      fs.mkdir(toCreate, { recursive: true }, (err) => 
      {
        if (err) 
        {
          console.log('Error creating destination directory:', err);
          return;
        }else
        {
          console.log('Directory created: ', toCreate);
        }
      });
    } else 
    {    
      console.log('Directory already exists:', toCreate);
      return;
    }
  });
};

async function createFile(directory, name){
  const filePath = path.join(directory, name);   
  await fs.access(filePath, (err) => 
    {
    if (err) 
    {
      fs.writeFile(filePath, '', (err) => 
      {
        if (err)
        {
        console.log('Error:', err, ' creating file in: ', filePath);
        return;
        }
        else
        {
          console.log('File created: ', filePath);
        }
      });      
    }else
    {
      console.log('File already exists: ', filePath);
      return;
    }    
  });
};

async function copyDir(source, destination) {
  await fs.mkdir(destination, { recursive: true }, (err) => {
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
};


function buildCSSBundle(source, destination) {
  fs.readdir(source, (err, files) => {
    if (err) {
      console.log('Error reading styles directory:', err);
      return;
    }

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    const styles = [];

    cssFiles.forEach((file) => {
      const filePath = path.join(source, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.log(`Error reading file ${file}:`, err);
          return;
        }

        styles.push(data);

        if (styles.length === cssFiles.length) {
          const bundle = styles.join('\n');
          const destinationFile = path.join(destination, 'styles.css');
          fs.writeFile(destinationFile, bundle, 'utf8', (err) => {
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

function fillHtml(sourceFolder, destFile) 
{
  const styleFile = path.join(sourceFolder);

  fs.readdir(styleFile, (err, files) => {
    if (err) {
      console.log(`Error reading directory ${sourceFile}:`, err);
      return;
    }

    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    
  });

 fs.readFile(destFile, 'utf8', (err, data) => {
  if (err) {
    console.log(`Error reading file ${file}:`, err);
    return;
  }

  styles.push(data);

  if (styles.length === cssFiles.length) {
   const bundle = styles.join('\n');

          fs.writeFile(destFile, bundle, 'utf8', (err) => {
            if (err) {
              console.log('Error writing bundle file:', err);
              return;
            }

            console.log('Bundle file created successfully!');
          });
        }
      });
    };


createFolder(__dirname, 'project-dist');
const targetDirectory = path.join(__dirname, 'project-dist');
createFolder(targetDirectory, 'assets');
const targetAssetsFolder = path.join(targetDirectory, 'assets');
createFile(targetDirectory, 'index.html');
createFile(targetDirectory, 'styles.css');
const cssSource = path.join(__dirname, 'styles');
buildCSSBundle(cssSource, targetDirectory);

const sourceAssetsFolder = path.join(__dirname, 'assets');
copyDir(sourceAssetsFolder, targetAssetsFolder);



/*
fs.readdir(assetsFolder, (err, files) => 
{
  if (err) 
  {
    console.log('Error reading source directory:', err);
    return;
  }
  files.forEach((file) => 
  {
    const sourcePath = path.join(assetsFolder, file);
    fs.stat(sourcePath, (err, stats) => 
    {
      if (err) 
      {
        console.log(`Error retrieving file stats for ${file}:`, err);
        return;
      }
      const destinationPath = path.join(targetDirectorySubfolder, file);
      if (stats.isFile()) 
      {       

        fs.copyFile(sourcePath, destinationPath, (err) => 
        {
          if (err) 
          {
            console.log(`Error copying file ${file}:`, err);
          }
        });   
      } else if (stats.isDirectory()) 
      {
        fs.readdir(stats, (err, files));
        createFolder(destinationPath);
      }
    })})});
*/