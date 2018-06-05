<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'error'
    ])
  },

  watch: {
    error (newVal) {
      if (!newVal) {
        return
      }
      let desc = newVal.message || newVal.toString()
      this.$Notice.error({title: '错误提示', desc: desc})
      // console.log(newVal, desc)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
