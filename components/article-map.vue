<template>
  <article :style="{minHeight: calcHeight + 'px'}">
    <div class="slide" v-for="(slide, index) in slides" :key="index" @click="nextSlide">
      <transition name="fade">
      <figure v-show="currentSlide == index">
        <nuxt-img width="1000" :height="height" :src="slide.map_image" /> 
        <figcaption ref="caption" class="quote">
        {{slide.caption}}
        </figcaption>
      </figure>
      </transition>
    </div>
  </article>
</template>

<script>
export default {
  name:'article-map',
  props:{
    slides:{
      type:Array,
      required: true
    },
  },
  data(){
    return{
      height:700,
      calcHeight: this.height,
      currentSlide:0
    }
  },
  computed:{

  },
  methods:{
    nextSlide(){
      if(this.currentSlide < this.slides.length - 1){
        this.currentSlide ++
      } else {
        this.currentSlide = 0
      }
    },
    calculateHeight(){
      this.calcHeight = this.height + this.$refs.caption[this.currentSlide].offsetHeight
    }
  },
  mounted(){
    this.calculateHeight();    
  },
  updated(){
    this.calculateHeight(); 
  }
}
</script>

<style lang="less" scoped>
article{
  width: 100%;
  position: relative;
  margin: 4rem 0;

  .animatemedium(all);

  div.slide{
    width: 100%;
    position: absolute;

    figure{
      position: absolute;
      img{
        width: 100%;
      }
      figcaption{
        // background-color: rgba(255,255,255,0.9);
        margin: 0;
        background-color: @bg-2;
        padding: @space-m;
        width:100%;
      }
    }

  }
}
</style>