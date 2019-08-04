<template>
  <div class="shop-list-page">
    <div class="btn-collection">
      <el-button
        size="small"
        type="danger"
        style="padding: 10px;">
        <i class="el-icon-delete" style="margin-right: 3px;"></i>
        批量删除
      </el-button>
      <el-button
        size="small"
        type="success"
        style="padding: 10px;">
        <i class="el-icon-upload2" style="margin-right: 3px;"></i>
        批量上架
      </el-button>
      <el-button
        size="small"
        type="warning"
        style="padding: 10px;">
        <i class="el-icon-download" style="margin-right: 3px;"></i>
        批量下架
      </el-button>
      <el-button
        size="small"
        type="primary"
        style="padding: 10px;">
        <i class="el-icon-circle-plus-outline" style="margin-right: 3px;"></i>
        添加商品
      </el-button>
    </div>
    <el-table
      :data="shopList"
      border
      :header-cell-style="{textAlign: 'center', background:'#F6F6F6'}"
      :cell-style="{textAlign: 'center'}">
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
  </div>
</template>

<script>
import {
  Button,
  Table,
  TableColumn,
  Pagination
} from 'element-ui'

export default {
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
  },
  data () {
    return {
      shopList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    /*
     * @description: 获取商品列表
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
    }
  },
  mounted () {
    console.log(this.$router)
    this.getShopList()
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
}
.red {
  color: #f00;
}
</style>
