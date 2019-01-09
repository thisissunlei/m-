<template>
  <div class="order-box">
    <div class="order-title">预约参观</div>
    <div class="tip">
      <p>想快速寻找与您匹配的办公地点？</p>
      <p>请留下您的预约信息，我们的顾问为您服务</p>
      <p>专业的办公解决方案</p>
    </div>
    <div class="order-content">
      <div class="name">
        <span class="star">*</span>
        <span class="text">您的称谓</span>
      </div>
      <div class="u-input">
        <input type="text"
          placeholder="请输入您的称谓"
          v-model="name"
          @blur="onNameChange" />
      </div>

      <div class="name">
        <span class="star">*</span>
        <span class="text">您的联系方式</span>
      </div>
      <div class="u-input">
        <input type="number"
          placeholder="请输入您的联系方式"
          v-model="mobile"
          @blur="onPhoneChange" />
      </div>

      <div class="name">
        <span class="text">参观地点</span>
      </div>
      <div class="u-input">
        <input id="area"
          type="text"
          name="input_area"
          placeholder="社区"
          v-model="areaValue"
          readOnly="readOnly"
          readonlyunselectable="on"
          onfocus="this.blur()" />
        <div v-if="areaDisabled"
          readonlyunselectable="on"
          class="u-tranparent"></div>
        <input id="areaValue"
          type="hidden" />
      </div>
      <div class="visit-submit">提交</div>
    </div>
    <div v-if="ifError"
      class="u-error-tip">{{errorMessage}}</div>
  </div>
</template>

<script>

export default {
  props: {
    Close: Function,
    // areaDisabled:Boolean,
    Info: Object
  },
  data() {
    return {
      lang: '',
      language: '',
      name: '',
      mobile: '',
      areaValue: '',
      errorMessage: '',
      ifError: false,
      disSelect: false,
      disabled: false,
      areaDisabled: false
    }
  },
  mounted() {
    this.lang = this.$route.query.lang || 'zh';
    this.language = this.lang === 'en' ? 1 : 0;
    this.disabled = this.areaDisabled;


  },
  methods: {


    onNameChange() {
      this.checkName();
    },
    onPhoneChange() {
      this.checkPhone()
    },
    checkName() {
      var _this = this;
      if (this.name == "" || this.name.length > 10) {
        this.errorMessage = "请输入正确的称呼";
        this.ifError = true;
        setTimeout(function () {
          _this.ifError = false;
        }, 1000)
      }
    },
    checkPhone() {
      var _this = this;
      if (this.mobile == "" || !/^1[345678]\d{9}$/.test(this.mobile)) {
        this.errorMessage = "请输入正确的手机号码";
        this.ifError = true;
        setTimeout(function () {
          _this.ifError = false;
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.order-box {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 375px;
  padding: 20px 0 0 30px;
  z-index: 210;
  background: pink;
  .order-title {
    margin-bottom: 11px;
    font-size: 20px;
    font-family: PingFang-SC-Semibold;
    color: #333333;
    line-height: 22px;
  }
  .tip {
    font-family: PingFang-SC-Regular;
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .order-content {
    font-family: PingFang-SC-Regular;
    .name {
      margin-bottom: 10px;
      .star {
        width: 9px;
        height: 20px;
        margin-left: -15px;
        color: #ff6868;
        line-height: 20px;
      }
      .text {
        margin-left: 6px;
        font-size: 16px;
        color: #333333;
        line-height: 20px;
      }
    }
    .u-input {
      width: 315px;
      height: 50px;
      margin-bottom: 20px;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 4px;
      input {
        margin: 15px 0 0 10px;
        font-size: 16px;
        color: #cccccc;
        line-height: 20px;
      }
    }
  }
  .visit-submit {
    width: 315px;
    height: 50px;
    line-height: 50px;
    margin: 10px 0px 54px 0px;
    background-image: linear-gradient(-217deg, #ffdf00 0%, #ffeb00 100%);
    border-radius: 4px;
    font-family: PingFang-SC-Regular;
    font-size: 18px;
    color: #624d17;
    text-align: center;
  }
}
</style>

