const path = require('path')
const report = require('puppeteer-report');
const puppeteer = require('puppeteer');
const fs = require('fs-extra');


// Post-build on server:
// 1. Get list of every Article to export.
// 2. Launch Puppeteer
// 3. Visit Print Version of every Article (animals-as-objects/de/theme.taxonomical orders/print)
// 4. Wait until everything is loaded
// 5. Export PDF in A4 with Headers and Footers to static folder
// 6. Close Browser.

// Issue with Ubuntu 20.04 ... 
// https://github.com/puppeteer/puppeteer/issues/1409
// Fix by adding "--disable-gpu" arg to launch.

// PDFs: Generating PDFs locally 
// Set liveUrl to localhost
// Serve from static generated folder -> npm run start
// Serving from Dev server can have problems loading fonts
// To double ensure puppeteer waits, you can force it to take a screenshot first


const contentDir = path.join(__dirname, '..', 'vault');
const exportDir = path.join(__dirname, '..', 'dist/pdf');

const liveUrl = 'https://animalsasobjects.org/';
// const liveUrl = 'http://localhost:3000/';

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

  const fileName = filePath.replace('.','-');
  
  const filePathEN = prefix + fileName
  const filePathDE = prefixDE + fileName
  
  console.log('Accessing URL: ', formattedUrl);

  await page.goto(formattedUrl, {
    waitUntil: 'networkidle2',
  })

  console.log('Exporting EN: ', exportDir + '/' + filePathEN + '.pdf');

  await report.pdfPage(page, { 
    path: exportDir + '/' + filePathEN + '.pdf', 
    format: 'a4',
    margin: {
        bottom: '6mm',
        left: '4mm',
        right: '4mm',
        top: '2mm'
    }
  });

  await page.goto(formattedUrlDE, {
    waitUntil: 'networkidle2',
  })

  console.log('Exporting DE: ', exportDir + '/' + filePathDE + '.pdf');

  await report.pdfPage(page, { 
    path: exportDir + '/' + filePathDE + '.pdf', 
    format: 'a4',
    margin: {
      bottom: '6mm',
      left: '4mm',
      right: '4mm',
      top: '2mm'
  }
  });
  
}

(async () => {

  const directoryFiles = await getFileNames(contentDir);
  const browser = await puppeteer.launch({
    args:["--no-sandbox", "--disable-gpu", "--disabled-setupid-sandbox"]
  });
  const page = await browser.newPage();
  console.log('Browser is online and connected:', browser.isConnected());

  for (let i = 0; i < directoryFiles.length; i++) {
    const path = directoryFiles[i].replace('.md', '');
    // console.log(path)
    await printPDF(path, browser, page);
  }

  // await printPDF('story.industrial micropaleontology', browser, page);
  

  await browser.close();

})();
