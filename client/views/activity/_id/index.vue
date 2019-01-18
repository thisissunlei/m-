<template>
  <div class="activity-detail">
    <div class="item-top">
      <div class="item-title">
        {{activity.activityDetail.title}}
      </div>
      <div class="item-head">
          <div class="detail-info">
            <img src="../../../assets/images/activity/time.png" alt="" class="logo">
            <span class="text">时   间</span>
            <span class="content">{{activity.activityDetail.time}}</span>
          </div>
          <div class="detail-info">
            <img src="../../../assets/images/activity/location.png" alt="" class="logo">
            <span class="text">社   区</span>
            <!-- <span class="text city-name" v-if="!!activity.activityDetail.cityName">{{activity.activityDetail.cityName}}</span> -->
            <span class="content">{{activity.activityDetail.communityName}}</span>
          </div>
          <div class="detail-info">
            <img src="../../../assets/images/activity/address.png" alt="" class="logo">
            <span class="text">地   址</span>
            <span class="content">{{activity.activityDetail.address}}</span>
          </div>
          <div class="detail-info" v-if="activity.activityDetail.sponsor">
            <img src="../../../assets/images/activity/owner.png" alt="" class="logo">
            <span class="text">主办方</span>
            <span class="content">{{activity.activityDetail.sponsor}}</span>
          </div>
          <!-- <div class="info">
            <div class="price" v-if="!activity.activityDetail.cost">免费</div>
            <div class="price" v-if="!!activity.activityDetail.cost"><span class="unit">￥</span>1000</div>
            <div class="sign-info" v-if="false">已有123人报名</div>
          </div> -->
        </div>
      <!-- <div class="item-time">

        <img src="../../../assets/images/activity/time.png" alt="" class="fl icon">
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
    </div> -->
    <div class="item-content" v-html="activity.activityDetail.richText"></div>

    <!-- <div class="sign-box">
      <div class="sign-up">
        <span class="sing-num">98</span>人已报名
      </div>
      <div class="no-sign">
        立即报名
      </div>
    </div> -->
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
      .item-title {
        max-height: 60px;
        margin-bottom: 10px;
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
      .item-head{
      display: inline-block;
      padding-bottom: 5px;
      border-bottom: 1px solid #F3F3F3;
      vertical-align: top;
      position: relative;
      .status{
        height:24px;
        width:58px;
      }
      .detail-info{
        font-size: 15px;
        color: #666;
        line-height: 20px;
        margin-bottom: 15px;
        .text{
          vertical-align: top;
        }
        .content {
          margin-left: 16px;
          color: #333;
        }
        // .city-name{
        //   position: relative;
        //   margin-right:6px;
        //   &::after{
        //     content:'';
        //     display: inline-block;
        //     border:2px solid #666;
        //     border-radius:2px;
        //     position: absolute;
        //     top: 8px;
        //     margin-left:2px;
        //   }
        // }
        .logo{
          height:12px;
          width:13px;
          margin-top: 3px;
          margin-right: 6px;
        }
      }
      .info{
        position: absolute;
        bottom:1px;
        .price{
          display: inline-block;
          font-size:16px;
          color:#FF6868;
          line-height:20px;
          height:20px;
          margin-right:10px;
          font-weight:600;
        }
        .unit{
          font-size:12px;
          margin-right:-3px;
        }
        .sign-info{
          display: inline-block;
          font-size:14px;
          color:#333;
          line-height:20px;
          height:20px;
        }
      }
    }
      // .item-time,.item-address,.item-cmt,.item-sponsor {
      //   position: relative;
      //   height: 21px;
      // }
      // .item-time,.item-address {
      //    margin: 15px 0;
      // }
      // span {
      //   display: inline-block;
      // }
      // .icon {
      //   width: 14px;
      //   height: 16px;
      //   margin-right: 6px;
      //   background: url("../../../assets/images/activity/time.png");
      //   background-size: cover;
      // }
      // .text {
      //   margin-right: 15px;
      //   font-family: PingFangSC-Regular;
      //   font-size: 15px;
      //   color: #666666;
      // }
      // .rl-text {
      //   max-width: 270px;
      //   font-family: PingFangSC-Regular;
      //   font-size: 15px;
      //   color: #333333;
      //   // overflow: hidden;
      //   // white-space: nowrap;
      //   // text-overflow: ellipsis;
      // }
    }
    .item-content {
      margin-top: 20px;
      margin-bottom: 51px;
      font-family: PingFang-SC-Regular;
      font-size: 16px;
      color: #666666;
      letter-spacing: 0;
      line-height: 26px;
      p>img {
        width: 343px ;
        height: 155px;
      }
    }
    // .sign-box {
    //   display: flex;
    //
    //   height: 56px;
    //   margin: 0 -16px;
    //   line-height: 56px;
    //   border-bottom: 1px solid #FFFFFF;
    //   border-top: 1px solid #FFFFFF;
    //   .sign-up {
    //     width: 140px;
    //     height: 56px;
    //     font-family: PingFangSC-Regular;
    //     font-size: 18px;
    //     color: #999999;
    //     text-align: center;
    //   }
    //   .no-sign {
    //     flex: 1;
    //     height: 56px;
    //     background-image: linear-gradient(-217deg, #FFDF00 0%, #FFEB00 100%);
    //     font-family: PingFangSC-Regular;
    //     font-size: 17px;
    //     color: #624D17;
    //     text-align: center;
    //   }
    // }
  }
</style>


<style>
  /* p{
    width: 343px ;
    height: 155px;
  } */
  /* img {
    width: 343px ;
    height: 155px;
  } */
</style>
