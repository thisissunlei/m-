<template>
  <div class="s-thing-box">
    <ul class="base-line">
      <li class='list' v-for="(item,i) in $t('aboutMilestone')" :key="i">
        <img src="../../assets/images/about/rt.svg" alt="" class='pic'>
        <div class="left">
          <div class="box">
            <div class="year ">{{item.year}}</div>
            <div class="month ">{{item.month}}</div>
          </div>
        </div>
        <div class="right">{{item.content}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .s-thing-box{
    margin-top:20px;
    .base-line{
      margin-left:33px;
      border-left:2px solid #EEE;
      padding:30px 0 50px;
      position: relative;
      &::before{
        content:'';
        display: inline-block;
        background: url(../../assets/images/about/lx.svg) center center / cover ;
        width:15px;
        height:15px;
        position: absolute;
        top:-14px;
        left:-8px;
      }
    }
    .list{
      width:270px;
      background-color: #CFAE65;
      position: relative;
      // text-align:right;
      .pic{
        display: inline-block;
        position: absolute;
        width:10px;
        height:10px;
        top: 50%;
        transform:translateY(-50%);
        left:-30px;
        z-index:999;
      }

      &:nth-child(1n){
        margin-left:24px;
        &:after{
          content:'';
          position:absolute;
          top:50%;
          width:24px;
          height:0;
          border:1px solid #EEE;
          left:-24px;
          z-index:99;
        }
      }
    }
    .list+.list{
      margin-top:24px;
    }
    .left,.right{
      display: inline-block;
    }
    .right{
      width:210px;
      vertical-align: top;
      font-size:14px;
      color:#333;
      line-height:20px;
      padding:16px 30px;
      text-align:left;
    }
    .en .left{
      width:176px;
    }
    .en .right{
      width:270px;
    }

    .left{
      position: absolute;
      left:0;
      top:0;
      min-width:60px;
      height:100%;
      text-align:center;
      background-color: #fbd98d;
      vertical-align: top;
      text-align:center;
      .box{
        position: absolute;
        width:100%;
        top:50%;
        transform:translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content:center;
      }
        .year{
          font-size:18px;
          color:#333;
          line-height:18px;
          padding-top:3px;
          font-weight:600;
          font-family: DINAlternate-Bold;
        }
        .month{
          font-size:32px;
          font-family: DINAlternate-Bold;
          color:#333;
          line-height:32px;
          font-weight:700;
        }
    }
  }
</style>

