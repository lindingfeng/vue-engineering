<template>
  <div class="aside-page">
    <div class="logo">
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2204402038,3571693478&fm=26&gp=0.jpg" alt="">
      <p>admin</p>
    </div>
    <el-scrollbar style="height: calc(100% - 150px);">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#ffd04b">
        <!-- <el-menu-item index="1">
          <svg-icon icon-class="home"/>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <svg-icon icon-class="shop"/>
            <span>商品管理</span>
          </template>
          <el-menu-item index="2-1" :route="{ path: '/shop/shopList' }">商品列表</el-menu-item>
          <el-menu-item index="2-2" :route="{ path: '/shop/shopCategory' }">商品分类</el-menu-item>
        </el-submenu> -->
        <template v-for="item in routes" v-if="item.children">
          <el-submenu v-if="item.children.length>1" :index="item.path">
            <template slot="title">
              <svg-icon :icon-class="item.meta.icon"/>
              <span>{{item.meta.title}}</span>
            </template>
            <el-menu-item v-for="(child, idx) in item.children" :index="`${item.path}/${child.path}`" :key="idx" :route="{ path: `${item.path}/${child.path}` }">商品列表</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="`${item.path}/${item.children[0].path}`" :route="{ path: `${item.path}/${item.children[0].path}` }">
            <svg-icon :icon-class="item.children[0].meta.icon"/>
            <span>{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import {
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Scrollbar
} from 'element-ui'

export default {
  components: {
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItemGroup.name]: MenuItemGroup,
    [MenuItem.name]: MenuItem,
    [Scrollbar.name]: Scrollbar
  },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted () {
    console.log(this.$route)
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
  /deep/ .el-submenu,
  /deep/ .el-menu-item {
    min-width: auto;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  /deep/ .svg-icon {
    margin-right: 10px;
    vertical-align: middle;
    font-size: 15px;
  }
  /deep/ .el-menu--inline li {
    background-color: #1f2d3d !important;
  }
  /deep/ .el-submenu .el-menu-item:hover {
    background-color: #001528 !important;
  }
}
</style>
