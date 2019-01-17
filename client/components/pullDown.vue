<template>
  <div>
    <div class="wrapper" ref="wrapper" :style="`${height}`">
      <div class="bscroll-container">
        <slot></slot>
        <!-- <ul class="content">
          <li v-for="item in data">{{item}}</li>
        </ul> -->
        <!-- 底部提示信息 -->
        <div class="bottom-tip">
          <span class="loading-hook">{{pullupMsg}}</span>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  var count = 1
  export default {
    props:{
      height:{
        type:String,
        default:'600px'
      }
    },
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
      this.scroll.on('touchEnd',(pos) => {
        this.pullupMsg = '加载中。。。';
        if (pos.y < (this.scroll.maxScrollY - 30)) {
          return true
        }
      })
    },
    // created() {
      // const that = this;
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, { //初始化better-scroll
      //     probeType: 1,
      //     click: true //是否派发click事件
      //   })
      //   //滑动结束松开事件
      //   this.scroll.on('touchEnd', (pos) => { //上拉刷新
      //     if (pos.y < (this.scroll.maxScrollY - 30)) {
            // this.pullupMsg = '加载中。。。';
            // setTimeout(() => {
            //   that.getData().then((res) => {
            //     //恢复文本值
            //     that.pullupMsg = '加载更多';
            //     that.data = this.data.concat(res);
            //     that.scroll.refresh();
            //   })
            // }, 2000)

  //         }
  //       })
  //     })
  //   },
  }
</script>


<style>
  .wrapper {
    width: 100%;
    height: 300px;
    background: #ccc;
    overflow: hidden;
    position: relative;
  }

  li {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  /* 下拉、上拉提示信息 */

  .bottom-tip {
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #777;
    background: #f2f2f2;
    position: absolute;
    bottom: -35px;
    left: 0;
  }
</style>
