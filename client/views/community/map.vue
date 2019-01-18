<template>
  <div class="community-map">
    <baidu-map class="bm-view" ak="FqwyBT0DR8BunOKYZ0ABDoWU" @ready="setMap">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" v-if="mapShow"></bm-navigation>

      <bm-marker v-for="item, i in list" :key="i" v-if="mapShow"
                 :animation="i == index ? 'BMAP_ANIMATION_BOUNCE' : ''"
                 :class="i == index ? 'marker' : ''"
                 :position="{lng: item.longitude, lat: item.latitude}"
                 :icon="{
                  url: i == index ? 'https://web.krspace.cn/kr-new-web/location5.png' : 'https://web.krspace.cn/kr-new-web/location4.png',
                  size: {
                    width: 40,
                    height: i == index ? 71 : 58
                  }
                }"
                 @click="mapPointClick(i)">
        <bm-label :content="item.cmtName" v-if="i == index"
                  :offset="{width: -80,height: -50}"/>
      </bm-marker>
    </baidu-map>
  </div>
</template>
<script>
  import BaiduMap from 'components/vue-baidu-map/components/map/Map.vue'
  import BmNavigation from 'components/vue-baidu-map/components/controls/Navigation.vue'
  import BmMarker from 'components/vue-baidu-map/components/overlays/Marker.vue'
  import BmLabel from 'components/vue-baidu-map/components/overlays/Label.vue'
  let mapData
  export default {
    props: ['change'],
    components: {
      BaiduMap,
      BmNavigation,
      BmMarker,
      BmLabel
    },
    data() {
      return {
        mapShow: false,
        community: {},
        list: [],
        index: null
      }
    },
    watch: {
      'change'(n, o) {
        this.community = this.$store.state.community
        this.list = this.$store.state.community.list.items
        this.centerAndZoom()
      },
    },
    created() {
      this.community = this.$store.state.community
      this.list = this.$store.state.community.list.items
    },
    mounted() {},
    methods: {
      setMap({BMap, map}) {
        let t = setInterval(() => {
          if ( !!map ) {
            clearInterval(t)
            this.mapShow = true
            mapData = map
            this.centerAndZoom()
          }
        })
      },
      centerAndZoom() {
        console.log(this.list)
        if ( !this.mapShow ) {
          return;
        }
        let points = []
        this.list.forEach((val, i) => {
          points.push({
            lng: val.longitude,
            lat: val.latitude
          })
        })

        var view = mapData.getViewport(eval(points))
        var mapZoom = view.zoom > 12 ? 12 : view.zoom
        console.log(view.zoom, mapZoom)
        var centerPoint = view.center
        mapData.centerAndZoom(centerPoint, mapZoom)
      },

      mapPointClick(i) {
        this.index = i
        this.$emit('change', i)
        let dom = window.document.getElementsByClassName('BMap_Marker')
        let len = i*1 + this.list.length
        setTimeout(() => {
          dom[i*1].style.zIndex = 10
          dom[len].style.zIndex = 10
        }, 100)
//        this.win.open('//'+this.$store.state.common.origin+'/community/' + this.newList[i].communityId + this.$store.state.common.queryString)
      }
    }
  }
</script>
<style lang='less'>
  .bm-view {
    height: 100%;
    width: 100%;
    label {
      border: 0!important;
      background: #FBFBFC;
      box-shadow: 0 2px 4px 0 rgba(98,77,23,0.10);
      border-radius: 4px;
      padding: 0 20px!important;
      height: 40px;
      width: 180px;
      text-align: center;
      line-height: 40px!important;
      font-size: 14px!important;
      color: #624D17;
    }
  }
  .community-map {
    position: fixed;
    left: 0;
    right: 0;
    top: 91px;
    bottom: 0;
    z-index: 30;
    background: #8ED1A6;
  }
</style>
