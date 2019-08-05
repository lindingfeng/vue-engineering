<template>
  <div class="shop-list-page">
    <div class="btn-collection">
      <el-button
        size="small"
        type="danger"
        style="padding: 10px;"
      >
        <i class="el-icon-delete" style="margin-right: 3px;"></i>
        批量删除
      </el-button>
      <el-button
        size="small"
        type="success"
        style="padding: 10px;"
      >
        <i class="el-icon-upload2" style="margin-right: 3px;"></i>
        批量上架
      </el-button>
      <el-button
        size="small"
        type="warning"
        style="padding: 10px;"
      >
        <i class="el-icon-download" style="margin-right: 3px;"></i>
        批量下架
      </el-button>
      <el-button
        size="small"
        type="primary"
        style="padding: 10px;"
        @click="showShopDialog"
      >
        <i class="el-icon-circle-plus-outline" style="margin-right: 3px;"></i>
        添加商品
      </el-button>
    </div>
    <el-table
      :data="shopList"
      border
      :header-cell-style="{textAlign: 'center', background:'#F6F6F6'}"
      :cell-style="{textAlign: 'center'}"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column width="70" label="序号">
        <template slot-scope="scope">
          <p>{{(currentPage - 1) * pageSize + (scope.$index+1)}}</p>
        </template>
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
          <span v-else>下架</span>
        </template>
      </el-table-column>
      <el-table-column width="250" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="shopOperation(0, scope.row.shop_id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="shopOperation(1, scope.row.shop_id)"
          >删除</el-button>
          <el-button
            v-if="scope.row.shop_status == 0"
            size="mini"
            type="success"
            @click="shopOperation(2, scope.row.shop_id)"
          >上架</el-button>
          <el-button
            v-if="scope.row.shop_status == 1"
            size="mini"
            type="warning"
            @click="shopOperation(3, scope.row.shop_id)"
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
            <el-option v-for="(item, index) in categoryList" :label="item.category_name" :value="item.category_id" :key="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="shop_price">
          <el-input size="small" v-model="form.shop_price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="shop_detail">
          <el-input size="small" v-model="form.shop_detail" placeholder="请输入商品详情"></el-input>
        </el-form-item>
        <el-form-item label="商品轮播">
          <div class="category-icon-content">
            <!-- <div class="category-icon"></div> -->
            <el-upload
              class="avatar-uploader"
              action="http://132.232.35.229:3000/api/uploadfile"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <img v-if="form.category_icon" :src="form.category_icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-radio-group v-model="form.shop_status">
            <el-radio label="1">上架</el-radio>
            <el-radio label="0">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品库存" prop="shop_num">
          <el-input size="small" v-model="form.shop_num" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品运费" prop="shop_freight">
          <el-input size="small" v-model="form.shop_freight" placeholder="请输入商品运费"></el-input>
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
  shop_category: '',
  shop_category_id: '',
  shop_name: '',
  shop_price: '',
  shop_detail: '',
  shop_num: '',
  shop_freight: '',
  shop_status: '1',
  region: ''
}

export default {
  components: {
    [Button.name]: Button,
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
      shopList: [],
      categoryList: [],
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
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        shop_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: validatePrice, trigger: 'blur' }
        ],
        shop_detail: [
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
      try {
        let ret = await this.$adminKoa.getShopList({
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        })
        if (+ret.data._errCode === 0) {
          this.shopList = ret.data._data.shopList
          this.total = ret.data._data.total
        } else {
          Toast.fail(ret.data._errStr)
        }

      } catch (err) {
        console.log(err)
      }
    },
    /*
     * @description: 获取分类列表(API)
     * @author: lindingfeng
     * @date: 2019-08-05 21:03:25
    */
    async getCategory () {
      try {
        let ret = await this.$adminKoa.getCategory({
          pageIndex: this.currentPage
        })
        if (+ret.data._errCode === 0) {
          this.categoryList = ret.data._data.categoryList
          this.total = ret.data._data.total
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
    showShopDialog () {
      this.shop_id = ''
      this.form.shop_banner = []
      this.form = {
        ...initShop
      }
      this.dialogVisible = true
    },
    // 提交商品信息
    submitShop (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        }
      });
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
    shopOperation (type, id) {
      console.log(id)
    },
    /*
     * @description: 上传成功回调
     * @author: lindingfeng
     * @date: 2019-08-02 22:37:07
    */
    uploadSuccess (res, file, fileList) {
      // console.log(res, file, fileList)
      this.form.category_icon = res._data.src
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
}
.category-icon-content {
  padding-top: 8px;
  .category-icon {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
.red {
  color: #f00;
}
</style>
