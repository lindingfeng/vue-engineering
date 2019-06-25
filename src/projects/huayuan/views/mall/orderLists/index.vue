<template >
  <div class="mall-order-lists-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">订单列表</p>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-box">
        <div class="line-screen-box">
          <div class="title">买家姓名</div>
          <div class="select-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入买家姓名"
              v-model="name">
            </el-input>
          </div>
          <div class="title">买家电话</div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入买家电话"
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
          <el-tab-pane label="待发货" name="1"></el-tab-pane>
          <el-tab-pane label="待收货" name="2"></el-tab-pane>
          <el-tab-pane label="已完成" name="3"></el-tab-pane>
          <el-tab-pane label="已取消" name="4"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-title-box">
        <div class="table-title">
          <div class="child-box" style="width: 300px;">商品信息</div>
          <div class="child-box" style="width: 150px;">商品单价</div>
          <div class="child-box" style="width: 150px;">数量</div>
          <div class="child-box flex">订单总额</div>
          <div class="child-box flex">买家姓名</div>
          <div class="child-box flex">买家电话</div>
          <!--<div class="child-box flex">订单备注</div>-->
          <div class="child-box flex">订单状态</div>
          <div class="child-box flex">操作</div>
        </div>

        <div class="order-list-box">
          <div class="order-list-child" v-for="(item, index) in tableData">
            <div class="order-title">
              <div class="order-info-box" style="min-width: 345px;">{{'订单编号：'+item.s_order_id}}</div>
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
                <p v-if="item.status == '待发货'" class="p1" style="color: #e6a23c;">待发货</p>
                <p v-else-if="item.status == '待收货'" class="p1" style="color: #409eff;">待收货</p>
                <p v-else-if="item.status == '已完成'" class="p1" style="color: #ff0000;">已完成</p>
                <p v-else-if="item.status == '已取消'" class="p1" style="color: #666666;">已取消</p>
              </div>
              <div class="order-other-info">
                <p class="p1">
                  <span style="margin: 0 5px;cursor: pointer;color: #008FFE;" @click="operation(0, index)">详情</span>
                  <span v-if="item.status==='待发货'" style="margin: 0 5px;cursor: pointer;color: #08B300;" @click="operation(1, index)">发货</span>
                  <!--<span v-else-if="item.status==='待收货'" style="margin: 0 5px;cursor: pointer;color: #08B300;" @click="operation(1, index)">编辑</span>-->
                </p>
              </div>
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
    <el-dialog title="快递信息" :visible.sync="dialogExpressVisible" width="500px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="配送方式">
              <div style="font-size: 16px;">快递</div>
            </el-form-item>
            <el-form-item label="快递公司" prop="expres" :rules="{required: true, message: '快递公司不能为空', trigger: 'blur'}">
              <el-select size="mini" v-model="form.expres" placeholder="请选择快递公司">
                <el-option v-for="(item, index) in expressList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="快递单号" prop="expres_id" :rules="{required: true, message: '快递单号不能为空', trigger: 'blur'}">
              <el-input size="mini" v-model="form.expres_id" style="width: 240px;" placeholder="输入快递单号" @blur="expresBlur(1)"></el-input>
            </el-form-item>
            <!--<el-form-item label="订单备注">-->
              <!--<el-input type="textarea" :rows="4" maxlength="50" v-model="form.describe" style="width: 240px;" placeholder="输入备注，最多28个字符..." @blur="expresBlur(2)"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item style="margin-bottom: 0">
              <div class="submit-box">
                <el-button type="primary" :loading="isLoading" @click="save">保 存</el-button>
                <el-button type="info" @click="cancle">取 消</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { scrollTo } from '@@/utils/scrollTo'
  export default {
    name: 'orderLists',
    data() {
      return {
        order_id: '',
        name: '',
        mobile: '',
        activeTab: '0',
        iScreen: false,
        tableData: [],
        expressList: [],
        userAddress: {
          name: '-',
          mobile: '-',
          address: '-'
        },
        dialogExpressVisible: false,
        form: {
          expres: '',
          expres_id: '',
          describe: ''
        },
        isLoading: false,
        currentPage: 1,
        total: 0
      }
    },
    watch: {
      dialogExpressVisible(val){
        if(!val){
          this.order_id = '';
          this.$refs.form.resetFields();
        }
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
        this.$store.dispatch('GetShopOrderList', data).then((res) => {
          // this.isLoading = false;
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
      // tabs的change事件
      handleClick(e){
        this.currentPage = 1;
        this.total = 0;
        this.tableData = [];
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
      // 获取快递公司列表
      getLogistics(){
        this.$store.dispatch('GetLogistics', {
          token: true
        }).then((res) => {
          if(res.data.errcode==0){
            this.expressList = res.data.data;
          }else if(res.data.errcode==9003){
            this.expressList = [];
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
      // 单条消息的编辑、到店确认
      operation(type, index){
        let _this = this;
        if(type==0){  // 详情
          this.$router.push({path: '/mall/detail', query: { order_id: this.tableData[index].s_order_id }});
        }else if(type==1){  // 发货
          this.order_id = this.tableData[index].s_order_id;
          this.getLogistics();
          this.dialogExpressVisible = true;
        }
      },
      // 防止用户只输入空格
      expresBlur(type){
        if(type==1){
          if(this.form.expres_id){
            this.form.expres_id = this.form.expres_id.replace(/(^\s*)|(\s*$)/g,"");
          }
        }else if(type==2){
          if(this.form.describe){
            this.form.describe = this.form.describe.replace(/(^\s*)|(\s*$)/g,"");
          }
        }
      },
      // 取消添加/编辑
      cancle(){
        this.dialogExpressVisible = false;
      },
      // 保存添加/编辑
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$store.dispatch('SetCourierInfo', {
              token: true,
              s_order_id: this.order_id,
              express_name: this.form.expres,
              express_num: this.form.expres_id
            }).then((res) => {
              this.isLoading = false;
              if(res.data.errcode==0){
                this.dialogExpressVisible = false;
                this.$message({
                  message: '发货成功！',
                  type: 'success',
                  duration: 1000
                });
                setTimeout(()=>{
                  this.getOrderList();
                }, 500)
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
          }
        })
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
  .el-form-item__label {
    font-size: 16px;
    font-weight: normal;
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
      .null-box {
        padding-top: 20px;
        height: 100px;
        text-align: center;
        font-size: 16px;
        color: #666;
      }
      .tabs-box {
        padding: 20px 30px 0 30px;
      }

      .table-title-box {
        min-width: 1000px;
        padding: 30px;
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
      }

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
        /*.batch-operation {*/
          /*display: flex;*/
          /*align-items: center;*/
        /*}*/
      }
    }
    .subordinate-box {
      width: 100%;
      /*height: 300px;*/
      /*background-color: #ff0000;*/
      .subordinate-list-box {
        /*height: 1000px;*/
      }
      textarea {
        resize: none !important;
      }
      .submit-box {
        display: flex;
        justify-content: space-between;
        width: 240px;
        button {
          width: 100px;
          padding: 8px 15px;
        }
      }
    }
  }
</style>
