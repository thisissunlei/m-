<template>
  <div class="member">
    <h1 class="member-h">{{$t('teamList')}}</h1>
    <div class="m-info" :style="`width:${(member.teamList.length*221+20)/37.5}rem`" ref="tabList">
      <a class="card" v-for="item in member.teamList"  :href="'//'+$store.state.common.origin+'/team/' + item.teamId + $store.state.common.queryString">
        <img src="../../assets/images/marks.png" alt="" class="marks">
        <div class="m-slogan">{{item.slogan}}</div>
        <div class="t-info">
          <img class="left-img" :src="item.logo" :alt="item.teamName" />
          <div class="t-text">
            <div class="t-name over-point">{{item.teamName}}</div>
            <div class="t-address">
              {{item.cityName}} · {{item.communityName}}
            </div>
          </div>

        </div>
      </a>
    </div>
    <!-- 最新入驻团队  3个 -->
    <!-- <Swiper :list="activity.recommendActivity" width="375" height="250"
    :dots="true"
    /> -->
    <div class="member-list">
      <a class="m-content" v-for="item in member.memberList" :href="'//'+$store.state.common.origin+'/members/' + item.id + $store.state.common.queryString">
        <!-- <img src="item.photoUrl" alt="" class="left-head"> -->
        <div class="left-head" :style="item.photoUrl?'background: url('+item.photoUrl+'?x-oss-process=image/resize,h_402,w_720,color_eeeeee,quality,q_90) center top / cover no-repeat' :''"></div>
        <div class="right-box">
          <div class="m-title over-point2">{{item.title}}</div>
          <div class="m-bottom">
            <span class="time">{{item.publishedAt}}</span>
            <span class="m-readed">{{item.totalReadCunt}}阅读</span>
          </div>
        </div>
      </a>
    </div>
    <div class="loading" v-if="member.page<member.totalPages">
      上滑加载更多…
    </div>
    <div class="loading" v-else>
      已经到尽头了
    </div>
  </div>
</template>

<script>
// import Swiper from '../../components/common/swiper.vue'
import { mapState,mapActions } from 'vuex'
var interval = null;
export default {
  components: {
    // Swiper
  },
  metaInfo() {
      return {
        title: this.$t('membersMeta.tit'),
        meta: [
          {
            name: "keywords",
            content: this.$t('membersMeta.key')
          },
          {
            name: "description",
            content: this.$t('membersMeta.des')
          }
        ]
      }
    },
  asyncData({ route, store }) {
    let lang = 0;
      if ( !!route.query.lang && route.query.lang === 'en' ) {
        lang = 1;
      }
      return Promise.all([
        // {page:1,pageSize:9,language: lang}
        store.dispatch('getList',{page:1,pageSize:10}),
        store.dispatch('getTeamList',{page:1,pageSize:5})
      ])
  },
  watch: {
    '$route.query.lang'(n, o) {
        // this.getNewData(1, n, o);
    }
  },
  mounted() {
    console.log('teamList',this.member.teamList)
    window.addEventListener('scroll',this.getMore);
    this.initializeTab()
  },
  computed: {
    ...mapState([
      'member'
    ])
  },
  data() {
      return {
        startPosition: {
          x: 0,
          y: 0
        },
        movePosition: {
          x: 0,
          y: 0
        },
        translateX: 0,
      }
  },
  methods: {
    ...mapActions([
        'getList'
    ]),
    setQuery() {
        let query = ''
        for (var key in this.$route.query) {
          query += key + '=' + this.$route.query[key] + '&'
        }
        this.query = '?' + query.substr(0, query.length - 1)
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
        if(this.member.page >= this.member.totalPages){
          return;
        }
        this.getList({
          page: this.member.page+1,
          pageSize: 10,
          language: this.lang == 'en' ? 1 : 0,
        })
        return ;
      }
    },
    initializeTab() {
      var ele = this.$refs.tabList;
      var box = ele.getBoundingClientRect();
      ele.addEventListener("touchstart", this.touchStart, false);
    },
    touchStart(event) {
      event = event || window.event;

      var touchTarget = event.touches[0];
      var ele = this.$refs.tabList;
      this.startPosition = {
        x: touchTarget.pageX,
        y: touchTarget.pageY
      };
      console.log('touchStart')
      ele.addEventListener("touchmove", this.touchMove, false);
      ele.addEventListener("touchend", this.touchEnd, false);
    },
    touchMove(event) {
      event = event || window.event;
      var touchTarget = event.touches[0];
      var movePosition = {
        x: touchTarget.pageX,
        y: touchTarget.pageY
      };

      this.movePosition = movePosition;
      this.translate();
    },
    translate() {
      var ele = this.$refs.tabList;
      var page = this.getPageWidthOrHeight();
      var box = ele.getBoundingClientRect();

      var translateX = this.translateX + this.calcTranslateX();
      console.log('translate',translateX)
      ele.style.transform = `translateX(${translateX}px)`;
    },
    touchEnd(event) {
      event = event || window.event;

      var translateX = this.translateX + this.calcTranslateX();

      this.translateX = translateX;

      var ele = this.$refs.tabList;
      ele.removeEventListener("touchmove", this.touchMove, false);
    },
    calcTranslateX() {
      var startPosition = this.startPosition;
      var movePosition = this.movePosition;

      var translateX = movePosition.x - startPosition.x;
      var ele = this.$refs.tabList;
      var page = this.getPageWidthOrHeight();
      var box = ele.getBoundingClientRect();
      var maxX = Math.abs(box.width - page.width) + this.translateX;

      if (this.translateX + translateX > 0) {
        return -this.translateX;
      }
      if (maxX + translateX <= 0) {
        return -maxX;
      }
      var tabItemWidth = box.width / this.tabItemCount;
      return translateX;
    },
    getPageWidthOrHeight() {
      var page = {};
      page.width = window.innerWidth;
      page.height = window.innerHeight;
      if (document.compatMode == "CSS1Compat") {
        page.width = document.documentElement.clientWidth;
        page.height = document.documentElement.clientHeight;
      } else {
        page.width = document.body.clientWidth;
        page.height = document.body.clientHeight;
      }
      return Object.assign({}, page);
    },
  }
}
</script>
<style lang="less" scoped>
  .member{
    padding: 30px 0 30px 17px;
    width: 100%;
    overflow: hidden;
  }
  .member-h{
    font-size: 20px;
    color: #333333;
    margin-bottom: 20px;

  }
  .m-info{
    height: 155px;
    .card{
      display: inline-block;
      background: #F3F3F3;
      border-radius: 8px 40px 8px 20px;
      width: 212px;
      height: 155px;
      position: relative;
      padding: 20px 10px;
      vertical-align: top;
      .marks{
        position: absolute;
        top: 7.8px;
        left: 10px;
        width: 10px;
        height: 10px;
      }
    }
    .m-slogan{
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 16px;
      color: #333333;
      line-height: 23px;
      margin-bottom: 10px;
      height: 69px;
      font-weight: 600;

    }
    .t-info{
      position: relative;
      .left-img{
        position: absolute;
        width: 36px;
        height: 36px;
        border-radius: 4px;
        background: #fff;
      }
      .t-text{
        margin-left: 45px;
        height: 36px;
        .t-name{
          font-size: 13px;
          color: #666666;
          line-height: 18px;
          font-weight: 500;
        }
        .t-address{
          font-size: 12px;
          color: #999;
        }
      }
    }
    .card+.card{
      margin-left: 10px;
    }
  }
  .m-content{
    height: 115px;
    padding: 17px 0;
    position: relative;
    border-bottom: 1px solid #F3F3F3;
    margin-right: 16px;
    display: block;
  }
  .m-content .left-head{
    display: inline-block;
    position: absolute;
    left: 0;
    top: 15px;
    width: 114px;
    height: 85px;
    border-radius: 4px;
    border: 1px solid #F3F3F3;
    margin-right: 10px;
  }
  .m-content .right-box{
    display: inline-block;
    margin-left: 124px;
    height: 85px;
    display: flex;
    justify-content:space-between;
    flex-direction:column;
  }
  .right-box .m-title{
    font-size: 16px;
    color: #333333;
    line-height: 24px;
    font-weight: bold;
  }
  .right-box .m-address{
    font-size: 12px;
    color: #666666;
  }
  .m-bottom{
    font-size: 10px;
    color: #999999;
    line-height: 17px;
  }
  .m-readed{
    float: right;
  }
  .loading{
    height: 100px;
    text-align: center;
    font-size: 15px;
    color: #666666;
    padding-top: 30px;
  }
</style>

