<template>
  <div class="about-box">
    <div class="tabs-list">
       <div :class="activeTab==item.value ?'tab active-tab ':'tab'" v-for="(item, i) in  $t('aboutTab')" :key="i">
          <a  :href="'//'+$store.state.common.origin+'/about'+query[i]">
            {{item.name}}
          </a>
          <span class="lang" v-if="activeTab==item.value && lang=='en'" ></span>
          <span class="line" v-if="activeTab==item.value && lang=='zh'" ></span>
        </div>
    </div>

    <div class="about-content">
      <Introduce v-if="activeTab == 'size'"/>
      <Things v-if="activeTab == 'things'"/>
      <News v-if="activeTab == 'news'"/>
      <Join v-if="activeTab == 'join'"/>
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
    this.lang = this.$route.query.lang;
    this.setQuery()
  },
  watch:{
    '$route'(n, o) {
        if ( n.query.lang != o.query.lang ) {
          this.lang = n.query.lang;
        }
      },
      '$store.state.common.queryString'() {
        this.setQuery()
      }
  },
  created(){
    this.activeTab = this.$route.query.tab || 'size';
      this.query = this.$t('aboutTab').map((val, i) => {
        return '?tab='+val.value
      })
  },
  // 在服务器端获取并渲染数据，渲染组件之前异步获取数据
  asyncData ({ route, store, router }) {
    let lang = 0;
      if ( !!route.query.lang && route.query.lang === 'en' ) {
        lang = 1;
      }
      return Promise.all([
        store.dispatch('getNewsList',{page:1,pageSize:9,language: lang})
      ])
  },
  methods: {
    setQuery() {
        this.query = this.$t('aboutTab').map((val, i) => {
          return this.$store.state.common.queryString+'&tab='+val.value
        })
      }
  },
}
</script>

<style lang="less" scoped>
.about-box {
  padding: 0 16px;
  .tabs-list {
    margin-top: 38px;
    // background:pink;
    padding-bottom: 3px;
      .tab {
        position: relative;
        display: inline-block;
        font-size:18px;
        color:#666;
        margin-right: 24px;
      }
      div:last-child {
      margin-right: 0;
      }
      .active-tab {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      &:hover{
        color:#333;
        font-weight:600;
        cursor: pointer;
      }
      .line{
        position: absolute;
        left:50%;
        transform:translateX(-50%);
        display: inline-block;
        width: 20px;
        height: 2px;
        background-color: #333;
        border-radius:2px;
        // bottom:-16px;
        // animation: moveNine 0.4s forwards linear;
      }
  }
}
</style>

