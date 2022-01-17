<template>
  <div class="article-routes" v-show="$store.getters.isTrackingEnabled">
    <h2>{{siteLang == 'de' ? 'Ihre aktuelle Route' : 'Your current route'}} <text-button @click.native="toggleRouteInfo" :isActive="showRouteInfoText" type="button" class='about-routes-button' aria-label="About routes / Über Routes" >?</text-button> <span v-if="showRouteInfoText" class="route-info-text">{{routeInfoText}}</span></h2> 
    <your-current-route :max="9"/>
    <svg class="mob-only" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
      <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
    </svg>

    <common-routes v-if="this.$store.getters.mostCommonRoutes.length != 0"/>

  </div>
</template>

<script>
export default {
name:'article-routes',
  computed:{
    siteLang(){
      return this.$store.getters.siteLanguage
    },
    routeInfoText(){
      if(this.siteLang == 'de'){
        return 'Das ist Ihre aktuelle Route durch den Seiteninhalt. Keine Sorge, alle Informationen sind anonym.'
      } else {
        return 'This is your current route through the website. Don’t worry, this information is anonymous.'
      }
    }
  },
  data(){
    return{
      showRouteInfoText: false
    }
  },
  methods:{
    toggleRouteInfo(){
      if(this.showRouteInfoText){
        this.showRouteInfoText = false
      } else {
        this.showRouteInfoText = true
      }
    }
  },
}
</script>

<style lang="less" scoped>
.article-routes{
  margin-top:5rem;
  margin-bottom: 2rem;

  svg{
    margin-top: @space-s;
    transform: rotate(90deg);
  }
}

h2{
  margin-bottom: @space-s;
  line-height: @lh-default;

.about-routes-button{
  vertical-align: text-bottom;
}
.route-info-text{
  opacity: 0.2;
}
}

</style>