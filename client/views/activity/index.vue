<template>
  <div class="activity">
    <div class="activity-top" v-if="activity.recommendActivity.length>0">
      <div class="top-title">
        <span class="fl">{{$t('activityTitle')}}</span>
        <span class="fr num">
          <i class="next fr">/{{activity.recommendActivity.length}}</i>
          <i class="prev fr">{{actiIndex}}</i>
        </span>
      </div>
      <div v-swiper:mySwiper="swiperOption"  ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in activity.recommendActivity" :key="index">
            <a :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString">
              <img :src="item.imgUrl" v-if="!!item.imgUrl">
              <img class="default-img" v-else>
              <div class="swiper-content">
                <div class="swiper-title">{{item.title}}</div>
                <div class="swiper-desr">{{item.time}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="content-box" v-if="!!activity.activityList && activity.activityList.length>0">
          <a :href="'//'+$store.state.common.origin+'/activity/' + item.id + $store.state.common.queryString" class="item-content" v-for="(item,i) in activity.activityList" :key="i">
            <img :src="item.imgUrl" alt="" class="item-img" v-if="!!item.imgUrl">
            <img src="../../assets/images/activity/default.png" alt="" class="item-img" v-else>
            <div class="item-info">
              <p class="item-title">{{item.title}}</p>
              <p class="item-time">
                <img src="../../assets/images/time.png" alt="">
                <span class="time">{{item.time}}</span>
              </p>
              <p class="item-location">
                <img src="../../assets/images/location.png" alt="">
                <span class="adress">{{item.communityName}}</span>
              </p>
              <p class="item-price" v-if="item.cost == 0">免费</p>
            </div>
          </a>
      </div>
      <div class="none" v-else>暂无数据</div>
      <div class="get-more" v-if="activity.page < activity.totalPages">{{$t("getMore")}}</div>
    <div class="get-more" v-else>{{$t("end")}}</div>
  </div>
</template>


<script>
  import { mapState, mapActions } from 'vuex'
  var interval = null;
  export default {
    components: {

    },
    data() {
      return {
        actiIndex: 1,
        lang: '',
        language: '',
        cityId: '',
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
      window.addEventListener('scroll',this.getMore);
      console.log("activityList",);
    },
    computed: {
      ...mapState(['activity'])
    },
    methods: {
      ...mapActions([
        'getActivityList'
      ]),
      getMore(){
        if(interval == null){
          interval = setInterval(this.scrollMore,1000);
        }
        this.topValue = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      },
      scrollMore(){
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop!==this.topValue){
            return ;
      }
      let winHeight = window.innerHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      clearInterval(interval);
      interval = null;
      // console.log("page",this.activity.page,this.activity.totalPages);

      if(scrollTop >= scrollHeight - winHeight - 327){
        if(this.activity.page >= this.activity.totalPages){
          return;
        }
        this.cityId = this.$route.query.cityId
        // console.log("999",this.activity.page+1);
        this.getActivityList({
          page: this.activity.page+1,
          pageSize: 10,
          cityId:this.cityId
        })
        return ;
      }
    },
      getData(n,o) {
         if (!n.query) return
        this.language = n.query.lang === 'en' ? 1 : 0;
        this.cityId = n.query.cityId;
        this.lang = n.query.lang;
        this.page = 1;
        this.$store.dispatch('getRecommend',{
          page: 1,
          pageSize: 4,
          language: this.lang == 'en' ? 1 : 0,
          cityId: this.cityId
        }),
        this.$store.dispatch('getActivityList',{
          page: 1,
          pageSize: 10,
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
        border: 1px solid #F3F3F3;
        border-radius: 4px;
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

    .wrapper {
      height: 667px;
    }
  .content-box {
    margin-bottom: 50px;
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
        border: 1px solid #F3F3F3;
        border-radius: 4px;
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
          img {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
          .time {
            font-size: 13px;
            color: #666666;
          }
        }
        .item-location {
          img {
            display: inline-block;
            width: 12px;
            height: 13px;
            vertical-align: middle;
          }
          .adress {
            font-size: 13px;
            color: #666666;
          }
        }
        .item-price {
          position: absolute;
          bottom: 0;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #333333;
          line-height: 21px;
        }
      }
    }
  }
    .none {
      background: url('../../assets/images/none.png') center top no-repeat;
      -webkit-background-size: 116px 106px;
      background-size: 116px 106px;
      margin-top: 60px;
      padding: 130px 0 50px;
      line-height: 20px;
      font-size: 20px;
      color: #666666;
      text-align: center;
      padding-bottom: 80px;
      font-weight: 700;
  }
  .get-more {
  margin: 29px 0 50px 0;
  font-family: PingFang-SC-Regular;
  font-size: 15px;
  color: #666666;
  text-align: center;
}
</style>

