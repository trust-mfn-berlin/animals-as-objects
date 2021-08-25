const Jimp = require('jimp');
const JimpJPEG = require('jpeg-js')
const path = require('path');
const fs = require('fs-extra');

Jimp.decoders['image/jpeg'] = (data) => {
	return JimpJPEG.decode(data, {
		maxMemoryUsageInMB: 1024
	})
}

const srcDir = path.join(__dirname, '..', 'vault', 'images');
const destDirLarge = path.join(__dirname, '..', 'static', 'thumbnails', 'l');
const destDirSmall = path.join(__dirname, '..', 'static', 'thumbnails', 's');

const sizeLarge = 600;
const sizeSmall = 64;
const quality = 80;

function getFileNames(dir, encoding = "utf-8", withFileTypes = true) {
  let imageFiles = [];
  var names = [];
  try {
      fs.readdirSync(dir).forEach(File => {
      const absolute = path.join(dir, File);
      names.push(absolute)
    });
  } catch (e) {
      console.log("e", e);
  }
  for (let i = 0; i < names.length; i++) {
    const file = names[i];
    if(path.extname(file) == ".jpg" || path.extname(file) == ".png" || path.extname(file) == ".jpeg"){
      // if(path)
      console.log(file);
      imageFiles.push(file);
    }
  }
  return imageFiles;
}

(async() => {
  console.log('Creating Cover thumbnails');

  // Get list of images in Source folder
  const imageQueue = getFileNames(srcDir);

  if(imageQueue.length == 0){
    console.log('No images to resize');
  } else {
    console.log("Images to resize", imageQueue.length, imageQueue);
  }

  // Do the reading and resizing
  for (let i = 0; i < imageQueue.length; i++) {
    const imageFile = imageQueue[i];

    

    Jimp.read(imageFile, async (err, img) => {
      if (err) {
        console.log('error', imageFile)
        throw err
      };
      const w = img.bitmap.width;
      const h = img.bitmap.height;
      const newPathLarge = imageFile.replace(srcDir, destDirLarge);
      const newPathSmall = imageFile.replace(srcDir, destDirSmall);

      console.log(newPathLarge, newPathSmall);

      img.cover(sizeLarge, sizeLarge);
      console.log('Old size', "W", w, "H", h);
      console.log('New size', "W", img.bitmap.width, "H", img.bitmap.height);
      
      img.quality(quality).write(newPathLarge);


      img.cover(sizeSmall, sizeSmall);
      console.log('Old size', "W", w, "H", h);
      console.log('New size', "W", img.bitmap.width, "H", img.bitmap.height);
      
      img.write(newPathSmall);


    });    
    
    console.log('Finished creating thumbnails');
  }

})();