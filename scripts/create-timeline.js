// This script iterates through every file in the vault and finds Dates.
// The output is moved into a Json array `dates.json`

const path = require('path');
const fs = require('fs-extra');
const metadataParser = require('markdown-yaml-metadata-parser');
const contentDir = path.join(__dirname, '..', 'vault');

console.log(contentDir);

var dates = [];


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
  console.log('Fetching dates...');
  const directoryFiles = await getFileNames(contentDir);

  for (let i = 0; i < directoryFiles.length; i++) {
    const file = directoryFiles[i];
    const fileData = await getContent(path.join(__dirname, '..', 'vault', file))

    const frontmatter = metadataParser(fileData).metadata;

    var slug = file.replace('.md','');

    if(frontmatter.date_start || frontmatter.date_end){
      var dataObject = {
        slug: slug,
        title: frontmatter.title,
        title_de: frontmatter.title_de,
        date_start: frontmatter.date_start ? frontmatter.date_start : undefined,
        date_end: frontmatter.date_end ? frontmatter.date_end : undefined,
        cover_image: frontmatter.cover_image,
        colour_scheme: frontmatter.colour_scheme
      }
      dates.push(dataObject)
    }

    

  }


  console.log(dates);

  console.log('writing dates file..');

  const timelineData = JSON.stringify(dates)
  fs.writeFile(path.join(__dirname, '..','temp', 'dates.json'), timelineData);

  console.log('complete');

})();
