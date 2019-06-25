<template>
  <div class="add-shop" style="padding:20px;">
    <div class="add-shop-box">
      <div class="top-title">项目详情</div>
      <!-- 基本信息 -->
      <div class="base-info-form">
        <div class="base-info-title">基本信息</div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="项目名称">
            <div style="font-size: 16px;color: #333333;">{{form.goods_name}}</div>
          </el-form-item>
          <el-form-item label="项目简介">
            <div style="width: 500px;font-size: 16px;color: #333333;">{{form.brief}}</div>
          </el-form-item>
          <el-form-item label="项目banner">
            <div class="pro-banner">
              <div class="spec-image-upload-box">
                <div v-for="(bannerItem, bannerIdx) in form.banner" :key="bannerIdx" class="spec-image-box" style="margin-right: 10px;">
                  <img :src="bannerItem" alt="">
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="科目类型">
            <div style="font-size: 16px;color: #333333;">{{form.p_class_name}}</div>
          </el-form-item>
          <el-form-item label="项目类别">
            <div style="font-size: 16px;color: #333333;">{{form.class_name}}</div>
          </el-form-item>
          <el-form-item label="主图视频">
            <div class="pro-banner">
              <div class="spec-image-upload-box">
                <div v-if="form.goods_video" class="spec-image-box" style="margin-right: 10px;">
                  <video :src="form.goods_video" style="width: 110px;height: 110px;"></video>
                </div>
                <div v-else style="font-size: 16px;color: #FF0000;">管理员未上传视频</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="form.contrast" label="对比效果">
            <div style="margin-top: 10px;">
              <video v-if="form.contrast_type==2" :src="form.contrast" style="width: 110px;height: 110px;"></video>
              <img v-else-if="form.contrast_type==1" :src="form.contrast" style="width: 110px;height: 110px;" />
            </div>
          </el-form-item>
          <el-form-item label="是否上架">
            <div style="font-size: 16px;color: #333333;">{{form.status==1?'上架':'下架'}}</div>
          </el-form-item>
          <div class="base-info-title">价格规格</div>
          <el-form-item label="项目规格">
            <div class="spec-table-box">
              <div class="top-content-box">
                <div v-if="form.has_specs" class="spec-key">规格</div>
                <div class="price-box">
                  <!--<span class="star">*</span>-->
                  <span>价格(元)</span>
                </div>
                <div class="line"></div>
                <!--<el-checkbox v-model="form.showSpec">拼团</el-checkbox>-->
                <div v-if="form.group_state==1" class="assemble">-</div>
                <div v-if="form.group_state==1" class="assemble">-</div>
                <div v-if="form.group_state==2" class="assemble">拼团价格</div>
                <div v-if="form.group_state==3" class="assemble">集赞价格</div>
                <div v-if="form.group_state==2" class="assemble">拼团人数</div>
                <div v-if="form.group_state==3" class="assemble">集赞人数</div>
                <!--<div class="assemble">团长返佣(元)</div>-->
              </div>
              <div class="center-content-box">
                <div v-if="form.has_specs" class="spec-key">{{form.goods_specs}}</div>
                <div style="margin-bottom: 0;width: 180px;text-align: center;">{{'￥'+form.price}}</div>
                <!--<div class="line"></div>-->
                <div style="margin-bottom: 0;width: 180px;text-align: center;">{{form.group_state==2 || form.group_state==3?'￥'+form.group_price:'-'}}</div>
                <div style="margin-bottom: 0;width: 180px;text-align: center;">{{form.group_state==2 || form.group_state==3?form.group_num:'-'}}</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="项目原价">
            <div style="font-size: 16px;color: #333333;">￥{{form.original_price}}</div>
          </el-form-item>
          <el-form-item label="项目返佣">
            <div style="font-size: 16px;color: #333333;">￥{{form.goods_reward}}</div>
          </el-form-item>
          <div class="base-info-title">项目详情</div>
          <el-form-item label="项目详情">
            <div class="pro-banner">
              <div class="spec-image-upload-box">
                <div v-for="(detaiItem, detaiIdx) in form.details" :key="detaiIdx" class="spec-image-box" style="margin-right: 10px;">
                  <img :src="detaiItem" alt="">
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopDetail',
    data() {
      return {
        form: {
          goods_id: ''
        }
      }
    },
    methods: {
      // 获取商品详情
      getShopDetails(){
        this.$store.dispatch('ShopDetails', {
          token: true,
          goods_id: this.goods_id
        }).then((res) => {
          console.log(res);
          if(res.data.errcode==0){
            this.form = res.data.data;
            if(this.form.goods_specs){
              this.form.has_specs = true;
              this.form.goods_specs = this.form.goods_specs.join(',');
            }else {
              this.form.has_specs = false;
            }
            console.log(this.form)
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
      if(this.$route.query.goods_id){
        this.goods_id = this.$route.query.goods_id
        this.getShopDetails();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .add-shop {
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
        .spec-box {
          width: 100%;
          padding: 20px;
          /*min-height: 500px;*/
          border: 1px solid #CCCCCC;
          .spec-key-box, .spec-value-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            padding: 0 20px;
            background-color: #FAFAFA;
            .spec-item-left {
              display: flex;
              flex-wrap: wrap;
              /*align-items: center;*/
              .spec-key {
                font-size: 16px;
                color: #333333;
                margin-right: 20px;
              }
            }
            .spec-item-right {
              width: 30px;
              height: 30px;
              .el-icon-circle-close {
                font-size: 30px;
                color: #CCCCCC;
              }
            }
          }
          .spec-value-box {
            height: auto;
            background-color: #fff;
            .spec-item-left {
              align-items: flex-start;
            }
          }
          .add-spec-box {
            display: flex;
            align-items: center;
            height: 50px;
            background-color: #FAFAFA;
            padding-left: 20px;
          }
        }
        .spec-table-box {
          width: 500px;
          /*min-height: 200px;*/
          padding: 10px 20px 0;
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
            border-bottom: 0;
            .spec-key {
              font-size: 14px;
            }
            .line {
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
          width: 400px;
          min-height: auto;
          .center-content-box {
            border-bottom: 0;
          }
        }
      }
    }
  }
</style>
