<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="top-info-box">
      <div class="top-info-item">
        <div class="left-box">
          <div class="logo-box">
            <img src="@@/images/index-logo.png" alt="">
          </div>
          <!--<div class="refresh-box">-->
            <!--<img src="@/images/refresh.png" alt="">-->
          <!--</div>-->
          <p v-if="system.admin.name">{{info}}{{system.admin.name}}，{{date_data}}</p>
        </div>
        <div class="right-box">
          <div class="dropdown-box">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i v-if="system.admin.name">{{system.admin.name}}</i>
                <i v-if="system.admin.name" class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <p @click="logout">退出登录</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!--<div class="out-box">-->
            <!--<img src="@/images/out.png" alt="">-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      date_data: '',
      info: '',
      admin: {
        name: ''
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState([
      'system'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    logout() {
      console.log('退出登录')
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  mounted(){
    let date = new Date();
    let Hours = date.getHours();
    // console.log(Hours);
    this.date_data = date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
    if(Hours>=0 && Hours<12){
      this.info = '上午好！'
    }else if(Hours>=12 && Hours<14){
      this.info = '中午好！'
    }else if(Hours>=14 && Hours<19){
      this.info = '下午好！'
    }else if(Hours>=19 && Hours<24){
      this.info = '晚上好！'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .top-info-box {
    width: 100%;
    height: 64px;
    background: #8FB739;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    .top-info-item {
      padding: 0 16px;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-box {
        display: flex;
        align-items: center;
        .logo-box {
          margin-right: 30px;
          img {
            width: 208px;
          }
        }
        .refresh-box {
          margin-right: 30px;
          cursor: pointer;
          img {
            width: 40px;
          }
        }
        p {
          font-size: 16px;
          color: #ffffff;
        }
      }
      .right-box {
        display: flex;
        align-items: center;
        .out-box {
          margin-left: 20px;
          cursor: pointer;
          img {
            width: 130px;
          }
        }
      }
    }
  }
  .el-dropdown-menu {
    z-index: 12000 !important;
  }
  .el-dropdown-link i {
    font-size: 18px;
    font-style: normal;
    color: #ffffff;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
