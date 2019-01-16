<template>
<a href="" class="env-wrapper">
  <Swiper :loop = true :showDot = false>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,i) in data" :key="i">
        <img :src="item.firstPic">
        <span class="env-name">{{data.envName}}</span>
      </div>
    </div>
  </Swiper>
  <!-- <Swiper :loop = true  :showDot = false v-if="!!data && data.length>0">
    <div class="swiper-slide fl" v-for="(item,index) in data" :key="index">
        <img :src="item.firstPic" :alt="item.linkUrl" ref="sliderItemImg">
    </div>
  </Swiper> -->

   <!-- <Swiper :showDot = false :loop= false>
        <ul class="swiper-wrapper">
          <li class="fl swiper-slide" v-for="item of data" :key="item.index" >
            <img  :src="item.firstPic">
          </li>
        </ul>
      </Swiper> -->

</a>
</template>

<script>
import Swiper from '../common/swiper.vue'
export default {
  props: ['data', 'query'],
  components: {
    Swiper
  },
  data(){
    return {

    }
  },
  mounted(){
    // console.log('000999',this.data)
  }
}
</script>

<style lang="less" soped>
.swiper-wrapper {
   li {
          width: 320px;
          height: 180px;
          margin-right: 10px;
          // border: 1px solid #F3F3F3;
          // border-radius: 4px;
          background: pink;
          img {
            width: 320px;
            height: 180px;
          }
}
}
.env-wrapper,img {
  // width: 320px;
  height: 180px;
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
