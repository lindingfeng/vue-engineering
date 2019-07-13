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
          v-model="old_password"
          class="last-field"
          type="password"
          placeholder="请输入旧密码，最少6位"
        />

        <van-field
          size="large"
          v-model="new_password"
          class="last-field"
          type="password"
          placeholder="请输入新密码，最少6位"
        />
      </van-cell-group>

      <van-button
        type="primary" 
        class="login-button"
        :disabled="!disabledSubmit"
        @click="changePwd"
      >确认修改</van-button>

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
      old_password: '',
      new_password: ''
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
      return this.verifyMobile &&
             this.old_password && this.old_password.length > 5 &&
             this.new_password && this.new_password.length > 5
    }
  },
  methods: {
    async changePwd () {
      try {

        let ret = await this.$koa2Api.changePwd({
          phone: this.phone,
          old_password: this.old_password,
          new_password: this.new_password
        })
        console.log(ret)

        if (+ret.data._errCode === 0) {
          const _this = this
          Toast.success({
            message: '密码已修改',
            duration: 1500,
            onClose: () => {
              _this.$router.replace('login')
            }
          })
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
.login-page {

}
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
.login-button {
  width: 100%;
  margin-top: 50px;
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
