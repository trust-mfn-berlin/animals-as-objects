<template>
  <span class='backlink-component'>
    <nuxt-link v-if="match(storePages, to)" :to="href">{{titleBilingual}}</nuxt-link>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        href: '',
        storePage: {}
      }
    },
    props:{
      to:{
        type: String,
        required: true
      }
    },
    methods:{
      match(store, link){
        for (let i = 0; i < store.length; i++) {
          const storePage = store[i];
          const s = storePage.slug.toLowerCase();
          const l = link.toLowerCase();
          if(s === l){
            this.storePage = storePage;
            this.href = storePage.slug;
            return true;
          }
        }
      }
    },
    computed:{ 
      storePages(){
        return this.$store.getters.loadedPages;
      },
      titleBilingual(){
        if(this.$store.getters.siteLanguage == 'de' && this.storePage.title_de){
          return this.storePage.title_de
        } else {
          return this.storePage.title
        }
      }
    },
  }
</script>

<style scoped>
.back-link-component{
  border:1px solid #ccc;
  display: inline-block;
  padding:4px 6px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: white;
}

.back-link-component:hover{
  box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
}

::v-deep .dendron-link{
  display: none;
}
</style>