<template>
  <!-- :style="`${height}`" -->
    <div class="wrapper" ref="wrapper" >
      <div class="bscroll-container">
        <slot></slot>
        <!-- <ul class="content">
          <li v-for="item in data">{{item}}</li>
        </ul> -->
        <!-- 底部提示信息 -->
        <div class="bottom-tip" v-if="tipFlag">
          <span class="loading-hook">{{pullupMsg}}</span>
        </div>

      </div>
    </div>


</template>

<script>
  import BScroll from 'better-scroll';
  var count = 1
  export default {
    props:['tipFlag'],
    data() {
      return {
        pullupMsg: '加载更多',
        startY: 0,
      }
    },

    computed: {
      scrollbarObj: function() {
        return this.scrollbar ? {
          fade: this.scrollbarFade
        } : false
      },
      pullDownRefreshObj: function() {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
    },
    mounted() {

      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:1,//1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        click:true
      })
        console.log('66666',this.scroll.maxScrollY)
      this.scroll.on('touchEnd',(pos) => {
        this.pullupMsg = '加载中...';
        if (pos.y < (this.scroll.maxScrollY - 30)) {

          this.$emit("getMore",{'tip':'true'})

        }
      })
    },
  }
</script>


<style>
  .wrapper {
    width: 100%;
    position: relative;
  }


  /* 下拉、上拉提示信息 */

  .bottom-tip {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    /* color: #777; */
    background: #f2f2f2;
    position: absolute;
    bottom: -35px;
    left: 0;
  }
</style>
