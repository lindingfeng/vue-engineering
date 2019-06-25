<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    // 获取管理员信息
    getAdminInfo(){
      this.$store.dispatch('GetAdminInfo', {token: true})
        .catch((err) => {
          console.log(err)
        });
    },
  },
  mounted(){
    this.getAdminInfo();
  }
}
</script>
<style>
  body, p, h3 {
    margin: 0;
    padding: 0;
  }
  img {
    border: 0;
    vertical-align: top;
  }
  #app {
    height: auto;
  }
  #app .sidebar-container {
    /*height: 500px;*/
    top: 64px;
    border-right: 1px solid #e6e6e6;
  }
  #app .main-container {
    padding-top: 64px;
    min-height: auto;
  }
  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title:hover {
    background-color: rgb(204, 204, 204) !important;
  }
  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title {
    background-color: #fff !important;
  }
  #app .sidebar-container .el-submenu, .menu-wrapper > a .el-menu-item{
    border-bottom: 1px solid #e6e6e6;
  }
  /* 列表默认的文本样式 */
  #app .sidebar-container .el-submenu .el-menu-item {
    background-color: #fff !important;
    /*border-top: 1px solid #e6e6e6;*/
  }
  #app .sidebar-container .el-submenu .el-menu-item.is-active,
  .el-menu-item.is-active{
    background-color: #fafafa !important;
  }
  /* 鼠标hover时文本样式 */
  #app .sidebar-container .el-submenu .el-menu-item:hover {
    background-color: #eee !important;
  }
  /* 文本样式选中时父item的文本样式 */
  #app .sidebar-container .is-active > .el-submenu__title {
    color: #666666 !important;
  }
  .el-scrollbar {
    /*height: 100%;*/
  }
  #app .sidebar-container .scrollbar-wrapper .el-scrollbar__view {
    /*height: 100%;*/
  }
  /* 隐藏el-scrollbar的横向滚动条 */
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-select-dropdown__wrap {
    margin-bottom: 0 !important;
  }
  path { fill: inherit !important }
</style>
