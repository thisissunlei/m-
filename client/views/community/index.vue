<template>
  <div class="community">
    <h1 style="display: none;">氪空间联合办公室出租</h1>
    <Screen :len="len" :all="all" @change="changeScreenInde"></Screen>
    <!--列表-->
    <div class="list" v-if="!!community.list.items && !!community.list.items.length && !mapShow">
      <Item :listData="listData" v-for="item, i in community.list.items" :key="i" :item="item" :i="i"></Item>
    </div>
    <div class="none" v-if="(!community.list.items || !community.list.items.length) && !loading">
      {{$t('communityDefault')}}
    </div>
    <div :class="!!mapShow? 'map select': 'map'" @click="mapShow = !mapShow"
         v-if="!!community.list.items && !!community.list.items.length && this.listData.cityId != 0"></div>
    <Map v-if="!!community.list.items && !!community.list.items.length && !!mapShow"
         @change="changeMap" :change="dataChange"></Map>
    <div class="map-detail" v-if="!!community.list.items && !!community.list.items.length && !!mapShow">
      <Item :listData="listData" v-for="item, i in community.list.items" v-if="i===mapIndex" :key="i" :item="item" :i="i"></Item>
    </div>
  </div>
</template>

<script>
  import Screen from './screen.vue'
  import Item from './item.vue'
  import Map from './map.vue'
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
          pageSize: 100
        },
        all: false,
        mapShow: false,
        mapIndex: null,
        dataChange: 1,
        len: 0,
        loading: true
      }
    },
    components: {
      Screen,
      Item,
      Map
    },
    metaInfo() {
      return {
        title: this.$t('communityMeta.tit'),
        meta:[
          {
            name: "keywords",
            content: this.$t('communityMeta.key')
          },
          {
            hid: "community",
            name: "description",
            content: this.$t('communityMeta.des')
          }
        ]
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
          pageSize: 100
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
      setData(state) {
        let query = this.$route.query;
        this.cbdData = {
          language: query.lang === 'en' ? 1 : 0,
          cityId: query.cityId || 0
        }
        this.priceData = {
          language: query.lang === 'en' ? 1 : 0,
          cbdId: query.porCbdId || null,
          cityId: query.cityId || 0
        }
        this.listData = {
          language: query.lang === 'en' ? 1 : 0,
          cityId: query.cityId || 0,
          porCbdId: query.porCbdId || null,
          openStatus: query.openStatus || 0,
          portalPriceId: query.portalPriceId || 0,
          page: 1,
          pageSize: 100
        }
        if ( !!this.listData.lang || !!this.listData.cityId ) {
          this.loading = false
        }
        if ( this.listData.cityId === 0 ) {
          this.mapShow = false
        }
        if ( !!state ) {
          this.getNewData()
        }
      },
      getNewData() {
        this.len = 100
        this.$store.dispatch('getNewCommunityCbds', this.cbdData)
          .then(res => {
            let list = this.$store.state.community.cbdList.filter((val, i) => {
              return val.cityId*1 === this.listData.cityId*1
            })
            if ( !list[0].cbdList ) {
              this.all = true
              this.len = 0;
            } else {
              this.len = list[0].cbdList.length
            }
          })
        this.$store.dispatch('getNewCommunityStatus', this.priceData)
        this.$store.dispatch('getNewCommunityList', this.listData)
          .then(res => {
            this.loading = false
            this.mapIndex = null
            this.dataChange = this.dataChange+1
            this.community = JSON.parse(JSON.stringify(this.$store.state.community));
          })
      },
      changeScreenInde(data) {
        this.screenIndex = data
      },
      changeMap(data) {
        this.mapIndex = data
      }
    }
  }
</script>

<style lang="less">
  .te {
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
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
    &.select {
      position: fixed;
      top: 50px;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10;
      overflow: hidden;
    }
    .list {
      border-bottom: 1px #f3f3f3 solid;
      background: #ffffff;
    }
    .none {
      background: #fff url('../../assets/images/none.png') center top no-repeat;
      -webkit-background-size: 116px 106px;
      background-size: 116px 106px;
      margin-top: 60px;
      padding: 130px 30px 50px;
      line-height: 20px;
      font-size: 15px;
      color: #666666;
      text-align: center;
    }
    .map {
      position: fixed;
      right: 16px;
      bottom: 60px;
      height: 48px;
      z-index: 40;
      background: url('../../assets/images/community/map.png') 0 0 no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      width: 48px;
      &.select {
        background: url('../../assets/images/community/list.png') 0 0 no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }
    }
    .map-detail {
      position: fixed;
      left: 8px;
      right: 8px;
      bottom: 10px;
      z-index: 35;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px 0 rgba(200,200,200,0.50);
      a {
        margin: 0;
        padding: 10px;
      }
    }
  }
</style>
