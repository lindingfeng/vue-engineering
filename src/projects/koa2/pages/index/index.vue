<template>
  <div class="index-page">

    <!-- 一级标题 -->
    <h3 class="top-title">Koa2</h3>

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
          <van-cell title="添加商品" is-link to="addShop" />
          <van-cell title="商品列表" is-link to="shopList" />
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
        <van-collapse-item title="上传" name="4">
          <van-icon slot="right-icon" name="passed" class="top-icon" />
          <van-cell title="上传图片" is-link to="uploader" />
        </van-collapse-item>

      </van-collapse>
    </div>

    <!-- <van-cell-group>
      <van-field v-model="orderName" placeholder="请输入商品名" />
    </van-cell-group>
    <van-button type="primary" style="width: 100%;" @click="buildOrder">生成订单</van-button>
    <van-cell-group>
      <van-field v-model="phone" placeholder="请输入手机号码" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="primary" style="width: 100%;" @click="login">登录</van-button>
    <van-button type="warning" style="width: 100%;" @click="registered">注册</van-button>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="MongoDB的数据" name="1">
        <van-button
          type="primary">
          上一页
        </van-button>
        <van-button
          type="info"
          @click="getFormMongoDB">
          请求MongoDB数据
        </van-button>
        <van-button
          type="primary">
          下一页
        </van-button>
        <div v-if="mongoDBData._data" style="margin-top: 15px;word-wrap: break-word;">{{mongoDB}}</div>
      </van-collapse-item>
      <van-collapse-item title="MySQL的数据" name="2">
        <van-button
          type="primary"
          @click="getFormMySQL('prev')">
          上一页
        </van-button>
        <van-button
          type="info"
          @click="getFormMySQL('index')">
          请求MySQL数据
        </van-button>
        <van-button
          type="primary"
          @click="getFormMySQL('next')">
          下一页
        </van-button>
        <div v-if="mySQLData._data" style="margin-top: 15px;word-wrap: break-word;">{{mySQL}}</div>
      </van-collapse-item>
    </van-collapse> -->
    <!-- <Swiper /> -->
    <!-- <Amap /> -->
    <!-- <Clipboard /> -->
    <!-- <QRCode /> -->
    <!-- <Sign /> -->
  </div>
</template>

<script>
import {
  Button,
  Field,
  Icon,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
  Toast,
  Uploader
} from 'vant';
import axios from 'axios'

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Uploader.name]: Uploader,
  },
  data () {
    return {
      mongoDBData: {},
      mongoDBLoading: false,
      mySQLData: {},
      mySQLoading: false,
      activeNames: ['1', '2'],
      activeCollapse: [],
      orderName: '',
      phone: '',
      password: '',
      pageIndex: 1,
      pageSize: 5
    }
  },
  computed: {
    mongoDB () {
      return JSON.stringify(this.mongoDBData)
    },
    mySQL () {
      return JSON.stringify(this.mySQLData)
    }
  },
  methods: {
    getFormMongoDB () {
      const port = '3000'
      setTimeout(() => {
        this.getData(port)
      }, 1000)
    },
    getFormMySQL (type) {
      const port = '3001'

      if (type === 'prev') {
        this.pageIndex--
      } else if (type === 'next') {
        this.pageIndex++
      } else {
        this.pageIndex = 1
      }

      this.getData(port)
    },
    buildOrder () {
      if (!this.orderName) {
        Toast.fail('请输入商品名!')
        return
      }
      this.setData(3001)
    },
    getData (port) {
      const _this = this
      axios({
        method: 'post',
        url: `http://localhost:${port || 3000}/api/getOrderList`,
        params: {
          firstName: 'linss',
          lastName: 'dingfeng'
        },
        data: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      .then(function (res) {
        if (+port === 3000) {
          _this.mongoDBData = res.data
          return
        }
        _this.mySQLData = res.data
      });
    },
    setData (port) {
      const _this = this
      axios({
        method: 'post',
        url: `http://localhost:${port || 3000}/api/addOrder`,
        data: {
          order_name: _this.orderName
        }
      })
      .then(function (res) {
        if (+res.data._errCode === 0) {
          Toast.success('添加成功!')
        }
      })
    },
    login () {
      const port = 3001
      const _this = this

      if (!_this.phone || !_this.password) {
        Toast.fail('手机号或密码不能为空!')
        return
      }

      if (!/^1\d{10}$/.test(_this.phone)) {
        Toast.fail('请输入正确的手机号!')
        return
      }

      axios({
        method: 'post',
        url: `http://localhost:${port || 3000}/api/login`,
        data: {
          phone: _this.phone,
          password: _this.password
        }
      })
      .then(function (res) {
        if (+res.data._errCode === 0) {
          Toast.success('登录成功!')
        } else {
          Toast.fail(res.data._errStr)
        }
      })
    },
    registered () {
      const port = 3001
      const _this = this

      if (!_this.phone || !_this.password) {
       Toast.fail('手机号或密码不能为空!')
        return
      }

      if (!/^1\d{10}$/.test(_this.phone)) {
        Toast.fail('请输入正确的手机号!')
        return
      }
      
      axios({
        method: 'post',
        url: `http://localhost:${port || 3000}/api/registered`,
        data: {
          phone: _this.phone,
          password: _this.password
        }
      })
      .then(function (res) {
        if (+res.data._errCode === 0) {
          Toast.success('注册成功!')
        } else {
          Toast.fail(res.data._errStr)
        }
      })
    },
    getToken () {
      const _this = this
      axios({
        method: 'post',
        url: `http://localhost:3001/api/getToken`
      })
      .then(function (res) {
        if (+res.data._errCode === 0) {
          Cookies.set('token', res.data._data.token || '')
        }
      })
    },
    verifyToken () {
      const _this = this
      axios({
        method: 'post',
        url: `http://localhost:3001/api/verifyToken`,
        data: {
          token: Cookies.get('token')
        }
      })
      .then(function (res) {
        if (+res.data._errCode === 0) {
          
        }
      })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const _this = this
      let formdata = new FormData()
      formdata.append('file',file.file)
      axios.post(`http://localhost:3001/api/uploadfile`, formdata, {'Content-Type': 'multipart/form-data'})
      .then(function (res) {
        if (+res.data._errCode === 0) {
          
        }
      })
    },
    getImg () {
      let file = document.getElementById("upload_file").files[0]
      let formdata = new FormData()
      formdata.append('file',file)
      console.log(file)
      axios.post(`http://localhost:3001/api/uploadfile`, formdata, {'Content-Type': 'multipart/form-data'})
      .then(function (res) {
        if (+res.data._errCode === 0) {
          
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.index-page {
  height: 100vh;
  padding: 0 20px;
  background-color: #f8f8f8;
  .top-title {
    padding: 50px 0;
    text-align: center;
    font-size: 36px;
    font-weight: 500;
  }
  /deep/ .van-collapse-item {
    margin-bottom: 16px;
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
.collapse-content {
  /deep/ .top-icon {
    font-size: 22px;
  }
}
</style>
