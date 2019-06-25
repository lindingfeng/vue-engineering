<template >
  <div class="system-banner-box" style="padding: 20px;">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">首页设置</p>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addEditFunc(1)">添加banner</el-button>
          <!--<el-button type="primary" size="mini" icon="el-icon-plus" @click="addEditFunc(1)">添加banner</el-button>-->
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
          <el-table-column label="排序值">
            <template slot-scope="scope">
              <span>{{scope.row.sort}}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <img style="width: 100px;height: 50px;" :src="scope.row.resource" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="链接">
            <template slot-scope="scope">
              <span>{{scope.row.url?scope.row.url:'-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.state==1?'显示':'隐藏'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <span style="color: #08B300;cursor: pointer;" @click="addEditFunc(2, scope.$index)">编辑</span>
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
    <el-dialog :title="type==1?'添加banner':'编辑banner'" :visible.sync="dialogSwiperVisible" width="500px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="banner图" required>
              <div class="spec-image-upload-box">
                <div v-if="!form.showBanner" class="spec-image-box">
                  <img :src="form.banner" alt="">
                  <div class="close-box" @click="deleteImg">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-else>
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/file"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    :data="{type: 'banner', key: 0}"
                    name="file"
                    :show-file-list="false"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess">
                    <div style="width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;">
                      <img src="@@/images/camera.png" alt="">
                    </div>
                  </el-upload>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="链接地址">
              <el-input size="mini" v-model="form.url" style="width: 240px;" placeholder="输入banner图链接地址"></el-input>
            </el-form-item>
            <el-form-item label="排序值" prop="sort" :rules="{required: true, message: '排序值不能为空', trigger: 'blur'}">
              <el-input size="mini" v-model="form.sort" style="width: 240px;" maxlength="3" placeholder="输入1到20的排序值" @keyup.native="priceKeyup($event)" @blur="priceBlur()"></el-input>
            </el-form-item>
            <el-form-item label="显示banner" required>
              <el-radio-group v-model="form.state">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
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
    name: 'systemBanner',
    data(){
      return {
        type: 1,
        tableData: [],
        swiperArr: [],
        dialogSwiperVisible: false,
        currentPage: 1,
        total: 0,
        isLoading: false,
        iScreen: false,
        form: {
          url: '',
          sort: '',
          banner: '',
          showBanner: true,
          state: '1'
        },
        banner_id: ''
      }
    },
    methods: {
      // 会员信息列表
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
      // 只让数字可以输入
      priceKeyup(e){
        this.form.sort = e.target.value.replace(/[^\d]/g, "");
      },
      // 验证输入的数字
      priceBlur(){
        let reg = /^[1-9][0-9]{0,2}$/;
        if(!reg.test(this.form.sort)){
          this.form.sort = '';
        }else {
          if(Number(this.form.sort)>20) {
            this.form.sort = '';
            this.$message({
              message: '排序值在0到20之间！',
              type: 'error',
              duration: 1000
            });
          }
        }
      },
      // 添加、编辑首页banner图
      addEditFunc(type, index){
        if(type==1){
          this.type = 1;
          this.banner_id = '';
          this.form.url = '';
          this.form.sort = '';
          this.form.banner = '';
          this.form.state = '1';
          this.form.showBanner = true;
        }else {
          this.type = 2;
          this.banner_id = this.tableData[index].banner_id;
          this.form.url = this.tableData[index].url;
          this.form.sort = this.tableData[index].sort;
          this.form.banner = this.tableData[index].resource;
          this.form.state = this.tableData[index].state.toString();
          this.form.showBanner = false;
        }
        this.dialogSwiperVisible = true;
      },
      // 上传错误
      handleAvatarError(e){
        this.$message({
          message: '上传失败!',
          type: 'error',
          duration: 1000
        });
      },
      // 上传成功
      handleAvatarSuccess(response){
        if(response.errcode == 0){
          this.form.banner = response.data.img;
          this.form.showBanner = false;
        }else {
          this.$message({
            message: response.errstr+'（'+response.errcode+'）',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 删除已上传的banner
      deleteImg(){
        this.form.banner = '';
        this.form.showBanner = true;
      },
      // 分页事件
      currentChange(e){
        // 返回选中的页码
        // console.log(e)
        this.currentPage = e;
        this.getShopList();
      },
      // 保存
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.form.banner){
              let data = {
                token: true,
                type: this.type,
                name: '首页',
                img: this.form.banner,
                url: this.form.url?this.form.url:null,
                sort: this.form.sort,
                state: this.form.state
              };
              if(this.type==2){
                data.banner_id = this.banner_id;
              }
              // if(this.form.url){
              //   data.url = this.form.url;
              // }
              this.isLoading = true;
              this.$store.dispatch('AddEditBanner', data).then((res) => {
                this.isLoading = false;
                if(res.data.errcode==0){
                  this.$message({
                    message: '保存成功！',
                    type: 'success',
                    duration: 1000
                  });
                  this.dialogSwiperVisible = false;
                  this.getShopList();
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
            }else {
              this.$message({
                message: '请上传banner图！',
                type: 'error',
                duration: 1000
              });
            }
          }
        });
      },
      // 取消
      cancle(){
        this.dialogSwiperVisible = false;
      }
    },
    mounted(){
      this.getShopList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .system-banner-box {
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
    .subordinate-box {
      width: 100%;
      /*height: 300px;*/
      /*background-color: #ff0000;*/
      .subordinate-list-box {
        /*height: 1000px;*/
      }
      .spec-image-upload-box {
        display: flex;
        align-items: center;
        /*overflow: hidden;*/
        .upload-image {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          margin-top: 10px;
          height: 110px;
          border: 1px solid #eeeeee;
          cursor: pointer;
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
      .spec-image-box {
        position: relative;
        width: 110px;
        margin-top: 10px;
        height: 110px;
        border: 1px solid #eee;
        /*background-color: #ff0000;*/
        img {
          width: 108px;
          height: 108px;
        }
        .push-top {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.6);
          p {
            font-size: 14px;
            line-height: 14px;
            color: #ffffff;
            cursor: pointer;
          }
        }
        .close-box {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          line-height: 20px;
          background-color: #fff;
          border-radius: 50%;
          i {
            font-size: 20px;
            line-height: 20px;
            color: #CCCCCC;
          }
        }
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
