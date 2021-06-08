<template>
  <main>
    <h1 class='text-links' v-if="error.statusCode === '404'">Page not found. <a href="/" >Go back?</a></h1>
    <h1 class='text-links' v-else>Error {{error.statusCode}} <a href="/" >Go back?</a></h1>
  </main>
</template>

<script>
  export default {
    props: ['error'],
  }
</script>