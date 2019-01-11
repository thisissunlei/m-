<template>
  <div class="member">
    我是会员页面
    <Swiper :list="activity.recommendActivity" width="375" height="250"
    :dots="true"
    />
  </div>
</template>

<script>
import Swiper from '../../components/common/swiper.vue'
import { mapState,mapActions } from 'vuex'

export default {
  components: {
    Swiper
  },
  asyncData({ route, store }) {
    let lang = 0;
      if ( !!route.query.lang && route.query.lang === 'en' ) {
        lang = 1;
      }
      return Promise.all([
        // {page:1,pageSize:9,language: lang}
        store.dispatch('getRecommendActivity'),
        store.dispatch('getActivityList')
      ])
  },
  mounted() {
    // console.log(this.activity.recommendActivity)
  },
  computed: {
    ...mapState([
      'activity'
    ])
  },
}
</script>

