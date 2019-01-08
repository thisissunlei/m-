<template>
  <div class="welfare-box">
    <div class="welfare-title">
      {{$t('indexTitle.activity')}}
      <span class="line"></span>
      <div class="member-vip fr">
        <span class="pic"></span>
        <span class="vip">入驻会员专享</span>
      </div>
    </div>
    <div class="content-box">
      <a href="" class="item-content">
        <img src="" alt="">
        <div class="item-info">
          <p class="item-title">人生若是只如详见</p>
          <p class="item-use">
            <span class="item-clock"></span>
            今天 12:30-14:30
          </p>
          <p class="item-address">
            <span class="address-icon"></span>
            酒仙桥社区 • 公共休息区
          </p>
          <div class="item-status">
            <span class="free">免费</span>
            <span class="sign">报名中</span>
            <span class="pending">进行中</span>
          </div>
        </div>
      </a>
    </div>
    <div class="more">
      <a href="" class="item-more">
        {{$t('indexTitle.more')}}<i class="arror">>></i>
      </a>
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

.more {
  width: 153px;
  height: 44px;
  margin: 10px 111px 20px 111px;
  background: #FFFFFF;
  border: 1px solid #DFDFDF;
  border-radius: 4px;
  .item-more {
    line-height: 44px;
    display: block;
    font-family: PingFang-SC-Regular;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
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
          width: 15px;
          height: 13px;
          margin-right: 4px;
          background: #DBAE3C;
        }
        .vip {
          font-family: PingFang-SC-Semibold;
          font-size: 14px;
          color: #DBAE3C;
          letter-spacing: 0;
        }
      }
    }
.content-box {
  // background: #F6F6F6;
  // border-radius: 4px;
  padding: 20px 16px 10px 16px;
}
.item-content {
  display: flex;
  background: #F6F6F6;
  border-radius: 4px;
  // padding-left: 16px;
  // margin-bottom: 20px;
  img {
    width: 100px;
    height: 133px;
    border: 1px solid #F3F3F3;
    border-radius: 4px;
    margin-right: 10px;
    background: palegreen;
  }
  .item-info {
    flex: 1;
    .item-title {
      width: 215px;
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #333333;
      line-height: 20px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .item-use {
      width: 198px;
      margin: 10px 0 4px 0;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
      line-height: 18px;
      .item-clock {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #DBAE3C;
        margin-right: 8px;
      }
    }
    .item-address {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
      .address-icon {
        display: inline-block;
        width: 12px;
        height: 13px;
        background: lawngreen;
        margin-right: 8px;
      }
    }
    .item-status {
      margin-top: 14px;
      .free {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #333333;
      }
      .sign,.pending {
        width: 50px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
}
</style>
