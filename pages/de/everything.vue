<template>
  <div class="homepage-container">
    <section class="cascade">
      <Cascade :articles="all" />
    </section>

    <section class="outro">
      <p class="outro-text">
        <span class="f-mono">Tiere als Objekte?</span> ist eine Online-Publikation von Wissenschaftler:innen des Museums für Naturkunde Berlin, des Berliner Zoos und der Humboldt-Universität zu Berlin. Wir sind Wissenschaftshistoriker:innen, Forscher:innen in den Science Studies, Kulturwissenschaftler:innen und Anthropolog:innen. Das Projekt wurde vom Bundesministerium für Bildung und Forschung (BMBF) gefördert und läuft von September 2018 bis Dezember 2021.</p>
      <text-button linkto="/de/about">Mehr über das Projekt</text-button>
    </section>

  </div>
</template>

<script>

export default {

  data(){
    return{
      articles:[]
    }
  },
  async asyncData({ $content }) {
    const content = await $content().without(['body', 'body_de']).fetch();

    var all = [];
    
    content.forEach(article => {
      if(article.archived != true){
        if(article.tao_type == "theme" || article.tao_type == "material" || article.tao_type == "story"){
          all.push(article);
        }
      }
    });

    return {
      all
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
      title: 'Tiere als Objekte?'
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
    // background-color: @bg-2;

    @supports (backdrop-filter: blur()) {
      // background: rgba(243, 236, 229, 0.8);
      // backdrop-filter: blur(10px);
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
