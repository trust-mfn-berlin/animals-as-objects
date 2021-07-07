<template>
  <div style="postion: relative">

    <graph />
    
    <div class="spacer"></div>
    <section class="cascade">
      <p class="intro"><span class="f-mono">Animals as Objects?</span> is an online publication produced by the Museum für Naturkunde Berlin and Zoo-Berlin. Learn more about the unique connections between some of Berlin’s most beloved animals by viewing articles: <span class="theme tao_type">Themes</span> are large topics that contain many <span class="story tao_type">Stories</span>, and <span class="material tao_type">Materials</span> are focused explorations into these emergent connections.</p>
      <Cascade :articles="articles" />
      <text-button linkto="/articles">View All Articles</text-button>
    </section>

    
    

    <!-- <section class="routes">
      <h2>Curated routes</h2>
      <curated-routes-list :routes="routes" />
      <text-button linkto="/routes">Explore more Curated routes</text-button>
    </section>

    <section class="timeline">
      <h2>Timeline</h2>
      <timeline />
      <text-button linkto="/articles">View All Articles</text-button>
    </section> -->
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
  },
  head() {
    return {
      // script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>

<style lang="less" scoped>
body{
  /* background-color: #F3EEE9; */
}

.spacer{
  height: calc(100vh);
  pointer-events: none;
}

section{

  h2{
    margin-bottom: @space-s;
  }
  
  padding:@space-s;
  margin-bottom: 2rem;

  &.cascade{
    position: relative;
    // z-index: 1;
    // background-color: @bg-2;
    background: rgba(243, 236, 229, 0.8);
    backdrop-filter: blur(10px);
  }

  &.routes{

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
    border-radius: @radius-s;
  }
}

</style>
