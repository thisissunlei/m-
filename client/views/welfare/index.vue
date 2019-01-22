<template>
  <div class="g-welfare-contain">
    <div class="activity-top" v-if="welfare.recommend.length>0">
      <div class="top-title">
        <span class="fl">每日优选</span>
        <span class="fr num">
          <i class="next fr">/{{welfare.recommend.length}}</i>
          <i class="prev fr">{{actiIndex}}</i>
        </span>
      </div>

      <div v-swiper:mySwiper="swiperOption"  ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in welfare.recommend" :key="index">
            <a :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString">
              <img :src="item.couponCover" v-if="!!item.couponCover">
              <img class="default-img" v-else>
              <div class="swiper-content">
                <div class="swiper-title">{{item.title}}</div>
                <div class="swiper-desr">{{item.descr}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <section class="detail-list">
      <div class="tab-contain">
        <nav>
          <p v-for="(item,i) in welfare.tags" :key="i" @click="selectType(item)"
          :class="activeTab == item.tagId?'tab-box activity':'tab-box'"
          >{{item.tagName}}</p>
        </nav>
      </div>

      <div class="welfare-list">
        <div class="none" v-if="!welfare.totalCount">
          暂无数据
        </div>

        <div class="list-info" v-else>
            <Welfare :list="welfare.list" ></Welfare>
        </div>
      </div>
    </section>
     <div class="get-more" v-if="welfare.page < welfare.totalPages">{{$t("getMore")}}</div>
    <div class="get-more" v-else>{{$t("end")}}</div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import DefaultPage from 'components/defaultPage.vue'
  import Welfare from '../../components/welfare/index.vue' // 会员福利
  var interval = null;
  export default {
    data() {
      return {
        activeTab: '0',
        query: '',
        lang: 'zh',
        actiIndex: 1,
        lang: '',
        language: '',
        cityId: '',
        swiperOption: {
          centeredSlides: true,
          slidesPerView: "auto",
          on: {
            slideChangeTransitionStart: () => {
              let swiper = this.mySwiper;
              this.actiIndex = swiper.activeIndex + 1;
            },
          }
        }
      }
    },
    components: {
      DefaultPage,
      Welfare,
    },

    computed: { // 计算属性
      ...mapState([
        'welfare',
      ]),
    },
    watch: {
      '$route.query.lang' (value) {
        this.lang = value;
        this.getWelfareTags({
          language: value == 'en' ? 1 : 0
        })
        // this.getActivityCity({language:value!='en'?'0':'1',cityId:this.cityId})
      },
      '$route' () {
        this.setQuery();
      },
    },
    created() {

    },
    mounted() {

      console.log('推荐福利', this.welfare.recommend)
      console.log('福利列表', this.welfare.list)
      console.log('福利标签', this.welfare.tags)
      window.addEventListener('scroll',this.getMore);
    },
    // 服务端获取数据
    asyncData({
      router,
      route,
      store
    }) {
      let lang = route.query.lang || 'zh'
      let cityId = route.query.cityId || ''
      let data = {
        page: 1,
        pageSize: 10,
        language: lang == 'en' ? 1 : 0,
        tags: '0'
      }
      let bestForm = {
        language: lang == 'en' ? 1 : 0,
        page: 1,
        pageSize: 4,
        sort: 2,
      }
      return Promise.all([
        store.dispatch('getWelfareTags'), //获取tags列表
        //获取推荐福利
        store.dispatch('getWelfareList', bestForm),
        // 获取全部列表
        store.dispatch('getWelfareList', data)
      ])
    },
    methods: {
      ...mapActions([
        'getWelfareList',
        'getWelfareTags'
      ]),
      setQuery() {
        let query = ''
        for (var key in this.$route.query) {
          query += key + '=' + this.$route.query[key] + '&'
        }
        this.query = '?' + query.substr(0, query.length - 1)
      },
      selectType(item) {
        this.activeTab = item.tagId;
        let lang = this.lang;
        let data = {
          page: 1,
          pageSize: 10,
          language: lang == 'en' ? 1 : 0,
          tags: item.tagId
        }
        this.getWelfareList(data)
      },
    getMore(){
      if(interval == null){
        interval = setInterval(this.scrollMore,1000);
      }
      this.topValue=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
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
      if(scrollTop >= scrollHeight - winHeight - 327){
        if(this.welfare.page >= this.welfare.totalPages){
          return;
        }
        this.getWelfareList({
          page: this.welfare.page+1,
          pageSize: 10,
          language: this.lang == 'en' ? 1 : 0,
          tags: this.activeTab
        })
        return ;
      }
    }
    }
  }
</script>

<style lang='less' scoped>
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
        border-radius: 4px;
      }
      .default-img {
        background: url("../../assets/images/default.png") ;
      }
      .swiper-content {
        padding: 16px 16px 50px 0px;
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

  .detail-list {
    // margin-top:70px;
    .tab-list {
      height: 26px;
      width: 1000px;
      min-width: 375px;
      overflow: hidden;
      transition: all 1s;
    }
    .next-tab {
      transform: translateX(-375px);
    }
    .tab-contain {
      width: 375px;
      position: relative;
      nav {
        padding-left: 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
        .tab-box {
          text-align: center;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          padding: 6px 10px;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
          border: 1px solid #F3F3F3;
          background: #F3F3F3;
          border-radius: 4px;
        }
        .tab-box+.tab-box {
          margin-left: 10px;
        }
        .activity {

        font-size: 14px;
        color: #D29D01;
        background: #FFF9B2;
        border: 1px solid #FFDD54;
        border-radius: 4px;
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
      padding-bottom: 30px;
      font-weight: 700;
  }
}
.get-more {
    margin: 29px 0 50px 0;
    font-family: PingFang-SC-Regular;
    font-size: 15px;
    color: #666666;
    text-align: center;
  }
</style>
