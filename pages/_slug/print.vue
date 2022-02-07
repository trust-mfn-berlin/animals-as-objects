<template>
  <div class="article-container">
    <div id="header">
      <h5 class="headcol left">Animals as Objects?</h5><h5 class="headcol mid"><span class="type">{{article.tao_type}}</span> {{article.title}} by {{article.author}}</h5><h5 class="headcol right">P.<span class="pageNumber"></span></h5>
    </div>
    <hgroup class="heading">
      <h1>{{article.title}}</h1>
    </hgroup>
    <div class="article-inner">
    <main v-if="article">
      <nuxt-content id="articlebody" :document="article" :class="article.tao_type" ref="articlebody"/>
    </main>
    <aside>
      <ul>
        <li v-if="article.tao_type">Article type: {{article.tao_type}}</li>
        <li v-if="article.author">Author: {{article.author}}</li>
        <li v-if="article.translators && article.translators.translator_de_en">Translated by: {{article.translators.translator_de_en}}</li>
        <li v-if="article.copy_editors && article.copy_editors.copy_editor_en">Copy editor: {{article.copy_editors.copy_editor_en}}</li>
        <li v-if="article.license">Text license: {{article.license}}</li>
        <li v-if="article.doi">DOI: {{article.doi}}</li>
        <li v-if="article.updatedAt">Last updated: {{article.updatedAt | formatDate}}</li>
      </ul>
    </aside>
    </div>
    <div id="footer">
      <h5 class="footcol left"><a href="animalsasobjects.org">animalsasobjects.org/{{article.slug}}</a></h5><h5 class="footcol right">Created: {{ new Date() | formatDate}}</h5> 
    </div>
  </div>
</template>

<script>

export default {
  name:'article-page-print',
  layout:'print',
  data(){
    return{
    }
  },
  async asyncData({ $content, params, error, payload }) {
    var article = {};

    // console.log(payload);

    if(payload){
      article = await payload
      // console.log('PAYLOAD', article);
      return { article }
    } else {
      // console.log('no payload, fetching fresh data')
    try {
      const data = await $content(params.slug).fetch();
      article = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      article,
    };
    }
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Animals as Objects? ' + this.article.title + ' by ' + this.article.author
    };
  },
};
</script>

<style lang="less" scoped>

@import url('~assets/less/pdf');

</style>