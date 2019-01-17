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
      <a href="#" v-for="item, i in community.list.items">
        <div class="img" :style="!!item.recommendPicUrl? 'background: url('+item.recommendPicUrl+'?x-oss-process=image/resize,h_560,w_420,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
        <div class="con">
          <div class="tit over-point" v-if="!!item.cmtName">{{item.cmtName}}</div>
          <div class="add">
            <div class="icon"></div>
            <div class="txt over-point2">北京市朝阳区建国路108号海航实业大厦9层北京市朝阳区建国路108号海航实业大厦9层</div>
          </div>
          <div class="info">
            <div class="mj">
              <div class="icon"></div>
              <div class="txt"> >{{item.area}} {{$t('communitySQ')}}</div>
            </div>
            <div class="gw">
              <div class="icon"></div>
              <div class="txt">{{item.stationNum}} {{$t('communityGW')}}</div>
            </div>
          </div>
          <div class="tip">
            <div v-for="lableItem, lableI in item.lableList" :key="lableI" v-if="lableI < 2">
              <span class="label0"></span>
              <span class="label1">{{lableItem}}</span>
              <span class="label2"></span>
            </div>
          </div>
          <div class="te" v-html="$t('communityTe')" v-if="!item.openStatus"></div>
          <div class="price">
            <div class="yj" v-if="!!item.price && !!item.levelPrice">
              <i v-if="listData.cityId*1 === 366">HK$</i>
              <i v-else>¥</i>
              {{item.price}}
            </div>
            <div class="xj-dw" v-if="!!item.price || !!item.levelPrice">
              <i v-if="listData.cityId*1 === 366">HK$</i>
              <i v-else>¥</i>
            </div>
            <div class="xj" v-if="!!item.price || !!item.levelPrice">{{item.levelPrice || item.price}}</div>
            <div class="dw" v-if="!!item.price || !!item.levelPrice"><i v-if="listData.language === 0">起/</i>{{$t('communityPer')}}</div>
            <div class="zw" v-if="item.openStatus == true && !item.price && !item.levelPrice && listData.language === 0">暂无报价</div>
          </div>
        </div>
      </a>
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
        pageSize: 50
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
        pageSize: 50
      })
    ])
  },
  watch: {
    '$route.query'() {
      this.setData(1)
    }
  },
  created() {
    this.community = this.$store.state.community
  },
  mounted() {
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
        pageSize: 50
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

<style lang="less">
  .te {
    height: 20px;
    line-height: 20px;
    margin-bottom: 12px;
    color: #333333;
    font-size: 12px;
    font-weight: bold;
    text-align: right;
    span {
      display: inline-block;
      vertical-align: middle;
      border: 1px solid #FF5050;
      border-radius: 100%;
      margin-top: -3px;
      height: 20px;
      width: 20px;
      color: #ff5050;
      font-size: 14px;
      text-align: center;
    }
  }
</style>
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
    .list {
      a {
        display: flex;
        border-bottom: 1px #f3f3f3 solid;
        margin: 0 16px;
        padding: 20px 0;
        &:last-child {
          border: none;
        }
      }
      .img {
        flex-shrink: 0;
        border: 1px #f3f3f3 solid;
        background: #cccccc;
        border-radius: 8px;
        height: 140px;
        width: 105px;
      }
      .con {
        flex-shrink: 1;
        flex-grow: 1;
        background: #eeeeee;
        margin-left: 16px;
        overflow: hidden;
        .tit {
          margin-bottom: 8px;
          height: 17px;
          line-height: 17px;
          max-width: 220px;
          color: #333333;
          font-size: 16px;
          font-weight: bold;
        }
        .add {
          display: flex;
          margin-bottom: 5px;
          .icon {
            background: url('../../assets/images/index/address.png') 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            flex-shrink: 0;
            margin-top: 1px;
            height: 14px;
            width: 13px;
          }
          .txt {
            flex-shrink: 1;
            flex-grow: 1;
            padding-left: 6px;
            max-width: 207px;
            line-height: 18px;
            color: #666666;
            font-size: 13px;
          }
        }
        .info {
          display: flex;
          margin-bottom: 9px;
          .mj, .gw {
            display: flex;
            width: 50%;
            height: 13px;
            line-height: 13px;
            .txt {
              padding-left: 6px;
              height: 13px;
              line-height: 15px;
              color: #666666;
              font-size: 12px;
            }
          }
          .mj {
            .icon {
              background: url('../../assets/images/community/acreage.svg') 0 0 no-repeat;
              -webkit-background-size: 13px 13px;
              background-size: 13px 13px;
              height: 13px;
              width: 13px;
            }
          }
          .gw {
            border-left: 1px #979797 dashed;
            padding-left: 6px;
            .icon {
              background: url('../../assets/images/community/workpos.svg') 0 0 no-repeat;
              -webkit-background-size: 15px 15px;
              background-size: 15px 15px;
              margin-top: -1px;
              height: 15px;
              width: 15px;
            }
          }
        }
        .tip {
          display: flex;
          margin-bottom: 13px;
          height: 22px;
          div {
            max-width: 50%;
          }
        }
        .price {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          div {
            height: 18px;
          }
          .yj {
            line-height: 28px;
            color: #999999;
            font-size: 10px;
            text-decoration: line-through;
          }
          .xj-dw {
            line-height: 28px;
            margin-left: 9px;
            color: #FF5050;
            font-size: 12px;
            font-weight: bold;
          }
          .xj {
            line-height: 24px;
            color: #FF5050;
            font-size: 17px;
            font-weight: bold;
          }
          .dw {
            line-height: 26px;
            color: #151515;
            font-size: 12px;
            margin-left: 6px;
          }
          .zw {
            line-height: 22px;
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
