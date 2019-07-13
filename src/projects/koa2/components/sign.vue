<template>
  <div class="qrcode-page">

    <!-- Base64 -->
    <div style="text-align: center;margin-bottom: 20px;">
      <div>
        <input type="text" v-model="sha1Text">
      </div>
      <p style="margin: 15px 0;">sha1签名：</p>
      <p>{{sha1}}</p>
    </div>

    <!-- Canvas -->
    <div style="text-align: center;">
      <div>
        <input type="text" v-model="md5Text">
      </div>
      <p style="margin: 15px 0;">md5签名：</p>
      <p>{{md5}}</p>
    </div>

  </div>
</template>

<script>
import sha1 from 'sha1';
import md5 from 'js-md5';
export default {
  data () {
    return {
      sha1Text: 'lindingfeng',
      md5Text: 'lindingfeng',
      sha1: '',
      md5: ''
    }
  },
  watch: {
    sha1Text () {
      this.sha1Sign()
    },
    md5Text () {
      this.sha1Md5()
    }
  },
  methods: {
    sha1Sign () {
      this.sha1 = sha1(this.sha1Text)
    },
    sha1Md5 () {
      this.md5 = md5(this.md5Text)
    }
  },
  mounted () {
    this.sha1Sign()
    this.sha1Md5()
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
