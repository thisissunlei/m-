<template>
  

<div class="m-calculator">
    <!--Header :openVisit="jumpVisit" title="新闻动态"/ -->
      <div v-if="!showComputer">
        <div>
            <p class="emit"><span>办公信息</span></p>

          <div class="u-input u-area" >
                    <p class="smal">办公商圈  <span class="sp">*</span> </p>
                        <input 
                        id="area1" 
                        type="text"  
                        name="input_area"  
                          v-model="areaValue1"
                        placeholder="请选择热门商圈"
                        readOnly="readOnly"
                        onfocus="this.blur()"
                        />
                        <p style="margin-right:0.12rem">> </p>
                        <input id="areaValue1"   type="hidden" />
                        <!-- <p class="mine mit"><span style="opacity:0.5">x</span></p> -->
          </div> 
          <div class="u-input u-area">
            <p class="smal">租货时长<span class="sp"> *</span> </p>
                <input 
                id="area" 
                type="text"  
                name="input_area"  
                  v-model="time"
                placeholder="请选择租赁时长"
                readOnly="readOnly"
                onfocus="this.blur()"
                class="activeinput"
                />
                <p style="margin-right:0.12rem">> </p>
                <input id="time" type="hidden" />
                <!-- <p class="mine mit"><span style="opacity:0.5">x</span></p>  -->
          </div> 
            
            <mt-field label="公司人数" class="star" type="number"  placeholder="请输入 "  :state='state'   v-model="visitData.number" @input="text">&nbsp; 人&nbsp;&nbsp;</mt-field>
            <span class="a1">*</span>
            <mt-field label="办公面积" type="number" placeholder="请输入 " :state='state1'  v-model="visitData.office">&nbsp; ㎡&nbsp;&nbsp;</mt-field>
            <span class="a2">*</span>
        
            
            
        </div>

        <div class="div">
            <p class="emit"><span>月支出费用</span></p>
            <mt-field label="月租金"  :disabled="switchOn" >{{month}}&nbsp;元</mt-field>
            <mt-field label="物业费"  :disabled="switchOn" >{{property}}&nbsp;元</mt-field>
            <mt-field label="保洁费" :disabled="switchOn" >{{cleanup}}&nbsp;元</mt-field>
            <mt-field label="水电网费"  :disabled="switchOn" >{{whater}}&nbsp;元</mt-field>

        </div>

        <div class="div"> 
            <p class="emit"><span>前期投入费用</span></p> 
            <mt-field label="装修费" :disabled="switchOn"  >{{renovation}}&nbsp;元</mt-field>
            <mt-field label="办公家具"  :disabled="switchOn" >{{furniture}}&nbsp;元</mt-field>
            <mt-field label="打印机" :disabled="switchOn" >{{printing}}&nbsp;元</mt-field>
            <mt-field label="投影仪"  :disabled="switchOn" >{{projection}}&nbsp;元</mt-field>
            
        </div>
        <div style="text-align:center;">
              <mt-button type="primary" @click="subcompute" class="btn">计算</mt-button>
        </div>
        <p class="small">依据城市核心商圈的费用平均值进行估算，您也可手动填写。</p>
        <!-- <CommonDialog :personName="commonDialogName" :message="CommonDialogMessage" :isShow="isShowCommon" :dialogType="commonDialogType" :Close="commonDialogClose" /> -->
      </div>  



      <div v-if="showComputer" class="m-computer">
        
        <div class="computy_car auto">
          <img src="./image/peo.png" alt="">
        </div>

        <div class="counmt auto">
          人均每月&nbsp;{{peopleCapita}}&nbsp;元
        </div>

        <div class="auto fead" style="text-align:center">
          您 每 月 需 支 出 {{totalMonth}} 元
        </div>
            <div v-swiper:myMemberSwiper="swiperMemberOption" >
              <p class="pel">
                氪空间{{name}}办公区
              </p>
              <h4>
                人 均 每 月 最 低 {{selectCbdData.seatPrice}} 元 
              </h4>
              <div class="swiper-wrapper swiper-cal">
                  <a
                    v-for="(item,index) in swiperData"
                    v-show='swiperData.length'
                    :key="index"
                    :href="`/community/${item.id}${urlParams}`"
                    class="swiper-slide"
                  >
                  <div class="image" :style="`background-image:url(${item.imageUrl})` " name=“images”>
                    
                  </div>
                    <div class="text">{{item.name}}</div>
                  </a>
                  
                </div>
                </div>
                <div style="text-align:center" class="biginput">
                  <input type="tel" placeholder="请输入手机号"    v-model="mobile"  @blur="onPhoneChange" class="tel">  
                  <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
                </div>  
                
              <div style="text-align:center;">
                  <mt-button type="primary" @click="onSubmit" class="btn">马上预约参观</mt-button>
              </div>
              <!-- <Visit 
                  :Close="jumpVisit"
                  v-if="isVisit"
              /> -->
              <!-- <Dialog :personName="dialogName" :isShow="isShow" :dialogType="dialogType" :Close="dialogClose"/> -->
      </div>




        
          




      
      
</div>
</template>
<script>
import Thousand from "../../util/thousand";
// import Header from "~/components/Header";
// import $http from "~/plugins/http";
// import Dialog from '~/components/Dialog';
// import CommonDialog from '~/components/CommonDialog';
// import Visit from "~/components/Visit";
import dateFormat from '../../util/dateFormat';
export default {
  components: {
    // Header,
    // Visit,
    // Dialog,
    // CommonDialog
  },

  data () {
    return {
      isVisit: false,
      showComputer: false,
      switchOn: true,
      areaValue1: "",
      cmtVosLength: "123123",
      state: "",
      state1: "",
      cityId: [],
      price: '',
      dayPrice: '',
      urlParams:'',
      time:"",
      selectCbdData: {},
      visitParams: {
        from: '',
        terminal: ''
      },
      username:'客户', 
      isShowCommon:false,
      dialogName:'',
      dialogType:'',
      visitData: {
        community: [],
        cityId: "11",
        time: "",
        number: "",
        month: "",
        office: "",
        property: "",
        cleanup: "",
        whater: "",
        renovation: "",
        furniture: "",
        printing: "",
        projection: ""
      },
      swiperMemberOption: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true
      },
      mobile: "",
      ifError: false,
      isVisit: false,
      isShow:false,
      errorMessage: "",
      swiperData:[],
      commonDialogType:'',
      commonDialogName:'',
      CommonDialogMessage:'',
    };
  },
  created () { },
  computed: {
    params: function () {
      let query = this.$route.query;
      var params = [];
      if (Object.keys(query).length > 0) {
        for (var queryItem in query) {
          if (queryItem != 'cityId') {
            params.push(`${queryItem}=${query[queryItem]}`);
          }
        }
        return `?${params.join('&')}`;
      } else {
        return '';
      }

    },

    //月租金
    month () {
      return this.visitData.number && this.dayPrice ? (this.visitData.office * this.dayPrice * 30) : '请输入 ';
    },
    // 物业费
    property () {
      return this.visitData.number && this.dayPrice ? (this.dayPrice * 2 * this.visitData.office) : '请输入 ';
    },
    // 保洁费
    cleanup () {
      return this.visitData.number && this.dayPrice ? (3000) : '请输入 ';

    },
    //水电网费
    whater () {
      return this.visitData.number && this.dayPrice ? (1000) : '请输入 ';
    },
    // 装修费
    renovation () {
      return this.visitData.number && this.dayPrice ? (this.visitData.office * 1000) : '请输入 ';
    },
    //办公家具
    furniture () {
      return this.visitData.number && this.dayPrice ? (this.visitData.number * 1000) : '请输入 ';
    },
    //打印机
    printing () {
      return this.visitData.number && this.dayPrice ? 1500 : '请输入 ';
    },
    //投影仪
    projection () {
      return this.visitData.number && this.dayPrice ? 4000 : '请输入 ';
    },
    //月支出
    totalMonth () {
      return  Thousand(parseInt(this.month + this.property + this.cleanup + this.whater + ((this.renovation + this.furniture + this.printing + this.projection) / this.visitData.time))) ;
    },
    // 人均成本
    peopleCapita () {
      return  Thousand(parseInt( (this.month + this.property + this.cleanup + this.whater + ((this.renovation + this.furniture + this.printing + this.projection) / this.visitData.time)) / this.visitData.number)) ;
    },

  },

  watch: {
    areaValue1: {
      deep: true,
      handler: function (newProps, oldProps) {
        let cbdParams;
        var cityIndex;
        var cbdIndex;
        if (newProps && newProps.length > 0) {
          var cbdDom = document.getElementById('areaValue1');
          var cbdValues = cbdDom.value.split(',');
          // cbdParams=newProps;
          cityIndex = cbdValues[0];
          this.cityId = this.communityData[cityIndex].cityId;
          cbdIndex = cbdValues[1];
          // console.log(2222222,this.communityData[cityIndex].name, cbdValues);
          this.selectCbdData = this.communityData[cityIndex].protalsCbdVos[cbdIndex];
          this.name=this.communityData[cityIndex].name
          this.dayPrice = this.communityData[cityIndex].protalsCbdVos[cbdIndex].dayPrice;
          // console.log("dayPrice", this.dayPrice);
        } else {
          // cbdParams=oldProps;
        }

      }
    },
      time: {
        deep: true,
        handler: function (newProps, oldProps) {
          if (newProps && newProps.length > 0) {
            var timeId = document.getElementById('time');
            // console.log("999",timeId)
            var _this=this
            _this.visitData.time=timeId.value
          } else {
            // cbdParams=oldProps;
          }

        }
      }
  },
  mounted () {
    this.getComputer();
    // this.getParams();
    // this.onCountDetail();
    var data = [
      { id: 1, name: "1个月" },
      { id: 3, name: "3个月" },
      { id: 6, name: "6个月" },
      { id: 12, name: "1年" },
      { id: 24, name: "2年" },
      { id: 36, name: "3年" },
      { id: 48, name: "4年" },
      { id: 60, name: "5年" },
      { id: 120, name: "10年" }
    ];
    this.cityList = data;
    this.initArea(data);
  },
  methods: {
    test (val) {
      this.visitData.office = val * 12
    },

    commonDialogClose(){
      this.isShowCommon = !this.isShowCommon;
    },

    dialogClose(){
        if (this.isShow && (this.dialogType=='success' || this.dialogType == 'warn') ){
          location.href='/';
        }
        this.isShow = !this.isShow;
    },

    //SEM
    getParams(){
      var routeParams = this.$route;
      var urlFrom = routeParams.query.from;
      var urlTerminal = routeParams.query.terminal;
      var sessionFrom=sessionStorage.getItem("visitFrom");
      var sessionTerminal=sessionStorage.getItem("visitTerminal");
      if(sessionFrom && sessionTerminal){
          this.visitParams = {
              from:sessionFrom,
              terminal:sessionTerminal
          }
      }else if(urlFrom && urlTerminal){
          sessionStorage.setItem("visitFrom",urlFrom);
          sessionStorage.setItem("visitTerminal",urlTerminal);
          this.visitParams = {
              from:urlFrom,
              terminal:urlTerminal
          }
      }
    },
    GetQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        },
    onSubmit(){
        var _this=this;
        if(this.mobile=="" || !/^1[345678]\d{9}$/.test(this.mobile)){
                this.errorMessage="请输入正确的手机号码";
                this.ifError=true;
                setTimeout(function(){
                    _this.ifError=false;
                },1000)
                return 
        }
        this.disableSubmit = true;
        var submitData = Object.assign({},this.visitData);
        let form = {};
        form.username = '客户from计算器';
        form.mobilephone = this.mobile;
        
        form.cityId =this.cityId;
         //去参数
        // form.from_type = this.GetQueryString('source') || 'krspace_visit';
        form.from_type='krspace_visit';
        form.appionttime = dateFormat(new Date(),'YYYY-MM-dd');;
        form.promoCode = this.GetQueryString('key') || '';
        if(this.visitParams.from && this.visitParams.terminal){
            form.from = this.visitParams.from;
            form.terminal = this.visitParams.terminal;
        }
        
        this.$http.post('post-city-visit',form).then((res)=>{
                // console.log(res)
                this.isShow = true;
                this.disableSubmit = false;
                this.dialogName = this.username;
                this.dialogType = 'success';
                this.mobile='';
                // this.areaValue='';
                _taq.push({convert_id:"1597892806975534", event_type:"form"});
                _taq.push({convert_id:"1600058262413320", event_type:"form"});
                _taq.push({convert_id:"1602584012684340", event_type:"form"});
                _taq.push({convert_id:"1602492776885256", event_type:"form"});
                gdt('track', 'RESERVATION');
        }).catch((err)=>{
            if(err.code == -2){
                this.dialogType = 'warn';
            }else{
                this.dialogType = 'error';
            }

            this.isShow = true;
            this.dialogName = this.username;
            
        })
    },
    jumpVisit() {
      this.isVisit = !this.isVisit;
    },
    subcompute () {
      
      var communityData = Object.assign({}, this.selectCbdData);
      
      if(this.areaValue1 && this.time && this.visitData.number && this.visitData.office ){
          var swiperData = [];
          communityData.cmtVos.map((item, index) => {
          var swiperItem = {};
          swiperItem.name = item.communityName;
          swiperItem.id = item.id;
          swiperItem.imageUrl = item.homeImageUrl;
          swiperData.push(swiperItem)
              return item;
          });
          this.swiperData = swiperData;
          this.showComputer = true;
      }else{
        var _this = this;
        this.commonDialogType = 'warn';
        this.communityName = "提示";
        this.CommonDialogMessage = "请填写完整！";
        setTimeout(() => {
            _this.isShowCommon = true;
        }, 200);
        
      }
      
      
      
    },

    getComputer () {
      this.$http
        .get("get-comter")
        .then(res => {
          //计算商圈接口
          var communityData = Object.assign({}, res.data);
          // console.log("123", communityData.items);
          this.communityData = communityData.items;
          communityData.items.map((item, index) => {
            //更改城市字段
            item.name = item.cityName;
            item.id = index;
            // item.value = item.cityId;
            // item.label = item.cityName;
            var children = [];
            item.protalsCbdVos.forEach((items,itemIndex) => {
              if(items.dayPrice){
                items.name = items.cbdName;
                items.id = itemIndex;
                children.push(items);
              }
            });
            // item.protalsCbdVos.map((items, itemIndex) => {
            //   items.name = items.cbdName;
            //   items.id = itemIndex;
            //   return items;
            // });
            item.children = children;
            return item;
          });
          this.initArea1(communityData.items);
        })
        .catch(err => { });
    },

    initArea1 (LAreaData) {
      // console.log("larea", LAreaData);
      var area = new LArea();
      area.init({
        trigger: "#area1", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        valueTo: "#areaValue1", //选择完毕后id属性输出到该位置
        keys: { id: "id", name: "name" }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        type: 1, //数据源类型
        data: LAreaData //数据源
      });
    },

    initArea (LAreaData) {
      var area = new LArea();
      area.init({
        trigger: "#area", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        valueTo: "#time", //选择完毕后id属性输出到该位置
        keys: { id: "id", name: "name" }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        type: 1, //数据源类型
        data: LAreaData, //数据源
        flexNum: 1
      });
    },


    poqoweq () {
      this.totalMonth = parseInt();
      this.peopleCapita = Thousand(
        parseInt(this.totalMonth / this.visitData.number)
      );
      this.totalMonth = Thousand(this.totalMonth);
      this.isFormShow = false;
      this.isResultShow = true;
    },
  
    checkPhone () {
      var _this = this;
      if (this.mobile == "" || !/^1[345678]\d{9}$/.test(this.mobile)) {
        this.errorMessage = "请输入正确的手机号码";
        this.ifError = true;
        setTimeout(function () {
          _this.ifError = false;
        }, 1000);
      }
    },
    onPhoneChange () {
      this.checkPhone();
    },
    //办公面积
    text (val) {
      this.visitData.office = val * 12
    }

    //计算
    // onCalculation() {
    //   this.$refs["visitData"].validate(valid => {
    //     if (valid) {
    //       if (this.visitData.number > 10000 || this.visitData.office > 100000) {
    //         const title = "Title";
    //         const content =
    //           '<p style="font-size:16px;">老板您的公司规模庞大，我们将安排专人为您服务，请拨打400-807-3636</p>';
    //         this.$Modal.warning({
    //           content: content,
    //           onOk: () => {
    //             this.Close && this.Close();
    //           }
    //         });
    //         return;
    //       }
    //       this.totalMonth = parseInt(
    //         this.visitData.month +
    //           this.visitData.property +
    //           this.visitData.whater +
    //           this.visitData.cleanup +
    //           (this.visitData.furniture +
    //             this.visitData.renovation +
    //             this.visitData.printing +
    //             this.visitData.projection) /
    //             this.visitData.time
    //       );
    //       this.peopleCapita = Thousand(
    //         parseInt(this.totalMonth / this.visitData.number)
    //       );
    //       this.totalMonth = Thousand(this.totalMonth);
    //       // this.isFormShow = false;
    //       // this.isResultShow = true;
    //     } else {
    //     }
    // });
    // }
  }
};
</script>
<style lang="less" >
.sp,.a1,.a2{
font-family:PingFang-SC-Regular;
font-size: 16px;
color: #FF6868;
line-height: 20px;
}
.a1{
  position: absolute;
  top: 1.7rem;
  left:0.74rem;
}
.a2{
  position: absolute;
  top: 2.13rem;
  left: 0.74rem;
}

.bottom{
  width: 2.4rem;
  height: 1.86rem;
  img{width: 100%;}
}
.m-calculator {
  padding-top: 0.5rem;
  .swiper-cal{
    width:100%;
    height:1.86rem;
    align-items: center;
      .swiper-slide{
        width: 2rem;
        height: 1.55rem;
        border-radius:0.1rem;
        overflow: hidden; 
   
        .image{
          width: 100%;
          height: 100%;
          position: relative;
         background-repeat: no-repeat;
         background-size: cover;
        }
      
      }   
       .swiper-slide-active{
        transform:scale(1.05,1.1);
      }
      .text{
        position: absolute;
        background: rgba(0,0,0,0.80);
        height: 0.4rem;
        width: 100%;
        line-height: 0.4rem;
        bottom:0;
        text-align: center;
        color:#fff;
        font-size: 15px;
      }
   
    
  }
  .auto {
    margin: 0.14rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fead {
    font-family: PingFang-SC-Regular;
    font-size: 0.15rem;
    color: #666666;
    margin-top: 0.1rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem dashed #ffdfdfdf;
  }
  .computy_car {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .counmt {
    width: 2.18rem;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    font-family: PingFang-SC-Medium;
    font-size: 0.17rem;
    // transform: rotate(-180deg);
    background-image: url("./image/jx.png");
    background-size: 100% 100%;
    color: #ff9d00;
  }

  .pel {
    font-family: PingFang-SC-Regular;
    font-size: 0.15rem;
    color: #666666;
    line-height: 0.2rem;
    border: none;
    text-align: center;
   
  }
  h4 {
    font-family: PingFang-SC-Medium;
    font-size: 0.18rem;
    color: #333333;
    line-height: 0.24rem;
    text-align: center;
     padding: 0.1rem;
  }
  .btn {
    width: 3rem;
    height: 0.5rem;
    margin: 0.1rem 0 0.4rem 0;
    background-image: linear-gradient(46deg, #f79c1c 0%,  #fad961 100% );
    box-shadow: 0 5px 15px #f79c1c;
    border-radius: 0.08rem;
  }
  .tel {
    background: #F3F3F3;
    border-radius: 0.08rem;
    width: 3rem;
    height: 0.5rem;
    display: inline-block;
    border: none;
    font-family: PingFang-SC-Regular;
    font-size: 0.16rem;
    margin-top: 0.2rem;
    text-align: center;
    color: #CCCCCC;
    outline: none;
  }
  .biginput {
    position: relative;
    .u-error-tip {
      height: 0.46rem;
      line-height: 0.46rem;
      position: absolute;
      background: rgba(35, 36, 40, 0.9);
      border-radius: 0.08rem;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #ffffff;
      padding: 0 0.32rem;
      display: inline-block;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -0.13rem;
      white-space: nowrap;
    }
  }
}


.mine {
  background: red;
  width: 18px;
  height: 18px;
  line-height: 18px;
  padding-left: 6px;
  color: white;
  border-radius: 50%;
  position: absolute;
  top: 0.15rem;
  right: 0.2rem;
}
.mit {
  opacity: 0;
}
.emit {
  height: 0.3rem;
  line-height: 0.3rem;
  background: #eeeeee;
  padding-left: 0.04rem;
  padding-top: 0.03rem;

  span {
    font-family: PingFang-SC-Regular;
    border-left: 0.02rem solid yellow;
    display: inline-block;
    font-size: 0.14rem;
    line-height: 0.18rem;
    padding-left: 0.05rem;
    height: 0.18rem;
    color: #666666;
  }
}

.u-input,.u-area {
  width: 100%;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0.08rem 0.06rem;
  .smal {
  font-family: PingFang-SC-Regular;
  font-size: 0.145rem !important;
  
}
  input{
    width: 40%;
    border: none;
    outline: none;
    text-align: right;
    margin-left:0.82rem; 
  }
  input::-webkit-input-placeholder {
  font-size: 0.14rem;  
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder位置  */
  text-align: right;
}
  .u-triangle {
    width: 0;
    height: 0;
    border: 0.07rem solid transparent;
    border-top-color: #bbbbbb;
    position: absolute;
    right: 0.18rem;
    top: 0.23rem;
  }
 
  ::-moz-placeholder {
    color: #cccccc;
  }
  ::-webkit-input-placeholder {
    color: #cccccc;
  }
  :-ms-input-placeholder {
    color: #cccccc;
  }
  .smal {
    margin-left: 0.05rem;
    font-size: 0.15rem;
  }
}
.mint-cell-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input.mint-cell-value {
    width: 40% !important;
    height: 100%;
    background: red;
  }
  .mint-field-core {
    // padding-left: 1.82rem;
    text-align: right;
  }
}

.div {
  .mint-field-core {
    width: 0;
    display: none;
  }
  .mint-field-other {
    text-align: right;
    color: #aab2bd;
    margin-right: 0.1rem;
  }
  .mint-cell-value {
    text-align: right;
    display: block;
  }
}

input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder位置  */
  text-align: right;
}
.tel::-webkit-input-placeholder {
  text-align: center;
}
.small{
  width: 100%;
  padding: 0 0  0.1rem ;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

   