<template>
  <div class="index-page">
    <Button type="primary">主要按钮</Button>
  </div>
</template>

<script>
import { Button } from 'iview'

export default {
  components: {
    [Button.name]: Button
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$adminApi.getOrderList().then((ret) => {
      console.log(ret)
    })
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
