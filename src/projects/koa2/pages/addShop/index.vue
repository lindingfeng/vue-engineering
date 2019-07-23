<template>
  <div class="add-shop-page">
    <div class="uploader">
      <div class="image-list">
        <div v-for="(item, index) in shopBanner" :key="index" class="image-item">
          <img :src="item" alt="">
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
        <van-field
          v-if="radio == 2"
          v-model="shopFreight"
          label="商品运费"
          placeholder="请输入商品运费"
          label-width="80px"
          @input="shopFreight = shopFreight.replace(/[^\0-9\.]/g, '')"
        />
      </van-cell-group>
      <!-- 运费 -->
      <div class="freight-content">
        <div class="freight-item">
          <div class="text">商品运费</div>
          <div class="freight-radio">
            <van-radio-group v-model="radio">
              <van-radio icon-size="16" name="1">免运费</van-radio>
              <van-radio icon-size="16" name="2">设置运费</van-radio>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>

    <div class="submit-box">
      <van-button
        type="primary" 
        class="add-button"
        :disabled="!disabledSubmit"
        @click="addShop"
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
  RadioGroup,
  Radio,
  Toast
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Toast.name]: Toast
  },
  data () {
    return {
      shopBanner: [],
      shopCategory: '',
      shopCategoryId: '',
      shopName: '',
      shopPrice: '',
      shopDetail: '',
      shopNum: '',
      shopFreight: '',
      show: false,
      actions: [],
      radio: '1'
    }
  },
  computed: {
    priceComputed () {
      return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.shopPrice)
    },
    freightComputed () {
      return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.shopFreight)
    },
    numComputed () {
      return /^([0]{1}|[1-9]{1}[0-9]*)$/.test(this.shopNum)
    },
    disabledSubmit () {
      return this.shopCategory && this.shopName &&
             this.shopDetail && this.priceComputed &&
             this.numComputed && this.shopBanner.length &&
             (this.radio === '1' || (this.radio === '2'&&this.freightComputed))
    }
  },
  methods: {
    // 获取商品分类
    async getCategory () {
      try {
        let ret = await this.$koa2Api.getCategory()
        if (+ret.data._errCode === 0) {
          ret.data._data.categoryList.forEach((ele) => {
            ele.name = ele.category_name
          })
          this.actions = ret.data._data.categoryList
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 上传图片
    async uploadfile (formdata) {
      try {
        let ret = await this.$koa2Api.uploadfile(formdata)
        if (+ret.data._errCode === 0) {
          this.shopBanner.push(`http://${ret.data._data.src}`)
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 添加商品
    async addShop () {

      const data = {
        shop_banner: this.shopBanner,
        shop_name: this.shopName,
        shop_category_id: this.shopCategoryId,
        shop_price: this.shopPrice,
        shop_content: this.shopDetail,
        shop_num: this.shopNum,
        shop_freight: '0'
      }

      if (+this.radio === 2) {
        data.shop_freight = this.shopFreight
      }

      try {
        let ret = await this.$koa2Api.addShop(data)
        if (+ret.data._errCode === 0) {
          Toast.success('商品添加成功')
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
      this.shopCategoryId = item.category_id
    }
  },
  mounted () {
    this.getCategory()
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
.freight-content {
  height: 44px;
  padding: 0 15px;
  .freight-item {
    height: 44px;
    display: flex;
    align-items: center;
  }
  .text {
    width: 80px;
    visibility: hidden;
  }
  /deep/ .van-radio-group {
    display: flex;
    align-items: center;
  }
  /deep/ .van-radio {
    margin-right: 20px;
  }
  /deep/ .van-radio__label {
    margin-left: 5px;
  }
}
</style>
