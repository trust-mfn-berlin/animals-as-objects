<template>
  <div class="article-routes">
    <h2>Your current route</h2>
    <your-current-route :max="9"/>
    <!-- <small class="f-mono caption">This is your current route through the content. Don’t worry, all information is anonymous.</small> -->
    <svg class="mob-only" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
      <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
    </svg>
    <div class="recommended-articles">
      <article>
        <h2>Least visited from here</h2>
        <your-current-route :max="2"/>
        <svg class="mob-only" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
          <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
        </svg>
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

  svg{
    margin-top: @space-s;
    transform: rotate(90deg);
  }
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

  @media screen and (max-width: @mq-s) /* Mobile */ {
    flex-direction: column;
    article{
      width: 100%;
    }
  }
}
</style>