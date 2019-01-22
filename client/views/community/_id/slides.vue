<template>
  <div class="community-slide">
    <div class="slide-picture"
      v-if="showSlides">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},

      imgList: [],
      tabList: [],
      showSlides: true,
      currentIndex: 0,
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
      }
    }
  },
  created() {
    this.detail = this.$store.state.detail

  },
  mounted() {

    this.getImgList(this.detail.list.picTypeMap);
    console.log(this.detail)

  },
  methods: {
    goToImg(tab) {
      this.currentIndex = tab.index;
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
      // if ((detail.COMMUNITY_ERIOR && detail.COMMUNITY_ERIOR.length > 0) || (detail.OFFICE_STATION && detail.OFFICE_STATION.length > 0) || (detail.COMMUNITY_INTERIOR && detail.COMMUNITY_INTERIOR.length > 0)) {
      //   this.showSlides = true;
      // }

    },
  },
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
    .tab-active {
      background: #ffeb00;
      color: #666666;
    }
  }
}
</style>

