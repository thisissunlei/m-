<template>
  <div class="detail-map">
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
        <bm-label :content="detail.list.communityName"
          :offset="{width: -20, height: -30}" />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'components/vue-baidu-map/components/map/Map.vue'
import BmMarker from 'components/vue-baidu-map/components/overlays/Marker.vue'
import BmLabel from 'components/vue-baidu-map/components/overlays/Label.vue'


export default {
  props: ['change'],

  components: {
    BaiduMap,
    BmMarker,
    BmLabel
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      detail: {}
    }
  },
  watch: {
    'change'(n, o) {
      this.detail = this.$store.state.detail
      // this.centerAndZoom()
    },
  },
  created() {
    this.detail = this.$store.state.detail

  },
  mounted() {
  },
  methods: {
    handler({ BMap, map }) {
      console.log(this.detail)

      this.center.lng = this.detail.list.longitude
      this.center.lat = this.detail.list.latitude
      this.zoom = 15
    },
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
  z-index: 30;
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>

