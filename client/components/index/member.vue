<template>
  <div class="member-box">
    <div class="member-title">
      {{$t('indexTitle.members')}}
      <span class="line"></span>
    </div>
    <a href="" class="item-content border-bottom">
      <img src="" alt="">
      <div class="item-info">
        <p class="item-title">星巴克全国通用全国通用全国通用全国通用全国通用全国通用全国通用</p>
        <p class="item-bottom">
          <span class="fire fl"></span>
          <span class="num fl">100049 阅读</span>
          <span class="time fr">2018-12-20</span>
        </p>
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
    console.log('member',this.data)
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
.member-title {
      position: relative;
      padding: 20px 0 5px 16px;
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: #333333;
      .line {
        position: absolute;
        width: 80px;
        height: 9px;
        left: 15px;
        bottom: 5px;
        background-color: #FFEB00;
        z-index:-10;
      }
    }
.item-content {
  display: flex;
  // padding-left: 16px;
  // margin-bottom: 20px;
  padding:15px 16px;
  img {
    width: 107px;
    height: 80px;
    margin-right: 10px;
    background: palegreen;
  }
  .item-info {
    flex: 1;
    .item-title {
      max-width: 220px;
      max-height: 48px;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      line-height: 24px;
    }
    .item-bottom {
      margin-top: 15px;
      .fire {
        width: 11px;
        height: 14px;
        margin-right: 8px;
        background-image: linear-gradient(58deg, #FF987E 0%, #FF6868 100%);
      }
      .num {
        font-family: PingFang-SC-Regular;
        font-size: 12px;
        color: #999999;
        line-height: 17px;
      }
      .time {
        font-family: PingFang-SC-Regular;
        font-size: 12px;
        color: #999999;
        line-height: 17px;
      }
    }
  }
}
</style>
