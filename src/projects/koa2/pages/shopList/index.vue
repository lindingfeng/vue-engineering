<template>
  <div class="shop-list-page">
    <div class="shop-list">
      <div class="shop-item" v-for="(item, index) in shopList" :key="index">
        <div class="shop-image">
          <img :src="item.shop_banner[0]" alt="">
        </div>
        <div class="right-content">
          <div class="top-content">
            <h3>{{item.shop_name}}</h3>
            <p>
              <span>¥{{item.shop_price}}</span>
            </p>
          </div>
          <div class="bottom-content">
            <p>
              <span v-if="item.shop_freight == 0">免运费</span>
              <span v-else class="freight">运费:<i>¥{{item.shop_freight}}</i></span>
            </p>
            <p>{{item.shop_sales}}付款</p>
          </div>
        </div>
      </div>
    </div>
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
import Cookies from 'js-cookie'

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
    async getShopList (formdata) {
      try {
        let ret = await this.$koa2Api.getShopList({
          token: Cookies.get('token')
        })
        if (+ret.data._errCode === 0) {
          this.shopList = ret.data._data.shopList
        } else {
          Toast.fail(ret.data._errStr)
        }

      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getShopList()
  }
}
</script>

<style lang="postcss" scoped>
.shop-list-page {
  
}
.shop-item {
  padding: 12px;
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  .shop-image {
    flex-shrink: 0;
    width: 100px;
    margin-right: 10px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.top-content {
  h3 {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 22px;
    color: #4b566a;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    font-size: 16px;
    color: #eb5211;
  }
}
.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 12px;
    color: #999999;
  }
  .freight {
    i {
      font-style: normal;
    }
  }
}
</style>
