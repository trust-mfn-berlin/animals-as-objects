<template>
  <article :style="{minHeight: height+'px'}">
    <div class="slide" v-for="(slide, index) in slides" :key="index" @click="nextSlide">
      <figure v-show="currentSlide == index">
        <nuxt-img width="1000" :height="height" :src="slide.map_image" /> 
        <figcaption class="f-serif quote">
        {{slide.caption}}
        </figcaption>
      </figure>
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
      height:500,
      currentSlide:0
    }
  },
  methods:{
    nextSlide(){
      if(this.currentSlide < this.slides.length - 1){
        this.currentSlide ++
      } else {
        this.currentSlide = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
article{
  width: 100%;
  position: relative;
  margin: 4rem 0;

  div.slide{
    width: 100%;
    position: absolute;

    figure{
      position: absolute;
      img{
        width: 100%;
      }
      figcaption{
        background-color: rgba(255,255,255,0.9);
        padding: @space-m;
        width:100%;
        // position: absolute;
        bottom:0;
        // margin: -@space-m auto 0 auto;
        // z-index: 2;
      }
    }

  }
}
</style>