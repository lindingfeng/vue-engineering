<template>
  <div class="index-page">

    <!-- 一级标题 -->
    <h3 class="top-title">
      <img src="./imgs/vue.png" alt="">
      <span>Koa2</span>
    </h3>
    <p class="top-desc">基于vue + node开发的全栈实践!</p>

    <!-- 登陆状态 -->
    <div class="account">
      <div v-if="!isValidloginState" class="login-registered">
        <p @click="$router.push('login')">登陆</p>
        <div class="line"></div>
        <p @click="$router.push('registered')">注册</p>
      </div>
      <div v-else class="icon-content">
        <img :src="avatar" alt="">
      </div>
    </div>

    <!-- 功能面板 -->
    <div class="collapse-content">
      <van-collapse v-model="activeCollapse" :border="false">

        <!-- 用户 -->
        <van-collapse-item title="用户" name="1">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="用户登录" is-link to="login" />
          <van-cell title="用户注册" is-link to="registered" />
          <van-cell title="修改密码" is-link to="forget" />
        </van-collapse-item>

        <!-- 商品 -->
        <van-collapse-item title="商品" name="2">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="商品列表" is-link to="shopList" />
          <van-cell title="添加商品" is-link to="addShop" />
          <van-cell title="添加分类" is-link to="addCategory" />
          <!-- <van-cell title="商品详情" is-link :to="{path: 'shopDeatil', query: {name: 'lindf', age: 25}}" /> -->
        </van-collapse-item>

        <!-- 订单 -->
        <van-collapse-item title="订单" name="3">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="创建订单" is-link to="index" />
          <van-cell title="订单列表" is-link to="orderList" />
          <van-cell title="订单详情" is-link to="index" />
        </van-collapse-item>

        <!-- 文章 -->
        <van-collapse-item title="文章" name="4">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="创建文章" is-link to="index" />
          <van-cell title="文章列表" is-link to="index" />
          <van-cell title="文章详情" is-link to="index" />
        </van-collapse-item>

        <!-- 上传 -->
        <van-collapse-item title="上传" name="5">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="上传图片" is-link to="uploader" />
        </van-collapse-item>

        <!-- 地址 -->
        <van-collapse-item title="地址" name="6">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="我的地址" is-link to="myAddress" />
          <van-cell title="添加地址" is-link to="addAddress" />
        </van-collapse-item>

      </van-collapse>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell
  },
  data () {
    return {
      activeCollapse: []
    }
  },
  computed: {
    isValidloginState () {
      return this.$store.state.isValidloginState
    },
    avatar () {
      return this.$store.state.avatar
    }
  }
}
</script>

<style lang="postcss" scoped>
.index-page {
  min-height: 100vh;
  padding: 64px 20px 20px;
  background-color: #f8f8f8;
  box-sizing: border-box;
  .top-desc {
    margin-bottom: 40px;
    font-size: 14px;
    color: #7d7e80;
  }
  /deep/ .van-collapse-item {
    margin-top: 16px;
    border-radius: 5px;
    overflow: hidden;
  }
  /deep/ .van-collapse-item__title {
    align-items: center;
    font-size: 16px;
    line-height: 40px;
  }
  /deep/ .van-collapse-item__content {
    padding: 0;
  }
}
.top-title {
  margin-bottom: 15px;
  img, span {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    width: 36px;
    height: 36px;
  }
  span {
    margin-left: 8px;
    font-size: 36px;
    font-weight: 500;
  }
}
.collapse-content {
  /deep/ .top-icon {
    font-size: 22px;
  }
}
.account {
  position: absolute;
  right: 20px;
  top: 20px;
}
.icon-content {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 50px;
    height: 50px;
  }
}
.login-registered {
  display: flex;
  align-items: center;
  p {
    font-size: 14px;
    color: #666666;
  }
  .line {
    width: 1px;
    margin: 0 8px;
    height: 10px;
    background-color: #666666;
  }
}
</style>
