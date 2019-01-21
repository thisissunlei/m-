<template>
  <a :href="'//'+this.$store.state.common.origin+'/community/' + item.communityId + this.$store.state.common.queryString">
    <div class="img" :style="!!item.recommendPicUrl? 'background: url('+item.recommendPicUrl+'?x-oss-process=image/resize,h_560,w_420,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
    <div class="con">
      <div class="tit over-point" v-if="!!item.cmtName">{{item.cmtName}}</div>
      <div class="add">
        <div class="icon"></div>
        <div class="txt over-point2">北京市朝阳区建国路108号海航实业大厦9层北京市朝阳区建国路108号海航实业大厦9层</div>
      </div>
      <div class="info">
        <div class="mj">
          <div class="icon"></div>
          <div class="txt"> >{{item.area}} {{$t('communitySQ')}}</div>
        </div>
        <div class="gw">
          <div class="icon"></div>
          <div class="txt">{{item.stationNum}} {{$t('communityGW')}}</div>
        </div>
      </div>
      <div class="tip">
        <div v-for="lableItem, lableI in item.lableList" :key="lableI" v-if="lableI < 2 && !!lableItem" :class="'tag'+lableI">
          <span class="label0"></span>
          <span class="label1">{{lableItem}}</span>
          <span class="label2"></span>
        </div>
      </div>
      <div class="te" v-html="$t('communityTe')" v-if="!item.openStatus"></div>
      <div class="price">
        <div class="yj" v-if="!!item.price && !!item.levelPrice">
          <i v-if="listData.cityId*1 === 366">HK$</i>
          <i v-else>¥</i>
          {{item.price}}
        </div>
        <div class="xj-dw" v-if="!!item.price || !!item.levelPrice">
          <i v-if="listData.cityId*1 === 366">HK$</i>
          <i v-else>¥</i>
        </div>
        <div class="xj" v-if="!!item.price || !!item.levelPrice">{{item.levelPrice || item.price}}</div>
        <div class="dw" v-if="!!item.price || !!item.levelPrice"><i v-if="listData.language === 0">起/</i>{{$t('communityPer')}}</div>
        <div class="zw" v-if="item.openStatus == true && !item.price && !item.levelPrice && listData.language === 0">暂无报价</div>
      </div>
    </div>
  </a>
</template>
<script>
  export default {
    props: ['listData', 'item', 'i', 'change']
  }
</script>
<style lang='less' scoped>
  a {
    display: flex;
    border-bottom: 1px #f3f3f3 solid;
    margin: 0 16px;
    padding: 20px 0;
    &:last-child {
      border: none;
    }
  }
  .img {
    flex-shrink: 0;
    border: 1px #f3f3f3 solid;
    background: #cccccc;
    border-radius: 8px;
    height: 140px;
    width: 105px;
  }
  .con {
    flex-shrink: 1;
    flex-grow: 1;
    margin-left: 16px;
    overflow: hidden;
    .tit {
      margin-bottom: 8px;
      height: 17px;
      line-height: 17px;
      max-width: 220px;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
    }
    .add {
      display: flex;
      margin-bottom: 5px;
      .icon {
        background: url('../../assets/images/index/address.png') 0 0 no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        flex-shrink: 0;
        margin-top: 1px;
        height: 14px;
        width: 13px;
      }
      .txt {
        flex-shrink: 1;
        flex-grow: 1;
        padding-left: 6px;
        max-width: 207px;
        line-height: 18px;
        color: #666666;
        font-size: 13px;
      }
    }
    .info {
      display: flex;
      margin-bottom: 9px;
      .mj, .gw {
        display: flex;
        max-width: 50%;
        height: 13px;
        line-height: 13px;
        .txt {
          padding-left: 6px;
          height: 13px;
          line-height: 15px;
          color: #666666;
          font-size: 12px;
        }
      }
      .mj {
        padding-right: 6px;
        .icon {
          background: url('../../assets/images/community/acreage.svg') 0 0 no-repeat;
          -webkit-background-size: 13px 13px;
          background-size: 13px 13px;
          height: 13px;
          width: 13px;
        }
      }
      .gw {
        border-left: 1px #979797 dashed;
        padding-left: 6px;
        .icon {
          background: url('../../assets/images/community/workpos.svg') 0 0 no-repeat;
          -webkit-background-size: 15px 15px;
          background-size: 15px 15px;
          margin-top: -1px;
          height: 15px;
          width: 15px;
        }
      }
    }
    .tip {
      display: flex;
      margin-bottom: 13px;
      height: 22px;
      overflow: hidden;
      div {
        display: flex;
        max-width: 50%;
        span {
          height: 22px;
          line-height: 22px;
          &.label0 {
            width: 16px;
          }
          &.label1 {
            padding-left: 2px;
            margin-left: -1px;
          }
          &.label2 {
            margin-left: -1px;
            width: 8px;
          }
        }
        &.tag0 {
          padding-right: 10px;
          .label0 {
            background: url('../../assets/images/community/tag/01.png') 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          .label1 {
            background: url('../../assets/images/community/tag/02.png') 0 0 repeat-x;
            -webkit-background-size: auto 100%;
            background-size: auto 100%;
            font-size: 12px;
            color: #8AB5FA;
          }
          .label2 {
            background: url('../../assets/images/community/tag/03.png') 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
        &.tag1 {
          .label0 {
            background: url('../../assets/images/community/tag/11.png') 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
          .label1 {
            background: url('../../assets/images/community/tag/12.png') 0 0 repeat-x;
            -webkit-background-size: auto 100%;
            background-size: auto 100%;
            font-size: 12px;
            color: #8ED1A6;
          }
          .label2 {
            background: url('../../assets/images/community/tag/13.png') 0 0 no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
          }
        }
      }
    }
    .price {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      div {
        height: 18px;
      }
      .yj {
        line-height: 28px;
        color: #999999;
        font-size: 10px;
        text-decoration: line-through;
      }
      .xj-dw {
        line-height: 28px;
        margin-left: 9px;
        color: #FF5050;
        font-size: 12px;
        font-weight: bold;
      }
      .xj {
        line-height: 24px;
        color: #FF5050;
        font-size: 17px;
        font-weight: bold;
      }
      .dw {
        line-height: 26px;
        color: #151515;
        font-size: 12px;
        margin-left: 6px;
      }
      .zw {
        line-height: 26px;
        color: #666;
        font-size: 12px;
      }
    }
  }
</style>
