<template>
  <aside :class="{open:isSidebarOpen}" :aria-hidden="isSidebarOpen ? false : true" ref="sidebar">
    <section id="section-details">
      <h3 class="f-mono subheading">Details</h3>
      <ul>
        <li>Article type: <span>{{article.tao_type}}</span></li>
        <li>Author: <span>{{article.author}}</span></li>
        <li>Text License: <span>{{article.license}}</span></li>
        <li>DOI: <span>{{article.id}}</span></li>
        <li>Last updated: <span>{{article.updatedAt}}</span></li>
      </ul>
      <div class="button-array">
        <text-button linkto="">Download PDF</text-button>
        <text-button linkto="" @click.native="openCitationModal">Cite this Article</text-button>
      </div>
    </section>
    <section id="section-toc" v-if="article.toc.length > 0">
      <h3 class="f-mono subheading">Table of Contents</h3>  
      <ol>
        <li v-for="link in article.toc" :key="link.id">
          <a :href="'#'+link.id">{{link.text}}</a>
        </li>
      </ol>
    </section>
    <section id="section-backlinks" v-if="article.backlinks.length > 0">
      <h3 class="f-mono subheading">Pages that link here</h3>  
      <ol>
        <li v-for="link in article.backlinks" :key="link.id">
          <nuxt-link :to="'/'+link">{{link}}</nuxt-link>
        </li>
      </ol>
    </section>
    <section id="section-routes" v-if="matchedRoutes.length > 0">
      <h3 class="f-mono subheading">This page appears in these Curated Routes</h3>  
      <ul>
        <li v-for="route in matchedRoutes" :key="route.slug">
          <nuxt-link :to="'/routes/' + route.slug">{{route.title}}</nuxt-link>
        </li>
      </ul>
    </section>
    <section id="section-footnotes" v-if="footnotesParsed">
      <h3 class="f-mono subheading ">Footnotes</h3>
      <div class="footnotes-inner text-links" v-html="footnotesParsed"></div>
    </section>
  </aside>
</template>

<script>
export default {
  name:'sidebar',
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
      matchedRoutes:[]
    }
  },
  computed:{
    isSidebarOpen(){
      return this.$store.getters.isSidebarOpen
    },

  },
  methods:{
     matchRoutes(link){

      for (let i = 0; i < this.$store.getters.loadedRoutes.length; i++) {
        const storeRoute = this.$store.getters.loadedRoutes[i];
         
        for (let a = 0; a < storeRoute.articles.length; a++) {
          const storeRouteArticle = storeRoute.articles[a].article;

          const s = storeRouteArticle.toLowerCase();
          const l = link.toLowerCase();
          if(s === l){
            this.matchedRoutes.push(storeRoute);
          }
          
        }
      }
    },
    openCitationModal(){
      this.$store.commit('toggleCitationModal', {isOpen: true, article: this.article});
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.footnotesParsed = this.footnotes.replaceAll('id="fn-', 'id="sidebar-fn-');
    })
    this.matchRoutes(this.article.slug);
  },
  watch:{
    activeFootnote(activeFootnote){
      if(activeFootnote){

        this.scrollToElement(document.getElementById(activeFootnote), 800, this.$refs.sidebar);

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
  width: 33vw;
  max-width: 20rem;
  // height: 100%;
  background-color: @white;
  top:0;
  bottom: 0;
  right: 0;
  // padding: @space-m 0;
  z-index: @z-sidebar;

  font-size: 0.83333rem;

  overflow:auto;
  transform: translateX(100%);
  
  .animateslow(transform);

  &.open{
    // right:0;
    transform: translateX(0);
  }

  section{
    border-bottom: 2px solid rgba(0,0,0,0.05);
    padding: @space-m;

    ul{
      margin-bottom: @space-s;
    }

    h3{
      margin-bottom: 1rem;
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