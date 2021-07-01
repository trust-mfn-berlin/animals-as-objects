<template>
  <article :style="{minHeight: calcHeight + 'px'}">
    <div class="slide" v-for="(slide, index) in slides" :key="index" @click="nextSlide">
      <transition name="fade">
      <figure v-show="currentSlide == index" >
        <div class="img-wrap" :style="{height: height + 'px'}">
          <nuxt-img width="1000" :height="height" :src="slide.map_image" /> 
        </div>
        <figcaption ref="caption">
          <h3 class="subheading">{{slide.title}}</h3>
          <p class="f-serif quote">{{slide.caption}}</p>
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
      height:600,
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
      overflow: hidden;
      .img-wrap{
        width: 100%;
      }
      img{
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
      figcaption{
        h3{
          margin-bottom: @space-s;
        } 

        p{

        }
        margin: 0;
        background-color: @white;
        // background-color: @bg-2;
        padding: @space-m;
        width:100%;
      }
    }

  }
}
</style>