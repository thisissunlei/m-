<template>
  <div class="ui-dialog" v-if="isShow">
    <div class="g-dialog">
      <div class="u-dialog-content">
        <span class="u-close" @click="onClose"></span>
        <div :class="[imgClass,'u-tip-img']"></div>
        <div class="u-tip-name">尊敬的{{personName}}</div>
        <div class="u-tip-message">{{message}}</div>
        <div class="u-tip-info">{{info}}</div>
        <div class="u-dialog-btn"  @click="onClose">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      personName:String,
      dialogType:String,
      isShow:Boolean,
      Close:Function
    },
    data(){
      return{
        message:'',
        info:'',
        imgClass:'',
        status:''
      }
    },
    created(){
      this.changeInfo();
    },

    watch:{
      dialogType:{
        deep:true,
        handler:function(newProps,oldProps){
          let type=newProps?newProps:oldProps;
          this.status=type;
          this.changeInfo();

        }
      },
      name:{
        deep:true,
        handler:function(newProps,oldProps){
          let name=newProps?newProps:oldProps;
          this.name=name;
          this.changeInfo();

        }
      }
    },
    methods:{
      changeInfo(){
        if(this.status=='success'){
          this.message='您的预约信息已提交成功！';
          this.info="氪空间的工作人员将在24小时内与您联系，请您保持电话畅通。";
          this.imgClass="u-success";
        }
        if(this.status=='error'){
          this.message='您的预约信息提交失败！';
          this.info="请稍后再试，或拨打客服电话 400-807-3636。 ";
          this.imgClass="u-error";
        }
        if(this.status=='warn'){
          this.message='您的预约信息已提交成功！';
          this.info="请勿重复预约，氪空间的工作人员将在24小时内与您联系。";
          this.imgClass="u-warn";
        }

      },
      onClose(){
        console.log("小dialog");
        this.Close && this.Close();
      }
    }
  }
</script>

<style lang="less">
  .ui-dialog{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    background: rgba(40,38,36,0.90);
    z-index:899;
    .g-dialog{
      width:315px;
      height:247px;
      position: absolute;
      left:50%;
      top:50%;

      margin-left: -157.5px;
      margin-top:-123.5px;
      .u-dialog-content{
        width: 315px;
        height: 247px;
        background:#fff;
        border-radius: 8px;
        position: relative;
        .u-close{
          position: absolute;
          width: 20px;
          height: 20px;
          right: 17px;
          top: 16px;
          background: url('../../assets/images/icon/icon_close.svg') no-repeat center center;
          background-size:cover;
        }
        .u-tip-img{
          width: 70px;
          height: 70px;
          border-radius: 100% 100%;
          position: absolute;
          top: -35px;
          left:50%;
          margin-left: -35px;
        }
        .u-tip-name{
          font-size: 17px;
          color: #333333;
          text-align: center;
          font-family: 'PingFang-SC-Medium';
          padding-top: 50px;
          margin-bottom: 10px;
        }
        .u-tip-message,.u-tip-info{
          width: 239px;
          margin: 0 auto;
          text-align: center;
          font-size: 14px;
          color: #333333;
          line-height: 28px;
          font-family: 'PingFang-SC-Regular';
        }
        .u-dialog-btn{
          width: 120px;
          height: 40px;
          background: #FFFFFF;
          border: 1px solid #999999;
          border-radius: 8px;
          font-family: 'PingFangSC-Regular';
          font-size: 16px;
          color: #666666;
          text-align: center;
          line-height: 38px;
          margin: 12px auto 30px;

        }
        .u-success{
          background:url('../../assets/images/icon/icon_success.svg') no-repeat center center;
          background-size:100% 100%;
        }
        .u-error{
          background:url('../../assets/images/icon/icon_error.svg') no-repeat center center;
          background-size:100% 100%;
        }
        .u-warn{
          background:url('../../assets/images/icon/icon_warn.svg') no-repeat center center;
          background-size:100% 100%;
        }
      }



    }
  }
</style>


