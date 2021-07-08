<template>
  <div class="article-routes">
    <h2>Your current route</h2>
    <your-current-route :max="9"/>
    <!-- <small class="f-mono caption">This is your current route through the content. Don’t worry, all information is anonymous.</small> -->

    <div class="recommended-articles">
      <article>
        <h2>Least visited from here</h2>
        <your-current-route :max="2"/>
      </article>
      <article>
        <h2>Most visited from here</h2>
        <your-current-route :max="2"/>
      </article>
    </div>
  </div>
</template>

<script>
export default {
name:'article-routes',
  props:{
    
  },
  data(){
    return{
    }
  },
}
</script>

<style lang="less" scoped>
.article-routes{
  margin-top:5rem;
}

h2{
  margin-bottom: @space-s;
}

.recommended-articles{
  margin-top:@space-m;
  display: flex;
  gap:@space-s;
  article{
    width: 50%;
  }
}
</style>