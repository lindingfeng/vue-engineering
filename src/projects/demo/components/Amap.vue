<template>
  <div class="map-page">
    <el-amap ref="map" vid="amap" :plugin="plugin" :center="center" class="amap-demo"></el-amap>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '9494565787a641b69c06d2abe2826554',
  plugin: ['AMap.Geolocation'],
  // uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4'
})
export default {
  data () {
    let _this = this;
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(o) {
            console.log('...定位初始化...')
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log('...定位结果...')
              console.log(status, result)
              console.log('.............')
              if (result && result.position) {
                _this.lng = result.position.lng;
                _this.lat = result.position.lat;
                _this.center = [_this.lng, _this.lat];
                _this.loaded = true;
                _this.$nextTick();
              }
            });
          }
        }
      }]
    }
  }
}
</script>

<style lang="postcss" scoped>
.map-page {
  width: 100vw;
  height: 100vh;
}
</style>
