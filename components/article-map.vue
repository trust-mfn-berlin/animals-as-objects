<template>
  <article>
    <div class="slide" v-for="(slide, index) in slides" :key="index" @click="nextSlide">
      <transition name="fade">
      <figure v-show="currentSlide == index" >
        <div class="img-wrap" >
          <nuxt-img width="1600" height="1400" :src="slide.map_image" /> 
        </div>
        <figcaption ref="caption">
          <div class="heading-wrap">
            <h3 class="subheading">{{slide.title}}</h3>
            <div class="caption-img-wrap">
              <nuxt-img v-if="slide.caption_image" width="250" height="250" :src="slide.caption_image.src" :alt="slide.caption_image.alt" /> 
            </div>
          </div>
          <p class="f-serif quote">{{slide.caption}}</p>
          {{currentSlide + 1}}/{{slides.length}}
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
  },
  mounted(){
  },
  updated(){
  }
}
</script>

<style lang="less" scoped>
article{
  height: 700px;
  width: 100%;
  position: relative;
  margin: 4rem 0;

  // .animatemedium(all);

  div.slide{
    width: 100%;
    position: absolute;

    figure{
      height: 700px;
      position: absolute;
      overflow: hidden;
      display: flex;
      // flex-direction: row-reverse;
      .img-wrap{
        width: 100%;
        height: 100%;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
      figcaption{
        width: 25rem;
        height: 100%;
        overflow-y: auto;
        margin: 0;
        background-color: @white;
        // background-color: @bg-2;
        padding: @space-m;
        

        .caption-img-wrap{
          margin:@space-m auto;

          img{
            border-radius: @radius-max;
            margin:0 auto;
            display: block;
          }
        }
        h3{
          margin-bottom: @space-s;
          text-align: center;
        } 

        p{
          line-height: @lh-default !important;
        }

      }
      @media screen and (max-width: @mq-l) /* Mobile */ {
        flex-direction: column;
        height: 700px;

        figure{
          height: 300px;
        }

        figcaption{
          height: 400px;
          width: 100%;

          display: flex;
          
        }

        .heading-wrap{
          min-width: 30%;
          margin-right: @space-m;
        }

        .caption-img-wrap{
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }

  }
}
</style>