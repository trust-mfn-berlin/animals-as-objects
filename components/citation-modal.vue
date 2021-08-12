<template>
  <div class="citation-modal" role="dialog" aria-labelledby="citation_label" aria-modal="true" :class="$store.getters.articleTaoType">
    <h3 id="citation_label" class="f-mono subheading" v-if="siteLang == 'en'">Cite this article</h3>
    <h3 id="citation_label" class="f-mono subheading" v-else>zitiere diesen Artikel</h3>
    <p class="f-mono citation text-links" ref="citation" v-if="siteLang == 'en'">{{article.author}}, "{{article.title}}", <em>Animals as Objects?</em>, <span v-if="article.translators && article.translators.translator_de_en"> trans. {{article.translators.translator_de_en}},</span> 15 November 2021, Last updated {{article.updatedAt | formatDate}}, <a>https://animalsasobjects.org/{{article.slug}}</a> <span v-if="article.doi">DOI: <a>https://doi.naturkundemuseum.berlin/data/{{article.doi}}</a></span></p>
    <p class="f-mono citation text-links" ref="citation" v-else>{{article.author}}, "{{article.title_de}}", <em>Tiere als Objekte?</em>, <span v-if="article.translators && article.translators.translator_en_de"> Übers. {{article.translators.translator_en_de}},</span> 15. November 2021, letzte Aktualisierung {{article.updatedAt | formatDate}}, <a>https://animalsasobjects.org/de/{{article.slug}}</a> <span v-if="article.doi">DOI: <a>https://doi.naturkundemuseum.berlin/data/{{article.doi}}</a></span></p>
    <text-button type="button" @click.native="copyCitation()">{{copyButtonText}}</text-button>
    <icon-button class="close" :tao_type="$store.getters.articleTaoType" icon="close" @click.native="$store.commit('toggleCitationModal', {isOpen:false, article:''})">Close</icon-button>
  </div>
</template>

<script>
import textButton from './base/text-button.vue'

export default {
  components: { textButton },
  name:'citation-modal',
  props:{
    article:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
      copyButtonText: 'Copy to clipboard'
    }
  },
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
  },
  methods:{
    copyCitation(){
      const that = this;
      const copyText =  this.$refs.citation.innerText;


      navigator.clipboard.writeText(copyText).then(function() {
        console.log('copied!')
        if(that.siteLang == 'de'){
          that.copyButtonText = 'kopiert'
        } else {
          that.copyButtonText = 'Copied!'
        }
        
      }, function(){
        console.log('error while copying!')
        that.copyButtonText = 'Copy failed....'
      });
    }
  },
  mounted(){
    if(this.siteLang == 'de'){
      this.copyButtonText = 'in die Zwischenablage kopieren'
    }
  }
}
</script>

<style lang="less" scoped>
.citation-modal{
  width: 50vw;
  margin: 0 auto;
  background-color: @white;
  padding:@space-l;
  position: relative;
  z-index: 1;

  &.material{
    border-radius: @radius-l;
  }

  &.story{
    border-radius: @radius-m;
  }

  p.citation{
    margin: @space-m 0;
  }
  
  .close{
    position: absolute;
    top:@space-m;
    right: @space-m;
  }

  @media screen and (max-width: @mq-s) /* Mobile */ {
    width: calc(100% - @space-s*2)
  }
}
</style>