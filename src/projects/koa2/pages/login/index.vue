<template>
  <div class="login-page">
    <div class="logo-icon">
      <img src="./imgs/logo.jpg" alt="">
    </div>
    <div class="input-content">
      <van-cell-group>

        <van-field
          size="large"
          v-model="phone"
          class="last-field"
          clearable
          placeholder="请输入手机号"
        />

        <van-field
          size="large"
          v-model="password"
          class="last-field"
          type="password"
          placeholder="请输入密码，最少6位"
        />
      </van-cell-group>

      <div class="registered-tip">
        <div class="forget-pwd" @click="$router.push('forget')">忘记密码？</div>
        <p>没有账号？<span @click="$router.push('registered')">注册</span></p>
      </div>

      <van-button
        type="primary" 
        class="login-button"
        :disabled="!disabledSubmit"
        @click="loginSubmit"
      >登 录</van-button>

    </div>
  </div>
</template>

<script>
import {
  Button,
  CellGroup,
  Field,
  Toast
} from 'vant';
import Cookies from 'js-cookie'

export default {
  components: {
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Toast.name]: Toast,
  },
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  computed: {
    verifyMobile () {
      if (/^1\d{10}$/.test(this.phone)) {
        return true;
      }
      return false;
    },
    disabledSubmit () {
      return this.verifyMobile && this.password &&this.password.length > 5
    }
  },
  methods: {
    async loginSubmit () {
      try {

        let ret = await this.$koa2Api.login({
          phone: this.phone,
          password: this.password
        })
        console.log(ret)

        if (+ret.data._errCode === 0) {
          Toast.success('登录成功!')
          Cookies.set('token', ret.data._data.token)
          Cookies.set('avatar', ret.data._data.avatar)
          this.$store.commit('setLoginState', true)
          this.$store.commit('setAvatar', ret.data._data.avatar)
          if (this.$route.query.back) {
            this.$router.go(-1)
            return
          }
          this.$router.replace('/')
        } else {
          Toast.fail(ret.data._errStr)
        }

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.logo-icon {
  padding: 60px 0;
  text-align: center;
  img {
    width: 150px;
  }
}
.input-content {
  width: 310px;
  margin: 0 auto;
  /deep/ .van-field__control {
    font-size: 15px;
  }
}
.last-field {
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: '';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-bottom: 1px solid #ebedf0;
    transform: scaleY(0.5);
  }
}
.registered-tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 310px;
  padding: 10px 0;
  margin: 40px auto 0;
  text-align: right;
  .forget-pwd {
    font-size: 14px;
    color: #62ACF9;
  }
  p {
    font-size: 14px;
    color: #999999;
  }
  span {
    color: red;
  }
}
.login-button {
  width: 100%;
  /* margin-top: 40px; */
  height: 44px;
  font-size: 16px;
  color: #ffffff;
  background-color: #FFDA05;
  border-color: transparent;
  border-radius: 5px;
  &.van-button--disabled {
    color: #949ba1;
    background: #e7ecee;
  }
}
</style>
