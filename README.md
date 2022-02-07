# animals-as-objects

This is the github repository for the Animals as Objects / Tiere als Objekte project with Trust and MfN Berlin.

## First time install for content creators.

## 1. Github

Github will be our collaboration platform, where we store our shared work and can review and comment one another.

[Create an account on Github](https://github.com/join). Keep your username and password handy!

Accept the invitation to the repository [https://github.com/trust-mfn-berlin/animals-as-objects](https://github.com/trust-mfn-berlin/animals-as-objects)

## 2. Installing our Software

### Install VSCode

[https://code.visualstudio.com/download](https://code.visualstudio.com/download)

### Install Dendron

[https://marketplace.visualstudio.com/items?itemName=dendron.dendron](https://marketplace.visualstudio.com/items?itemName=dendron.dendron)

### Install Git

Windows [https://github.com/git-for-windows/git/releases/download/v2.31.1.windows.1/Git-2.31.1-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.31.1.windows.1/Git-2.31.1-64-bit.exe)

Mac [https://sourceforge.net/projects/git-osx-installer/](https://sourceforge.net/projects/git-osx-installer/)

## 3. Download the *Animals as Objects* repository

1. Open VSCode
2. Click on the **Source Control** tab 
3. Click **Clone Repository**
4. In the command box that appears, paste the URL for our repository: [`https://github.com/trust-mfn-berlin/animals-as-objects`](https://github.com/trust-mfn-berlin/animals-as-objects)
5. You will be prompted to login with Github. Follow the link to authenticate in the browser.
6. Once authenticated you will need to choose a directory on your machine to place the repository. *Note: the repository will be contained in it's own folder, you just need to choose the parent directory.*
7. On success, you should see this in the bottom right corner of your VSCode window. 
Click **Open**
8. In the bottom left corner, click on **Master.** In git, branches are parallel versions of the same repository. We are going to select the branch **content-creation** to work in.

## 4. Initialising Dendron

Congrats, we now have our repository ready. But wait, we aren't seeing the Dendron Vault yet...

First, open the command palette. You can do this by pressing on Mac: `⌘` + `Shift` + `P` or on Windows: `Ctrl` + `Shift` + `P`

Now in the Command Palette, type `Dendron: Change Workspace` and press `Enter` on your keyboard.


You will be prompted to enter the new path for Dendron. The easiest way to do this is to **Right click** the **empty space** in the left hand column, in the dropdown titled **ANIMALS-AS-OBJECTS** and click **Copy Path.**

Then **paste** this path into the Command Palette by hitting `Ctrl + v` (windows) or `⌘ + v` (mac), and then hit `Enter`

Congratulations! The entire workflow should now be setup.  🎉 🦍 🕶️

Further help can be found in the Dendron document `help.get started.md`

---

## Instructions for developers

- Node version i'm using `16.10.0`
- `npm i` install modules
- `npm run dev` run non static dev server locally
- `npm run local` generate static site and serve locally
- `npm run colours` assign random colours to articles
- `npm run images` batch resize images in the `vault` 


Animals as Objects has three main elements:

## 1. Dendron for writing and linking articles.

 [Dendron](https://www.dendron.so/) is a knowledge mapping VSCode extension. All dendron content lives in the `vault` folder. You will need to open the `dendron.code-workspace` file once Dendron is installed to see content in the `vault` through the Dendron interface.
 
 To configure fields that the netlify cms interface can edit see: `static/admin/config.yml`

## 2. Netlify CMS

[Netlify CMS](https://www.netlifycms.org/) acts as a bridge between Dendron and the frontend. Content created in Dendron is stored in the `vault` as markdown files with YAML frontmatter. Netlify CMS (NOT the deployment platform, only the CMS) can read the content in the `vault` folder and pipe it to Nuxt via [Nuxt-Content](https://www.netlifycms.org/docs/nuxt/#using-nuxtcontent). Netlify CMS also handles editing content for all static / singleton pages like the about page. It is recommended that Content editors, when only working with metadata for articles, edit through the Netlify CMS admin interface (i.e. https://dev.animalsasobjects.org/admin)

## 3. NuxtJS & Nuxt-Content frontend framework

The frontend of the site is built in Vue using NuxtJS and the [Nuxt-Content](https://content.nuxtjs.org/) module. 

The site is [statically generated](https://nuxtjs.org/docs/concepts/static-site-generation/) so that every single page is a static HTML file that loads in the JS app when the user visits. 

Static generation is important because there are several generate-time hooks that process content from Dendron and make it usable in the JS app frontend. 

Several scripts outlined below run at generate time. Namely:

- `scripts/copy-audio.js` Copies static audio files from `vault` to `static` so they can be served through nuxt
- `scripts/create-thumbnails.js` Generates small thumbnail versions of article cover images in root `vault` folder
- `scripts/copy-images.js` Copies static image files from `vault` to `static`
- `scripts/link-map.js` Creates map of bi-directional links in `temp/backlinks.json` and D3 import ready data for homepage in `temp/graphdata.json`
- `scripts/create-timeline.js` Creates D3 import ready timeline of articles in `temp/dates.json`

### Bilingual Markdown files + footnotes

Bilingual support is added (somewhat hackily) through a special markdown structure

example: `material.article.md`

```
---------YAML----------

title:article

--------MD BODY--------

:::EN:::
English content

:::DE:::
German content

-----------------------
```

Special separators `:::EN:::` and `:::DE:::` mean that one file can contain both languages of the article.

In the `hooks` section of `nuxt.config.js` each markdown article is split and rejoined, while footnotes are moved into a separate JS AST tree so they can be put into the sidebar.

_`nuxt.config.js` is a bit unwieldy and should be optimised._


### D3 Timeline and Graphs

[D3](https://d3js.org/) is used in several places to render the node graphs and timeline.

### PDF Generation

`scripts/export-pdf.js`

PDF generation is handled as a node process as part of the static site generation. After all pages are generated, it spins up an instance of headless chrome using [Puppeteer](https://github.com/puppeteer/puppeteer). It then visits every article page's special HTML print version i.e. `localhost:3000/material.article-name/print/` programmatically and generates PDFs in both languages that are saved in the `pdf` folder on the server to be accessed statically.

After all PDFs are generated, it will shut down the Chromium instance.

