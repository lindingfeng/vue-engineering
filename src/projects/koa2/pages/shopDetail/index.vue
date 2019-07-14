<template>
  <div class="shop-list-page">
    商品详情
  </div>
</template>

<script>
import {
  // Button,
  // Uploader,
  // CellGroup,
  // Field,
  // ActionSheet,
  // Toast
} from 'vant';

export default {
  components: {
    // [Button.name]: Button,
    // [Uploader.name]: Uploader,
    // [CellGroup.name]: CellGroup,
    // [Field.name]: Field,
    // [ActionSheet.name]: ActionSheet,
    // [Toast.name]: Toast,
  },
  data () {
    return {
      shopList: []
    }
  },
  methods: {
    // async uploadfile (formdata) {
    //   try {

    //     let ret = await this.$koa2Api.uploadfile(formdata)
    //     if (+ret.data._errCode === 0) {
    //       this.shopBanner.push(ret.data._data.src)
    //     } else {
    //       Toast.fail(ret.data._errStr)
    //     }

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  },
  mounted () {
    const route = this.$route
    console.log(route)
  }
}
</script>

<style lang="postcss" scoped>
.shop-list-page {
  
}
</style>
