// This script iterates through every file in the vault and finds forward and back links.
// The data is then shaped in two ways - one for recombining in the front-end content (see nuxt.config.js) and the other for graph views.
// The output is moved into a Json array `backlinks.json` && `graphdata.json`

const path = require('path');
const fs = require('fs-extra');
const metadataParser = require('markdown-yaml-metadata-parser');
const contentDir = path.join(__dirname, '..', 'vault');
const frontMatterRegex = /---(.*?)---/sg;

console.log(contentDir);

maxColours = 15;

async function getFileNames(filePath, encoding = "utf-8") {
  let mdFiles = [];
  try {
    names = await fs.readdir(filePath);
  } catch (e) {
      console.log("e", e);
  }
  for (let i = 0; i < names.length; i++) {
    const file = names[i];
    if(path.extname(file) == ".md"){
      mdFiles.push(file);
    }
  }
  return mdFiles;
}

async function getContent(filePath, encoding = "utf-8") {
  if (!filePath) {
      throw new Error("filePath required");
  }
  
  return fs.readFile(filePath, { encoding });
}

(async () => {
  console.log('Reading documents...');
  const directoryFiles = await getFileNames(contentDir);

  for (let i = 0; i < directoryFiles.length; i++) {
    const file = directoryFiles[i];
    const fileData = await getContent(path.join(__dirname, '..', 'vault', file))

    const frontmatter = metadataParser(fileData).metadata;
    
    
    const fileDataRaw = metadataParser(fileData).content;
    // console.log(fileDataRaw)
  
    colourCode = Math.floor(Math.random() * maxColours);
    

    if(!frontmatter.colour_scheme){
      const frontMatterRaw = fileData.match(frontMatterRegex)[0];
      const frontMatterStripped = frontMatterRaw.replace(/---/g,'') + 'colour_scheme: ' + colourCode + '\n';
      const frontMatterReformed = '---\n' + frontMatterStripped + '---\n'
      // console.log(frontMatterReformed);
      const writeData = frontMatterReformed + fileDataRaw;
      console.log('writing..')
      fs.writeFile(path.join(__dirname, '..','vault', file), writeData);

      // console.log(writeData)
    }
  }

  console.log('complete');

})();
