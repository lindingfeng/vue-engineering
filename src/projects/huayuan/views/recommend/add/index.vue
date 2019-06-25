<template >
  <div class="recommend-add-box">
    <div class="big-box">
      <div class="title">添加热门项目</div>
      <div class="left-list-box">
        <el-scrollbar style="height:100%;">
          <div class="select-box">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="rule-form-box">
              <el-form-item label="项目类别" prop="region" :rules="{required: true, message: '项目类别不能为空', trigger: ['blur', 'change']}">
                <el-select size="mini" v-model="ruleForm.region" placeholder="请选择项目类别" style="width: 240px;" @change="selectChange">
                  <el-option v-for="(item, index) in ruleForm.childArr" :key="index" :label="item.class_name" :value="item.class_id">{{item.class_name}}</el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!-- 商品列表 -->
          <div class="shop-list-box">
            <div v-for="(item, index) in shopLists" :key="index" class="border-box">
              <div class="shop-list-item">
                <div class="shop-image">
                  <img :src="item.banner[0]" alt="">
                </div>
                <div class="shop-right">
                  <div>
                    <p class="shop-name">{{item.goods_name}}</p>
                    <p class="shop-classfify">{{item.class_name}}</p>
                  </div>
                  <div class="bottom-content">
                    <p class="shop-price">￥{{item.price}}</p>
                    <el-button type="primary" size="mini" @click="addToHot(index)">添加热门</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="shopLists.length==0" class="null-box">
              <img src="@@/images/null.png" alt="" />
              <p>暂无数据</p>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="right-list-box">
        <el-scrollbar style="height:90%;">
          <div class="right-list-item">
            <div class="right-list-item-title">
              <span class="one">热门项目</span>
              <!--<span class="two">热门项目至少需添加4个，默认前4个首页显示</span>-->
            </div>
          </div>
          <!-- 热门列表 -->
          <div class="hot-list-box">
            <div class="spec-image-upload-box">
              <div v-for="(bannerItem, bannerIdx) in bannerArr" :key="bannerIdx" class="spec-image-box" style="margin-right: 20px;" @mouseover="showImageBg(bannerIdx)" @mouseout="hideImageBg">
                <img :src="bannerItem.img" alt="">
                <div v-if="mouseIndex==bannerIdx&&mouseIndex!=0" class="push-top">
                  <p @click="setMainImg(bannerIdx)">置顶</p>
                </div>
                <div class="close-box" @click="deleteImg(bannerIdx)">
                  <i class="el-icon-circle-close"></i>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <div v-if="bannerArr.length>0" class="add-hot-btn">
          <el-button type="primary" size="small" :loading="isLoading" @click="addHotFunc">确认添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addHot',
    data() {
      return {
        ruleForm: {
          region: '',
          childArr: [],
          isLoading: false,
        },
        shopLists: [],
        bannerArr: [],
        mouseIndex: -1,
        currentPage: 1,
        isLoading: false
      }
    },
    methods: {
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
      // 获取某个子类下的商品
      getChildClassfifyShop(class_id){
        this.$store.dispatch('GetClassfifyShopListNoPage', {
          token: true,
          class_id: class_id
        }).then((res) => {
          // console.log(res);
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
      // select的change事件
      selectChange(e){
        // e为option的value的值
        // console.log(e)
        this.getChildClassfifyShop(e);
      },
      // 添加商品到热门
      addToHot(index){
        let goods_id = this.shopLists[index].goods_id;
        let isHas = false;
        for(let i=0;i<this.bannerArr.length;i++){
          if(this.bannerArr[i].goods_id == goods_id) {
            isHas = true;
            this.$message({
              message: '该商品已添加过了~',
              type: 'error',
              duration: 1000
            });
            break;
          }
        }
        if(!isHas){
          this.bannerArr.push({
            goods_id: goods_id,
            img: this.shopLists[index].banner[0]
          })
        }
      },
      // 图片鼠标移入事件
      showImageBg(index){
        this.mouseIndex = index;
      },
      // 图片鼠标移出事件
      hideImageBg(){
        this.mouseIndex = -1;
      },
      // 图片置顶
      setMainImg(index){
        let data = this.bannerArr[index];
        this.bannerArr.splice(index, 1);
        this.bannerArr.unshift(data);
      },
      // 删除照片
      deleteImg(index){
        this.bannerArr.splice(index,1);
      },
      // 添加热门商品
      addHotFunc(){
        let goods_id = [];
        for(let i=0;i<this.bannerArr.length;i++){
          goods_id.push(this.bannerArr[i].goods_id);
        }
        goods_id = goods_id.join(',');
        this.isLoading = true;
        this.$store.dispatch('AddDeleteHot', {
          token: true,
          type: 1,
          goods_id: goods_id
        }).then((res) => {
          this.isLoading = false;
          if(res.data.errcode==0){
            this.$message({
              message: '添加成功！',
              type: 'success',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push({ path: '/shop/recommend/lists' })
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
      }
    },
    mounted(){
      this.getChildClassfifyList()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .recommend-add-box {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 20px;
    background-color: #fff;
    /* 隐藏el-scrollbar的横向滚动条 */
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .null-box {
      padding-top: 100px;
      text-align: center;
      img {
        width: 100px;
      }
      p {
        font-size: 14px;
        color: #cccccc;
      }
    }
    .big-box {
      .title {
        padding: 20px;
        font-size: 22px;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
      }
      .left-list-box, .right-list-box {
        position: absolute;
        top: 65px;
        bottom: 0;
        border-right: 1px solid #eeeeee;
      }
      .left-list-box {
        left: 0;
        width: 400px;
        .select-box {
          .el-form-item {
            margin: 20px 0;
          }
          .rule-form-box {
            .el-form-item__label {
              font-size: 16px;
              font-weight: normal;
            }
          }
        }
        .shop-list-box {
          .border-box {
            position: relative;
            padding: 20px;
            border-bottom: 1px solid #eeeeee;
          }
          .border-box:first-child {
            border-top: 1px solid #eeeeee;
          }
          .shop-list-item {
            display: flex;
            align-items: center;
            .shop-image {
              width: 88px;
              height: 88px;
              margin-right: 10px;
              border: 1px solid #eeeeee;
              img {
                width: 86px;
                height: 86px;
              }
            }
            .shop-right {
              width: calc(100% - 90px);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 88px;
              /*background-color: #f00;*/
              p {
                font-size: 16px;
                line-height: 24px;
                color: #666666;
                word-break:keep-all;/* 不换行 */
                white-space:nowrap;/* 不换行 */
                overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
                text-overflow:ellipsis;
              }
              .shop-name {
                font-size: 17px;
                color: #333333;
              }
              .bottom-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .shop-price {
                  color: #FF0000;
                }
                button {
                  background-color: #8FB739;
                  border-color: #8FB739;
                }
              }
            }
          }
        }
      }
      .right-list-box {
        left: 400px;
        right: 0;
        .add-hot-btn {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 15px 0;
          text-align: center;
          button {
            background-color: #8FB739;
            border-color: #8FB739;
          }
        }
        .right-list-item {
          padding: 30px;
          .right-list-item-title {
            .one {
              font-size: 20px;
              color: #333333;
            }
            .two {
              font-size: 16px;
              color: #FF0000;
            }
          }
        }
        .hot-list-box {
          padding: 0 30px;
        }
        .spec-image-upload-box {
          display: flex;
          flex-wrap: wrap;
          .spec-image-box {
            position: relative;
            width: 110px;
            margin-bottom: 20px;
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
    }
  }
</style>
