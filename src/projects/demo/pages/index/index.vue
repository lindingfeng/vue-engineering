<template>
  <div class="index-page">
    <!-- <div class="content">
      <div class="font">666</div>
    </div> -->
    <van-button type="primary" @click="$router.push('animation')">go</van-button>
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
import { Button, Picker, Popup, Dialog } from 'vant'
// Vue.use(Button).use(Picker).use(Popup)
export default {
  components: {
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup
  },
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
