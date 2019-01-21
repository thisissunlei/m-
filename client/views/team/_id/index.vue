<template>
  <div class="team-info">
      <div class="t-head">
        <img class="h-bg" src="../../../assets/images/teambg.png" :alt="member.teamDetail.teamName">
        <img :src="member.teamDetail.logo" :alt="member.teamDetail.teamName" class="h-logo">
        <div class="h-title">{{member.teamDetail.teamName}}</div>
        <div class="h-info">{{member.teamDetail.slogan}}</div>
        <div class="h-num">团队规模：{{member.teamDetail.memberCount}}人</div>
      </div>
      <div class="t-content">
        <div class="text">{{member.teamDetail.intro}}</div>
        <div class="img-list" v-if="member.teamDetail.introPicList.length ==1">
          <img :src="member.teamDetail.introPicList[0]+'?x-oss-process=image/resize,h_257,w_257,color_eeeeee,quality,q_80'" alt="团队图片" class="pic-one">
        </div>
        <div class="img-list" v-if="member.teamDetail.introPicList.length==2">
          <div v-for="item in member.teamDetail.introPicList" class="pic-two" :style="item?'background: url('+item+'?x-oss-process=image/resize,h_170,w_170,color_eeeeee,quality,q_90) center top / cover no-repeat' :''">
             <!-- <img :src="item+'?x-oss-process=image/resize,w_170,color_eeeeee,quality,q_90'" alt="团队图片" class="pic-two" style="opacity: 0"> -->
          </div> 
        </div> 
        <div class="img-list" v-if="member.teamDetail.introPicList.length>2">
          <div v-for="item in member.teamDetail.introPicList" class="pic-list" :style="item?'background: url('+item+'?x-oss-process=image/resize,h_113,w_113,color_eeeeee,quality,q_90) center top / cover no-repeat' :''">
             <!-- <img :src="item+'?x-oss-process=image/resize,h_113,w_113,color_eeeeee,quality,q_90'" alt="团队图片" class="pic-list" style="opacity: 0"> -->
          </div>
         
        </div>
      </div>
      <div class="line"></div>
      <div class="t-join-c" v-if="member.teamDetail.cmtPicUrl.length">
        
        <div class="c-info">
          <h2>{{$t('joinCommunity')}}</h2>
          <span class="name">{{member.teamDetail.cityName}}  ·  {{member.teamDetail.communityName}}</span>
          <span class='price-box'>
            {{$t('lowPrice')}}<span class="price">{{member.teamDetail.porPriceVo.discountType==='NONE'?member.teamDetail.porPriceVo.price:member.teamDetail.porPriceVo.levelPrice}}</span> {{$t('priceUnit')}}
          </span>
        </div>
        </ul>
        <div class="img-list" ref="tabContent" :style="`width:${(member.teamDetail.cmtPicUrl.length*168+32)/37.5}rem`">
          <img :src="item" alt="" v-for="item in member.teamDetail.cmtPicUrl" class="img-detail">
          
        </div>
      </div>
      <div class="line3"></div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'

export default {
  components: {
    // Swiper
  },
  asyncData({ route, store }) {
    let lang = 0;
      if ( !!route.query.lang && route.query.lang === 'en' ) {
        lang = 1;
      }
      console.log(route.params)
      return Promise.all([
        store.dispatch('getTeamDetail',{teamId:route.params.id}),
      ])
  },
  mounted() {
    console.log('team',this.member.teamDetail)
    this.initializeTab();
  },
  computed: {
    ...mapState([
      'member'
    ])
  },
  data() {
      return {
        startPosition: {
          x: 0,
          y: 0
        },
        movePosition: {
          x: 0,
          y: 0
        },
        translateX: 0,
      }
    },
  methods: {
    initializeTab() {
      console.log('initializeTab========')
      var ele = this.$refs.tabContent;
      var box = ele.getBoundingClientRect();
      ele.addEventListener("touchstart", this.touchStart, false);
    },
    touchStart(event) {
      event = event || window.event;

      var touchTarget = event.touches[0];
      var ele = this.$refs.tabContent;
      this.startPosition = {
        x: touchTarget.pageX,
        y: touchTarget.pageY
      };
      console.log('touchStart')
      ele.addEventListener("touchmove", this.touchMove, false);
      ele.addEventListener("touchend", this.touchEnd, false);
    },
    touchMove(event) {
      event = event || window.event;
      var touchTarget = event.touches[0];
      var movePosition = {
        x: touchTarget.pageX,
        y: touchTarget.pageY
      };

      this.movePosition = movePosition;
      this.translate();
    },
    translate() {
      var ele = this.$refs.tabContent;
      var page = this.getPageWidthOrHeight();
      var box = ele.getBoundingClientRect();

      var translateX = this.translateX + this.calcTranslateX();
      console.log('translate',translateX)
      ele.style.transform = `translateX(${translateX}px)`;
    },
    touchEnd(event) {
      event = event || window.event;

      var translateX = this.translateX + this.calcTranslateX();

      this.translateX = translateX;

      var ele = this.$refs.tabContent;
      ele.removeEventListener("touchmove", this.touchMove, false);
    },
    calcTranslateX() {
      var startPosition = this.startPosition;
      var movePosition = this.movePosition;

      var translateX = movePosition.x - startPosition.x;
      var ele = this.$refs.tabContent;
      var page = this.getPageWidthOrHeight();
      var box = ele.getBoundingClientRect();
      var maxX = Math.abs(box.width - page.width) + this.translateX;

      if (this.translateX + translateX > 0) {
        return -this.translateX;
      }
      if (maxX + translateX <= 0) {
        return -maxX;
      }
      var tabItemWidth = box.width / this.tabItemCount;
      return translateX;
    },
    getPageWidthOrHeight() {
      var page = {};
      page.width = window.innerWidth;
      page.height = window.innerHeight;
      if (document.compatMode == "CSS1Compat") {
        page.width = document.documentElement.clientWidth;
        page.height = document.documentElement.clientHeight;
      } else {
        page.width = document.body.clientWidth;
        page.height = document.body.clientHeight;
      }
      return Object.assign({}, page);
    },
  }
}
</script>
<style>
  .member-info img{
    max-width: 100%;
  }
</style>
<style lang="less" scoped>
  .line{
    width: 100%;
    height: 10px;
    background: #F3F3F3;
  }
  .line3{
    width: 100%;
    height: 30px;
    background: #F3F3F3;
  }
  .t-head{
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #F3f3f3;
    position: relative;
    .h-bg{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .h-logo{
      position: relative;
      width: 70px;
      height: 70px;
      border: 2px solid #eee;
      border-radius: 4px;
      margin: 54px 0 10px;
      z-index: 10;
    }
    .h-title{
      margin: 0 auto;
      font-size: 18px;
      color: #333333;
      max-width: 300px;
      margin-bottom: 4px;
    }
    .h-info{
      font-size: 14px;
      color: #666;
      max-width: 300px;
      margin-bottom: 4px;
      text-align: center;
      display: inline-block;
    }
    .h-num{
      font-size: 14px;
      color: #999999;
      text-align: center;
      line-height: 20px;
    }
  }
  .t-content{
    padding: 20px 16px;
    .text{
      font-size: 16px;
      color: #666666;
      text-align: justify;
      line-height: 22px;
      padding-bottom: 20px;
    }
    .img-list{
      padding-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      .pic-list{
        width:113px;
        height: 113px;
        display: inline-block;
        margin-bottom: 2px;
        margin-right: 2px;
        &:nth-child(3n){
          margin-right: 0;
        }
      }
      .pic-one{
        width: 257px;
        height: 257px;
      }
      .pic-two{
        width: 170px;
        height: 170px;
        &:nth-child(1){
          margin-right: 2px;
        }
      }
    }
  }
  .t-join-c{
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
    .c-info{
      padding: 20px 16px
    }
    h2{
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      line-height: 20px;
      margin-bottom: 10px;
    }
    .c-info{
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      line-height: 20px;
      
    }
    .price-box{
      float: right;
    }
    .price{
      color: #ff6868;
      font-weight: 500;
    }
    .img-list{
      height: 91px;
      .img-detail{
        width: 161px;
        height: 91px;
        border-radius: 4px;
        border: 1px solid #eee;
        float: left;
        &:first-child{
          margin-left: 16px;
        }
        &:last-child{
          margin-right: 16px;
        }
      }
      .img-detail+.img-detail{
        margin-left: 7px;
      }


    }
  }
</style>

