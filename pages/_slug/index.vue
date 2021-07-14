<template>
  <div class="article-container">
  <main v-if="article" :class="{open : isSidebarOpen}">
    <hgroup class="heading article-header" :style="{background:'var(--scheme-'+article.colour_scheme+'-bg)', color:'var(--scheme-'+article.colour_scheme+'-fg)'}">
      <div class="heading-inner"><h1>{{article.title}}</h1>
      <h2 class="lead subheading f-mono">
        <span class="type" v-if="article.tao_type" :class="article.tao_type" >{{article.tao_type}}</span>
        <span v-if="article.short_desc">{{article.short_desc}}</span>
        <span v-else>I need a short description!</span>
      </h2>
      </div>
    </hgroup>

    <section>
      <nuxt-content id="articlebody" :document="article" :class="article.tao_type" ref="articlebody"/>
    </section>  

    <section id="license">
      <article-license-footer :license="article.license"/>
    </section>  
    
    <section id="article-routes">
      <article-routes/>
    </section>

    
  </main>

  <sidebar :article="article" :footnotes="footnotes" :activeFootnote="activeFootnote"/>

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
    },
    initPage(){

      this.$store.commit('toggleMobileMenu', false);
      
      if(this.article){
        document.documentElement.style.setProperty("--current-scheme-bg", "var(--scheme-"+this.article.colour_scheme+"-bg)");
        document.documentElement.style.setProperty("--current-scheme-fg", "var(--scheme-"+this.article.colour_scheme+"-fg)");
      }

      if(window){
        if(window.innerWidth < 501) this.$store.commit('toggleSidebar', false);
      }

    }

  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },
  },
  created(){
    // make sure correct language
    this.$store.commit('setSiteLanguage', 'en')
    // set current tao-type in store
    // this.$store.commit('setArticleTaoType', this.article.tao_type);
  },
  mounted(){
    
    this.initPage();

    // copy footnotes into sidebar
    if(document.getElementsByClassName('footnotes')[0]){
      this.footnotes = document.getElementsByClassName('footnotes')[0].innerHTML;
    }
    
    this.addFootnoteListener();
    
  },
  beforeDestroy(){
    this.removeEventListeners();
  },
  async asyncData({ $content, params, error, payload, store }) {
    var article = {};

    // console.log('helllo');

    // console.log(payload);

    if(payload){
      console.log('PAYLOAD');
      article = await payload;
      store.commit('setArticleTaoType', article.tao_type);
      return { 
        article
      }
    } else {
      // console.log('no payload, fetching fresh data')
      try {
        const data = await $content(params.slug).fetch();
        article = data;
        store.commit('setArticleTaoType', article.tao_type);
        // console.log(article);
      } catch (e) {
        error({ message: e });
      }

      return {
        article,
      };
    }
  },
};
</script>

<style lang="less" scoped>

@import '~assets/less/article.less';

</style>