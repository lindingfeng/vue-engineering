<template>
  <div class="login-page">
    <div class="form-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item required prop="account">
          <div class="input-content">
            <span class="account-svg">
              <svg-icon icon-class="account"/>
            </span>
            <el-input
              size="small"
              v-model="form.account"
              placeholder="请输入账号"
            />
          </div>
        </el-form-item>
        <el-form-item required prop="password">
          <div class="input-content">
            <span class="account-svg">
              <svg-icon icon-class="password"/>
            </span>
            <el-input
              size="small"
              v-model="form.password"
              placeholder="请输入密码"
              show-password
            />
          </div>
        </el-form-item>
      </el-form>
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
} from 'element-ui'

export default {
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
  },
  data () {
    return {
      form: {
        account: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    submit () {
      this.isLoading = true
    }
  }
}
</script>

<style lang="postcss" scoped>
.login-page {
  min-height: 100%;
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
  .btn {
    width: 100%;
  }
}
.form-content {
  position: relative;
  width: 520px;
  padding: 160px 35px 0;
  margin: 0 auto;
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
