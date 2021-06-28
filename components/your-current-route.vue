<template>
  <ol class="current-route" v-if="routes">
    <li v-if="routes.length > max" class="excess">+{{indexStart}}</li>
    <li v-for="(route, index) in routes.slice(indexStart,routes.length)" :key="index">
      <Inline :article="route" />
      <!-- {{route}} -->
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7988 24.9829L24.8989 12.8829L12.7988 0.782849" stroke="black"/>
        <line x1="24.6113" y1="12.8901" x2="1.86801" y2="12.8901" stroke="black"/>
      </svg>
      <!-- <span class="dots"></span> -->
    </li>
  </ol>
</template>

<script>
export default {
name:"your-current-route",
props:{
  routes:{
    type: Array,
    required: true
  },
  max:{
    type: Number,
    required: false,
    default: 25
  }
}, 
computed:{
  indexStart(){
    if(this.routes.length > this.max){
      return Math.abs(this.routes.length - this.max);
    } else {
      return 0
    }
  },

}
}
</script>

<style lang="less" scoped>
ol{
  display: flex;
  flex-wrap: wrap;
  gap: @space-s;
  background-color: @bg-2;
  padding: @space-m;
  border-radius: @radius-l;
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