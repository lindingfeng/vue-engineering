<template>
  <div class="hello">
    <swiper :options="swiperOptions" style="height:250px;">
      <swiper-slide>
        <div style="height:250px;background: #f00;"></div>
      </swiper-slide>
      <swiper-slide>
        <div style="height:250px;background: #0f0"></div>
      </swiper-slide>
      <swiper-slide>
        <div style="height:250px;background: #00f;"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOptions: {
        autoplay: {
          delay: 3000
        },
        loop: true,
        effect: 'slide'
      }
    }
  }
}
</script>

<style scoped>
</style>
