<template>
  <div class="community-slide">
    <div class="slide-picture"
      v-if="showSlides">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper"
          ref="swiper">
          <div class="swiper-slide"
            v-for="(item, index) in imgList"
            @click="showBigPic"
            :key="index">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="tab-list">

        <p v-for="(item,index) in tabList"
          :class="[getActive(item) ? 'tab-active' : '']"
          @click="goToImg2(item)"
          :key="index"> {{item.name}} </p>
        <div v-if="communityId==169 || communityId==1 || communityId==174"
          class="vr"
          @click="to3d">VR</div>

      </div>
    </div>
    <div class="big-picture"
      v-if="showBanner"
      @click="showBigPic">

      <div class="slide-picture">
        <div v-swiper:mySwiper2="swiperOption2">
          <div class="swiper-wrapper"
            ref="swiper">
            <div class="swiper-slide"
              v-for="(item, index) in imgList"
              :key="index">
              <img :src="item">
            </div>
          </div>
        </div>

      </div>
      <div class="tab-list">

        <p v-for="(item,index) in tabList"
          :class="[getActive2(item) ? 'tab-active' : '']"
          @click="goToImg2(item)"
          :key="index"> {{item.name}} </p>
        <div v-if="communityId==169 || communityId==1 || communityId==174"
          class="vr"
          @click="to3d">VR</div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      imgList: [],
      tabList: [],
      imgList2: [],
      tabList2: [],
      showSlides: true,
      showBanner: false,
      currentIndex: 0,
      currentIndex2: 0,

      communityId: '',
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
        },
        speed: 1500,
        on: {
          slideChange: () => {
            let swiper = this.mySwiper;
            // console.log(swiper)
            this.currentIndex = swiper.activeIndex
          }
        }
      },
      swiperOption2: {
        on: {
          slideChange: () => {
            let swiper = this.mySwiper2;
            // console.log(swiper)
            this.currentIndex2 = swiper.activeIndex
          }
        }
      }
    }
  },
  created() {
    this.detail = this.$store.state.detail

  },
  mounted() {
    this.communityId = this.detail.list.communityId;
    this.getImgList(this.detail.list.picTypeMap);
    this.getImgList2(this.detail.list.picTypeMap);


  },
  watch: {
    '$route.query.lang'(value) {
      // console.log(value)
      console.log(this.tabList)
      if (value == 'en') {
        this.tabList.map(item => {
          if (item.name == '内景') {
            item.name = 'Indoor'
          }
          if (item.name == '办公') {
            item.name = 'Office'
          }
          if (item.name == '外景') {
            item.name = 'Outdoor'
          }
        })
      } else {
        this.tabList.map(item => {
          if (item.name == 'Indoor') {
            item.name = '内景'
          }
          if (item.name == 'Office') {
            item.name = '办公'
          }
          if (item.name == 'Outdoor') {
            item.name = '外景'
          }
        })

      }


    }
  },
  methods: {
    showBigPic() {
      this.showBanner = !this.showBanner;
      if (this.showBanner) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    to3d() {
      var url = '/';
      var id = this.communityId;
      if (id == 1) {
        url = "//krspace.cn/top/activity/red-hood/m-dajie";
      } else if (id == 77) {
        url = "//krspace.cn/top/activity/red-hood/m-detail";
      } else if (id == 169) {
        url = "//krspace.cn/top/activity/red-hood/m-tit";
      } else if (id == 174) {
        url = "//krspace.cn/top/activity/red-hood/m-bl";
      }
      window.open(url);
    },
    goToImg(tab) {
      this.currentIndex = tab.index;
      this.mySwiper.slideTo(tab.index);
    },
    goToImg2(tab) {
      this.currentIndex2 = tab.index;
      this.mySwiper2.slideTo(tab.index);
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
    getActive2(list) {
      let index = this.currentIndex2;
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
          name: this.$route.query.lang == 'zh' ? '内景' : 'Indoor',
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
          name: this.$route.query.lang == 'zh' ? '办公' : 'Office',
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
          name: this.$route.query.lang == 'zh' ? '外景' : 'Outdoor',
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
      if ((!detail.COMMUNITY_ERIOR || detail.COMMUNITY_ERIOR.length <= 0) || (!detail.OFFICE_STATION || detail.OFFICE_STATION.length <= 0) || (!detail.COMMUNITY_INTERIOR || detail.COMMUNITY_INTERIOR.length <= 0)) {
        this.showSlides = false;

      }

    },
    getImgList2(detail) {

      // console.log(detail)
      let len1 = 0;
      let len2 = 0;
      let len3 = 0;

      if (detail.COMMUNITY_INTERIOR && detail.COMMUNITY_INTERIOR.length > 0) {
        len1 = detail.COMMUNITY_INTERIOR.length;
        let arr = [];
        let tabObj = {
          name: this.$route.query.lang == 'zh' ? '内景' : 'Indoor',
          len: len1,
          items: []
        }
        detail.COMMUNITY_INTERIOR.map((item, index) => {
          tabObj.items.push(index);
          tabObj.index = tabObj.items[0];
          this.imgList2.push(item.picUrl)
        })
        this.tabList2.push(tabObj)
      }

      if (detail.OFFICE_STATION && detail.OFFICE_STATION.length > 0) {
        len2 = detail.OFFICE_STATION.length;
        let tabObj = {
          name: this.$route.query.lang == 'zh' ? '办公' : 'Office',
          len: len1 + len2,
          items: []
        };
        detail.OFFICE_STATION.map((item, index) => {
          tabObj.items.push(index + len1);
          tabObj.index = tabObj.items[0];
          this.imgList2.push(item.picUrl);
        })
        this.tabList2.push(tabObj)
      }

      if (detail.COMMUNITY_ERIOR && detail.COMMUNITY_ERIOR.length > 0) {
        len3 = detail.COMMUNITY_ERIOR.length;
        let tabObj = {
          name: this.$route.query.lang == 'zh' ? '外景' : 'Outdoor',
          len: len1 + len2 + len3,
          items: []
        };
        detail.COMMUNITY_ERIOR.map((item, index) => {
          tabObj.items.push(index + len1 + len2);
          tabObj.index = tabObj.items[0];
          this.imgList2.push(item.picUrl);
        })

        this.tabList2.push(tabObj)

      }

    }
  }
}
</script>

<style lang="less" scoped>
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
    .vr {
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
.big-picture {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tab-list {
    width: 100%;
    height: 22px;
    position: absolute;
    bottom: 40px;
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
    .vr {
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
</style>

