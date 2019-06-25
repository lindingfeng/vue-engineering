<template >
  <div class="recommend-hot-box">
    <div class="top-content-box">
      <div class="title">热门项目</div>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="addHot">添加热门项目</el-button>
    </div>
    <div class="bottom-content-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无热门项目"
          style="width: 100%"
          :default-sort = "{prop: 'prices', order: 'descending'}"
          @sort-change="sortChange"
          @select="checkBoxChange"
          @select-all="allCheckBoxChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <span>{{scope.row.goods_name}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="项目类别">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.type}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="项目banner">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.banner[0]" alt="">
            </template>
          </el-table-column>
          <el-table-column label="项目价格">
            <template slot-scope="scope">
              <p style="font-size: 14px;line-height: 18px;color: #CCCCCC;text-decoration:line-through">{{'￥'+scope.row.original_price}}</p>
              <p style="font-size: 14px;line-height: 18px;color: #FF8400;">{{'￥'+scope.row.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="拼团价格">
            <template slot-scope="scope">
              <span>{{scope.row.group_state==2?'￥'+scope.row.group_price:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="集赞价格">
            <template slot-scope="scope">
              <span>{{scope.row.group_state==3?'￥'+scope.row.group_price:'-'}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="项目规格">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.specifications}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="项目简介">
            <template slot-scope="scope">
              <span>{{scope.row.brief}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="项目详情">-->
            <!--<template slot-scope="scope">-->
              <!--<img style="width: 100px;" :src="scope.row.detail" alt="">-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="项目状态">-->
            <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.state==0">下架</span>-->
              <!--<span v-if="scope.row.state==1">上架</span>-->
              <!--<span v-if="scope.row.state==2">草稿箱</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="创建时间" sortable="custom">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.date}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #FF0000;margin: 0 5px;cursor: pointer" @click="operation('one', scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="total>0" class="pagination-box">
        <div class="batch-operation">
          <el-button type="danger" size="small" @click="deleteBatch">批量删除</el-button>
        </div>
        <el-pagination
          background
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'classfifyShop',
    data() {
      return {
        class_id: '',
        start_price: '',
        end_price: '',
        activeTab: 0,
        tableData: [],
        hasChoose: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      // 获取热门商品列表
      getHotLists(){
        this.$store.dispatch('GetHotLists', {
          token: true,
          page: this.currentPage
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }else if(res.data.errcode==9003){
            if(this.currentPage==1){
              this.tableData = [];
              this.total = 0;
            }else {
              this.tableData = [];
            }
          }else {
            this.$message({
              message: res.data.errstr+'（'+res.data.errcode+'）',
              type: 'error',
              duration: 1000
            });
          }
        }).catch((err) => {
          if(err == 'token is overdue'){
            this.$message({
              message: '登录已过期，请重新登录！',
              type: 'error',
              duration: 1000
            });
            setTimeout(()=>{
              this.$store.dispatch('FedLogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }, 1000)
          }else {
            this.$message({
              message: '服务器开了会小差！',
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      // 前往添加热门项目页面
      addHot(){
        this.$router.push({path: '/shop/recommend/add'});
      },
      // 排序请求
      sortChange(e){
        // console.log(e.column)
        // 请求后台排序接口
        if(e.order == 'ascending' || e.order == 'descending'){ // 升序
          // 再判断是哪个字段的升序
          if(e.column.label=='项目价格'){

          }else if(e.column.label=='拼团价格'){

          }else if(e.column.label=='创建时间'){

          }
        }else { // 默认排序

        }
      },
      // 单选表格事件
      checkBoxChange(e){
        console.log(e)
        this.hasChoose = e;
      },
      // 全选表格事件
      allCheckBoxChange(e){
        console.log(e)
        this.hasChoose = e;
      },
      // 单条记录的删除
      operation(type, index){
        let _this = this;
        let info = '';
        let goods_id = [];
        if(type=='batch'){
          for(let i=0;i<this.hasChoose.length;i++){
            goods_id.push(this.hasChoose[i].goods_id);
          }
          goods_id = goods_id.join(',');
          info = '确定要删除选中的热门项目吗？';
        }else if(type=='one') {
          goods_id = this.tableData[index].goods_id;
          info = '确定要删除该条热门项目吗？';
        }
        this.$msgbox({
          title: '温馨提示',
          message: info,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '删除中...';
              // 请求后台删除该条分类
              _this.$store.dispatch('AddDeleteHot', {
                token: true,
                type: 2,
                goods_id: goods_id
              }).then((res) => {
                instance.confirmButtonLoading = false;
                done();
                if(res.data.errcode==0){
                  _this.getHotLists();
                  _this.$message({
                    message: '删除成功！',
                    type: 'success',
                    duration: 1000
                  });
                }else {
                  _this.$message({
                    message: res.data.errstr+'（'+res.data.errcode+'）',
                    type: 'error',
                    duration: 1000
                  });
                }
              }).catch((err) => {
                instance.confirmButtonLoading = false;
                done();
                if(err == 'token is overdue'){
                  _this.$message({
                    message: '登录已过期，请重新登录！',
                    type: 'error',
                    duration: 1000
                  });
                  setTimeout(()=>{
                    _this.$store.dispatch('FedLogOut').then(() => {
                      location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                  }, 1000)
                }else {
                  _this.$message({
                    message: '服务器开了会小差！',
                    type: 'error',
                    duration: 1000
                  });
                }
              })
            } else {
              done();
            }
          }
        })
      },
      // 批量删除
      deleteBatch(){
        if(this.hasChoose.length>0){
          this.operation('batch', '')
        }else {
          this.$message({
            message: '请选择需要删除的商品！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        this.currentPage = e;
        this.getHotLists();
      }
    },
    mounted(){
      this.getHotLists();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .recommend-hot-box {
    .top-content-box {
      padding: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      .title {
        font-size: 22px;
        color: #333333;
        margin-right: 15px;
      }
      button {
        /*width: 100px;*/
        font-size: 14px;
        background-color: #8FB739;
        border-color: #8FB739;
      }
    }
    .bottom-content-box {
      background-color: #fff;
      border-radius: 5px;
      .tabs-box {
        padding: 20px 30px 0 30px;
      }
      .table-box {
        padding: 30px;
        min-height: 500px;
      }
      .pagination-box {
        padding: 0 30px 30px 30px;
        display: flex;
        justify-content: space-between;
        .batch-operation {
          display: flex;
          align-items: center;
        }
      }
    }
    .rule-form-box {
      /*min-height: 200px;*/
      .el-form-item__label {
        font-size: 16px;
        font-weight: normal;
      }
      .btn-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 100px;
        button {
          width: 100px;
          height: 32px;
          border-color: transparent;
        }
        .confirm {
          background-color: #8FB739;
        }
      }
    }
  }
</style>
