<template>
  <div class="dashboard-container">
    <!-- 系统相关信息 -->
    <div class="system-info-box">
      <div class="system-left-info">
        <div class="top-box">
          <div class="left-content-box" @click="$router.push({ path: '/appointment/record' })">
            <div class="left-content-top">
              <div class="left-image">
                <img src="@@/images//today-num.png" alt="">
              </div>
              <div class="right-number">
                <p>今日预约数量</p>
                <h3>{{baseData.booking_day}}</h3>
              </div>
            </div>
            <div class="left-content-bottom">
              <h3 class="this-month">本月预约累计</h3>
              <p class="month-number">{{baseData.booking_mon}}</p>
            </div>
          </div>
          <div class="center-content-box" @click="$router.push({ path: '/order/lists' })">
            <div class="left-content-top">
              <div class="left-image">
                <img src="@@/images/add-order.png" alt="">
              </div>
              <div class="right-number">
                <p>今日项目订单</p>
                <h3>{{baseData.order_day}}</h3>
              </div>
            </div>
            <div class="left-content-bottom">
              <div class="new-order-bottom-left">
                <div class="left-title">日</div>
                <div class="ico-number">
                  <i v-if="baseData.order_day_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.order_day_add>=0?baseData.order_day_add:Math.abs(baseData.order_day_add)}}
                </div>
              </div>
              <div class="new-order-bottom-center"></div>
              <div class="new-order-bottom-left">
                <div class="left-title">月</div>
                <div class="ico-number">
                  <i v-if="baseData.order_mon_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.order_mon_add>=0?baseData.order_mon_add:Math.abs(baseData.order_mon_add)}}
                </div>
              </div>
            </div>
          </div>
          <div class="center-content-box" @click="$router.push({ path: '/mall/orderLists' })">
            <div class="left-content-top">
              <div class="left-image">
                <img src="@@/images/add-order.png" alt="">
              </div>
              <div class="right-number">
                <p>今日商品订单</p>
                <h3>{{baseData.s_order_day}}</h3>
              </div>
            </div>
            <div class="left-content-bottom">
              <div class="new-order-bottom-left">
                <div class="left-title">日</div>
                <div class="ico-number">
                  <i v-if="baseData.s_order_day_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.s_order_day_add>=0?baseData.s_order_day_add:Math.abs(baseData.s_order_day_add)}}
                </div>
              </div>
              <div class="new-order-bottom-center"></div>
              <div class="new-order-bottom-left">
                <div class="left-title">月</div>
                <div class="ico-number">
                  <i v-if="baseData.s_order_mon_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.s_order_mon_add>=0?baseData.s_order_mon_add:Math.abs(baseData.s_order_mon_add)}}
                </div>
              </div>
            </div>
          </div>
          <div class="right-content-box" @click="$router.push({ path: '/member/lists' })">
            <div class="left-content-top">
              <div class="left-image">
                <img src="@@/images/new-vip.png" alt="">
              </div>
              <div class="right-number">
                <p>今日新增会员</p>
                <h3>{{baseData.user_day}}</h3>
              </div>
            </div>
            <div class="left-content-bottom">
              <div class="new-order-bottom-left">
                <div class="left-title">日</div>
                <div class="ico-number">
                  <i v-if="baseData.user_day_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.user_day_add>=0?baseData.user_day_add:Math.abs(baseData.user_day_add)}}
                </div>
              </div>
              <div class="new-order-bottom-center"></div>
              <div class="new-order-bottom-left">
                <div class="left-title">月</div>
                <div class="ico-number">
                  <i v-if="baseData.user_mon_add>=0" class="el-icon-upload2"></i>
                  <i v-else class="el-icon-download"></i>
                  {{baseData.user_mon_add>=0?baseData.user_mon_add:Math.abs(baseData.user_mon_add)}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-box">
          <div class="left-title-box">
            <div class="xiusi"></div>
            <div class="text">订单管理</div>
            <!--<div class="number">20</div>-->
          </div>
          <div class="right-detail-box" @click="pushOrderList">
            查看详情<i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="system-right-info">
        <div v-for="(itemParent, indexParent) in dateArr" :key="indexParent" class="date-box">
          <div class="date-month">{{itemParent.year}}年{{itemParent.month}}月</div>
          <div class="week-item-box">
            <div class="week-item-box-child">一</div>
            <div class="week-item-box-child">二</div>
            <div class="week-item-box-child">三</div>
            <div class="week-item-box-child">四</div>
            <div class="week-item-box-child">五</div>
            <div class="week-item-box-child">六</div>
            <div class="week-item-box-child">日</div>
          </div>
          <div class="date-box">
            <div v-for="(item, myIndex) in itemParent.dayWeek" :key="myIndex" class="date-box-item"></div>
            <div v-for="(itemChild, indexChild) in itemParent.day" class="date-box-item">
              <div class="day-money" :class="[itemChild.isChoose?'active':'', itemChild.isChooseChild?'activeChild':'', itemChild.isToday&&!itemChild.outTime?'today':'']">
                <span :class="[itemChild.isToday&&!itemChild.outTime?'today':'', itemChild.outTime?'outTime':'', itemChild.isChoose?'active':'']" class="day">{{itemChild.isToday?'今天':itemChild.num}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 预约详情列表 -->
    <div class="table-pagination-box">
      <div class="title-box">
        <div class="left-text">预约详情</div>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          :lock-scroll="false"
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
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data(){
    return {
      listLoading: true,
      dateArr: [],
      isLoading: false,
      baseData: {
        booking_day: 0,
        booking_mon: 0,
        order_day: 0,
        order_day_add: 0,
        order_mon_add: 0,
        s_order_day: 0,
        s_order_day_add: 0,
        s_order_mon_add: 0,
        user_day: 0,
        user_day_add: 0,
        user_mon_add: 0
      },
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
      currentPage: 1,
      total: 4
    }
  },
  methods: {
    // 计算日历
    getDate(){
      let dateInfo = [];
      let nowDate = new Date();
      let dateY = nowDate.getFullYear();
      let dateM = nowDate.getMonth()+1;
      let dateD = nowDate.getDate();
      let dateWeek = nowDate.getDay();
      // console.log(dateY, dateM, dateD, dateWeek)
      // console.log(this.getMonthDay(2017, 2));

      let nowY = dateY;
      let nowM = dateM-1;
      let nowW = '';

      // 循环月份
      for(let i=0;i<1;i++){
        let itemInfo = {
          year: '',
          month: '',
          day: [],
          dayNums: '',
          dayWeek: '',
        }
        if(nowM+1>12){
          nowY++;
          itemInfo.year = nowY;
          itemInfo.month = 1;
          nowM = 1;
        }else {
          itemInfo.year = nowY;
          itemInfo.month = nowM+1;
          nowM++;
        }
        itemInfo.dayNums = this.getMonthDay(itemInfo.year, itemInfo.month);
        nowW = new Date(itemInfo.year, itemInfo.month-1, 1).getDay();
        if(nowW==0){
          itemInfo.dayWeek = 6;
        }else {
          itemInfo.dayWeek = nowW - 1;
        }

        // 循环判断月份里每天是否是当天以及是否过期
        for(let j=0;j<itemInfo.dayNums;j++){
          let dayItem = {
            date: itemInfo.year+'-'+itemInfo.month+'-'+(j+1),
            num: j+1,
            isToday: false,
            outTime: false,
            isChoose: false,
            isChooseChild: false,
            week: ''
          }
          dayItem.week = new Date(itemInfo.year, itemInfo.month-1, dayItem.num).getDay();
          let nowTimestamp = new Date(dateY, dateM-1, dateD).getTime();
          let thisTimestamp = new Date(itemInfo.year, itemInfo.month-1, dayItem.num).getTime();
          if(thisTimestamp==nowTimestamp){
            dayItem.isToday = true;
          }else if(thisTimestamp<nowTimestamp){
            dayItem.outTime = true;
          }
          itemInfo.day.push(dayItem)
        }
        dateInfo.push(itemInfo);
      }
      // console.log(dateInfo)
      this.dateArr = dateInfo;
    },
    // 获取一个月有几天
    getMonthDay(year, month){
      let number = new Date(year, month, 0);
      return number.getDate();
    },
    // 获取首页统计数据
    getBaseDate(){
      this.$store.dispatch('GetBaseDate', {
        token: true
      }).then((res) => {
        if(res.data.errcode==0){
          // console.log(res.data)
          this.baseData = res.data.data;
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
    // 获取预约记录列表
    getMessageList(){
      this.$store.dispatch('GetAppointmentList', {
        token: true,
        type: 0,
        page: this.currentPage
      }).then((res) => {
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
    // 前往订单列表页
    pushOrderList(){
      this.$router.push({ path: '/order/lists' })
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
    this.getDate();
    this.getBaseDate();
    this.getMessageList();
    this.getChildClassfifyList();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-form-item__label {
  font-size: 16px;
  font-weight: normal;
}
.dashboard {
  &-container {
    margin: 20px;
    .table-pagination-box {
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .left-text {
          font-size: 24px;
          line-height: 24px;
          color: #333333;
        }
        .right-search {
          width: 300px;
        }
      }
      background-color: #fff;
      padding: 30px;
      .pagination-box {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
      }
    }
    .system-info-box {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .system-left-info {
        flex: 1;
        /*width: calc(100% - 410px);*/
        height: 342px;
        /*background-color: #ff0000;*/
        .top-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 262px;
          padding: 0 20px;
          border-radius: 6px;
          background-color: #fff;
          margin-bottom: 13px;
          .left-content-box, .center-content-box, .right-content-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 180px;
            border: 1px solid #F1F2F7;
            border-radius: 6px;
            cursor: pointer;
            .left-content-top {
              /*width: 270px;*/
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left-image {
                flex: 1;
                text-align: center;
                img {
                  width: 80px;
                  height: 80px;
                }
              }
              .right-number {
                flex: 1;
                text-align: center;
                p {
                  font-size: 16px;
                  color: #333333;
                  font-weight: bold;
                  line-height: 16px;
                  margin-bottom: 20px;
                }
                h3 {
                  font-size: 30px;
                  line-height: 30px;
                }
              }
            }
            .left-content-bottom {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 30px;
              .this-month {
                flex: 1;
                text-align: center;
                font-size: 16px;
                line-height: 16px;
                color: #333333;
              }
              .month-number {
                flex: 1;
                text-align: center;
                font-size: 18px;
                line-height: 18px;
                color: #666;
              }
              .new-order-bottom-left {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .left-title, .ico-number {
                  font-size: 16px;
                  color: #666666;
                }
                .left-title {
                  margin-right: 28px;
                }
                .el-icon-download {
                  font-weight: bold;
                  color: #F8D347;
                }
                .el-icon-upload2 {
                  font-weight: bold;
                  color: #57C8F2;
                }
              }
              .new-order-bottom-center {
                width: 1px;
                height: 18px;
                background-color: #eeeeee;
              }
              .new-order-bottom-right {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
          .left-content-box {
            margin-right: 20px;
            .right-number {
              h3 {
                color: #6CCAC9;
              }
            }
          }
          .center-content-box {
            margin-right: 20px;
            .right-number {
              h3 {
                color: #F8D347;
              }
            }
          }
          .right-content-box {
            .right-number {
              h3 {
                color: #FF6C60;
              }
            }
          }
        }
        .bottom-box {
          height: 67px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 6px;
          background-color: #fff;
          .left-title-box {
            display: flex;
            align-items: center;
            .xiusi {
              width: 4px;
              height: 26px;
              background-color: #90B83B;
              margin-right: 13px;
            }
            .text {
              font-size: 20px;
              line-height: 20px;
              color: #666666;
              margin-right: 5px;
            }
            .number {
              font-size: 24px;
              line-height: 30px;
              color: #FF6C60;
            }
          }
          .right-detail-box {
            font-size: 16px;
            color: #999999;
            cursor: pointer;
          }
        }
      }
      .system-right-info {
        width: 410px;
        height: 342px;
        background-color: #fff;
        border-radius: 6px;
        margin-left: 13px;

      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
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
      padding-top: 30px;
      button {
        padding: 8px 15px;
        width: 100px;
      }
    }
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
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.date-box {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 6px;
  .week-item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    .week-item-box-child {
      font-size: 14px;
      color: #9EA6AD;
    }
  }
  .date-month {
    display: inline-block;
    padding-bottom: 10px;
    font-size: 20px;
    color: #42484E;
    line-height: 20px;
    border-bottom: 2px solid #8FB739;
  }
  .date-box {
    padding: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .date-box-item {
      width: 14.285714%;
      /*margin-bottom: 10px;*/
      display: flex;
      justify-content: center;
      align-items: center;
      .day-money {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 16px;
        line-height: 16px;
        background-color: transparent;
        .money {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #9a9a9a;
          image {
            width: 5px;
            height: 8px;
            margin-right: 1px;
          }
        }
        .day {
          color: #6C7379;
        }
        /*.day.weekDay {*/
          /*color: #f00;*/
        /*}*/
        .day.today {
          font-size: 13px;
          color: #ffffff;
        }
        .day.outTime {
          color: #cccccc;
        }
        .day.active, .money.active {
          color: #ffffff;
        }
      }
      .day-money.activeChild {
        background-color: #dff0fa;
      }
      .day-money.active {
        background-color: #5FCEFF;
        color: #ffffff;
      }
      .day-money.today {
        background-color: #8FB739;
      }
    }
  }
}
</style>
