<template>
  <div class="index-page">
    <!-- <Swiper /> -->
    <!-- <Amap /> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Picker } from 'vant';
// import Swiper from '@@/components/Swiper'
// import Amap from '@@/components/Amap'

export default {
  components: {
    // [Button.name]: Button,
    [Picker.name]: Picker,  
    // Swiper,
    // Amap
  },
  data () {
    return {
    }
  },
  methods: {
    showSome () {
    }
  },
  mounted () {
    this.$demoApi.getOrderList().then((ret) => {
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
