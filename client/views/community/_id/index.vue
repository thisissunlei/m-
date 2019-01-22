<template>
  <div class="community-detail">
    <!-- 轮播图 -->
    <Slides></Slides>
    <!-- 查看地图 -->
    <div class="see-map">
      <p class="community-name">{{detail.list.communityName}}</p>
      <p>
        <span class="address-text">{{detail.list.address}}</span>
        <span class="go-map"
          @click="hrefMap">{{$t('CMNT_DTL_Title.map')}}</span>
      </p>
    </div>
    <!-- 办公 -->
    <div class="time-sharing-office"
      v-if="!!detail.officeType.longTerm.length || !!detail.officeType.timeShare.length">
      <div class="sharing-office-title"
        v-if="detail.officeType.longTerm.length > 0">
        <p>{{$t('CMNT_DTL_Title.long')}}</p>
        <p @click="jumpVisit">{{$t('indexTitle.order')}}</p>
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
      <div class="sharing-office-title"
        v-if="detail.officeType.timeShare.length > 0">
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
    <div class="service-pack"
      v-if="!!detail.list.supportingServices.BASICSERVICE.length || !!detail.list.supportingServices.INFRASTRUCTURE.length || !!detail.list.supportingServices.SPECIALSERVICE.length">
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
    <Visit :Close="jumpVisit"
      :areaDisabled="areaDisabled"
      v-if="isVisit" />

    <!-- 详情地图 -->
    <!-- <Detailmap v-if="showMap"
      :change="mapChange"></Detailmap> -->
    <!-- 社区福利 -->
    <Welfare />
    <div class="divide-line"></div>
    <!-- 社区活动 -->
    <Activity />
    <div class="divide-line"></div>
    <!-- 会员报道 -->
    <Member />
    <div class="divide-line"></div>
    <!-- 同城社区 -->
    <div class="same-city-community">
      <p class="common-title">{{$t('CMNT_DTL_Title.community')}}</p>
      <div class="same-city-tab">
        <p>
          <span>{{$t('CMNT_DTL_Title.sameCity')}}</span>
          <span class="activity-line"
            v-if="showCmlType=='cmt'"></span>
        </p>
        <p>
          <span>{{$t('CMNT_DTL_Title.sameLocation')}}</span>
          <span class="activity-line"
            v-if="showCmlType=='ip'"></span>
        </p>
      </div>
    </div>
    <div class="divide-line"></div>

    <!-- start 立即预约 -->
    <div class="visit-btn"
      @click="jumpVisit">
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
import Visit from 'components/common/visit.vue'
import Slides from './slides.vue'
export default {
  components: {
    Welfare,
    Activity,
    Member,
    Visit,
    Slides
  },
  data() {
    return {
      areaDisabled: false,
      isVisit: false,
      isFixed: true,
      detail: {},
      // showMap: false,
      bottomTagIndex: 0,
      bottomTagIndex1: 0,
      showCode: false,
      showCmlType: 'cmt'
    }
  },
  asyncData({ route, router, store }) {
    let cmtId = route.params.id;
    let lang = route.query.lang == 'en' ? 1 : 0;
    // console.log(cmtId)
    return Promise.all([
      store.dispatch('getNewCommunityDetails', { id: cmtId, language: lang }),
      store.dispatch('getNewOfficeType', { id: cmtId, language: lang }),
      store.dispatch('getNewSameCommunity', { id: cmtId, language: lang })
    ])
  },
  watch: {
    '$route.query.lang'(value) {
      console.log(value)
      this.getNewData()

    }
  },
  methods: {
    hrefMap() {
      let cmtId = this.$route.params.id;
      location.href = `/community/${cmtId}/detailmap`;
    },
    jumpVisit() {
      this.isVisit = true;
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
    getNewData() {
      let cmtId = this.$route.params.id;
      let lang = this.$route.query.lang == 'en' ? 1 : 0;
      this.$store.dispatch('getNewCommunityDetails', { id: cmtId, language: lang })
      this.$store.dispatch('getNewOfficeType', { id: cmtId, language: lang })
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
    .address-text:before {
      content: "";
      display: inline-block;
      background: url("../../../assets/images/index/address.png") 0 0 no-repeat;
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      flex-shrink: 0;
      margin-right: 5px;
      height: 14px;
      width: 12px;
      align-self: center;
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
    z-index: 1000;
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
  .same-city-community {
    padding: 20px 16px;
    .common-title {
      font-family: PingFang-SC-Medium;
      font-size: 20px;
      color: #333333;
      margin-bottom: 16px;
    }
    .same-city-tab {
      display: flex;
    }
  }
}
</style>


