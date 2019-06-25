<template>
  <div class="mall-add-shop" style="padding:20px;">
    <div class="add-shop-box">
      <div class="top-title">{{goods_id?'编辑':'添加'}}商品</div>
      <!-- 基本信息 -->
      <div class="base-info-form">
        <div class="base-info-title">基本信息</div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="商品名称" prop="name" :rules="{required: true, message: '商品名称不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model.trim="form.name" maxlength="15" style="width: 240px;" placeholder="输入商品名称，可输入15个字符"></el-input>
          </el-form-item>
          <el-form-item label="商品简介" prop="desc" :rules="{required: true, message: '商品简介不能为空', trigger: 'blur'}">
            <el-input type="textarea" v-model="form.desc" maxlength="28" style="width: 340px;" placeholder="输入商品简介，最多可输入28个字符"></el-input>
          </el-form-item>
          <el-form-item label="商品banner" required>
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(图片大小不超过2MB；格式PNG、JPG；最多上传6张；第一张默认为主图)</p>
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
          <el-form-item label="主图视频">
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(视频大小不超过2MB；格式为mp4格式)</p>
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
                    action="https://api.mei57.com/admin/File/video"
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
          <el-form-item label="是否上架" required>
            <el-radio-group v-model="form.upDown">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品价格" prop="new_price" :rules="{required: true, message: '商品价格不能为空', trigger: 'blur'}">
            <div>
              <el-input size="mini" v-model="form.new_price" maxlength="10" placeholder="0.00" @keyup.native="priceKeyup(0, $event)" @blur="priceBlur(0)" style="width: 240px;">
                <template slot="prepend">￥</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品原价" prop="old_price" :rules="{required: true, message: '商品原价不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model="form.old_price" maxlength="10" placeholder="0.00" @keyup.native="priceKeyup(3, $event)" @blur="priceBlur(3)" style="width: 240px;">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品库存" prop="stock" :rules="{required: true, message: '商品库存不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model="form.stock" maxlength="10" style="width: 240px;" placeholder="输入商品库存"  @keyup.native="stockKeyup($event)"></el-input>
          </el-form-item>
          <div class="base-info-title">商品详情</div>
          <el-form-item label="商品详情" required>
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(格式PNG、JPEG，最多上传3张)</p>
              <div class="spec-image-upload-box">
                <div v-for="(detaiItem, detaiIdx) in form.detailArr" :key="detaiIdx" class="spec-image-box" style="margin-right: 10px;">
                  <img :src="detaiItem" alt="">
                  <div class="close-box" @click="deleteImg('detail', detaiIdx)">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-if="form.showDetail">
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/file"
                    accept="image/jpeg,image/png,image/jpg"
                    multiple
                    :data="{type: 'detail', key: 0}"
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
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 保存 -->
    <div class="save-drafts-box">
      <el-button class="save" type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mallAddEdit',
    data() {
      return {
        goods_id: '',
        type: 1,
        form: {
          name: '',
          showBanner: true,
          bannerArr: [],
          mouse: -1,
          showDetail: true,
          detailArr: [],
          upDown: '1',
          specVideo: '',
          compareVideo: '',
          compareImage: '',
          desc: '',
          old_price: '',
          new_price: '',
          stock: ''
        }
      }
    },
    methods: {
      // 获取商品详情
      getShopDetails(){
        this.$store.dispatch('GetShopMallDetails', {
          token: true,
          goods_id: this.goods_id
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            let data = res.data.data;
            let form = {
              name: data.goods_name,
              showBanner: data.banner.length<6?true:false,
              bannerArr: data.banner,
              mouse: -1,
              showDetail: data.details.length<3?true:false,
              detailArr: data.details,
              upDown: ''+data.status,
              specVideo: data.goods_video,
              desc: data.brief,
              old_price: data.original_price,
              new_price: data.price,
              stock: data.stock
            };
            this.form = form;
            console.log(form)
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
      // 只让数字和.可以输入
      priceKeyup(index, e){
        if(index==0){
          this.form.new_price = e.target.value.replace(/[^\d.]/g, "");
        }else if(index==3) {
          this.form.old_price = e.target.value.replace(/[^\d.]/g, "");
        }
      },
      // 商品库存只让输入数字
      stockKeyup(e){
        this.form.stock = e.target.value.replace(/[^\d]/g, "");
      },
      // 验证价格是否符合价格格式
      priceBlur(index){
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(index==0){
          if(!reg.test(this.form.new_price)){
            this.form.new_price = '';
          }
        }else if(index==3) {
          if(!reg.test(this.form.old_price)){
            this.form.old_price = '';
          }
        }

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
            if(this.form.bannerArr.length==6){
              this.form.showBanner = false;
            }else if(this.form.bannerArr.length<6){
              this.form.bannerArr.push(response.data.img);
              if(this.form.bannerArr.length>=6){
                this.form.showBanner = false;
              }
            }else {
              this.form.showBanner = false;
            }

          }else if(response.data.type == 'detail'){
            if(this.form.detailArr.length==3){
              this.form.showDetail = false;
            }else if(this.form.detailArr.length<3){
              this.form.detailArr.push(response.data.img);
            }else {
              this.form.showDetail = false;
            }
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
        }else if(type == 'banner'){
          this.form.bannerArr.splice(index,1);
          if(this.form.bannerArr.length<6){
            this.form.showBanner = true
          }else {
            this.form.showBanner = false
          }
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
            this.addShop()
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
      addShop(){
        if(this.form.bannerArr.length==0 || this.form.detailArr.length==0){
          this.$message({
            message: '请上传商品banner图或商品详情图！',
            type: 'error',
            duration: 1000
          });
        }else {
          let data = {
            token: true,
            type: this.type,
            goods_name: this.form.name,
            brief: this.form.desc,
            banner: this.form.bannerArr,
            details: this.form.detailArr,
            price: this.form.new_price,
            original_price: this.form.old_price,
            status: this.form.upDown,
            stock: this.form.stock
          };
          if(this.form.specVideo){ // 商品小视频
            data.goods_video = this.form.specVideo;
          }
          if(this.goods_id){
            data.goods_id = this.goods_id;
          }
          console.log(data)
          this.$store.dispatch('AddEditMallShop', data).then((res) => {
            // console.log(res);
            if(res.data.errcode==0){
              if(this.goods_id){
                this.$message({
                  message: '编辑成功!',
                  type: 'success',
                  duration: 1000
                });
                setTimeout(()=>{
                  this.$router.go(-1);
                }, 500)
              }else {
                this.$message({
                  message: '添加成功!',
                  type: 'success',
                  duration: 1000
                });
                setTimeout(()=>{
                  this.$router.push({ path: '/mall/lists' })
                }, 500)
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
        }
      }
    },
    mounted(){
      if(this.$route.query.goods_id){
        this.goods_id = this.$route.query.goods_id;
        this.type = 2;
        this.getShopDetails();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .mall-add-shop {
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
        .spec-image-upload-box {
          display: flex;
          align-items: center;
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
        .spec-table-box {
          /*min-height: 200px;*/
          padding: 0 20px;
          border: 1px solid #ccc;
          .top-content-box, .center-content-box {
            display: flex;
            align-items: center;
            height: 36px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            .spec-key, .price-box, .assemble {
              width: 180px;
              font-size: 16px;
              line-height: 16px;
              color: #333333;
            }
            .line {
              width: 1px;
              margin-right: 10px;
              height: 20px;
              background-color: #CCCCCC;
            }
            .price-box {
              .star {
                color: #FF0000;
              }
            }
          }
          .center-content-box {
            height: 44px;
            .spec-key {
              font-size: 14px;
            }
            .line {
              margin-right: 62px;
              background-color: transparent;
            }
            .el-input__inner {
              text-align: center;
            }
            .el-form-item__error {
              display: none;
            }
          }
        }
        .spec-table-box.no-spec {
          width: 240px;
          min-height: auto;
          .center-content-box {
            border-bottom: 0;
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
