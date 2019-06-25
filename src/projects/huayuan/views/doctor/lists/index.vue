<template >
  <div class="doctor-list-box">
    <div class="title-box">
      <div class="left-text">
        <p class="title">医生列表</p>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addEditDoctor(0)">添加医生</el-button>
        <!--<el-button size="small" type="primary" icon="el-icon-plus">添加项目</el-button>-->
      </div>
    </div>
    <div class="list-scroll-box">
      <el-scrollbar style="height:100%;">
        <div class="doctor-list-item clear">
          <div v-for="(item, index) in doctorLists" :key="index" class="doctor-big-box">
            <!-- 顶部信息 -->
            <div class="top-info">
              <div class="img-box">
                <img :src="item.avatar" alt="">
              </div>
              <p>{{item.name}}</p>
            </div>
            <!-- 中部信息 -->
            <div class="center-info">
              <div class="title">
                <p>【{{item.job}}】</p>
              </div>
              <div class="brief">
                <p>{{item.describe}}</p>
                <!--<p>这是简介</p>-->
              </div>
            </div>
            <!-- 底部信息 -->
            <div class="bottom-info">
              <el-button type="primary" size="mini" @click="addEditDoctor(1, index)">编 辑</el-button>
              <el-button type="danger" size="mini" @click="deleteDoctor(index)">删 除</el-button>
            </div>
          </div>
          <div v-if="doctorLists.length==0" class="null-box">
            <img src="@@/images/null.png" alt="" />
            <p>暂无数据</p>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-if="total>0" class="pagination-box">
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="6"
        :total="total"
        @current-change="currentChange">
      </el-pagination>
    </div>
    <el-dialog :title="type==1?'添加医生':'编辑医生信息'" :visible.sync="dialogSwiperVisible" width="500px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="医生姓名" prop="name" :rules="{required: true, message: '医生姓名不能为空', trigger: 'blur'}">
              <el-input size="mini" v-model="form.name" style="width: 240px;" placeholder="输入医生姓名" @blur="doctorBlur(0)"></el-input>
            </el-form-item>
            <el-form-item label="医生职称" prop="title" :rules="{required: true, message: '医生职称不能为空', trigger: 'blur'}">
              <el-input size="mini" v-model="form.title" style="width: 240px;" placeholder="输入医生职称" @blur="doctorBlur(1)"></el-input>
            </el-form-item>
            <el-form-item label="医生照片" required>
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
            <el-form-item label="个人简介" prop="describe" :rules="{required: true, message: '个人简介不能为空', trigger: 'blur'}">
              <el-input type="textarea" :rows="4" maxlength="50" v-model="form.describe" style="width: 240px;" placeholder="个人简介，最多50个字符" @blur="doctorBlur(2)"></el-input>
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
    name: 'doctorLists',
    data(){
      return {
        doctorLists: [],
        type: 1,
        dialogSwiperVisible: false,
        form: {
          name: '',
          title: '',
          banner: '',
          showBanner: true,
          describe: '',
          doctor_id: ''
        },
        isLoading: false,
        currentPage: 1,
        total: 0
      }
    },
    watch: {
      dialogSwiperVisible(val){
        if(!val){
          this.$refs.form.resetFields();
        }
      }
    },
    methods: {
      // 获取医生列表
      getDoctorLists(){
        this.$store.dispatch('GetDoctorLists', {
          token: true,
          page: this.currentPage
        }).then((res) => {
          console.log(res);
          // this.isLoading = false;
          if(res.data.errcode==0){
            this.doctorLists = res.data.data.data;
            this.total = res.data.data.total;
          }else if(res.data.errcode==9003){
            if(this.currentPage==1){
              this.total = 0;
            }
            this.doctorLists = [];
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
      // 添加/编辑医生
      addEditDoctor(type, index){
        if(type==0){  // 添加
          this.type = 1;
          this.form.name = '';
          this.form.title = '';
          this.form.banner = '';
          this.form.showBanner = true;
          this.form.describe = '';
          this.form.doctor_id = '';
        }else if(type==1){  // 编辑
          this.type = 2;
          this.form.name = this.doctorLists[index].name;
          this.form.title = this.doctorLists[index].job;
          this.form.banner = this.doctorLists[index].avatar;
          this.form.showBanner = false;
          this.form.describe = this.doctorLists[index].describe;
          this.form.doctor_id = this.doctorLists[index].doctor_id;
        }
        this.dialogSwiperVisible = true;
      },
      // 删除医生
      deleteDoctor(index){
        let _this = this;
        this.$msgbox({
          title: '温馨提示',
          message: '确定要删除该医生的信息吗？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          lockScroll: false,
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '删除中...';
              // 请求后台删除该条分类
              _this.$store.dispatch('DeleteDoctor', {
                token: true,
                doctor_id: _this.doctorLists[index].doctor_id
              }).then((res) => {
                instance.confirmButtonLoading = false;
                done();
                if(res.data.errcode==0){
                  _this.$message({
                    message: '删除成功！',
                    type: 'success',
                    duration: 1000
                  });
                  _this.getDoctorLists();
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
        });
      },
      // 防止用户只输入空格
      doctorBlur(type){
        if(type==0){
          if(this.form.name){
            this.form.name = this.form.name.replace(/(^\s*)|(\s*$)/g,"");
          }
        }else if(type==1){
          if(this.form.title){
            this.form.title = this.form.title.replace(/(^\s*)|(\s*$)/g,"");
          }
        }else if(type==2){
          if(this.form.describe){
            this.form.describe = this.form.describe.replace(/(^\s*)|(\s*$)/g,"");
          }
        }
      },
      // 删除已上传的图片
      deleteImg(){
        this.form.banner = '';
        this.form.showBanner = true;
      },
      // 上传失败回调
      handleAvatarError(){
        this.$message({
          message: '上传失败！',
          type: 'error',
          duration: 1000
        });
      },
      // 上传成功回调
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
      // 取消添加/编辑
      cancle(){
        this.dialogSwiperVisible = false;
      },
      // 保存添加/编辑
      save(){
        this.$refs.form.validate((valid) => {
            if (valid) {
              if(this.form.banner){
                let data = {
                  token: true,
                  type: this.type,
                  name: this.form.name,
                  job: this.form.title,
                  avatar: this.form.banner,
                  describe: this.form.describe
                };
                if(this.type == 2){
                  data.doctor_id = this.form.doctor_id
                }
                this.$store.dispatch('AddEditDoctor', data).then((res) => {
                  this.isLoading = false;
                  if(res.data.errcode==0){
                    this.$message({
                      message: '保存成功！',
                      type: 'success',
                      duration: 1000
                    });
                    this.dialogSwiperVisible = false;
                    setTimeout(()=>{
                      this.getDoctorLists();
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
              }else {
                this.$message({
                  message: '请上传医生照片！',
                  type: 'error',
                  duration: 1000
                });
              }
            }else {
              console.log('没通过...')
            }
        })
      },
      // 分页事件
      currentChange(e){
        this.currentPage = e;
        this.getDoctorLists();
      }
    },
    mounted(){
      this.getDoctorLists();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .doctor-list-box {
    padding: 20px;
    position: absolute;
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 20px;
    background-color: #ffffff;
    /* 隐藏el-scrollbar的横向滚动条 */
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-form-item__label {
      font-size: 16px;
      font-weight: normal;
    }
    textarea {
      resize: none !important;
    }
    .clear:after{content:'';display:block;clear:both;}
    .clear{zoom:1;}
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      background-color: #ffffff;
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
    .null-box {
      padding-top: 150px;
      text-align: center;
      img {
        width: 100px;
      }
      p {
        font-size: 14px;
        color: #cccccc;
      }
    }
    .doctor-big-box {
      float: left;
      width: 31%;
      /*min-height: 200px;*/
      background-color: #ffffff;
      margin-left: 3.5%;
      margin-bottom: 2.5%;
      /*border: 1px solid #eeeeee;*/
      box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      overflow: hidden;
      .top-info {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #8FB739;
        .img-box {
          width: 130px;
          height: 130px;
          border: 5px solid #ffffff;
          border-radius: 50%;
          margin-bottom: 10px;
          background: #ffffff;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }
        }
        p {
          font-size: 26px;
          line-height: 26px;
          color: #ffffff;
          width: 170px;
          text-align: center;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
      }
      .center-info {
        .title {
          padding: 15px 0 8px 0;
          p {
            text-align: center;
            font-size: 18px;
            color: #8FB739;
          }
        }
        .brief {
          height: 80px;
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          p {
            width: 75%;
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
            line-height: 24px;
            color: #666666;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
      .bottom-info {
        height: 46px;
        padding: 0 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #eeeeee;
      }
    }
    .doctor-big-box:nth-child(3n+1) {
      margin-left: 0;
    }
    .list-scroll-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 70px;
      bottom: 80px;
      .doctor-list-item {
        padding: 20px;
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
    .pagination-box {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 30px 20px 30px;
      display: flex;
      justify-content: flex-end;
      .batch-operation {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
