<template>
  <div class="welfare-detail">
    <div class="welfare-swiper"></div>
    <div class="item-detail">

      <div class="item-top">
        <p class="title">{{welfare.detail.title}}</p>
        <p class="desc">{{welfare.detail.descr}}</p>
        <div class="tags">
          <span>人气值123</span>
          <span>美食</span>
        </div>
      </div>

      <div class="item-intro">
        <p class="intro-title">福利简介</p>
        <div class="intro-detail">
          {{welfare.detail.couponDetail}}
        </div>
      </div>

      <div class="item-tips">
        <p class="intro-title">使用提示</p>
        <p class="tip-rule">不与店内其他优惠同享</p>
        <p class="tip-time">营业时间:09:00 - 23:00</p>
        <div class="tip-adress">
          朝阳公园路西门1号棕榈生活广场B1层 A4
          <span></span>
          <span></span>
        </div>
      </div>

    </div>
    <div class="line"></div>
    <div class="item-receive">立即领取</div>

  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data(){
    return {

    }
  },
  asyncData({route, store}) {
      let lang = route.query.lang || 'zh'
      let params = route.params;
      let data = {
        benefitId: params.id,
        language:lang=='en'? 1: 0,
      }
      return Promise.all([
        store.dispatch('getWelfareDetail', data),
      ])
  },
  mounted(){
    let lang = this.$route.query.lang
    this.lang = lang
    // this.setQuery();
    console.log('福利详情',this.welfare.detail)
  },
  computed:{
    ...mapState([
        'welfare',
    ]),
  }
}
</script>

<style lang="less" scoped>
  .welfare-swiper {
    height: 228px;
    background: palegreen;
  }
  .item-detail {
    margin-top: 3px;
    padding:0 16px;
    .item-top {
      padding-bottom: 20px;
      border-bottom: 1px solid #F3F3F3;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        line-height: 20px;
      }
      .desc {
        margin: 8px 0;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #666666;
        letter-spacing: 0;
        line-height: 13px;
      }
      .tags {
        span {
          display: inline-block;
          border:1px solid #333;
        }
      }
    }
    .item-intro {
      padding-bottom: 20px;
      border-bottom: 1px solid #F3F3F3;
    }
    .intro-title {
      margin: 20px 0 12px 0;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      line-height: 18px;
    }
    .item-tips {
      padding-bottom: 20px;
      // border-bottom: 1px solid #F3F3F3;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      line-height: 14px;
      .tip-time {
        margin: 10px 0;
      }
      .tip-adress {
        font-family: PingFangSC-Medium;
        line-height: 20px;
        // margin-right: 5px;
        span {
          display: inline-block;
          width: 28px;
          height: 28px;
          margin-left: 12px;
          background: indianred;
        }
      }
    }
  }
  .line {
    width: 100%;
    height: 30px;
    background: #F3F3F3;
  }
  .item-receive {
    width: 100%;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background-image: linear-gradient(-217deg, #FFDF00 0%, #FFEB00 100%);
  }

</style>

<style>
  .intro-detail>img {
    width: 107px;
    height: 107px;
  }
</style>

