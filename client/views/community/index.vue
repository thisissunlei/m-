<template>
  <div class="community-list">
    <!-- start 筛选条件 -->
    <nav>
      <p v-for="(value,key) in tapList"
        :class="{'tab-active':key==nowIndex}"
        @click="tapChange(value,key)">{{value.name}}</p>
    </nav>
    <!-- end 筛选条件 -->

    <!-- start 列表 -->
    <div class="list-details">
      <div class="list-details-box">
        <div class="details-img">图片</div>
        <div class="details-info">
          <p>建国路社区</p>
          <p>
            <span>1</span>
            <span>北京市朝阳区建国路108号海航实业大厦9层</span>
          </p>
          <p>

          </p>
        </div>
      </div>
    </div>
    <!-- end 列表 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowIndex: -1,
      tapList: [
        { name: '办公位置' },
        { name: '社区状态' },
        { name: '工位价格' }

      ]
    }
  },
  methods: {
    tapChange(e, i) {
      console.log(e, i)
      this.nowIndex = i;

    }
  },

}
</script>

<style lang="less" scoped>
.community-list {
  nav {
    display: flex;
    border-bottom: 1px #eee solid;
    width: 100%;
    height: 40px;
    > p {
      width: 33.33%;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      line-height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > p:after {
      content: "";
      display: inline-block;
      width: 0px;
      height: 0px;
      margin-left: 7px;
      border-top: 4px solid #666666;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
    }
    .tab-active {
      color: #333333;
      font-weight: bold;
    }
    .tab-active:after {
      content: "";
      width: 0px;
      height: 0px;
      border-bottom: 4px solid #333333;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: none;
      border-top-color: #333333;
    }
  }
  .list-details {
    padding: 0 16px;
    .list-details-box {
      border-bottom: 1px solid #f3f3f3;
      padding: 20px 0;
      display: flex;
      .details-img {
        width: 105.7px;
        height: 140px;
        background: skyblue;
        margin-right: 16.3px;
      }
      .details-info {
        p:nth-of-type(1) {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          line-height: 17px;
          margin-bottom: 8px;
        }
        p:nth-of-type(2) {
          display: flex;
          height: 36px;
          margin-bottom: 6px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
          letter-spacing: 0;
          span {
            display: inline-block;
            height: 100%;
          }
          span:nth-child(1) {
            width: 12px;
            height: 100%;
            margin-right: 6px;
          }
          span:nth-child(2) {
            width: 203px;
            height: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
}
</style>
