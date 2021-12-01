<template>
  <div class="article-container">
    <div id="header">
      <h5 class="headcol left">Tiere als Objekte?</h5><h5 class="headcol mid"><span class="type">{{article.tao_type}}</span> {{article.title}} by {{article.author}}</h5><h5 class="headcol right">P.<span class="pageNumber"></span></h5>
    </div>
    <hgroup class="heading">
      <h1>{{article.title_de}}</h1>
    </hgroup>
    <div class="article-inner">
    <main v-if="article">
        <p class="f-serif">{{article.into_text.text_de}}</p>
    </main>
    <aside>
      <ul>
        <li v-if="article.author">Kuratiert von: {{article.author}}</li>
        <li v-if="article.author_bio.author_bio_de">{{article.author_bio.author_bio_de}}</li>
      </ul>
    </aside>
    </div>
    <div id="footer">
      <h5 class="footcol left"><a href="animalsasobjects.org/de">animalsasobjects.org/de/routes/{{article.slug}}</a></h5><h5 class="footcol right">Created: {{ new Date() | formatDate}}</h5> 
    </div>
  </div>
</template>

<script>

export default {
  name:'route-page-print',
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
      const data = await $content('netlify/pathways/' + params.slug).fetch();
      article = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      article,
    };
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'de'
      },
      link:[
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Tiere als Objekte? ' + this.article.title_de + ' von ' + this.article.author
    };
  },
};
</script>

<style lang="less" scoped>

@import url('~assets/less/pdf');

</style>