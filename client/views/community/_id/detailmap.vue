<template>
  <div class="detail-map">
    <div class="top">
      <baidu-map class="bm-view"
        ak="FqwyBT0DR8BunOKYZ0ABDoWU"
        :center="center"
        :zoom="zoom"
        @ready="handler">
        <bm-marker :position="{lng: center.lng, lat: center.lat}"
          :dragging="true"
          :icon="{
                  url: 'https://web.krspace.cn/kr-new-web/location5.png',
                  size: {
                    width: 40,
                    height: 71
                  }
                }">
        </bm-marker>
      </baidu-map>
    </div>
    <div class="bottom">
      <div class="left">
        <div class="name">{{detail.list.communityName}}</div>
        <div class="address">{{detail.list.address}}</div>
      </div>
      <div class="right"
        @click="jumpMap"></div>
    </div>

  </div>
</template>

<script>
import BaiduMap from 'components/vue-baidu-map/components/map/Map.vue'
import BmMarker from 'components/vue-baidu-map/components/overlays/Marker.vue'


export default {
  components: {
    BaiduMap,
    BmMarker,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      detail: {}
    }
  },
  created() {
    this.detail = this.$store.state.detail

  },
  mounted() {
    console.log(this.detail)
  },
  asyncData({ route, router, store }) {
    let cmtId = route.params.id;
    let lang = route.query.lang == 'en' ? 1 : 0;
    return Promise.all([
      store.dispatch('getNewCommunityDetails', { id: cmtId, language: lang })
    ])
  },
  methods: {
    handler({ BMap, map }) {
      console.log(this.detail)

      this.center.lng = this.detail.list.longitude
      this.center.lat = this.detail.list.latitude
      this.zoom = 15
    },
    jumpMap() {
      var lat_start, lng_start;
      var _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          lat_start = r.point.lat;
          lng_start = r.point.lng;
          var map_uri = "https://api.map.baidu.com/direction?origin=latlng:" + lat_start + "," + lng_start +
            "|name:我的位置&destination=latlng:" + _this.center.lat + "," + _this.center.lng + "|name:" + _this.detail.list.address
            + "&&mode=driving&region=" + _this.detail.list.communityName + "&output=html";
          window.location.href = map_uri;
        }
        else {
          alert('failed' + this.getStatus());
        }
      }, { enableHighAccuracy: true })

    }
  }
}
</script>

<style lang="less" scoped>
.detail-map {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
  }
  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    display: flex;
    padding: 0 12px;
    justify-content: space-between;
    align-items: center;
    .left {
      flex: 1;
      .name {
        font-size: 17px;
        color: #333333;
      }
      .address {
        font-size: 13px;
        color: #666666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 310px;
      }
    }
    .right {
      width: 34px;
      height: 34px;
      background: url("../../../assets/images/communityDetail/daohang.png")
        no-repeat center center;
      background-size: cover;
      border-radius: 50%;
    }
  }
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>

