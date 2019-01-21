<template>
  <div class="welfare-detail">
    <div class="welfare-swiper">
      <div class="swiper" :style="welfare.detail.couponCover?'background: url('+welfare.detail.couponCover+'?x-oss-process=image/quality,q_80) center top / cover no-repeat;':''"></div>
    <!-- <img :src="welfare.detail.couponCover" alt="" class="swiper"> -->
    <!-- <div v-swiper:envSwiper="swiperOption" >
        <div class="swiper-wrapper" ref="swiper">
          <div class="swiper-slide" v-for="(item, index) in welfare.detail" :key="index">
            <img :src="item.couponCover">
            <span class="env-name">{{item.envName}}</span>
          </div>
        </div>
    </div> -->
    </div>

      <img :src="welfare.detail.couponCover" alt="" class="small-img">
      <span class="item-value" v-if="!!welfare.detail.faceValue">{{welfare.detail.faceValue}}</span>

    <div class="item-detail">
      <div class="item-top">
        <p class="title">{{welfare.detail.title}}</p>
        <p class="desc">{{welfare.detail.descr}}</p>
        <div class="tags">
            <span class="text text-one" >人气值{{welfare.detail.hotValue}}</span>
            <span class="text text-two" v-for="(item,i) in welfare.detail.tagName" :key="i">{{item}}</span>
          </div>
        <!-- <div class="tags">
          <span>人气值123</span>
          <span>美食</span>
        </div> -->
      </div>

      <div class="item-intro">
        <p class="intro-title">福利简介</p>
        <div class="intro-detail">
          {{welfare.detail.couponDetail}}
        </div>
      </div>

      <div class="item-tips" v-if="!!welfare.detail.useRule">
        <p class="intro-title">使用提示</p>
        <p class="tip-rule" >
          <!-- 不与店内其他优惠同享 -->
          {{welfare.detail.useRule}}
        </p>
        <p class="tip-time">营业时间:09:00 - 23:00</p>
        <div class="tip-adress" v-if="!!welfare.detail.merchantAddress">
          {{welfare.detail.merchantAddress}}
          <span></span>
          <span></span>
        </div>
      </div>

    </div>
    <div class="line"></div>
    <!-- <div class="item-receive">立即领取</div> -->

  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data(){
    return {
      swiperOption:{

      }
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
.welfare-detail {
  position: relative;
}
  .welfare-swiper {
    .swiper {
      width: 375px;
      height: 188px;
    }
  }
      .small-img {
        position: absolute;
        top: 148px;
        right: 16px;
        width: 80px;
        height: 80px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        border-radius: 8px;
      }
      .item-value {
        position: absolute;
        left: 16px;
        top: 177px;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #ECCB6F;
        letter-spacing: 0;
        line-height: 18px;
        padding: 6px 10px;
        background: #2E2E2E;
      }
  .item-detail {
    margin-top: 43px;
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
      .tags{
        overflow: hidden;
        margin: 0 -3px;
        .text{
          float: left;
          border-radius: 4px;
          margin: 0 5px 5px;
          padding: 1px 6px;
        }
        .text-one{
          border: 1px solid #FECBC8;
          color: #FF6868;
          background: #FFF5F5;
        }
        .text-two{
          border: 1px solid #CCCCCC;
          color: #999;
          background: #fff;
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

