<template>
  <div id="app">
    <publicHeader/>
    <router-view/>
  </div>
</template>

<script>
  import publicHeader from './components/Header'
  export default {
    name: 'app',
    components: { publicHeader }
  }
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
