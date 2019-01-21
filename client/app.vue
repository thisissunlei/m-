<style>
@import "./assets/styles/global.less";
.re-article {
  position: relative;
}
</style>
<template>
  <div id="app">
    <Header></Header>
    <div class="empty"></div>
    <article class="re-article">
      <router-view @sensors="setSensors"></router-view>
    </article>
    <Footer></Footer>
    <Sa :sensors="sensorsData"></Sa>
  </div>
</template>

<script>
import Header from './components/common/header.vue'
import Footer from './components/common/footer.vue'
import Sa from './components/common/sa.vue'


export default {
  components: {
    Header,
    Footer,
    Sa
  },
  data() {
    return {
      lang: null,
      language: null,
      cityId: null,
      sensorsData: {}
    }
  },
  watch: {
    '$route.query.lang'(n, o) {
      this.language = n === 'en' ? 1 : 0
      this.$store.dispatch('getHeaderCityDownList', { language: this.language });
    },
    '$route.query.cityId'(n, o) {
      this.$store.commit('setHeaderCityId', n);
    }
  },
  created() {
    // 获取 设置lang
    if (!!this.$route.query.lang) {
      this.lang = this.$route.query.lang;
      this.$i18n.locale = this.$route.query.lang;
    } else {
      this.lang = 'zh';
      this.$i18n.locale = 'zh'
    }
    this.language = this.lang === 'en' ? 1 : 0
  },
  mounted() {
    var lang = this.$route.query.lang;
    var cityId = this.$route.query.cityId;
    if ( !!lang && !!cityId ) {
      this.$store.commit('setCommonLang', lang);
      this.$store.commit('setHeaderCityId', cityId);
    }
    this.win = typeof window == "undefined" ? global : window
    if (!this.$store.state.common.ip || this.$store.state.common.ip.length == 0) {
      this.$store.dispatch('getHeaderCommunityByip')
        .then(res => {
          if (!cityId) {
            this.cityId = this.$store.state.common.ip[0]
          }
          if (!lang || !cityId) {
            this.pushUrl()
          } else {
            this.$store.dispatch('getHeaderCityDownList', { language: this.language })
          }
        })
    } else {
      if (!cityId) {
        this.cityId = this.$store.state.common.ip[0]
      }
      if (!lang || !cityId) {
        this.pushUrl()
      }
    }
  },
  methods: {
    pushUrl() {
      var path = this.$route.path;
      var query = this.$route.query;
      var newQuery = JSON.parse(JSON.stringify(query));
      newQuery.lang = this.lang;
      newQuery.cityId = this.cityId;
      this.$store.commit('setCommonLang', this.lang);
      this.$store.commit('setHeaderCityId', this.cityId);
      this.$router.replace({ path: path, query: newQuery });
    },
    setSensors(data) {
      this.sensorsData = data
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  position: relative;
}
.empty {
  width: 375px;
  height: 50px;
}
</style>

