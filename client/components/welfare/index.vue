<template>
  <div :class="$route.name != 'welfare-id-index'?'warp':''">
    <div class="clearfix welfare-box">
      <a :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString" target="_blank"
         class="detail-info" v-for="(item, i) in list" :key="i">
        <div class="card-img" :style="item.couponCover?'background: url('+item.couponCover+'?x-oss-process=image/quality,q_80) center top / cover no-repeat' :''"></div>
        <div class="card-text">
          <div class="card-title over-point">{{item.title}}</div>
          <div class="card-info over-point ">{{item.descr}}</div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['list'],
    components: {},
    data() {
      return {}
    },
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang='less' scoped>
  .detail-info{
    display: flex;
    padding: 20px 16px;
    border-bottom: 1px solid #F3F3F3;

    &:last-child{
      border-bottom: none;
    }
    .card-img{
      width: 96px;
      height: 96px;
      border-radius: 4px;
      background: #FFFFFF;
      overflow: hidden;
      display:inline-block;
      border: 1px solid #EEE;
    }
    .card-text{
      flex: 1;
      // display: inline-block;
      // vertical-align: top;
      // width: 210px;
      margin-left: 10px;
      .card-title{
        font-family: PingFangSC-Medium;
        line-height: 20px;
        font-size: 17px;
        color: #333;
        // font-weight: 500;
      }
      .card-info{
        font-size:14px;
        color: #999;
        margin-top: 2px;
      }
    }
  }
</style>
