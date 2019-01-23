<template>
  <div class="index">
    <Swiper
      :loop="index.banner.length >1 ? true : false"
      :bannerFlag="bannerFlag"
      v-if="!!index.banner && index.banner.length>0"
    >
      <div class="slider-item" v-for="(item,index) in index.banner" :key="index">

        <a :href="item.banerLink"
         target="_blank">
          <div class="img" :style="!!item.banerPicUrl? 'background: url('+item.banerPicUrl+') center top / cover no-repeat': ''">
          {{item.linkUrl}}
          </div>
        </a>
      </div>
    </Swiper>
    <div v-else class="banner-img"></div>
    <!-- 热门社区 -->
    <div class="hot-community" v-if="!!hotList && hotList.length > 0">
      <div class="hot-title">
        <span class="hot-text">
          {{$t('indexTitle.hot')}}
          <span class="line"></span>
        </span>
      </div>

      <Hot v-for="(item, i) in hotList" :key="i" :data="item" :query="query" v-if="i<3"></Hot>
      <div class="hot-more">
        <a :href="'//'+$store.state.common.origin+'/community'+$store.state.common.queryString" class="more">
          {{$t('indexTitle.more')}}
          <i class="arror">>></i>
        </a>
      </div>
    </div>
    <!-- 待开社区 -->
    <div class="soon-community" v-if="!!waitList && waitList.length > 0">
      <div class="hot-title">
        <span class="hot-text">
          {{$t('indexTitle.soon')}}
          <span class="line"></span>
        </span>
      </div>
      <div class="soon-content">
        <a :href="'//'+$store.state.common.origin+'/community/' + item.cmtId + $store.state.common.queryString"
         class="soon-item fl" v-for="(item,i) in waitList" :key="i">
          <img :src="item.recommendPicUrl" alt>
          <div class="soon-city">{{item.cityName}}</div>
          <div class="soon-cmt">{{item.cmtName}}</div>
          <!--大于30天显示 n天后 else 显示日期-->
          <div
            class="num fl"
            v-if="!!item.openTime && item.openTime.indexOf('-') > 0"
          >{{item.openTime}}</div>
          <div class="num fl" v-else>{{item.openTime}} {{$t('indexTitle.later')}}</div>
        </a>
      </div>
      <div class="hot-more">
        <a :href="'//'+$store.state.common.origin+'/community'+$store.state.common.queryString+'&openStatus=2'" class="more">
          {{$t('indexTitle.more')}}
          <i class="arror">>></i>
        </a>
      </div>
    </div>
    <!-- 社区环境 -->
    <div v-if="!!envList && envList.length > 0">
      <div class="hot-title">
        <span class="hot-text">
          {{$t('indexTitle.environment')}}
          <span class="line"></span>
        </span>
      </div>
      <div style="text-align:center;" v-swiper:envSwiper="swiperOption">
        <div class="swiper-wrapper swiper-cal" ref="swiper">
          <a
            v-for="(item,index) in envList"
            v-show="envList.length"
            :key="index"
            href="#"
            class="swiper-slide"
          >
            <div class="image" :style="`background-image:url(${item.firstPic})` " name="“images”"></div>
            <div class="text">{{item.envName}}</div>
          </a>
        </div>
      </div>
      <div class="more-little"></div>
    </div>

    <!-- 社区福利 -->
    <Welfare
      :data="$store.state.welfare.recommend"
      v-if="!!$store.state.welfare.recommend && $store.state.welfare.recommend.length > 0" />

    <!-- 社区活动 -->
    <Activity :data="activityList" v-if="!!activityList && activityList.length > 0"/>
    <div class="divide-line"></div>
    <!--<Visit :Close="jumpVisit" :areaDisabled="areaDisabled" v-if="this.$store.state.community.isVisit" />-->
    <!-- 会员报道 -->
    <Member :data="memberList" v-if="!!memberList && memberList.length > 0"/>
    <!-- start 立即预约 -->
    <div class="visit-btn" @click="jumpVisit">
      <p :class="[isFixed ? 'bottom-visit-fixed' : '']">{{$t('indexTitle.order')}}</p>
      <p v-show="isFixed"></p>
    </div>
    <!-- end 立即预约 --> 
  </div>
</template>

<script>
import Swiper from "../../components/common/swiper.vue";
import Hot from "../../components/index/hot.vue"; // 热门社区
import Welfare from "../../components/index/welfare.vue"; // 社区福利
import Activity from "../../components/index/activity.vue"; // 社区活动
import Member from "../../components/index/member.vue"; // 社区活动
import Visit from 'components/common/visit.vue'
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Swiper,
    Hot,
    Welfare,
    Activity,
    Member,
    Visit
  },
  data() {
    return {
      win: null,
      lang: "",
      language: "",
      cityId: "",
      query: "",
      areaDisabled: false,
      isFixed: true,
      bannerFlag: false,
      loopLength: 1,
      swiperOption: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        loopedSlides: this.loopLength,
        updateOnImagesReady: true,
        on: {
          imagesReady: () => {
            let swiper = this.$refs.swiper;
            this.loopLength = swiper.children.length;
          }
        }
      }
    };
  },
  computed: {
    hotList() {
      return this.$store.getters.throwIndexHotCommunity;
    },
    waitList() {
      return this.$store.getters.throwIndexWaitCommunity;
    },
    envList() {
      return this.$store.getters.throwIndexOfficeEnv;
    },
    activityList() {
      return this.$store.getters.throwActivityList;
    },
    memberList(){
        return this.$store.getters.throwIndexMemberList;
    },
    ...mapState(["index", "welfare"])
  },
  watch: {
    "$route.query.lang"(n, o) {
      this.getNewData(1, n, o);
    },
    "$route.query.cityId"(n, o) {
      this.getNewData(2, n, o);
    },
    $route(n, o) {
      // this.setQuery();
      this.getNewData(n, o);
    },
    "index.banner"(n, o) {
      this.bannerFlag = !this.bannerFlag;
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.win = typeof window == "undefined" ? global : window;
    this.lang = this.$route.query.lang || "zh";
    this.language = this.lang === "en" ? 1 : 0;
    this.cityId = this.$route.query.cityId;
    this.getData();
    console.log("index", this.activityList);
    window.addEventListener("scroll", this.scroll);
  },

  methods: {
     jumpVisit() {
      this.$store.commit('optionVisit', true);
      this.$store.commit('openRightConter', true);
    },
    getData() {
        if (!this.$route.query.lang) {
          return
        }
        let lang = this.$route.query.lang
        let cityId = this.$route.query.cityId
        this.$store.dispatch('getFocusBanner', {
          language: lang === 'en' ? 1 : 0,
          cityId: cityId
        })
        this.$store.dispatch('getIndexHotCommunity', {
          language: lang === 'en' ? 1 : 0,
          cityId: cityId
        })
        this.$store.dispatch('getIndexWaitCommunity', {
          language: lang === 'en' ? 1 : 0,
          cityId: cityId
        })
        this.$store.dispatch('getIndexOfficeEnv', {
          language: lang === 'en' ? 1 : 0
        })
        this.$store.dispatch('getWelfareList', {
          language: lang === 'en' ? 1 : 0,
          page: 1,
          pageSize: 3,
          sort: 2
        })
        this.$store.dispatch('getActivityList', {
          cityId: cityId,
          page: 1,
          pageSize: 3
        })
        this.$store.dispatch('getIndexMember',{
          page:1,
          pageSize:3
        })
      },
    getNewData(n, o) {
      if (!n.query) return;
      this.language = n.query.lang === "en" ? 1 : 0;
      this.cityId = n.query.cityId;
      this.lang = n.query.lang;
      var query = "";
      for (var key in this.$route.query) {
        query += key + "=" + this.$route.query[key] + "&";
      }
      this.query = "?" + query.substr(0, query.length - 1);
      this.$store.dispatch("getIndexHotCommunity", {
        language: this.language,
        cityId: this.cityId
      });
      this.getData();
    },
    scroll() {
      let top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let elementHeight = document.querySelector("footer").offsetHeight;

      if (height - top <= elementHeight) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .swiper-cal {
    width: 100%;
    height: 186px;
    align-items: center;
    .swiper-slide {
      width: 200px;
      height: 155px;
      border-radius: 10px;
      overflow: hidden;
      .image {
        width: 100%;
        height: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .swiper-slide-active {
      transform: scale(1.05, 1.1);
    }
    .text {
      position: absolute;
      left: 93px;
      bottom: 15px;
      background: rgba(255,255,255,0.90);
      border-radius: 4px;
      padding: 4px 8px;
      font-family: PingFang-SC-Regular;
      font-size: 14px;
      color: #333333;
      // background: rgba(0, 0, 0, 0.8);
      // height: 40px;
      // width: 100%;
      // line-height: 40px;
      // bottom: 0;
      // text-align: center;
      // color: #fff;
      // font-size: 15px;
    }
  }
  .slider-item {
    float: left;
    a {
      display: block;
      width: 100%;
      height: 210px;
    }
    .img {
      width: 100%;
      height: 210px;
    }
  }
  .banner-img {

    width: 100%;
    height: 210px;
    background: url("../../assets/images/bd/banner.jpg");
  }
  .more-little {
    margin-top: 20px;
    width: 100%;
    height: 10px;
    background: #f6f6f6;
  }
  .hot-title {
    padding: 20px 0 16px 16px;
    font-family: PingFang-SC-Medium;
    font-size: 20px;
    color: #333333;
    .hot-text {
      position: relative;
      .line {
        position: absolute;
        width: 100%;
        height: 9px;
        left: 0;
        bottom: 0;
        background-color: #ffeb00;
        z-index: -10;
      }
      // .en-line {
      //   position: absolute;
      //   width: 100%;
      //   height: 9px;
      //   left: 0;
      //   bottom: 0;
      //   background-color: #ffeb00;
      //   z-index: -10;
      // }
    }
  }
  .hot-more {
    padding: 0 0 20px 111px;
    border-bottom: 10px solid #f6f6f6;
    .more {
      display: inline-block;
      position: relative;
      width: 153px;
      height: 44px;
      line-height: 44px;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 4px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      color: #666666;
      letter-spacing: 0;
      text-align: center;
      .arror {
        position: absolute;
        right: 21px;
      }
    }
  }

  .soon-content {
    padding-left: 16px;
    overflow: hidden;
    .soon-item {
      display: inline-block;
      width: 167px;
      margin: 0 9px 20px 0;
      position: relative;
      img {
        width: 167px;
        height: 93px;
      }
      .soon-city {
        position: absolute;
        top: 0;
        left: 16px;
        font-family: PingFang-SC-Regular;
        font-size: 13px;
        color: #e1be65;
        background-image: linear-gradient(48deg, #564f45 0%, #1c1b1b 100%);
        border-radius: 0px 0px 4px 4px;
      }
    }

    .soon-cmt {
      margin-top: 8px;
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #333333;
      letter-spacing: 0;
      line-height: 20px;
    }
    .num {
      font-family: PingFang-SC-Regular;
      font-size: 13px;
      color: #dbae3c;
      letter-spacing: 0;
      text-align: center;
      line-height: 16px;
    }
  }

  .visit-btn {
    p {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
      font-family: PingFang-SC-Regular;
      font-size: 18px;
      color: #624d17;
      text-align: center;
      z-index: 99;
    }
    p:nth-of-type(2) {
      background: none;
    }
    .bottom-visit-fixed {
      position: fixed;
      bottom: 0;
      }
    }
  }
</style>

