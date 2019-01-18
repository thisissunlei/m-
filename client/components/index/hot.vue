<template>
<a href="" class="hot-wrapper" :style="data.homeUrl?{'background': 'url('+data.homeUrl+') no-repeat center center'}:''">
  <div class="hot-box">
    <div class="cmt-name">{{data.cmtName}}</div>
    <div class="cmt-tabs" v-if="!!data.featureLableList && data.featureLableList.length > 0">
      <ul class="clearfix">
        <li class="fl" v-for="(item, i) in data.featureLableList" :key="i" >{{item}}</li>
      </ul>
    </div>
    <div v-swiper:mySwiper="swiperOption" >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in data.cmtSeatPriceList" :key="index">
        <img :src="item.seatPicUrl">
        <div class="cmt-text">
          <div class="name">{{item.seatName}}</div>
          <span class="num"><i>¥</i>{{item.discountPrice || item.price}}</span>
          <span class="text">{{$t('indexPriceType.long')}}</span>
        </div>
      </div>
    </div>
  </div>

  </div>
</a>
</template>

<script>
import swiper from '../common/swiper.vue'
export default {
  props: ['data', 'query'],
  components: {
    swiper
  },
  data(){
    return {
      swiperOption: {
          // 设定为true时，active slide会居中，而不是默认状态下的居左
          centeredSlides:false,
          slidesPerView:2.5,
        }
    }
  },
  mounted(){
    // console.log('000999',this.data)
  }
}
</script>

<style lang="less" soped>
.hot-wrapper {
  display: block;
  width: 375px;
  height: 281px;
  margin-bottom: 20px;
  background: url('../../assets/images/banner/b1-cn.jpg');
  .hot-box {
    padding: 16px 0 19px 16px;
    height: 281px;
    background-size: cover;
    .cmt-name {
      margin-bottom: 6px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 24px;
    }
    .cmt-tabs {
      margin-bottom: 50px;
      li{
        margin-right: 8px;
        padding: 2px 6px;
        font-family: PingFang-SC-Regular;
        font-size: 12px;
        color: #DFDFDF;
        letter-spacing: 0;
        background: rgba(0,0,0,0.60);
        border-radius: 14px;
      }
    }

        .swiper-slide {
          width: 139px;
          height: 145px;
          margin-right: 10px;
          border: 1px solid #F3F3F3;
          border-radius: 4px;
          background: #FFFFFF;
          img {
            width: 100%;
            height: 80px;
          }
          .cmt-text {
            padding: 8px 0 10px 8px;
            display: block;
            .name {
              margin-bottom: 6px;
              font-family: PingFang-SC-Medium;
              font-size: 15px;
              color: #333333;
              letter-spacing: 0;
            }
            .num {
              display: inline-block;
              margin-right: 8px;
              font-family: PingFang-SC-Medium;
              font-size: 16px;
              color: red;
              letter-spacing: 0;
              line-height: 20px;
            }
            .text {
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              color: #3F3F3F;
              letter-spacing: 0;
              line-height: 20px;
            }
          }
        }


  }
}

</style>

<style>
  /* .swiper-wrapper {
    width: auto!important;
  } */
</style>
