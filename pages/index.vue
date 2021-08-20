<template>
  <div class="homepage-container">

    <graph />
    
    <div class="spacer"></div>
    <section class="cascade">
      <p class="intro">
        Learn more about the unexpected connections between some of Berlin’s most beloved animals as well as less charismatic and famous specimens by browsing through our <span class="theme tao_type">Themes</span>, <span class="story tao_type">Stories</span> and <span class="material tao_type">Materials</span>. Themes are big-picture topics that bring together many stories, which in turn weave together anecdotes, practices, and materials – the specific things, documents, and moments that mark the transformations of animals into objects.
      </p>
      <Cascade :articles="articles" />
      <text-button linkto="/articles">View All Articles</text-button>
    </section>

    <section class="routes">
      <h2>Curated routes</h2>
      <curated-routes-list :routes="routes" />
      <text-button linkto="/routes">Explore more Curated routes</text-button>
    </section>

    <section class="outro">
      <p class="outro-text">
        <span class="f-mono">Animals as Objects?</span> is an online publication by researchers from the Museum für Naturkunde Berlin, the Zoo Berlin, and the Humboldt University Berlin. We are historians of science, science studies scholars,  cultural studies scholars, and anthropologists. The project was funded by the German Federal Ministry for Education and Research (BMBF), and runs from September 2018 until December 2021.      </p>
      <text-button linkto="/about">More about the project</text-button>
    </section>

  </div>
</template>

<script>
import timeline from '../components/graphs/timeline'
import graph from '../components/graphs/graph'

export default {
  components:{
    graph,
    timeline
  },
  async asyncData({ $content }) {
    const content = await $content().without(['body', 'body_de']).fetch();
    const routes = await $content('/netlify/pathways').fetch();

    var articles = [];
    
    var t = [];
    var m = [];
    var s = [];

    var max = {
      total: 21,
      t: 2,
      m: 10,
      s: 3
    };


    var counters = {
      t:0,
      m:0,
      s:0
    }
    
    content.forEach(article => {
      if(article.archived != true){
        if(article.tao_type == "theme"){
          t.push(article);
        } else 
        if(article.tao_type == "material"){
          m.push(article);
        } else
        if(article.tao_type == "story"){
          s.push(article);
        }
      }
    });

    for (let index = 0; index < max.total; index = index+3) {
      const rngT = Math.floor(Math.random() * (t.length -1))
      const randomTheme = t[rngT]

      if(!articles.includes(randomTheme) && counters.t < max.t){
        articles.push(randomTheme)
        counters.t++
      }

      const rngM = Math.floor(Math.random() * (m.length -1))
      const randomMaterial = m[rngM]

      if(!articles.includes(randomMaterial) && counters.m < max.m){
        articles.push(randomMaterial)
        counters.m++
      }

      const rngS = Math.floor(Math.random() * (s.length -1))
      const randomStory = s[rngS]

      if(!articles.includes(randomStory) && counters.s < max.s){
        articles.push(randomStory)
        counters.s++
      }

    }

    var currentIndex = articles.length,  randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [articles[currentIndex], articles[randomIndex]] = [
        articles[randomIndex], articles[currentIndex]];
    }

    return {
      articles, routes
    };
  },
  methods:{
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  mounted(){
    document.documentElement.style.setProperty("--selection-bg", "#ccc");
    this.$store.commit('toggleMobileMenu', false);

    if(window){
      if(window.innerWidth > 501){
        this.$store.commit('toggleSidebar', true)
      }
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'en'
      },
      link:[
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Animals as Objects?'
    };
  },
}
</script>

<style lang="less" scoped>

.homepage-wrapper{
  position: relative;
}

.spacer{
  height: calc(100vh - 14rem);
  pointer-events: none;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    height: calc(60vh - 6rem);
  }
}

section{

  // background-color: @bg;
  position: relative;

  h2{
    margin-bottom: @space-s;
  }
  
  padding:@space-s;
  // margin-bottom: 2rem;

  &.cascade{
    position: relative;
    // z-index: 1;
    background-color: @bg-2;

    @supports (backdrop-filter: blur()) {
      background: rgba(243, 236, 229, 0.8);
      backdrop-filter: blur(10px);
    }
  }

  &.routes{
    padding:@space-l @space-s;
    background-color: @bg;
    // background-color: @bg;

    // @supports (backdrop-filter: blur()) {
    //   background: rgba(243, 236, 229, 0.8);
    //   backdrop-filter: blur(10px);
    // }
  }

  &.outro{
    padding:@space-l @space-l @space-l @space-s;
    background-color: @bg-2;

    @supports (backdrop-filter: blur()) {
      background: rgba(243, 236, 229, 0.8);
      backdrop-filter: blur(10px);
    }
  }

  &.timeline{
    background-color: @bg-2;
  }
}

p.intro{
  margin-bottom: 1rem;

  span.tao_type::before{
    content:'';
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    background-color: @black;
    margin-right: @space-xs;
  }
  span.material::before{
    border-radius: @radius-max;
  }
  span.story::before{
    border-radius: 0.2em;
  }
}

p.outro-text{
  // .f-mono();
  font-size: @fs-l;
  margin-bottom: 1rem;
}

</style>
