<template>
  <header class="header">
    <div v-if="language == 0" class="fl header-logo">
      <a :href="'//'+origin+queryString">
        <img src="../../assets/images/header/logo-zh.svg" alt="氪空间联合办公共享办公众创空间">
      </a>
    </div>
    <div v-else class="fl select header-logo">
      <a :href="'//'+origin+queryString">
        <img src="../../assets/images/header/logo-en.svg" alt="氪空间联合办公共享办公众创空间">
      </a>
    </div>

    <!-- 城市选择哪个地方 -->
    <div class="city fl" v-if="!!listenCityList && listenCityList.length > 0">
      <div class="clearfix" v-if="this.$store.state.community.rightConter">
        <div class="img fl icon"></div>
        <span class="fl">{{selectCityName}}</span>
        <div class="img jiao fl"></div>
      </div>
      <div class="clearfix" @click="openCityDoenPage" v-else>
        <div class="img fl icon"></div>
        <span class="fl">{{selectCityName}}</span>
        <div class="img jiao fl"></div>
      </div>
      <!-- 下拉城市菜单 -->
      <div class="citys-box" v-show="citysShow">
        <div class="citys-title">{{$t('indexTitle.currentChoice')}}:{{selectCityName}}</div>
        <div v-for ="(item , index) in listenCityList" :key = "index" @click="setCitysState(item.cityId)" class="cityName">
          <span :class="cityId == item.cityId?'option':''">
            {{item.cityName}}
            <span class="currentOption " v-if="cityId == item.cityId">
                <img src="../../assets/images/header/option.png" alt>
            </span>
          </span>
          
        </div>
      </div>
    </div>
    <!-- 城市选中 -->
    <div class="fr">
      <div class="lang fl">
        <div class="img" v-if="language == 0"></div>
        <div class="img select" v-else></div>
        <span class="fl" @click="changeLang('zh', 0)"></span>
        <span class="fl" @click="changeLang('en', 1)"></span>
      </div>
      <div class="other fl">
        <div class="img select" @click="setMenuClose" v-if="this.$store.state.community.rightConter"></div>
        <div class="img" @click="setMenuOpen" v-else ></div>
        
        <!-- 下拉菜单 -->
        <div class="menu-box" v-show="menuShow">
          <div class="menus clearfix">
            <div class="menu-box-index">
              <a :href="'//'+$store.state.common.origin+$store.state.common.queryString">{{$t("nav.home")}}</a>
            </div>
            <div>
              <a :href="'//'+$store.state.common.origin+'/community'+$store.state.common.queryString">{{$t("nav.community")}}</a>
            </div>
            <div>
              <a :href="'//'+$store.state.common.origin+'/welfare'+$store.state.common.queryString">{{$t("nav.welfare")}}</a>
            </div>
            <div>
              <a :href="'//'+$store.state.common.origin+'/activity'+$store.state.common.queryString">{{$t("nav.activity")}}</a>
            </div>
            <div>
              <a :href="'//'+$store.state.common.origin+'/members'+$store.state.common.queryString">{{$t("nav.members")}}</a>
            </div>
            <div>
              <a :href="'//'+$store.state.common.origin+'/about'+$store.state.common.queryString">{{$t("nav.about")}}</a>
            </div>
            <div>
              <span>{{$t("nav.recommend")}}</span>
            </div>
            <div class="calculator">
              <span>{{$t("nav.calculator")}}</span>
            </div>
            <div class="line"> </div>
          </div>
          <div class="order" @click="jumpVisit">{{$t('indexTitle.order')}}</div>
        </div>
      </div>
    </div>
    <div class="menu-mask" v-if="this.menuShow || this.citysShow" @click="closeCityDoenPage"></div>
    <Visit :Close="jumpVisit" :areaDisabled="areaDisabled" v-if="this.$store.state.community.isVisit"/>
  </header>
</template>

<script>
import Vue from "vue";
import Visit from "./visit.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Visit
  },
  data() {
    return {
      selectCityName: "", //已经选中得城市
      citysShow: false, //下拉城市是否显示
      language: 0, // 0:中文 1:英文
      cityId: Number, //路由上面的city,只能在路由传参的时候修改
      menuShow: false,//办公首页
      areaDisabled: false
    };
  },
  computed: {
    ...mapGetters({
      listenCityList: "throwHeaderCityList",
      watchMain: "watchMain",
      clientIp: "throwClientIp"
    }),
    ...mapState({
      origin: state => state.common.origin,
      queryString: state => state.common.queryString
    })
  },
  metaInfo: {
    title: "氪空间官网移动端",
    meta: [
      {
        charset: "UTF-8",
        lang: "zh"
      }
    ]
  },
  watch: {
    $route(n, o) {
      this.language = n.query.lang == "zh" ? 0 : 1;
      this.cityId = n.query.cityId || "";
    },
    // 用来处理路由没有id然后进行回调
    cityId() {
      this.getHeadShowCity();
    },
    listenCityList(){
      this.getHeadShowCity();
    }
  },
  mounted() {
    this.language = this.$route.query.lang == "zh" ? 0 : 1;
    // 如果路由有城市id然后进行回调
    this.getHeadShowCity();
  },
  methods: {
    //获取头部的默认展示城市信息
    getHeadShowCity() {
      var cityId = (this.cityId = this.$route.query.cityId);
      this.listenCityList.map((val, index) => {
        if (val.cityId == cityId) {
          this.selectCityName = val.cityName;
        }
      });
    },
    // 语言切换
    changeLang(lang, language) {
      this.$i18n.locale = lang;
      this.language = language;
      this.$store.dispatch("getInitialState", { language, lang});//切换语言函数
      this.$store.commit("setCommonLang", lang);
      this.pushUrl(lang);
    },
    //打开城市下拉页面
    openCityDoenPage() {
      this.citysShow = true;
      this.$store.commit('openRightConter', true);
    },
    //关闭后面的阴影
    closeCityDoenPage() {
      if(this.citysShow){
        this.citysShow = false;
        this.$store.commit('openRightConter', false);
      }
      if(this.menuShow){
        this.menuShow = false;
        this.$store.commit('openRightConter', false);
      }
    },
    // 切换城市
    setCitysState(cityId) {
      this.cityId = cityId;
      console.log(this.$store.state.common)
      var lang = this.language == 0 ? 'zh' : 'en';
      if (this.$route.name === "activity-id-index") {
        this.jumpUrl("/activity");
      } else if (this.$route.name === "community-id-index") {
        this.jumpUrl("/community");
      } else {
        this.pushUrl(lang);
      }
      this.$store.commit('openRightConter', false);
      this.citysShow = false;
    },
    pushUrl(lang) {
      var path = this.$route.path;
      this.$router.replace({
        path,
        query: {
          lang,
          cityId: this.cityId
        }
      });
    },
    jumpUrl(path) {
      var query = this.$route.query;
      var newQuery = JSON.parse(JSON.stringify(query));
      newQuery.lang = this.language == 0 ? 'zh' : 'en';
      newQuery.cityId = this.cityId;
      var url = "";
      for (var key in newQuery) {
        url += key + "=" + newQuery[key] + "&";
      }
      let win = typeof window == "undefined" ? global : window;
      win.location.href = path + "?" + url.substr(0, url.length - 1);
    },
    setMenuOpen(){
       if(this.menuShow==false && this.citysShow==false){
        this.menuShow = true;
        this.$store.commit('openRightConter', true);
      }
    },
    setMenuClose(){
       if(this.$store.state.community.isVisit){
        this.$store.commit('optionVisit', false);
        if(this.menuShow){
          this.$store.commit('openRightConter', true);
        }else{
          this.$store.commit('openRightConter', false);
        }
        return false
      }
      if(this.menuShow){
        this.menuShow = false;
        this.$store.commit('openRightConter', false);
      }
      if(this.citysShow){
        this.$store.commit('openRightConter', false);
        this.citysShow = false;
      }
    },
    // 弹出立即预约窗口
    jumpVisit() {
      this.$store.commit('optionVisit', true);
    }
  }
};
</script>
<style>
.picker-item,
.picker-item.picker-selected {
  color: #666;
  font-size: 16px;
}
.picker-item.picker-selected.color {
  color: #333;
}
</style>
<style lang="less" scoped>
.menu-mask {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
  overflow: hidden;
  animation-fill-mode: both;
  background: rgba(0, 0, 0, 0.6);
}
header::after {
  content: "";
  display: block;
  clear: both;
}
header {
  position: fixed;
  width: 100%;
  height: 50px;
  border-bottom: 1px #eee solid;
  padding: 0 16px;
  background: #ffffff;
  z-index: 100;
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
    padding: 14px 0;
    height: 50px;

    span {
      vertical-align: top;
      height: 22px;
      line-height: 22px;
      font-size: 16px;
    }
    .img {
      &.icon {
        background: url("../../assets/images/header/loation-zh.svg") center
          center no-repeat;
        margin: 4px 4px 0 0;
        height: 15px;
        width: 14px;
      }
      &.jiao {
        background: url("../../assets/images/header/triangle-zh.svg") center
          center no-repeat;
        margin: 13px 0 0 3px;
        height: 8px;
        width: 8px;
      }
    }
    img {
      &.icon {
        background: url("../../assets/images/header/loation-zh.svg") center
          center no-repeat;
        margin: 4px 4px 0 0;
        height: 13.5px;
        width: 12px;
        &.select {
          background: url("../../assets/images/communityDetail/location.png")
            center center no-repeat;
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
      top: 50px;
      z-index: 200;
      width: 375px;
      height: 381px;
      overflow: scroll;
      padding: 20px 60px;
      background: #ffffff;
      .citys-title {
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        margin-bottom: 20px;
        color: #333333;
        text-align: center;
      }
      .cityName{
        position: relative;
        text-align: center;
        margin-bottom: 16px;
        span{
          font-size: 16px;
          color: #666;
          font-size: 16px;
          line-height: 22px;
        }
        .currentOption {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffeb00;
          transform: translateX(30px);
          img {
            width: 20px;
            height: 20px;
          }
        }
        .option{
          font-size: 18px;
          color:#333;
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
      background: url("../../assets/images/header/cn.svg") center top/contain
        no-repeat;
      height: 28px;
      width: 76px;
      &.select {
        background: url("../../assets/images/header/en.svg") center top/contain
          no-repeat;
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
      background: url("../../assets/images/header/more.svg") center center
        no-repeat;
      vertical-align: top;
      &.select {
        background: url("../../assets/images/header/close.svg") center center
          no-repeat;
        background-size: cover;
      }
    }
    .menu-box {
      position: absolute;
      left: 0px;
      top: 50px;
      z-index: 200;
      width: 375px;
      height: 472px;
      background: #ffffff;
      .menus {
        font-size: 17px;
        line-height: 24px;
        color: #333333;
        text-align: center;
        .menu-box-index{
          margin-top: 19px;
        }
        div {
          text-align: center;
          margin-bottom: 24px;
          a,
          span {
            font-family: PingFang-SC-Medium;
            display: inline-block;
            height: 24px;
          }
        }
        .calculator {
          padding-bottom: 16px;
          margin: 0
        }
        .line{
          height: 1px;
          width: 100%;
          background-color: #F6F6F6;
          margin-bottom:16px;
        }
      }
      .order {
        width: 255px;
        height: 44px;
        margin: 16px auto;
        line-height: 44px;
        text-align: center;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        color: #624d17;
        background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
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

