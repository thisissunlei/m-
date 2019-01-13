<template>
  <!-- 轮播图的实现主要是通过宽度的overflow:hidden进行控制，translate进行控制 -->
  <div class="both-swiper">
    <div class="swiper-title">{{title}}</div>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <div class="slider-item" v-for="(item,index) in list" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.couponCover" :alt="item.linkUrl" :style="`width:${width},height:${height}`" ref="sliderItemImg">
          </a>
        </div>
      </div>
      <div class="dots" v-if="this.dots">
        <span :class="`dot ${index === currentPageIndex ? 'active' :'' }`" v-for="(item,index) in list.length" :key="index"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {

    props: {
      width: {
        type: Number,
        default:343,
      },
      height: {
        type: Number,
        default: 172
      },
      title:{
        type: String,
        default:'每日优选'
      },
      loop: {
        type: Boolean,
        default: true,
      },
      autoPlay: {
        type: Boolean,
        default: false,
      },
      dots:{
        type: Boolean,
        default: false,
      },
      speed: {
        type: Number,
        default: 1000
      },
      list: {
        type: Array
      }
    },
    data() {
      return {
        currentPageIndex: 0
      }
    },
    watch: {

    },
    mounted() {
      const _this = this;
      _this.tmpTimer = setTimeout(() => {
        _this._initSliderWidth();
        _this._initSlider();
        if (_this.autoPlay) {
          _this._play();
        }
      }, 20);
      console.log('list-swiper', this.list,this.width,this.height)
    },
    methods: {
      // 初始化slider容器的宽度
      _initSliderWidth() {
        // 获取图片的宽度
        // const imgWidth = this.$refs.sliderItemImg[0].clientWidth;
        const imgWidth = this.width;
        // console.log("imgWidth",this.$refs.sliderItemImg,imgWidth);

        let sliderWidth = imgWidth * this.list.length;
        // console.log("slider",imgWidth);

        if (this.loop) {
          // 循环轮播需要添加两个img DOM 的宽度
          sliderWidth += imgWidth * 2;
        }
        // 图片容器的宽度和高度
        this.$refs.sliderGroup.style.width = sliderWidth/37.5 + 'rem';
        this.$refs.sliderGroup.style.height = this.height/37.5 + 'rem';
        // console.log("this.height111",this.height,this.$refs.sliderItemImg);
        if(this.$refs.sliderItemImg.length >= 2){
          this.$refs.sliderItemImg.forEach(item => {
            // console.log("this.width",this.width);
            item.style.width = this.width/37.5 + "rem";
            item.style.height = this.height/37.5 + "rem";
          });
        }
      },
    //
      _initSlider() {
        const _this = this;
        // 私有的better-scroll的实例
        _this._slider = new BScroll(_this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          click: true,
          snap: {
            loop: this.loop, // 循环
            threshold: 0.1
          }
        });
        // 获取当前页
        _this._getCurrentPageIndex();
        // 滚动之前 清除timer
        _this._slider.on('beforeScrollStart', () => {
          clearInterval(_this._timer);
        });
      },
      // 获取当前滚动的页数，主要是用于 dots 中 active class 的添加
      _getCurrentPageIndex() {
        const _this = this;
        _this._slider.on("scrollEnd", () => {
          let index = _this._slider.getCurrentPage().pageX;
          _this.currentPageIndex = index;
          // 如果自动播放 则开启
          if (_this.autoPlay) {
            _this._play();
          }
        });
      },

      _play() {
        const _this = this;
        let pageIndex = _this.currentPageIndex;
        _this._timer = setInterval(() => {
          pageIndex++;
          if (pageIndex >= _this.list.length) {
            pageIndex = 0;
          }
          _this._slider.goToPage(pageIndex);
        }, this.speed);
      },


    },


  }
</script>


<style lang="less" scoped>
  // img {
  //   width: 375px;
  //   height: 200px;
  // }
  .slider {
    position: relative;
    min-height: 1px;
  }

  .slider .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }

  .slider .slider-group .slider-item {
    float: left;
    overflow: hidden;
    text-align: center;
  }

  .slider .slider-group .slider-item a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }

  .slider .slider-group .slider-item img {
    display: block;
    width: 100%;
  }

  .slider .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
  }

  .slider .dot {
    display: inline-block;
    margin: 0 6px;
    width: 12px;
    height: 3px;
    background: rgba(255,255,255,0.30);
    border-radius: 4px;
  }

  .slider .dot.active {
    width: 12px;
    height: 3px;
    background: #FFFFFF;
    border-radius: 4px;

  }
</style>

