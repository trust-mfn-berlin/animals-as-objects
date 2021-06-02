<template>
  <div>
    <!-- <graph /> -->
    <!-- <Cascade :articles="pages" /> -->
    <!-- <text-button linkto="/index">View All Articles</text-button> -->
    <timeline />
  </div>
</template>

<script>
import timeline from '../components/graphs/timeline'

export default {
  components:{
    timeline
  },
  async asyncData({ $content }) {
    const results = await $content().fetch();
    var pages = [];
    const max = 5;
    var t = 0;
    var m = 0;
    var s = 0;
    
    results.forEach(page => {
      if(page.tao_type == "theme" && t < max){
        pages.push(page);
        t++
      } else 
      if(page.tao_type == "material" && m < max){
        pages.push(page);
        m++
      } else
      if(page.tao_type == "story" && s < max){
        pages.push(page);
        s++
      }
    });

    return {
      pages,
    };
  },
  created(){
    this.$store.commit('setSiteLanguage', 'en')
  },
  head() {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
    };
  },
}
</script>

<style>

</style>
