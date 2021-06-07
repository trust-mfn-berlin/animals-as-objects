<template>
  <div class="audio-container">
    <audio controls="controls">
    <source type="audio/mp3" :src="file">
    Your browser does not support the audio element.
    </audio>
    <figcaption><slot></slot></figcaption>
  </div>
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

<style lang="less" scoped>
.audio-container{
  display: flex;
  flex-direction: column;
  // background-color: @white;

  audio{
    border-radius: @radius-max;
    width: 100%;
    
  // only works for chrome 
    &::-webkit-media-controls-panel{
      background-color: @white;
    }
  }

  figcaption{
    margin-top:@space-s;
    text-align: center;
  }
}
</style>