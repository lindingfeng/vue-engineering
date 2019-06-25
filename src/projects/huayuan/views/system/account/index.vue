<template >
  <div class="system-account-box" style="padding: 20px">
    <div class="top-content-box">
      <div class="title-box">
        <div class="left-text">
          <p class="title">账号管理</p>
        </div>
      </div>
      <div class="account-title">
        <p>账号信息</p>
      </div>
      <div class="account-content">
        <div class="account-content-item">
          <p>管理员账号:</p>
          <p style="margin: 0 20px;">{{system.admin.mobile}}</p>
          <el-button type="primary" size="mini" @click="changePwd">修改账号密码</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="修改登陆密码" :visible.sync="dialogSwiperVisible" width="500px" top="20vh">
      <div class="subordinate-box">
        <div class="subordinate-list-box">
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="管理员账号">
              <div>{{system.admin.mobile}}</div>
            </el-form-item>
            <el-form-item label="原密码" prop="old_pwd" :rules="{required: true, message: '原密码不能为空', trigger: 'blur'}">
              <el-input type="password" size="mini" v-model="form.old_pwd" style="width: 240px;" placeholder="输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_pwd" :rules="{required: true, message: '新密码不能为空', trigger: 'blur'}">
              <el-input type="password" size="mini" v-model="form.new_pwd" style="width: 240px;" placeholder="输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="confirm_pwd" :rules="{required: true, message: '确认密码不能为空', trigger: 'blur'}">
              <el-input type="password" size="mini" v-model="form.confirm_pwd" style="width: 240px;" placeholder="输入确认密码"></el-input>
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
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'systemAccount',
    data() {
      return {
        mobile: '---',
        dialogSwiperVisible: false,
        form: {
          old_pwd: '',
          new_pwd: '',
          confirm_pwd: '',
        },
        isLoading: false
      }
    },
    computed: {
      ...mapState([
        'system'
      ]),
      // ...mapGetters([
      //   'countChange',
      // ])
    },
    methods: {
      ...mapActions([
        'GetBannerList' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      ]),
      // 获取管理员信息
      getAdminInfo(){
        this.$store.dispatch('GetAdminInfo', {
          token: true
        }).then((res) => {
          if(res.data.errcode==0){
            console.log(res.data)
            this.mobile = res.data.data.mobile;
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
      // 修改账号密码
      changePwd(){
        this.form.old_pwd = '';
        this.form.new_pwd = '';
        this.form.confirm_pwd = '';
        this.dialogSwiperVisible = true;
      },
      // 保存
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.form.old_pwd.length<6 || this.form.new_pwd.length<6 || this.form.confirm_pwd.length<6){
              this.$message({
                message: '密码不能小于6位数！',
                type: 'error',
                duration: 1000
              });
            }else {
              if(this.form.new_pwd == this.form.confirm_pwd){
                this.isLoading = true;
                // 请求后台修改密码接口
                this.$store.dispatch('EditAdminPassword', {
                  token: true,
                  old_password: this.form.old_pwd,
                  password: this.form.new_pwd,
                  again_password: this.form.confirm_pwd
                }).then((res) => {
                  this.isLoading = false;
                  if(res.data.errcode==0){
                    this.$message({
                      message: '修改成功！',
                      type: 'success',
                      duration: 1000
                    });
                    this.dialogSwiperVisible = false;
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
                  message: '新密码与确认密码不一致！',
                  type: 'error',
                  duration: 1000
                });
              }
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
      this.getAdminInfo();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .system-account-box {
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background-color: #fff;
    .el-form-item__label {
      font-size: 16px;
      font-weight: normal;
    }
    .top-content-box {
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
        .right-search {
          width: 300px;
        }
      }
      .account-content {
        padding: 20px;
        .account-content-item {
          display: flex;
          align-items: center;
        }
      }
      .account-title {
        height: 48px;
        display: flex;
        align-items: center;
        background-color: #FAFAFA;
        p {
          padding-left: 10px;
          font-size: 16px;
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
         }
      }
    }
  }
</style>
