const fs = require('fs');
const path = require('path');

const targetDirectory = path.join(__dirname, 'project-dist');
const targetDirectorySubfolder = path.join (targetDirectory, 'assets');

var requiredFolders = [targetDirectory, targetDirectorySubfolder];
var requiredFiles = ['index.html', 'style.css'];


requiredFolders.forEach((directory) => 
{
  fs.access(directory, (err) => 
  {
    if (err) 
    {    
      fs.mkdir(directory, { recursive: true }, (err) => 
      {
        if (err) 
        {
          console.log('Error creating destination directory:', err);
          return;
        }else
        {
          console.log('Directory created: ', directory);
        }
      });
    } else 
    {    
      console.log('Directory already exists:', directory);
      return;
    }
  });
});


requiredFiles.forEach((file) =>
{
  const filePath = path.join(targetDirectory, file);   
    fs.access(filePath, (err) => 
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
});