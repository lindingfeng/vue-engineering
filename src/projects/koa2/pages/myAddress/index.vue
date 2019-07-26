<template>
  <div class="my-address-page">
    <div class="address-page">
      <div v-for="(item, index) in addressList" :key="index" class="address-list-content">
        <div class="left-user-info">
          <div class="name-phone">
            <p class="name">{{item.name}}</p>
            <p>{{item.phone}}</p>
          </div>
          <div class="address-info">
            <img src="./imgs/ic_address_position@2x.png" alt="">
            <p>{{item.area}}{{item.address}}</p>
          </div>
        </div>
        <div class="right-edit-btn"  bindtap="addAddress">
          <img src="./imgs/ic_address_edit@2x.png" alt="">
          <p @click="$router.push(`addAddress?type=1&addressId=${item.id}`)">修改</p>
        </div>
        <!-- 默认地址边框 -->
        <img v-if="item.is_default == 1" class="image-border" src="./imgs/img_address_sel@2x.png" alt="">
      </div>

      <!-- 新建地址 -->
      <div class="add-address-btn">
        <van-button type="default" @click="$router.push('addAddress?type=0&addressId=')">新建地址</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import {
  Button,
  Toast
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  data () {
    return {
      addressList: []
    }
  },
  methods: {
    async getAddress () {
      try {
        let ret = await this.$koa2Api.getAddress()
        if (+ret.data._errCode === 0) {
          ret.data._data.addressList.forEach(ele => {
            ele.area = ele.area.join('')
          })
          this.addressList = ret.data._data.addressList || []
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getAddress()
  }
}
</script>

<style lang="postcss" scoped>
.address-page {
  padding: 12px;
}
.address-list-content {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  height: 76px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #ececec;
  overflow: hidden;
}
.image-border {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
}
.left-user-info {
  flex: 1;
  font-size: 14px;
  color: #333333;
}
.left-user-info .name-phone {
  display: flex;
  align-items: center;
}
.name-phone p {
  font-weight: bold;
}
.left-user-info .name {
  margin-right: 20px;
}
.address-info {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.address-info img {
  width: 14px;
  margin-right: 4px;
  height: 14px;
}
.address-info p {
  flex: 1;
  font-size: 14px;
  color: #666666;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.right-edit-btn {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right-edit-btn img {
  width: 24px;
  height: 24px;
}
.right-edit-btn p {
  font-size: 12px;
  color: #666666;
}
.add-address-btn {
  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
.add-address-btn button {
  width: 100%;
  font-size: 16px;
  line-height: 44px;
  color: #ffffff;
  background: #FFE100;
  border-color: #FFE100;
  border-radius: 4px;
}
</style>
