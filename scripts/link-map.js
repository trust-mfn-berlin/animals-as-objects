// This script iterates through every file in the vault and finds forward and back links.
// The output is moved into a Json array `backlinks.json`

const path = require('path');
const fs = require('fs-extra');
const contentDir = path.join(__dirname, '..', 'vault');

console.log(contentDir);

const findBetweenDoubleBrackets = /\[\[(.*?)\]\]/g;
var dendronlinks = [];
var compiledBacklinks = [];

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
  console.log('Fetching forward links...');
  const directoryFiles = await getFileNames(contentDir);

  for (let i = 0; i < directoryFiles.length; i++) {
    const file = directoryFiles[i];
    // console.log(file);
    const fileData = await getContent(path.join(__dirname, '..', 'vault', file))

    var forwardlinks = fileData.match(findBetweenDoubleBrackets); 
    // console.log(forwardlinks);
    var slug = file.replace('.md','');
    if(forwardlinks){
      for (let l = 0; l < forwardlinks.length; l++) {
        forwardlinks[l] = forwardlinks[l].slice(2, -2)
      }
    }
    var backlinks = [];
    dendronlinks.push({slug, forwardlinks, backlinks, i});
  }

  compiledBacklinks = dendronlinks;
  // console.log(dendronlinks);
  console.log('Generating backlinks...');

  for (let x = 0; x < dendronlinks.length; x++) {
    const forwardlinks = dendronlinks[x].forwardlinks;
    const from = dendronlinks[x].slug;

    if(forwardlinks){
      for (let f = 0; f < forwardlinks.length; f++) {
        // const slug = link.dendronlinks[x];
        const forwardlink = forwardlinks[f];
        // console.log('Iterating forwardlinks', f);
        // console.log('FROM', from, '-> TO', forwardlink);

        for (let u = 0; u < dendronlinks.length; u++) {
          const page = dendronlinks[u];
          if(page.slug == forwardlink){
            console.log('MATCH', 'from index', x, 'to index', u);
            console.log('FROM', from, '-> TO', forwardlink);
            // console.log('-------------------')
            compiledBacklinks[u].backlinks.push(from);
          }
          
        }
        
      }
      console.log('-----------------------------------------------------------------------------------------------');

    }
    

    
  }

  // console.log(compiledBacklinks);
  console.log('writing backlinks file..');

  const writeData = JSON.stringify(compiledBacklinks)

  fs.writeFile(path.join(__dirname, '..','temp', 'backlinks.json'), writeData);

  console.log('complete');

})();
