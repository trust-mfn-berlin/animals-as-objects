<template>
  <div v-if="page" class="container">
    <hgroup class="page-header">
      <h1>{{page.title}}</h1>
    </hgroup>
    <div class="container-inner">
      <main >
        <nuxt-content id="articlebody" :document="page" />
      </main>
      <aside class="f-mono quote">
        <ol v-if="page.toc.length > 0">
          <li v-for="subheading in page.toc" :key="subheading.id" @click="tocScroll(subheading.id)" :class="'depth-' + subheading.depth">{{subheading.text}}</li>
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
      const data = await $content('netlify', 'datapolicy_en').fetch();
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
  },
  mounted(){
    this.$store.commit('toggleMobileMenu', false);
  },
  head() {
    return {
      htmlAttrs: {
        lang: 'en'
      },
      link:[
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      title: 'Animals as Objects? Data privacy policy'
    };
  },
}
</script>

<style lang="less" scoped>

@import '~assets/less/singleton';

</style>