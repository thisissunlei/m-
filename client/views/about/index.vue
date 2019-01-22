<template>
  <div class="about-box">
    <div class="tab-contain">
      <nav>
        <p v-for="(item,i) in $t('aboutTab')" :key="i" @click="selectType(item)"
        :class="activeTab == item.value?'tab-box activity':'tab-box'"
        >
        <a v-if="item.name === '加入我们' || item.name === 'Join us'" href="https://zhaopin.krspace.cn/m/apply/36kr/140/#/home?_k=ipbgmo" target="_blank">
              {{item.name}}
        </a>
        <a v-else :href="'//'+$store.state.common.origin+'/about'+query[i]">
            {{item.name}}
        </a>
        <!-- {{item.name}} -->
          <span class="lang" v-if="activeTab==item.value && lang=='en'" ></span>
          <span class="line" v-if="activeTab==item.value && lang=='zh'" ></span>
        </p>
      </nav>
    </div>

    <div class="about-content">
      <Introduce v-if="activeTab == 'size'"/>
      <Things v-if="activeTab == 'things'"/>
      <News v-if="activeTab == 'news'"/>
      <!-- <Join v-if="activeTab == 'join'"/> -->
    </div>
  </div>
</template>

<script>
import Introduce from './introduce.vue'
import Things from './things.vue'
import News from './news.vue'
import Join from './join.vue'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  data () {
    return {
      lang:'zh',
      activeTab: null,
      tabList:[],
      query: []
    }
  },
  components: {
    Introduce,
    Things,
    News,
    Join
  },
  computed: {
    // listenState () {
    //   return this.$store.getters.throwState;
    // },
    // ...mapState([
    //   'about'
    // ])
  },
  mounted () {

    // this.lang = this.$route.query.lang;

    // this.setQuery()
  },
  watch:{
    '$route'(n, o) {
        if ( n.query.lang != o.query.lang ) {
          this.lang = n.query.lang;
        }
      },
       '$store.state.common.queryString'(n, o) {
         this.query = this.$t('aboutTab').map((val, i) => {
           return this.$store.state.common.queryString+'&tab='+val.value
         })
       }
  },
  created(){
    this.activeTab = this.$route.query.tab || 'size';
  },
  mounted(){

  },
  // 在服务器端获取并渲染数据，渲染组件之前异步获取数据
  asyncData ({ route, store, router }) {
    let lang = 0;
    if ( !!route.query.lang && route.query.lang === 'en' ) {
      lang = 1;
    }
    return Promise.all([
      store.dispatch('getNewsList',{page:1,pageSize:10,language: lang})
    ])
  },
  methods: {
    setQuery() {
        this.query = this.$t('aboutTab').map((val, i) => {
          return this.$store.state.common.queryString+'&tab='+val.value
        })
      },
      selectType(item) {
        this.activeTab = item.value;
    },
  },
}
</script>

<style lang="less" scoped>
.about-box {
  padding: 0 16px;
   .tab-contain {
      margin-top: 38px;
      padding-bottom: 3px;
      position: relative;
      nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
        .tab-box {
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #666666;
          text-align: center;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          margin-right: 24px;
        }
        .activity {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        text-align: center;
        }
        .line{
          position: absolute;
          transform:translateX(-50%);
          display: inline-block;
          width: 20px;
          height: 2px;
          background-color: #333;
          border-radius:2px;
        }
        .lang{
          width:20px;
          position: absolute;
          background-image: linear-gradient(48deg, #564F45 0%, #1C1B1B 100%);
          transform:translateX(-50%);
          display: inline-block;
          height:2px;
          background-color: #333;
          border-radius:2px;
          animation: moveEn 0.4s forwards linear;
        }
      }
    }
}
</style>
