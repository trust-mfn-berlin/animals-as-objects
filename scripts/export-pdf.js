const path = require('path')
const puppeteer = require('puppeteer');
const fs = require('fs-extra');

// 1. Launch Puppeteer
// 2. Visit Print Version of Article (animals-as-objects/de/theme.taxonomical orders/print)
// 3. Wait until everything is loaded
// 4. Export PDF in A4
// 5. Send back link to Generated PDF to User
// 6. Close Browser

// Hey Big Brain. Why dont you just make this PDF at Generate Time. You already make the template. Smart or Dumb? Might make generate slow


const contentDir = path.join(__dirname, '..', 'vault');
const htmlDir = path.join(__dirname, '..', 'dist');
const exportDir = path.join(__dirname, '..', 'static/pdf');

const liveUrl = 'https://dev.animalsasobjects.org/';
const prefix = 'animals_as_objects-'
const prefixDE = 'tiere_als_objekte-'

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



async function printPDF (filePath, browser, page) {

  const formattedUrl = path.join(liveUrl, filePath, '/print');
  const formattedUrlDE = path.join(liveUrl, 'de/' ,filePath, '/print');

  const filePathEN = prefix + filePath
  const filePathDE = prefixDE + filePath

  console.log('Accessing URL: ', formattedUrl);

  await page.goto(formattedUrl, {
    waitUntil: 'networkidle2',
  })

  console.log('Exporting EN: ', exportDir + '/' + filePathEN + '.pdf');

  await page.pdf({ 
    path: exportDir + '/' + filePathEN + '.pdf', 
    format: 'a4',
    margin: {
        bottom: '6mm',
        left: '4mm',
        right: '4mm',
        top: '6mm'
    }
  });

  await page.goto(formattedUrlDE, {
    waitUntil: 'networkidle2',
  })

  console.log('Exporting DE: ', exportDir + '/' + filePathDE + '.pdf');

  await page.pdf({ 
    path: exportDir + '/' + filePathDE + '.pdf', 
    format: 'a4',
    margin: {
      bottom: '6mm',
      left: '4mm',
      right: '4mm',
      top: '6mm'
    }
  });
  
}

(async () => {

  const directoryFiles = await getFileNames(contentDir);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  

  for (let i = 0; i < directoryFiles.length; i++) {
    const path = directoryFiles[i].replace('.md', '');
    // console.log(path)
    await printPDF(path, browser, page);
  }

  // await printPDF('story.industrial%20micropaleontology', browser, page);
  

  await browser.close();

})();
