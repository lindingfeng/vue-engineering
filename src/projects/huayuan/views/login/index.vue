<template>
  <div class="login-container">
    <div class="welcome-box">
      <p>Hi，欢迎来到深圳花院医疗美容机构</p>
    </div>
    <div class="top-logo">
      <img src="@@/images/logo.png" alt="">
    </div>
    <div class="center-content">
      <div class="center-content-bg"></div>
      <div class="center-content-login">
        <div class="login-xiusi">
          <img src="@@/images/zhuangsi.png" alt="">
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <h3 class="title">
            <span>后台管理</span>
            <span class="en-span">ADMIN LOGIN</span>
          </h3>
          <el-form-item class="user-name" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
            <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入账号..." />
          </el-form-item>
          <el-form-item class="user-name" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="请输入密码..."
              @keyup.enter.native="handleLogin" />
            <!--<span class="show-pwd" @click="showPwd">-->
            <!--<svg-icon icon-class="eye" />-->
            <!--</span>-->
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住账号</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-logo">
      <img src="@@/images/bottom-logo.png" alt="">
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      checked: false,
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            // console.log(res)
            this.loading = false
            if(res.errcode==0&&res.data){
              if(this.checked){
                localStorage.setItem("account", this.loginForm.username);
              }else {
                localStorage.removeItem("account");
              }
              this.$store.dispatch('GetAdminInfo', {token: true});
              this.$router.push({ path: '/' })
            }else {
              this.$message({
                message: res.errstr,
                type: 'error',
                duration: 1000
              });
            }
            // console.log(this.redirect)
            // this.$router.push({ path: this.redirect || '/' })
          }).catch((err) => {
            this.loading = false;
            if(err=='token is overdue'){
              this.$message({
                message: '该账户已被冻结，请联系管理员解封！',
                type: 'error',
                duration: 1500
              });
            }else {
              this.$message({
                message: '服务器开了会小差！',
                type: 'error',
                duration: 1000
              });
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted(){
    let account = localStorage.getItem("account");
    if(account){
      this.checked = true;
      this.loginForm.username = account;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
  .welcome-box {
    padding-left: 300px;
    background: #F2F2F2;
    p {
      font-size: 15px;
      line-height: 40px;
      color: #888888;
    }
  }
  .top-logo {
    text-align: center;
    img {
      width: 244px;
      padding: 23px 0;
    }
  }
  .center-content-bg {
    position: relative;
    width: 100%;
    height: 700px;
    background: url("../../images/content-bg.jpg") no-repeat;
    -webkit-background-size: contain;
    background-size: cover;
  }
  .center-content-login {
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -225px;
    .login-xiusi {
      text-align: center;
      img {
        width: 400px;
        position: relative;
        bottom: -2px;
      }
    }
    input {
      padding: 0 5px 0 15px !important;
    }
  }
  .bottom-logo {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    img {
      width: 106px;
      padding: 0 0 5px 0;
    }
  }
  .login-form {
    width: 450px;
    padding: 30px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    /*box-sizing: border-box;*/
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: #ffffff;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item__content {
    line-height: normal;
  }
  .user-name {
    border: 1px solid #cccccc;
    border-radius: 5px;
    input {
      font-size: 16px;
    }
  }
  .login-btn {
    width:100%;
    font-size: 20px;
    color: #ffffff;
    background:linear-gradient(0deg,rgba(162,189,98,1) 0%,rgba(183,210,124,1) 100%);
    border-color: transparent;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    border-color: rgba(162,189,98,1);
    background-color: rgba(162,189,98,1);
  }
  .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: rgba(162,189,98,1);
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  .svg-container {
    padding: 6px 5px 10px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    margin: 0 auto 30px auto;
    font-size: 28px;
    line-height: 28px;
    font-weight: 400;
    color: #555555;
    span {
      display: inline-block;
      vertical-align: bottom;
    }
    .en-span {
      margin-left: 5px;
      font-size: 22px;
      line-height: 22px;
      color: #8E9527;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
