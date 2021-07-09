<template>
  <aside :class="{open:isSidebarOpen}" :aria-hidden="isSidebarOpen ? false : true" ref="sidebar"  v-if="article">
    <section id="section-details">
      <h3 class="f-mono subheading">Details</h3>
      <ul>
        <li v-if="article.tao_type">Article type: <span>{{article.tao_type}}</span></li>
        <li v-if="article.author">Author: <span>{{article.author}}</span></li>
        <li v-if="article.license">Text License: <span>{{article.license}}</span></li>
        <li v-if="article.doi">DOI: <span>{{article.doi}}</span></li>
        <li>Last updated: <span>{{article.updatedAt | formatDate}}</span></li>
      </ul>
      <div class="button-array">
        <text-button type="anchor" :linkto="'/pdf/' + pdfNameBilingual + article.slug + '.pdf'">Download PDF</text-button>
        <text-button type="button" @click.native="openCitationModal">Cite this Article</text-button>
      </div>
    </section>

    <template v-if="siteLang == 'en' && article.toc">
      <contents :toc="article.toc" label="Table of contents" />
    </template>
    <template v-if="siteLang == 'de' && article.body_de.toc">
      <contents :toc="article.body_de.toc" label="Inhaltsverzeichnis" />
    </template>

    <section id="section-backlinks" v-if="article.backlinks.length > 0">
      <h3 class="f-mono subheading">Pages that link here</h3>
      <graph-backlinks  :article="{slug: article.slug, title: article.title, tao_type: article.tao_type}" :backlinks="article.backlinks"/>
    </section>

    <curatedRoutes :slug="article.slug"/>

    <section id="section-footnotes" v-if="footnotesParsed">
      <h3 class="f-mono subheading ">Footnotes</h3>
      <div class="footnotes-inner text-links" v-html="footnotesParsed"></div>
    </section>

    
  </aside>
</template>

<script>
import contents from './sidebar/contents.vue'
import curatedRoutes from './sidebar/sidebar-curated-routes.vue'


export default {
  name:'sidebar',
  components: { contents, curatedRoutes },
  props:{
    article:{
      type: Object,
      required: true
    },
    footnotes:{
      type: String,
      required: false
    },
    activeFootnote:{
      type: String,
      required: false
    }
  },
  data(){
    return{
      footnotesParsed:'',
      matchedCuratedRoutes:[]
    }
  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },
    siteLang(){
      return this.$store.getters.siteLanguage
    },
    tocBilingual(){
      if(this.siteLang == 'de'){
        return this.storePage.title_de
      } else {
        return this.storePage.title
      }
    },
    pdfNameBilingual(){
      if(this.siteLang == 'de'){
        return 'tiere_als_objekte-'
      } else {
        return 'animals_as_objects-'
      }
    }

  },
  methods:{
    openCitationModal(){
      this.$store.commit('toggleCitationModal', {isOpen: true, article: this.article});
    },
    async addFootnoteBacklinkListener(){
      const backrefs = await document.getElementsByClassName('sidebar-footnote-backref');
      const that = this;
      for (let i = 0; i < backrefs.length; i++) {
        const backref = backrefs[i];
        backref.addEventListener("click", function(e){
          e.preventDefault();
          that.onBackrefClick(backref.hash);
        })
      }
    },
    removeEventListeners(){
      // console.log('destroy');
      const backrefs = document.getElementsByClassName('sidebar-footnote-backref');
      const that = this;
      for (let i = 0; i < backrefs.length; i++) {
        const backref = backrefs[i];
        backref.removeEventListener("click", function(){
          that.onBackrefClick(backref.hash)
        })
      }
    },
    onBackrefClick(hash){
      console.log('backref', hash);
      var h = hash.replace('#', '');
      
      // Mobile hide sidebar
      if(window){
        if(window.innerWidth < 501) this.$store.commit('toggleSidebar', false);
      }

      this.scrollToElement(document.getElementById(h), 700, -90);
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.footnotesParsed = this.footnotes.replaceAll('id="fn-', 'id="sidebar-fn-').replaceAll('class="footnote-backref"', 'class="sidebar-footnote-backref"')
      // this.footnotesParsed = this.footnotes;
    })
    this.$nextTick(function(){
      this.addFootnoteBacklinkListener();
    })
  },
  beforeDestroy(){
    this.removeEventListeners();
  },
  watch:{
    activeFootnote(activeFootnote){
      console.log(activeFootnote);
      if(activeFootnote){

        this.scrollToElement(document.getElementById(activeFootnote), 800, 0, this.$refs.sidebar);

        document.getElementById(activeFootnote).classList.add('focus');

        setTimeout(function(){ 
          document.getElementById(activeFootnote).classList.remove('focus');
        }, 500);


      }
    }
  }
}
</script>

<style lang="less" scoped>
aside{
  display: block;
  position: fixed;
  width: 20rem;
  background-color: @white;
  overflow-y: auto;
  top:0;
  bottom: 0;
  right: 0;
  // padding: @space-m 0;
  z-index: @z-sidebar;

  font-size: 0.83333rem;

  overflow:auto;
  transform: translateX(100%);
  
  .animateslow(transform);
  
  @media screen and (max-width: @mq-s) /* Mobile */ {
    width: 100%;
  }

  &.open{
    // right:0;
    transform: translateX(0);
  }

  section{

    overflow-x:hidden;
    border-bottom: 2px solid @bg;
    padding: @space-m;

    ul{
      margin-bottom: @space-s;
    }

    h3{
      margin-bottom: 1rem;
    }

    &#section-details{
      li{
        margin-bottom: 0.4rem;
      }
    }

    &#section-backlinks{
      position: relative;
      overflow: hidden;
      h3{
        // position:absolute;
        // background-color: rgba(255,255,0,0.1);
        // box-shadow: 0px 5px 5px red;
        // backdrop-filter: blur(5px);
        // top:0;
        // left:0;
        padding: @space-m @space-m @space-s @space-m;
        margin: 0;
      }
      background-color: transparent;
      padding: 0;
    }
  }

  .footnotes-inner{
    ::v-deep hr{
      display:none
    }
    // font-size: @fs-s;

    ::v-deep ol{
      list-style-type: decimal;

      li{
        .quote();
        // .f-mono();

        margin: 0 0 @space-s 1rem;
        padding:0rem;

        &.focus{
          animation: splash 250ms normal forwards ease-in-out;
          // color:red;
          // box-shadow: @shadow;
        }
      }
    }
  }
}

@keyframes splash {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
}
</style>