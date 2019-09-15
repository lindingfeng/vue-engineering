<template>
  <div class="index-page">
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui'

export default {
  components: {
    [Button.name]: Button
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
