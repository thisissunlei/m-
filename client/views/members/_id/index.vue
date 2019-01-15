<template>
  <div class="member-info">
      <div class="member-detail">
        <h1 class="m-title">{{member.memberDetail.protalsNewsVo.title}}</h1>
        <div class="m-info">
          <span class="m-time">{{member.memberDetail.protalsNewsVo.publishedAt}}</span>
          <span class="m-readed">{{member.memberDetail.protalsNewsVo.totalReadCount}}阅读</span>
        </div>
        <div class="item-content" v-html="member.memberDetail.protalsNewsVo.desc"></div>
      </div>
      <div class="line"></div>
      <div class="team-info" v-if="member.memberDetail.porTeamDetailVo.teamName">
        
        <div class="team-box">
          <h2>团队介绍</h2>
          <div class="left-head" :style="member.memberDetail.porTeamDetailVo.logo?'background: url('+member.memberDetail.porTeamDetailVo.logo+'?x-oss-process=image/resize,h_402,w_720,color_eeeeee,quality,q_90) center top / cover no-repeat' :''"></div>
          <div class="right-box">
            <div class="t-name">{{member.memberDetail.porTeamDetailVo.teamName}}</div>
            <div class="t-info over-point">{{member.memberDetail.porTeamDetailVo.slogan}}</div>
            <div class="t-num">团队规模：{{member.memberDetail.porTeamDetailVo.memberCount}}</div>
          </div>
        </div>
        <div class="team-text">
          {{member.memberDetail.porTeamDetailVo.intro}}
        </div>
        <div class="img-list" v-if="member.picList ==1">
          <img :src="member.memberDetail.porTeamDetailVo.introPicList[0]+'?x-oss-process=image/resize,h_257,w_257,color_eeeeee,quality,q_80'" alt="团队图片" class="pic-one">
        </div>
        <div class="img-list" v-if="member.picList==2">
          <div v-for="item in member.memberDetail.porTeamDetailVo.introPicList" class="pic-two" :style="item?'background: url('+item+'?x-oss-process=image/resize,h_170,w_170,color_eeeeee,quality,q_90) center top / cover no-repeat' :''">
             <img :src="item+'?x-oss-process=image/resize,w_170,color_eeeeee,quality,q_90'" alt="团队图片" class="pic-two" style="opacity: 0">
          </div> 
        </div> 
        <div class="img-list" v-if="member.picList>2">
          <div v-for="item in member.memberDetail.porTeamDetailVo.introPicList" class="pic-list" :style="item?'background: url('+item+'?x-oss-process=image/resize,h_113,w_113,color_eeeeee,quality,q_90) center top / cover no-repeat' :''">
             <img :src="item+'?x-oss-process=image/resize,h_113,w_113,color_eeeeee,quality,q_90'" alt="团队图片" class="pic-list" style="opacity: 0">
          </div>
         
        </div>
      </div>
      <div class="lines"></div>
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
        store.dispatch('getMemberDetail',{newsId:route.params.id}),
      ])
  },
  mounted() {
    console.log('member',this.member.memberDetail)
    console.log('team',this.member.teamDetail)
  },
  computed: {
    ...mapState([
      'member'
    ])
  },
}
</script>
<style>
  .member-info img{
    max-width: 100%;
  }
</style>
<style lang="less" scoped>
  .member-detail{
    padding: 30px 16px;
  }
  .member-detail{
    padding: 20px 16px;
    .m-title{
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      line-height: 30px;
      margin-bottom: 10px;
    }
    .m-info{
      color: #999;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;
    }
    .m-readed{
      margin-left: 21px;
    }
    .item-content{
      font-size: 16px;
      color: #666666;
      letter-spacing: 0;
      line-height: 26px;
      img{
        width:100%;
      }
    }
  }
  .team-info{
    position: relative;
    h2{
      font-size: 18px;
      color: #333333;
      margin-bottom: 17px;
    }
    .left-head{
      height: 70px;
      width: 70px;
      border-radius: 4px;
      position: absolute;
    }
    .right-box{
      margin-left: 80px;
      height: 70px;
      .t-name{
        font-size: 18px;
        color: #333;
      }
      .t-info{
        font-size: 14px;
        color: #666;
        line-height: 20px;
        margin-bottom: 8px;
      }
      .t-num{
        font-size: 12px;
        color: #999999;
        line-height: 20px;
      }
    }
    .team-box{
      padding: 20px 16px;
      padding-bottom: 23px;
      border-bottom: 1px solid #F3F3F3;
    }
    .team-text{
      padding: 20px 16px;
      font-size: 16px;
      color: #666666;
      text-align: justify;
      line-height: 22px;
      padding-bottom: 0;
    }
    .img-list{
      padding: 20px 16px;
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .pic-list{
        width:113px;
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
        &:nth-child(1){
          margin-right: 2px;
        }
      }
    }
  }
  .line{
    height: 10px;
    background: #F3F3F3;
    width: 100%;
  }
  .lines{
    height: 30px;
    background: #F3F3F3;
    width: 100%;
  }
</style>

