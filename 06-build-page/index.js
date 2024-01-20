const fs = require('fs');
const path = require('path');

const targetDirectory = path.join(__dirname, 'project-dist');
const targetDirectorySubfolder = path.join (targetDirectory, 'assets');

var requiredFolders = [targetDirectory, targetDirectorySubfolder];

// create required directories
requiredFolders.forEach((directory) => 
{
  fs.access(directory, fs.constants.F_OK, (err) => 
  {
    if (err) 
    {    
      fs.mkdir(directory, { recursive: true }, (err) => 
      {
        if (err) 
        {
          console.log('Error creating destination directory:', err);
          return;
        }
      });
    } else 
    {    
      console.log('Directory already exists:', directory);
      return;
    }
  });
});

