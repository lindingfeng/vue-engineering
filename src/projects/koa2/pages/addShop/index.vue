<template>
  <div class="add-shop-page">
    <div class="uploader">
      <div class="image-list">
        <div v-for="(item, index) in shopBanner" :key="index" class="image-item">
          <img :src="'http://'+item" alt="">
        </div>
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="shopCategory"
          readonly
          label="商品类别"
          placeholder="请输入商品类别"
          label-width="80px"
          right-icon="arrow-down"
          @click="show = true"
        />
        <van-field
          v-model="shopName"
          label="商品名称"
          placeholder="请输入商品名称"
          label-width="80px"
        />
        <van-field
          v-model="shopPrice"
          label="商品价格"
          placeholder="请输入商品价格"
          label-width="80px"
          @input="shopPrice = shopPrice.replace(/[^\0-9\.]/g, '')"
        />
        <van-field
          v-model="shopDetail"
          label="商品详情"
          placeholder="请输入商品详情"
          label-width="80px"
        />
        <van-field
          v-model="shopNum"
          label="商品库存"
          placeholder="请输入商品库存"
          label-width="80px"
          @input="shopNum = shopNum.replace(/[^0-9]/g, '')"
        />
      </van-cell-group>
    </div>

    <div class="submit-box">
      <van-button
        type="primary" 
        class="add-button"
        :disabled="!disabledSubmit"
        @click="addSubmit"
      >
      确认添加
      </van-button>
    </div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />

  </div>
</template>

<script>
import {
  Button,
  Uploader,
  CellGroup,
  Field,
  ActionSheet,
  Toast
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
  },
  data () {
    return {
      shopBanner: [],
      shopCategory: '',
      shopName: '',
      shopPrice: '',
      shopDetail: '',
      shopNum: '',
      show: false,
      actions: [
        { name: '手机' },
        { name: '电脑' },
        { name: '食品' }
      ]
    }
  },
  computed: {
    priceComputed () {
      return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.shopPrice)
    },
    numComputed () {
      return /^([0]+|[1-9]+)$/.test(this.shopNum)
    },
    disabledSubmit () {
      return this.shopCategory && this.shopName &&
             this.shopDetail && this.priceComputed &&
             this.numComputed && this.shopBanner.length
    }
  },
  methods: {
    async uploadfile (formdata) {
      try {

        let ret = await this.$koa2Api.uploadfile(formdata)
        if (+ret.data._errCode === 0) {
          this.shopBanner.push(ret.data._data.src)
        } else {
          Toast.fail(ret.data._errStr)
        }

      } catch (err) {
        console.log(err)
      }
    },
    afterRead(file) {
      let formdata = new FormData()
      formdata.append('file', file.file)
      this.uploadfile(formdata)
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      this.shopCategory = item.name
    },
    addSubmit () {
      console.log('submit')
    }
  }
}
</script>

<style lang="postcss" scoped>
.uploader {
  padding: 12px;
  .image-list {
    display: flex;
    align-items: center;
  }
  .image-item {
    width: 80px;
    margin-right: 12px;
    height: 80px;
    border: 1px dashed #e5e5e5;
    overflow: hidden;
    img {
      width: 100%;
      height: 80px;
    }
  }
  /deep/ .van-uploader__upload {
    margin: 0;
  }
}
.submit-box {
  padding: 50px 12px 12px;
}
.add-button {
  width: 100%;
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
