<template >
  <div class="member-consumption-box" style="padding: 20px;">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">会员消费记录</p>
        </div>
      </div>
    </div>
    <div class="bottom-content-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无数据"
          style="width: 100%">
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.resource" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="昵称">
            <template slot-scope="scope">
              <span>{{scope.row.url?scope.row.url:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="scope">
              <span>{{scope.row.sort}}</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额（元）">
            <template slot-scope="scope">
              <span>{{scope.row.state==1?'显示':'隐藏'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #008FFE;cursor: pointer;" @click="consumptionDetais(scope.$index)">消费明细</span>
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
    <el-dialog title="消费详情" :visible.sync="dialogSwiperVisible" width="600px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-scrollbar style="height:100%;">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="订单编号:">
                <div class="shop-val">68464643848348646</div>
              </el-form-item>
              <el-form-item label="商品banner:" style="margin-bottom: 5px;">
                <div class="spec-image-upload-box">
                  <div class="spec-image-box">
                    <!--<img :src="form.banner" alt="">-->
                    <img src="http://img.fentu.group/min-hotel1543549145g5crcni2.png" alt="">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="商品名称:">
                <div class="shop-val">胖子瘦身粉</div>
              </el-form-item>
              <el-form-item label="商品价格:">
                <div class="shop-val">￥50000</div>
              </el-form-item>
              <el-form-item label="手机号码:">
                <div class="shop-val">1808461629</div>
              </el-form-item>
              <el-form-item label="创建时间:">
                <div class="shop-val">2018-11-30 17:39</div>
              </el-form-item>
              <el-form-item label="商品名称:">
                <div class="shop-val">胖子瘦身粉</div>
              </el-form-item>
              <el-form-item label="商品价格:">
                <div class="shop-val">￥50000</div>
              </el-form-item>
              <el-form-item label="手机号码:">
                <div class="shop-val">1808461629</div>
              </el-form-item>
              <el-form-item label="创建时间:">
                <div class="shop-val">2018-11-30 17:39</div>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'memberConsumption',
    data(){
      return {
        type: 1,
        tableData: [],
        dialogSwiperVisible: false,
        currentPage: 1,
        total: 0,
        isLoading: false,
        iScreen: false,
        form: {
          banner: ''
        }
      }
    },
    methods: {
      // 会员消费记录列表
      getShopList(){
        this.$store.dispatch('GetBannerList', {
          token: true,
          page: this.currentPage
        }).then((res) => {
          console.log(res);
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
      // 查看消费明细
      consumptionDetais(index){
        this.dialogSwiperVisible = true;
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
  .member-consumption-box {
    /* 隐藏el-scrollbar的横向滚动条 */
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-form-item__label {
      font-size: 16px;
      font-weight: normal;
    }
    .top-content-box {
      padding: 30px;
      margin-bottom: 20px;
      background-color: #fff;
      border-radius: 5px;
      button {
        /*width: 100px;*/
        /*font-size: 14px;*/
        background-color: #8FB739;
        border-color: #8FB739;
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*margin-bottom: 20px;*/
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
    .spec-image-upload-box {
      padding-top: 10px;
      .spec-image-box {
        width: 120px;
        height: 80px;
        border: 1px solid #CCCCCC;
        img {
          width: 118px;
          height: 78px;
        }
      }
    }
    .subordinate-box {
      width: 100%;
      .el-form-item {
        margin-bottom: 0;
      }
      .subordinate-list-box {
        height: 300px;
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
</style>
