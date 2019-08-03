<template>
  <div class="index-page">
    index
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
  },
  mounted () {
    // this.$adminKoa.getOrderList().then((ret) => {
    //   console.log(ret)
    // })
  }
}
</script>

<style lang="postcss" scoped>

</style>
