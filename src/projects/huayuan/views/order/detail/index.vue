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
            <el-form-item label="预约姓名:">
              <div class="shop-val">{{order_detail.real_name}}</div>
            </el-form-item>
            <el-form-item label="预约电话:">
              <div class="shop-val">{{order_detail.mobile}}</div>
            </el-form-item>
            <el-form-item label="预约时间:">
              <div class="shop-val">{{order_detail.add_time}}</div>
            </el-form-item>
            <el-form-item v-if="order_detail.status=='已取消'" label="退款原因:">
              <div class="shop-val">{{order_detail.reason?order_detail.reason:'---'}}</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="title">项目信息</div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          style="width: 100%">
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <span>{{scope.row.goods_name}}</span>
              <div v-if="scope.row.group_state==2" class="group-box">
                <p>拼团</p>
              </div>
              <div v-if="scope.row.group_state==3" class="group-box">
                <p class="collect">集赞</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目banner">
            <template slot-scope="scope">
              <div class="pro-box">
                <img :src="scope.row.banner[0]" alt="" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="实收款（元）">
            <template slot-scope="scope">
              <span style="color: #FEA700;">{{'￥'+scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="order_detail.status=='已取消'&&order_detail.refund!=0" label="退款金额（元）">
            <template slot-scope="scope">
              <span style="color: #FEA700;">{{'￥'+scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目简介">
            <template slot-scope="scope">
              <span>{{scope.row.brief}}</span>
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
              <div v-if="scope.row.status!='已取消'">
                <span v-if="scope.row.status=='待消费'" style="color: #FEA700;">{{scope.row.status}}</span>
                <span v-if="scope.row.status=='已完成'" style="color: #ff0000;">{{scope.row.status}}</span>
              </div>
              <div v-else>
                <span v-if="scope.row.status=='已取消'&&scope.row.refund==1" style="color: #FEA700;">申请中</span>
                <span v-if="scope.row.status=='已取消'&&scope.row.refund==2" style="color: #8FB739;">已退款</span>
                <span v-if="scope.row.status=='已取消'&&scope.row.refund==3" style="color: #ff0000;">申请被拒绝</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
          real_name: '---',
          mobile: '---',
          add_time: '---',
          reason: '---'
        },
        tableData: [],
        currentPage: 1
      }
    },
    methods: {
      // 获取订单列表
      getOrderDetail(){
        this.$store.dispatch('GetOrderDetail', {
          token: true,
          order_id: this.order_id
        }).then((res) => {
          // this.isLoading = false;
          if(res.data.errcode==0){
            this.tableData = [res.data.data];
            this.order_detail = res.data.data;
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
              _this.$store.dispatch('SetOrderState', {
                token: true,
                type: type==0?1:2,
                order_id: _this.order_id
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
      .title {
        padding: 30px 30px 0 30px;
        font-size: 20px;
        line-height: 20px;
        color: #333333;
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
        margin-bottom: 150px;
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
