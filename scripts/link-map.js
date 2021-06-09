// This script iterates through every file in the vault and finds forward and back links.
// The output is moved into a Json array `backlinks.json`, and a file called graph-data.json where it is shaped for a D3 graph.

const path = require('path');
const fs = require('fs-extra');
const metadataParser = require('markdown-yaml-metadata-parser');
const contentDir = path.join(__dirname, '..', 'vault');

console.log(contentDir);

// need to accomodate aliases here
const aliasSplitterRegex = /\[\[(.*)\|(.*)\]\]/;
const findBetweenDoubleBrackets = /\[\[(.*?)\]\]/g;
var dendronlinks = [];
var compiledBacklinks = [];

var graphLinks = [];
var graphNodes= [];

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
    const fileData = await getContent(path.join(__dirname, '..', 'vault', file))

    const frontmatter = metadataParser(fileData).metadata;

    var forwardlinks = fileData.match(findBetweenDoubleBrackets); 
    var slug = file.replace('.md','');

    graphNodes.push({slug, frontmatter})

    if(forwardlinks){
      for (let l = 0; l < forwardlinks.length; l++) {
        const flink = forwardlinks[l];
        
        // check for aliases
        if(flink.match(aliasSplitterRegex)){
          console.log('ALIAS FOUND', flink.match(aliasSplitterRegex)[2]);
          forwardlinks[l] = flink.match(aliasSplitterRegex)[2]
        } else {
          forwardlinks[l] = flink.slice(2, -2);
        }

        // this creates links to articles that haven't been made yet.
        // console.log('SOURCE', slug, 'TARGET', forwardlinks[l]);
        // graphLinks.push({source: slug, target: forwardlinks[l] });
      }
    }
    
    var backlinks = [];
    dendronlinks.push({slug, forwardlinks, backlinks, i, frontmatter});
  }

  // console.log(graphNodes);

  compiledBacklinks = dendronlinks;
  console.log('Generating backlinks...');
  // Iterate through every page
  for (let x = 0; x < dendronlinks.length; x++) {
    const forwardlinks = dendronlinks[x].forwardlinks;
    const from = {
      slug: dendronlinks[x].slug,
      title: dendronlinks[x].frontmatter.title,
      title_de: dendronlinks[x].frontmatter.title_de,
      tao_type: dendronlinks[x].frontmatter.tao_type
    };

    // Check if this page is linked to anything
    if(forwardlinks){
      // Go through each forward link and check against other pages to see if this link goes to that page
      for (let f = 0; f < forwardlinks.length; f++) {
        
        const forwardlink = forwardlinks[f];
        // console.log('Iterating forwardlinks', f);
        // console.log('FROM', from, '-> TO', forwardlink);

        for (let u = 0; u < dendronlinks.length; u++) {
          const page = dendronlinks[u];
          // If any page matches a forward link from another page, add it as a backlink
          if(page.slug == forwardlink){

            // Check if the backlink already exists (duplicated). Only add it if it doesn't already exist.
            // console.log(compiledBacklinks[u].backlinks); 
            if(!compiledBacklinks[u].backlinks.includes(from)){
              // console.log('MATCH', 'from index', x, 'to index', u);
              console.log('FROM', from.slug, '-> TO', forwardlink);
              compiledBacklinks[u].backlinks.push(from);
              
              // this only links between articles that have been made, by using backlinks instead of forward links.
              graphLinks.push({source: from.slug, target: forwardlink });
            } else {
              console.log('DUPE');
            }
          
          }
          
        }
        
      }
      console.log('-----------------------------------------------------------------------------------------------');

    }
    

    
  }

  console.log('writing backlinks file..');

  const writeData = JSON.stringify(compiledBacklinks)
  fs.writeFile(path.join(__dirname, '..','temp', 'backlinks.json'), writeData);

  console.log('writing node graph file..');
  const concatGraphData = {
    nodes: graphNodes,
    links: graphLinks
  }
  // console.log(concatGraphData);
  const graphData = JSON.stringify(concatGraphData)
  fs.writeFile(path.join(__dirname, '..','temp', 'graphdata.json'), graphData);

  console.log('complete');

})();
