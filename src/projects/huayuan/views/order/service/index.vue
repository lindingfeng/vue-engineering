<template >
  <div class="order-lists-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">退款/售后</p>
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
    </div>
    <div class="bottom-content-box">
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
          <!--<el-table-column label="支付时间">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.pay_time}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="支付id">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.wetach_id}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.refund==1" style="color: #FEA700;">申请中</span>
              <span v-if="scope.row.refund==2" style="color: #8FB739;">已退款</span>
              <span v-if="scope.row.refund==3" style="color: #ff0000;">申请被拒绝</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">详情</span>
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
          :total="total"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'serverLists',
    data() {
      return {
        shopType: '',
        order_id: '',
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
        if(this.shopType){
          data.order_type = this.shopType
        }
        this.$store.dispatch('GetRefundList', data).then((res) => {
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
      // 订单类型的change事件
      shopTypeChange(e){
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
    .bottom-content-box {
      background-color: #fff;
      border-radius: 5px;
      .table-box {
        padding: 30px;
        min-height: 500px;
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
      }
    }
  }
</style>
