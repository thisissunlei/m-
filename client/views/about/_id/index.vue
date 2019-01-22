<template>
  <div class="detail-box">
    <div class="detail-title">
      {{about.newsDetail.title}}
    </div>
    <div class="detail-time">
      {{about.newsDetail.publishedAt}}
    </div>
    <div class="detail-content" v-html="about.newsDetail.desc"></div>

    <div class="relative-community" v-if="!!about.newsDetail.relateCommunity.cityName">
      <div class="rel-title oth">相关社区</div>
      <div class="small-title">
        <div class="name">
          <span class="city-name">{{about.newsDetail.relateCommunity.cityName}}·</span>
          <span class="cmt-name">{{about.newsDetail.relateCommunity.cmtName}}</span>
        </div>
        <!-- <span class="low-price" v-if="!!about.newsDetail.relateCommunity.porPriceVo.levelPrice">
          工位最低价：
          <span class="num">{{about.newsDetail.relateCommunity.porPriceVo.levelPrice}}</span>元起/月
        </span> -->
      </div>
      <!-- <div class="rel-pics" v-for="(item,i) of about.newsDetail.relateCommunity.rightImageUrl" :key="i">
        <img :src="item" alt="">
      </div> -->
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in about.newsDetail.relateCommunity.rightImageUrl" :key="banner.index">
            <img :src="banner">
          </div>
        </div>
      </div>
    </div>

    <div class="other-news">
      <div class="other-title">{{$t('newsMore')}}</div>
        <div class="others-lists">
        <a class="other-detail fl" v-for="(item, i) in about.more" :key="i"
           :href="'//'+$store.state.common.origin+'/about/'+item.id+$store.state.common.queryString">
          <div class="img"  :style="item.photoUrl?'background: url('+item.photoUrl+'?x-oss-process=image/resize,h_290,w_516,color_eeeeee,quality,q_80) center center / cover no-repeat;':''" ></div>
           <div class="content">{{item.intro}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      swiperOption: {
        // centeredSlides:false,
        slidesPerView:2.5,
        slidesOffsetBefore:16,
        slidesOffsetAfter:16
        }
    }
  },
  computed: {
    ...mapState([
      'about'
    ])
  },
  mounted () {
    console.log("111", this.about);
      // console.log(this.mySwiper)
      // this.mySwiper.slideTo(3, 1000, false)
  },
  asyncData ({ router, route, store }) {
    let lang = 0;
    if (!!route.query.lang && route.query.lang === 'en') {
      lang = 1;
    }
    let more = {
        page:1,
        pageSize:2,
        language: lang
      }
    let params = route.params;
    params.language = lang;
    return Promise.all([
      store.dispatch('getNewsDetail', params),
       store.dispatch('getMoreNews',more),
    ])
  },
}
</script>
<style lang="less" scoped>
.detail-box {
  padding: 0 16px;
  .detail-title {
    height: 30px;
    margin-top: 30px;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .detail-time {
    margin-top: 10px;
    margin-bottom: 19px;
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0;
    line-height: 20px;
  }
  // .detail-pic {
  //   width: 343px;
  //   height: 155px;
  //   margin-bottom: 10px;
  // }
  .detail-content {
    border-bottom: 1px solid #f3f3f3;
    font-family: PingFang-SC-Regular;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    line-height: 26px;

  }
  .oth {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    line-height: 20px;
  }
  .relative-community {
    margin-top: 30px;
    .small-title {
      height: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      .name {
        float: left;
      }
      .low-price {
        float: right;
      }
      .num {
        color: red;
      }
    }
    .swiper-container {
      margin-right: -16px;
      margin-left: -16px;
    }
    .swiper-wrapper {
      .swiper-slide{
      width: 162px!important;
      height: 92px;
      margin-right: 10px;
      border: 1px solid #EEEEEE;
      border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .other-news {
    .other-title {
      margin: 33px 0 15px 0;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #333333;
      line-height: 24px;
    }
    .other-detail {
      display: inline-block;
      width: 168px;
      height: 153px;
      background: #FAFAFA;
      border-radius: 4px;
      margin-right: 9px;
       &:nth-child(2){
        margin-right: -9px;
      }
      .img {
        width: 166px;
        height: 93px;
        background: pink;
      }
      .content {
        padding: 10px 5px 0 6px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
      }
    }
  }
}
</style>

<style>
    span>img {
      width: 344px!important;
      height: 155px!important;
      background: red;
    }
</style>

