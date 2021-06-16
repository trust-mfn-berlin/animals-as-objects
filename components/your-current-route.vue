<template>
  <ol>
    <li v-if="routes.length > max" class="excess">+{{indexStart}}</li>
    <li v-for="(route, index) in routes.slice(indexStart,routes.length)" :key="index">
      <Inline :article="route" />
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

li a::after{
  display: inline-block;
  // content:'\a0,'
  content:'\a0→'
}

li:last-of-type a::after{
  content:''
}
</style>