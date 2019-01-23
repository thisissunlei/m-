<template>
  <div class="g-market-a" ref="best">
    <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
    <a href='https://m.krspace.cn' v-if="$route.query.source != 'fir'" ref="banner">
      <section class="u-banner"></section>
    </a>
    <div class="banner" v-swiper:mybannerSwiper="swiperBannerOption"  ref="banner" v-else>
      <div class="swiper-wrapper">
        <a href='javascript:;' class="swiper-slide">
          <section class="u-banner-fir"></section>
        </a>
        <a href='https://m.krspace.cn' class="swiper-slide">
          <section class="u-banner"></section>
        </a>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <!-- <section class="u-banner" ref="banner">
        去参数
        <a :href="`/${params}`" class="logo-href">
        <a href="/" class="logo-href">
            <img class="logo" src="/images/market/newlogo.png" />
        </a>
    </section> -->


    <section class="main-point" ref="commity">

    </section>
    <section class="u-visit" ref="visit">
      <div class="u-best-visit">
        <div class="visit-title">
          <div class="line"></div>
          <div class="text">现在您可亲自体验联合办公</div>
          <div class="line"></div>
        </div>
        <div class="u-input" @click="changeCity">
          <input
            id="area1"
            type="text"
            name="input_area"
            v-model="areaValue"
            placeholder="请选择所在的城市"
            readOnly="readOnly"
            onfocus="this.blur()"
          />
          <input id="areaValue1" type="hidden" />
          <span class="u-triangle"></span>
        </div>
        <div class="u-input">
          <input
            type="number"
            placeholder="手机号码"
            v-model="mobile"
          >
        </div>
        <div class="visit-tip">
          注：我们将保障您的信息安全，可放心填写。
        </div>
        <div class="u-button" @click="onSubmit" id="best">
          <button>马上申请体验名额</button>
        </div>
      </div>
    </section>

    <section class="real">
      <div class="real-title">
        中小企业办公优选
      </div>
      <div class="real-english">
        The First Choice of Your Team
      </div>
      <div class="real-swiper" @mouseenter="stopAreaSwiper"  @mouseleave="startAreaSwiper">
        <div class="real-pic-outer" v-swiper:myAreaPicSwiper="swiperRealPicOption">
          <ul class="swiper-wrapper" >
            <li class="swiper-slide">
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real1.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">全国社区随意坐</div>
                  <div class="bottom">舒适共享区，洽谈商务休息好选择</div>
                </div>
              </div>

            </li>
            <li class="swiper-slide">
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real3.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">专属办公桌与私密空间</div>
                  <div class="bottom">固定办公区，1-20人间多种选择</div>
                </div>
              </div>
            </li>
            <li class="swiper-slide" v-if='false'>
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real3.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">休息区域</div>
                  <div class="bottom">所有人都可以自由使用的共享区域，提供免费茶水</div>
                </div>
              </div>
            </li>
            <li class="swiper-slide">
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real4.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">智能设备成就高效会议</div>
                  <div class="bottom">专享会议室，手机一键预约即可使用</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
      </div>
    </section>
    <section class="global">
      <div class="global-title">
        让办公更美好
      </div>
      <div class="global-english">
        Make Work Better
      </div>
      <div class="global-main"></div>

    </section>
    <section class="u-visit" style="margin-top:20px">
      <div class="u-best-visit">
        <div class="visit-title">
          <div class="line"></div>
          <div class="text">现在您可亲自体验联合办公</div>
          <div class="line"></div>
        </div>
        <div class="u-input" @click="changeCity">
          <input
            id="area2"
            type="text"
            name="input_area"
            v-model="areaValue"
            placeholder="请选择所在的城市"
            readOnly="readOnly"
            onfocus="this.blur()"
          />
          <input id="areaValue2" type="hidden" />
          <span class="u-triangle"></span>
        </div>
        <div class="u-input">
          <input
            type="number"
            placeholder="手机号码"
            v-model="mobile"
          >
        </div>
        <div class="visit-tip">
          注：我们将保障您的信息安全，可放心填写。
        </div>
        <div class="u-button" @click="onSubmit('bottom')" id="best">
          <button>马上申请体验名额</button>
        </div>
      </div>
    </section>
    <div class="u-best-footer">
      <div class="u-footer-contnet">
        <p>© 2011-2018 氪空间（北京）信息技术有限公司</p>
        <p>京ICP备16012805号</p>
        <!-- <p>京公网安备11010802012285号</p> -->
        <p>咨询电话：400-807-3636</p>
        <p>公司地址：北京市朝阳区骏豪中央公园广场A1四层</p>
      </div>
    </div>
    <!--<BestDialog-->
    <!--:personName="dialogBestName"-->
    <!--:communityId="BestId"-->
    <!--v-if="isBestShow"-->
    <!--:type="bestType"-->
    <!--:Close="dialogBestClose"-->
    <!--:isBottom.sync="bestDialogBottom"-->
    <!--/>-->

    <Dialog :personName="dialogName" :isShow="isShow" :dialogType="dialogType" :Close="dialogClose"/>

    <div class="city-list-dialog" v-if="cityPS">
      <div class="close" @click="changeCity"></div>
      <ul>
        <li v-for="item, i in cityList" :key="i" @click="cityListClick(item)"
            :class="cityId === item.id? 'select': ''">{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>
<script>
//    import KrImage from '../../components/KrImage';
  //  import BestDialog from '~/components/BestDialog';
  //  import dateFormat from '~/filters/dateFormat';
    import Dialog from '../../components/Dialog';
    import Baidu from '../../util/baidu';
  import model from 'model'
  export default {
    components:{
//      KrImage,
//      BestDialog,
      Dialog,
//      Baidu
    },
    data(){
      return{
        cityPS: false,
        cityIndex:0,
        mobile:'',
        areaValue:'',
        isFixed:false,
        dialogBestName:'',
        BestId:1,
        address:'',
        isBestShow:false,
        dialogType:'',
        bestDialogBottom:false,
        isRecommendDialog:false,
        cityList:[],
        communityList:[],
        swiperBannerOption: {
          loop: true,
          speed: 500,
          lazy: {
            loadPrevNext: true
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        },
        swiperRealPicOption:{
          slidesPerView: 'auto',
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
          // autoplay: true,
          // delay:5000,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
        },
        allCommunityList:[],
        visitParams:{
          from:'',
          terminal:''
        },
        username:'客户',
        ifError:false,
        errorMessage:'',
        community:168,
        dialogName:'',
        dialogType:'',
        isShow:false,
        bestType:'',
        cityId:'',
        cityName:'',
      }
    },
    computed:{
      params:function(){
        let query = this.$route.query;
        var params = [];
        if(Object.keys(query).length>0){
          for(var queryItem in query){
            if(queryItem != 'cityId'){
              params.push(`${queryItem}=${query[queryItem]}`);
            }
          }
          return `?${params.join('&')}`;
        }else{
          return '';
        }

      }
    },
    mounted(){
      this.getAllCity();
      this.getParams();
      this.getLocaCity();
      var _this = this;
      window.onscroll = function(){
        let top= document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let height = document.documentElement.scrollHeight-document.documentElement.clientHeight;
        let bottom = height-top;
        let screenH=_this.$refs.banner.clientHeight+_this.$refs.visit.clientHeight+_this.$refs.commity.clientHeight;
        if(bottom<74 || top<screenH ){
          _this.isFixed=false;
        }else{
          _this.isFixed=true;
        }

        if(document.getElementById('hm_t_undefined')){
          document.getElementById('hm_t_undefined').style.display="none";
        }
      }


//      window.WEIXINSHARE = {
//        shareTitle: '预约参观「氪空间」，体验全新工作方式！',
//        shareDesc: '北京、上海、南京、杭州、天津、武汉、成都、苏州、广州、厦门、合肥，全面开放！',
//        shareImg: location.origin+'/images/ico.png',
//        // shareImg: '//sta.krspace.cn/web-h5-static/images/logofav.png',
//      }
//      InitWechat();

    },
    methods:{
      changeCity() {
        this.cityPS = !this.cityPS
      },
      cityListClick(item) {
        this.cityPS = false
        this.cityId = item.id;
        this.areaValue = item.name;
      },
      dialogClose(){
        this.isShow = !this.isShow;
      },
      //获取定位城市
      getLocaCity(){
        var that = this;
        model.getVisitCommunity()
          .then(res => {
            that.cityId = res.items.cityVo.cityId;
            that.areaValue = res.items.cityVo.cityName;
          })
      },
      //SEM
      getParams(){
        var routeParams = this.$route;
        var urlFrom = routeParams.query.from;
        var urlTerminal = routeParams.query.terminal;
        var sessionFrom=sessionStorage.getItem("visitFrom");
        var sessionTerminal=sessionStorage.getItem("visitTerminal");
        if(sessionFrom && sessionTerminal){
          this.visitParams = {
            from:sessionFrom,
            terminal:sessionTerminal
          }
        }else if(urlFrom && urlTerminal){
          sessionStorage.setItem("visitFrom",urlFrom);
          sessionStorage.setItem("visitTerminal",urlTerminal);
          this.visitParams = {
            from:urlFrom,
            terminal:urlTerminal
          }
        }
      },
      dialogBestClose(){
        this.isBestShow = !this.isBestShow;
        if(!this.isBestShow){
          document.body.className="";
        }
      },

      initArea(LAreaData){
        var area = new LArea();
        area.init({
          'trigger': '#area1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo':'#areaValue1',//选择完毕后id属性输出到该位置
          'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type':1,//数据源类型
          'data':LAreaData,//数据源
          'flexNum':1,
        });

      },
      initArea2(LAreaData){
        var area = new LArea();
        area.init({
          'trigger': '#area2',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo':'#areaValue2',//选择完毕后id属性输出到该位置
          'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type':1,//数据源类型
          'data':LAreaData,//数据源
          'flexNum':1,
        });
      },

      GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      },
      onSubmit(type){
        var _this=this;
        if(type=='bottom'){
          Baidu.trackEvent('MKTA-底部预约','点击');
          var Value=document.getElementById('areaValue2').value;
          var areaValue;
          if(Value!=''){
            areaValue=Value;
          }
        }else{
          Baidu.trackEvent('MKTA-顶部预约','点击');
          var Value=document.getElementById('areaValue1').value;
          var areaValue;
          if(Value!=''){
            areaValue=Value;
          }
        }
        if(this.mobile=="" || !/^1[345678]\d{9}$/.test(this.mobile)){
          this.errorMessage="请输入正确的手机号码";
          this.ifError=true;
          setTimeout(function(){
            _this.ifError=false;
          },1000)
          return
        }
        this.disableSubmit = true;
        var submitData = Object.assign({},this.visitData);
        let form = {};
        form.username = '客户fromA';
        form.mobilephone = this.mobile;

        form.cityId =areaValue || this.cityId;
        form.from_type = this.GetQueryString('source') || 'krspace_visit';
        let day = new Date
        let yy = day.getFullYear()
        let mm = day.getMonth()+1 >= 10? day.getMonth()+1: '0'+(day.getMonth()+1)
        let dd = day.getDate() >= 10? day.getDate(): '0'+day.getDate()
        form.appionttime = yy + '-' + mm + '-' + dd;
        form.promoCode = this.GetQueryString('key') || '';
        if(this.visitParams.from && this.visitParams.terminal){
          form.from = this.visitParams.from;
          form.terminal = this.visitParams.terminal;
        }

        model.postCityVisit(form)
          .then(res => {
            window._agl  &&  window._agl.push(['track',  ['success',  {t:  3}]]);
            this.isShow = true;
            this.disableSubmit = false;
            this.dialogName = this.username;
            this.dialogType = 'success';
            this.mobile='';
            // this.areaValue='';
//            _taq.push({convert_id:"1597892806975534", event_type:"form"});
//            _taq.push({convert_id:"1600058262413320", event_type:"form"});
//            _taq.push({convert_id:"1602584012684340", event_type:"form"});
//            _taq.push({convert_id:"1602492776885256", event_type:"form"});
//            gdt('track', 'RESERVATION');
          })
          .catch(err => {
            if(err.code == -2){
              this.dialogType = 'warn';
            }else{
              this.dialogType = 'error';
            }
            this.isShow = true;
            this.dialogName = this.username;
          })
      },
      stopAreaSwiper(){
        this.myAreaPicSwiper.autoplay.stop();
      },
      startAreaSwiper(){
        this.myAreaPicSwiper.autoplay.start();
      },

      getAllCity(){
        var that = this;
        model.getCityList()
          .then(res => {
            that.cityList = res;
//            that.initArea(res);
//            that.initArea2(res);
          })
      },
    }
  }
</script>
<style lang="less" >
  .city-list-dialog {
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    background: rgba(40,38,36,0.90);
    z-index:899;
    .close {
      position: absolute;
      width: 20px;
      height: 20px;
      left:50%;
      top:50%;
      margin-left: 132px;
      margin-top: -120px;
      background: url('../../assets/images/icon/icon_close.svg') no-repeat center center;
      background-size:cover;
      z-index: 1;
    }
    ul {
      background:#fff;
      border-radius: 8px;
      width:315px;
      height:247px;
      position: absolute;
      left:50%;
      top:50%;
      z-index: 0;
      margin-left: -157.5px;
      margin-top:-123.5px;
      overflow-y: scroll;
      li {
        text-align: center;
        height: 38px;
        line-height: 38px;
        color: #666666;
        font-size: 14px;
        &.select {
          color: #333333;
          font-weight: bold;
        }
      }
    }
  }
  .footer{
    display:none;
  }
  body{
    padding-bottom:0;
  }

  .u-error-tip{
    height: 46px;
    line-height: 46px;
    position: fixed;
    background: rgba(35,36,40,0.90);
    border-radius: 8px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    padding:0 32px;
    display: inline-block;
    top:50%;
    left:50%;
    transform: translateX(-50%);
    margin-top:-13px;
    white-space:nowrap;
    z-index:889;
  }
  .g-market-a{
    width:100%;
    height:100%;
    overflow: hidden;
    overflow-y: auto;
    font-family: SourceHanSansCN-Normal;
    .swiper-pagination-bullet{
      width: 4px;
      height: 4px;
      border:1px solid rgba(244,165,0,1);
      background:none;
    }
    .swiper-pagination-bullet-active{
      width: 4px;
      height: 4px;
      background: #F4A500;
      opacity: 1;
    }
    .u-banner{
      width:100%;
      height: 225px;
      background: url('../../assets/images/market/banner_A.jpg') no-repeat center center;
      background-size:cover;
      position: relative;
      .logo-href{
        width: 78px;
        height: 26px;
        position:absolute;
        top:10px;
        left:10px;
        display:none;
      }
      .logo{
        height: 26px;
      }
    }
    .u-banner-fir {
      width:100%;
      height:225px;
      background: url('../../assets/images/market/bn_a.png') no-repeat center center;
      background-size:cover;
      position: relative;
    }
    .main-point{
      width:100%;
      height: 98px;
      background: url('../../assets/images/market/mainpoint.svg') no-repeat center center;
      background-size:100% 100%;
      margin: 20px 0;
    }
    .u-best-visit{
      width:343px;
      height:220px;
      margin:0 auto;
      .visit-title{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom: 20px;
        .line{
          width: 75px;
          height: 1px;
          background:#ddd;
        }
        .text{
          font-family: SourceHanSansCN-Normal;
          font-size: 12px;
          color: #111111;
        }
      }
      .u-input{
        width:100%;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 8px;
        position: relative;
        font-size: 14px;
        z-index:10;
        span{
          display: inline-block;
        }
        .u-triangle{
          width:0;
          height:0;
          border: 7px solid transparent;
          border-top-color:#bbbbbb;
          position: absolute;
          right: 18px;
          top: 18px;
        }
        input{
          width:100%;
          height:100%;
          margin:0;
          padding:0;
          outline: 0;
          border:0;
          border-radius: 8px;
          background: #F6F6F6;
          font-size: 14px;
          color: #333333;
          text-indent: 16px;
          vertical-align: 12px;
        }
        ::-moz-placeholder { color: #999; }
        ::-webkit-input-placeholder { color:#999;}
        :-ms-input-placeholder { color:#999; }

      }
      .visit-tip{
        font-size: 12px;
        color: #DDDDDD;
        text-align:center;
        line-height: 20px;
        margin-bottom: 5px;
      }
      .u-button{
        //height:0.6px;
        height: 40px;
        button{
          width:100%;
          height:100%;
          outline: 0;
          border:0;
          border-radius: 12px;
          background: #F4A500;
          color:#fff;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
        }

      }
    }

    .real{
      width:100%;
      height:318px;
      padding-top: 10px;
      background: url('../../assets/images/market/realban.jpg') no-repeat 50% 0.5px;
      background-size:cover;
      .real-title{
        text-align:center;
        font-size: 20px;
        color: #111111;
        letter-spacing: 6px;
        padding-top:0px
      }
      .real-english{
        font-size: 10px;
        color: #999999;
        text-align:center;
        margin-top: -2px;
      }
      .real-swiper{
        margin-top: -10px;
        .swiper-pagination-bullets {
          bottom: 0;
        }
        .swiper-wrapper{
          height:250px;
          align-items: center;
        }
        .swiper-slide-active{
          .outer{
            height:100% !important;
            width:100% !important;
            transform: none !important;
          }

        }

        .swiper-slide{
          height:210px;
          width:305px;
          .outer{
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
            overflow: hidden;
            height:190px;
            border-radius: 12px;
            width:276px;
            transform: translateY(0.1px);
            margin:0 auto;
            img{
              width:100%;
              height:100%;
            }
            .intro{
              border-radius: 0 0 12px 12px;
              padding-top: 5px;
              position:absolute;
              width:100%;
              background:#fff;
              bottom:0;
              padding-left: 10px;
              height: 55px;
              opacity:0.9;
              .top{
                font-size: 16px;
                color: #111111;
              }
              .bottom{
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
      }
    }
    .global{
      width:100%;
      height:370px;
      padding-top: 3px;
      background: url('../../assets/images/market/globalban.jpg') no-repeat 50% 0.005px;
      background-size:cover;
      .global-title{
        text-align:center;
        font-size: 20px;
        letter-spacing: 6px;
        margin-top: 10px;
        color:#111;
      }
      .global-english{
        font-size: 10px;
        color: #999999;
        text-align:center;
        margin-top: -2px;
        margin-bottom: 14px;
      }
      .global-main{
        width:325px;
        height:275px;
        background: url('../../assets/images/market/globalmain.png') no-repeat center center;
        background-size:100% 100%;
        margin:0 auto;
      }
    }

    .u-best-footer{
      height:128px;
      background: #f0f0f0;
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      //   line-height: 0.34px;
      color: #999;
      p{
        height: 22px;
      }
      .u-footer-contnet{
        text-align: center;
        padding-top: 16px;
      }
    }
  }
</style>