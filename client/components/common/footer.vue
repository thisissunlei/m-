<template>
  <footer>
    <div class="footer-up">
      <div class="pics">
        <div class="hand item fl">
          <a href="//">
            <img src="../../assets/images/footer/touch.png"
              alt="">
          </a>
          <div class="f-img-text">触屏版</div>
        </div>
        <div class="pc item fl">
          <a href="//krspace.cn?toM=no"
            class="f-img">
            <img src="../../assets/images/footer/pc.png"
              alt="">
          </a>
          <div class="f-img-text">电脑版</div>
        </div>
        <div class="android item fl">
          <a href="//a.app.qq.com/o/simple.jsp?pkgname=com.krspace.android_vip"
            class="f-img">
            <img src="../../assets/images/footer/app.png" />
          </a>
          <div class="f-img-text">客户端</div>
        </div>
        <div class="android item fl">
          <a href="//a.app.qq.com/o/simple.jsp?pkgname=com.krspace.android_vip"
            class="f-img">
            <img src="../../assets/images/footer/wechat.png" />
          </a>
          <div class="f-img-text">微信</div>
        </div>
      </div>
      <div class="menu-text">
        <a :href="'//'+$store.state.common.origin+'/about'+$store.state.common.queryString"
          class="fl">公司简介</a>
        <a :href="'//'+$store.state.common.origin+'/about'+$store.state.common.queryString+'&tab=things'"
          class="fl">大事记</a>
        <a :href="'//'+$store.state.common.origin+'/about'+$store.state.common.queryString+'&tab=news'"
          class="fl">公司新闻</a>
        <a href="https://zhaopin.krspace.cn/m/apply/36kr/140/#/home?_k=ipbgmo"
          class="fl">加入我们</a>
      </div>
      <div class="line"></div>
    </div>
    <div class="footer-down">
      <p class="copyright">
        © 2011-2018 氪空间(北京)信息技术有限公司 | 京ICP备16012805号 | 京公网安备11010802012285号
      </p>
    </div>
  </footer>
</template>


<style lang="less" scoped>
footer {
  border-top: 1px #f6f6f6 solid;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;
  width: 100%;
  height: 263px;
  overflow: hidden;
  // background: pink;
  .pics {
    height: 108px;
    padding: 30px 0 0 41px;
    .item {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
      margin-right: 31px;
      // background: red;
      &:nth-child(4) {
        margin-right: 0;
      }
      a {
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .f-img-text {
        height: 19px;
        font-family: PingFang-SC-Regular;
        font-size: 13px;
        color: #999999;
        line-height: 19px;
        text-align: center;
      }
    }
  }
  .menu-text {
    padding: 29px 0 30px 24px;
    a {
      margin-right: 29px;
      font-family: PingFang-SC-Regular;
      font-size: 15px;
      color: #333333;
      line-height: 19px;
      &:nth-child(4) {
        margin-right: 0;
      }
    }
  }
  .line {
    margin-top: 30px;
    width: 100%;
    height: 1px;
    background: #f6f6f6;
  }
  .footer-down {
    padding: 20px 43.5px;
    .copyright {
      font-family: PingFang-SC-Regular;
      font-size: 12px;
      color: #999999;
      text-align: center;
      line-height: 18px;
    }
  }
}
</style>
