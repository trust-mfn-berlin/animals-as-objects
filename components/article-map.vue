<template>
  <article>
    <div class="slide" v-for="(slide, index) in slides" :key="index" >
      <transition name="fade">
      <figure v-show="currentSlide == index" >
        <div class="img-wrap" >
          <nuxt-img width="1600" height="1400" :src="slide.map_image" alt="Map Image"/> 
        </div>
        <figcaption ref="caption">
          <div class="heading-wrap">
            <h3 class="subheading">{{slide.title}}</h3>
            <div class="caption-img-wrap">
              <nuxt-img v-if="slide.caption_image" width="250" height="250" :src="slide.caption_image.src" :alt="slide.caption_image.alt" /> 
            </div>
          </div>
          <p class="f-serif quote">{{slide.caption}}</p>
          <nav class="slider-nav">
            <icon-button icon="arrow-left" class="slider-navigate-back" @click.native="prevSlide" :tao_type="$store.getters.articleTaoType"/>
            <span class="counter">{{currentSlide + 1}}/{{slides.length}}</span>
            <icon-button icon="arrow-right" class="slider-navigate-forward" @click.native="nextSlide" :tao_type="$store.getters.articleTaoType"/>
          </nav>
          
        </figcaption>

        <nav class="mobile-slider-nav">
          <div class="mobile-slider-nav-wrap">
            <icon-button icon="arrow-left" class="slider-navigate-back" @click.native="prevSlide" :tao_type="$store.getters.articleTaoType"/>
              <span class="counter">{{currentSlide + 1}}/{{slides.length}}</span>
            <icon-button icon="arrow-right" class="slider-navigate-forward" @click.native="nextSlide" :tao_type="$store.getters.articleTaoType"/>
          </div>
        </nav>
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
    prevSlide(){
      if(this.currentSlide > 0){
        this.currentSlide --
      } else {
        this.currentSlide = this.slides.length - 1
      }
    },
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
        position: relative;
        width: 20rem;
        height: 100%;
        overflow-y: auto;
        margin: 0;
        background-color: @white;
        // background-color: @bg-2;
        padding: @space-m;
        display: flex;
        flex-direction: column;
        

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
          flex-grow: 1;
        }

        nav.slider-nav{
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          // justify-content: space-around;
          align-items: center;
          position:sticky;
          bottom: 0;
          padding-top: @space-m;
          left:0;

          .counter{
            margin: 0 @space-m;
            // display: none;
          }

          .slider-navigate-back{
            // margin-right: @space-xs;
            margin-left: auto;
          }

          .slider-navigate-forward{
            // margin-left: @space-xs;
            margin-right: auto;
          }
        }

      }

      .mobile-slider-nav{
        display: none;
      }
      @media screen and (max-width: @mq-l) /* Mobile */ {
        flex-direction: column;
        height: 700px;

        figure{
          height: 300px;
        }

        .mobile-slider-nav{
          bottom: -1rem;
          position: absolute;
          display: block;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-around;
          width: 100%;
          .mobile-slider-nav-wrap{
          display: flex;
          flex-wrap: nowrap;
          align-items: center;

            .counter{
              display: none;
              .f-mono();
              margin: 0 @space-m;
            }
            .slider-navigate-back{
              margin-right: @space-xs;
            }

            .slider-navigate-forward{
              margin-left: @space-xs;
            }
          }
        }

        figcaption{
          height: 400px;
          width: 100%;

          display: flex;
          flex-direction: row;

          nav.slider-nav{
            display: none;
          }
          
        }

        .heading-wrap{
          min-width: 25%;
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