<template>
  <div class="add-address-page">
    
    <van-cell-group>
      <van-field
        v-model="name"
        label="收货姓名"
        placeholder="请输入收货姓名"
        label-width="80px"
        @click="show = true"
      />
      <van-field
        v-model="phone"
        label="收货电话"
        placeholder="请输入收货电话"
        label-width="80px"
      />
      <van-field
        v-model="selectAddress"
        label="收货区域"
        readonly
        placeholder="省/市/区"
        label-width="80px"
        @click="showCity = true"
      />
      <van-field
        v-model="detail"
        label="详细地址"
        placeholder="街道门牌、楼层房间号等信息"
        label-width="80px"
      />
      <van-cell title="设为默认地址">
        <van-switch
          slot="default"
          v-model="defaultAddress"
          size="22px"
          active-color="#07c160"
        />
      </van-cell>
    </van-cell-group>

    <van-popup
      v-model="showCity"
      position="bottom"
    >
      <van-area
        :area-list="addressList"
        @confirm="addressConfirm"
       />
    </van-popup>

    <div class="submit-box">
      <van-button
        type="primary" 
        class="add-button"
        :disabled="!disabledSubmit"
        @click="operationAddress"
      >
      确认添加
      </van-button>
    </div>

  </div>
</template>

<script>
import {
  Button,
  Popup,
  Area,
  CellGroup,
  Cell,
  Field,
  Switch,
  Toast
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Toast.name]: Toast
  },
  data () {
    return {
      name: '',
      phone: '',
      address: [],
      detail: '',
      addressList: {},
      addressInfo: {},
      defaultAddress: false,
      showCity: false,
      addressId: ''
    }
  },
  computed: {
    selectAddress () {
      return this.address.join(' ')
    },
    verifyMobile () {
      if (/^1\d{10}$/.test(this.phone)) {
        return true;
      }
      return false;
    },
    disabledSubmit () {
      return this.name && this.verifyMobile &&
             this.selectAddress && this.detail
    }
  },
  methods: {
    // 获取城市信息
    async getAllAddress () {
      try {
        let ret = await this.$koa2Api.getAllAddress()
        if (+ret.status === 200) {
          this.addressList = ret.data
        } else {
          Toast.fail(ret.data.info)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取地址信息
    async getAddressInfo () {
      try {
        let ret = await this.$koa2Api.getAddressInfo({
          addressId: this.addressId
        })
        if (+ret.data._errCode === 0) {
          const res = ret.data._data.addressInfo
          this.addressInfo = {
            ...res
          }
          this.name = res.name
          this.phone = res.phone
          this.address = res.area
          this.detail = res.address
          this.defaultAddress = +res.is_default === 1 ? true : false
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 选中的城市
    addressConfirm (val) {
      let valArr = []
      val.forEach(element => {
        valArr.push(element.name)
      });
      this.showCity = false
      this.address = valArr
    },
    // 保存地址
    async operationAddress () {
      const params = {
        name: this.name,
        phone: this.phone,
        area: this.address,
        detail: this.detail,
        defaultAddress: this.defaultAddress
      }
      try {
        let ret = await this.$koa2Api.addAddress(params)
        if (+ret.data._errCode === 0) {
          Toast.success('添加成功')
          this.$router.go(-1)
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    const { type, addressId } = this.$route.query
    if (addressId) {
      // 获取地址信息
      this.addressId = addressId
      this.getAddressInfo()
    }
    this.getAllAddress()
  }
}
</script>

<style lang="postcss" scoped>
.add-address-page {
  /deep/ .van-cell__value,
  /deep/ .van-cell__title {
    max-height: 24px;
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
