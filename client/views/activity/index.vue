<template>
  <div class="activity">
  <!-- <div class="wrapper" ref="wrapper"> -->
  <!-- <div class="bscroll-container"> -->
    <div class="activity-top">
      <div class="top-title">
        <span class="fl">精选活动</span>
        <span class="fr num">
          <i class="next fr">/{{activity.recommendActivity.length}}</i>
          <i class="prev fr">{{actiIndex}}</i>
        </span>
      </div>
      <div v-swiper:mySwiper="swiperOption" v-if="activity.recommendActivity.length>0" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in activity.recommendActivity" :key="index">
            <img :src="item.imgUrl" v-if="!!item.imgUrl">
            <img class="default-img" v-else>
            <div class="swiper-content">
              <div class="swiper-title">{{item.title}}</div>
              <div class="swiper-desr">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="content-box"> -->
      <!-- <div class="wrapper" ref="wrapper">
        <div class="bscroll-container"> -->

          <a :href="'//'+$store.state.common.origin+'/activity/' + item.id + $store.state.common.queryString" class="item-content" v-for="(item,i) in $store.state.activity.activityList" :key="i">
            <img :src="item.imgUrl" alt="" class="item-img" v-if="!!item.imgUrl">
            <img src="../../assets/images/activity/default.png" alt="" class="item-img" v-else>
            <div class="item-info">
              <p class="item-title">{{item.title}}</p>
              <p class="item-time">
                <i class="time-img"></i>
                <span class="time">{{item.time}}</span>
              </p>
              <p class="item-location">
                <i class="adress-img"></i>
                <span class="adress">{{item.communityName}}</span>
              </p>
            </div>
          </a>
          <!-- <div class="bottom-tip">
            <span class="loading-hook">{{pullupMsg}}</span>
          </div> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>


<script>
// import BScroll from 'better-scroll';
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    components: {

    },
    data() {
      return {
        actiIndex: 1,
        lang: '',
        language: '',
        cityId: '',
        pullupMsg:'加载更多',
        startY:0,
        page:1,
        swiperOption: {
          centeredSlides: true,
          slidesPerView: "auto",
          // 子slide更新时，swiper更新
          // observeSlideChildren:true,
          on: {
            slideChangeTransitionStart: () => {
              let swiper = this.mySwiper;
              this.actiIndex = swiper.activeIndex + 1;
            },
          }
        }
      }
    },
    computed: {
      //   scrollbarObj: function() {
      //   return this.scrollbar ? {
      //     fade: this.scrollbarFade
      //   } : false
      // },
      // pullDownRefreshObj: function() {
      //   return this.pullDownRefresh ? {
      //     threshold: parseInt(this.pullDownRefreshThreshold),
      //     stop: parseInt(this.pullDownRefreshStop)
      //   } : false
      // }
      // pullUpLoadObj: {
      //     threshold: 0,
      //   },
        ...mapState(['activity'])
    },
    watch: {
       '$route.query.lang' (n, o) {
        this.getData( n, o);
      },
      '$route.query.cityId' (n, o) {
        this.getData(n, o);
      },
      '$route' (n, o) {
        this.getData(n, o);
      },
    },
    asyncData({
      route,
      store,
      router
    }) {
      let lang = 0;
      if (!!route.query.lang && route.query.lang === 'en') {
        lang = 1;
      }
      let cityId = route.query.cityId || '';
      let data = {
        page: 1,
        pageSize: 4,
        language: lang == 'en' ? 1 : 0,
        cityId: cityId
      }
      let listParams = {
        page: 1,
        pageSize: 10,
        language: lang == 'en' ? 1 : 0,
        cityId: cityId
      }
      return Promise.all([
        store.dispatch('getRecommend', data),
        store.dispatch('getActivityList',listParams)
      ])
    },
    mounted() {
      this.lang = this.$route.query.lang || 'zh';
      this.language = this.lang === 'en' ? 1 : 0;
      this.cityId = this.$route.query.cityId;
      // this.scroll = new BScroll(this.$refs.wrapper);
      // console.log("scroll",this.scroll,this.$store.state.activity);
      //  if(this.scroll){
      //     this.scroll.on('touchEnd',(pos)=>{
      //       // console.log("999",pos);
      //       if(pos.y < (this.scroll.maxScrollY - 30)) {
      //         this.pullupMsg = '加载中...';
      //         this.page = ++this.page;
      //         console.log("page",this.page,this.activity.totalPages);
      //         setTimeout(()=>{
      //           this.$store.dispatch('getActivityList',{
      //             page: this.page,
      //             pageSize: 10,
      //             language:1,
      //             cityId:0
      //           })
      //           .then((res)=>{
      //             this.scroll.refresh();
      //           })
      //         },2000)
      //       }
      //     })
      // }
      // console.log('data', this.activity.activityList)
    },
    computed: {
      ...mapState(['activity'])
    },
    methods: {
      getData(n,o) {
         if (!n.query) return
        this.language = n.query.lang === 'en' ? 1 : 0;
        this.cityId = n.query.cityId;
        this.lang = n.query.lang;
        // console.log("n,o",n,o);
        this.$store.dispatch('getRecommend',{
          page: 1,
          pageSize: 4,
          language: this.lang == 'en' ? 1 : 0,
          cityId: this.cityId
        }),
        this.$store.dispatch('getActivityList',{
          page: 1,
          pageSize: 10,
          language: this.lang == 'en' ? 1 : 0,
          cityId: this.cityId
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .activity-top {
    .top-title {
      height: 30px;
      margin: 16px;
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #333333;
      letter-spacing: 0;
      line-height: 30px;
      span {
        display: inline-block;
      }
      .num {
        height: 25px;
        line-height: 25px;
      }
      .prev {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
      }
      .next {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #3F3F3F;
        line-height: 25px;
      }
    }
    .swiper-wrapper {
      margin-left: 5px;
    }
    .swiper-slide {
      width: 343px;
      margin-right: 10px;
      img {
        width: 100%;
        height: 172px;
      }
      .default-img {
        background: url("../../assets/images/default.png") ;
      }
      .swiper-content {
        padding: 16px 16px 30px 0px;
        .swiper-title {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          line-height: 20px;
        }
        .swiper-desr {
          margin-top: 5px;
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #999999;
          letter-spacing: 0;
          line-height: 11px;
        }
      }
    }
  }

  // .content-box {
    // margin-bottom: 50px;
    .wrapper {
      height: 667px;
      overflow: auto;
    }
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
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("../../assets/images/activity/time.png");
            background-size: cover;
          }
          .time {
            font-size: 13px;
            color: #666666;
          }
        }
        .item-location {
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("../../assets/images/activity/location.png");
            background-size: cover;
          }
          .adress {
            font-size: 13px;
            color: #666666;
          }
        }
      }
    }
  // }
</style>

