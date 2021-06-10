const path = require('path');
const fs = require('fs-extra');

const srcDir = path.join(__dirname, '..', 'vault', 'audio');
const destDir = path.join(__dirname, '..', 'static', 'audio');
                              
// To copy a folder or file  
// Should be moveSync instead of copySync when running remotely - much much faster?
// https://github.com/nuxt/content/issues/106

fs.copySync(srcDir, destDir, {overwrite: true}, function (err) {
  if (err) {                 
    console.error(err);
  } else {
    console.log("Copied audio files successfully!");
  }
});