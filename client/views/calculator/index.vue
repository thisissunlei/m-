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
                 @click="clickModelTime"
                class="activeinput"
                />
                <p style="margin-right:0.12rem">> </p>
                <input id="time" type="hidden" />
                <!-- <p class="mine mit"><span style="opacity:0.5">x</span></p>  -->
          </div> 
            
            <mt-field label="公司人数" class="star" type="number"  placeholder="请输入 "  :state='state'   v-model="visitData.number" @input="text" name="number">&nbsp; 人&nbsp;&nbsp;</mt-field>
            <span class="a1">*</span>
            <mt-field label="办公面积" type="number" placeholder="请输入 " :state='state1'  v-model="visitData.office" name="office">&nbsp; ㎡&nbsp;&nbsp;</mt-field>
            <span class="a2">*</span>
        
            
            
        </div>

        <div class="div">
            <p class="emit"><span>月支出费用</span></p>
            <mt-field label="月租金"  :disabled="switchOn" name="month">{{month}}&nbsp;元</mt-field>
            <mt-field label="物业费"  :disabled="switchOn" name="property">{{property}}&nbsp;元</mt-field>
            <mt-field label="保洁费" :disabled="switchOn" name="cleanup">{{cleanup}}&nbsp;元</mt-field>
            <mt-field label="水电网费"  :disabled="switchOn" name="whater">{{whater}}&nbsp;元</mt-field>

        </div>

        <div class="div"> 
            <p class="emit"><span>前期投入费用</span></p> 
            <mt-field label="装修费" :disabled="switchOn"  name="renovation">{{renovation}}&nbsp;元</mt-field>
            <mt-field label="办公家具"  :disabled="switchOn" name="furniture">{{furniture}}&nbsp;元</mt-field>
            <mt-field label="打印机" :disabled="switchOn" name="printing">{{printing}}&nbsp;元</mt-field>
            <mt-field label="投影仪"  :disabled="switchOn" name="projection">{{projection}}&nbsp;元</mt-field>
            
        </div>
        <div style="text-align:center;">
              <!-- <mt-button type="primary" @click="subcompute" class="btn" name="compute">计算</mt-button> -->
        </div>
        <p class="small">依据城市核心商圈的费用平均值进行估算，您也可手动填写。</p>

        
        <mt-popup v-model="areaVisible" position="bottom" class="area-class">
          <p>
            <span @click="cancel">取消</span>
            <span class="btns" @click="confirm">确定</span>
          </p>
          <mt-picker :slots="timeList" @change="onValuesChange"></mt-picker>
          <!-- <mt-picker :slots="areaCommunity" @change="onValuesChange"></mt-picker> -->
        </mt-popup>
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
                  <!-- <mt-button type="primary" @click="onSubmit" class="btn">马上预约参观</mt-button> -->
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

  import { mapState,mapActions } from 'vuex'
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
      timeList: [
        { id: 1, name: "1个月"},
        { id: 3, name: "3个月" },
        { id: 6, name: "6个月" },
        { id: 12, name: "1年" },
        { id: 24, name: "2年" },
        { id: 36, name: "3年" },
        { id: 48, name: "4年" },
        { id: 60, name: "5年" },
        { id: 120, name: "10年" }
      ],
      areaVisible: false,
      communityData:{},

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
  asyncData({ route, store }) {
      return Promise.all([
        store.dispatch('getComter',{}),
      ])
  },
  computed: {
    ...mapState([
      'calculator'
    ]),
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

    console.log('communityData=======',this.calculator.communityData)

  },
  methods: {
    // initArea1 (LAreaData) {
    //   // console.log("larea", LAreaData);
    //   var area = new LArea();
    //   area.init({
    //     trigger: "#area1", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
    //     valueTo: "#areaValue1", //选择完毕后id属性输出到该位置
    //     keys: { id: "id", name: "name" }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
    //     type: 1, //数据源类型
    //     data: LAreaData //数据源
    //   });
    // },

    // initArea (LAreaData) {
    //   var area = new LArea();
    //   area.init({
    //     trigger: "#area", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
    //     valueTo: "#time", //选择完毕后id属性输出到该位置
    //     keys: { id: "id", name: "name" }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
    //     type: 1, //数据源类型
    //     data: LAreaData, //数据源
    //     flexNum: 1
    //   });
    // },
    subcompute(){

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
    //办公面积
    text (val) {
      this.visitData.office = val * 12
    },
    onValuesChange(picker,value){
      console.log('onValuesChange',picker,value)
    },
    clickModelTime(){
      console.log('blur=====')
      this.areaVisible = true;
      var modifiedRow = {
        flex: 1,
        values: ['1','2','3','4'],
        textAlign: "center"
      };
      this.timeList.splice(0, 1, modifiedRow);
    },
    confirm(){
      this.areaVisible = false;
      console.log('confirm')
    },
    cancel(){
      this.areaVisible = false;
    }
  }
};
</script>
<style scoped lang="less">
  @import "https://unpkg.com/mint-ui/lib/style.css";
.area-class {
  width: 100% !important;
  p {
    height: 1.066rem;
    padding: 0.165rem;
    line-height: 0.736rem;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border: 1px solid #e6e6e6;
    span {
      padding: 0 0.5rem;
    }
    .btns {
      color: #f7b500;
      font-size: 14px;
    }
  }
}
</style>
<style lang="less" >
  .sp,.a1,.a2{
  font-family:PingFang-SC-Regular;
  font-size: 16px;
  color: #FF6868;
  line-height: 20px;
  }
  .a1{
    position: absolute;
    top: 140px;
    left:78px;
  }
  .a2{
    position: absolute;
    top: 190px;
    left: 78px;
  }

  .bottom{
    width: 240px;
    height: 186px;
    img{width: 100%;}
  }
  .m-calculator {
    .swiper-cal{
      width:100%;
      height:186px;
      align-items: center;
        .swiper-slide{
          width: 200px;
          height: 155px;
          border-radius:10px;
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
          height: 40px;
          width: 100%;
          line-height: 40px;
          bottom:0;
          text-align: center;
          color:#fff;
          font-size: 15px;
        }
     
      
    }
    .auto {
      margin: 14px auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .fead {
      font-family: PingFang-SC-Regular;
      font-size: 15px;
      color: #666666;
      margin-top: 10px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ffdfdfdf;
    }
    .computy_car {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .counmt {
      width: 218px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      // transform: rotate(-180deg);
      background-image: url("./image/jx.png");
      background-size: 100% 100%;
      color: #ff9d00;
    }

    .pel {
      font-family: PingFang-SC-Regular;
      font-size: 15px;
      color: #666666;
      line-height: 20px;
      border: none;
      text-align: center;
     
    }
    h4 {
      font-family: PingFang-SC-Medium;
      font-size: 18px;
      color: #333333;
      line-height: 24px;
      text-align: center;
       padding: 10px;
    }
    .btn {
      width: 30px;
      height: 50;
      margin: 10px 0 40px 0;
      background-image: linear-gradient(46deg, #f79c1c 0%,  #fad961 100% );
      box-shadow: 0 5px 15px #f79c1c;
      border-radius: 8px;
    }
    .tel {
      background: #F3F3F3;
      border-radius: 8px;
      width: 3px;
      height: 50px;
      display: inline-block;
      border: none;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      margin-top: 20px;
      text-align: center;
      color: #CCCCCC;
      outline: none;
    }
    .biginput {
      position: relative;
      .u-error-tip {
        height: 46px;
        line-height: 46;
        position: absolute;
        background: rgba(35, 36, 40, 0.9);
        border-radius: 8px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        padding: 0 32px;
        display: inline-block;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -13px;
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
    top: 15px;
    right: 20px;
  }
  .mit {
    opacity: 0;
  }
  .emit {
    height: 30px;
    line-height: 30px;
    background: #eeeeee;
    padding-left: 4px;
    padding-top: 4px;

    span {
      font-family: PingFang-SC-Regular;
      border-left: 2px solid yellow;
      display: inline-block;
      font-size: 14px;
      line-height: 18px;
      padding-left: 5px;
      height: 18px;
      color: #666666;
    }
  }

  .u-input,.u-area {
    width: 100%;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:8px 6px;
    min-height: 48px;
    .smal {
    font-family: PingFang-SC-Regular;
    font-size: 14.5px !important;
    
  }
    input{
      width: 40%;
      border: none;
      outline: none;
      text-align: right;
      margin-left:82px; 
    }
    input::-webkit-input-placeholder {
    font-size: 14px;  
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder位置  */
    text-align: right;
  }
    .u-triangle {
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-top-color: #bbbbbb;
      position: absolute;
      right: 18px;
      top: 23px;
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
      margin-left: 5px;
      font-size: 15px;
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
      margin-right: 10px;
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
    padding: 0 0  10px ;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

   