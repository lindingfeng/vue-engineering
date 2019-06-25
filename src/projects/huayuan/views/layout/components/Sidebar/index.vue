<template>
  <!--<el-scrollbar style="height: 100%;">-->
    <div>
      <el-scrollbar style="height: calc(100% - 64px);">
        <div v-show="!isCollapse" class="top-info-box">
          <div class="user-ico">
            <img :src="system.admin.avatar" alt="">
          </div>
          <p>{{system.admin.name}}</p>
        </div>
        <el-menu
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          mode="vertical"
          :unique-opened="true"
          background-color="#ffffff"
          text-color="#666666"
          active-text-color="#90B83B"
        >
          <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
      </el-scrollbar>
    </div>
  <!--</el-scrollbar>-->
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapState([
      'system'
    ]),
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .top-info-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 0;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    .user-ico {
      width: 90px;
      height: 90px;
      text-align: center;
      /*background-color: #ff0000;*/
      border-radius: 50%;
      border: 1px solid #eeeeee;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    p {
      font-size: 18px;
      line-height: 18px;
      color: #333333;
      margin-top: 15px;
    }
  }
</style>
