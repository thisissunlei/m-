<template>
  <div class="introduce">
    <div class="video-box">
      <video muted class="video"
      :poster="imgSrc"
      preload
      loop="loop"
      src="https://web.krspace.cn/kr-web-test/bj2.mp4"
      id="video-play">
      </video>
      <div class="control" @click="videoControl">
        <img src="../../assets/images/about/end.png" alt="" class=" show pic" v-if="show">
        <img src="../../assets/images/about/start.png" alt="" class="pic" v-if="!show">
      </div>
    </div>
    <div class="text-content">
      <p v-for="(item,i) in $t('aboutText')" :key="i">{{item}}</p>
    </div>
    <div class="pics-box">
      <img src="../../assets/images/about/scope/pic1.png" alt="" class="pic-info"/>
      <div class="pic-text">
        <span class="info">社区分布</span>
        <span><span class="num">12</span><span class="line line1"></span><span class="text">{{$t('aboutProfile.sectionOne')}}</span></span>
      </div>
      <img src="../../assets/images/about/scope/pic2.png" alt="" class="pic-info"/>
      <div class="pic-text">
        <span><span class="num">60</span><span class="line line2"></span><span class="text">{{$t('aboutProfile.sectionTwo')}}</span></span>
      </div>
      <img src="../../assets/images/about/scope/pic4.png" alt="" class="pic-info"/>
      <div class="pic-text">
        <span><span class="num">40,000</span><span class="line line3"></span><span class="text">{{$t('aboutProfile.sectionTwo')}}</span></span>
      </div>
      <img src="../../assets/images/about/scope/pic5.png" alt="" class="pic-info"/>
      <div class="pic-text">
        <span><span class="num">20,000</span><span class="line line4"></span><span class="text">{{$t('aboutProfile.sectionFour')}}</span></span>
      </div>
      <img src="../../assets/images/about/scope/pic6.png" alt="" class="pic-info"/>
      <div class="pic-text">
        <span><span class="num">3000</span><span class="line line5"></span><span class="text">{{$t('aboutProfile.sectionFive')}}</span></span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data(){
    return {
       imgSrc:require('../../assets/images/about/pc-bullet.jpg'),
       show:false,
    }
  },
  mounted(){
    this.win = typeof window == "undefined" ? global : window
    var video = this.win.document.getElementById('video-play');
    //  console.log('queryString33',this.$store.state.common)
  },
  methods: {
    videoControl(){
        var video = this.win.document.getElementById('video-play');
        console.log('videoControl',video.paused)
        if(video.paused){
          video.play()
          this.show = true;
        }else{
          // video.currentTime = 0;
          video.pause()
          this.show = false;
        }
      },
  },
}
</script>
<style lang="less" scoped>
  .video-box {
    margin: 18px 0 20px 0;
    .control{
      width:343px;
      height:193px;
      position: absolute;

      &:hover{
        cursor: pointer;
      }
      .pic{
        position: relative;
        left: 120px;
        top: -140px;
        width:80px;
        height:80px;

      }
      .show{
        opacity:0;
        transition: all 0.8s;
      }
    }
    .video {
      height: 193px;
      background: pink;
    }
  }
  .text-content {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
    line-height: 26px;
    p + p{
          margin-top:26px;
        }
  }
  .pics-box {
    margin-top: 30px;
    .pic-info {
      width: 340px;
      height: 191px;
    }
    .pic-text {
      position: relative;
      height: 53px;
      padding-top: 14px;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      text-align: center;
      .info {
        margin-right: 10px;
      }
      .num {
        font-family: DINAlternate-Bold;
        font-size: 26px;
        color: #151515;
        letter-spacing: 0;
        line-height: 22px;
      }
      .line{
        position: absolute;
        background-color: #FFEB00;
        z-index:-10;
      }
      .line1 {
        width: 40px;
        height: 9px;
        right: 145px;
        bottom: 14px;
      }
      .line2 {
        width: 38px;
        height: 9px;
        right: 180px;
        bottom: 14px;
      }
      .line3 {
        width: 78px;
        height: 9px;
        right: 165px;
        bottom: 14px;
      }
      .line4 {
        width: 75px;
        height: 9px;
        right: 150px;
        bottom: 14px;
      }
      .line5 {
        width: 60px;
        height: 9px;
        right: 175px;
        bottom: 14px;
      }
    }
  }

</style>

