// This script iterates through every file in the vault and finds forward and back links.
// The data is then shaped in two ways - one for recombining in the front-end content (see nuxt.config.js) and the other for graph views.
// The output is moved into a Json array `backlinks.json` && `graphdata.json`

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
var graphArticles=[];


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
    var forwardlinksNoDupe = [];
    var slug = file.replace('.md','');

    graphNodes.push({slug, frontmatter})
    
    

    if(forwardlinks){
      for (let l = 0; l < forwardlinks.length; l++) {
        const flink = forwardlinks[l];
        
        // check for aliases
        if(flink.match(aliasSplitterRegex)){
          // console.log('ALIAS FOUND', flink.match(aliasSplitterRegex)[2]);
          forwardlinks[l] = flink.match(aliasSplitterRegex)[2]
        } else {
          forwardlinks[l] = flink.slice(2, -2);
        }
        

        // this creates links to articles that haven't been made yet.
        // console.log('SOURCE', slug, 'TARGET', forwardlinks[l]);
        // graphLinks.push({source: slug, target: forwardlinks[l] });
      }

      // remove dupes
      for (let a = 0; a < forwardlinks.length; a++) {
        const f = forwardlinks[a];
        // console.log(forwardlinksNoDupe.includes(f));
        if(!forwardlinksNoDupe.includes(f)) {
          forwardlinksNoDupe.push(f)
        } else {
          // console.log('dupe')
        }
      }

    }
    
    var backlinks = [];
    dendronlinks.push({slug, forwardlinks:forwardlinksNoDupe, backlinks, i, frontmatter});
  }

  // console.log(graphNodes);

  compiledBacklinks = dendronlinks;
  console.log('Generating backlinks...');
  // Iterate through every page
  for (let x = 0; x < dendronlinks.length; x++) {
    // console.log(x, dendronlinks[x].frontmatter.title);
    const forwardlinks = dendronlinks[x].forwardlinks;
    const from = {
      slug: dendronlinks[x].slug,
      title: dendronlinks[x].frontmatter.title,
      title_de: dendronlinks[x].frontmatter.title_de,
      tao_type: dendronlinks[x].frontmatter.tao_type,
      cover_image: dendronlinks[x].frontmatter.cover_image,
      colour_scheme: dendronlinks[x].frontmatter.colour_scheme
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
              // console.log('FROM', from.slug, '-> TO', forwardlink);
              compiledBacklinks[u].backlinks.push(from);
              
              // this only links between articles that have been made, by using backlinks instead of forward links.
              graphLinks.push({source: from.slug, target: forwardlink });
            } else {
              // console.log('DUPE');
            }
          
          }
          
        }
        
      }
      // console.log('-----------------------------------------------------------------------------------------------');

    }
    

    
  }

  // Make a file with ONLY featured pages sorted by page.

  // Iterate through our compiled pages.
  for (let i = 0; i < compiledBacklinks.length; i++) {
    const article = compiledBacklinks[i];

    var nodes = [];
    var links = [];

    // Only act on featured pages.
    if(article.frontmatter.feature){
      
      // immediately add first node
      nodes.push({
        slug: article.slug,
        title: article.frontmatter.title,
        title_de: article.frontmatter.title_de,
        tao_type: article.frontmatter.tao_type,
        cover_image: article.frontmatter.cover_image,
        colour_scheme: article.frontmatter.colour_scheme
      });

      for (let f = 0; f < article.forwardlinks.length; f++) {

        const forwardlink = compiledBacklinks.find(entry => entry.slug == article.forwardlinks[f]);
        // console.log(forwardlink);
        // immediately add primary links

        // What if Forward link isn't there?
        if(forwardlink){
        links.push({source: article.slug, target: forwardlink.slug, value:2});
        // add primary nodes
        nodes.push({
          slug: forwardlink.slug,
          title: forwardlink.frontmatter.title,
          title_de: forwardlink.frontmatter.title_de,
          tao_type: forwardlink.frontmatter.tao_type,
          cover_image: forwardlink.frontmatter.cover_image,
          colour_scheme: forwardlink.frontmatter.colour_scheme
        });
        
        
        // now we need to find secondary connections
        if(forwardlink.forwardlinks){
          for (let s = 0; s < forwardlink.forwardlinks.length; s++) {
            const ff = forwardlink.forwardlinks[s];
            if(nodes.find(entry => entry.slug == ff)){
              // console.log('secondary link found', ff);
              // if(links.includes({source: forwardlink.slug, target: ff})) console.log('dupe link')
              links.push({source: forwardlink.slug, target: ff, value:1})
            }
          }
        }
      }


      }


      for (let b = 0; b < article.backlinks.length; b++) {
        const backlink = article.backlinks[b];

        // immediately add primary links
        if(!links.includes({source: backlink.slug, target: article.slug, value:2})) links.push({source: backlink.slug, target: article.slug, value:2})
        // add primary nodes
        // console.log(nodes[0].slug, backlink.slug);
        // console.log(nodes.find(entry => entry.slug == backlink.slug));

        if(!nodes.find(entry => entry.slug == backlink.slug)) nodes.push(backlink)
        
        
      }

      const slug = article.slug;
      graphArticles.push({slug, nodes, links})
    }
    
  }

  // console.log(graphArticles);









  console.log('writing backlinks file..');

  const writeData = JSON.stringify(compiledBacklinks)
  fs.writeFile(path.join(__dirname, '..','temp', 'backlinks.json'), writeData);

  console.log('writing node graph file..');
  // const concatGraphData = {
  //   nodes: graphNodes,
  //   links: graphLinks
  // }
  // console.log(concatGraphData);
  const graphData = JSON.stringify(graphArticles)
  fs.writeFile(path.join(__dirname, '..','temp', 'graphdata.json'), graphData);

  console.log('complete');

})();
