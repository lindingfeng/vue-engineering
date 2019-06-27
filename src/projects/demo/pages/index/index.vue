<template>
  <div class="index-page">
    <!-- <div class="content">
      <div class="font">666</div>
    </div> -->
    <van-button type="primary" @click="showPicker = !showPicker">主要按钮</van-button>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import Button from 'vant/lib/button'
import Picker from 'vant/lib/Picker'
import Popup from 'vant/lib/Popup'
import Field from 'vant/lib/Field'
import 'vant/lib/button/style'
import 'vant/lib/Picker/style'
import 'vant/lib/Popup/style'
import 'vant/lib/Field/style'
Vue.use(Button)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Field)
export default {
  data () {
    return {
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    }
  }
}
</script>

<style lang="postcss" scoped>
.content {
  .font {
    font-size: 16px;
  }
}
</style>
