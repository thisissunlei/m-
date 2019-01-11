<template>
<a href="" class="env-wrapper">
  <div v-swiper:mySwiper="envSwiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in data" :key="i">
        <img :src="item.firstPic">
        <!-- <span class="env-name">{{data.envName}}</span> -->
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</a>
</template>

<script>
export default {
  props: ['data', 'query'],
  data(){
    return {
      envSwiperOption:{
        // slidesPerView : 3,
        // centerInsufficientSlides: true,

      },
      pagination: {
            el: '.swiper-pagination'
          },
    }
  },
  mounted(){
    // console.log('000999',this.data)
  }
}
</script>

<style lang="less" soped>
.env-wrapper,img {
  // width: 320px;
  // height: 180px;
}
.env-wrapper {
  display: block;
  margin-left: 16px;
  .swiper-slide {
    width: 320px!important;
    height: 180px;
    margin-right: 10px;
    img {
      width: 320px;
      height: 180px;
    }
  }
}

</style>
