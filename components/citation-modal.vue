<template>
  <div class="citation-modal" role="dialog" aria-labelledby="citation_label" aria-modal="true">
    <h3 id="citation_label" class="f-mono subheading">Cite this article</h3>
    <p class="f-mono">{{article.author}}, "{{article.title}}"</p>
    <icon-button icon="close" @click.native="$store.commit('toggleCitationModal', {isOpen:false, article:''})">Close</icon-button>
  </div>
</template>

<script>

export default {
  name:'citation-modal',
  props:{
    article:{
      type: Object,
      required: true
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