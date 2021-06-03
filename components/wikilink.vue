<template>
  <span class='wiki-link-component' >
      <Inline v-if="match(storePages, linkTitle)" :article="storePage" />  
      <slot v-else></slot>
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
      linkTitle(){
        for (let i = 0; i < this.$slots.default.length; i++) {
          const el = this.$slots.default[i];
          if(el.componentOptions){
            if(el.componentOptions.children[0].text){
              return el.componentOptions.children[0].text;
            }
          }
        }
      },
      storePages(){
        return this.$store.getters.loadedPages;
      },
    },
  }
</script>

<style lang="less" scoped>
// .wiki-link-component{
//   border:1px solid #ccc;
//   display: inline-block;
//   padding:4px 6px;
//   border-radius: 5px;
//   font-size: 0.9rem;
//   background-color: white;
// }

// .wiki-link-component:hover{
//   box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
// }

::v-deep .dendron-link{
  display: none;
}

span{
  display: inline-block;
  position: relative;
  bottom: -0.33333rem;
}

</style>