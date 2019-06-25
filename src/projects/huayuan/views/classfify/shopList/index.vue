<template >
  <div class="classfify-shop-box">
    <div class="bottom-content-box">
      <div class="table-box">
        <el-table
          :data="tableData"
          :header-cell-style="{textAlign: 'center', background:'#F6F6F6',}"
          :cell-style="{textAlign: 'center'}"
          style="width: 100%"
          empty-text="暂无数据"
          @select="checkBoxChange"
          @select-all="allCheckBoxChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <span>{{scope.row.goods_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目类别">
            <template slot-scope="scope">
              <span>{{scope.row.class_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目banner">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.banner[0]" alt="">
            </template>
          </el-table-column>
          <el-table-column label="项目价格">
            <template slot-scope="scope">
              <p style="font-size: 14px;line-height: 18px;color: #CCCCCC;text-decoration:line-through">{{'￥'+scope.row.original_price}}</p>
              <p style="font-size: 14px;line-height: 18px;color: #FF8400;">{{'￥'+scope.row.price}}</p>
            </template>
          </el-table-column>
          <el-table-column label="拼团价格">
            <template slot-scope="scope">
              <span>{{scope.row.group_state==2?'￥'+scope.row.group_price:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="集赞价格">
            <template slot-scope="scope">
              <span>{{scope.row.group_state==3?'￥'+scope.row.group_price:'-'}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column label="项目规格">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.goods_specs?scope.row.goods_specs:'-'}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column label="项目简介">
            <template slot-scope="scope">
              <span>{{scope.row.brief}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目详情">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.details[0]" alt="">
            </template>
          </el-table-column>
          <el-table-column label="项目状态">
            <template slot-scope="scope">
              <span>{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.add_time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #08B300;margin: 0 5px;cursor: pointer" @click="operation(0, scope.$index)">详情</span>
              <span style="color: #FF0000;margin: 0 5px;cursor: pointer" @click="operation(1, scope.$index)">移动</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="total>0" class="pagination-box">
        <div class="batch-operation">
          <el-button type="success" size="small" @click="moveBatch">批量移动</el-button>
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
    <el-dialog title="移动分类" :visible.sync="dialogTableVisible" width="600px">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="rule-form-box">
        <el-form-item label="项目类别" prop="region" :rules="{required: true, message: '项目类别不能为空', trigger: ['blur', 'change']}">
          <el-select size="mini" v-model="ruleForm.region" placeholder="请选择项目类别" style="width: 240px;">
            <el-option v-for="(item, index) in ruleForm.childArr" :key="index" :label="item.class_name" :value="item.class_id">{{item.class_name}}</el-option>
          </el-select>
        </el-form-item>
        <div class="btn-box">
          <el-button class="confirm" type="primary" size="small" :loading="ruleForm.isLoading" @click="confirm">保 存</el-button>
          <el-button class="cancle" type="info" size="small" @click="cancle">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'classfifyShop',
    data() {
      return {
        class_id: '',
        start_price: '',
        end_price: '',
        activeTab: 0,
        tableData: [],
        hasChoose: [],
        currentPage: 1,
        dialogTableVisible: false,
        moveIndex: -1,
        ruleForm: {
          region: '',
          childArr: [],
          isLoading: false
        },
        batch: false,
        total: 0
      }
    },
    methods: {
      // 获取某子分类下商品列表
      getClassfifyList(){
        this.$store.dispatch('GetClassfifyShopList', {
          token: true,
          class_id: this.class_id,
          page: this.currentPage
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            this.tableData = res.data.data.data;
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].banner){
              }else {
                this.tableData[i].banner = [];
              }
              if(this.tableData[i].goods_specs){
                this.tableData[i].goods_specs = this.tableData[i].goods_specs.join(',')
              }
            }
            this.total = res.data.data.total;
          }else if(res.data.errcode==9003){
            if(this.currentPage==1){
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
          // console.log(res);
          if(res.data.errcode==0){
            this.ruleForm.childArr = res.data.data;
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
      // 单个或批量移动商品到某个分类
      moveGoods(){
        let goods_id = '';
        if(this.hasChoose.length>0&&this.batch){ // 用户批量筛选
          let goods_id_item = [];
          for(let i=0;i<this.hasChoose.length;i++){
            goods_id_item.push(this.hasChoose[i].goods_id);
          }
          goods_id = goods_id_item.join(',')
        }else {
          goods_id = this.tableData[this.moveIndex].goods_id;
        }
        console.log(goods_id);
        this.$store.dispatch('MoveClassfifyShop', {
          token: true,
          class_id: this.ruleForm.region,
          goods_id: goods_id
        }).then((res) => {
          // console.log(res);
          this.ruleForm.region = '';
          this.ruleForm.isLoading = false;
          this.dialogTableVisible = false;
          if(res.data.errcode==0){
            this.$message({
              message: '转移成功！',
              type: 'success',
              duration: 1000
            });
            this.getClassfifyList();
          }else {
            this.$message({
              message: res.data.errstr+'（'+res.data.errcode+'）666',
              type: 'error',
              duration: 1000
            });
          }
        }).catch((err) => {
          this.ruleForm.isLoading = false;
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
      // 排序请求
      sortChange(e){
        // console.log(e.column)
        // 请求后台排序接口
        if(e.order == 'ascending' || e.order == 'descending'){ // 升序
          // 再判断是哪个字段的升序
          if(e.column.label=='项目价格'){

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
      // 单条记录的详情、移动
      operation(type, index){
        // console.log(type, index)
        if(type==0){ // 详情
          this.$router.push({ path: '/shop/details', query: { goods_id: this.tableData[index].goods_id }})
        }else if(type==1){ // 移动
          if(this.ruleForm.childArr.length==0){
            this.getChildClassfifyList();
          }
          this.batch = false;
          this.ruleForm.region = '';
          this.dialogTableVisible = true;
          this.moveIndex = index;
        }

      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        // console.log(e)
        this.currentPage = e;
        this.getClassfifyList();
      },
      // 批量移动按钮
      moveBatch(){
        if(this.hasChoose.length>0){
          if(this.ruleForm.childArr.length==0){
            this.getChildClassfifyList();
          }
          this.batch = true;
          this.ruleForm.region = '';
          this.dialogTableVisible = true;
        }else {
          this.$message({
            message: '请先选择需要移动的商品！',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 移动项目类别confirm事件
      confirm(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.ruleForm.isLoading = true;
            this.moveGoods();
            // setTimeout(()=>{
            //   this.ruleForm.isLoading = false;
            // }, 2000)
          }
        });
      },
      // 移动项目类别cancle事件
      cancle(){
        this.dialogTableVisible = false;
      },
    },
    mounted(){
      if(this.$route.query.class_id){
        this.class_id = this.$route.query.class_id;
        this.getClassfifyList();
      }else {
        this.$message({
          message: '缺少必要参数！',
          type: 'error',
          duration: 1000
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .classfify-shop-box {
    .bottom-content-box {
      background-color: #fff;
      border-radius: 5px;
      .tabs-box {
        padding: 20px 30px 0 30px;
      }
      .table-box {
        padding: 30px;
        min-height: 500px;
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
    .rule-form-box {
      /*min-height: 200px;*/
      .el-form-item__label {
        font-size: 16px;
        font-weight: normal;
      }
      .btn-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 100px;
        button {
          width: 100px;
          height: 32px;
          border-color: transparent;
        }
        .confirm {
          background-color: #8FB739;
        }
      }
    }
  }
</style>
