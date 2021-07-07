const { $content } = require('@nuxt/content');
const backlinks = require(__dirname + '/temp/backlinks.json');
const { wikiLinkRegex, wikiLinkReplacer } = require(__dirname + '/scripts/wiki-link-parser.js');
const {frontMatterRegex, languageSplitterRegex} = require(__dirname + '/scripts/splitter-regex.js');

var languageSplitterBuffer = '';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'animals-as-objects',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'robots', content: 'noindex' } //Just Temporarily Don't Allow SEO
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'normalize.css' }, 
    '@/assets/less/global.less'
  ],

  styleResources: {
    less: [
      './assets/less/media-queries.less',
      './assets/less/variables.less',
      './assets/less/animations.less',
      './assets/less/transitions.less',
      './assets/less/z-index.less',
      './assets/less/typography.less'
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/date-filter.js',
    '~/plugins/scrolltop-animate-mixin.js'
  ],

  router:{
    middleware: 'route-middleware'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/base',
      '~/components/articles'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxt/image'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  axios:{
    baseUrl: 'https://log.animalsasobjects.org'
  },

  image: {
    // Nuxt Image Options
    // https://image.nuxtjs.org/components/nuxt-img
  },

  content: {
    liveEdit: false,
    dir: 'vault',
    markdown:{
      remarkPlugins: [

      ],
      rehypePlugins: [
        ['~plugins/img-to-nuxt-img.js',{
          width:"",
          fit:"",
          quality:"90"
        }]
      ]
    }
  },

  hooks: {
    'content:file:beforeParse': (file) => {

      const pathPartial = file.path.replace(__dirname, '').slice(0,15)
      if (pathPartial == '/vault/netlify/'){ return }

      if (file.extension === '.md') {
        // Before parsing markdown, modify raw file data here:

        // First, extract frontmatter. We will join this back on later.
        const frontMatter = file.data.match(frontMatterRegex)[0];
        // console.log(frontMatter);

        // Second, add vue component markup for wiki links
        // console.log('adding wikilink components...');
        file.data = file.data.replace(wikiLinkRegex, wikiLinkReplacer);

        
        // Third, use Regex to split file into multiple languages separated by triple colons :::EN::: ... :::DE::: 
        // console.log('splitting languages...')
        const langSplit = file.data.match(languageSplitterRegex)

        // Only if the file has these separators, join default language version (English) back together with frontmatter.
        if(langSplit){
          file.data = frontMatter + langSplit[2];
          // Send second language data out of this hook, to be recombined and parsed in next hook. Where does this buffer live in memory? IDK, as long as it doesn't happen on client side.
          languageSplitterBuffer = frontMatter + langSplit[4];
        }
      }

    },
    'content:file:beforeInsert': async (document, database) => {

      if(document.dir == '/netlify'){return}

      if(languageSplitterBuffer){
        // console.log('combining languages...')
        document.body_de = await database.markdown.toJSON(languageSplitterBuffer);
      }

      // console.log(document)
      if(document.id == '2df514da-8df2-4278-8534-28e1034c7adf'){
        // console.log(document.body)
      }

      for (let i = 0; i < backlinks.length; i++) {
        const page = backlinks[i];

        if(document.slug == page.slug){
          // console.log('match');
          document.backlinks = page.backlinks;
          document.forwardlinks = page.forwardlinks;
          
        }
        
      }
    },
    'content:options': (options) => {
      // console.log('Content options:', options)
    }
  },

  generate: {
    crawler: false,
    async routes () {
      const files = await $content().fetch();
      const curatedRoutes = await $content('/netlify/pathways').fetch();

      var routeArray = [];

      curatedRoutes.forEach(file => {
        routeArray.push({
          route: '/routes/' +file.slug,
          payload: file
        });
        routeArray.push({
          route: '/de/routes/' + file.slug,
          payload: file
        });
      });

      files.forEach(file => {
        if(file.tao_type){
          // articles
          routeArray.push({
            route: file.slug,
            payload: file
          });
          // articles PDF ready
          routeArray.push({
            route: file.slug + '/print',
            payload: file
          });
          // articles DE
          routeArray.push({
            route: '/de/' + file.slug,
            payload: file
          })
          // articles DE PDF ready
          routeArray.push({
            route: '/de/' + file.slug + '/print',
            payload: file
          })
        } else {
          // Other Pages
          routeArray.push({
            route: file.slug === '/index' ? '/' : file.slug,
            payload: file
          })
          routeArray.push({
            route: file.slug === '/index' ? '/de/' : '/de/' + file.slug,
            payload: file
          })
        }
      });


      return routeArray
    },
    exclude: [
      /^\/admin/ // path starts with /admin
    ]
  },

  vue: {
    config: {
      devtools: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
