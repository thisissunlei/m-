<template>
  <div class="detail-box">
    <div class="detail-title">
      <!-- {{about.newsDetail.title}} -->
      氪空间完成6亿元Pre-B轮融资
    </div>
    <div class="detail-time">
      <!-- {{about.newsDetail.publishedAt}} -->
      2018-01-11
    </div>
    <div class="detail-content" v-html="about.newsDetail.desc"></div>

    <div class="relative-community">
      <div class="rel-title oth">相关社区</div>
      <div class="small-title">
        <div class="name">
          <!-- <span class="city-name">{{about.newsDetail.relateCommunity.cityName}}·</span> -->
          <!-- <span class="cmt-name">{{about.newsDetail.relateCommunity.cmtName}}</span> -->
        </div>
        <span class="low-price">
          <!-- <span class="num">{{about.newsDetail.relateCommunity.porPriceVo.levelPrice}}</span>元起/月 -->
        </span>
      </div>
      <!-- <div class="rel-pics" v-for="(item,i) of about.newsDetail.relateCommunity.rightImageUrl" :key="i">
        <img :src="item" alt="">
      </div>-->
      <!-- <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="banner in about.newsDetail.relateCommunity.rightImageUrl" :key="banner.index">
            <img :src="banner">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div> -->
    </div>

    <div class="other-news">
      <div class="other-title oth">其他新闻</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      // swiperOption: {
      //     pagination: {
      //       el: '.swiper-pagination'
      //     },
      //     width: 162,
      //     height: 92,
      //     // some swiper options...
      //   }
    }
  },
  computed: {
    ...mapState([
      'about'
    ])
  },
  mounted () {
    // console.log("111", this.about);

      // console.log(this.mySwiper)
      // this.mySwiper.slideTo(3, 1000, false)
  },
  asyncData ({ router, route, store }) {
    let lang = 0;
    if (!!route.query.lang && route.query.lang === 'en') {
      lang = 1;
    }
    let params = route.params;
    params.language = lang;
    return Promise.all([
      store.dispatch('getNewsDetail', params),
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
      margin-top: 10px;
      margin-bottom: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
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
    .rel-pics {
      width: 162px;
      height: 92px;
      img {
        width: 100%;
        height: 100%;
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

