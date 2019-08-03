<template>
  <div class="layout-page">
    <asides />
    <headers />
    <mains />
  </div>
</template>

<script>
import Asides from './aside'
import Headers from './header'
import Mains from './main'

export default {
  components: {
    Asides,
    Headers,
    Mains
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
