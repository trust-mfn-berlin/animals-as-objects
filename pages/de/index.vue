<template>
  <div class="homepage-container">

    <graph />
    
    <div class="spacer"></div>
    <section class="cascade">
      <p class="intro">
        Erfahren Sie mehr über unerwartete Verbindungen zwischen einigen der beliebtesten Berliner Tiere und zahlreichen weniger charismatischen oder berühmten Exemplaren, indem Sie sich durch unsere <span class="theme tao_type"><em>Themen</em></span>, <span class="story tao_type"><em>Storys</em></span> und <span class="material tao_type"><em>Materien</em></span> klicken. <em>Themen</em> zeigen größere Zusammenhänge auf und verbinden verschiedene <em>Storys</em>, die wiederum Anekdoten, Praktiken und <em>Materien</em> miteinander verweben – eben die spezifischen Dinge, Dokumente und Momente, die die Verwandlung von Tieren in Objekte markieren.
      </p>
      <Cascade :articles="articles" />
      <text-button linkto="/de/articles">Alle Artikel ansehen</text-button>
    </section>

    <section class="routes">
      <h2>Kuratierte Routen</h2>
      <curated-routes-list :routes="routes" />
      <text-button linkto="/de/routes">Alle kuratierten Routen ansehen</text-button>
    </section>

    <section class="outro">
      <p class="outro-text">
        <span class="f-mono">Tiere als Objekte?</span> ist eine Online-Publikation von Wissenschaftler*innen des Museums für Naturkunde Berlin, des Berliner Zoos und der Humboldt-Universität zu Berlin. Wir sind Wissenschaftshistoriker*innen, Forscher*innen in den Science Studies, Kulturwissenschaftler*innen und Anthropolog*innen. Das Projekt wurde vom Bundesministerium für Bildung und Forschung (BMBF) gefördert und läuft von September 2018 bis Dezember 2021.      </p>
      <text-button linkto="/de/about">Mehr über das Projekt</text-button>
    </section>

  </div>
</template>

<script>
import graph from '@/components/graphs/graph'

export default {
  components:{
    graph
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
    this.$store.commit('setSiteLanguage', 'de')
  },
  mounted(){
    document.documentElement.style.setProperty("--selection-bg", "#ccc");
    this.$store.commit('toggleMobileMenu', false);
  },
  head() {
    return {
      // script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
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
  }

  &.timeline{
    background-color: @bg-2;
  }

  &.outro{
    padding:@space-l @space-l @space-l @space-s;
    background-color: @bg-2;

    @supports (backdrop-filter: blur()) {
      background: rgba(243, 236, 229, 0.8);
      backdrop-filter: blur(10px);
    }
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
