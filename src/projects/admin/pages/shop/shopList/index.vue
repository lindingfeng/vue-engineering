<template>
  <div class="shop-list-page">
    <div class="tabs-collection">
      <el-tabs v-model="activeTab" @tab-click="tabChange">
        <el-tab-pane label="全部商品" name="2" />
        <el-tab-pane label="上架商品" name="1" />
        <el-tab-pane label="下架商品" name="0" />
      </el-tabs>
    </div>
    <div class="btn-collection">
      <el-button
        v-if="shopList.length&&activeTab==0"
        size="small"
        type="danger"
        style="padding: 10px;"
        @click="deleteTogether"
      >
        <i class="el-icon-delete" style="margin-right: 3px;"></i>
        批量删除
      </el-button>
      <el-button
        v-if="shopList.length&&activeTab==0"
        size="small"
        type="success"
        style="padding: 10px;"
        @click="editShopStatusTogether(1)"
      >
        <i class="el-icon-upload2" style="margin-right: 3px;"></i>
        批量上架
      </el-button>
      <el-button
        v-if="shopList.length&&activeTab==1"
        size="small"
        type="warning"
        style="padding: 10px;"
        @click="editShopStatusTogether(0)"
      >
        <i class="el-icon-download" style="margin-right: 3px;"></i>
        批量下架
      </el-button>
      <el-button
        size="small"
        type="primary"
        style="padding: 10px;"
        @click="shopDialog"
      >
        <i class="el-icon-circle-plus-outline" style="margin-right: 3px;"></i>
        添加商品
      </el-button>
    </div>
    <el-table
      border
      :data="shopList"
      :header-cell-style="{textAlign: 'center', background:'#F6F6F6'}"
      :cell-style="{textAlign: 'center'}"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <p class="shop-name">{{scope.row.shop_name}}</p>
        </template>
      </el-table-column>
      <el-table-column width="100" label="商品分类">
        <template slot-scope="scope">
          <span>{{scope.row.shop_category}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="商品价格">
        <template slot-scope="scope">
          <span class="red">¥{{scope.row.shop_price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品详情">
        <template slot-scope="scope">
          <span>{{scope.row.shop_content}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="运费">
        <template slot-scope="scope">
          <span v-if="scope.row.shop_freight > 0" class="red">¥{{scope.row.shop_freight}}</span>
          <span v-else>免邮</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="商品销量">
        <template slot-scope="scope">
          <span>{{scope.row.shop_sales}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="商品库存">
        <template slot-scope="scope">
          <span>{{scope.row.shop_num}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100" label="商品状态">
        <template slot-scope="scope">
          <span v-if="scope.row.shop_status == 1">上架</span>
          <span v-else class="red">下架</span>
        </template>
      </el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :disabled="scope.row.shop_status == 1"
            @click="shopOperation(0, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.shop_status == 1"
            @click="shopOperation(1, scope.row)"
          >删除</el-button>
          <el-button
            v-if="scope.row.shop_status == 0"
            size="mini"
            type="success"
            @click="shopOperation(2, scope.row)"
          >上架</el-button>
          <el-button
            v-if="scope.row.shop_status == 1"
            size="mini"
            type="warning"
            @click="shopOperation(3, scope.row)"
          >下架</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="total>0" class="pagination-box">
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :current-page="currentPage"
        :total="total"
        @current-change="currentChange">
      </el-pagination>
    </div>

    <!-- 商品弹窗 -->
    <el-dialog
      width="650px"
      top="80px"
      :title="shop_id ? '编辑商品' : '添加商品'"
      :visible.sync="dialogVisible"
      :lock-scroll="false"
    >
      <el-form
        ref="form"
        inline-message
        label-width="80px"
        :model="form"
        :rules="formRules"
      >
        <el-form-item label="商品名称" prop="shop_name" >
          <el-input size="small" v-model="form.shop_name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="shop_category_id" >
          <el-select size="small" v-model="form.shop_category_id" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in categoryList"
              :label="item.category_name"
              :value="item.category_id"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="shop_price">
          <el-input size="small" v-model="form.shop_price" placeholder="请输入商品价格">
            <el-button size="small" slot="prepend">¥</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="shop_content">
          <el-input size="small" v-model="form.shop_content" placeholder="请输入商品详情"></el-input>
        </el-form-item>
        <el-form-item label="商品轮播" required>
          <div class="category-icon-content">
            <!-- 上传图片列表 -->
            <ul class="uploader-image-list">
              <li v-for="(item, index) in form.shop_banner" :key="index">
                <img :src="item" alt="">
                <div class="del-image" @click="delImage(index)">
                  <i class="el-icon-circle-close"></i>
                </div>
              </li>
              <li class="uploader" v-if="showUploaderBtn">
                <el-upload
                  class="avatar-uploader"
                  action="http://132.232.35.229:3000/api/uploadfile"
                  multiple
                  accept="image/jpeg,image/png,image/jpg"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="商品状态" required>
          <el-radio-group v-model="form.shop_status">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品库存" prop="shop_num">
          <el-input size="small" v-model="form.shop_num" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品运费" prop="shop_freight">
          <el-input size="small" v-model="form.shop_freight" placeholder="请输入商品运费">
             <el-button size="small" slot="prepend">¥</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitShop('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Button,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  RadioGroup,
  Radio,
  Upload,
  Pagination
} from 'element-ui'

const initShop = {
  shop_category_id: '',
  shop_name: '',
  shop_price: '',
  shop_content: '',
  shop_num: '',
  shop_freight: '',
  shop_status: 1
}

export default {
  components: {
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Upload.name]: Upload,
    [Pagination.name]: Pagination,
  },
  computed: {
    showUploaderBtn () {
      return this.form.shop_banner.length < 8
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.shop_id = ''
        this.form = {
          shop_banner: [],
          ...initShop
        }
        this.$nextTick(() => {
          this.$refs['form']&&this.$refs['form'].clearValidate&&this.$refs['form'].clearValidate()
        })
      }
    }
  },
  data () {
    const validatePrice = (rule, value, callback) => {
      // console.log(rule, value, callback)
      if (
        !/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
      ) {
        callback(new Error('请输入正确的价格'))
        return
      }
      callback()
    }
    const validateNumber = (rule, value, callback) => {
      if (
        !/^([0]{1}|[1-9]{1}[0-9]*)$/.test(value)
      ) {
        callback(new Error('请输入正确的数量'))
        return
      }
      callback()
    }
    return {
      activeTab: '2',
      isLoaded: false,
      shopList: [],
      categoryList: [],
      selectList: [],
      dialogVisible: false,
      form: {
        shop_banner: [],
        ...initShop
      },
      shop_id: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      formRules: {
        shop_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        shop_category_id: [
          { required: true, message: '请选择商品分类', trigger: ['blur', 'change'] }
        ],
        shop_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: validatePrice, trigger: 'blur' }
        ],
        shop_content: [
          { required: true, message: '请输入商品详情', trigger: 'blur' }
        ],
        shop_num: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        shop_freight: [
          { required: true, message: '请输入商品运费', trigger: 'blur' },
          { validator: validatePrice, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    /*
     * @description: 获取商品列表(API)
     * @author: lindingfeng
     * @date: 2019-08-04 21:26:19
    */
    async getShopList () {
      this.isLoaded = true
      try {
        let ret = await this.$admin.getShopList({
          type: this.activeTab,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        })
        if (+ret.data._errCode === 0) {
          this.shopList = ret.data._data.shopList
          this.total = ret.data._data.total
        } else {
          this.$message.closeAll()
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoaded = false
    },
    /*
     * @description: 获取分类列表(API)
     * @author: lindingfeng
     * @date: 2019-08-05 21:03:25
    */
    async getCategory () {
      try {
        let ret = await this.$admin.getCategory({
          pageIndex: this.currentPage
        })
        if (+ret.data._errCode === 0) {
          this.categoryList = ret.data._data.categoryList
        } else {
          this.$message.closeAll()
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @Description: 添加/编辑商品(API)
     * @Author: lindingfeng
     * @Date: 2019-08-06 11:41:51
    */
    async operationShop () {
      const params = {
        ...this.form
      }
      if (this.shop_id) {
        params.shop_id = this.shop_id
      }
      try {
        let ret = await this.$admin.operationShop(params)
        if (+ret.data._errCode === 0) {
          this.dialogVisible = false
          this.$message.success({
            message: params.shop_id ? '商品修改成功!' : '商品添加成功!',
            duration: 1500
          })
          if (!params.shop_id) {
            this.currentPage = 1
          }
          this.getShopList()
        } else {
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @Description: 单个/批量删除商品(API)
     * @Author: lindingfeng
     * @Date: 2019-08-08 10:29:53
    */
    async deleteShop (shop_ids) {
      try {
        let ret = await this.$admin.deleteShop({
          shop_ids
        })
        if (+ret.data._errCode === 0) {
          this.$message.success({
            message: '商品删除成功!',
            duration: 1500
          })
          this.currentPage = 1
          this.getShopList()
        } else {
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @description: 上/下架商品(API)
     * @author: lindingfeng
     * @date: 2019-08-07 20:53:08
    */
    async editShopStatus (shop_ids, shop_status) {
      try {
        let ret = await this.$admin.editShopStatus({
          shop_ids,
          shop_status
        })
        if (+ret.data._errCode === 0) {
          this.$message.success({
            message: +shop_status === 1 ? '商品上架成功!' : '商品下架成功!',
            duration: 1500
          })
          this.getShopList()
        } else {
          this.$message.error({
            message: ret.data._errStr,
            duration: 1500
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @description: tab切换
     * @author: lindingfeng
     * @date: 2019-08-07 23:04:23
    */
    tabChange (e) {
      this.shopList = []
      this.selectList = []
      this.pageIndex = 1
      this.getShopList()
    },
    /*
     * @Description: 添加/编辑商品弹窗
     * @Author: lindingfeng
     * @Date: 2019-08-06 11:24:25
    */
    shopDialog (type) {
      this.dialogVisible = true
    },
    /*
     * @Description: 删除上传图片
     * @Author: lindingfeng
     * @Date: 2019-08-06 11:24:53
    */
    delImage (index) {
      this.form.shop_banner.splice(index, 1)
    },
    // 提交商品信息
    submitShop (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.form.shop_banner.length) {
            this.$message.error({
              message: '请上传商品banner图!',
              duration: 1500
            })
            return
          }
          // 验证通过
          this.operationShop()
        }
      })
    },
    /*
     * @Description: 返回所有选中的数据(Array)
     * @Author: lindingfeng
     * @Date: 2019-08-06 15:39:11
    */
    selectionChange (selection) {
      // console.log('selectionChange', selection)
      this.selectList = selection
    },
    /*
     * @description: 分页
     * @author: lindingfeng
     * @date: 2019-08-04 19:14:17
    */
    currentChange(e){
      this.currentPage = e
      this.getShopList()
    },
    /*
     * @description: 商品操作
     * @author: lindingfeng
     * @date: 2019-08-04 21:26:43
    */
    shopOperation (type, item) {
      console.log(item)
      if (+type === 0) {
        // 编辑商品
        this.shop_id = item.shop_id
        this.form = {
          ...item,
          shop_banner: [
            ...item.shop_banner
          ]
        }
        this.dialogVisible = true
      } else if (+type === 1) {
        // 删除商品
        this.$confirm(`是否确认删除该商品?`, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.deleteShop(item.shop_id)
        }).catch(() => {
          console.log('已取消删除操作')
        })
      } else {
        // 上/下架商品
        this.$confirm(`是否确认${+type === 2 ? '上架' : '下架'}该商品?`, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          let shop_status = +type === 2 ? '1' : '0'
          this.editShopStatus(item.shop_id, shop_status)
        }).catch(() => {
          console.log('已取消上下架操作')
        })
      }
    },
    /*
     * @description: 批量删除商品
     * @author: lindingfeng
     * @date: 2019-08-08 00:29:03
    */
    deleteTogether () {
      let shop_ids = []
      if (!this.selectList.length) {
        this.$message.error({
          message: `请选择需要批量删除的商品!`,
          duration: 1500
        })
        return
      }
      this.$confirm(`是否确认删除所选商品?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.selectList.forEach(ele => {
          shop_ids.push(ele.shop_id)
        })
        this.deleteShop(shop_ids.join(','))
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    /*
     * @description: 批量上/下架商品
     * @author: lindingfeng
     * @date: 2019-08-07 22:40:33
    */
    editShopStatusTogether (shop_status) {
      let shop_ids = []
      if (!this.selectList.length) {
        this.$message.error({
          message: `请选择需要批量${+shop_status === 1 ? '上架' : '下架'}的商品!`,
          duration: 1500
        })
        return
      }
      this.$confirm(`是否确认${+shop_status === 1 ? '上架' : '下架'}所选商品?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        this.selectList.forEach(ele => {
          shop_ids.push(ele.shop_id)
        })
        this.editShopStatus(shop_ids.join(','), shop_status+'')
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    /*
     * @description: 上传成功回调
     * @author: lindingfeng
     * @date: 2019-08-02 22:37:07
    */
    uploadSuccess (res, file, fileList) {
      // console.log(res, file, fileList)
      if (this.form.shop_banner.length >= 8) {
        // console.log('最多只能上传8张banner哦')
        return
      }
      this.form.shop_banner.push(res._data.src)
    },
    /*
     * @description: 上传失败回调
     * @author: lindingfeng
     * @date: 2019-08-02 22:37:07
    */
    uploadError (err, file, fileList) {
      this.$message.error({
        message: '图片上传失败',
        duration: 1500
      })
    }
  },
  mounted () {
    this.getShopList()
    this.getCategory()
  }
}
</script>

<style lang="postcss" scoped>
.shop-list-page {
  padding: 15px;
  background-color: #fff;
  .btn-collection {
    margin: 15px 0;
  }
  .shop-name {
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .pagination-box {
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-input, .el-select {
    width: 350px;
  }
  /deep/ .el-tabs__header {
    margin: 0;
  }
  /deep/ .el-button.is-disabled {
    background-color: #dddddd;
    border-color: transparent;
  }
}
.category-icon-content {
  .category-icon {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.uploader-image-list {
  display: flex;
  flex-wrap: wrap;
  li {
    position: relative;
    width: 100px;
    margin-right: 10px;
    margin-top: 10px;
    height: 100px;
    background: #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    &.uploader {
      background-color: #fff;
      border: 1px dashed #d9d9d9;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
    }
    .del-image {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
.del-image {
  i {
    font-size: 20px;
    line-height: 20px;
    color: #f00;
  }
}
.red {
  color: #f00;
}
</style>
