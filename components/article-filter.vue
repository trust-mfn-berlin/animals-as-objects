<template>
  <div role="radiogroup" aria-labelledby="filter-label">
    <text-button role="radio" aria-checked="false" linkto="" id="filter-label" :isDisabled="true">Sort By</text-button>
    <text-button role="radio" aria-checked="false" linkto="" :isActive="true">Type</text-button>
    <text-button role="radio" aria-checked="false" linkto="" >A-Z</text-button>
    <text-button role="radio" aria-checked="false" linkto="" >Date</text-button>
    <text-button role="radio" aria-checked="false" linkto="" >Network View</text-button>
  </div>
</template>

<script>
export default {
  name:"article-filter"
}
</script>

<style lang="less" scoped>

</style>