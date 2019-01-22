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
    <a :href="'//'+$store.state.common.origin+'/welfare/'+item.id+$store.state.common.queryString" class="item-content border-bottom" v-for="(item,index) in data" :key="index">
      <div class="item-img" :style="item.couponCover?'background: url('+item.couponCover+'?x-oss-process=image/quality,q_80) center top / cover no-repeat' :''"></div>
      <div class="item-info">
        <p class="item-title">{{item.title}}</p>
        <p class="item-use">{{item.descr}}</p>

        <div class="item-tab" v-if="!!item.tagName && item.tagName.length > 0">
            <span class="text " v-for="(tag,index) in item.tagName" :key="index">{{tag}}</span>
        </div>
        <div class="item-discount">{{item.faceValue}}</div>
      </div>
    </a>
    <div  class="hot-more" >
        <a :href="'//'+$store.state.common.origin+'/welfare'+$store.state.common.queryString" class="more">{{$t('indexTitle.more')}}<i class="arror">>></i></a>
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

  }
}
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid #F3F3F3;;
}
.welfare-box {
  a:nth-child(4){
    border-bottom: none;
  }
}
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
      font-weight: bold;
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
.item-content {
  display: flex;
  padding: 20px 0;
  margin:0 16px;

  .item-img {
    width: 96px;
    height: 96px;
    margin-right: 10px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    border-radius: 8px;
    overflow: hidden;
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
     .item-tab{
        overflow: hidden;
        .text{
          float: left;
          border-radius: 4px;
          margin: 0 3px 0 0;
          padding: 3px 4px;
          font-size: 12px;
          border: 1px solid #CCCCCC;/*no*/
          color: #999;
          background: #fff;
        }
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
