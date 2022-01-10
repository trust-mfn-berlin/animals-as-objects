<template>
<div class="recommended-articles">
<article>
  <h4>{{siteLang == 'de' ? 'Von hier aus selten besucht' : 'Least common paths from here'}}</h4>
  <div class="common-route-outer">
    <transition name="fade">
    <ol class="common-route-inner" v-if="leastVisitedRoutes" v-show="displayed && matched">
      <li v-for="(route, index) in leastVisitedRoutes" :key="index">
        <Inline :article="route" /> 
        <sub>{{route.count}}</sub>
      </li>
    </ol>
    </transition>
  </div>
</article>

<article>
  <h4>{{siteLang == 'de' ? 'Von hier aus häufig besucht' : 'Most common paths from here'}}</h4>
  <div class="common-route-outer">
    <transition name="fade">
    <ol class="common-route-inner" v-if="mostVisitedRoutes" v-show="displayed && matched">
      <li v-for="(route, index) in mostVisitedRoutes" :key="index">
        <Inline :article="route" />
        <sub>{{route.count}}</sub>
      </li>
    </ol>
    </transition>
  </div>
</article>
</div>
</template>

<script>
export default {
name:"common-routes",
props:{

}, 
data(){
  return{
    matched: false,
    displayed: false,
    mostVisitedRoutes:[],
    leastVisitedRoutes:[]
  }
},
computed:{
  mostVisited(){
    return this.$store.getters.mostCommonRoutes;
  },
  leastVisited(){
    return this.$store.getters.leastCommonRoutes;
  },
  siteLang(){
    return this.$store.getters.siteLanguage;
  }
},
methods:{
  async matchRoutes(){

      // if(!this.commonRoutes) return
      if(!this.leastVisited) return
      if(!this.mostVisited) return

      this.matched = false;

      for (let i = 0; i < this.mostVisited.length; i++) {
        const r = this.mostVisited[i].route;

        console.log(r, this.mostVisited[i].count);

        if(r){

          var article = await this.$content(r).only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme', 'cover_image']).fetch()
          .catch((err) => {
            console.warn('page not found', err)
          })

          if(article){
            article.count = this.mostVisited[i].count;
            this.mostVisitedRoutes.push(article)
          }

        }
      }

      for (let i = 0; i < this.leastVisited.length; i++) {
        const r = this.leastVisited[i].route;

        if(r){

          var article = await this.$content(r).only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme', 'cover_image']).fetch()
          .catch((err) => {
            console.warn('page not found', err)
          })
          
          if(article){
            article.count = this.leastVisited[i].count;
            this.leastVisitedRoutes.push(article)
          }

        }
      }
      // console.log('test');
      this.matched = true;

    },
  },
mounted(){
  this.matchRoutes();

  const that = this;

  setTimeout(function(){ that.displayed = true }, 50);

},
watch: {
  async leastVisited() {
    this.matchRoutes();
  },
  async mostVisited() {
    this.matchRoutes();
  }
}
}
</script>

<style lang="less" scoped>

.common-route-outer{
  background-color: @bg-2;
  padding: @space-m;
  border-radius: @radius-l;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    padding: 0;
    background-color: transparent;
  }
} 

article{
  @media screen and (max-width: @mq-s) /* Mobile */ {
    margin-bottom: @space-m;
  }
}

ol{
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  gap: @space-s;

  @media screen and (max-width: @mq-s) /* Mobile */ {
    flex-direction: column;
  }
}

h4{
  margin-bottom: @space-s;
}

li{
  display: flex;
  align-items: center;
  &:last-of-type{
    svg{
      display: none;
    }
    .dots{
      display: none;
    }
  }

  @media screen and (max-width: @mq-s) /* Mobile */ {
    svg{
      display: none;
    }
  }
}

sub{
  position: unset;
  bottom:0;
  top:0;
  display: inline-block;
  // background-color: @bg;
  opacity: 0.2;
  font-family: @f-mono;

  font-size:@fs-s;
  height: 1.33333rem;
  max-height: 1.33333rem;
  padding:0.26rem 0.4rem 0;
  line-height: unset;

  width: fit-content;

  margin-left: @space-xs;

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