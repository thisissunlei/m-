<template>
<a :href="'//'+$store.state.common.origin+'/community/' + data.cmtId + $store.state.common.queryString" class="hot-wrapper">
  <div class="hot-bg"
  :style="data.homeUrl?'background:url('+data.homeUrl+'?x-oss-process=image/resize,h_843,w_1125,color_eeeeee,quality,q_80) center top / cover no-repeat' :''"></div>
  <!-- <div class="mark"></div>
  <div class="mark mark-btm"></div> -->
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
          <a href="#">
            <img :src="item.seatPicUrl" v-if="!!item.seatPicUrl">
            <img class="default-img" alt="" v-else>
            <div class="cmt-text">
              <div class="name">{{item.seatName}}</div>
              <span class="num"><i>¥</i>{{item.discountPrice || item.price}}</span>
              <span class="text">{{$t('indexPriceType.long')}}</span>
            </div>
          </a>
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
          centeredSlides:false,
          slidesPerView:2.5,
          slidesOffsetBefore:16,
          slidesOffsetAfter:6
        }
    }
  },
  mounted(){
  }
}
</script>

<style lang="less" soped>
.hot-wrapper {
  display: block;
  position: relative;
  width: 375px;
  height: 281px;
  overflow: hidden;
  margin-bottom: 20px;
  // background: url('../../assets/images/banner/b1-cn.jpg');
  .hot-bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -10;
    transform: scale(1.1);
    filter: blur(3px);
  }
  .mark {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      background: url("../../assets/images/hot-mark.png") center center no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      height: 86px;
      width: 100%;
      &.mark-btm {
        top: auto;
        bottom: 0;
        height: 60px;
        transform: rotateX(180deg);
      }
    }
  .hot-box {
    padding: 16px 0 19px 0;
    height: 281px;
    z-index: 20;
    background-size: cover;
    .cmt-name {
      padding-left: 16px;
      margin-bottom: 6px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      font-weight: bold;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 24px;
    }
    .cmt-tabs {
      padding-left: 16px;
      margin-bottom: 50px;
      ul{
        height: 21px;
      }
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
          width: 137px!important;
          height: 143px;
          margin-right: 10px;
          border-radius: 4px;
          overflow: hidden;
          background: #FFFFFF;
          a{
            display: block;
            width: 137px;
            height: 143px;
            .default-img {
              display: block;
              width: 137px;
              height: 80px;
              background: url("../../assets/images/bg.jpeg") center center no-repeat;
            }
          }
          img {
            width: 137px;
            height: 80px;
          }
          .cmt-text {
            padding: 0 0 10px 8px;
            .name {
              margin-bottom: 6px;
              font-size: 15px;
              font-weight: bold;
              color: #333333;
            }
            .num {
              display: inline-block;
              margin-right: 7px;
              font-size: 16px;
              color: red;
              line-height: 20px;
            }
            .text {
              font-size: 12px;
              color: #3F3F3F;
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
