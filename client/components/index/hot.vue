<template>
<a href="" class="hot-wrapper" :style="{'background': 'url('+data.homeUrl+') no-repeat center center'}">
  <div class="hot-box">
    <div class="cmt-name">{{data.cmtName}}</div>
    <div class="cmt-tabs">
      <ul class="clearfix" v-if="!!data.featureLableList && data.featureLableList.length > 0">
        <li class="fl" v-for="(item, i) in data.featureLableList" :key="i" v-show="i < 3">{{item}}</li>
      </ul>
    </div>
    <!-- <div class="hot-swiper" v-swiper:myHotSwiper="hotSwiperOption">
      <ul class="swiper-wrapper">
        <li class="fl swiper-slide" v-for="item of data.cmtSeatPriceList" :key="item.id" >
          <img  :src="item.seatPicUrl" >
          <div class="cmt-text">
            <div class="name">{{item.seatName}}</div>
            <span class="num"><i>¥</i>{{item.discountPrice || item.price}}</span>
            <span class="text">{{$t('indexPriceType.long')}}</span>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</a>
</template>

<script>
export default {
  props: ['data', 'query'],
  data(){
    return {
      hotSwiperOption:{
        slidesPerView : 3,
        // centeredSlides : true,
        centerInsufficientSlides: true,
        // spaceBetween : 10,
        // slidesOffsetBefore : 16,
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
  .hot-box {
    padding: 16px 0 19px 16px;
    height: 281px;
    background: burlywood;
    .cmt-name {
      margin-bottom: 6px;
      font-family: PingFang-SC-Medium;
      font-size: 17px;
      color: #FFFFFF;
      letter-spacing: 0;
      line-height: 24px;
    }
    .cmt-tabs {
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
    .hot-swiper {
      margin-top: 52px;
      ul {
        li {
          width: 139px!important;
          height: 145px;
          margin-right: 10px;
          // background: pink;
          img {
            width: 139px;
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
  }
}

</style>
