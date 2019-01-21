<template>
    <div v-if="showComputer" class="m-computer">
      <div class="computy_car auto">
        <img src="./image/peo.png" alt>
      </div>

    <div class="counmt auto">人均每月&nbsp;{{peopleCapita}}&nbsp;元</div>

    <div class="auto fead" style="text-align:center">您 每 月 需 支 出 {{totalMonth}} 元</div>
    <div v-swiper:myMemberSwiper="swiperMemberOption">
      <p class="pel">氪空间{{name}}办公区</p>
      <h4>人 均 每 月 最 低 {{selectCbdData.seatPrice}} 元</h4>
      <div class="swiper-wrapper swiper-cal">
        <a
          v-for="(item,index) in swiperData"
          v-show="swiperData.length"
          :key="index"
          :href="`/community/${item.id}${urlParams}`"
          class="swiper-slide"
        >
          <div class="image" :style="`background-image:url(${item.imageUrl})` " name="“images”"></div>
          <div class="text">{{item.name}}</div>
        </a>
      </div>
    </div>
    <!-- <div style="text-align:center" class="biginput">
      <input type="tel" placeholder="请输入手机号" v-model="mobile" @blur="onPhoneChange" class="tel">
      <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
    </div> -->

    <div style="text-align:center;">
      <!-- <mt-button type="primary" @click="onSubmit" class="btn">马上预约参观</mt-button> -->
    </div>
  </div>
    <!-- 计算结果 end-->
</template>
<script>
export default {
    data(){
        return {
            // 计算结果
        showComputer:true,
        peopleCapita:"17665",
        totalMonth:"388,428",
        swiperMemberOption: {//轮播
          slidesPerView: 1.5,
          spaceBetween: 20,
          centeredSlides: true
        },
        name:"北京市",
        selectCbdData: {seatPrice :'2200'},
        swiperData:[{
          id:1,
          name:"国海中贸",
          imageUrl:"https://img.krspace.cn/community/photos/0/2018/11/07/183631477h1OxCJI.jpg"
        },{
          id:2,
          name:"望京中贸",
          imageUrl:"https://img.krspace.cn/community/photos/0/2018/11/07/183631477h1OxCJI.jpg"
        },{
          id:3,
          name:"望京中贸",
          imageUrl:"https://img.krspace.cn/community/photos/0/2018/11/07/183631477h1OxCJI.jpg"
        }],
        // 计算结果 end
        }
    }
}
</script>
<style lang="less" scoped>
    .m-calculator {
  padding-top: 50px;
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
    width: 300px;
    height: 50px;
    margin: 10px 0 40px 0;
    background-image: linear-gradient(46deg, #f79c1c 0%,  #fad961 100% );
    box-shadow: 0 5px 15px #f79c1c;
    border-radius: 8px;
  }
  .tel {
    background: #F3F3F3;
    border-radius: 8px;
    width: 300px;
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
      line-height: 46px;
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
// 轮播

</style>


