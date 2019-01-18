<template>
  <div class="order-box">
    <div class="order-title">{{$t("visitInfo.title")}}</div>
    <div class="tip">
      <p>{{$t("visitInfo.discriptFirstLine")}}</p>
      <p>{{$t("visitInfo.discriptSecondLine")}}</p>
      <p>{{$t("visitInfo.discriptThreeLine")}}</p>
    </div>
    <div class="order-content">
      <div class="name">
        <span class="star">*</span>
        <span class="text">{{$t("visitInfo.userName")}}</span>
      </div>
      <div class="u-input">
        <input type="text" placeholder="客户" v-model="username" >
      </div>

      <div class="name">
        <span class="star">*</span>
        <span class="text">{{$t("visitInfo.mobileNumber")}}</span>
      </div>
      <div class="u-input">
        <input type = "text" v-model = "mobile" onkeyup="value=value.replace(/[^\d]/g,'') " placeholder="请输入您的联系方式"  maxlength=11 @blur="checkPhone">
      </div>

      <div class="name">
        <span class="text">{{$t("visitInfo.community")}}</span>
      </div>
      <div class="u-input">
        <input
          id="area"
          type="text"
          name="input_area"
          placeholder="社区"
          v-model="areaValue"
          readonly="readOnly"
          readonlyunselectable="on"
          @click="clickModelCity"
        >
      </div>
      <div class="visit-submit" @click="submit">{{$t("visitInfo.confirmText")}}</div>
    </div>
    <mt-popup v-model="areaVisible" position="bottom" class="area-class">
      <p>
        <span @click="cancel">取消</span>
        <span class="btn" @click="confirm">确定</span>
      </p>
      <mt-picker :slots="areaCommunity" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import {mapState} from "vuex"; 
export default {
  props: {
    Close: Function,
    Info: Object
  },
  data() {
    return {
      language: "",
      username: "",//用户名
      mobile: "",//手机号码
      errorUserName: false,//判断用户名
      errorMobile:false,//判断联系方式
      areaVisible: false,//是否拉起参观地点
      cityIndex:'',//选中的城市索引
      cityName : '',//选择的城市名称
      communityName : '',//选中的社区名称
      communityId:'',//获取的社区id
      areaCommunity: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
        },
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ]
    };
  },
  computed: {
    areaValue() {
      return this.$store.getters.computerDefault;
    },
    ...mapState({
      'visitCityList' : state=>state.visit.visitCityList,
      'cmtCityList' : state=>state.visit.cmtCityList
    })
  },
  watch: {
      '$route'(to, from) {
        this.language = this.$route.query.lang == "en" ? 1 : 0;
      },
      language(){
        this.$store.dispatch("getDefaultCityList", { language: this.language });
        this.$store.dispatch("getCmtCityList", { language: this.language });
      }
    },
  mounted() {
      this.language = this.$route.query.lang == "en" ? 1 : 0;
        // window.addEventListener("popstate", this.onBrowserBack, false);
  },
  // destroyed: function() {
  //       var that = this;
  //       window.onscroll = "";
  //       window.removeEventListener("popstate", this.onBrowserBack, false);
  //   },
  methods: {
    // 增加安卓体验
    // onBrowserBack() {
    //     if (this.areaVisible) {
    //         this.areaVisible = false;
    //         window.history.pushState({ page: 1 }, "title 1");
    //     }
    //   },
    //点击按钮显示下方的下拉框
    clickModelCity() {
      this.areaVisible = true;
      this.$store.commit('setVisitCityList');
      // window.history.pushState({ page: 1 }, "title 1");
      var modifiedRow = {
        flex: 1,
        values: this.visitCityList,
        textAlign: "center"
      };
      this.areaCommunity.splice(0, 1, modifiedRow);
    },
    // 获取社区并更新
    onValuesChange(picker, values) {
      let one = values[0];
      var index = this.areaCommunity[0].values.indexOf(one);
      if (index >= 0 && this.areaCommunity[0].values.length > 0) {
       var modifiedRow = this.cmtCityList[
          index
        ].communityList.map((val, index) => {
          return val.communityName;
        });
        picker.setSlotValues(1, modifiedRow)
      }
      this.cityName  = values[0];
      this.cityIndex = index;
      this.communityName = values[1];
    },
    getCommunityId(){
      this.communityId = this.cmtCityList[
          this.cityIndex
        ].communityList.map((val, index) => {
          return val.communityId;
        })[0]
    },
    //确认地址
    confirm() {
      var data = this.cityName + this.communityName;
      this.$store.commit("modifydefaultCity", data);
      this.getCommunityId();
      this.areaVisible = false;
    },
    // 取消确认地址
    cancel() {
      this.areaVisible = false;
      // history.go(-1);
    },
    checkPhone() {
      var _this = this;
      if (this.mobile == "" || !/^1[345678]\d{9}$/.test(this.mobile)) {
        Toast('请输入正确的手机号码');
        return true;
      }
      return false;
    },
    // 提交
    submit() {
      if(this.checkPhone()){
        return false
      }
      var nowDate = new Date();
      var appionttime = nowDate.getFullYear() + "-" + nowDate.getMonth()+1 +"-" + nowDate.getDate()
      var data = {
        username : this.username || "客户",
        mobilephone : this.mobile,
        appionttime ,
        communityId : this.communityId
      }
      this.$store.dispatch("getVisitInfo", data);
      // console.log()
    }
  }
};
</script>

<style lang="less" scoped>
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
    .btn {
      color: #f7b500;
      font-size: 14px;
    }
  }
}
.order-box {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 375px;
  padding: 20px 0 0 30px;
  z-index: 210;
  background: #fff;
  .order-title {
    margin-bottom: 11px;
    font-size: 20px;
    font-family: PingFang-SC-Semibold;
    color: #333333;
    line-height: 22px;
  }
  .tip {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .order-content {
    font-family: PingFang-SC-Regular;
    .name {
      margin-bottom: 10px;
      .star {
        width: 9px;
        height: 20px;
        margin-left: -15px;
        color: #ff6868;
        line-height: 20px;
      }
      .text {
        margin-left: 6px;
        font-size: 16px;
        color: #333333;
        line-height: 20px;
      }
    }
    .u-input {
      width: 315px;
      height: 50px;
      margin-bottom: 20px;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 4px;
      input {
        margin: 15px 0 0 10px;
        font-size: 16px;
        color: #cccccc;
        line-height: 20px;
      }
    }
  }
  .visit-submit {
    width: 315px;
    height: 50px;
    line-height: 50px;
    margin: 10px 0px 54px 0px;
    background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
    border-radius: 4px;
    font-family: PingFang-SC-Regular;
    font-size: 18px;
    color: #624d17;
    text-align: center;
  }
}
</style>

