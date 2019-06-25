<template >
  <div class="member-list-box" style="padding:20px;">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">会员基本信息</p>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-box">
        <div class="line-screen-box">
          <div class="title">手机号码</div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入手机号码"
              v-model="name"
              @keyup.native="priceKeyup($event)">
            </el-input>
          </div>
          <div class="title">会员昵称</div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入昵称"
              v-model="nick">
            </el-input>
          </div>
          <div>
            <el-button size="small" type="primary" :loading="isLoading" icon="el-icon-search" @click="startScreen">开始筛选</el-button>
            <el-button size="small" type="info" @click="resetFunc">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="tabs-box">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="未启用" name="1"></el-tab-pane>
          <el-tab-pane label="启用中" name="2"></el-tab-pane>
          <el-tab-pane label="已禁用" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无会员信息"
          style="width: 100%">
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img style="width: 50px;height: 50px;border-radius: 50%;" :src="scope.row.avatar" alt="">
            </template>
          </el-table-column>
          <el-table-column label="会员昵称">
            <template slot-scope="scope">
              <span>{{scope.row.user_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <span>{{scope.row.mobile?scope.row.mobile:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地区">
            <template slot-scope="scope">
              <span>{{scope.row.address?scope.row.address:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上级">
            <template slot-scope="scope">
              <span>{{scope.row.bind_user?scope.row.bind_user:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下级">
            <template slot-scope="scope">
              <span style="color: #008FFE;cursor: pointer;" @click="showSubordinate(scope.$index)">查看下级</span>
            </template>
          </el-table-column>
          <el-table-column label="余额（元）">
            <template slot-scope="scope">
              <span>{{'￥'+scope.row.balance}}</span>
            </template>
          </el-table-column>
          <el-table-column label="佣金">
            <template slot-scope="scope">
              <span style="color: #008FFE;cursor: pointer;" @click="showCommission(scope.$index)">查看佣金明细</span>
            </template>
          </el-table-column>
          <el-table-column label="合伙人状态">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1">未启用</span>
              <span v-if="scope.row.state==2">启用中</span>
              <span v-if="scope.row.state==3">已禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span v-if="scope.row.state!=2" style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">启用</span>
              <span v-else style="color: #cccccc;margin: 0 5px;cursor: not-allowed">启用</span>
              <span v-if="scope.row.state!=3" style="color: #FF4444;margin: 0 5px;cursor: pointer" @click="operation(2, scope.$index)">禁用</span>
              <span v-else style="color: #cccccc;margin: 0 5px;cursor: not-allowed">禁用</span>
              <span style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(3, scope.$index)">消费记录</span>
              <!--<span style="color: #cccccc;margin: 0 5px;cursor: not-allowed">消费记录</span>-->
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
    <!-- 下级列表 -->
    <el-dialog title="下级列表" :visible.sync="dialogSwiperVisible" width="600px" top="20vh">
      <div class="subordinate-box">
        <el-scrollbar style="height:100%;">
          <div class="subordinate-list-box">
            <div class="user-list-box">
              <div class="user-list-item" v-for="(item, index) in userLists" :key="index">
                <img :src="item.avatar" style="width: 50px;height: 50px;" alt="">
                <p>{{item.user_name}}</p>
              </div>
            </div>
            <div v-if="userLists.length==0" class="null-box">
              <img src="@@/images/null.png" alt="" />
              <p>暂无下级</p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!-- 消费记录 -->
    <el-dialog title="消费记录" :visible.sync="dialogOrderVisible" width="800px" top="20vh">
      <div class="subordinate-box records-box">
        <el-scrollbar style="height:100%;">
          <el-table
            :data="records"
            :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
            :cell-style="{textAlign: 'center'}"
            style="width: 100%">
            <el-table-column label="项目信息" width="300">
              <template slot-scope="scope">
                <div class="pro-box">
                  <img :src="scope.row.banner[0]" alt="" />
                  <div class="pro-item">
                    <div class="top">
                      <p class="first">{{scope.row.goods_name}}</p>
                      <p class="group" v-if="scope.row.group_state==2">拼团</p>
                      <p class="collect" v-if="scope.row.group_state==3">集赞</p>
                    </div>
                    <p>{{scope.row.brief}}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="实收款（元）">
              <template slot-scope="scope">
                <span>{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="下单时间">
              <template slot-scope="scope">
                <span>{{scope.row.add_time}}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status=='待消费'" style="color: #FEA700;">{{scope.row.status}}</span>
                <span v-if="scope.row.status=='已完成'" style="color: #ff0000;">{{scope.row.status}}</span>
                <span v-if="scope.row.status=='已取消'" style="color: #666666;">{{scope.row.status}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </el-dialog>
    <!-- 佣金明细 -->
    <el-dialog title="佣金明细" :visible.sync="dialogCommissionVisible" width="800px" top="20vh">
      <div class="subordinate-box records-box">
        <el-scrollbar style="height:100%;">
          <el-table
            :data="commissionLists"
            :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
            :cell-style="{textAlign: 'center'}"
            style="width: 100%">
            <el-table-column label="用户头像">
              <template slot-scope="scope">
                <img :src="scope.row.avatar" alt="" style="width: 50px;height: 50px;border-radius: 50%;" />
              </template>
            </el-table-column>
            <el-table-column label="用户姓名">
              <template slot-scope="scope">
                <span>{{scope.row.user_name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template slot-scope="scope">
                <span>{{scope.row.add_time}}</span>
              </template>
            </el-table-column>
            <el-table-column label="佣金">
              <template slot-scope="scope">
                <span>+{{scope.row.amount}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'memberLists',
    data(){
      return {
        name: '',
        nick: '',
        activeTab: 0,
        tableData: [],
        dialogSwiperVisible: false,
        dialogOrderVisible: false,
        dialogCommissionVisible: false,
        currentPage: 1,
        total: 0,
        isLoading: false,
        iScreen: false,
        userLists: [],
        commissionLists: [],
        records: []
      }
    },
    methods: {
      // 会员信息列表
      getShopList(tip){
        let data = {
          token: true,
          page: this.currentPage,
          type: this.activeTab
        }

        if(this.iScreen){  // 如果点击了筛选按钮

          if(this.name){
            data.mobile = this.name;
          }

          if(this.nick){
            data.search_name = this.nick;
          }

        }

        if(tip){
          data.page = 1;
        }

        this.$store.dispatch('GetMemberInfoLists', data).then((res) => {
          console.log(res);
          this.isLoading = false;
          if(res.data.errcode==0){
            this.tableData = res.data.data.data;
            // if(tip){
            //   this.currentPage = 1;
            // }
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
      // 获取会员下的消费记录
      getOrderList(user_id){
        this.$store.dispatch('GetMemberOrder', {
          token: true,
          user_id: user_id
        }).then((res) => {
          // this.isLoading = false;
          if(res.data.errcode==0){
            console.log(res.data)
            this.records = res.data.data;
          }else if(res.data.errcode==9003){
            this.records = [];
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
      // 只让数字可以输入
      priceKeyup(e){
        this.name = e.target.value.replace(/[^\d]/g, "");
      },
      // 开始筛选
      startScreen(){
        if(this.name){
          this.isLoading = true;
          this.iScreen = true;
          this.tableData = [];
          this.currentPage = 1;
          this.total = 0;
          this.getShopList(true);
        }else if(this.nick){
          this.isLoading = true;
          this.iScreen = true;
          this.tableData = [];
          this.currentPage = 1;
          this.total = 0;
          this.getShopList(true);
        }else {
          // this.iScreen = false;
          // this.getShopList(true);
          this.$message({
            message: '输入需要筛选的条件！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 重置筛选添加
      resetFunc(){
        this.name = '';
        this.nick = '';
        this.iScreen = false;
        this.tableData = [];
        this.currentPage = 1;
        this.total = 0;
        this.getShopList(true);
      },
      // 查看下级列表
      showSubordinate(index){
        let user_id = this.tableData[index].user_id;
        this.dialogSwiperVisible = true;
        this.userLists = [];
        this.$store.dispatch('GetSubordinateList', {
          token: true,
          user_id: user_id,
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            this.userLists = res.data.data;
          }else if(res.data.errcode==9003){
            this.userLists = [];
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
      // 查看佣金明细
      showCommission(index){
        let user_id = this.tableData[index].user_id;
        this.commissionLists = [];
        this.dialogCommissionVisible = true;
        this.$store.dispatch('GetIncomeList', {
          token: true,
          user_id: user_id,
        }).then((res) => {
          console.log(res.data);
          if(res.data.errcode==0){
            this.commissionLists = res.data.data;
          }else if(res.data.errcode==9003){
            this.commissionLists = [];
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
      // 切换tabs
      handleClick(){
        this.tableData = [];
        this.currentPage = 1;
        this.total = 0;
        // 请求接口
        this.getShopList(true);
      },
      // 单条记录的启用、禁用
      operation(type, index){
        let _this = this;
        let info = '';
        if(type==1){
          info = '确定要启用该会员吗？'
        }else if(type==2) {
          info = '确定要禁用该会员吗？'
        }
        if(type==1 || type==2){
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
                instance.confirmButtonText = type==1?'启用中...':'禁用中...';
                // 请求后台启用/禁用该会员
                _this.$store.dispatch('StopOrUp', {
                  token: true,
                  type: type,
                  user_id: _this.tableData[index].user_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    if(type==1){
                      _this.$message({
                        message: '启用成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }else {
                      _this.$message({
                        message: '禁用成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }
                    _this.getShopList();
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
        }else if(type==3){  // 查看消费记录
          let user_id = this.tableData[index].user_id;
          this.records = [];
          this.getOrderList(user_id);
          this.dialogOrderVisible = true;
        }

      },
      // 分页事件
      currentChange(e){
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
  .el-input-group__prepend {
    padding: 0 12px !important;
  }
  .el-tabs__item {
    font-size: 18px !important;
    color: #666666;
  }
  .el-tabs__active-bar {
    background-color: #8FB739;
  }
  .el-tabs__item.is-active,
  .el-tabs__item:hover{
    color: #8FB739;
  }
  .member-list-box {
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
        margin-bottom: 20px;
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
    .screen-box {
      padding: 25px 0;
      background-color: #FAFAFA;
      .line-screen-box {
        display: flex;
        align-items: center;
        .title {
          font-size: 17px;
          margin: 0 15px;
        }
        .name-input, .select-input {
          width: 196px;
        }
        .name-input-margin {
          margin-right: 20px;
        }
        .row-line {
          margin: 0 12px;
        }
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
        min-height: 400px;
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
      .subordinate-list-box {
        .user-list-box {
          padding: 10px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .user-list-item {
            width: 20%;
            margin-bottom: 15px;
            text-align: center;
            img {
              width: 50px;
              height: 50px;
              margin-bottom: 5px;
              border-radius: 50%;
            }
            p {
              font-size: 14px;
              color: #666666;
              line-height: 14px;
              word-break:keep-all;/* 不换行 */
              white-space:nowrap;/* 不换行 */
              overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow:ellipsis;
            }
          }
        }
        .null-box {
          padding-top: 40px;
          text-align: center;
          img {
            width: 100px;
          }
          p {
            font-size: 14px;
            color: #cccccc;
          }
        }
      }
    }
    .records-box {
      .pro-box {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100px;
          height: 50px;
          margin-right: 8px;
        }
        .pro-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 120px;
          height: 50px;
          .top {
            .group, .collect {
              width: 30px;
              text-align: center;
              background-color: #FF7800;
              color: #ffffff;
              font-size: 10px;
              line-height: 14px;
              border-radius: 3px;
            }
            .collect {
              background-color: #409EFF;
            }
            .first {
              width: 120px;
              font-size: 14px;
              line-height: 16px;
              word-break:keep-all;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            }
          }
          p {
            width: 120px;
            font-size: 12px;
            line-height: 14px;
            text-align: left;
            word-break:keep-all;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
</style>
