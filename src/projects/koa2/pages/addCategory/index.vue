<template>
  <div class="add-category-page">
    
    <van-cell-group>
      <van-field
        v-model="shopCategory"
        label="商品类别"
        placeholder="请输入商品类别"
        label-width="80px"
        @click="show = true"
      />
    </van-cell-group>

    <div class="submit-box">
      <van-button
        type="primary" 
        class="add-button"
        :disabled="shopCategory.length < 2"
        @click="addCategory"
      >
      确认添加
      </van-button>
    </div>

  </div>
</template>

<script>
import {
  Button,
  CellGroup,
  Field,
  Toast
} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data () {
    return {
      shopCategory: ''
    }
  },
  methods: {
    // 添加商品分类
    async addCategory () {
      try {
        let ret = await this.$koa2Api.addCategory({
          shopCategory: this.shopCategory
        })
        if (+ret.data._errCode === 0) {
          Toast.success('添加成功')
        } else {
          Toast.fail(ret.data._errStr)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.add-category-page {
  padding: 12px;
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
