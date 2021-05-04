<template>
  <div class="container">
    <div>
      <h1 class="title">
        Animals as Objects
      </h1>
      <small class="">Content Creation</small>
      <div class="links">
        <a
          href="/admin"
          target=""
          rel=""
          class="button--green"
        >
          Log in
        </a>
        <a
          href="https://github.com/trust-mfn-berlin/animals-as-objects/commits/content-creation"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Commit history
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  /* color: #35495e; */
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  /* color: #526488; */
  word-spacing: 5px;
  padding-bottom: 15px;
}

small{
  color: #35495e;
  /* margin-bottom: 15px; */
  padding:10px;
  display: block;
}

.links {
  padding-top: 15px;
}
</style>
