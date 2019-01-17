<template>
  <div class="community">
    <!--筛选条件-->
    <ul class="screen">
      <li @click="screenBoxShow(1)">
        {{$t('communityLocation')}}
        <span :class="screenIndex === 1? 'select': ''"></span>
      </li>
      <li @click="screenBoxShow(2)">
        {{$t('communityState')}}
        <span :class="screenIndex === 2? 'select': ''"></span>
      </li>
      <li @click="screenBoxShow(3)">
        {{$t('communityPrice')}}
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
          <div :class="!item.cbdList || all? 'select': ''"
               @click="changeUrl('porCbdId', '', '全部', '办公位置')">全部</div>
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
               :class="item.status*1 === listData.openStatus*1? 'select': ''">
            <i>{{$t('communityOpenStatus')[item.status]}}</i>
          </div>
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
               :class="item.priceId*1 === listData.portalPriceId*1? 'select': ''">
            <i v-if="item.priceInterval === '全部'">{{$t('communityPriceAll')}}</i>
            <i v-else>{{item.priceInterval}} {{$t('communityPricePic')}}</i>
          </div>
        </li>
      </ul>
      <div class="reset" @click="changeUrl('reset')">重置所有条件</div>
    </div>
    <div class="mark" @click="screenBoxShow(0)" v-if="screenIndex != 0"></div>
  </div>
</template>
<script>
  export default {
    props: ['index'],
    components: {},
    data() {
      return {
        screenIndex: 0,
        community: {},
        listData: {
          language: 0,
          cityId: 0,
          porCbdId: 0,
          openStatus: 0,
          portalPriceId: 0,
          page: 1,
          pageSize: 100
        },
        all: false
      }
    },
    watch: {
      'index'(n, o) {
        this.screenIndex = n
      },
      '$route.query'() {
        this.setData(1)
      }
    },
    created() {
      this.community = this.$store.state.community
    },
    mounted() {
    },
    methods: {
      setData() {
        let query = this.$route.query;
        this.listData = {
          language: query.lang === 'en' ? 1 : 0,
          cityId: query.cityId || 0,
          porCbdId: query.porCbdId || null,
          openStatus: query.openStatus || 0,
          portalPriceId: query.portalPriceId || 0,
          page: 1,
          pageSize: 100
        }
      },
      screenBoxShow(i) {
        if ( i === this.screenIndex ) {
          this.screenIndex = 0;
        } else {
          this.screenIndex = i;
        }
        this.setIndex()
      },
      changeUrl(name, id, item, title) {
//      this.setSearchSensors(name, id, item, title)
        let path = this.$route.path;
        let query = this.$route.query;
        let newQuery = JSON.parse(JSON.stringify(query));
        newQuery[name] = id;
        if ( name === 'cityId' || name === 'porCbdId' ) {
          this.all = false
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
        if ( name === 'porCbdId' && item === '全部' ) {
          this.all = true
        }
        if ( name != 'cityId' ) {
          this.screenIndex = 0;
        }
        this.$router.replace({ path: path, query: newQuery});
      },
      setIndex() {
        this.$emit('change', this.screenIndex)
      }
    }
  }
</script>
<style lang='less' scoped>
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
          margin: 0 0 -2px 5px;
          border: 4px solid #666;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
          &.select {
            margin: 0 0 3px 5px;
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
      position: fixed;
      left: 0;
      right: 0;
      top: 91px;
      z-index: 60;
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
    .mark {
      position: fixed;
      left: 0;
      right: 0;
      top: 91px;
      bottom: 0;
      z-index: 50;
      background: rgba(0,0,0,0.60);
    }
  }
</style>
