<template>
  <div v-if="page">
    <h2>{{page.title}}</h2>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  created(){
    this.$store.commit('setSiteLanguage', 'de')
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
      const data = await $content('netlify', 'datapolicy_de').fetch();
      page = data;
    } catch (e) {
      error({ message: e });
    }

    return {
      page,
    };
    }
  },
}
</script>