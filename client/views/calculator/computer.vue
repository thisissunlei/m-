<template>
<div class="m-computer">
  <!-- Header :openVisit="jumpVisit" title="计算器"/-->
  <div class="computy_car auto">
    <img src="./image/peo.png" alt="">
  </div>
  <div class="counmt auto">
    人均每月{{capitaFix}}
  </div>
 <div class="auto fead" style="text-align:center">
   您每月需支出{{monthFix}}元
 </div>
      <div v-swiper:myMemberSwiper="swiperMemberOption" >
        <p class="pel">
          氪空间上海办公区
        </p>
        <h4>
          人均每月最低{{capitaFix}}元
        </h4>
                <div class="swiper-wrapper member-list">
                    <div class="swiper-slide member-item">
                        <div class="bottom" style="text-align:center">
                          <img class="head" src="/images/welcome/second-member.jpg" alt="联合办公众创空间共享办公"/>
                        </div>
                        
                    </div>
                    <div class="swiper-slide member-item">
                        <div class="bottom" style="text-align:center">
                          <img class="head" src="/images/welcome/forth-member.jpg"/>
                        </div>
                        
                    </div>
                    <div class="swiper-slide member-item">
                        <div class="bottom" style="text-align:center">
                          <img class="head" src="/images/welcome/first-member.jpg" alt="联合办公众创空间共享办公"/>
                        </div>
                    </div>
                    <div class="swiper-slide member-item">

                        <div class="bottom" style="text-align:center">
                          <img class="head" src="/images/welcome/third-member.jpg" alt="联合办公众创空间共享办公"/>
                        </div>
                        
                    </div>
                    
                </div>
              </div>
          <div style="text-align:center" class="biginput">
            <input type="tel" placeholder="请输入手机号"    v-model="mobile"  @blur="onPhoneChange" class="tel">  
            <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
          </div>  
          
         <div style="text-align:center;">
             <mt-button type="primary" @click="subcompute" class="btn">马上预约参观</mt-button>
        </div>
        <!--  <Visit 
            :Close="jumpVisit"
            v-if="isVisit"
        /> -->
</div>
</template>
<script>
import Thousand from "../../util/thousand";
// import Header from "~/components/Header";
// import $http from "~/plugins/http";
// import Visit from "~/components/Visit";
export default {
  components: {
    // Header,
    // Visit
  },
  data() {
    return {
      swiperMemberOption: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        centeredSlides: true
      },
      visitData: {
        community: [],
        cityId: "11",
        month: "",
        property: "",
        whater: "",
        cleanup: "",
        furniture: "",
        renovation: "",
        printing: "",
        projection: "",
        time: ""
      },
      mobile: "",
      ifError: false,
      isVisit: false,
      errorMessage: "",
      totalMonth: "6666666",
      peopleCapita: "8888888"
    };
  },
  created() {},
  computed: {
    //人均每月
    capitaFix: function() {
      return Thousand(this.peopleCapita);
    },
    //月总共支出
    monthFix: function() {
      return Thousand(this.totalMonth);
    }
  },
  mounted() {},
  methods: {
    jumpVisit() {
      this.isVisit = !this.isVisit;
    },
    //点击预约
    subcompute() {
      var _this = this;
      if (this.mobile == "" || !/^1[345678]\d{9}$/.test(this.mobile)) {
        this.errorMessage = "请输入正确的手机号码";
        this.ifError = true;
        setTimeout(function() {
          _this.ifError = false;
          _this.mobile = "";
        }, 1000);
        return;
      }
    },
    //输入手机号失去焦点事件
    checkPhone() {
      var _this = this;
      if (this.mobile == "" || !/^1[345678]\d{9}$/.test(this.mobile)) {
        this.errorMessage = "请输入正确的手机号码";
        this.ifError = true;
        setTimeout(function() {
          _this.ifError = false;
          _this.mobile = "";
        }, 1000);
      }
    },
    onPhoneChange() {
      this.checkPhone();
    }
  }
};
</script>
<style lang="less" >
.m-computer {
  padding-top: 0.5rem;
}
.auto {
  margin: 0.2rem auto;
}
.fead {
  font-family: PingFang-SC-Regular;
  font-size: 0.15rem;
  color: #666666;
  margin-top: 0.1rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.01rem solid #ffdfdfdf;
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
}
.btn {
  width: 3rem;
  height: 0.5rem;
  margin: 0.1rem 0 0.4rem 0;
  background-image: linear-gradient(46deg, #fad961 0%, #f79c1c 100%);
  box-shadow: 0 5px 15px #f79c1c;
  border-radius: 0.08rem;
}
.tel {
  background: #f3f3f3;
  border-radius: 0.08rem;
  width: 3rem;
  height: 0.5rem;
  display: inline-block;
  border: none;
  font-family: PingFang-SC-Regular;
  font-size: 0.16rem;
  color: #cccccc;
  margin-top: 0.2rem;
  text-align: center;
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
</style>

   