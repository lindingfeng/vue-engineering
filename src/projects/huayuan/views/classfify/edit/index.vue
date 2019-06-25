<template >
  <div class="edit-classfify-box">
    <div class="add-classfify-title">编辑分类</div>
    <div class="base-info-form">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="科目类型" prop="parent" :rules="{required: true, message: '科目类型不能为空', trigger: ['blur', 'change']}">
          <el-select size="mini" :disabled="disabled" v-model="form.parent" placeholder="请选择所属科目类型" style="width: 240px;">
            <el-option :disabled="index==0" v-for="(item, index) in form.parentArr" :key="index" :label="item.class_name" :value="item.pid">{{item.class_name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类别" prop="child" :rules="{required: true, message: '项目类别不能为空', trigger: 'blur'}">
          <el-input size="mini" v-model="form.child" maxlength="5" placeholder="请输入项目类别" style="width: 240px;" @blur="classfifyBlur"></el-input>
          <span style="font-size: 16px;color: #ccc;margin: 0 10px;">{{form.child.length}}/5</span>
        </el-form-item>
        <el-form-item label="项目图标" required>
          <div v-if="form.logo" class="spec-image-box">
            <img :src="form.logo" style="width: 110px;height: 110px;" />
            <div class="close-box" @click="deleteImg()">
              <i class="el-icon-circle-close"></i>
            </div>
          </div>
          <div v-else>
            <el-upload
              class="upload-image"
              action="https://api.mei57.com/admin/File/icon"
              accept="image/jpeg,image/png,image/jpg"
              :data="{type: 'classfiftIco', key: 0}"
              name="file"
              :show-file-list="false"
              :on-error="handleAvatarError"
              :on-success="handleAvatarSuccess">
              <div style="width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;">
                <img src="@@/images/camera.png" alt="">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="是否展示" required>
          <el-radio-group v-model="form.resource">
            <el-radio label="1">展示</el-radio>
            <el-radio label="2">不展示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="submit-box">
            <el-button type="primary" :loading="loading" @click.native="setClassfifyFunc">保 存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editClassfify',
    data() {
      return {
        form: {
          parent: '',
          parentArr: [],
          child: '',
          resource: '1',
          class_name: '',
          logo: ''
        },
        loading: false,
        disabled: false
      }
    },
    methods: {
      // 获取主分类列表
      getClassfifyList(){
        this.$store.dispatch('GetClassfify').then((res) => {
          if(res.data.errcode==0){
            this.form.parentArr = res.data.data;
            this.form.parent = this.$route.params.pid;
            this.form.class_id = this.$route.params.class_id;
            this.form.child = this.$route.params.class_name;
            this.form.logo = this.$route.params.icon;
            this.form.resource = this.$route.params.state.toString();
          }else {
            this.$message({
              message: res.data.errstr+'（'+res.data.errcode+'）',
              type: 'error',
              duration: 1000
            });
          }
        }).catch((err) => {
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
      // 分类失去焦点事件
      classfifyBlur(){
        this.form.child = this.form.child.replace(/(^\s*)|(\s*$)/g,"");
      },
      // 保存分类
      setClassfifyFunc(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.form.logo){
              let data = {
                type: 2,
                class_id: this.form.class_id,
                class_name: this.form.child,
                icon: this.form.logo,
                token: true,
                pid: this.form.parent,
                state: this.form.resource
              };
              this.$store.dispatch('SetClassfify', data).then((res) => {
                // console.log(res);
                if(res.data.errcode==0){
                  this.$message({
                    message: '修改分类成功！',
                    type: 'success',
                    duration: 1000
                  });
                  setTimeout(()=>{
                    this.$router.go(-1);
                  }, 500)
                }else {
                  this.$message({
                    message: res.data.errstr+'（'+res.data.errcode+'）',
                    type: 'error',
                    duration: 1000
                  });
                }
              }).catch((err) => {
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
                message: '请上传项目图标！',
                type: 'error',
                duration: 1000
              });
            }
          }
        });
      },
      // 上传类别图标失败
      handleAvatarError(e){
        this.$message({
          message: '上传失败!',
          type: 'error',
          duration: 1000
        });
      },
      // 上传类别图标成功
      handleAvatarSuccess(response){
        if(response.errcode == 0){
          this.form.logo = response.data.img;
        }else {
          this.$message({
            message: response.errstr+'（'+response.errcode+'）',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 删除已上传的图标
      deleteImg(){
        this.form.logo = '';
      }
    },
    mounted(){
      if(this.$route.params.pid==0){
        this.disabled = true;
      }
      this.getClassfifyList();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .edit-classfify-box {
    background-color: #fff;
    .el-form-item__label {
      font-size: 16px;
      font-weight: normal;
    }
    .add-classfify-title {
      padding: 20px;
      margin-bottom: 30px;
      font-size: 22px;
      color: #333333;
    }
    .base-info-form {
      padding-bottom: 30px;
      .spec-image-box {
        position: relative;
        width: 110px;
        height: 110px;
        margin-top: 10px;
        border: 1px solid #eeeeee;
      }
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
      .submit-box {
        margin-top: 20px;
        button {
          width: 240px;
          background-color: #8FB739 !important;
          border-color: #8FB739 !important;
        }
      }
    }
  }
</style>
