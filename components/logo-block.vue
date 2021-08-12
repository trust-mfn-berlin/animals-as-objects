<template>
  <div class="sponsors-logo-block-outer">
    <div v-if="siteLang == 'de'" class="sponsors-logo-block-de inner" >
      <img class="hu" src="/sponsors/export/hu.png" title="Humboldt-Universität zu Berlin" alt="Humboldt-Universität zu Berlin"/>
      <img class="mfn" src="/sponsors/export/mfn.png" title="Museum für Naturkunde Leibniz-Institut für Evolutions- und Biodiversitätsforschung" alt="Museum für Naturkunde Leibniz-Institut für Evolutions- und Biodiversitätsforschung"/>
      <img class="l" src="/sponsors/export/l-de.png" title="Leibniz-Gemeinschaft" alt="Leibniz-Gemeinschaft"/>
      <img class="zoo" src="/sponsors/export/zoo.png" title="Zoologischer Garten Berlin" alt="Zoologischer Garten Berlin"/>
      <img class="bmbf" src="/sponsors/export/bmbf-de.svg" title="Gefördert vom Bundesministerium für Bildung und Forschung" alt="Gefördert vom Bundesministerium für Bildung und Forschung"/>
    </div>

    <div v-else class="sponsors-logo-block-en inner">
      <img class="hu" src="/sponsors/export/hu.png" title="Humboldt University of Berlin" alt="Humboldt University of Berlin"/>
      <img class="mfn" src="/sponsors/export/mfn.png" title="The Museum für Naturkunde – Leibniz Institute for Evolution and Biodiversity Science" alt="The Museum für Naturkunde – Leibniz Institute for Evolution and Biodiversity Science"/>
      <img class="l" src="/sponsors/export/l-en.png" title="Leibniz Association" alt="Leibniz Association"/>
      <img class="zoo" src="/sponsors/export/zoo.png" title="Zoo Berlin" alt="Zoo Berlin"/>
      <img class="bmbf" src="/sponsors/export/bmbf-en.svg" title="Sponsored by the Federal Ministry of Education and Research" alt="Sponsored by the Federal Ministry of Education and Research"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logoblock',
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
  }
}
</script>

<style lang="less" scoped>
.sponsors-logo-block-outer{
  margin: 5rem 0 6rem;

  h3{
    // margin-bottom: 2rem;
  }

  .inner{
    display: flex;
    
    max-width: 100%;
    flex-wrap: wrap;
    // border:1px solid black;

   

    img{
      height: 4rem;
      margin-right: @space-m;
      margin-bottom: 2rem;
      // background-color: grey;
    }

    @media screen and (max-width: @mq-s) /* Mobile */ {
      display: block;
      height: auto;
      img{
        max-height: none;
        display: block;
        height: 4.5rem;
        max-width: 100%;
        margin: 0 auto 2rem auto !important;
      }

      img.bmbf{
        height: 6rem;
        top:0;
        padding-right: 2rem;
      }
    }
  }
  

  img.zoo{
    padding:0.95em 0 0.55em;
  }

  img.mfn{
    padding: 0.2em 0;
  }

  img.bmbf{
    max-height: none;
    height: 5.2rem;
    position: relative;
    top:-0.8rem;
  }
}
</style>