<template>
  <div class="index-page">
    <!-- <cube-button>Button</cube-button>
    <Swiper /> -->
    <div class="amap-wrapper">
      <el-amap ref="map" vid="amap" :plugin="plugin" :center="center" class="amap-demo">
      </el-amap>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'cube-ui'
import Swiper from '@@/components/Swiper'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '9494565787a641b69c06d2abe2826554',
  plugin: ['AMap.Geolocation'],
  // uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4'
})
export default {
  components: {
    [Button.name]: Button,
    Swiper
  },
  data () {
    let self = this;
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(o) {
            console.log(77777777)
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log(status, result, 999999)
              if (result && result.position) {
                self.lng = result.position.lng;
                self.lat = result.position.lat;
                self.center = [self.lng, self.lat];
                self.loaded = true;
                self.$nextTick();
              }
            });
          }
        }
      }]
    }
  },
  methods: {
    showSome () {
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="postcss" scoped>
.content {
  .font {
    font-size: 16px;
  }
}
.amap-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
