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

  generate: {
    crawler: false,
    exclude: [
      /^\/admin/ // path starts with /admin
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
  ],

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
    '@nuxt/content'
  ],

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
    }
  },

  hooks: {
    'content:file:beforeParse': (file) => {
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
      if(languageSplitterBuffer){
        // console.log('combining languages...')
        document.body_de = await database.markdown.toJSON(languageSplitterBuffer);
      }

      // console.log(document)

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
      const files = await $content().fetch()
      const routes = files.map(file => {
        return {
          route: file.slug === '/index' ? '/' : file.slug,
          payload: file
        }
      })
      const routes_de = files.map(file => {
        return {
          route: file.slug === '/index' ? '/de/' : '/de/' + file.slug,
          payload: file
        }
      })
      let routesBilingual = [...routes, ...routes_de];
      // console.log(routesBilingual);
      return routesBilingual
    }
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
