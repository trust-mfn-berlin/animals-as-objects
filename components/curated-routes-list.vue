<template>
    <div>
      <ul>
        <li v-for="(route, index) in routes" :key="index">
          <Route :route="route" />
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name:'routes-list',
  props:{
    routes:{
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
li{
  margin-bottom: @space-s;
}
</style>