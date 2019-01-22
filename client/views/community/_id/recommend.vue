<template>
  <div class="recommend-item">
    <div class="item"
      v-for="(item,i) in communityList.cmtDistanceVo"
      :key="i"
      v-if="type == 'cmt'">
      <div class="img-box">
        <div class="img"
          :style="!!item.homeUrl? 'background: url('+item.homeUrl+'?x-oss-process=image/resize,h_600,w_1080,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
        <p>{{item.distance}}</p>
      </div>
      <div class="con">
        <p>{{item.communityName}}</p>
      </div>
    </div>
    <div class="item"
      v-for="(item,i) in communityList.localDistanceVo"
      :key="i"
      v-if="type == 'ip'">
      <div class="img-box">
        <div class="img"
          :style="!!item.homeUrl? 'background: url('+item.homeUrl+'?x-oss-process=image/resize,h_600,w_1080,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
        <p>{{item.distance}}</p>
      </div>
      <div class="con">
        <p>{{item.communityName}}</p>
      </div>
    </div>
  </div>
  <!-- <div class="c-same clearfix">
    <a v-for="item, i in communityList.cmtDistanceVo"
      :key="i"
      class="item fl"
      :href="'//'+$store.state.common.origin+'/community/' + item.communityId + $store.state.common.queryString"
      target="_blank"
      v-if="type=='cmt'">
      <div class="img-box">
        <div class="img"
          :style="!!item.homeUrl? 'background: url('+item.homeUrl+'?x-oss-process=image/resize,h_600,w_1080,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
      </div>
      <div class="clearfix con">
        <span class="over-point fl">{{item.communityName}}</span>
        <span class="fr">{{item.distance}}</span>
      </div>
    </a>
    <a v-for="item, i in communityList.localDistanceVo"
      :key="i"
      class="item fl"
      :href="'//'+$store.state.common.origin+'/community/' + item.communityId + $store.state.common.queryString"
      target="_blank"
      v-if="type=='ip'">
      <div class="img-box">
        <div class="img"
          :style="!!item.homeUrl? 'background: url('+item.homeUrl+'?x-oss-process=image/resize,h_600,w_1080,color_eeeeee,quality,q_80) center top / cover no-repeat': ''"></div>
      </div>
      <div class="clearfix con">
        <span class="over-point fl">{{item.communityName}}</span>
        <span class="fr">{{item.localDistance}}</span>
      </div>
    </a>
  </div> -->
</template>
<script>

export default {
  props: ['communityList', 'type'],
}
</script>
<style lang="less" scoped>
.recommend-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 167px;
    position: relative;
    margin-bottom: 20px;
    .img-box {
      width: inherit;
      height: 93.7px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8.3px;
      p {
        opacity: 0.7;
        background: #000000;
        border-radius: 0px 4px 0px 4px;
        position: absolute;
        right: 0;
        top: 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        padding: 4px;
      }
      .img {
        width: 167px;
        height: 93.7px;
      }
    }
  }
  .con {
    font-family: PingFang-SC-Medium;
    font-size: 15px;
    color: #333333;
  }
}
// .c-same {
//   margin: 0 -10px;
//   .item {
//     color: #333333;
//     display: block;
//     margin: 0 10px 20px;
//     width: 270px;
//     .img-box {
//       border-radius: 8px;
//       overflow: hidden;
//       margin-bottom: 16px;
//       height: 150px;
//       width: 270px;
//       .img {
//         height: 150px;
//         width: 270px;
//         transition: transform 0.5s ease-in-out;
//       }
//     }
//     .con {
//       height: 20px;
//       line-height: 20px;
//       font-size: 16px;
//       span:first-child {
//         width: 70%;
//       }
//     }
//     &:hover {
//       .img {
//         transform: scale(1.1, 1.1);
//       }
//     }
//   }
//   .over-point {
//     font-weight: bold;
//   }
// }
</style>
