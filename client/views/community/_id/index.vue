<template>
  <div class="community-detail">
    <div class="slide-picture">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper"
          ref="swiper">
          <div class="swiper-slide"
            v-for="(item, index) in imgList"
            :key="index">
            <img :src="item">
            <span class="env-name">{{item.envName}}</span>
          </div>
        </div>
      </div>
      <div class="tab-list">
        <p v-for="(item,index) in tabList"
          :class="[getActive(item) ? 'tab-active' : '']"
          @click="goToImg(item)"
          :key="index"> {{item.name}} </p>
      </div>
    </div>

    <!-- 查看地图 -->
    <div class="see-map">
      <p class="community-name">{{detail.list.communityName}}</p>
      <p>
        <span class="address-text">{{detail.list.address}}</span>
        <span class="go-map">{{$t('CMNT_DTL_Title.map')}}</span>
      </p>
    </div>
    <!-- 办公 -->
    <div class="time-sharing-office">
      <div class="sharing-office-title">
        <p>{{$t('CMNT_DTL_Title.long')}}</p>
        <p>{{$t('indexTitle.order')}}</p>
      </div>
      <div class="sharing-office-detail"
        v-for="(item,index) in detail.officeType.longTerm">
        <div class="office-detail-top">
          <p>{{item.seatName}}</p>
          <p>
            <span v-if="!!item.price && !!item.discountPrice && $route.query.cityId == 366">HK${{item.price}}</span>
            <span v-else>￥{{item.price}}</span>
            <span v-if="$route.query.cityId == 366">HK$</span>
            <span v-else>¥</span>
            <span>{{item.discountPrice}}</span>
            <span>{{$t('CMNT_DTL_Title.poUnitMor')}}</span>
          </p>
        </div>
        <div class="office-detail-bottom"
          v-if="item.capacityList"
          :style="`background-image:url(${item.capacityList[bottomTagIndex].seatPicUrl+'?x-oss-process=image/resize,h_1116,w_626,color_eeeeee,quality,q_80'})`">
          <div class="bottom">
            <div class="bottom-item"
              @click="toggleBottomTags(capacityIndex)"
              v-for="(capacityItem,capacityIndex) in item.capacityList"
              :class="[{'active':bottomTagIndex==capacityIndex},'']"
              :key="capacityIndex">{{capacityItem.capacity}}{{$t('CMNT_DTL_Dw')}}</div>
          </div>
        </div>
        <div class="office-detail-bottom"
          v-else
          :style="`background-image:url(${item.seatPicUrl+'?x-oss-process=image/resize,h_1116,w_626,color_eeeeee,quality,q_80'})`">

        </div>
      </div>
      <div class="sharing-office-title">
        <p>{{$t('CMNT_DTL_Title.short')}}</p>
        <p @click="showQRcode">{{$t('CMNT_DTL_Title.shortBtn')}}</p>
      </div>
      <div class="sharing-office-detail"
        v-for="(item,index) in detail.officeType.timeShare">
        <div class="office-detail-top">
          <p>{{item.seatName}}</p>
          <p>
            <span></span>
            <span v-if="$route.query.cityId == 366">HK$</span>
            <span v-else>¥</span>
            <span>{{item.price}}</span>
            <span>{{item.officeType=="SHORT_WORK_MEETING"? $t('CMNT_DTL_Title.seatUnit1'): $t('CMNT_DTL_Title.seatUnit0')}}</span>
          </p>
        </div>
        <div class="office-detail-bottom"
          v-if="item.capacityList"
          :style="`background-image:url(${item.capacityList[bottomTagIndex1].seatPicUrl+'?x-oss-process=image/resize,h_1116,w_626,color_eeeeee,quality,q_80'})`">
          <div class="bottom">
            <div class="bottom-item"
              @click="toggleBottomTags1(capacityIndex)"
              v-for="(capacityItem,capacityIndex) in item.capacityList"
              :class="[{'active':bottomTagIndex1==capacityIndex},'']"
              :key="capacityIndex">{{capacityItem.capacity}}{{$t('CMNT_DTL_Dw')}}</div>
          </div>
        </div>
        <div class="office-detail-bottom"
          v-else
          :style="`background-image:url(${item.seatPicUrl+'?x-oss-process=image/resize,h_1116,w_626,color_eeeeee,quality,q_80'})`">

        </div>

      </div>

    </div>
    <!-- 服务配套 -->
    <div class="service-pack">
      <p class="common-title"
        v-if="!!detail.list.supportingServices.BASICSERVICE.length || !!detail.list.supportingServices.INFRASTRUCTURE.length || !!detail.list.supportingServices.SPECIALSERVICE.length">{{$t('CMNT_DTL_Title.service')}}</p>
      <div class="pack-info">
        <div class="infrastructure"
          v-if="!!detail.list.supportingServices.INFRASTRUCTURE.length">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spFacilities')}}</p>
          <div class="infrastructure-detail">
            <div v-for="(item,index) in detail.list.supportingServices.INFRASTRUCTURE"
              :key="index">
              <p><img :src="item.lableUrl"
                  alt=""></p>
              <p>{{item.lableName}}</p>
            </div>
          </div>
        </div>
        <div class="infrastructure"
          v-if="!!detail.list.supportingServices.BASICSERVICE.length">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spService')}}</p>
          <div class="infrastructure-detail">
            <div v-for="(item,index) in detail.list.supportingServices.BASICSERVICE"
              :key="index">
              <p><img :src="item.lableUrl"
                  alt=""></p>
              <p>{{item.lableName}}</p>
            </div>
          </div>
        </div>
        <div class="infrastructure"
          v-if="!!detail.list.supportingServices.SPECIALSERVICE.length">
          <p class="infrastructure-title">{{$t('CMNT_DTL_Title.spCharacteristic')}}</p>
          <div class="infrastructure-detail">
            <div v-for="(item,index) in detail.list.supportingServices.SPECIALSERVICE"
              :key="index">
              <p><img :src="item.lableUrl"
                  alt=""></p>
              <p>{{item.lableName}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
    <div class="qr-code"
      v-if="showCode">
      <div class="code-img">
        <img class="code"
          src="../../../assets/images/communityDetail/code.png"
          alt="">
        <img class="close"
          src="../../../assets/images/community/close.png"
          @click="showQRcode"
          alt="">
        <div class="code-guide">
          <p>长按二维码或</p>
          <p>打开微信 - 搜索“氪空间自由座”小程序</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Welfare from '../../../components/index/welfare.vue'
import Activity from '../../../components/index/activity.vue'
import Member from '../../../components/index/member.vue'
export default {
  components: {
    Welfare,
    Activity,
    Member
  },
  data() {
    return {
      isFixed: true,
      detail: {},
      bottomTagIndex: 0,
      bottomTagIndex1: 0,
      showCode: false,
      imgList: [],
      tabList: [],
      currentIndex: 0,
      swiperOption: {
        autoplay: true,
        speed: 1500,
        loop: true,
        on: {
          slideChange: () => {
            let swiper = this.mySwiper;
            // console.log(swiper.activeIndex)
            this.currentIndex = swiper.activeIndex
            // swiper.slideTo(this.currentIndex)
          }
        }
      }

    }
  },
  asyncData({ route, router, store }) {
    let cmtId = 1 || route.params.id;
    let lang = route.query.lang == 'en' ? 1 : 0;
    return Promise.all([
      store.dispatch('getNewCommunityDetails', { id: cmtId, language: lang }),
      store.dispatch('getNewOfficeType', { id: cmtId, language: lang })
    ])
  },
  methods: {
    goToImg(tab) {
      this.currentIndex = tab.index;
      // console.log('111', this.mySwiper)
      this.mySwiper.slideTo(tab.index);
    },
    getActive(list) {
      let index = this.currentIndex;
      let flag;
      if (list.items.indexOf(index) != -1) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    },
    getImgList(detail) {
      // console.log(detail)
      let len1 = 0;
      let len2 = 0;
      let len3 = 0;
      if (detail.COMMUNITY_INTERIOR && detail.COMMUNITY_INTERIOR.length > 0) {
        len1 = detail.COMMUNITY_INTERIOR.length;
        let arr = [];
        let tabObj = {
          name: '内景',
          len: len1,
          items: []
        }
        detail.COMMUNITY_INTERIOR.map((item, index) => {
          tabObj.items.push(index);
          tabObj.index = tabObj.items[0];
          this.imgList.push(item.picUrl)
        })
        this.tabList.push(tabObj)
      }

      if (detail.OFFICE_STATION && detail.OFFICE_STATION.length > 0) {
        len2 = detail.OFFICE_STATION.length;
        let tabObj = {
          name: '办公',
          len: len1 + len2,
          items: []
        };
        detail.OFFICE_STATION.map((item, index) => {
          tabObj.items.push(index + len1);
          tabObj.index = tabObj.items[0];
          this.imgList.push(item.picUrl);
        })
        this.tabList.push(tabObj)
      }

      if (detail.COMMUNITY_ERIOR && detail.COMMUNITY_ERIOR.length > 0) {
        len3 = detail.COMMUNITY_ERIOR.length;
        let tabObj = {
          name: '外景',
          len: len1 + len2 + len3,
          items: []
        };
        detail.COMMUNITY_ERIOR.map((item, index) => {
          tabObj.items.push(index + len1 + len2);
          tabObj.index = tabObj.items[0];
          this.imgList.push(item.picUrl);
        })

        this.tabList.push(tabObj)

      }
    },
    toggleBottomTags(index) {
      this.bottomTagIndex = index;
    },
    toggleBottomTags1(index) {
      this.bottomTagIndex1 = index;
    },
    showQRcode() {
      this.showCode = !this.showCode;
      if (this.showCode) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
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
  created() {
    this.detail = this.$store.state.detail
  },
  mounted() {
    this.getImgList(this.detail.list.picTypeMap);
    console.log(this.detail)
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
  .slide-picture {
    width: 100%;
    height: 210.9px;
    position: relative;
    .swiper-container,
    .swiper-wrapper,
    .swiper-slide,
    img {
      width: 100%;
      height: 100%;
    }
    .tab-list {
      width: 100%;
      height: 22px;
      position: absolute;
      bottom: 10.9px;
      z-index: 20;
      display: flex;
      justify-content: center;
      p {
        opacity: 0.7;
        background: #000000;
        border-radius: 16px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #ffffff;
        padding: 2px 8px;
        margin-right: 24px;
      }
      .tab-active {
        background: #ffeb00;
        color: #666666;
      }
    }
  }
  .see-map {
    width: 100%;
    padding: 21px 16px;
    border-bottom: 10px solid #f6f6f6;
    .community-name {
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: #333333;
      margin-bottom: 20px;
    }
    p:nth-child(2) {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
    .address-text {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #666666;
      display: inline-block;
      width: 80%;
    }
    .go-map {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #999999;
    }
  }
  .time-sharing-office {
    padding: 20px 16px;
    .sharing-office-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p:nth-child(1) {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #333333;
      }
      p:nth-child(2) {
        padding: 6px 23px;
        height: 34px;
        background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
        border-radius: 4px;
        font-family: PingFang-SC-Regular;
        font-size: 15px;
        color: #666666;
      }
    }
    .sharing-office-detail {
      .office-detail-top {
        width: 343px;
        height: 44px;
        padding: 0 10px;
        background: #f6f6f6;
        border: 1px solid #f3f3f3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          display: flex;
          align-items: center;
        }
        p:nth-child(1) {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #333333;
        }
        p:nth-child(2) {
          display: flex;
          align-items: baseline;
          span:nth-of-type(1) {
            font-family: PingFang-SC-Regular;
            font-size: 10px;
            color: #999999;
            text-decoration: line-through;
            margin-right: 15px;
          }
          span:nth-of-type(2) {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #ff5050;
          }
          span:nth-of-type(3) {
            font-family: PingFang-SC-Medium;
            font-size: 17px;
            color: #ff5050;
            margin-right: 10px;
          }
          span:nth-of-type(4) {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #151515;
          }
        }
      }
      .office-detail-bottom {
        width: 343px;
        height: 193px;
        margin-bottom: 20px;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        .bottom {
          position: absolute;
          left: 10px;
          right: 0;
          bottom: 10px;
          height: 24px;
          white-space: nowrap;
          overflow-x: auto;
          .bottom-item {
            padding: 3px 9px;
            margin-right: 10px;
            display: inline-block;
            opacity: 0.56;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 12px;
            font-family: PingFang-SC-Regular;
            font-size: 13px;
            color: #ffffff;
            text-align: center;
          }
          .active {
            background: #ffeb00;
            color: #666666;
          }
        }
      }
    }
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
  .qr-code {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(40, 38, 36, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .code-img {
      width: 287px;
      height: 316px;
      background: #ffffff;
      border-radius: 4px;
      position: relative;
      .code {
        width: 231px;
        height: 231px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -115px;
        margin-left: -115px;
      }
      .close {
        width: 31.1px;
        height: 63.6px;
        position: absolute;
        top: -60px;
        right: 0;
      }
      .code-guide {
        width: 100%;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        color: #666666;
        position: absolute;
        bottom: 36px;
        p {
          text-align: center;
        }
      }
    }
  }
}
</style>


