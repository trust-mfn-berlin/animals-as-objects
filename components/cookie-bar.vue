<template>
  <form id='cookie-disclaimer' v-show="!this.$store.getters.isTrackingEnabled">
    <label class='text-links f-mono'>Accept Cookies? read our <nuxt-link to="datenschutz">privacy policy</nuxt-link></label>
    <button @click="onAccept">Yes</button>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
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
  background: @white;
  padding:@space-s;
}
</style>