<template>
  <div class="layout-page">
    <div class="aside-page">
      <div class="logo">
        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2204402038,3571693478&fm=26&gp=0.jpg" alt="">
        <p>admin</p>
      </div>
      <el-scrollbar style="height: calc(100% - 150px);">
        <el-menu
          :default-active="$route.path"
          :router="true"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#ffd04b"
        >
          <template v-for="item in routes">
            <asides :item="item" :key="item.path" :base-path="item.path" />
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
    <headers />
    <mains />
  </div>
</template>

<script>
import Asides from './aside'
import Headers from './header'
import Mains from './main'
import {
  Menu,
  Scrollbar
} from 'element-ui'

export default {
  components: {
    Asides,
    Headers,
    Mains,
    [Menu.name]: Menu,
    [Scrollbar.name]: Scrollbar
  },
  data () {
    return {
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
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
.aside-page {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 180px;
  height: 100%;
  background-color: #304156;
  .logo {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    p {
      margin-top: 10px;
      font-size: 16px;
      color: #ffffff;
    }
  }
  /deep/ .el-menu {
    border-right: 0;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}
</style>
