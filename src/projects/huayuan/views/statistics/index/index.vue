<template >
  <div class="statistics-index-box">
    <div class="top-chart-box">
      <div class="top-chart-left">
        <div class="title-box">
          <p>新增会员</p>
          <div class="select-box">
            <el-select size="small" v-model="newMember" placeholder="请选择" style="width: 100px;" @change="selectChange(0)">
              <el-option label="近7天" value="1">近7天</el-option>
              <el-option label="近30天" value="2">近30天</el-option>
            </el-select>
          </div>
        </div>
        <div id="new-member"></div>
      </div>
      <div class="top-chart-right">
        <div class="title-box">
          <p>新增预约</p>
          <div class="select-box">
            <el-select size="small" v-model="newAppointment" placeholder="请选择" style="width: 100px;" @change="selectChange(1)">
              <el-option label="近7天" value="1">近7天</el-option>
              <el-option label="近30天" value="2">近30天</el-option>
            </el-select>
          </div>
        </div>
        <div id="new-appointment"></div>
      </div>
    </div>
    <div class="bottom-chart-box">
      <div class="bottom-chart-left">
        <div class="title-box">
          <p>订单统计</p>
          <div class="select-box">
            <el-select size="small" v-model="orderStatistics" placeholder="请选择" style="width: 100px;" @change="selectChange(2)">
              <el-option label="近7天" value="1">近7天</el-option>
              <el-option label="近30天" value="2">近30天</el-option>
            </el-select>
          </div>
        </div>
        <div id="myChart"></div>
      </div>
      <div class="bottom-chart-right">
        <div class="bottom-right-title">
          <p>当月总金额统计</p>
        </div>
        <div id="myMoney"></div>
        <div class="bottom-right-money">
          <div class="title">
            <div class="first-box">
              <div class="not"></div>
              <p>未完成</p>
            </div>
            <div class="second-box">
              <div class="has"></div>
              <p>已完成</p>
            </div>
          </div>
          <div class="money-box">
            <p>￥{{unfinish}}</p>
            <p>￥{{finish}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'

  export default {
    name: 'statisticsIndex',
    data(){
      return {
        newMember: '1',
        orderStatistics: '1',
        newAppointment: '1',
        finish: 0,
        unfinish: 0
      }
    },
    methods: {
      // 获取新增用户统计
      getUserCount(){
        this.$store.dispatch('GetUserCount', {
          token: true,
          type: this.newMember
        }).then((res) => {
          if(res.data.errcode==0){
            let dataX = [];
            let dataY = [];
            let doc = document.getElementById('new-member');
            let option = {
              grid: {
                left: 50,
                right: 30,
                top: 30,
                bottom: 30,
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                data: dataX,
                // 是否显示x轴线
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#eee',
                  }
                },
                // x轴下方文字样式
                axisLabel: {
                  show: true,
                  color: '#666'
                },
                // 是否显示x轴的刻度
                axisTick: {
                  show: false
                }
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false
                },
                // 是否显示y轴的刻度
                axisTick: {
                  show: false
                },
                // 是否显示y轴横线
                splitLine: {
                  show: true,
                  lineStyle: {
                    width: 1,
                    type: 'dashed',
                    color: '#d8d8d8'
                  }
                }
              },
              series: [{
                data: dataY,
                type: 'line',
                itemStyle: {
                  color: '#009DFF'
                },
              }]
            };
            for(let i=0;i<res.data.data.length;i++){
              dataX.push(res.data.data[i].day);
              dataY.push(res.data.data[i].num);
            }
            this.setChart(doc, option);
            // console.log(option)
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
      // 获取用户预约统计
      getMakeCount(){
        this.$store.dispatch('GetMakeCount', {
          token: true,
          type: this.newAppointment
        }).then((res) => {
          if(res.data.errcode==0){
            let dataX = [];
            let dataY = [];
            let doc = document.getElementById('new-appointment');
            let option = {
              grid: {
                left: 50,
                right: 30,
                top: 30,
                bottom: 30,
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                data: dataX,
                // 是否显示x轴线
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#eee',
                  }
                },
                // x轴下方文字样式
                axisLabel: {
                  show: true,
                  color: '#666'
                },
                // 是否显示x轴的刻度
                axisTick: {
                  show: false
                }
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  show: false
                },
                // 是否显示y轴的刻度
                axisTick: {
                  show: false
                },
                // 是否显示y轴横线
                splitLine: {
                  show: true,
                  lineStyle: {
                    width: 1,
                    type: 'dashed',
                    color: '#d8d8d8'
                  }
                }
              },
              series: [{
                data: dataY,
                type: 'line',
                itemStyle: {
                  color: '#009DFF'
                },
              }]
            };
            for(let i=0;i<res.data.data.length;i++){
              dataX.push(res.data.data[i].day);
              dataY.push(res.data.data[i].num);
            }
            this.setChart(doc, option);
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
      // 获取订单数据统计
      getOrderCount() {
        this.$store.dispatch('GetOrderCount', {
          token: true,
          type: this.orderStatistics
        }).then((res) => {
          if(res.data.errcode==0){
            let dataX = [];
            let dataY1 = [];
            let dataY2 = [];
            let doc = document.getElementById('myChart');
            let option = {
              grid: {
                left: 50,
                right: 30,
                top: 50,
                bottom: 30,
              },
              tooltip : {
                trigger: 'axis'
              },
              legend: {
                data:['拼团','不拼团']
              },
              calculable : true,
              xAxis : {
                type : 'category',
                data : dataX,
                // 是否显示x轴线
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#eee',
                  }
                },
                // x轴下方文字样式
                axisLabel: {
                  show: true,
                  color: '#666'
                },
                // 是否显示x轴的刻度
                axisTick: {
                  show: false
                }
              },
              yAxis : {
                type : 'value',
                axisLine: {
                  show: false
                },
                // 是否显示y轴的刻度
                axisTick: {
                  show: false
                },
                // 是否显示y轴横线
                splitLine: {
                  show: true,
                  lineStyle: {
                    width: 1,
                    type: 'dashed',
                    color: '#d8d8d8'
                  }
                }
              },
              series : [
                {
                  name:'拼团',
                  type:'bar',
                  itemStyle: {
                    color: '#009DFF'
                  },
                  barGap: 0,
                  data:dataY1,
                },
                {
                  name:'不拼团',
                  type:'bar',
                  itemStyle: {
                    color: '#D0EDFF'
                  },
                  barGap: 0,
                  data:dataY2,
                }
              ]
            };
            for(let i=0;i<res.data.data.length;i++){
              dataX.push(res.data.data[i].day);
              dataY1.push(res.data.data[i].nums);
              dataY2.push(res.data.data[i].num);
            }
            this.setChart(doc, option);
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
      // 获取当月金额数据统计
      getMoneyCount(){
        this.$store.dispatch('GetMoneyCount', {
          token: true
        }).then((res) => {
          if(res.data.errcode==0){
            this.finish = res.data.data.finish;
            this.unfinish = res.data.data.unfinish;
            let doc = document.getElementById('myMoney');
            let option = {
              title: {
                text:'￥'+res.data.data.total,
                left:'center',
                top:'center',
                textStyle:{
                  fontSize:24,
                  lineHeight:24
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{b}: ￥{c} ({d}%)"
              },
              series: [
                {
                  // name:'',
                  type:'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: false,
                      textStyle: {
                        fontSize: '18'
                      }
                    }
                  },
                  data:[
                    {
                      value:res.data.data.finish,
                      name:'已完成',
                      itemStyle: {
                        color: '#FC4839'
                      },
                    },
                    {
                      value:res.data.data.unfinish,
                      name:'未完成',
                      itemStyle: {
                        color: '#FFB0A9'
                      }
                    }
                  ]
                }
              ]
            };
            this.setChart(doc, option);
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
      // 绘制图表
      setChart(doc, option){
        let that = this;
        let myChart = Echarts.init(doc);
        myChart.setOption(option);
      },
      // 图表时间change事件
      selectChange(type){
        if(type==0){
          this.getUserCount();
        }else if(type==1){
          this.getMakeCount();
        }else if(type==2){
          this.getOrderCount();
        }
      }
    },
    mounted(){
      this.getUserCount();
      this.getMakeCount();
      this.getOrderCount();
      this.getMoneyCount();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .statistics-index-box {
    padding: 20px;
    /* 隐藏el-scrollbar的横向滚动条 */
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .top-chart-box, .bottom-chart-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-chart-left, .top-chart-right, .bottom-chart-left {
        flex: 1;
        height: 302px;
        background-color: #fff;
        .title-box {
          padding: 10px 30px 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 18px;
            font-weight: bold;
            color: #666666;
          }
        }
      }
      .top-chart-right {
        margin-left: 20px;
      }
    }
    .bottom-chart-box {
      margin-top: 30px;
      /*position: absolute;*/
      /*left: 0;*/
      /*right: 0;*/
      /*bottom: 0;*/
      .bottom-chart-left, .bottom-chart-right {
        height: 442px;
      }
      .bottom-chart-right {
        position: relative;
        width: 400px;
        margin-left: 20px;
        background-color: #fff;
        .bottom-right-title {
          padding: 0 12px;
          margin-bottom: 20px;
          height: 50px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          p {
            font-size: 18px;
            font-weight: bold;
            line-height: 18px;
            color: #34474F;
          }
        }
        .bottom-right-money {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          .title {
            display: flex;
            align-items: center;
            .first-box, .second-box {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              div {
                width: 15px;
                height: 15px;
                margin-right: 5px;
              }
              div.not {
                background-color: #FFB0A9;
              }
              div.has {
                background-color: #FC4839;
              }
              p {
                font-size: 16px;
                color: #34474F;
              }
            }
          }
          .money-box {
            padding: 20px 0;
            display: flex;
            align-items: center;
            p {
              flex: 1;
              text-align: center;
              font-size: 16px;
              color: #34474F;
            }
          }
        }
      }
    }
    #myChart {
      /*width: 65%;*/
      height: 400px;
    }
    #new-appointment, #new-member {
      height: 260px;
    }
    #myMoney {
      height: 240px;
    }
  }
</style>
