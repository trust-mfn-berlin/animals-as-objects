<template>
  <div class="subnav-filter" role="radiogroup" aria-labelledby="filter-label">
    <text-button class="breadcrumb-link"  linkto="/routes" aria-checked="false" :isDisabled="false">View all curated routes</text-button>
    <!-- <text-button class="breadcrumb-link"  type="button" aria-checked="false" :isDisabled="true">{{route.title}}</text-button> -->
  </div>
</template>

<script>
import iconButton from './base/icon-button.vue'
export default {
  components: { iconButton },
  name:"route-breadcrumb",
  props:{
    route:{
      type:Object,
      required: true
    }
  },
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
.subnav-filter{
  display: flex;
  padding-left: @space-s;
  // position: fixed;
  // top:3rem;
  // left:@space-s;
  // 

  .breadcrumb-link{
    margin-right: @space-xs;
  }
}
</style>