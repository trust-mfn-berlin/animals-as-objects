var Jimp = require('jimp');
const path = require('path');
const fs = require('fs-extra');
const { image } = require('d3-fetch');

const srcDir = path.join(__dirname, '..', 'vault', 'images');
const destDir = path.join(__dirname, '..', 'static', 'images');

const maxW = 2000;
const maxH = 1800;

function getFileNames(dir, encoding = "utf-8", withFileTypes = true) {
  let imageFiles = [];
  var names = [];
  try {
      fs.readdirSync(dir).forEach(File => {
      const absolute = path.join(dir, File);
      // let stat = fs.statSync(absolute);
      // console.log(stat);
      if (fs.statSync(absolute).isDirectory()) {
        console.log('dir')
        const recursive = getFileNames(absolute) 
        // names.push(recursive)
        for (let i = 0; i < recursive.length; i++) {
          const f = recursive[i];
          names.push(f);
        }
      } else {
        names.push(absolute)
      };
      // return imageFiles.push(absolute)
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
  // Should check if images already exist in destination folder. And skip them to speed up process
  return imageFiles;
}

(async() => {
  const imageFilePaths = await getFileNames(srcDir)

  for (let i = 0; i < imageFilePaths.length; i++) {
    const imageFile = imageFilePaths[i];

    Jimp.read(imageFile, (err, img) => {
      if (err) throw err;
      const w = img.bitmap.width;
      const h = img.bitmap.height;
      const newPath = imageFile.replace(srcDir, destDir);

      if(w > maxW || h > maxH){
        // console.log("big image", imageFile, "W", w, "H", h);
        console.log(newPath);
        
        if(w > maxW){
          const newH = Math.round((h/w)*maxW);
          console.log('Old size', "W", w, "H", h);
          console.log('New size', "W", maxW, "H", newH);
          img.resize(maxW, newH).quality(80).write(newPath)
        }

        else if (h > maxH){
          const newW = Math.round((w/h)*maxH);
          console.log('Old size', "W", w, "H", h);
          console.log('New size', "W", maxH, "H", newW);
          img.resize(newW, maxH).quality(80).write(newPath)
        }
      } else {
        console.log(newPath);
        img.quality(80).write(newPath);
      }
      // img
      //   .resize(256, 256) // resize
      //   .quality(60) // set JPEG quality
      //   .greyscale() // set greyscale
      //   .write('lena-small-bw.jpg'); // save
    });    
    
  }

  
  // console.log(b);
})();

// (async () => {
//   console.log('Fetching forward links...');
//   const directoryFiles = await getFileNames(srcDir);

//   for (let i = 0; i < directoryFiles.length; i++) {
//     const file = directoryFiles[i];
//     // const fileData = await getContent(path.join(__dirname, '..', 'vault', file))
    
//     Jimp.read('lenna.png', (err, lenna) => {
//       if (err) throw err;
//       lenna
//         .resize(256, 256) // resize
//         .quality(60) // set JPEG quality
//         .greyscale() // set greyscale
//         .write('lena-small-bw.jpg'); // save
//     });
//   }

  

// })();