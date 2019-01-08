<template>
  <header class="clearfix">
    <div v-if="lang === 'zh'" class="fl header-logo">
      <a :href="'//'+$store.state.common.origin+$store.state.common.queryString">
        <img src="../../assets/images/header/logo-zh.svg" alt="氪空间联合办公共享办公众创空间">
      </a>
    </div>
    <div v-else class="fl select header-logo">
      <a :href="'//'+$store.state.common.origin+$store.state.common.queryString">
        <img src="../../assets/images/header/logo-en.svg" alt="氪空间联合办公共享办公众创空间">
      </a>
    </div>

    <div class="city fl" v-if="!!listenCityList && listenCityList.length > 0">
      <div class="clearfix" @click="setCitysState(true)">
          <div class="img fl icon" ></div>
          <span class="fl"  v-for="(item, i) in listenCityList" :key="i" v-if="cityId*1 == item.cityId*1">{{item.cityName}}</span>
          <div class="img jiao fl"></div>
      </div>
      <!-- 下拉城市菜单 -->
      <div class="citys-box" v-show="citysShow">
        <div class="citys-title" v-for="(item, i) in listenCityList" :key="i" v-if="cityId*1 == item.cityId*1">
          当前选择:{{item.cityName}}
        </div>
        <ul class="citys clearfix" >
          <li v-for="(item, i) in listenCityList" :key="i" :class="cityId*1 == item.cityId*1? 'fl select': 'fl'" @click="setCitysState(false, item.cityId, i)">
            <span>{{item.cityName}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="fr">
      <div class="lang fl">
        <div class="img" v-if="lang === 'zh'"></div>
        <div class="img select" v-else></div>
        <span class="fl" @click="setLang('zh', 0)"></span>
        <span class="fl" @click="setLang('en', 0)"></span>
      </div>
      <div class="other fl">
        <div class="img" @click="setMenuState" v-if="menuShow == false && isVisit == false"></div>
        <div class="img select" @click="setMenuState" v-else></div>
        <!-- 下拉菜单 -->
      <div class="menu-mask" v-show="menuShow">
        <div class="menu-box" >
          <div class="menus clearfix" >
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+$store.state.common.queryString">{{$t("nav.home")}}</a>
            </div>
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+'/community'+$store.state.common.queryString">{{$t("nav.community")}}</a>
            </div>
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+'/welfare'+$store.state.common.queryString">{{$t("nav.welfare")}}</a>
            </div>
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+'/activity'+$store.state.common.queryString">{{$t("nav.activity")}}</a>
            </div>
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+'/members'+$store.state.common.queryString">{{$t("nav.members")}}</a>
            </div>
            <div class="fl">
              <a :href="'//'+$store.state.common.origin+'/about'+$store.state.common.queryString">{{$t("nav.about")}}</a>
            </div>
            <span class="recommend fl">{{$t("nav.recommend")}}</span>
            <span class="calculator fl">{{$t("nav.calculator")}}</span>
          </div>
          <div class="order" @click="jumpVisit">立即预约</div>
      </div>
    </div>
      </div>
    </div>

    <div class="mark" v-if="citysShow" @click="setCitysState(false)"></div>
    <Visit
    :Close="jumpVisit"
    :areaDisabled="areaDisabled"
    v-if="isVisit"/>
  </header>
</template>

<script>

  import Vue from "vue";
  import Visit from './visit.vue'
  export default {
    // props: {
    //   openVisit: Function
    // },
    components:{
      Visit
    },
    data() {
      return {
        citysShow: false,
        lang: 'zh',
        language: 0, // 0:中文 1:英文
        index: null,
        cityIndex: 0,
        cityId: Number,
        menuShow:false,
        isVisit:false,
        areaDisabled: false
      }
    },
    computed: {
      listenCityList() {
        return this.$store.getters.throwHeaderCityList;
      },
      watchMain(){
        return this.$store.getters.watchMain;
      },
      clientIp() {
        return this.$store.getters.throwClientIp;
      }
    },
    metaInfo: {
      title: '氪空间官网移动端',
      meta: [
        {
          charset: 'UTF-8',
          lang: 'zh'
        }
      ]
    },
    watch: {
      '$route'(n, o) {
        this.lang = n.query.lang || 'zh'
        this.cityId = n.query.cityId || ''
      },

    },
    created() {
      this.lang = this.$route.query.lang || 'zh'
      this.cityId = this.$route.query.cityId
    },
    mounted() {
      // console.log("state",this.listenCityList);

    },
    methods: {
      setLang(data, num) { // 语言切换
        this.$i18n.locale = data
        this.lang = data;
        this.language = num;
        this.$store.dispatch('getInitialState', {language: this.language, lang: this.lang});
        this.$store.commit('setCommonLang', this.lang);
        this.pushUrl();
      },

      setCitysState(state, id, i) { // 切换城市
        this.citysShow = state;
        if ( !!id || id === 0 ) {
          this.cityIndex = i;
          this.cityId = id;
          if ( this.$route.name === 'activity-id-index' ) {
            this.jumpUrl('/activity');
          } else if ( this.$route.name === 'community-id-index' ) {
            this.jumpUrl('/community');
          } else {
            this.pushUrl();
          }
        }
      },
      pushUrl() {
        var path = this.$route.path;
        var query = this.$route.query;
        var newQuery = JSON.parse(JSON.stringify(query));
        newQuery.lang = this.lang;
        newQuery.cityId = this.cityId;
        this.$router.replace({ path: path, query: newQuery});
      },
      jumpUrl(path) {
        var query = this.$route.query;
        var newQuery = JSON.parse(JSON.stringify(query));
        newQuery.lang = this.lang;
        newQuery.cityId = this.listenCityList[this.cityIndex].cityId;
        var url = '';
        for (var key in newQuery) {
          url += key + '=' + newQuery[key] + '&';
        }
        let win = typeof window == "undefined" ? global : window
        win.location.href = path + '?' + url.substr(0,url.length-1);
      },
      setMenuState(){
        this.menuShow = !this.menuShow;
        if(this.isVisit){
          this.isVisit = !this.isVisit;
        }
      },
      jumpVisit(){
        this.isVisit = true;
      }
    }
  }
</script>

<style lang="less" scoped>
// .menu-mask {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     z-index: 9900;
//     overflow: hidden;
//     animation-fill-mode: both;
//     background: rgba(0,0,0,0.60);
// }

  header {
    border-bottom: 1px #eee solid;
    padding: 0 16px;
    height: 50px;
    .header-logo {
      width: 72px;
      height: 34px;
      margin: 7px 10px 0 0;
      a {
        display: block;
        width: 72px;
        height: 34px;
        color: #333333;
        border-radius: 8px;
        overflow: hidden;
        img {
          display: block;
          width: 72px;
          height: 34px;
        }
      }
    }
    .city {
      position: relative;
      padding: 14px  0;
      height: 50px;

      span {
        vertical-align: top;
        height: 22px;
        line-height: 22px;
        font-size: 16px;
      }
      .img {
        &.icon {
          background: url("../../assets/images/header/loation-zh.svg") center center no-repeat;
          margin: 4px 4px 0 0;
          height: 15px;
          width: 14px;

        }
        &.jiao {
          background: url("../../assets/images/header/triangle-zh.svg") center center no-repeat;
          margin: 13px 0 0 3px;
          height: 8px;
          width: 8px;

        }
      }
      img {
        &.icon {
          background: url("../../assets/images/header/loation-zh.svg") center center no-repeat;
          margin: 4px 4px 0 0;
          height: 13.5px;
          width: 12px;
          &.select {
            background: url("../../assets/images/communityDetail/location.png") center center no-repeat;
          }
        }
        &.jiao {
          margin: 12px 0 0 3px;
          height: 8px;
          width: 8px;
        }
      }
      .citys-box {
        position: absolute;
        left: -98px;
        top: 51px;
        z-index: 200;
        width: 375px;
        padding: 20px 60px;
        background: #FFFFFF;
        .citys-title {
          height: 22px;
          font-size: 16px;
          color: #333333;
        }
        li {
            height: 32px;
            width: 54px;
            margin-top: 20px;
            margin-right: 36px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #666666;
            text-align: center;
            line-height: 25px;
            &:nth-child(3n) {
              margin-right: 0;
            }
            &.select {
              span {
                position: relative;
                color: #333333;
                font-size: 18px;
                font-weight: bold;
                &:after {
                  content: '';
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  left: 65px;
                  top: 4px;
                  border-radius: 50%;
                  background: #ffeb00;
                }
              }
            }
          }
      }
    }

    .lang {
      position: relative;
      width: 76px;
      height: 28px;
      margin: 11px 16px 0 0;
      border-left: none;
      .img {
        position: absolute;
        top: 0;
        left: 0;
        background: url("../../assets/images/header/cn.svg") center center no-repeat;
        height: 28px;
        width: 76px;
        &.select {
          background: url("../../assets/images/header/en.svg") center center no-repeat;
        }
      }
      span {
        position: relative;
        cursor: pointer;
        text-align: center;
        height: 28px;
        width: 38px;
      }
    }
    .other {
      .img {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-top: 18px;
        background: url("../../assets/images/header/more.svg") center center no-repeat;
        vertical-align: top;
        &.select {
          background: url("../../assets/images/header/close.svg") center center no-repeat;
          background-size: cover;
        }
      }
      .menu-box {
        position: absolute;
        left: 0px;
        top: 50px;
        z-index: 200;
        width: 375px;
        // padding-bottom: 20px;
        // border-bottom: 1px solid #333;
        background: #FFFFFF;
        // background: palegreen;
        .menus {
          padding: 22px 60px 20px 60px;
          border-bottom: 1px solid #333;
          font-family: PingFang-SC-Regular;
          font-size: 16px;
          color: #333333;
          text-align: center;
          div {
            width:32px;
            height: 22px;
            margin-bottom: 20px;
            margin-right: 79px;
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
          .recommend {
            display: inline-block;
            margin-right: 63px;
          }
        }
        .order {
            width: 255px;
            height: 44px;
            margin: 16px 60px;
            line-height: 44px;
            text-align: center;
            font-family: PingFang-SC-Regular;
            font-size: 16px;
            color: #624D17;
            background-image: linear-gradient(-217deg, #FFDF00 0%, #FFEB00 100%);
            border-radius: 4px;
          }
      }

    }
    // .mark {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   z-index: 190;
    //   background: rgba(0,0,0,0.60);
    // }

  }

</style>

