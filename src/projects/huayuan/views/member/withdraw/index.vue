<template >
  <div class="member-withdraw-box" style="padding: 20px;">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">会员提现</p>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无会员信息"
          style="width: 100%">
          <el-table-column label="客户姓名">
            <template slot-scope="scope">
              <span>{{scope.row.user_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="提现金额（元）">
            <template slot-scope="scope">
              <span>{{'￥'+scope.row.balance}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手续费（元）">
            <template slot-scope="scope">
              <span>{{'￥'+scope.row.balance}}</span>
            </template>
          </el-table-column>
          <el-table-column label="打款金额（元）">
            <template slot-scope="scope">
              <span>{{'￥'+scope.row.balance}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请时间">
            <template slot-scope="scope">
              <span>{{scope.row.mobile?scope.row.mobile:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="提现状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state==2" style="color: #FEA700;">申请中</span>
              <span v-if="scope.row.state==3" style="color: #90B83B;">提现成功</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span v-if="scope.row.state==2" style="color: #008FFE;cursor: pointer;" @click="makeOrSee(0, scope.$index)">确认打款</span>
              <span v-if="scope.row.state==3" style="color: #008FFE;cursor: pointer;" @click="makeOrSee(1, scope.$index)">提现记录</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <el-dialog title="下级列表" :visible.sync="dialogSwiperVisible" width="600px" top="20vh">
      <div class="subordinate-box">
        <el-scrollbar style="height:100%;">
          <div class="subordinate-list-box">
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>66666666666666666666</p>
            <p>55555555555555555555</p>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'memberWithdraw',
    data(){
      return {
        search_word: '',
        name: '',
        nick: '',
        type: '',
        options: [],
        start_price: '',
        end_price: '',
        activeTab: 0,
        tableData: [],
        swiperArr: [],
        hasChoose: [],
        dialogSwiperVisible: false,
        currentPage: 1,
        total: 0,
        isLoading: false,
        iScreen: false
      }
    },
    methods: {
      // 会员信息列表
      getShopList(){
        let data = {
          token: true,
          page: this.currentPage,
          type: this.activeTab
        }
        this.$store.dispatch('GetMemberInfoLists', data).then((res) => {
          console.log(res);
          this.isLoading = false;
          if(res.data.errcode==0){
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }else if(res.data.errcode==9003){
            if(this.currentPage == 1){
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
          this.isLoading = false;
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
      // 显示项目详情轮播图
      makeOrSee(type, index){
        let _this = this;
        if(type==0){
          this.$msgbox({
            title: '温馨提示',
            message: '是否确认打款吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            lockScroll: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                // 请求后台确认打款
                _this.$store.dispatch('ShopUpDowm', {
                  token: true,
                  money_id: _this.tableData[index].money_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getShopList();
                    _this.$message({
                      message: '确认打款成功！',
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
        }else if(type==1){
          this.swiperArr = this.tableData[index].banner;
          this.dialogSwiperVisible = true;
        }
      },
      // 单条记录的确认打款、提现详情
      operation(type, index){
        let _this = this;
        let info = '';
        if(type==0){
          info = '确定要启用该会员吗？'
        }else {
          info = '确定要禁用该会员吗？'
        }
        this.$msgbox({
          title: '温馨提示',
          message: info,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          lockScroll: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = type==0?'启用中...':'禁用中...';
              // 请求后台启用/禁用该会员
              _this.$store.dispatch('ShopUpDowm', {
                token: true,
                type: 2,
                user_id: _this.tableData[index].user_id
              }).then((res) => {
                instance.confirmButtonLoading = false;
                done();
                if(res.data.errcode==0){
                  _this.getShopList();
                  _this.$message({
                    message: '禁用成功！',
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
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        // console.log(e)
        this.currentPage = e;
        this.getShopList();
      }
    },
    mounted(){
      this.getShopList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .member-withdraw-box {
    /* 隐藏el-scrollbar的横向滚动条 */
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .top-content-box {
      padding: 30px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 5px;
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*margin-bottom: 20px;*/
        .el-button--primary {
          color: #8FB739 !important;
          background-color: #fff !important;
          border-color: #8FB739 !important;
        }
        .left-text {
          display: flex;
          align-items: center;
          .title {
            font-size: 20px;
            line-height: 20px;
            color: #333333;
            margin-right: 10px;
          }
        }
        .right-search {
          width: 300px;
        }
      }
    }
    .bottom-content-box {
      background-color: #fff;
      border-radius: 5px;
      .table-box {
        padding: 30px;
        min-height: 500px;
      }
      .pagination-box {
        padding: 0 30px 30px 30px;
        display: flex;
        justify-content: flex-end;
        .batch-operation {
          display: flex;
          align-items: center;
        }
      }
    }
    .subordinate-box {
      width: 100%;
      height: 300px;
    /*background-color: #ff0000;*/
      .subordinate-list-box {
        /*height: 1000px;*/
      }
    }
  }
</style>
