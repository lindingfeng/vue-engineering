<template>
  <div class="system-info-box" style="padding:20px;">
    <div class="add-shop-box">
      <div class="top-title">首页信息</div>
      <!-- 基本信息 -->
      <div class="base-info-form">
        <div class="base-info-title">基本信息</div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="首页简介" prop="desc" :rules="{required: true, message: '项目简介不能为空', trigger: 'blur'}">
            <el-input type="textarea" v-model="form.desc" style="width: 340px;" placeholder="输入项目简介..." @blur="descBlur"></el-input>
          </el-form-item>
          <el-form-item label="首页轮播" required>
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(图片大小不超过2MB；格式PNG、JPG；第一张默认为主图)</p>
              <div class="spec-image-upload-box">
                <div v-for="(bannerItem, bannerIdx) in form.bannerArr" :key="bannerIdx" class="spec-image-box" style="margin-right: 10px;" @mouseover="showImageBg(bannerIdx)" @mouseout="hideImageBg">
                  <img :src="bannerItem" alt="">
                  <div v-if="form.mouse==bannerIdx&&form.mouse!=0" class="push-top">
                    <p @click="setMainImg(bannerIdx)">设置为首图</p>
                  </div>
                  <div class="close-box" @click="deleteImg('banner', bannerIdx)">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-if="form.showBanner">
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/file"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    :data="{type: 'banner', key: 0}"
                    name="file"
                    :show-file-list="false"
                    :on-progress="handleAvatarProgress"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess">
                    <div style="width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;">
                      <img src="@@/images/camera.png" alt="">
                    </div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="首页视频" required>
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(视频格式为mp4格式)</p>
              <div class="spec-image-upload-box">
                <div v-if="form.specVideo" class="spec-image-box" style="margin-right: 10px;">
                  <video :src="form.specVideo" style="width: 110px;height: 110px;"></video>
                  <div class="close-box" @click="deleteImg('video')">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-else>
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/index_video"
                    accept="video/mp4"
                    :data="{type: 'video', key: 0}"
                    name="file"
                    :show-file-list="false"
                    :on-progress="handleAvatarProgress"
                    :on-error="handleAvatarError"
                    :on-success="handleAvatarSuccess">
                    <div style="width: 110px;height: 110px;display: flex;justify-content: center;align-items: center;">
                      <img src="@@/images/camera.png" alt="">
                    </div>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 保存/草稿箱 -->
    <div class="save-drafts-box">
      <el-button class="save" type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'systerInfo',
    data() {
      return {
        form: {
          showBanner: true,
          bannerArr: [],
          mouse: -1,
          showDetail: true,
          detailArr: [],
          specVideo: '',
          desc: ''
        }
      }
    },
    methods: {
      // 获取首页信息
      getIndexInfo(){
        this.$store.dispatch('GetIndexInfo', {
          token: true
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            if(res.data.data.brief&&res.data.data.img&&res.data.data.video){
              this.form.desc = res.data.data.brief;
              this.form.bannerArr = res.data.data.img;
              this.form.specVideo = res.data.data.video;
              // if(this.form.bannerArr.length>=6){
              //   this.form.showBanner = false;
              // }
            }
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
      // 防止简介输入首尾空格
      descBlur(){
        this.form.desc = this.form.desc.replace(/(^\s*)|(\s*$)/g,"");
      },
      // 图片鼠标移入事件
      showImageBg(index){
        this.form.mouse = index;
      },
      // 图片鼠标移出事件
      hideImageBg(){
        this.form.mouse = -1;
      },
      // 设置banner首图
      setMainImg(index){
        let data = this.form.bannerArr[index];
        this.form.bannerArr.splice(index, 1);
        this.form.bannerArr.unshift(data);
      },
      // 上传中
      handleAvatarProgress(e){
        console.log('上传中', e);
      },
      // 上传错误
      handleAvatarError(e){
        console.log(e);
        this.$message({
          message: '上传失败!',
          type: 'error',
          duration: 1000
        });
      },
      // 上传成功
      handleAvatarSuccess(response){
        console.log('上传成功', response);
        if(response.errcode == 0){
          if(response.data.type == 'video'){
            this.form.specVideo = response.data.img;
          }else if(response.data.type == 'banner'){
            this.form.bannerArr.push(response.data.img);
          }
        }else {
          this.$message({
            message: response.errstr+'（'+response.errcode+'）',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 删除照片
      deleteImg(type, index){
        console.log(type, index)
        if(type=='video'){
          this.form.specVideo = '';
        }else if(type=='compareVideo'){
          this.form.compareVideo = '';
        }else if(type=='compareImage'){
          this.form.compareImage = '';
        }else if(type == 'banner'){
          this.form.bannerArr.splice(index,1);
        }else if(type == 'detail'){
          this.form.detailArr.splice(index,1);
          if(this.form.detailArr.length<3){
            this.form.showDetail = true
          }else {
            this.form.showDetail = false
          }
        }
      },
      // 商品信息验证
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.form.bannerArr.length>0&&this.form.specVideo){
              this.setIndexInfo();
            }else {
              this.$message({
                message: '请上传首页轮播图或首页视频！',
                type: 'error',
                duration: 1000
              });
            }
          }else {
            this.$message({
              message: '请填写完整商品所需信息！',
              type: 'error',
              duration: 1000
            });
          }
        });
      },
      // 添加商品
      setIndexInfo(){
        this.$store.dispatch('SetIndexInfo', {
          token: true,
          brief: this.form.desc,
          img: this.form.bannerArr,
          video: this.form.specVideo
        }).then((res) => {
          if(res.data.errcode==0){
            this.$message({
              message: '保存成功!',
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
      }
    },
    mounted(){
      this.getIndexInfo();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .system-info-box {
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-form-item__label {
      font-size: 16px;
      font-weight: normal;
    }
    .el-upload--picture-card {
      width: 110px !important;
      height: 110px!important;
      line-height: 120px !important;
    }
    .el-upload-list--picture-card {
      li {
        width: 110px !important;
        height: 110px!important;
      }
    }
    .el-input-group__prepend {
      padding: 0 12px;
    }
    .el-textarea__inner {
      height: 100px;
      resize:none;
    }


    .add-shop-box {
      padding: 20px;
      background-color: #fff;
      .top-title {
        margin-bottom: 30px;
        font-size: 22px;
        color: #333333;
      }
      .base-info-title {
        padding: 10px 20px;
        margin: 50px 0 10px 0;
        font-size: 18px;
        color: #333333;
        background-color: #FAFAFA;
      }
      .close-box {
        position: absolute;
        top: -5px;
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
      .base-info-form {
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
        .span-label {
          margin: 0 4px;
          font-size: 14px;
          line-height: 14px;
          color: #008FFE;
          cursor: pointer;
        }
        .spec-big-box {
          margin-bottom: 15px;
        }
        .spec-image-upload-box {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          /*overflow: hidden;*/
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
      }
    }
    .save-drafts-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      background-color: #ffffff;
      button {
        margin: 0 20px;
      }
      .save {
        background-color: #8FB739;
        border-color: #8FB739;
      }
    }
  }
</style>
