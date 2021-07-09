<template>
  <form id='cookie-disclaimer' v-show="!this.$store.getters.isTrackingEnabled">
    <label class='text-links f-mono subheading'>Allow Cookies? <nuxt-link to="/datenschutz">What they do</nuxt-link></label>
    <text-button type="button" @click.native="onAccept">OK</text-button>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';


export default{
  name:'cookie-bar',
  methods:{
    onAccept(e){
      e.preventDefault();
      const uniqueId = uuidv4();
      this.setCookie('tao-uid', uniqueId);
      this.$store.commit('enableTracking');
    },
    setCookie(name, value){
      this.$cookies.set(name, value, {
        path: '/',
        maxAge: 60 * 60 * 24 * 1 // 1 day
      })
    }
  }
}
</script>

<style lang="less" scoped>
#cookie-disclaimer{
  position: fixed;
  bottom: @space-s;
  left:@space-s;
  // background: @white;
  // padding:@space-s;
  z-index: @z-cookie;
  // box-shadow: @shadow;

  label{
    background-color: @black;
    color:@white;
    box-shadow: @shadow;
    // display: inline-block;
    padding: 0.625rem 0.8rem 0.7rem;
    border-radius: @radius-s;
    width: auto;
    position: relative;
    height: 2rem;
    min-height: 44px;
    
    
    a{
      border-color: @white;
      &:hover{
        border-color: transparent;
      }
    }
  }
  
  @media screen and (max-width: @mq-s) /* Mobile */ {
    bottom:0;
    left:0;
    right:0;
    // background-color: @white;
    display: flex;
    // justify-content: space-between;
    padding:@space-s;
    label{
      margin-right: @space-xs;
      // padding:0;
      // background-color: transparent;
      // box-shadow: none;
    }
  }
}
</style>