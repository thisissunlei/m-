<template>
  <div class="activity">
    <div class="activity-top">
      <div class="top-title">
        <span class="fl">精选活动</span>
        <span class="fr">
          <i class="prev">1</i>
          <i class="next">/3</i>
        </span>
      </div>
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in activity.recommendActivity" :key="index">
            <img :src="item.imgUrl">
            <div class="cmt-text">
              <div class="name">{{item.seatName}}</div>
              <span class="num"><i>¥</i>{{item.discountPrice || item.price}}</span>
              <span class="text">{{$t('indexPriceType.long')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <!-- target="_blank" -->
      <a :href="'//'+$store.state.common.origin+'/activity/' + item.id + $store.state.common.queryString" class="item-content" v-for="(item,i) in $store.state.activity.activityList" :key="i">
        <img :src="item.imgUrl" alt="" class="item-img">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-time">
            <span class="data">{{item.beginTime}}</span>
            <span class="time">{{item.endTime}}</span>
          </p>
          <p class="item-num">
            报名人数{{item.countJoin}}人
          </p>
          <div class="item-cmt">北京 • 创业大街社区</div>
        </div>
      </a>
    </div>
  </div>
</template>


<script>
  import { mapState,mapActions } from 'vuex'
  export default {
    components: {

    },
    data() {
      return {
        swiperOption: {
          // 设定为true时，active slide会居中，而不是默认状态下的居左
          centeredSlides:false,
          slidesPerView:1,
        }
      }
    },

    asyncData({ route,store,router}) {
      let lang = 0;
      if (!!route.query.lang && route.query.lang === 'en') {
        lang = 1;
      }
      let cityId = route.query.cityId || ''
      let data = {
        page:1,
        pageSize: 4,
        language:lang=='en'? 1: 0,
        cityId:cityId
      }
      return Promise.all([
        store.dispatch('getRecommend',data),
        store.dispatch('getActivityList')
      ])
    },
    mounted() {
      console.log('data', this.activity)
    },
    computed:{
      ...mapState(['activity'])
    },
    methods: {
      getData() {
        // this.$store.dispatch('getRecommendActivity')
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper {
    width: 375px;
    height: 306px;
    background: palegreen;
  }
  .activity-top {
    padding-top: 16px;
    .top-title {
      margin-top: 16px;
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #333333;
      letter-spacing: 0;
      line-height: 30px;
      span{
        display: inline-block;
      }
      .next {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #3F3F3F;
        line-height: 25px;
      }
    }
  }
  .content-box {
    margin-bottom: 50px;
    // background: pink;
    .item-content {
      display: flex;
      width: 343px;
      height: 153px;
      margin: 10px 16px;
      background: #F6F6F6;
      border-radius: 4px;
      .item-img {
        width: 100px;
        height: 133px;
        margin: 10px;
      }
      .item-info {
        flex: 1;
        position: relative;
        margin: 10px 8px 10px 0;
        .item-title {
          max-height: 48px;
          font-family: PingFang-SC-Medium;
          font-size: 17px;
          color: #333333;
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .item-time {
          margin: 10px 0 4px 0;
          font-family: PingFang-SC-Regular;
          font-size: 13px;
          color: #666666;
        }
        .item-num {
          margin-bottom: 17px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
        }
        .item-cmt {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
</style>

