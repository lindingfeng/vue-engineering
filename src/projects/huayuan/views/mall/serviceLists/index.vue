<template >
  <div class="mall-order-lists-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">退款/售后</p>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="table-title">
        <div class="child-box" style="width: 300px;">商品信息</div>
        <div class="child-box" style="width: 150px;">商品单价</div>
        <div class="child-box" style="width: 150px;">数量</div>
        <div class="child-box flex">订单总额</div>
        <div class="child-box flex">买家姓名</div>
        <div class="child-box flex">买家电话</div>
        <div class="child-box flex">订单状态</div>
        <div class="child-box flex">操作</div>
      </div>
      <div class="order-list-box">
        <div class="order-list-child" v-for="(item, index) in tableData">
          <div class="order-title">
            <div class="order-info-box" style="min-width: 350px;">{{'订单编号：'+item.s_order_id}}</div>
            <div class="order-info-box">{{'下单时间：'+item.add_time}}</div>
            <div>
              <el-popover
                placement="top"
                trigger="click"
                @show="popoverShow(item.address_id)"
              >
                <div class="user-info-box">
                  <div class="user-info-item">
                    <p class="left">收货人：</p>
                    <p class="right">{{userAddress.name}}</p>
                  </div>
                  <div class="user-info-item">
                    <p class="left">收货号码：</p>
                    <p class="right">{{userAddress.mobile}}</p>
                  </div>
                  <div class="user-info-item">
                    <p class="left">收货地址：</p>
                    <p class="right address">{{userAddress.address}}</p>
                  </div>
                </div>
                <el-button slot="reference" size="mini" type="warning">查看收货信息</el-button>
              </el-popover>
            </div>
          </div>

          <div class="order-list-item">
            <div>
              <div class="order-shop-info" v-for="(child, idx) in item.goods">
                <div class="order-shop-item">
                  <div class="shop-img">
                    <img :src="child.banner[0]" />
                  </div>
                  <p class="shop-name">{{child.goods_name}}</p>
                  <p class="shop-price">{{'￥'+child.price}}</p>
                  <p class="shop-number">{{child.num}}</p>
                </div>
              </div>
            </div>
            <div class="order-other-info">
              <p class="p1">￥{{item.amount}}</p>
            </div>
            <div class="order-other-info">
              <p class="p1">{{item.name}}</p>
            </div>
            <div class="order-other-info">
              <p class="p1">{{item.mobile}}</p>
            </div>
            <div class="order-other-info">
              <p v-if="item.refund==1" class="p1" style="color: #FEA700;">申请中</p>
              <p v-else-if="item.refund==2" class="p1" style="color: #8FB739;">已退款</p>
              <p v-else-if="item.refund==3" class="p1" style="color: #ff0000;">申请被拒绝</p>
            </div>
            <div class="order-other-info">
              <p class="p1">
                <span style="margin: 0 5px;cursor: pointer;color: #008FFE;" @click="operation(0, index)">详情</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 暂无订单 -->
      <div v-show="tableData.length===0" class="null-box">暂无订单</div>

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
  import { scrollTo } from '@@/utils/scrollTo'
  export default {
    name: 'serverLists',
    data() {
      return {
        order_id: '',
        userAddress: {
          name: '-',
          mobile: '-',
          address: '-'
        },
        activeTab: 0,
        tableData: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      // 获取订单列表
      getOrderList(){
        this.$store.dispatch('GetShopRefundList', {
        // this.$store.dispatch('GetShopOrderList', {
          token: true,
          // type: this.activeTab,
          page: this.currentPage
        }).then((res) => {
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
      // 获取用户收货信息
      getUserAddress(address_id){
        this.$store.dispatch('GetUserAddress', {
          token: true,
          address_id: address_id
        }).then((res) => {
          if(res.data.errcode==0){
            this.userAddress.name = res.data.data.name;
            this.userAddress.mobile = res.data.data.mobile;
            this.userAddress.address = res.data.data.complete;
          }else if(res.data.errcode==9003){

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
      // 显示时触发
      popoverShow(address_id){
        this.getUserAddress(address_id);
      },
      // 单条消息的编辑、到店确认
      operation(type, index){
        let _this = this;
        if(type==0){  // 详情
          this.$router.push({path: '/mall/detail', query: { order_id: this.tableData[index].s_order_id }});
        }
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        this.currentPage = e;
        scrollTo(0, 500);
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
  .user-info-box {
    /*width: 500px;*/
    .user-info-item {
      display: flex;
      margin-top: 10px;
      p {
        font-size: 15px;
        color: #666666;
      }
      .left {
        width: 80px;
        text-align: right;
      }
      .right {
        width: 200px;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .right.address {
        min-height: 42px;
      }
    }
    .user-info-item:first-child {
      margin-top: 0;
    }
  }
  .mall-order-lists-box {
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
      padding: 30px;
      background-color: #fff;
      border-radius: 5px;
      .null-box {
        padding-top: 20px;
        height: 100px;
        text-align: center;
        font-size: 16px;
        color: #666;
      }
      /*.table-title-box {*/
        /*min-width: 1000px;*/
        /*padding: 30px;*/
        .table-title {
          display: flex;
          background: rgb(246, 246, 246);
          .child-box {
            text-align: center;
            font-size: 14px;
            font-weight: 700;
            color: #909399;
            line-height: 24px;
            padding: 12px 10px;
          }
          .child-box.flex {
            flex: 1;
          }
        }
      /*}*/

      .order-list-box {
        padding-top: 5px;
        .order-title {
          padding: 0 15px;
          display: flex;
          align-items: center;
          height: 40px;
          background-color: #F2F4F8;
          .order-info-box {
            margin-right: 20px;
            font-size: 15px;
            color: #666666;
            line-height: 15px;
          }
        }
        .order-list-item {
          width: 100%;
          display: flex;
          margin: 10px 0;
          border: 1px solid #eeeeee;
          /*border-bottom: 1px solid #eeeeee;*/
          .order-shop-info {
            width: 600px;
            /*margin-top: 10px;*/
            padding: 10px 0;
            border-bottom: 1px solid #eeeeee;
            .order-shop-item {
              display: flex;
              align-items: center;
              .shop-img {
                padding-left: 15px;
                /*width: 135px;*/
                /*height: 80px;*/
                margin-right: 15px;
                img {
                  width: 135px;
                  height: 80px;
                }
              }
              .shop-name {
                width: 150px;
                line-height: 24px;
                font-size: 16px;
                color: #777777;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .shop-price {
                flex: 1;
                text-align: center;
                color: #FF0000;
              }
              .shop-number {
                flex: 1;
                text-align: center;
              }
            }
          }
          .order-shop-info:last-child {
            border-bottom: 0;
          }
          .order-other-info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            border-left: 1px solid #eeeeee;
            /*font-size: 14px;*/
            /*color: #777777;*/
            .p1 {
              min-width: 120px;
              text-align: center;
              padding: 0 10px;
              word-break: break-all;
              word-wrap: break-word;
              white-space: pre-wrap;
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
