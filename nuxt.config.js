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
    title: 'Animals as Objects?',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Learn more about the unexpected connections between some of Berlin’s most beloved animals as well as less charismatic and famous specimens by browsing through our Themes, Stories and Materials. Themes are big-picture topics that bring together many stories, which in turn weave together anecdotes, practices, and materials – the specific things, documents, and moments that mark the transformations of animals into objects.' },
      { name: 'robots', content: 'noindex' }, //Just Temporarily Don't Allow SEO
      { property:'og:type', 'content': 'website', hid: 'og:type'}, 
      { property:'twitter:card', 'content': 'summary_large_image', hid: 'twitter:card'}, 
      { property:'og:image', 'content': 'https://dev.animalsasobjects.org/seo.jpg', hid: 'og:image'},

    ],
    link: [
      // { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      {rel: 'script', type: 'text/javascript', href:'/js/matomo.js'}
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
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
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
    fullTextSearchFields: ['title', 'title_de', 'desc', 'desc_de', 'author', 'slug', 'text'],
    dir: 'vault',
    markdown:{
      remarkPlugins: [

      ],
      rehypePlugins: [
        
      ]
    }
  },

  hooks: {
    'content:file:beforeParse': (file) => {

      const pathPartial = file.path.replace(__dirname, '').slice(0,15)
      if (pathPartial == '/vault/netlify/'){ return }

      if (file.extension === '.md') {
        // Before parsing markdown, modify raw file data here:
        // console.log(file.path);
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
      if(document.extension == '.yml') {return}

      if(languageSplitterBuffer){
        // console.log('combining languages...')
        document.body_de = await database.markdown.toJSON(languageSplitterBuffer);
      }

      // console.log(document)
      // if(document.id == '2df514da-8df2-4278-8534-28e1034c7adf'){
        // }
        
        if(document.tao_type == 'theme') document.tao_type_de = 'Thema';
        if(document.tao_type == 'story') document.tao_type_de = 'Story';
        if(document.tao_type == 'material') document.tao_type_de = 'Materie';
        
        
        for (let i = 0; i < backlinks.length; i++) {
          const page = backlinks[i];
          
          if(document.slug == page.slug){
            // console.log('match');
            document.backlinks = page.backlinks;
            document.forwardlinks = page.forwardlinks;
            
          }
        }

      // SEPARATE FOOTNOTES INTO SEPARATE AST TREE
      
      const lastNodeEn = document.body.children[document.body.children.length - 1];

      const lastNodeDe = document.body_de ? document.body_de.body.children[document.body_de.body.children.length - 1] : null;
      

      document.fn = {
        en:{
          body: {}
        },
        de:{
          body: {}
        }
      };

      if(lastNodeEn){
        if(lastNodeEn.props){
          if(lastNodeEn.props.className == 'footnotes'){
            document.hasFootnotes = true;
            document.fn.en.body = lastNodeEn
          }
        }
      }
      if(lastNodeDe){
        if(lastNodeDe.props){
          if(lastNodeDe.props.className == 'footnotes'){
            document.hasFootnotes = true;
            document.fn.de.body = lastNodeDe
          }
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
            route: '/' + file.slug,
            payload: file
          });
          // articles PDF ready
          routeArray.push({
            route: '/' + file.slug + '/print',
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
