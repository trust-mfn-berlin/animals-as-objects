<template>
  <span class='wiki-link-component' >
    <Inline v-if="match(storeArticles, link)" :article="storeArticle" :alias="alias"/>  
    <a v-else class="error">MISSING: {{link}}</a>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        href: '',
        storeArticle: {},
      }
    },
    props:{
      link:{
        type:String,
        required: true
      },
      alias:{
        type:String
      }
    },
    methods:{
      match(store, link){
        for (let i = 0; i < store.length; i++) {
          const storeArticle = store[i];
          const s = storeArticle.slug.toLowerCase();
          const l = link.toLowerCase();
          if(s === l){
            this.storeArticle = storeArticle;
            this.href = storeArticle.slug;
            return true;
          }
        }
      }
    }, 
    computed:{
      linkTitle(){
        for (let i = 0; i < this.$slots.default.length; i++) {
          const el = this.$slots.default[i];
          if(el.componentOptions){
            // console.log(el.componentOptions);
            if(el.componentOptions.children[0].text){
              return el.componentOptions.children[0].text;
            }
          }
        }
      },
      storeArticles(){
        return this.$store.getters.loadedArticles;
      },
    },
  }
</script>

<style lang="less" scoped>

span{
  display: inline-block;
  position: relative;
  bottom: -0.33333rem;
}

.error{
  color:#ccc;
  // text-decoration: underline;
  // border-bottom: 1px dotted red ;
  bottom: 0.3333rem;
  position: relative;
  // .f-mono();
}

a{
  border-color: transparent !important;
}

</style>