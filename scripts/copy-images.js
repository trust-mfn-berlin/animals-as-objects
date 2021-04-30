const path = require('path');
const fs = require('fs-extra');

const srcDir = path.join(__dirname, '..', 'vault', 'images');
const destDir = path.join(__dirname, '..', 'static', 'images');
                              
// To copy a folder or file  
// Should be moveSync instead of copySync when running remotely - much much faster
// https://github.com/nuxt/content/issues/106
// https://github.com/imagemin/imagemin-mozjpeg
// https://github.com/imagemin/imagemin-optipng

// https://www.npmjs.com/package/imagemin

fs.copySync(srcDir, destDir, {overwrite: true}, function (err) {
  if (err) {                 
    console.error(err);
  } else {
    console.log("Copied images successfully!");
  }
});