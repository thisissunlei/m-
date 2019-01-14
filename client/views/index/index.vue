<template>
  <div class="index">
    <!-- :height="'210'" -->
    <Swiper
    :width="'375'"

    :list="index.banner"
    v-show="index.banner.length>0"
    :loop="index.banner.length>1 ? true : false "
    :dots="index.banner.length>1 ? true : false "
    />
    <!-- 热门社区 -->
    <div class="hot-community" v-if="!!hotList && hotList.length > 0">
      <div class="hot-title">
        <span class="line"></span>
        {{$t('indexTitle.hot')}}
      </div>
      <Hot v-for="(item, i) in hotList" :key="i"  :data="item" :query="query"></Hot>
      <a href="" class="hot-more">
        <div class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></div>
      </a>
    </div>
    <!-- <div class="divide-line"></div> -->
    <!-- 待开社区 -->
    <!-- <div class="soon-community" v-if="!!waitList && waitList.length > 0">
      <div class="hot-title">
        <span class="line"></span>
        {{$t('indexTitle.soon')}}
      </div>
      <div class="soon-content fl" v-for="(item,i) in waitList" :key="i">
        <a href="" >
          <img :src="item.recommendPicUrl" alt="">
          <div class="soon-city">{{item.cityName}}</div>
        </a>
        <div class="soon-cmt">{{item.cmtName}}</div>
        <span class="num">{{item.openTime}}</span>
      </div>
      <a href="" class="hot-more">
        <div class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></div>
      </a>
    </div>
    <div class="divide-line"></div> -->
    <!-- 社区环境 -->
    <!-- <div class="env">
      <div class="hot-title">
        <span class="line"></span>
        {{$t('indexTitle.environment')}}
      </div>
      <Env :data="this.$store.state.index.welfare" :query="query"/>
    </div> -->
    <!-- 社区福利 -->
    <Welfare />
    <div class="divide-line"></div>
    <!-- 社区活动 -->
    <Activity />
    <div class="divide-line"></div>
    <Member />
    <!-- start 立即预约 -->
    <div class="visit-btn">
      <p :class="[isFixed ? 'bottom-visit-fixed' : '']">{{$t('indexTitle.order')}}</p>
      <p v-show="isFixed"></p>
    </div>
    <!-- end 立即预约 -->
  </div>
</template>
<script>
import Swiper from '../../components/common/swiper.vue'
import Hot from '../../components/index/hot.vue' // 热门社区
import Env from '../../components/index/env.vue' // 社区环境
import Welfare from '../../components/index/welfare.vue' // 社区福利
import Activity from '../../components/index/activity.vue' // 社区活动
import Member from '../../components/index/member.vue' // 社区活动
import { mapState,mapActions } from 'vuex'

export default {
  components: {
    Swiper,
    Hot,
    Env,
    Welfare,
    Activity,
    Member
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
      },
      win: null,
      lang: '',
      language: '',
      cityId: '',
      query: '',
      swiperValue: 0,
      isFixed: true
    }
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
      return this.$store.getters.throwIndexActivityList;
    },
    ...mapState(['index'])
  },
  watch: {
    '$route.query.lang'(n, o) {
        this.getNewData(1, n, o);
      },
      '$route.query.cityId'(n, o) {
        this.getNewData(2, n, o);
      },
      '$route'(n, o) {
        // this.setQuery();
        this.getNewData(n, o);
      }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.win = typeof window == "undefined" ? global : window;
    this.lang = this.$route.query.lang || 'zh';
    this.language = this.lang === 'en' ? 1 : 0;
    this.cityId = this.$route.query.cityId;

    // this.getData();

    window.addEventListener('scroll', this.scroll)
  },
  // asyncData({ route, store }) {
  //     let lang = route.query.lang || 'zh'
  //     let cityId = route.query.cityId || ''
  //     let data = {
  //       language: lang === 'en'? 1: 0,
  //       cityId: cityId
  //     }
  //     return Promise.all([
  //       store.dispatch('getFocusBanner',data),
  //       //获取热门社区
  //       store.dispatch('getIndexHotCommunity', data),
  //       // 获取待开业社区
  //       store.dispatch('getIndexWaitCommunity', data)
  //     ])
  // },
  methods: {
    getData() {


      if (!this.$route.query.lang) {
        return
      }
      let lang = this.$route.query.lang
      let cityId = this.$route.query.cityId

      this.$store.dispatch('getFocusBanner', {
        language: lang === 'en'? 1: 0,
        cityId: cityId
      })
      this.$store.dispatch('getIndexHotCommunity', {
        language: lang === 'en'? 1: 0,
        cityId: cityId
      })
      this.$store.dispatch('getIndexWaitCommunity', {
        language: lang === 'en'? 1: 0,
        cityId: cityId
      })
      this.$store.dispatch('getIndexOfficeEnv', { language: lang === 'en'? 1: 0 })
      this.$store.dispatch('getIndexWelfare', {
        language: lang === 'en'? 1: 0,
        page: 1,
        pageSize: 6,
        sort: 1
      })
      this.$store.dispatch('getIndexActivityList', {
        cityId: cityId,
        page: 1,
        pageSize: 4
      })

    },
    getNewData(n, o) {


      if ( !n.query ) return
        this.language = n.query.lang === 'en' ? 1 : 0;
        this.cityId = n.query.cityId;
        this.lang = n.query.lang;

        var query = ''
        for ( var key in this.$route.query ) {
  

          query += key + '=' + this.$route.query[key] + '&'
        }
        this.query = '?' + query.substr(0,query.length-1)
        this.$store.dispatch('getIndexHotCommunity', {
          language: this.language,
          cityId: this.cityId
        });
        this.getData()
    },
    scroll() {
      let top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let elementHeight = document.querySelector("footer").offsetHeight;

      if (height - top <= elementHeight) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.index {
  .index-swiper1 {
    height: 210px;
    .swiper-wrapper {
      height: 210px;
      margin-bottom: 30px;
      a {
        width: 375px;
        height: 210px;
        img {
          width: 100%;
          height: 210px;
        }
      }
    }
  }
  .hot-title {
    position: relative;
    padding: 20px 0 16px 16px;
    font-family: PingFang-SC-Medium;
    font-size: 20px;
    color: #333333;
    .line {
      position: absolute;
      width: 80px;
      height: 9px;
      left: 15px;
      bottom: 15px;
      background-color: #ffeb00;
      z-index: -10;
    }
  }

  .hot-more {
    display: inline-block;
    padding: 0 0 20px 111px;
    .more {
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
        // top: 4px;
      }
    }
  }
  .soon-community {
    padding-left: 16px;
  }
  .soon-content {
    margin: 0 9px 20px 0;
    a {
      display: inline-block;
      width: 167px;
      height: 93px;
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
  .divide-line {
    width: 100%;
    height: 10px;
    background: #f6f6f6;
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

