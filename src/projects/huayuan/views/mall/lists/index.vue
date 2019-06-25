<template >
  <div class="shop-list-mall-box" style="padding:20px;">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">商品列表</p>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addClassfifyShop">添加商品</el-button>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-box">
        <div class="line-screen-box">
          <div class="title">商品名称</div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入内容"
              v-model="name">
            </el-input>
          </div>
          <!--<div class="title">商品类别</div>-->
          <!--<div class="select-input name-input-margin">-->
            <!--<el-select size="small" v-model="type" placeholder="请选择商品类别">-->
              <!--<el-option v-for="(item, index) in options" :key="index" :label="item.class_name" :value="item.class_id">{{item.class_name}}</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
          <div class="title">商品价格</div>
          <div class="name-input">
            <el-input
              size="small"
              placeholder="请输入起始价格"
              v-model="start_price"
              @keyup.native="priceKeyup(0, $event)"
              @blur="priceBlur(0)">
              <template slot="prepend" class="lindf" style="padding: 0 12px;">￥</template>
            </el-input>
          </div>
          <div class="row-line">
            <i class="el-icon-minus"></i>
          </div>
          <div class="name-input name-input-margin">
            <el-input
              size="small"
              placeholder="请输入最大价格"
              v-model="end_price"
              @keyup.native="priceKeyup(1, $event)"
              @blur="priceBlur(1)">
              <template slot="prepend">￥</template>
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
          <el-tab-pane label="上架" name="1"></el-tab-pane>
          <el-tab-pane label="下架" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          empty-text="暂无商品"
          style="width: 100%"
          @select="checkBoxChange"
          @select-all="allCheckBoxChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span>{{scope.row.goods_name}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="商品类别">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.class_name}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="商品banner">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.banner[0]" alt="" @click="showSwiper('banner', scope.$index)">
            </template>
          </el-table-column>
          <el-table-column label="商品价格">
            <template slot-scope="scope">
              <p style="font-size: 14px;line-height: 18px;color: #CCCCCC;text-decoration:line-through">{{'￥'+scope.row.original_price}}</p>
              <p style="font-size: 14px;line-height: 18px;color: #FF8400;">{{'￥'+scope.row.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="销量" width="160">
            <template slot-scope="scope">
              <div v-if="isEdit==scope.$index" class="Sales">
                <el-input v-model="scope.row.sales" type="number" min="0" max="99999999" placeholder="销量"></el-input>
                <span class="save" @click="saleSave(scope.row.sales, scope.$index, scope.row.goods_id)">保存</span>
              </div>
              <div v-else class="Sales">
                <span>{{scope.row.sales}}</span>
                <span class="edit" @click="salesEdit(scope.$index)">编辑</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品简介">
            <template slot-scope="scope">
              <span>{{scope.row.brief}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品详情">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.details[0]" alt="" @click="showSwiper('detail', scope.$index)">
            </template>
          </el-table-column>
          <el-table-column label="商品状态">
            <template slot-scope="scope">
              <span>{{scope.row.status==1?'上架':'下架'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.add_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span v-if="scope.row.status==2" style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">编辑</span>
              <span v-if="scope.row.status==2" style="color: #FF0000;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">删除</span>
              <span v-if="scope.row.status==1" style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(2, scope.$index)">下架</span>
              <span v-if="scope.row.status==2" style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(3, scope.$index)">上架</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="total>0" class="pagination-box">
        <div class="batch-operation">
          <el-button v-if="activeTab==2&&this.tableData.length>0" type="success" size="small" @click="operationBatch(0)">批量上架</el-button>
          <el-button v-if="activeTab==1&&this.tableData.length>0" type="warning" size="small" @click="operationBatch(1)">批量下架</el-button>
          <el-button v-if="activeTab==2&&this.tableData.length>0" type="danger" size="small" @click="operationBatch(2)">批量删除</el-button>
        </div>
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
    <el-dialog title="商品详情" :visible.sync="dialogSwiperVisible" width="600px" top="20vh">
      <el-carousel trigger="click" :autoplay="false" :loop="false" height="250px">
        <el-carousel-item v-for="item in swiperArr" :key="item">
          <img style="width: 100%;" :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'mallist',
    data(){
      return {
        // shopType: '',
        search_word: '',
        name: '',
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
        iScreen: false,
        isEdit: -1
      }
    },
    methods: {
      // 商品列表
      getShopList(tip){
        let data = {
          token: true,
          page: this.currentPage,
          type: this.activeTab
        }

        if(this.iScreen){  // 如果点击了筛选按钮

          if(this.name){
            data.search_name = this.name;
          }

          // if(this.type){
          //   data.class_id = this.type;
          // }

          if(this.start_price){
            data.start_price = this.start_price;
          }

          if(this.end_price){
            data.end_price = this.end_price;
          }

        }

        if(tip){
          data.page = 1;
        }

        this.$store.dispatch('GetShopMallList', data).then((res) => {
          // console.log(res);
          this.isLoading = false;
          if(res.data.errcode==0){
            this.tableData = res.data.data.data;
            for(let i=0;i<this.tableData.length;i++){
              if(!this.tableData[i].banner){
                this.tableData[i].banner = [];
              }
              if(!this.tableData[i].details){
                this.tableData[i].details = [];
              }
              if(this.tableData[i].goods_specs){
                this.tableData[i].goods_specs = this.tableData[i].goods_specs.join(',')
              }
            }
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
      // 编辑销量
      salesEdit(index){
        // console.log(index)
        this.isEdit = index;
      },
      // 保存销量
      saleSave(val, index, goods_id){
        let reg = /^[0-9]{1,8}$/;
        if(reg.test(val)){
          this.$store.dispatch('EditShopMallSales', {
            token: true,
            goods_id: goods_id,
            sales: val
          }).then((res) => {
            if(res.data.errcode==0){
              this.isEdit = -1;
              this.$message({
                message: '保存成功！',
                type: 'success',
                duration: 1000
              });
            }else {
              this.$message({
                message: res.data.errstr+'（'+res.data.errcode+'）',
                type: 'error',
                duration: 1000
              });
            }
          }).catch((err) => {
            console.log(err)
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
        }else {
          this.$message({
            message: '请输入正确的销量！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 只让数字和.可以输入
      priceKeyup(index, e){
        if(index==0){
          this.start_price = e.target.value.replace(/[^\d.]/g, "");
        }else {
          this.end_price = e.target.value.replace(/[^\d.]/g, "");
        }
      },
      // 验证价格是否符合价格格式
      priceBlur(index){
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.start_price);
        if(reg){
          // console.log(this.start_price);
        }else {
          if(index==0){
            this.start_price = '';
          }else {
            this.end_price = '';
          }
        }

      },
      // 开始筛选
      startScreen(){
        if(this.start_price || this.end_price){
          if(this.start_price && this.end_price){
            if(Number(this.start_price) < Number(this.end_price)){
              this.isLoading = true;
              this.iScreen = true;
              this.currentPage = 1;
              this.total = 0;
              this.tableData = [];
              this.getShopList(true);
            }else {
              this.$message({
                message: '开始价格不能大于结束价格！',
                type: 'error',
                duration: 1000
              });
            }
          }else {
            this.$message({
              message: '开始价格和结束价格必须同时输入！',
              type: 'error',
              duration: 1000
            });
            this.isLoading = false;
            return false;
          }
        }else if(this.name || this.type) {
          this.isLoading = true;
          this.iScreen = true;
          this.currentPage = 1;
          this.total = 0;
          this.tableData = [];
          this.getShopList(true);
        }else {
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
        this.type = '';
        this.start_price = '';
        this.end_price = '';
        this.tableData = [];
        this.currentPage = 1;
        this.total = 0;
        this.iScreen = false;
        this.getShopList(true);
      },
      // 前往添加商品页面
      addClassfifyShop(){
        this.$router.push({path: '/mall/addEdit'});
      },
      // 显示商品详情轮播图
      showSwiper(type, index){
        if(type=='banner'){
          this.swiperArr = this.tableData[index].banner;
        }else if(type=='detail'){
          this.swiperArr = this.tableData[index].details;
        }
        this.dialogSwiperVisible = true;
      },
      // 切换tabs
      handleClick(){
        this.tableData = [];
        this.hasChoose = [];
        this.currentPage = 1;
        this.total = 0;
        // 请求接口
        this.getShopList(true);
      },
      // 排序请求
      sortChange(e){
        // console.log(e.column)
        // 请求后台排序接口
        if(e.order == 'ascending' || e.order == 'descending'){ // 升序
          // 再判断是哪个字段的升序
          if(e.column.label=='商品价格'){

          }else if(e.column.label=='拼团价格'){

          }else if(e.column.label=='创建时间'){

          }
        }else { // 默认排序

        }
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
      // 单条记录的编辑、删除、下架、上架
      operation(type, index, id){
        let _this = this;
        if(type==0){ // 编辑
          this.$router.push({path: '/mall/addEdit', query: { goods_id: this.tableData[index].goods_id }});
        }else if(type==1){ // 删除
          let goods_id = '';
          let info = '';
          if(id){
            goods_id = id;
            info = '确定要删除选中的商品吗？';
          }else {
            goods_id = this.tableData[index].goods_id;
            info = '确定要删除该商品吗？';
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
                instance.confirmButtonText = '删除中...';
                // 请求后台删除该条分类
                _this.$store.dispatch('DelMallShop', {
                  token: true,
                  goods_id: goods_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getShopList();
                    _this.$message({
                      message: '删除成功！',
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

        }else if(type==2 || type==3){ // 上架
          let info = type==3?'上架':'下架'
          this.$msgbox({
            title: '温馨提示',
            message: '确定要'+ info +'该商品吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            lockScroll: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = type==3?'上架中...':'下架中...';
                // 请求后台删除该条分类
                _this.$store.dispatch('UpDownMallShop', {
                  token: true,
                  type: type==3?1:2,
                  goods_id: _this.tableData[index].goods_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getShopList();
                    if(type==3){
                      _this.$message({
                        message: '上架成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }else {
                      _this.$message({
                        message: '下架成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }
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
        }else if(type==4) { // 批量上下架
          let info = index==0?'上架':'下架';
          this.$msgbox({
            title: '温馨提示',
            message: '确定要'+ info +'所选商品吗？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            lockScroll: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = index==0?'上架中...':'下架中...';
                // 请求后台删除该条分类
                _this.$store.dispatch('ShopUpDowm', {
                  token: true,
                  type: index==0?1:2,
                  goods_id: id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getShopList();
                    if(index==0){
                      _this.$message({
                        message: '上架成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }else {
                      _this.$message({
                        message: '下架成功！',
                        type: 'success',
                        duration: 1000
                      });
                    }
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
      // 批量上架、下架、删除
      operationBatch(index){
        let info = '';
        let goods_id=[];
        if(this.hasChoose.length>0){
          for(let i=0;i<this.hasChoose.length;i++){
            goods_id.push(this.hasChoose[i].goods_id);
          }
          goods_id = goods_id.join(',');
          if(index==0){  // 批量上架
            this.operation(4, 0, goods_id);
          }else if(index==1){  // 批量下架
            this.operation(4, 1, goods_id);
          }else if(index==2){  // 批量删除
            this.operation(1, 0, goods_id);
          }
        }else {
          if(index==0){  // 批量上架
            info = '请选择需要上架的商品！';
          }else if(index==1){  // 批量下架
            info = '请选择需要下架的商品！';
          }else if(index==2){  // 批量删除
            info = '请选择需要删除的商品！';
          }
          this.$message({
            message: info,
            type: 'error',
            duration: 1000
          });
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
  .shop-list-mall-box {
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
          color: #fff !important;
          background-color: #8FB739 !important;
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
        min-height: 300px;
        .Sales {
          display: flex;
          justify-content: center;
          align-items: center;
          .el-input {
            width: 70px;
          }
          .el-input__inner {
            width: 100%;
            text-align: center;
            height: 30px;
            padding: 0 3px;
            line-height: 30px;
          }
          span {
            flex-shrink: 0;
            margin-left: 5px;
            cursor: pointer;
          }
          .edit {
            color: rgb(8, 179, 0);
          }
          .save {
            color: rgb(0, 143, 254);
          }
        }
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
