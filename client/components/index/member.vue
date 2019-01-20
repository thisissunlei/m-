<template>
  <div class="member-box">
    <div class="member-title">
      {{$t('indexTitle.members')}}
      <span class="line"></span>
    </div>
    <a :href="'//'+$store.state.common.origin+'/members/'+item.id+$store.state.common.queryString" class="item-content border-bottom" v-for="(item,index) in data" :key="index">
      <div class="img fr"
             :style="item.photoUrl?'background: url('+item.photoUrl+'?x-oss-process=image/resize,h_240,w_321,color_eeeeee,quality,q_80) center top / cover no-repeat' :''"></div>
      <div class="item-info">
        <p class="item-title">{{item.title}}</p>
        <p class="item-bottom">
          <!-- <span class="fire fl"></span> -->
          <span class="num fl">{{item.totalReadCunt}} 阅读</span>
          <span class="time fr">{{item.publishedAt}}</span>
        </p>
      </div>
    </a>
    <div class="more">
      <a :href="'//'+$store.state.common.origin+'/members'+$store.state.common.queryString" class="item-more">
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
.member-box {
   a:nth-child(4){
    border-bottom: none;
  }
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
  padding: 15px 0;
  margin: 0 16px;
  .img {
    width: 107px;
    height: 80px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .item-info {
    flex: 1;
    .item-title {
      max-width: 220px;
      height: 48px;
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
