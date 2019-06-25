<template>
  <div class="add-shop" style="padding:20px;">
    <div class="add-shop-box">
      <div class="top-title">{{goods_id?'编辑':'添加'}}项目</div>
      <!-- 基本信息 -->
      <div class="base-info-form">
        <div class="base-info-title">基本信息</div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="项目名称" prop="name" :rules="{required: true, message: '项目名称不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model="form.name" maxlength="15" style="width: 240px;" placeholder="输入项目名称，可输入15个字符"></el-input>
          </el-form-item>
          <el-form-item label="项目简介" prop="desc" :rules="{required: true, message: '项目简介不能为空', trigger: 'blur'}">
            <el-input type="textarea" v-model="form.desc" maxlength="28" style="width: 340px;" placeholder="输入项目简介，最多可输入28个字符"></el-input>
          </el-form-item>
          <el-form-item label="项目banner" required>
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
                <!--<div style="margin-left: 20px;">{{num}}%</div>-->
              </div>
            </div>
          </el-form-item>
          <el-form-item label="科目类型" prop="region1" :rules="{required: true, message: '科目类型不能为空', trigger: ['blur', 'change']}">
            <el-select size="mini" v-model="form.region1" placeholder="请选择所属科目类型" style="width: 240px;" @change="parentChange">
              <el-option v-for="(item, index) in form.parentArr" :key="index" :label="item.class_name" :value="item.pid">{{item.class_name}}</el-option>
            </el-select>
            <span class="span-label" @click="goAddClassfify">新建科目类型</span>
          </el-form-item>
          <el-form-item label="项目类别" prop="region2" :rules="{required: true, message: '项目类别不能为空', trigger: ['blur', 'change']}">
            <el-select size="mini" v-model="form.region2" placeholder="请选择项目类别" style="width: 240px;">
              <el-option v-for="(item, index) in form.childArr" :key="index" :label="item.class_name" :value="item.class_id">{{item.class_name}}</el-option>
            </el-select>
            <span class="span-label" @click="goAddClassfify">新建项目类别</span>
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
                <!--<div style="margin-left: 20px;">{{num}}%</div>-->
              </div>
            </div>
          </el-form-item>
          <el-form-item label="对比效果">
            <div class="pro-banner">
              <p style="font-size: 16px;color: #999999;">(可上传图片或视频，大小不超过2MB)</p>
              <div>
                <el-radio v-model="form.fileType" label="1">图片</el-radio>
                <el-radio v-model="form.fileType" label="2">视频</el-radio>
              </div>
              <div v-if="form.fileType==1" class="spec-image-upload-box">
                <div v-if="form.compareImage" class="spec-image-box" style="margin-right: 10px;">
                  <img :src="form.compareImage" style="width: 110px;height: 110px;" />
                  <div class="close-box" @click="deleteImg('compareImage')">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-else>
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/file"
                    accept="image/jpeg,image/png,image/jpg"
                    :data="{type: 'compareImage', key: 0}"
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
              <div v-else-if="form.fileType==2" class="spec-image-upload-box">
                <div v-if="form.compareVideo" class="spec-image-box" style="margin-right: 10px;">
                  <video :src="form.compareVideo" style="width: 110px;height: 110px;"></video>
                  <div class="close-box" @click="deleteImg('compareVideo')">
                    <i class="el-icon-circle-close"></i>
                  </div>
                </div>
                <div v-else>
                  <el-upload
                    class="upload-image"
                    action="https://api.mei57.com/admin/File/video"
                    accept="video/mp4"
                    :data="{type: 'compareVideo', key: 0}"
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
          <el-form-item label="项目价格" prop="new_price" :rules="{required: true, message: '项目价格不能为空', trigger: 'blur'}">
            <div>
              <el-input size="mini" v-model="form.new_price" maxlength="10" placeholder="0.00" @keyup.native="priceKeyup(0, $event)" @blur="priceBlur(0)" style="width: 240px;">
                <template slot="prepend">￥</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div>
              <div class="assemble-box">
                <el-radio v-model="form.speChecked" label="2" @change="radioChange">拼团</el-radio>
                <el-radio v-model="form.speChecked" label="3" @change="radioChange">集赞</el-radio>
              </div>
              <div v-if="form.speChecked!=1" class="spec-table-box no-spec">
                <div class="top-content-box">
                  <div v-if="form.speChecked==2" class="assemble">拼团价格</div>
                  <div v-if="form.speChecked==3" class="assemble">集赞价格</div>
                  <div v-if="form.speChecked==2" class="assemble">拼团人数</div>
                  <div v-if="form.speChecked==3" class="assemble">集赞人数</div>
                  <!--<div class="assemble">返佣</div>-->
                </div>
                <div class="center-content-box">
                  <el-form-item prop="assemble_price" :rules="{required: true, message: '', trigger: 'blur'}" style="margin-bottom: 0;width: 180px;text-align: center;">
                    <el-input size="mini" v-model="form.assemble_price" placeholder="0.00" @keyup.native="priceKeyup(1, $event)" @blur="priceBlur(1)" style="width: 120px;"></el-input>
                  </el-form-item>
                  <el-form-item prop="assemble_number" :rules="{required: true, message: '', trigger: 'blur'}" style="margin-bottom: 0;width: 180px;text-align: center;">
                    <el-input size="mini" v-model="form.assemble_number" :maxlength="form.speChecked==2?1:4" placeholder="人数" @keyup.native="peopleKeyup($event)" style="width: 120px;"></el-input>
                  </el-form-item>
                </div>
              </div>
              <el-button v-if="form.speChecked!=1" type="info" size="small" style="margin-top: 12px;" @click="clearFunc">不拼团不集赞</el-button>
            </div>
          </el-form-item>
          <el-form-item label="项目原价" prop="old_price" :rules="{required: true, message: '项目原价不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model="form.old_price" maxlength="10" placeholder="0.00" @keyup.native="priceKeyup(3, $event)" @blur="priceBlur(3)" style="width: 240px;">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="项目返佣" prop="goods_reward" :rules="{required: true, message: '项目返佣不能为空', trigger: 'blur'}">
            <el-input size="mini" v-model="form.goods_reward" maxlength="10" placeholder="0.00" @keyup.native="priceKeyup(4, $event)" @blur="priceBlur(4)" style="width: 240px;">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <div class="base-info-title">项目详情</div>
          <el-form-item label="项目详情"required>
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
    <!-- 保存/草稿箱 -->
    <div class="save-drafts-box">
      <el-button class="save" type="primary" @click="save">保 存</el-button>
      <!--<el-button class="drafts" type="info">草稿箱</el-button>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addEdit',
    data() {
      return {
        goods_id: '',
        class_id: '',
        type: 1,
        form: {
          name: '',
          showBanner: true,
          bannerArr: [],
          mouse: -1,
          showDetail: true,
          detailArr: [],
          region1: '',
          region2: '',
          parentArr: [],
          childArr: [],
          upDown: '1',
          specVideo: '',
          compareVideo: '',
          compareImage: '',
          showIco: false,
          resource: '',
          desc: '',
          old_price: '',
          new_price: '',
          assemble_price: '',
          assemble_number: '',
          assemble_commission: '',
          goods_reward: '',
          spec: [],
          specKey: [],
          specArr: [],
          speChecked: '1',
          specImg: false,
          showSpec: false,
          fileType: '1'
        },
        parentArr: [],
        childArr: [],
        num: 0
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
            let data = res.data.data;
            let form = {
              name: data.goods_name,
              showBanner: data.banner.length<6?true:false,
              bannerArr: data.banner,
              mouse: -1,
              showDetail: data.details.length<3?true:false,
              detailArr: data.details,
              region1: '',
              region2: '',
              parentArr: [],
              childArr: [],
              upDown: ''+data.status,
              specVideo: data.goods_video,
              compareVideo: data.contrast_type==2&&data.contrast?data.contrast:'',
              compareImage: data.contrast_type==1&&data.contrast?data.contrast:'',
              desc: data.brief,
              old_price: data.original_price,
              new_price: data.price,
              assemble_price: data.group_price,
              assemble_number: data.group_num,
              // assemble_commission: data.group_state==2?data.boss_reward:'',
              goods_reward: data.goods_reward,
              spec: [],
              specKey: [],
              specArr: [],
              speChecked: data.group_state.toString(),
              specImg: false,
              showSpec: false,
              fileType: data.contrast_type.toString()
            };
            // 判断是否有规格
            if(data.goods_specs){
              let specItem = [
                {
                  key: '',
                  value: []
                }
              ];
              for(let i=0;i<data.goods_specs.length;i++){
                specItem[0].value.push({
                  name: data.goods_specs[i]
                });
              }
              form.spec = specItem
            }
            if(this.parentArr.length>0){
              form.parentArr = this.parentArr;
              for(let i=0;i<this.parentArr.length;i++){
                if(this.parentArr[i].pid == data.p_class_id){
                  form.region1 = this.parentArr[i].pid;
                  this.class_id = data.class_id;
                  this.getChildClassfify(this.parentArr[i].pid);
                  break;
                }
              }
            }else {
              this.$message({
                message: '获取科目类别失败，请刷新页面重试!',
                type: 'success',
                duration: 1000
              });
            }
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
      // 获取科目类别
      getParentClassfify(){
        this.$store.dispatch('GetShopClassfify').then((res) => {
          // console.log(res);
          if(res.data.errcode==0){
            if(this.goods_id){
              this.parentArr = res.data.data;
              this.getShopDetails();
            }else {
              this.form.parentArr = res.data.data;
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
      // 科目类别发生改变事件
      parentChange(e){
        console.log(e);
        this.getChildClassfify(e);
      },
      // 获取子类别
      getChildClassfify(pid){
        this.$store.dispatch('GetChildClassfify', {
          pid: pid
        }).then((res) => {
          // console.log(res);
          if(res.data.errcode==0){
            this.form.childArr = res.data.data;
            if(this.goods_id){
              for(let i=0;i<this.form.childArr.length;i++){
                if(this.form.childArr[i].class_id==this.class_id){
                  this.form.region2 = this.form.childArr[i].class_id;
                  break;
                }
              }
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
      // 前往添加科目类别/项目类型页面
      goAddClassfify(){
        this.$router.push({ path: '/shop/classfify/add'})
      },
      // 切换拼团和集赞
      radioChange(e){
        this.form.assemble_price = '';
        this.form.assemble_number = '';
      },
      // 重置拼团和集赞
      clearFunc(){
        this.form.speChecked = '1';
        this.form.assemble_price = '';
        this.form.assemble_number = '';
      },
      // 添加规格
      addSpec(){
        console.log(this.form.bannerArr)
        if(this.form.spec.length<1){
          this.form.spec.push({
            key: '',
            value: [
              {
                name: '',
                showUpload: 1,
                img: ''
              }
            ]
          })
        }else {
          this.$message({
            message: '最多只能添加1条项目规格',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 添加规格值得数量
      addSpecValue(e){
        // console.log(e);
        if(this.form.spec[e].value.length<7){
          this.form.spec[e].value.push({
            name: '',
            showUpload: 1,
            img: ''
          })
        }else {
          this.$message({
            message: '一个最多只能添加7个规格值',
            type: 'error',
            duration: 1000
          });
        }
      },
      // 规格名的change事件
      specKeyChange(index){
        if(this.form.spec[index].key){
          let now = this.form.spec[index].key;
          if(index != 0){
            for(let i=0;i<this.form.spec.length;i++){
              let has = this.form.spec[i].key;
              if(i != index && now == has){
                // console.log(now, has)
                this.form.spec[index].key = '';
                this.form.spec[index].value = [];
                this.$message({
                  message: '该规格名已存在！',
                  type: 'error',
                  duration: 1500
                });
                break;
              }
            }
          }
        }else {
          this.form.spec[index].value = [];
        }
        this.buildTable();
      },
      // 规格值的change事件
      specValueChange(parent, child){
        // 判断所填规格是否在当前规格中已存在
        let now = this.form.spec[parent].value[child].name;
        if(child != 0){
          for(let i=0;i<this.form.spec[parent].value.length;i++){
            let has = this.form.spec[parent].value[i].name;
            if(i != child && now == has){
              // console.log(now, has)
              this.form.spec[parent].value[child].name = '';
              this.$message({
                message: '该规格值已存在！',
                type: 'error',
                duration: 1500
              });
              break;
            }
          }
        }
        this.buildTable();
      },
      // 删除规格
      deleteSpec(index){
        this.form.spec.splice(index,1)
        this.buildTable();
      },
      // 删除规格值得数量
      deleteSpecValue(index, idx){
        this.form.spec[index].value.splice(idx,1);
        this.buildTable();
      },
      // 生成规格表
      buildTable(){
        let keyArr = [];
        let valueArr = [];
        // 筛选有规格值得规格
        for(let i=0;i<this.form.spec.length;i++){
          let value = [];
          for(let j=0;j<this.form.spec[i].value.length;j++){
            if(this.form.spec[i].value[j].name){
              value.push(this.form.spec[i].value[j].name);
            }
          }
          if(value.length>0){
            keyArr.push(this.form.spec[i].key);
            valueArr.push(value);
          }
        }
        // console.log(keyArr);
        // console.log(valueArr);
        // 匹配各类规格
        let spec = [];
        if(keyArr.length == 1){  // 一种规格
          for(let k=0;k<valueArr[0].length;k++){
            let item = {
              key: keyArr[0],
              spec: valueArr[0][k],
              specValue: [valueArr[0][k]],
              price: '',
              specArr: [
                {
                  name: keyArr[0],
                  val: valueArr[0]
                }
              ],
              assemble: {
                state: 1,
                price: '',
                number: '',
                commission: ''
              }
            }
            spec.push(item);
          }
          // console.log(spec);
          this.form.specKey = [keyArr[0]];
          this.form.specArr = spec;
        }else if(keyArr.length == 2){  // 两种规格
          for(let k=0;k<valueArr[0].length;k++){
            for(let h=0;h<valueArr[1].length;h++){
              let item = {
                key: keyArr[0]+','+keyArr[1],
                spec: valueArr[0][k]+','+valueArr[1][h],
                specValue: [valueArr[0][k], valueArr[1][h]],
                price: '',
                specArr: [
                  {
                    name: keyArr[0],
                    val: valueArr[0]
                  },
                  {
                    name: keyArr[1],
                    val: valueArr[1]
                  }
                ],
                assemble: {
                  state: 1,
                  price: '',
                  number: '',
                  commission: ''
                }
              }
              spec.push(item);
            }
          }
          // console.log(spec)
          this.form.specKey = [keyArr[0], keyArr[1]];
          this.form.specArr = spec;
        }else {
          this.form.specKey = [];
          this.form.specArr = [];
        }
      },
      // 只让1-9数字输入
      peopleKeyup(e){
        let reg = /^[0-9]{1,4}$/;
        if(!reg.test(this.form.assemble_number)){
          this.form.assemble_number = '';
        }
      },
      // 只让数字和.可以输入
      priceKeyup(index, e){
        if(index==0){
          this.form.new_price = e.target.value.replace(/[^\d.]/g, "");
        }else if(index==1) {
          this.form.assemble_price = e.target.value.replace(/[^\d.]/g, "");
        }else if(index==2) {
          this.form.assemble_commission = e.target.value.replace(/[^\d.]/g, "");
        }else if(index==3) {
          this.form.old_price = e.target.value.replace(/[^\d.]/g, "");
        }else if(index==4) {
          this.form.goods_reward = e.target.value.replace(/[^\d.]/g, "");
        }
      },
      // 验证价格是否符合价格格式
      priceBlur(index){
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(index==0){
          if(!reg.test(this.form.new_price)){
            this.form.new_price = '';
          }
        }else if(index==1) {
          if(!reg.test(this.form.assemble_price)){
            this.form.assemble_price = '';
          }
        }else if(index==2) {
          if(!reg.test(this.form.assemble_commission)){
            this.form.assemble_commission = '';
          }
        }else if(index==3) {
          if(!reg.test(this.form.old_price)){
            this.form.old_price = '';
          }
        }else if(index==4) {
          if(!reg.test(this.form.goods_reward)){
            this.form.goods_reward = '';
          }
        }

      },
      // 上传中
      handleAvatarProgress(e){
        console.log('上传中', e);
        // this.num = parseInt(e.loaded/e.total*100)
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
        // this.num = 0;
        console.log('上传成功', response);
        if(response.errcode == 0){
          if(response.data.type == 'video'){
            this.form.specVideo = response.data.img;
          }else if(response.data.type == 'compareVideo'){
            this.form.compareVideo = response.data.img;
          }else if(response.data.type == 'compareImage'){
            this.form.compareImage = response.data.img;
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
        }else if(type=='compareVideo'){
          this.form.compareVideo = '';
        }else if(type=='compareImage'){
          this.form.compareImage = '';
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
            message: '请上传项目banner图或项目详情图！',
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
            group_state: this.form.speChecked,
            class_id: this.form.region2,
            status: this.form.upDown,
            goods_reward: this.form.goods_reward
          };
          if(this.form.speChecked!=1){ // 参与拼团
            data.group_price = this.form.assemble_price;
            data.group_num = this.form.assemble_number;
            // if(this.form.speChecked==2){
            //   if(this.form.assemble_number>1 && this.form.assemble_number<6){
            //     data.group_num = this.form.assemble_number;
            //   }else {
            //     this.$message({
            //       message: '拼团人数不得小于2人，同时不得大于5人！',
            //       type: 'error',
            //       duration: 1000
            //     });
            //     return false;
            //   }
            // }else if(this.form.speChecked==3){
            //   if(this.form.assemble_number>9 && this.form.assemble_number<10000){
            //     data.group_num = this.form.assemble_number;
            //   }else {
            //     this.$message({
            //       message: '集赞人数不得小于10人，同时不得大于10000人！',
            //       type: 'error',
            //       duration: 1000
            //     });
            //     return false;
            //   }
            // }
            // data.boss_reward = this.form.assemble_commission;
          }
          if(this.form.specVideo){ // 商品小视频
            data.goods_video = this.form.specVideo;
          }
          if(this.form.fileType==1){
            if(this.form.compareImage){
              data.contrast = this.form.compareImage;
            }else {
              data.contrast = '';
            }
          }else if(this.form.fileType==2){
            if(this.form.compareVideo){
              data.contrast = this.form.compareVideo;
            }else {
              data.contrast = '';
            }
          }
          if(this.form.spec.length>0){
            let spec = [];
            for(let i=0;i<this.form.spec[0].value.length;i++){
              spec.push(this.form.spec[0].value[i].name);
            }
            data.goods_specs = spec;
          }
          if(this.goods_id){
            data.goods_id = this.goods_id;
          }
          console.log(data)
          this.$store.dispatch('AddShop', data).then((res) => {
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
                  this.$router.push({ path: '/shop/lists' })
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
      }
      this.getParentClassfify();
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
          /*min-height: 200px;*/
          padding: 10px 20px;
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
          width: 400px;
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
