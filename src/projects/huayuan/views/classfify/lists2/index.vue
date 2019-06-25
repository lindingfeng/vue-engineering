<template>
  <div class="second-classfify-list-box">
    <div class="classfify-list-title">分类列表</div>
    <div class="bottom-content-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无数据"
          style="width: 100%;">
          <el-table-column label="项目子分类">
            <template slot-scope="scope">
              <span>{{scope.row.class_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="分类图标">
            <template slot-scope="scope">
              <img v-if="scope.row.icon" :src="scope.row.icon" alt="" style="width: 50px;height: 50px;">
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="分类状态">
            <template slot-scope="scope">
              <span>{{scope.row.state==1?'正常':'隐藏'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.add_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">编辑</span>
              <span v-if="scope.row.delete_state==1" style="color: #FF0000;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">删除</span>
              <span v-else style="margin: 0 5px;">
                <el-popover
                  placement="top"
                  title="温馨提示"
                  trigger="hover"
                  content="该分类下还有商品，不能删除！">
                <el-button slot="reference">删除</el-button>
              </el-popover>
              </span>
              <span v-if="scope.row.delete_state!=1" style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(2, scope.$index)">查看项目</span>
              <span v-else style="color: #CCCCCC;margin: 0 5px;cursor: pointer">查看项目</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="total>0" class="pagination-box">
        <!--<div class="batch-operation">-->
          <!--<el-button v-if="activeTab==2||activeTab==3" type="success" size="small">批量上架</el-button>-->
          <!--<el-button v-if="activeTab==1" type="warning" size="small">批量下架</el-button>-->
          <!--<el-button type="danger" size="small">批量删除</el-button>-->
        <!--</div>-->
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
    name: 'secondLists',
    data(){
      return {
        class_id: '',
        activeTab: 0,
        tableData: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      // 获取分类列表
      getClassfifyList(){
        this.$store.dispatch('GetClassfifyList', {
          token: true,
          page: this.currentPage,
          class_id: this.class_id
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
          console.log(err)
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
      // 单条记录的编辑、删除
      operation(type, index){
        // console.log(type, index)
        if(type==0){ // 编辑
          this.$router.push(
            {
              name: 'edit',
              params: {
                state: this.tableData[index].state,
                pid: this.tableData[index].pid,
                class_id: this.tableData[index].class_id,
                class_name: this.tableData[index].class_name,
                icon: this.tableData[index].icon
              }
            })
        }else if(type==1){ // 删除
          let _this = this;
          this.$msgbox({
            title: '温馨提示',
            message: '确定要删除该条分类吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '删除中...';
                // 请求后台删除该条分类
                _this.$store.dispatch('DeleteClassfify', {
                  token: true,
                  type: 3,
                  class_name: _this.tableData[index].class_name,
                  class_id: _this.tableData[index].class_id
                }).then((res) => {
                  // console.log(res);
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.$message({
                      message: '删除成功！',
                      type: 'success',
                      duration: 1000
                    });
                    _this.getClassfifyList();
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
              } else {
                done();
              }
            }
          })
        }else if(type==2){ // 查看分类下的商品
          this.$router.push({ path: '/shop/classfify/shop', query: { class_id: this.tableData[index].class_id }})
        }

      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        // console.log(e)
        this.currentPage = e;
        this.getClassfifyList();
      }
    },
    mounted(){
      if(this.$route.query.class_id){
        this.class_id = this.$route.query.class_id;
      }
      this.getClassfifyList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .second-classfify-list-box {
    background-color: #fff;
    .classfify-list-title {
      padding: 20px;
      font-size: 22px;
      color: #333333;
    }
    .bottom-content-box {
      border-radius: 5px;
      .tabs-box {
        padding: 20px 30px 0 30px;
      }
      .table-box {
        padding: 20px;
        min-height: 500px;
        .el-button {
          padding: 0;
          color: #CCCCCC;
          border-color: transparent;
          background-color: transparent;
        }
        .el-button:hover {
          color: #CCCCCC;
          border-color: transparent;
          background-color: transparent;
        }
      }
      .pagination-box {
        padding: 0 20px 30px 20px;
        display: flex;
        justify-content: flex-end;
        .batch-operation {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
