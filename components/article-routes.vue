<template>
  <div class="article-routes" v-show="$store.getters.isTrackingEnabled">
    <h2>{{siteLang == 'de' ? 'Ihre aktuelle Route' : 'Your current route'}}</h2>
    <your-current-route :max="9"/>
    <svg class="mob-only" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
      <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
    </svg>
    <div class="recommended-articles">
      <article>
        <h2>{{siteLang == 'de' ? 'Von hier aus selten besucht' : 'Least common path from here'}}</h2>
        <your-current-route :max="2"/>
        <svg class="mob-only" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
          <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
        </svg>
      </article>
      <article>
        <h2>{{siteLang == 'de' ? 'Von hier aus häufig besucht' : 'Most common path from here'}}</h2>
        <your-current-route :max="2"/>
      </article>
    </div>
  </div>
</template>

<script>
export default {
name:'article-routes',
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    }
  }
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