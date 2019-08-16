<template>
  <div class="login-page">
    <div class="form-content">
      <h3>商城后台系统</h3>
      <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
        <el-form-item prop="account">
          <div class="input-content">
            <span class="account-svg">
              <svg-icon icon-class="account"/>
            </span>
            <el-input
              size="small"
              v-model="form.account"
              placeholder="请输入账号"
              @keyup.enter.native="submit"
            />
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="input-content">
            <span class="account-svg">
              <svg-icon icon-class="password"/>
            </span>
            <el-input
              size="small"
              v-model="form.password"
              placeholder="请输入密码"
              @keyup.enter.native="submit"
            />
          </div>
        </el-form-item>
      </el-form>
      <div class="no-need-pwd">
        <el-checkbox v-model="checked">7天免登陆</el-checkbox>
      </div>
      <el-button
        type="primary"
        class="btn"
        :loading="isLoading"
        @click="submit"
      >登 录</el-button>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Form,
  FormItem,
  Input,
  Checkbox
} from 'element-ui'
import Cookies from 'js-cookie'
import {
  defaults,
  normal,
  root
} from '@@/permission/permission'
// import router from '@@/router'
import Router from 'vue-router'

export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
  },
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      checked: false,
      formRules: {
        account: [
          { required: true, message: '请输入账号...', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码...', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    /*
     * @description: 登陆
     * @author: lindingfeng
     * @date: 2019-08-09 00:10:20
    */
    async login () {
      this.isLoading = true
      try {
        let ret = await this.$admin.login({
          phone: this.form.account,
          password: this.form.password
        })
        if (+ret.data._errCode === 0) {
          this.$message.success({
            message: '登陆成功!',
            duration: 1000,
            onClose: () => {
              if (ret.data._data.role === 1) {
                const router = [
                  ...normal,
                  ...defaults
                ]
                this.$router.matcher = new Router().matcher
                this.$router.options.routes = router
                this.$router.addRoutes(router)
              } else if (ret.data._data.role === 2) {
                const router = [
                  ...root,
                  ...defaults
                ]
                this.$router.matcher = new Router().matcher
                this.$router.options.routes = router
                this.$router.addRoutes(router)
              }
              Cookies.set('token', ret.data._data.token)
              Cookies.set('role', ret.data._data.role)
              this.$router.replace('/')
            }
          })
        } else {
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 验证通过
          this.login()
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.login-page {
  min-height: 100vh ;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
  }
  /deep/ .el-input {
    display: inline-block;
    width: 80%;
  }
  /deep/ .el-input input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    color: #fff;
    height: 47px;
    caret-color: #fff;
  }
  /deep/ .el-button--primary {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  /deep/ .el-checkbox__label {
    padding-left: 5px;
    font-size: 13px;
    color: #eeeeee;
  }
  .no-need-pwd {
    text-align: right;
  }
  .btn {
    width: 100%;
    margin-top: 10px;
  }
}
.form-content {
  position: relative;
  width: 520px;
  padding: 300px 35px 0;
  margin: 0 auto;
  h3 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 26px;
    color: #eee;
  }
}
.input-content {
  border: 1px solid hsla(0,0%,100%,.1);
  background: rgba(0,0,0,.1);
  border-radius: 5px;
}
.account-svg {
  display: inline-block;
  vertical-align: middle;
  padding-left: 15px;
  font-size: 15px;
  color: #889aa4;
}

</style>
