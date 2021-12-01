<template>
  <div class="cascade-container">
    <ul>
      <li v-for="(article, index) of articles" :key="article.id + index">
        <Block :article="article"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cascade",
  props:{
    articles:{
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.cascade-container{
  margin-bottom: 1rem;
  ul{
    display: flex;
    flex-wrap: wrap;
    gap: @space-s; 

    // Bigger gap on mobile to avoid misclicking when scrolling
    @media screen and (max-width: @mq-s) /* Mobile */ {
      gap: @space-m;
    }
  }
}
</style>