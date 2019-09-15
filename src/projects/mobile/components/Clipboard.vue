<template>
  <div class="hello">
    <div class="box" :data-clipboard-text="copyText">主要按钮</div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
const clipboard = new Clipboard(".box");
clipboard.on('success', function (ret) {
  console.log('复制成功!', ret)
});
clipboard.on('error', function (error) {
  console.log('复制失败!', error)
});
export default {
  data () {
    return {
      copyText: '这是复制得内容啦~~'
    }
  }
}
</script>

<style scoped>
</style>
