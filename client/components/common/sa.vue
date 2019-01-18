<template>
  <div></div>
</template>
<script>
  var sa
  export default {
    props: ['sensors'],
    components: {},
    data() {
      return {}
    },
    watch: {
      'sensors'(n, o) {
        if ( !!n.name ) {
          if ( n.name === '$Booking' ) {
            sa.login(n.data.book_tel);
          }
          this.setSensors(n)
        }
        console.log(n, !!n.name, o, !!o.name)
      }
    },
    mounted() {
//       http://i.krspace.cn/sensors/sa?project=production
//       https://i.krspace.cn/sensors/sa?project=default
//      https://i.krspace.cn/sensors/sa?project=default
//      https://i.krspace.cn/sensors/sa?project=production
      sa = require('sa-sdk-javascript')
      sa.init({
        heatmap_url: 'https://krspace.cn/static/heatmap.min.js',
        server_url: 'https://i.krspace.cn/sensors/sa?project=default',
        heatmap: {
          clickmap: 'default',
          scroll_notice_map: 'not_collect'
        }
      });
      sa.quick('autoTrack')
      sa.quick('isReady', () => {
        this.$store.commit('setDistinctId', sa.store.getDistinctId())
      });
      if ( !!this.sensors && !!this.sensors.name ) {
        this.setSensors(this.sensors)
      }
    },
    methods: {
      setSensors(data) {
        sa.track( data.name, data.data);
      }
    }
  }
</script>
