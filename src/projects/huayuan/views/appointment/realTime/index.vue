<template >
  <div class="member-consumption-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">消息栏通知</p>
        </div>
        <div class="right-text">
          <el-select size="small" v-model="type" placeholder="请选择消息类型" @change="msgChange">
            <el-option v-for="(item, index) in options" :key="index" :label="item.value" :value="item.state">{{item.value}}</el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="tabs-box">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="系统消息" name="1"></el-tab-pane>
          <el-tab-pane label="订单消息" name="2"></el-tab-pane>
          <el-tab-pane label="退款消息" name="3"></el-tab-pane>
          <el-tab-pane label="提现消息" name="4"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          style="width: 100%"
          @select="checkBoxChange"
          @select-all="allCheckBoxChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column label="消息类型">
            <template slot-scope="scope">
              <span>{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column label="消息内容">
            <template slot-scope="scope">
              <span>{{scope.row.message}}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">
              <span>{{scope.row.date}}</span>
            </template>
          </el-table-column>
          <el-table-column label="消息状态">
            <template slot-scope="scope">
              <span style="color: #008FFE;cursor: pointer;" v-if="scope.row.state==0" @click="readFunc(scope.$index)">未读</span>
              <span style="color: #777777;" v-if="scope.row.state==1">已读</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #FF0000;margin: 0 5px;cursor: pointer" @click="operation(scope.$index)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="total>0" class="pagination-box">
        <div class="batch-operation">
          <el-button type="primary" size="small" @click="readDeleteBatch(1)">批量已读</el-button>
          <el-button type="danger" size="small" @click="readDeleteBatch(2)">批量删除</el-button>
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
    name: 'memberConsumption',
    data() {
      return {
        type: '',
        options: [
          {
            state: '1',
            value: '未读'
          },
          {
            state: '2',
            value: '已读'
          }
        ],
        activeTab: 0,
        tableData: [
          {
            type: '系统消息',
            message: '系统来消息了，注意接收~',
            date: '2018-11-30 16:26',
            state: 0
          },
          {
            type: '订单消息',
            message: '订单来消息了，注意接收~',
            date: '2018-11-30 16:26',
            state: 1
          },
          {
            type: '退款消息',
            message: '退款来消息了，注意接收~',
            date: '2018-11-30 16:26',
            state: 0
          },
          {
            type: '提现消息',
            message: '提现来消息了，注意接收~',
            date: '2018-11-30 16:26',
            state: 1
          }
        ],
        hasChoose: [],
        currentPage: 1,
        total: 4
      }
    },
    methods: {
      // 获取消息列表
      getMessageList(){

      },
      // 消息类型的change事件
      msgChange(e){
        console.log(e)
      },
      // tabs的change事件
      handleClick(e){
        console.log(e)
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
      // 单条消息的已读
      readFunc(index){
        this.$msgbox({
          title: '温馨提示',
          message: '确定要将该条消息设为已读？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          lockScroll: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '加载中...';
              setTimeout(()=>{
                instance.confirmButtonLoading = false;
                done();
              }, 2000);
              // 请求后台已读该条消息
              // _this.$store.dispatch('DeleteShop', {
              //   token: true,
              //   goods_id: goods_id
              // }).then((res) => {
              //   instance.confirmButtonLoading = false;
              //   done();
              //   if(res.data.errcode==0){
              //     _this.getShopList();
              //     _this.$message({
              //       message: '删除成功！',
              //       type: 'success',
              //       duration: 1000
              //     });
              //   }else {
              //     _this.$message({
              //       message: res.data.errstr+'（'+res.data.errcode+'）',
              //       type: 'error',
              //       duration: 1000
              //     });
              //   }
              // }).catch((err) => {
              //   instance.confirmButtonLoading = false;
              //   done();
              //   if(err == 'token is overdue'){
              //     _this.$message({
              //       message: '登录已过期，请重新登录！',
              //       type: 'error',
              //       duration: 1000
              //     });
              //     setTimeout(()=>{
              //       _this.$store.dispatch('FedLogOut').then(() => {
              //         location.reload() // 为了重新实例化vue-router对象 避免bug
              //       })
              //     }, 1000)
              //   }else {
              //     _this.$message({
              //       message: '服务器开了会小差！',
              //       type: 'error',
              //       duration: 1000
              //     });
              //   }
              // })
            } else {
              done();
            }
          }
        })
      },
      // 单条消息的删除
      operation(index){
        this.$msgbox({
          title: '温馨提示',
          message: '确定要删除该条消息？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          lockScroll: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '加载中...';
              setTimeout(()=>{
                instance.confirmButtonLoading = false;
                done();
              }, 2000);
              // 请求后台已读该条消息
              // _this.$store.dispatch('DeleteShop', {
              //   token: true,
              //   goods_id: goods_id
              // }).then((res) => {
              //   instance.confirmButtonLoading = false;
              //   done();
              //   if(res.data.errcode==0){
              //     _this.getShopList();
              //     _this.$message({
              //       message: '删除成功！',
              //       type: 'success',
              //       duration: 1000
              //     });
              //   }else {
              //     _this.$message({
              //       message: res.data.errstr+'（'+res.data.errcode+'）',
              //       type: 'error',
              //       duration: 1000
              //     });
              //   }
              // }).catch((err) => {
              //   instance.confirmButtonLoading = false;
              //   done();
              //   if(err == 'token is overdue'){
              //     _this.$message({
              //       message: '登录已过期，请重新登录！',
              //       type: 'error',
              //       duration: 1000
              //     });
              //     setTimeout(()=>{
              //       _this.$store.dispatch('FedLogOut').then(() => {
              //         location.reload() // 为了重新实例化vue-router对象 避免bug
              //       })
              //     }, 1000)
              //   }else {
              //     _this.$message({
              //       message: '服务器开了会小差！',
              //       type: 'error',
              //       duration: 1000
              //     });
              //   }
              // })
            } else {
              done();
            }
          }
        })
      },
      // 批量已读/删除
      readDeleteBatch(type){
        if(this.hasChoose.length>0){
          if(type==1){ // 批量已读
            this.readFunc();
          }else { // 批量删除
            this.operation();
          }
        }else {
          if(type==1){ // 批量已读
            this.$message({
              message: '请选择需要批量已读的消息！',
              type: 'error',
              duration: 1000
            });
          }else { // 批量删除
            this.$message({
              message: '请选择需要批量删除的消息！',
              type: 'error',
              duration: 1000
            });
          }
        }
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        this.currentPage = e;
        this.getMessageList();
      }
    },
    mounted(){
      this.getMessageList()
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
  .member-consumption-box {
    .top-content-box {
      padding: 30px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 5px;
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
  }
</style>
