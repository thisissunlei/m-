<template>
  <div class="welfare-box">
    <div class="welfare-title">
        <span class="hot-text">
          {{$t('indexTitle.activity')}}
          <span :class="$route.query.lang === 'zh'? 'line' : 'en-line'"></span>
        </span>
      <div class="member-vip fr">
        <span class="pic"></span>
        <span class="vip">{{$t('indexTitle.vip')}}</span>
      </div>
    </div>
    <div class="content-box">
       <a :href="'//'+$store.state.common.origin+'/activity/' + item.id + $store.state.common.queryString" class="item-content" v-for="(item,i) in data" :key="i">
        <div v-if="!!item.imgUrl" :style="'background: url('+item.imgUrl+'?x-oss-process=image/resize,h_399,w_300,color_eeeeee,quality,q_80) center top / cover no-repeat'" class="item-img"></div>
        <div v-else class="default-img"></div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-time">
            <img src="../../assets/images/time.png" alt="">
            <span class="time">{{item.time}}</span>
          </p>
          <p class="item-location">
            <img src="../../assets/images/location.png" alt="">
            <span class="adress">{{item.communityName}}</span>
          </p>

        </div>
      </a>
    </div>
    <div  class="hot-more" >
        <a :href="'//'+$store.state.common.origin+'/activity'+$store.state.common.queryString" class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data(){
    return {

    }
  },
  mounted(){
    console.log('activity',this.data)
  }
}
</script>

<style lang="less" scoped>
 .hot-more {
      padding: 0 0 20px 111px;
      border-bottom: 10px solid #f6f6f6;
      .more {
        display: inline-block;
        position: relative;
        width: 153px;
        height: 44px;
        line-height: 44px;
        background: #ffffff;
        border: 1px solid #dfdfdf;
        border-radius: 4px;
        font-family: PingFang-SC-Regular;
        font-size: 16px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
        .arror {
          position: absolute;
          right: 21px;
        }
      }
    }
  .welfare-title {
      padding: 20px 0 0 16px;
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: #333333;
      .hot-text {
        position: relative;
        .line {
          position: absolute;
          width: 100%;
          height: 9px;
          left: 0;
          bottom: 0;
          background-color: #ffeb00;
          z-index: -10;
        }
        .en-line {
          position: absolute;
          width: 100%;
          height: 9px;
          left: 0;
          bottom: 0;
          background-color: #ffeb00;
          z-index: -10;
        }
      }
       .member-vip {
        margin-right: 16px;
        height: 28px;
        line-height: 28px;
        .pic {
          display: inline-block;
          width: 15px;
          height: 13px;
          vertical-align: middle;
          // margin-right: 4px;
          background:url("../../assets/images/index-vip.svg") 50% no-repeat;
          background-size: cover;
        }
        .vip {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          vertical-align: middle;
          color: #DBAE3C;

        }
      }
    }
.content-box {
  padding: 20px 16px 10px 16px;
}
 .item-content {
      display: flex;
      width: 343px;
      height: 153px;
      margin: 10px 0px;
      background: #F6F6F6;
      border-radius: 4px;
      .item-img {
        width: 100px;
        height: 133px;
        margin: 10px;
        border: 1px solid #F3F3F3;
        border-radius: 4px;
      }
      .default-img {
        width: 100px;
        height: 133px;
        margin: 10px;
        border: 1px solid #F3F3F3;
        border-radius: 4px;
        background: url("../../assets/images/activity/default.png") center top / cover no-repeat;
      }
      .item-info {
        flex: 1;
        position: relative;
        margin: 10px 8px 10px 0;
        .item-title {
          max-height: 48px;
          font-family: PingFang-SC-Medium;
          font-size: 17px;
          color: #333333;
          overflow: hidden;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .item-time {
          margin: 10px 0 4px 0;
          font-family: PingFang-SC-Regular;
          font-size: 13px;
          color: #666666;
          img {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
          .time {
            font-size: 13px;
            color: #666666;
          }
        }
        .item-location {
          img {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: middle;
          }
          .adress {
            font-size: 13px;
            color: #666666;
          }
        }
      }
    }
</style>
