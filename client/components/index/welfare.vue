<template>
  <div class="welfare-box">
    <div class="welfare-title">
      {{$t('indexTitle.welfare')}}
      <span class="line"></span>
      <div class="member-vip fr">
        <span class="pic"></span>
        <span class="vip">{{$t('indexTitle.vip')}}</span>
      </div>
    </div>
    <a href="" class="item-content border-bottom" v-for="(item,index) in data" :key="index" v-if="index<3">
      <img class="item-img" :src="item.couponCover" alt="">
      <div class="item-info">
        <p class="item-title">{{item.title}}</p>
        <p class="item-use">{{item.descr}}</p>
        <span class="item-tab">推荐美食</span>
        <div class="item-discount">6折</div>
      </div>
    </a>
    <div  class="hot-more" >
        <a href="" class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></a>
      </div>
  </div>
</template>

<script>
export default {
  props: ['data','tags'],
  data(){
    return {

    }
  },
  mounted(){
    console.log('welfare',this.data,this.tags)
  }
}
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid #F3F3F3;;
}
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
      padding: 10px 0 20px 111px;
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
      position: relative;
      padding: 20px 0 0 16px;
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: #333333;
      .line {
        position: absolute;
        width: 80px;
        height: 9px;
        left: 15px;
        bottom: 0px;
        background-color: #FFEB00;
        z-index:-10;
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
.item-content {
  display: flex;
  // padding-left: 16px;
  // margin-bottom: 20px;
  padding: 20px 0 20px 16px;

  img {
    width: 96px;
    height: 96px;
    margin-right: 10px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
  }
  .item-info {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .item-title {
      width: 232px;
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #333333;
      line-height: 20px;
    }
    .item-use {
      width: 198px;
      margin: 6px 0;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
      line-height: 17px;
    }
    .item-tab {
      border: 1px solid #333;
      color:#666;
      line-height: 17px;
    }
    .item-discount {
      width: 142px;
      margin-top: 10px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FF3434;
      letter-spacing: 0;
      line-height: 18px;
    }
  }
}
</style>
