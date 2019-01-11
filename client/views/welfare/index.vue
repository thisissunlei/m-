<template>
  <div class="g-welfare-contain">
    <section class="recommend">
      <!-- <h1>{{$t('welfare.title')}}</h1> -->
      <!-- <div class="recommend-list clearfix">
          <a  class="recommend-detail" v-for="(item, i) in welfare.recommend" target="_blank" :key="i"
              :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString">
            <span class="card-bg" :style="item.couponCover?'background: url('+item.couponCover+'?x-oss-process=image/quality,q_80) center top / cover no-repeat' :''"></span>
            <span class="card-title over-point">{{item.title}}</span>
            <span class="card-info over-point">{{item.descr}}</span>
          </a>
        </div> -->
    </section>
    <section class="detail-list">
      <div class="tab-contain">
        <nav>
          <p v-for="(item,i) in welfare.tags" :key="i" @click="selectType(item)"
          :class="activeTab == item.tagId?'tab-box activity':'tab-box'"
          >{{item.tagName}}</p>
        </nav>
      </div>

      <div class="welfare-list">
        <DefaultPage v-if="!welfare.totalCount" title="暂无数据"></DefaultPage>
        <div class="list-info" v-else>
            <Welfare :list="welfare.list" ></Welfare>
        </div>
      </div>
    </section>
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
      }
    },
    components: {
      DefaultPage,
      Welfare
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
        console.log("page,totalPages",this.welfare.page,this.welfare.totalPages);
        if(this.welfare.page >= this.welfare.totalPages){
          return;
        }
      console.log("555",this.welfare.page,this.lang,this.activeTab);

        this.getWelfareList({
          page: this.welfare.page+1,
          pageSize: 10,
          language: this.lang == 'en' ? 1 : 0,
          tags: this.activeTab
        })
        // console.log("0000999",this.welfare.list);
        return ;
      }
    }
    }
  }
</script>

<style lang='less' scoped>
  .g-welfare-contain {
    width: 375px;
    // .recommend {
    //   height: 336px;
    //   background: palegoldenrod;
    // }
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
    .tab-box {
      font-size: 16px;
      color: #999999;
      font-weight: 600;
      display: inline-block;
      height: 26px;
      line-height: 26px;
      &:hover {
        cursor: pointer;
      }
    }

    .tab-contain {
      width: 375px;
      // overflow: hidden;
      position: relative;
      margin-bottom: 30px;
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
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          line-height: 14px;
          background: #F3F3F3;
          border-radius: 4px;
        }
        .tab-box+.tab-box {
          margin-left: 10px;
        }
        .activity {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #D29D01;
        background: #FFF9B2;
        border: 1px solid #FFDD54;
        border-radius: 4px;
        }
      }
    }
  }
</style>
