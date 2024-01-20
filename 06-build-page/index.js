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

function copyDir(source, destination) {
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
};


createFolder(__dirname, 'project-dist');
const targetDirectory = path.join(__dirname, 'project-dist');
createFolder(targetDirectory, 'assets');
const assetsFolder = path.join(targetDirectory, 'assets');
createFile(targetDirectory, 'index.html');
createFile(targetDirectory, 'style.css');

const sourceDir = path.join(__dirname, 'assets');
copyDir(sourceDir, assetsFolder);


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