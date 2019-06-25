<template>
  <div class="index-page">
    <van-button type="primary" @click="showPicker = !showPicker">主要按钮</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import Button from 'vant/lib/button'
import 'vant/lib/button/style'
Vue.use(Button)
export default {
  data () {
    return {
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  }
}
</script>

<style scoped>
</style>
