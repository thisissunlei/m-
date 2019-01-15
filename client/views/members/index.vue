<template>
  <div class="member">
    <h1 class="member-h">最新入驻团队</h1>
    <div class="m-info">
      
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
  asyncData({ route, store }) {
    let lang = 0;
      if ( !!route.query.lang && route.query.lang === 'en' ) {
        lang = 1;
      }
      return Promise.all([
        // {page:1,pageSize:9,language: lang}
        store.dispatch('getList',{page:1,pageSize:10}),
        store.dispatch('getTeamList',{page:1,pageSize:4})
      ])
  },
  mounted() {
    window.addEventListener('scroll',this.getMore);
  },
  computed: {
    ...mapState([
      'member'
    ])
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
        // console.log("0000999",this.welfare.list);
        return ;
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .member{
    padding: 30px 0 30px 17px;
  }
  .member-h{
    font-size: 20px;
    color: #333333;
  }
  .m-info{
    height: 155px;
    background: #ccc;
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

