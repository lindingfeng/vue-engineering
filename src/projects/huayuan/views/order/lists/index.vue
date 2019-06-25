<template >
  <div class="order-lists-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">订单列表</p>
        </div>
        <div class="right-text">
          <el-select size="small" v-model="shopType" placeholder="筛选订单类型" @change="shopTypeChange">
            <el-option label="全部" :value="0">全部</el-option>
            <el-option label="普通订单" :value="1">普通订单</el-option>
            <el-option label="拼团订单" :value="2">拼团订单</el-option>
            <el-option label="集赞订单" :value="3">集赞订单</el-option>
          </el-select>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-box">
        <div class="line-screen-box">
          <div class="title">预约姓名</div>
          <div class="select-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入预约姓名"
              v-model="name">
            </el-input>
          </div>
          <div class="title">预约电话</div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入预约电话"
              v-model="mobile">
            </el-input>
          </div>
          <div>
            <el-button size="small" type="primary" icon="el-icon-search" @click="startScreen">开始筛选</el-button>
            <el-button size="small" type="info" @click="resetFunc">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="tabs-box">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="已付款" name="1"></el-tab-pane>
          <el-tab-pane label="已完成" name="2"></el-tab-pane>
          <el-tab-pane label="已取消" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
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
              <span>{{'￥'+scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约姓名">
            <template slot-scope="scope">
              <span>{{scope.row.real_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约电话">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单时间">
            <template slot-scope="scope">
              <span>{{scope.row.add_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付时间">
            <template slot-scope="scope">
              <span>{{scope.row.pay_time?scope.row.pay_time:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付id">
            <template slot-scope="scope">
              <span>{{scope.row.wetach_id?scope.row.wetach_id:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status=='待消费'" style="color: #FEA700;">{{scope.row.status}}</span>
              <span v-if="scope.row.status=='已完成'" style="color: #ff0000;">{{scope.row.status}}</span>
              <span v-if="scope.row.status=='已取消'" style="color: #666666;">{{scope.row.status}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">详情</span>
              <span v-if="scope.row.status=='待消费'&&scope.row.group_state==1" style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">确认消费</span>
              <span v-if="scope.row.status=='待消费'&&(scope.row.group_state==2 || scope.row.group_state==3)&&scope.row.group_order_state==2" style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">确认消费</span>
              <span v-if="scope.row.status=='待消费'&&scope.row.group_state==2&&scope.row.group_order_state==1" style="color: #CCCCCC;margin: 0 5px;">拼团中</span>
              <span v-if="scope.row.status=='待消费'&&scope.row.group_state==3&&scope.row.group_order_state==1" style="color: #CCCCCC;margin: 0 5px;">集赞中</span>
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
    name: 'orderLists',
    data() {
      return {
        shopType: '',
        order_id: '',
        name: '',
        mobile: '',
        activeTab: '0',
        iScreen: false,
        tableData: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      // 获取订单列表
      getOrderList(){
        let data = {
          token: true,
          type: this.activeTab,
          page: this.currentPage
        };
        if(this.iScreen){
          if(this.name){
            data.name = this.name;
          }
          if(this.mobile){
            data.mobile = this.mobile;
          }
        }
        if(this.shopType){
          data.order_type = this.shopType
        }
        this.$store.dispatch('GetOrderList', data).then((res) => {
          // this.isLoading = false;
          if(res.data.errcode==0){
            console.log(res.data)
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
      // tabs的change事件
      handleClick(e){
        this.currentPage = 1;
        this.total = 0;
        this.tableData = [];
        this.getOrderList();
      },
      // 订单类型的change事件
      shopTypeChange(e){
        this.tableData = [];
        this.currentPage = 1;
        this.total = 0;
        this.getOrderList();
      },
      // 开始筛选
      startScreen(){
        if(this.name || this.mobile){
          this.iScreen = true;
          this.tableData = [];
          this.currentPage = 1;
          this.total = 0;
          this.getOrderList();
        }else {
          this.$message({
            message: '请输入需要筛选的内容！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 重置筛选添加
      resetFunc(){
        this.name = '';
        this.mobile = '';
        this.iScreen = false;
        this.tableData = [];
        this.currentPage = 1;
        this.total = 0;
        this.getOrderList();
      },
      // 单条消息的编辑、到店确认
      operation(type, index){
        let _this = this;
        if(type==0){  // 详情
          this.$router.push({path: '/order/detail', query: { order_id: this.tableData[index].order_id }});
        }else if(type==1){  // 确认到店
          this.$msgbox({
            title: '温馨提示',
            message: '确定客户已到店消费？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            lockScroll: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '确认中...';
                _this.$store.dispatch('SetArrive', {
                  token: true,
                  order_id: _this.tableData[index].order_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getOrderList();
                    _this.$message({
                      message: '确认到店消费成功！',
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
        }
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        this.currentPage = e;
        this.getOrderList();
      }
    },
    mounted(){
      this.getOrderList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
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
  .order-lists-box {
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
      .pagination-box {
        padding: 0 30px 30px 30px;
        display: flex;
        justify-content: flex-end;
        /*.batch-operation {*/
          /*display: flex;*/
          /*align-items: center;*/
        /*}*/
      }
    }
  }
</style>
