<template>
  <div class="slide" ref="slider">
    <div class="slide-group" ref='slideGroup'>
      <slot></slot>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot"
        :class="{active: currentPageIndex === index }"
        v-for="(item, index) in dots"
        :key="index">
      </span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Swiper',
    props: {
      loop: {
        type: Boolean,
        default: false,
      },
      autoPlay: {
        type: Boolean,
        default: true,
      },
      click: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1000
      },
      bannerFlag: {
        type: Boolean
      },
      initSwiper: {
        type: Function
      },
      showDot: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    watch: {
      'bannerFlag' () {
        this.update();
      },
      // loop() {
      //   this.update()
      // },
      // autoPlay() {
      //   this.update()
      // },

    },
    mounted() {
      this.update()
      if (!this.slide || !this.slide.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    },
    methods: {
      update() {
        if (this.slide) {
          this.slide.destroy()
        }
        this.$nextTick(() => {
          this.init()
        })
      },
      refresh() {
        this._setSlideWidth(true)
        this.slide.refresh()
      },
      init() {
        clearTimeout(this.timer)
        this.currentPageIndex = 0
        this._setSlideWidth()
        if (this.showDot) {
          this._initDots()
        }
        this._initSlide()

        if (this.autoPlay) {
          this._play()
        }
      },
      _setSlideWidth(isResize) {
        this.children = this.$refs.slideGroup.children
        let width = 0
        let slideWidth = this.$refs.slider.clientWidth


        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          child.style.width = slideWidth + 'px';
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.slideGroup.style.width = width + 'px'
      },
      _initSlide() {
        this.slide = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          // 当快速滑动时是否开启滑动惯性
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          },
          // snapLoop:true,
          stopPropagation: true,
          // click: this.click
          click:true
        })

        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('touchEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        })

        this.slide.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd() {
        let pageIndex = this.slide.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.slide.next()
        }, this.interval)
      }
    },
  }
</script>


<style scoped lang="less">
  .slide {
    width: 100%;
    overflow: hidden;
    height: 210px;
    position: relative;
    .slide-group {
       height: 210px;
      .slider-item {
        float: left;
        a {
            display: block;
            width: 100%;
            height: 210px;
        }
        img {
          display: block;
          width: 100%;
          height: 210px;
        }
      }
    }
    .dots {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ccc;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: #fff;
        }
      }
    }
  }
</style>
