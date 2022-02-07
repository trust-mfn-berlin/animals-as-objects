<template>
  <div class="article-container">
    <div id="header">
      <h5 class="headcol left">Tiere als Objekte?</h5><h5 class="headcol mid"><span class="type">{{article.tao_type}}</span> {{article.title_de}} by {{article.author}}</h5><h5 class="headcol right">S.<span class="pageNumber"></span></h5>
    </div>
    <hgroup class="heading">
      <h1>{{article.title_de}}</h1>
      <h2 v-if="article.short_desc_de">{{article.short_desc_de}}</h2>
    </hgroup>
    <div class="article-inner">
    <main v-if="article">
      <nuxt-content id="articlebody" :document="article.body_de" :class="article.tao_type" ref="articlebody"/>
    </main>
    <aside>
      <ul>
        <li v-if="article.tao_type">Artikeltyp: {{article.tao_type_de}}</li>
        <li v-if="article.author">Autor:in: {{article.author}}</li>
        <li v-if="article.translators && article.translators.translator_en_de">Übersetzer:in: {{article.translators.translator_en_de}}</li>
        <li v-if="article.copy_editors && article.copy_editors.copy_editor_de">Lektor:in: {{article.copy_editors.copy_editor_de}}</li>
        <li v-if="article.license">Textlizenz: {{article.license}}</li>
        <li v-if="article.doi">DOI: {{article.doi}}</li>
        <li v-if="article.updatedAt">Zuletzt aktualisiert: {{article.updatedAt | formatDate}}</li>
      </ul>
    </aside>
    </div>
    <div id="footer">
      <h5 class="footcol left"><a href="animalsasobjects.org/de">animalsasobjects.org/de/{{article.slug}}</a></h5><h5 class="footcol right">Created: {{ new Date() | formatDate}}</h5> 
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
    this.$store.commit('setSiteLanguage', 'de')
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'de'
      },
      title: 'Tiere als Objekte? ' + this.article.title_de + ' von ' + this.article.author
    };
  },
};
</script>

<style lang="less" scoped>

@import url('~assets/less/pdf');

::v-deep .nuxt-content .footnotes::before {
    content: 'Fußnoten';
}

</style>