<template>
  <div v-if="page" class="container">
    <hgroup>
      <h1>{{page.title}}</h1>
    </hgroup>
    <div class="container-inner">
      <main >
        <nuxt-content :document="page" />
      </main>
      <aside class="f-mono quote">
        <ol v-if="page.toc.length > 0">
          <li v-for="subheading in page.toc" :key="subheading.id" @click="tocScroll(subheading.id)">{{subheading.text}}</li>
        </ol>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  async asyncData({ $content, params, error, payload }) {
    var page = {};

    // console.log(payload);

    if(payload){
      page = await payload
      // console.log('PAYLOAD', page);
      return { page }
    } else {
      console.log('no payload, fetching fresh data')
    try {
      const data = await $content('netlify', 'about_en').fetch();
      page = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      page,
    };
    }
  },
  methods:{
    tocScroll(el){
      this.scrollToElement(document.getElementById(el), 700, -90);
      history.pushState({},null, this.$route.path + '#' + el);
    },
  }
}
</script>

<style lang="less" scoped>

.container{
  padding: 0 @space-s;
}

.container-inner{
  display: flex;
}

main{
  width: 60vw;
}

aside{
  width: 30vw;
  margin-left: @space-m;
  ol{
    position: sticky;
    top:1rem;
    border-left: 1px solid @black;
    padding-left: @space-s;
  }
}
</style>