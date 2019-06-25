<template >
  <div class="order-detail-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p v-if="order_detail.status!='已取消'" class="title">订单详情</p>
          <p v-else class="title">退款详情</p>
        </div>
      </div>
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="order_detail" label-width="100px">
            <el-form-item label="订单编号:">
              <div class="shop-val">{{order_detail.s_order_id}}</div>
            </el-form-item>
            <el-form-item label="下单时间:">
              <div class="shop-val">{{order_detail.add_time}}</div>
            </el-form-item>
            <el-form-item v-if="order_detail.express_name" label="快递公司:">
              <div class="shop-val">{{order_detail.express_name}}</div>
            </el-form-item>
            <el-form-item v-if="order_detail.express_num" label="快递单号:">
              <div class="shop-val">{{order_detail.express_num}}</div>
            </el-form-item>
            <el-form-item label="买家姓名:">
              <div class="shop-val">{{order_detail.name}}</div>
            </el-form-item>
            <el-form-item label="买家电话:">
              <div class="shop-val">{{order_detail.mobile}}</div>
            </el-form-item>
            <el-form-item label="收货地址:">
              <div class="shop-val">{{order_detail.address}}</div>
            </el-form-item>
            <el-form-item v-if="order_detail.status=='已取消'" label="退款原因:">
              <div class="shop-val">{{order_detail.reason?order_detail.reason:'---'}}</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="title">商品信息</div>
      <div class="table-title">
        <div class="child-box" style="width: 300px;">商品信息</div>
        <div class="child-box" style="width: 150px;">商品单价</div>
        <div class="child-box" style="width: 150px;">数量</div>
        <div class="child-box flex">订单总额</div>
        <div v-if="order_detail.status=='已取消'" class="child-box flex">退款总额</div>
        <div class="child-box flex">买家姓名</div>
        <div class="child-box flex">买家电话</div>
        <div class="child-box flex">订单状态</div>
      </div>
      <div class="order-list-box">
        <div class="order-list-child" v-for="(item, index) in tableData">
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
              <p class="p1">{{'￥'+order_detail.amount}}</p>
            </div>
            <div v-if="order_detail.status=='已取消'" class="order-other-info">
              <p class="p1">{{'￥'+order_detail.amount}}</p>
            </div>
            <div class="order-other-info">
              <p class="p1">{{order_detail.name}}</p>
            </div>
            <div class="order-other-info">
              <p class="p1">{{order_detail.mobile}}</p>
            </div>
            <div class="order-other-info">
              <div v-if="order_detail.status !== '已取消'" >
                <p v-if="order_detail.status === '待发货'" class="p1" style="color: #e6a23c;">待发货</p>
                <p v-else-if="order_detail.status === '待收货'" class="p1" style="color: #409eff;">待收货</p>
                <p v-else-if="order_detail.status === '已完成'" class="p1" style="color: #ff0000;">已完成</p>
              </div>
              <div v-else>
                <p v-if="item.refund==1" class="p1" style="color: #FEA700;">申请中</p>
                <p v-else-if="item.refund==2" class="p1" style="color: #8FB739;">已退款</p>
                <p v-else-if="item.refund==3" class="p1" style="color: #ff0000;">申请被拒绝</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="order_detail.status=='已取消'&&order_detail.refund==1" class="refund-tip">
          <p>*同意申请后，退款金额将原路退回</p>
        </div>
        <div v-if="order_detail.status=='已取消'&&order_detail.refund==1" class="btn-box">
          <el-button type="success" size="small" @click="operation(0)">同意申请</el-button>
          <el-button type="info" size="small" @click="operation(1)">拒绝申请</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderDetail',
    data() {
      return {
        order_id: '',
        order_detail: {
          refund: 0,
          s_order_id: '-',
          amount: '-',
          name: '-',
          mobile: '-',
          address: '-',
          address_id: '',
          add_time: '-',
          status: '',
          express_name: '',
          express_num: '',
          reason: '',
        },
        tableData: [],
        currentPage: 1
      }
    },
    methods: {
      // 获取订单列表
      getOrderDetail(){
        this.$store.dispatch('GetShopOrderDetail', {
          token: true,
          s_order_id: this.order_id
        }).then((res) => {
          // this.isLoading = false;
          if(res.data.errcode==0){
            this.tableData = [res.data.data];
            this.order_detail.s_order_id = res.data.data.s_order_id;
            this.order_detail.refund = res.data.data.refund;
            this.order_detail.add_time = res.data.data.add_time;
            this.order_detail.status = res.data.data.status;
            this.order_detail.express_name = res.data.data.express_name;
            this.order_detail.express_num = res.data.data.express_num;
            this.order_detail.reason = res.data.data.reason;
            this.order_detail.amount = res.data.data.amount;
            this.order_detail.name = res.data.data.name;
            this.order_detail.mobile = res.data.data.mobile;
            this.order_detail.address = res.data.data.address.complete;
            this.order_detail.address_id = res.data.data.address_id;
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
      // 处理退款申请
      operation(type){
        let _this = this;
        let info = '';
        if(type==0){
          info = '确定同意客户的退款申请？';
        }else {
          info = '确定拒绝客户的退款申请？';
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
              instance.confirmButtonText = '处理中...';
              // 请求后台同意/拒绝退款
              _this.$store.dispatch('EditRefund', {
                token: true,
                type: type==0?1:2,
                s_order_id: _this.order_id
              }).then((res) => {
                instance.confirmButtonLoading = false;
                done();
                if(res.data.errcode==0){
                  if(type==0){
                    _this.$message({
                      message: '退款成功！',
                      type: 'success',
                      duration: 1000
                    });
                  }else if(type==1) {
                    _this.$message({
                      message: '已拒绝申请！',
                      type: 'success',
                      duration: 1000
                    });
                  }
                  _this.getOrderDetail();
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
    },
    mounted(){
      if(this.$route.query.order_id){
        this.order_id = this.$route.query.order_id;
        this.getOrderDetail();
      }else {
        this.$message({
          message: '未找到订单id!',
          type: 'error',
          duration: 1000
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-form-item__label {
    font-size: 16px;
    font-weight: normal;
  }
  .order-detail-box {
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
      .subordinate-box {
        width: 100%;
        .el-form-item {
          margin-bottom: 0;
        }
        .subordinate-list-box {
          .shop-val {
            font-size: 16px;
          }
        }
        .submit-box {
          display: flex;
          justify-content: space-between;
          width: 240px;
          button {
            width: 100px;
          }
        }
      }
    }
    .bottom-content-box {
      background-color: #fff;
      border-radius: 5px;
      padding: 30px;
      .title {
        padding: 0;
        font-size: 20px;
        line-height: 20px;
        color: #333333;
        margin-bottom: 30px;
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
          background-color: #909399;
          .order-info-box {
            margin-right: 20px;
            font-size: 14px;
            color: #ffffff;
            line-height: 14px;
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

      .table-box {
        padding: 30px 30px 0 30px;
        min-height: 400px;
        .pro-box {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100px;
            height: 50px;
            margin-right: 8px;
          }
        }
        .group-box {
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            width: 30px;
            /*text-align: center;*/
            background-color: #FF7800;
            color: #ffffff;
            font-size: 10px;
            line-height: 14px;
            border-radius: 3px;
          }
          p.collect {
            background-color: #409EFF;
          }
        }
      }
      .refund-tip {
        padding: 10px 0;
        margin-bottom: 100px;
        p {
          font-size: 14px;
          color: #FF4444;
        }
      }
      .btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          font-size: 15px;
          margin: 0 20px;
        }
      }
    }
  }
</style>
