<template>
  <audio controls="controls">
    <source type="audio/mp3" :src="file">
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  name:'audiocomponent',
  props:{
    file:{
      type:String,
      required:true
    }
  }
}
</script>