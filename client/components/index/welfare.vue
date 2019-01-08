<template>
  <div class="welfare-box">
    <div class="welfare-title">
      {{$t('indexTitle.welfare')}}
      <span class="line"></span>
      <div class="member-vip fr">
        <span class="pic"></span>
        <span class="vip">入驻会员专享</span>
      </div>
    </div>
    <a href="" class="item-content border-bottom">
      <img src="" alt="">
      <div class="item-info">
        <p class="item-title">星巴克</p>
        <p class="item-use">全国通用</p>
        <span class="item-tab">推荐美食</span>
        <div class="item-discount">6折</div>
      </div>
    </a>
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
.border-bottom {
  border-bottom: 1px solid #F3F3F3;;
}
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
.item-content {
  display: flex;
  // padding-left: 16px;
  // margin-bottom: 20px;
  padding: 20px 0 20px 16px;
  img {
    width: 96px;
    height: 96px;
    margin-right: 10px;
    background: palegreen;
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
