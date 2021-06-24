<template>
  <div class="citation-modal" role="dialog" aria-labelledby="citation_label" aria-modal="true">
    <h3 id="citation_label" class="f-mono subheading">Cite this article</h3>
    <p class="f-mono" ref="citation">{{article.author}}, "{{article.title}}", <em>Animals as Objects?</em>, <span v-if="article.translator">, trans. {{article.translator}},</span> 15 Nov. 2021, Last updated {{article.updatedAt}}, animalsasobjects.org/{{article.slug}} <span v-if="article.doi">DOI: {{article.doi}}</span></p>
    <text-button linkto='' @click.native="copyCitation()">{{copyButtonText}}</text-button>
    <icon-button icon="close" @click.native="$store.commit('toggleCitationModal', {isOpen:false, article:''})">Close</icon-button>
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

  },
  methods:{
    copyCitation(){
      const that = this;
      const copyText =  this.$refs.citation.innerText;


      navigator.clipboard.writeText(copyText).then(function() {
        console.log('copied!')
        that.copyButtonText = 'Copied!'
      }, function(){
        console.log('error while copying!')
        that.copyButtonText = 'Copy failed....'
      });
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
}
</style>