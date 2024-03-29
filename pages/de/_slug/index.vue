<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <hgroup class="heading article-header" :style="{background:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <div class="heading-inner"><h1>{{article.title_de}}</h1>
      <h2 class="lead subheading f-mono">
        <span class="type" :class="article.tao_type" >{{article.tao_type_de ? article.tao_type_de : article.tao_type}}</span>
        <span v-if="article.short_desc_de">{{article.short_desc_de}}</span>
        <span v-else>I need a short description!</span>
      </h2>
      </div>
    </hgroup>

    <section>
      <nuxt-content id="articlebody" :document="article.body_de" :class="article.tao_type" ref="articlebody"/>
    </section>  

    <section id="license">
      <article-license-footer :license="article.license"/>
    </section>    
    
    <section id="article-routes">
      <article-routes/>
    </section>
  </main>
  <sidebar :article="article" :footnotes="fn.de" :activeFootnote="activeFootnote"/>
  </div>
</template>

<script>

export default {
  name:'article-page',
  layout:'articlelayout',
  data(){
    return{
      footnotes:"",
      activeFootnote:""
    }
  },
  methods:{
    addFootnoteListener(){
      const footnotes = document.getElementsByClassName('footnote-ref');
      const that = this;

      for (let i = 0; i < footnotes.length; i++) {
        const footnote = footnotes[i];

        footnote.addEventListener("click", function(e){
          // console.log(e);
          e.preventDefault();
          that.onFootnoteClick(footnote.hash);
        })
        
      }

    },
    removeEventListeners(){
      // console.log('destroy');
      const footnotes = document.getElementsByClassName('footnote-ref');
      const that = this;
      for (let i = 0; i < footnotes.length; i++) {
        const footnote = footnotes[i];
        footnote.removeEventListener("click", function(){
          that.onFootnoteClick(footnote.hash)
        })
      }
    },
    onFootnoteClick(hash){
      if(!this.$store.getters.isSidebarOpen) this.$store.commit('toggleSidebar', true)
      this.activeFootnote = hash.replace('#','sidebar-')
      // console.log(hash)
    }

  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },
    seoImageUrl(){
      if(this.article.cover_image){
        if(this.article.cover_image.image){
          return  'https://dev.animalsasobjects.org' + this.article.cover_image.image
        }
      }
      return 'https://dev.animalsasobjects.org/seo.jpg'
    }
  },
  created(){
    // make sure correct language
    this.$store.commit('setSiteLanguage', 'de')
    // set current tao-type in store
    this.$store.commit('setArticleTaoType', this.article.tao_type);
  },
  mounted(){

    // update colour scheme
    document.documentElement.style.setProperty("--current-scheme-bg", "var(--scheme-"+this.article.colour_scheme+"-bg)");
    document.documentElement.style.setProperty("--current-scheme-fg", "var(--scheme-"+this.article.colour_scheme+"-fg)");
    this.$store.commit('toggleMobileMenu', false);
    if(window){
      if(window.innerWidth < 501) this.$store.commit('toggleSidebar', false);
    }
    // copy footnotes into sidebar
    // if(document.getElementsByClassName('footnotes')[0]){
    //   this.footnotes = document.getElementsByClassName('footnotes')[0].innerHTML;
    // }

    // remove footnotes from dom(?) 
    // document.getElementsByClassName('footnotes')[0].remove()

    this.addFootnoteListener();
    
    
  },
  beforeDestroy(){
    this.removeEventListeners();
  },
  async asyncData({ $content, params, error, payload }) {
    var article = {};
    var fn = {};

    if(payload){
      article = await payload
      fn = article.fn;
      if(article.hasFootnotes && fn.de.body.children){
        for (let i = 0; i < fn.de.body.children[3].children.length; i++) {
        const element = fn.de.body.children[3].children[i];
          if(element.props){
            if(element.props.id){
              fn.de.body.children[3].children[i].props.id = "sidebar-" + element.props.id;
            }
          }
        }
      }
      return { 
        article, 
        fn 
      }
    } else {
      // console.log('no payload, fetching fresh data')
    try {
      const data = await $content(params.slug).fetch();
      article = data;
      fn = article.fn;
      if(article.hasFootnotes && fn.de.body.children){
        for (let i = 0; i < fn.de.body.children[3].children.length; i++) {
        const element = fn.de.body.children[3].children[i];
          if(element.props){
            if(element.props.id){
              fn.de.body.children[3].children[i].props.id = "sidebar-" + element.props.id;
            }
          }
        }
      }
    } catch (e) {
      error({ message: e });
    }

    return {
      article,
      fn
    };
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'de'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favis/'+ this.article.tao_type +'.png?r='+Math.random() }
      ],
      meta:[
        { hid: 'description', name: 'description', content: this.article.author + ' | ' + this.article.desc_de},
        { property:'og:image', 'content': this.seoImageUrl, hid: 'og:image'}, 
      ],
      title: this.article.title_de
    };
  },
};
</script>

<style lang="less" scoped>

@import '~assets/less/article.less';

</style>