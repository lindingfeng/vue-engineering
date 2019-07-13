<template>
  <div class="order-list-page">
    订单列表
  </div>
</template>

<script>
import {
  // Button,
  // CellGroup,
  // Field,
  // Toast
} from 'vant';

export default {
  components: {
    // [Button.name]: Button,
    // [CellGroup.name]: CellGroup,
    // [Field.name]: Field,
    // [Toast.name]: Toast,
  },
  data () {
    return {
      orderList: []
    }
  },
  methods: {
    // async loginSubmit () {
    //   try {

    //     let ret = await this.$koa2Api.login({
    //       phone: this.phone,
    //       password: this.password
    //     })
    //     console.log(ret)

    //     if (+ret.data._errCode === 0) {
    //       Toast.success('登录成功!')
    //     } else {
    //       Toast.fail(ret.data._errStr)
    //     }

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }
}
</script>

<style lang="postcss" scoped>

</style>
