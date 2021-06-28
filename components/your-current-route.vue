<template>
<div class="current-route-outer">
  <transition name="fade">
  <ol class="current-route-inner" v-if="matchedRoutes" v-show="displayed && matched">
    <li v-if="matchedRoutes.length > max" class="excess">+{{indexStart}}</li>
    <li v-for="(route, index) in matchedRoutes.slice(indexStart,matchedRoutes.length)" :key="index">
      <Inline :article="route" />
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
        <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
      </svg>
    </li>
  </ol>
  </transition>
</div>
</template>

<script>
export default {
name:"your-current-route",
props:{
  max:{
    type: Number,
    required: false,
    default: 25
  }
}, 
data(){
  return{
    matchedRoutes:[],
    matched: false,
    displayed: false
  }
},
computed:{
  indexStart(){
    if(this.matchedRoutes.length > this.max){
      return Math.abs(this.matchedRoutes.length - this.max);
    } else {
      return 0
    }
  },
  currentRoute(){
    return this.$store.getters.currentRoute;
  }
},
methods:{
  async matchRoutes(){

      this.matched = false;

      for (let i = 0; i < this.currentRoute.length; i++) {
        const storeRouteSingle = this.currentRoute[i].route;

        // console.log(storeRouteSingle)

        if(storeRouteSingle){

          const article = await this.$content(storeRouteSingle).only(['slug', 'title', 'title_de', 'id', 'tao_type', 'colour_scheme']).fetch()
          .catch((err) => {
            console.warn('page not found', err)
          })
          
          // console.log(article);
          if(article){
            this.matchedRoutes.push(article)
          }

        }
      }
      console.log('test');
      this.matched = true;

    },
  },
mounted(){
  this.matchRoutes();

  const that = this;

  setTimeout(function(){ that.displayed = true }, 50);

},
watch: {
  async currentRoute(currentRoute) {
    this.matchRoutes();
    
  }
}
}
</script>

<style lang="less" scoped>

.current-route-outer{
  background-color: @bg-2;
  padding: @space-m;
  border-radius: @radius-l;
} 

ol{
  display: flex;
  flex-wrap: wrap;
  gap: @space-s;
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
}

.dots{
  width: 0.5rem;
  height: 1px;
  border-bottom: 1px dashed @black;
  margin-left:0.5rem;
}

svg{
  display: inline-block;
  margin-left:0.5rem;
  height: 1rem;
  // background-color: blue;
  
}

li.excess{
  font-size:@fs-s;
  background-color: @white;
  height: 1.33333rem;
  padding:0.37rem 0.4rem 0;
  // box-shadow: @shadow-small;
  // margin-left: @space-xs;
  display: inline-block;
  line-height: unset;

}

// li a::before{
//   display: inline-block;
//   // content:'\a0,'
//   content:'→\a0'
// }

// li:first-of-type a::before{
//   content:''
// }
</style>