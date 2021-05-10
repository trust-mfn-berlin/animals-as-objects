const Jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');

const srcDir = path.join(__dirname, '..', 'vault', 'images');
const destDir = path.join(__dirname, '..', 'static', 'images');

const maxW = 2000;
const maxH = 1800;
const quality = 80;

var existingImages = [];

function getFileNames(dir, encoding = "utf-8", withFileTypes = true) {
  let imageFiles = [];
  var names = [];
  try {
      fs.readdirSync(dir).forEach(File => {
      const absolute = path.join(dir, File);
      if (fs.statSync(absolute).isDirectory()) {
        const recursive = getFileNames(absolute) 
        for (let i = 0; i < recursive.length; i++) {
          const f = recursive[i];
          names.push(f);
        }
      } else {
        names.push(absolute)
      };
    });
  } catch (e) {
      console.log("e", e);
  }
  for (let i = 0; i < names.length; i++) {
    const file = names[i];
    if(path.extname(file) == ".jpg" || path.extname(file) == ".png" || path.extname(file) == ".jpeg"){
      imageFiles.push(file);
    }
  }
  return imageFiles;
}

(async() => {
  console.log('Beginning image optimisation');
  // Get list of images that have already been put in destination static assets folder
  existingImages = getFileNames(destDir)
  // Get list of images in Source folder
  const imageFilePaths = getFileNames(srcDir);

  var imageQueue = [];
  
  // Compare them both and only add images that are not in the Destination folder yet.
  for (let e = 0; e < imageFilePaths.length; e++) {
    const newFilePath = imageFilePaths[e];
    const newFilePathComparable = imageFilePaths[e].replace(srcDir, destDir);
 
    if(existingImages.includes(newFilePathComparable)){

    } else {
      console.log('Found an image that needs to be resized!');
      imageQueue.push(newFilePath);
    }
    
  }

  if(imageQueue.length == 0){
    console.log('No images to resize');
  } else {
    console.log("Images to resize", imageQueue);
  }

  // Do the reading and resizing
  for (let i = 0; i < imageQueue.length; i++) {
    const imageFile = imageQueue[i];

    

    Jimp.read(imageFile, (err, img) => {
      if (err) throw err;
      const w = img.bitmap.width;
      const h = img.bitmap.height;
      const newPath = imageFile.replace(srcDir, destDir);
      
      if(w > maxW || h > maxH){
        console.log(newPath);

        img.scaleToFit(maxW, maxH);
        console.log('Old size', "W", w, "H", h);
        console.log('New size', "W", img.bitmap.width, "H", img.bitmap.height);
        
        img.quality(quality).write(newPath);

      } else {
        // If image isn't too big, just reduce quality a bit
        console.log(newPath);
        img.quality(quality).write(newPath);
      }

    });    
    
  }

  console.log('Finished optimising images');
})();