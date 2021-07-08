<template>
  <div class="route-container">
    
    <hgroup class="page-header">
      <h1 class="f-serif">{{route.title}}</h1>
      <h3 class="subheading f-mono">
        <span class="type" >{{route.articles.length}} articles</span>
        <span v-if="route.author">Curated by: {{route.author}}</span>
      </h3>
    </hgroup>

    <main>

    <section class="introduction">  
      <div class="introduction-inner">
        <p class="f-serif">{{route.into_text.text_en}}</p>
        
      </div>
      <aside class="bio">
        <div class="bio-inner">
        <h3 class="subheading f-mono">About {{route.author}}</h3>
        <p class="f-mono quote">{{route.author_bio.author_bio_en}}</p>
        </div>
      </aside>
    </section>

    <section class="articles">
      <Cascade :articles="articles"/>
      <text-button v-if="route.pdf" type="anchor" :linkto="route.pdf">Download this Route as a PDF</text-button>
    </section>

    <route-breadcrumb :route="route"/>

    </main>
  </div>
</template>

<script>
import textButton from '../../../components/base/text-button.vue';
export default {
  components: { textButton },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  async asyncData({ $content, params, error, payload }) {
    var route = {};
    var articles = [];

    if(payload){
      route = await payload
      return { route }
    } else {
      console.log('no payload, fetching fresh data')
    try {
      const results = await $content('netlify/pathways/' + params.slug).fetch();
      route = results;
      results.articles.forEach(async article => {
        const a = await $content(article.article).fetch();
        articles.push(a);
      });

    } catch (e) {
      error({ message: e });
    }

    return {
      route, articles
    };
    }
  },
  mounted(){
    this.$store.commit('toggleMobileMenu', false);
  }
}
</script>

<style lang="less" scoped>
hgroup{

h3{
    .type{
      color: @black;
      border-radius: @radius-max;
      background-color: @white;
      padding:@space-xs 10px;
    }
  }
}

main{
  
}

.introduction{
  padding:0 @space-s;
  display: flex;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    flex-direction: column;
  }

  .introduction-inner{
    line-height: @lh-long;
    width: 60vw;
    padding-bottom: 2rem;

    @media screen and (max-width: @mq-s) /* Mobile */ {
      width:100%;
      padding-bottom: 0;
    }
  }

  aside.bio{
  width: 30vw;
  margin-left: @space-m;
    .bio-inner{
      position: sticky;
      top:1rem;
      border-left: 1px solid @black;
      padding-left: @space-s;
      margin-bottom: 1rem;
      h3{
        margin-bottom: @space-s;
      }
    }

    @media screen and (max-width: @mq-s) /* Mobile */ {
      width:100%;
      margin-left:0;
    }
  }
}

.articles{
  padding: @space-s;
  background-color: @bg-2;
  margin-bottom: @space-s;
}
</style>