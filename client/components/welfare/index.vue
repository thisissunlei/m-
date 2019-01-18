<template>
  <div :class="$route.name != 'welfare-id-index'?'warp':''">
    <div class="clearfix welfare-box">
      <a :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString" target="_blank"
         class="detail-info" v-for="(item, i) in list" :key="i">
        <div class="card-img" :style="item.couponCover?'background: url('+item.couponCover+'?x-oss-process=image/quality,q_80) center top / cover no-repeat' :''"></div>
        <div class="card-text">
          <p class="card-title">{{item.title}}</p>
          <p class="card-descr">{{item.descr}}</p>
          <!-- <div class="tags">
            <span class="text text-one">人气值{{welfare.detail.hotValue}}</span>
            <span class="text text-two" v-for="(item,i) in welfare.detail.tagName" :key="i">{{item}}</span>
          </div> -->
           <div class="tags">
            <span class="text text-two">打卡圣地</span>
            <span class="text text-two">推荐美食</span>
          </div>
          <p class="card-discount">
            <span class="discount">满100减20</span>
            <span class="text-one">人气值400</span>
          </p>
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
      margin-left: 10px;
      .card-title{
        max-width: 230px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: PingFangSC-Medium;
        line-height: 20px;
        font-size: 17px;
        color: #333;
      }
      .card-descr{
        max-width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #666666;
        line-height: 17px;
        margin: 6px 0;
      }
      .tags{
        overflow: hidden;
        margin: 6px 0 10px 0;
        .text{
          float: left;
          border-radius: 4px;
          margin-right: 3px;
          padding: 1px 3px;
          font-size: 10px;
        }
        .text-two{
          border: 1px solid #CCCCCC;
          color: #999;
          background: #fff;
        }
      }
      .card-discount {
        position: relative;
        .discount {
          max-width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FF3434;
          letter-spacing: 0;
          line-height: 18px;
        }
        .text-one{
          position: absolute;
          left: 185px;
          font-size: 10px;
          border: 1px solid #FECBC8;
          color: #FF6868;
          background: #FFF5F5;
        }
      }
    }
  }
</style>
