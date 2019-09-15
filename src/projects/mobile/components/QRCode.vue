<template>
  <div class="qrcode-page">

    <!-- Base64 -->
    <div style="text-align: center;margin-bottom: 20px;">
      <div>
        <input type="text" v-model="QRCodeTextBase64">
      </div>
      <img :src="QRCodeLinkBase64" alt="">
      <p>base64</p>
    </div>

    <!-- Canvas -->
    <div style="text-align: center;">
      <div>
        <input type="text" v-model="QRCodeTextCanvas">
      </div>
      <canvas ref="canvas"></canvas>
      <p>canvas</p>
    </div>

  </div>
</template>

<script>
import QRCode from 'qrcode';
import sha1 from 'sha1';
import md5 from 'js-md5';
export default {
  data () {
    return {
      QRCodeTextBase64: 'lindingfeng',
      QRCodeTextCanvas: 'lindingfeng',
      QRCodeLinkBase64: '',
      QRCodeLinkCanvas: ''
    }
  },
  watch: {
    QRCodeTextBase64 () {
      this.buildQRCodeBase64()
    },
    QRCodeTextCanvas () {
      this.buildQRCodeCanvas()
    }
  },
  methods: {
    // 生成Base64图片
    buildQRCodeBase64 () {
      const _this = this
      QRCode.toDataURL(this.QRCodeTextBase64, {
        type: 'image/jpeg'
      }).then(url => {
        _this.QRCodeLinkBase64 = url
      }).catch(err => {
        // 文本为空或生成异常
        console.log('生成二维码失败!', err)
      })
    },
    // 生成Canvas图片
    buildQRCodeCanvas () {
      const _this = this
      QRCode.toCanvas(this.$refs.canvas, this.QRCodeTextCanvas).then(() => {
        console.log('成功!')
      }).catch(err => {
        // 文本为空或生成异常
        console.log('生成二维码失败!', err)
      })
    }
  },
  mounted () {
    this.buildQRCodeBase64()
    this.buildQRCodeCanvas()
    console.log(sha1('lindingfeng').length)
    console.log(md5('lindingfeng').length)
  }
}
</script>

<style lang="postcss" scoped>
.qrcode-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
