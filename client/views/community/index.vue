<template>
  <div class="community">
    <!--筛选条件-->
    <ul class="screen">
      <li @click="screenBoxShow(1)">
        办公位置
        <span :class="screenIndex === 1? 'select': ''"></span>
      </li>
      <li @click="screenBoxShow(2)">
        社区状态
        <span :class="screenIndex === 2? 'select': ''"></span>
      </li>
      <li @click="screenBoxShow(3)">
        工位价格
        <span :class="screenIndex === 3? 'select': ''"></span>
      </li>
    </ul>
    <!--办公位置-->
    <div class="city" v-if="screenIndex === 1">
      <ul>
        <li class="city-list">
          <div v-for="item, i in community.cbdList" :key="i"
               @click="changeUrl('cityId', item.cityId, item.cityName, '办公位置')"
               :class="$route.query.cityId*1 === item.cityId*1? 'select': ''">{{item.cityName}}</div>
        </li>
        <li class="city-community" v-for="item, i in community.cbdList" :key="i" v-if="$route.query.cityId*1 === item.cityId*1">
          <div :class="!listData.porCbdId*1? 'select': ''">全部</div>
          <div v-for="cbdListItem, cbdListI in item.cbdList" :key="cbdListI"
               @click="changeUrl('porCbdId', cbdListItem.id, cbdListItem.cbdName, '办公位置')"
               :class="listData.porCbdId*1 === cbdListItem.id*1? 'select': ''">{{cbdListItem.cbdName}}</div>
        </li>
      </ul>
      <div class="reset" @click="changeUrl('reset')">重置所有条件</div>
    </div>
    <!--社区状态-->
    <div class="city status" v-if="screenIndex === 2">
      <ul>
        <li class="city-list">
          <div v-for="item, i in community.priceList.statusList" :key="i"
               @click="changeUrl('openStatus', item.status, item.name, '社区状态')"
               :class="item.status*1 === listData.openStatus*1? 'select': ''">{{item.name}}</div>
        </li>
      </ul>
      <div class="reset" @click="changeUrl('reset')">重置所有条件</div>
    </div>
    <!--工位价格-->
    <div class="city status" v-if="screenIndex === 3">
      <ul>
        <li class="city-list">
          <div v-for="item, i in community.priceList.priceTypeVos" :key="i"
               @click="changeUrl('portalPriceId', item.priceId, item.priceInterval, '工位单价')"
               :class="item.priceId*1 === listData.portalPriceId*1? 'select': ''">{{item.priceInterval}}</div>
        </li>
      </ul>
      <div class="reset" @click="changeUrl('reset')">重置所有条件</div>
    </div>
    <!--列表-->
    <div class="list">
      <a href="#"></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenIndex: 0,
      community: {},
      cbdData: {
        language: 0,
        cityId: 0
      },
      priceData: {
        language: 0,
        cbdId: 0,
        cityId: 0
      },
      listData: {
        language: 0,
        cityId: 0,
        porCbdId: 0,
        openStatus: 0,
        portalPriceId: 0,
        page: 1,
        pageSize: 10
      }
    }
  },
  asyncData({route, router, store}) {
    if ( !route.query.lang || !route.query.cityId ) {
      return
    }
    let language = route.query.lang === 'en'? 1: 0
    let cityId = route.query.cityId
    let porCbdId = route.query.porCbdId || null
    let openStatus = route.query.openStatus || 0
    let portalPriceId = route.query.portalPriceId || 0
    return Promise.all([
      store.dispatch('getNewCommunityCbds', {language: language, cityId: cityId}),
      store.dispatch('getNewCommunityStatus', {language: language, cityId: cityId, cbdId: porCbdId}),
      store.dispatch('getNewCommunityList', {
        language: language,
        cityId: cityId,
        porCbdId: porCbdId,
        openStatus: openStatus,
        portalPriceId: portalPriceId,
        page: 1,
        pageSize: 10
      })
    ])
  },
  watch: {
    '$route.query'() {
      this.setData(1)
    }
  },
  mounted() {
    this.community = this.$store.state.community
    console.log(this.community)
    this.setData(0)
  },
  methods: {
    screenBoxShow(i) {
      if ( i === this.screenIndex ) {
        this.screenIndex = 0;
      } else {
        this.screenIndex = i;
      }
    },
    setData(state) {
      let query = this.$route.query;
      this.cbdData = {
        language: query.lang === 'en' ? 1 : 0,
        cityId: query.cityId
      }
      this.priceData = {
        language: query.lang === 'en' ? 1 : 0,
        cbdId: query.porCbdId || null,
        cityId: query.cityId
      }
      this.listData = {
        language: query.lang === 'en' ? 1 : 0,
        cityId: query.cityId,
        porCbdId: query.porCbdId || null,
        openStatus: query.openStatus || 0,
        portalPriceId: query.portalPriceId || 0,
        page: 1,
        pageSize: 10
      }
      this.next = true
      if ( !!state ) {
        this.getNewData()
      }
    },
    getNewData() {
      this.$store.dispatch('getNewCommunityCbds', this.cbdData)
      this.$store.dispatch('getNewCommunityStatus', this.priceData)
      this.$store.dispatch('getNewCommunityList', this.listData)
    },
    changeUrl(name, id, item, title) {
//      this.setSearchSensors(name, id, item, title)
      let path = this.$route.path;
      let query = this.$route.query;
      let newQuery = JSON.parse(JSON.stringify(query));
      newQuery[name] = id;
      if ( name === 'cityId' || name === 'porCbdId' ) {
        if ( !!newQuery.openStatus ) {
          newQuery.openStatus = 0
        }
        if ( !!newQuery.portalPriceId ) {
          newQuery.portalPriceId = 0
        }
      }
      if ( name === 'cityId' && !!newQuery.porCbdId ) {
        newQuery.porCbdId = ''
      }
      if ( name === 'reset' ) {
        newQuery = {
          lang: query.lang,
          cityId: 0
        }
      }
      this.$router.replace({ path: path, query: newQuery});
    },
  }
}
</script>

<style lang="less" scoped>
  .community {
    .screen {
      display: flex;
      border-bottom: 1px #f6f6f6 solid;
      li {
        flex-grow: 1;
        text-align: center;
        height: 40px;
        line-height: 40px;
        span {
          display: inline-block;
          width: 0;
          height: 0;
          margin: 0 0 -3px 5px;
          border: 4px solid #666;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
          &.select {
            margin: 0 0 2px 5px;
            border: 4px solid #333;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid transparent;
          }
        }
      }
    }
    .reset {
      border-top: 1px #f6f6f6 solid;
      background: #ffffff;
      height: 50px;
      line-height: 50px;
      color: #333333;
      font-size: 15px;
      text-align: center;
    }
    .city {
      ul {
        display: flex;
        .city-list {
          background: #ffffff;
          flex-grow: 1;
          padding: 10px 0;
        }
        .city-community {
          background: #f6f6f6;
          padding: 10px 0;
          width: 222px;
        }
        li {
          div {
            padding-left: 50px;
            height: 38px;
            line-height: 38px;
            color: #666666;
            font-size: 14px;
            &.select {
              color: #333333;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
