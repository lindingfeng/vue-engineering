<template>
  <div class="uploader-page">
    <div class="uploader-item">
      <van-uploader :after-read="afterRead" />
      <p>点击上传</p>
    </div>

    <!-- 上传的图片 -->
    <div class="uploader-image">
      <img v-for="(item, index) in imgSrc" :key="index" :src="'http://'+item" alt="">
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast,
  Uploader
} from 'vant';
import axios from 'axios'
export default {
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Uploader.name]: Uploader
  },
  data () {
    return {
      imgSrc: []
    }
  },
  methods: {
    async uploadfile (formdata) {
      try {

        let ret = await this.$koa2Api.uploadfile(formdata)
        if (+ret.data._errCode === 0) {
          this.imgSrc.push(ret.data._data.src)
        } else {
          Toast.fail(ret.data._errStr)
        }

      } catch (err) {
        console.log(err)
      }
    },
    afterRead(file) {
      let formdata = new FormData()
      formdata.append('file',file.file)
      this.uploadfile(formdata)
    }
  }
}
</script>

<style lang="postcss" scoped>
.uploader-page {
  padding: 20px;
  /deep/ .van-uploader__upload {
    margin: 0;
  }
  .uploader-item {
    display: inline-block;
    text-align: center;
  }
  p {
    margin-top: 5px;
    font-size: 15px;
    color: #888888;
  }
}
.uploader-image {
  img {
    max-width: 100%;
  }
}
</style>
