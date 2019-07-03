<template>
  <div class="chart-page">
    <mavon-editor v-model="value" @imgAdd="imgAdd"/>
  </div>
</template>

<script>
import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

export default {
  // components: {
  //   mavonEditor
  // },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    imgAdd (name, file) {
      console.log(name, file)
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
