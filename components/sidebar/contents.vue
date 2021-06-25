<template>
  <section id="section-toc" v-if="toc.length > 0">
    <h3 class="f-mono subheading">{{label}}</h3>  
    <ol>
      <li v-for="subheading in toc" :key="subheading.id">
        <a @click="tocScroll(subheading.id)" :class="'depth'+subheading.depth">{{subheading.text}}</a>
      </li>
    </ol>
  </section>
</template>

<script>
export default {
  name:'toc',
  props:{
    toc:{
      type: Array,
      required: true
    },
    label:{
      type: String,
      required: false
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
h3{
  margin-bottom: 1rem;
}

li{
  // .f-mono();
  margin-bottom: @space-s;
  .animatefast(transform);
  cursor: pointer;
  &:hover{
    transform: translateX(5px);
  }
}

.depth3{
  font-size: @fs-s;
  padding-left: @space-s;
}
</style>