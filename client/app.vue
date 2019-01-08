<style>
  @import './assets/styles/global.less';
  .re-article{
    position: relative;
  }
</style>
<template>
  <div id="app">
    <Header ></Header>
    <article class="re-article">
      <router-view></router-view>
    </article>
    <!-- <Footer></Footer> -->


  </div>
</template>

<script>
  import Header from './components/common/header.vue'
  import Footer from './components/common/footer.vue'


  export default {
    components: {
      Header,
      Footer
    },
    data() {
      return {
        lang: null,
        language: null,
        cityId: null,
      }
    },
    watch: {
      '$route.query.lang'(n, o) {
        this.language = n === 'en' ? 1 : 0
        // console.log('this.lang',this.language) 
        this.$store.dispatch('getHeaderCityDownList', {language: this.language});
      },
      '$route.query.cityId'(n, o) {
        this.$store.commit('setHeaderCityId', n);
      }
    },
    created(){
      // 获取 设置lang
      if ( !!this.$route.query.lang ) {
        this.lang = this.$route.query.lang;
        this.$i18n.locale = this.$route.query.lang;
      } else {
        this.lang = 'zh';
        this.$i18n.locale = 'zh'
      }
      this.language = this.lang === 'en' ? 1 : 0
    },
    mounted(){
      var lang = this.$route.query.lang;
      var cityId = this.$route.query.cityId;
      this.win = typeof window == "undefined" ? global : window
      if ( !this.$store.state.common.ip || this.$store.state.common.ip.length == 0 ) {
        this.$store.dispatch('getHeaderCommunityByip')
          .then(res => {
            if ( !cityId ) {
              this.cityId = this.$store.state.common.ip[0]
            }
            if ( !lang || !cityId ) {
              this.pushUrl()
            } else {
              // console.log("this.lllll",this.language);
              this.$store.dispatch('getHeaderCityDownList', {language: this.language})
            }
          })
      } else {
        if ( !cityId ) {
          this.cityId = this.$store.state.common.ip[0]
        }
        if ( !lang || !cityId ) {
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
        this.$router.replace({ path: path, query: newQuery});
      },
    },
  }
</script>

<style lang="less" scoped>
  #app{
    position: relative;
  }
</style>

