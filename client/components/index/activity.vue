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
        <img :src="item.imgUrl" alt="" class="item-img" v-if="!!item.imgUrl">
        <img src="../../assets/images/activity/default.png" alt="" class="item-img" v-else>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-time">
            <i class="time-img"></i>
            <span class="time">{{item.time}}</span>
          </p>
          <p class="item-location">
            <i class="adress-img"></i>
            <span class="adress">{{item.communityName}}</span>
          </p>

        </div>
      </a>
    </div>
    <div  class="hot-more" >
        <a href="" class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></a>
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
    console.log('welfare',this.data)
  }
}
</script>

<style lang="less" scoped>

// .more {
//   width: 153px;
//   height: 44px;
//   margin: 10px 111px 20px 111px;
//   background: #FFFFFF;
//   border: 1px solid #DFDFDF;
//   border-radius: 4px;
//   .item-more {
//     line-height: 44px;
//     display: block;
//     font-family: PingFang-SC-Regular;
//     font-size: 16px;
//     color: #666666;
//     letter-spacing: 0;
//     text-align: center;
//   }
// }
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
        .pic {
          display: inline-block;
          width: 15px;
          height: 13px;
          margin-right: 4px;
          background:url("../../assets/images/vip.png");
          background-size: cover;
        }
        .vip {
          display: inline-block;
          font-family: PingFang-SC-Semibold;
          font-size: 14px;
          color: #DBAE3C;
          letter-spacing: 0;
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
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("../../assets/images/activity/time.png");
            background-size: cover;
          }
          .time {
            font-size: 13px;
            color: #666666;
          }
        }
        .item-location {
          i {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("../../assets/images/activity/location.png");
            background-size: cover;
          }
          .adress {
            font-size: 13px;
            color: #666666;
          }
        }
      }
    }
// .item-content {
//   display: flex;
//   background: #F6F6F6;
//   border-radius: 4px;
//   img {
//     width: 100px;
//     height: 133px;
//     border: 1px solid #F3F3F3;
//     border-radius: 4px;
//     margin-right: 10px;
//     background: palegreen;
//   }
//   .item-info {
//     flex: 1;
//     .item-title {
//       width: 215px;
//       font-family: PingFangSC-Medium;
//       font-size: 17px;
//       color: #333333;
//       line-height: 20px;
//       overflow: hidden;
//       -webkit-line-clamp: 2;
//       text-overflow: ellipsis;
//       display: -webkit-box;
//       -webkit-box-orient: vertical;
//     }
//     .item-use {
//       width: 198px;
//       margin: 10px 0 4px 0;
//       font-family: PingFangSC-Regular;
//       font-size: 13px;
//       color: #666666;
//       line-height: 18px;
//       .item-clock {
//         display: inline-block;
//         width: 12px;
//         height: 12px;
//         background:url("../../assets/images/index/time.png");
//         background-size: cover;
//         margin-right: 8px;
//       }
//     }
//     .item-address {
//       font-family: PingFangSC-Regular;
//       font-size: 13px;
//       color: #666666;
//       .address-icon {
//         display: inline-block;
//         width: 12px;
//         height: 13px;
//         background:url("../../assets/images/index/address.png");
//         background-size: cover;
//         margin-right: 8px;
//       }
//     }
//     .item-status {
//       margin-top: 14px;
//       .free {
//         font-family: PingFangSC-Regular;
//         font-size: 15px;
//         color: #333333;
//       }
//       .sign,.pending {
//         width: 50px;
//         height: 20px;
//         margin-left: 10px;
//       }
//     }
//   }
// }
</style>
