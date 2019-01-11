<template>
<div class="top-content">
  <div class="title">

  </div>
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
</div>
</template>

<script>
export default {
  props:['data','titleText'],
  data(){
    return {

    }
  },
  mounted(){
    console.log('data',this.data,this.titleText)
  }
}
</script>

<style lang="less" scoped>
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
