<template>
  <div v-if="page">
    <h2>{{page.title}}</h2>
    <nuxt-content :document="page" />
    <nuxt-content :document="page.body_de" />
    <template v-if="page.backlinks">
    <ul v-if="page.backlinks.length >= 1" class='backlinks'>
      <li><small>Pages that link to this page</small></li>
      <li class='backlink' v-for="(link, index) in page.backlinks" :key="index">
        <backlink :to="link"> </backlink>
      </li>
    </ul>
    </template>
  </div>
</template>

<script>
import wikilink from '@/components/wikilink'
import backlink from '@/components/backlink';
export default {
  name:'page',
  components:{
    backlink,
    wikilink
  },
  computed:{
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  mounted(){
    this.$store.commit('addPathway', this.$route.params.slug)
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
      const data = await $content(params.slug).fetch();
      page = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      page,
    };
    }
  },
};
</script>

<style scoped>
</style>