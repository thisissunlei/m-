<template>
  <div class="activity-detail">
    <div class="item-top">
      <div class="item-title">
        {{activity.activityDetail.title}}
      </div>
      <div class="item-time">
        <span class="icon fl"></span>
        <span class="text fl">时   间</span>
        <span class="rl-text fl">
          2018-09-11  12:00:00
        </span>
      </div>
      <div class="item-cmt">
        <span class="icon fl"></span>
        <span class="text fl">社   区</span>
        <span class="rl-text fl">
          {{activity.activityDetail.communityName}}
        </span>
      </div>
      <div class="item-address">
        <span class="icon fl"></span>
        <span class="text fl">地   址</span>
        <span class="rl-text fl">
          {{activity.activityDetail.address}}
        </span>
      </div>
      <div class="item-sponsor">
        <span class="icon fl"></span>
        <span class="text fl">主办方</span>
        <span class="rl-text fl">
          {{activity.activityDetail.sponsor}}
        </span>
      </div>
    </div>
    <div class="item-content" v-html="activity.activityDetail.richText"></div>
    <div class="sign-box">
      <div class="sign-up">
        <span class="sing-num">
          {{activity.activityDetail.countJoin}}
        </span>
         人已报名
      </div>
      <div class="no-sign">
        立即报名
      </div>
    </div>
  </div>
</template>

<script>

import { mapState,mapActions } from 'vuex'
export default {
  data(){
    return {

    }
  },
   computed: {
      ...mapState([
        'activity',
      ])
    },
  asyncData({router,route,store}) {
    // let lang = route.query.lang || 'zh'
    // let params = route.params;
    // params.language = lang == 'en'? 1: 0;
    // console.log("route888",route);

    return Promise.all([
      store.dispatch('getActivityDetail',route.params),
    //   // store.dispatch('getOthers',{language:lang=='en'? 1: 0}),
      ])
  },
  mounted(){

    console.log('this.store6666',this.activity.activityDetail)
  }
}

</script>

<style lang="less" scoped>
  .activity-detail {
    padding: 20px 16px 0px 16px;
    .item-top {
      padding-bottom: 20px;
      border-bottom: 1px solid  #F3F3F3;
      .item-title {
        max-height: 60px;
        font-family:PingFang-SC-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-height: 30px;
      }
      .item-time,.item-address,.item-cmt,.item-sponsor {
        height: 21px;
      }
      .item-time,.item-address {
         margin: 15px 0;
      }
      span {
        display: inline-block;
      }
      .icon {
        width: 14px;
        height: 16px;
        margin-right: 6px;
        background: palegreen;
      }
      .text {
        margin-right: 16px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #666666;
      }
      .rl-text {
        max-width: 270px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
      }
    }
    .item-content {
      margin-top: 20px;
      margin-bottom: 51px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      color: #666666;
      letter-spacing: 0;
      line-height: 26px;
    }
    .sign-box {
      width: 375px;
      height: 56px;
      border-bottom: 1px solid #333;
      border-top: 1px solid #333;
      div { display: inline-block }
      .sign-up {
        width: 140px;
        height: 56px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #999999;
        text-align: center;
      }
      .no-sign {
        width: 235px;
        height: 56px;
        background-image: linear-gradient(-217deg, #FFDF00 0%, #FFEB00 100%);
        font-family: PingFangSC-Regular;
        font-size: 17px;
        color: #624D17;
        text-align: center;
      }
    }
  }
</style>

