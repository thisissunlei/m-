<template>
  <div class="community-detail">
    <!-- <div class="divide-line"></div> -->

    <!-- 服务配套 -->
    <div class="service-pack">
      <p class="common-title">{{$t('CMNT_DTL_Title.service')}}</p>
      <div class="pack-info">
        <div class="infrastructure">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spFacilities')}}</p>
          <div class="infrastructure-detail">
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>无线网络</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>无线网络</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>无线网络</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>无线网络</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>无线网络</p>
            </div>
          </div>
        </div>
        <div class="infrastructure">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spService')}}</p>
          <div class="infrastructure-detail">
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>空气净化系统</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>免费咖啡茶饮</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>主题活动</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>投融资对接</p>
            </div>
          </div>
        </div>
        <div class="infrastructure">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spCharacteristic')}}</p>
          <div class="infrastructure-detail">
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>空气净化系统</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>免费咖啡茶饮</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>主题活动</p>
            </div>
            <div>
              <p><img src="../../../assets/images/arron.png"
                  alt=""></p>
              <p>投融资对接</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- <div class="divide-line"></div> -->

    <!-- 社区福利 -->
    <Welfare />
    <div class="divide-line"></div>
    <!-- 社区活动 -->
    <Activity />
    <div class="divide-line"></div>
    <!-- 会员报道 -->
    <Member />
    <div class="divide-line"></div>

    <!-- start 立即预约 -->
    <div class="visit-btn">
      <p :class="[isFixed ? 'bottom-visit-fixed' : '']">{{$t('indexTitle.order')}}</p>
      <p v-show="isFixed"></p>
    </div>
    <!-- end 立即预约 -->
  </div>
</template>

<script>
import Welfare from '../../../components/index/welfare.vue' // 社区福利
import Activity from '../../../components/index/activity.vue' // 社区活动
import Member from '../../../components/index/member.vue' // 社区活动
export default {
  components: {
    Welfare,
    Activity,
    Member
  },
  data() {
    return {
      isFixed: true

    }
  },
  methods: {
    scroll() {
      let top =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;

      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let elementHeight = document.querySelector("footer").offsetHeight;

      if (height - top <= elementHeight) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)

  }

}
</script>

<style lang="less" scoped>
.community-detail {
  .divide-line {
    width: 100%;
    height: 10px;
    background: #f6f6f6;
  }
  .service-pack {
    padding: 30px 16px 2px 16px;
    border-top: 10px solid #f6f6f6;

    border-bottom: 10px solid #f6f6f6;
    .common-title {
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #333333;
      margin-bottom: 28px;
    }
    .pack-info {
      padding: 0 10px;
      .infrastructure {
        .infrastructure-title {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .infrastructure-detail {
          display: flex;
          flex-wrap: wrap;
          > div {
            width: 25%;
            margin-bottom: 26px;
            display: flex;
            flex-direction: column;
            align-items: center;
            p:nth-child(1) {
              width: 24px;
              height: 24px;
              margin-bottom: 8px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            p:nth-child(2) {
              font-family: PingFang-SC-Regular;
              font-size: 12px;
              color: #666666;
              letter-spacing: 0;
              line-height: 12px;
            }
          }
        }
      }
    }
  }
  .visit-btn {
    p {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
      font-family: PingFang-SC-Regular;
      font-size: 18px;
      color: #624d17;
      text-align: center;
    }
    p:nth-of-type(2) {
      background: none;
    }
    .bottom-visit-fixed {
      position: fixed;
      bottom: 0;
    }
  }

  .member-box /deep/ span.line {
    background-color: rgba(0, 0, 0, 0);
  }
  .welfare-box /deep/ span.line {
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>


