<template >
  <div class="appointment-record-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">预约记录</p>
        </div>
      </div>
      <!-- 筛选 -->
      <div class="screen-box">
        <div class="line-screen-box">
          <div class="title">预约姓名</div>
          <div class="name-input name-input-margin">
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
          <div class="title">预约日期</div>
          <div class="name-input">
            <el-date-picker
              type="date"
              size="small"
              placeholder="选择日期"
              v-model="start_date"
              @change="startDateChange">
            </el-date-picker>
          </div>
          <div class="row-line">至</div>
          <div class="name-input name-input-margin">
            <el-date-picker
              type="date"
              size="small"
              placeholder="选择日期"
              v-model="end_date"
              @change="endDateChange">
            </el-date-picker>
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
          <el-tab-pane label="未到店" name="1"></el-tab-pane>
          <el-tab-pane label="已到店" name="2"></el-tab-pane>
          <el-tab-pane label="已超时" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          style="width: 100%">
          <el-table-column label="预约姓名">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约电话">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约日期">
            <template slot-scope="scope">
              <span>{{scope.row.booking_day}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约时间">
            <template slot-scope="scope">
              <span>{{scope.row.booking_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目信息" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.goods_name" class="pro-box">
                <img :src="scope.row.goods_image" alt="" />
                <div class="pro-item">
                  <p>{{scope.row.goods_name}}</p>
                </div>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.notes?scope.row.notes:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span style="color: #FEA700;" v-if="scope.row.state==1">未到店</span>
              <span style="color: #777777;" v-if="scope.row.state==2">已到店</span>
              <span style="color: #ff0000 ;" v-if="scope.row.state==3">已超时</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span v-if="scope.row.state==1" style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">编辑</span>
              <span v-else style="color: #CCCCCC;margin: 0 5px;">编辑</span>
              <span v-if="scope.row.state==1" style="color: #008FFE;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">到店</span>
              <span v-else style="color: #CCCCCC;margin: 0 5px;">到店</span>
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
    <el-dialog title="编辑" :visible.sync="dialogSwiperVisible" width="600px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="预约姓名:">
              <div class="shop-val">{{form.name}}</div>
            </el-form-item>
            <el-form-item label="预约电话:">
              <div class="shop-val">{{form.mobile}}</div>
            </el-form-item>
            <el-form-item label="预约日期:">
              <el-date-picker
                type="date"
                size="mini"
                placeholder="选择日期"
                v-model="form.date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预约时间:">
              <el-time-picker
                size="mini"
                v-model="form.time"
                placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
            <el-form-item v-if="form.banner" label="项目信息:">
              <div class="pro-info">
                <el-select v-if="form.isEdit" size="mini" v-model="form.region" placeholder="请选择项目类别" @change="selectChange">
                  <el-option v-for="(item, index) in form.childArr" :key="index" :label="item.class_name" :value="item.class_id">{{item.class_name}}</el-option>
                </el-select>
                <span v-if="!form.isEdit" style="color: #008FFE;cursor: pointer;" @click="changeShopPro(0)">修改</span>
                <span v-if="form.isEdit" style="margin: 0 5px;color: #8b8b8b;cursor: pointer;" @click="changeShopPro(1)">取消</span>
                <span v-if="form.isEdit" style="color: #008FFE;cursor: pointer;" @click="changeShopPro(2)">保存</span>
                <!-- 当前项目 -->
                <div class="now-shop-box">
                  <img :src="form.banner" alt="">
                  <p>{{form.goods_name}}</p>
                </div>
                <div v-if="form.isEdit" class="classfify-shop-list">
                  <el-scrollbar style="height:100%;">
                    <div v-for="(item, index) in shopLists" class="shop-list-item" @click="chooseShop(index)">
                      <img :src="item.banner[0]" alt="">
                      <p>{{item.goods_name}}</p>
                      <el-radio v-model="form.radio" :label="item.goods_id" style="margin: 0 10px;">{{''}}</el-radio>
                    </div>
                    <div v-if="shopLists.length==0" class="null-box">
                      <img src="@@/images/null.png" alt="" />
                      <p>暂无数据</p>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </el-form-item>
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
  export default {
    name: 'appointmentRecord',
    data() {
      return {
        name: '',
        mobile: '',
        start_date: '',
        end_date: '',
        isLoading: false,
        activeTab: 0,
        form: {
          name: '',
          mobile: '',
          region: '',
          childArr: [],
          banner: '',
          goods_name: '',
          goods_id: '',
          booking_id: '',
          date: '',
          time: '',
          isEdit: false,
          radio: ''
        },
        tableData: [],
        shopLists: [],
        dialogSwiperVisible: false,
        iScreen: false,
        currentPage: 1,
        total: 4
      }
    },
    methods: {
      // 获取预约记录列表
      getMessageList(){
        let data = {
          token: true,
          type: this.activeTab,
          page: this.currentPage
        };

        if(this.iScreen){
          if(this.name){
            data.search_name = this.name;
          }
          if(this.mobile){
            data.mobile = this.mobile;
          }
          if(this.start_date&&this.end_date){
            data.start_time = this.start_date.getTime()/1000;
            data.end_time = this.end_date.getTime()/1000;
          }
        }

        this.$store.dispatch('GetAppointmentList', data).then((res) => {
          if(res.data.errcode==0){
            // console.log(res.data);
            for(let i=0;i<res.data.data.data.length;i++){
              if(res.data.data.data[i].goods_name){
                res.data.data.data[i].goods_image = res.data.data.data[i].banner[0];
              }else {
                res.data.data.data[i].goods_image = '';
              }
            }
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          }else if(res.data.errcode==9003){
            this.tableData = [];
            this.total = 0;
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
      },
      // 获取所有的子分类
      getChildClassfifyList(){
        this.$store.dispatch('GetClassfifyListNoPage', {
          token: true
        }).then((res) => {
          if(res.data.errcode==0){
            this.form.childArr = res.data.data;
            // this.total = res.data.data.total;
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
      },
      // 获取某个子类下的商品
      getChildClassfifyShop(class_id){
        this.$store.dispatch('GetAllGoodsList', {
          token: true,
          class_id: class_id
        }).then((res) => {
          if(res.data.errcode==0){
            this.shopLists = res.data.data;
          }else if(res.data.errcode==9003){
            this.shopLists = [];
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
      },
      // select的change事件
      selectChange(e){
        this.form.radio = '';
        this.getChildClassfifyShop(e);
      },
      // 选择商品事件
      chooseShop(index){
        this.form.radio = this.shopLists[index].goods_id;
      },
      // 预约状态的change事件
      msgChange(e){
        console.log(e)
      },
      // 开始日期change事件
      startDateChange(e){
        console.log(e.getFullYear()+ ',' +(e.getMonth()+1)+ ',' +e.getDate())
      },
      // 结束日期change事件
      endDateChange(e){
        console.log(e.getFullYear()+ ',' +(e.getMonth()+1)+ ',' +e.getDate())
      },
      // 筛选事件
      startScreen(){
        if(this.name || this.mobile || this.start_date || this.end_date){
          if(this.start_date || this.end_date){
            if(!(this.start_date && this.end_date)){
              this.$message({
                message: '筛选开始日期和结束日期必须同时存在！',
                type: 'error',
                duration: 1000
              });
              return false;
            }else {
              this.iScreen = true;
              this.currentPage = 1;
              this.total = 0;
              this.tableData = [];
              this.getMessageList();
            }
          }else {
            this.iScreen = true;
            this.currentPage = 1;
            this.total = 0;
            this.tableData = [];
            this.getMessageList();
          }
        }else {
          this.$message({
            message: '请输入需要筛选的条件！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 重置事件
      resetFunc(){
        this.name = '';
        this.mobile = '';
        this.start_date = '';
        this.end_date = '';
        this.iScreen = false;
        this.tableData = [];
        this.currentPage = 1;
        this.getMessageList();
      },
      // tabs的change事件
      handleClick(e){
        this.currentPage = 1;
        this.total = 0;
        this.tableData = [];
        this.getMessageList();
      },
      // 单条消息的编辑、到店确认
      operation(type, index){
        let _this = this;
        if(type==0){
          this.dialogSwiperVisible = true;
          let formDate = this.tableData[index].booking_day.split('-');
          let formTime = this.tableData[index].booking_time.split(':');
          this.form.date = new Date(formDate[0], formDate[1]-1, formDate[2]);
          this.form.time = new Date(formDate[0], formDate[1]-1, formDate[2], formTime[0], formTime[1], formTime[2]);
          this.form.name = this.tableData[index].name;
          this.form.mobile = this.tableData[index].mobile;
          this.form.banner = this.tableData[index].goods_image;
          this.form.goods_name = this.tableData[index].goods_name;
          this.form.booking_id = this.tableData[index].booking_id;
          this.form.goods_id = this.tableData[index].goods_id;
        }else if(type==1){
          this.$msgbox({
            title: '温馨提示',
            message: '确定客户已到店？',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            lockScroll: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '确认中...';
                // setTimeout(()=>{
                //   instance.confirmButtonLoading = false;
                //   done();
                // }, 2000);
                // 请求后台确认用户到店
                console.log(_this.tableData[index].booking_id);
                _this.$store.dispatch('SetArrival', {
                  token: true,
                  booking_id: _this.tableData[index].booking_id
                }).then((res) => {
                  instance.confirmButtonLoading = false;
                  done();
                  if(res.data.errcode==0){
                    _this.getMessageList();
                    _this.$message({
                      message: '确认到店成功！',
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
      // 修改项目
      changeShopPro(type){
        if(type==0){ // 修改
          this.form.region = '';
          this.form.radio = '';
          this.shopLists = [];
          this.form.isEdit = true;
        }else if(type==2){ // 保存
          if(this.form.radio){
            console.log(this.shopLists);
            for(let i=0;i<this.shopLists.length;i++){
              if(this.shopLists[i].goods_id == this.form.radio){
                this.form.banner = this.shopLists[i].banner[0];
                this.form.goods_name = this.shopLists[i].goods_name;
                this.form.goods_id = this.shopLists[i].goods_id;
                break;
              }
            }
            this.form.isEdit = false;
          }else {
            this.$message({
              message: '请选择需要保存的项目！',
              type: 'error',
              duration: 1000
            });
          }
          // this.form.isEdit = false;
        }else { // 取消
          this.form.isEdit = false;
        }
      },
      // 保存
      save(){
        if(!this.form.isEdit){
          if(this.form.date && this.form.time){
            let dateY = this.form.date.getFullYear();
            let dateM = this.form.date.getMonth();
            let dateD = this.form.date.getDate();
            let dateH = this.form.time.getHours();
            let dateMin = this.form.time.getMinutes();
            let dateSencod = this.form.time.getSeconds();
            let timeStamp = new Date(dateY, dateM, dateD, dateH, dateMin, dateSencod).getTime()/1000;
            // console.log('预约姓名：'+this.form.name);
            // console.log('预约电话：'+this.form.mobile);
            // console.log('预约时间的时间戳（秒）：'+timeStamp);
            // console.log('预约项目的booking_id：'+this.form.booking_id);
            // console.log('预约项目的goods_id：'+this.form.goods_id);
            let data = {
              token: true,
              booking_id: this.form.booking_id,
              booking_time: timeStamp,
            };
            if(this.form.goods_id){
              data.goods_id = this.form.goods_id;
            }
            console.log(data);
            this.$store.dispatch('EditAppointment', data).then((res) => {
              if(res.data.errcode==0){
                this.getMessageList();
                this.dialogSwiperVisible = false;
                this.$message({
                  message: '编辑成功！',
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
          }else if(!this.form.date){
            this.$message({
              message: '请选择预约日期！',
              type: 'error',
              duration: 1000
            });
          }else if(!this.form.time){
            this.$message({
              message: '请选择预约时间！',
              type: 'error',
              duration: 1000
            });
          }
        }else {
          this.$message({
            message: '请先保存项目编辑！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 取消
      cancle(){
        this.dialogSwiperVisible = false;
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        this.currentPage = e;
        this.getMessageList();
      }
    },
    mounted(){
      this.getMessageList();
      this.getChildClassfifyList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 隐藏el-scrollbar的横向滚动条 */
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-form-item__label {
    font-size: 16px;
    font-weight: normal;
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
  .appointment-record-box {
    .el-date-editor .el-range-separator {
      width: 30px;
    }
    .el-date-editor--timerange.el-input__inner {
      width: 220px;
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
      .el-date-editor.el-input {
        width: 100%;
      }
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
        .pro-box {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100px;
            height: 50px;
            margin-right: 5px;
          }
          .pro-item {
            width: 120px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            p {
              text-align: left;
              /*font-size: 15px;*/
            }
          }
        }
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
      .el-form-item {
        margin-bottom: 0;
      }
      .subordinate-list-box {
        /*height: 300px;*/
        .shop-val {
          font-size: 16px;
        }
        .now-shop-box, .shop-list-item {
          display: flex;
          /*justify-content: center;*/
          align-items: center;
          cursor: pointer;
          img {
            flex-shrink: 0;
            width: 100px;
            height: 50px;
            margin-right: 5px;
          }
          p {
            width: 230px;
            line-height: normal;
            font-size: 14px;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .shop-list-item {
          padding: 10px 0;
          /*border-top: 1px solid #CCCCCC;*/
          p {
            width: 200px;
          }
        }
        .null-box {
          padding-top: 20px;
          text-align: center;
          img {
            width: 70px;
          }
          p {
            font-size: 14px;
            line-height: 20px;
            color: #cccccc;
          }
        }
        .classfify-shop-list {
          width: 325px;
          padding: 5px 0;
          height: 150px;
          /*border-top: 1px solid #CCCCCC;*/
          /*border-bottom: 1px solid #CCCCCC;*/
          .shop-list-item {
            line-height: normal;
          }
        }
        .submit-box {
          display: flex;
          justify-content: space-between;
          width: 220px;

          button {
            width: 100px;
          }
        }
      }
      .submit-box {
        display: flex;
        justify-content: space-between;
        width: 240px;
        padding-top: 30px;
        button {
          width: 100px;
          padding: 8px 15px;
        }
      }
    }
  }
</style>
