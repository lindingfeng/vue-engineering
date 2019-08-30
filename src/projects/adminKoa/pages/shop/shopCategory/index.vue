<template>
  <div class="shop-list-page">
    <div class="btn-collection">
      <el-button
        size="small"
        type="danger"
        style="padding: 10px;"
        @click="deleteTogether"
      >
        <i class="el-icon-delete" style="margin-right: 3px;"></i>
        批量删除
      </el-button>
      <el-button
        size="small"
        type="primary"
        style="padding: 10px;"
        @click="addCategory"
      >
        <i class="el-icon-circle-plus-outline" style="margin-right: 3px;"></i>
        添加分类
      </el-button>
    </div>
    <el-table
      border
      :data="categoryList"
      :header-cell-style="{textAlign: 'center', background:'#F6F6F6'}"
      :cell-style="{textAlign: 'center'}"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <p class="shop-name">{{scope.row.category_name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="分类图标">
        <template slot-scope="scope">
          <img class="category-icon" :src="scope.row.category_icon" alt="">
        </template>
      </el-table-column>
      <el-table-column label="分类状态">
        <template slot-scope="scope">
          <span v-if="scope.row.category_status == 1">正常</span>
          <span v-else>停用</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <p class="shop-name">{{scope.row.create_time}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="shopOperation(0, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="shopOperation(1, scope.row)"
          >删除</el-button>
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

    <!-- 分类弹窗 -->
    <el-dialog
      width="600px"
      :title="category_id ? '编辑分类' : '添加分类'"
      :visible.sync="dialogVisible"
      :lock-scroll="false"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input size="small" v-model="form.category_name"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <div class="category-icon-content">
            <!-- <div class="category-icon"></div> -->
            <el-upload
              class="avatar-uploader"
              action="https://api.lindf.com/api/qiniu"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <img v-if="form.category_icon" :src="form.category_icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="分类状态">
          <el-radio-group v-model="form.category_status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCategory">确 定</el-button>
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
  Switch,
  RadioGroup,
  Radio,
  Upload,
  Pagination
} from 'element-ui'

const initCategory = {
  category_name: '',
  category_icon: '',
  category_status: '1'
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
    [Switch.name]: Switch,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Upload.name]: Upload,
    [Pagination.name]: Pagination,
  },
  data () {
    return {
      categoryList: [],
      selectList: [],
      dialogVisible: false,
      form: {
        ...initCategory
      },
      category_id: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    /*
     * @description: 获取分类列表(API)
     * @author: lindingfeng
     * @date: 2019-08-02 22:37:32
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
    /*
     * @description: 添加/编辑分类(API)
     * @author: lindingfeng
     * @date: 2019-08-03 14:30:55
    */
    async operationCategory () {
      const params = {
        ...this.form,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.category_id) {
        params.category_id = this.category_id
      }
      try {
        let ret = await this.$adminKoa.operationCategory(params)
        if (+ret.data._errCode === 0) {
          this.dialogVisible = false
          this.$message.success({
            message: params.category_id ? '分类修改成功!' : '分类添加成功!',
            duration: 1500
          })
          if (!params.category_id) {
            this.currentPage = 1
          }
          this.getCategory()
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
     * @Description: 单个/批量删除分类(API)
     * @Author: lindingfeng
     * @Date: 2019-08-05 15:20:10
    */
    async deleteCategory (category_ids) {
      try {
        let ret = await this.$adminKoa.deleteCategory({
          category_ids
        })
        if (+ret.data._errCode === 0) {
          this.$message.success({
            message: '分类删除成功!',
            duration: 1500
          })
          this.currentPage = 1
          this.getCategory()
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
     * @description: 添加分类
     * @author: lindingfeng
     * @date: 2019-08-02 22:36:50
    */
    addCategory () {
      this.category_id = ''
      this.form = {
        ...initCategory
      }
      this.dialogVisible = true
    },
    /*
     * @description: 操作分类
     * @author: lindingfeng
     * @date: 2019-08-02 22:36:58
    */
    shopOperation (type, item) {
      if (+type === 0) {
        this.dialogVisible = true
        this.category_id = item.category_id
        this.form = {
          category_name: item.category_name,
          category_icon: item.category_icon,
          category_status: item.category_status.toString()
        }
        return
      }
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(item.category_id)
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    /*
     * @description: 添加/编辑分类
     * @author: lindingfeng
     * @date: 2019-08-03 00:18:39
    */
    submitCategory () {
      this.operationCategory()
    },
    /*
     * @Description: 返回所有选中的数据(Array)
     * @Author: lindingfeng
     * @Date: 2019-08-05 17:31:56
    */
    selectionChange (selection) {
      // console.log('selectionChange', selection)
      this.selectList = selection
    },
    /*
     * @Description: 批量删除分类
     * @Author: lindingfeng
     * @Date: 2019-08-05 17:36:42
    */
    deleteTogether () {
      let category_ids = []
      if (!this.selectList.length) {
        this.$message.error({
          message: '请选择需要删除的分类!',
          duration: 1500
        })
        return
      }
      this.$confirm('此操作将永久删除所选分类, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectList.forEach(ele => {
          category_ids.push(ele.category_id)
        })
        this.deleteCategory(category_ids.join(','))
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    /*
     * @description: 分页
     * @author: lindingfeng
     * @date: 2019-08-04 19:14:17
    */
    currentChange(e){
      this.currentPage = e
      this.getCategory()
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
    this.getCategory()
    // let arr = [5, 6, 7]
    // let str = '1,2,3'
    // console.log(arr.join(',')) // "5,6,7"
    // console.log(str.split(',')) // ["1", "2", "3"]
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
  .category-icon {
    width: 50px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-input {
    width: 250px;
  }
  .pagination-box {
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
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
