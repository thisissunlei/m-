<template>
  <div class="g-market-b" ref="best">
    <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
    <section class="u-banner" ref="banner">
      <!-- <a :href="`/${params}`" class="logo-href"> -->
      <a href="/" class="logo-href">
        <img class="logo" src="../../assets/images/newlogo.png" />
      </a>
    </section>
    <section class="u-visit" ref="visit" style="margin-top: 20px">

      <div class="u-best-visit">
        <div class="visit-title">
          <div class="line"></div>
          <div class="text">核心商圈超值办公室</div>
          <div class="line"></div>
        </div>
        <div class="u-input" @click="changeCity('city')">
          <span class="u-city-icon"></span>
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
        <div class="u-input" @click="changeCity('comm')">
          <span class="u-build-icon"></span>
          <input
            id="area2"
            type="text"
            name="input_area2"
            v-model="buildValue"
            placeholder="选择商圈"
            readOnly="readOnly"
            onfocus="this.blur()"
          />
          <input id="areaValue2" type="hidden" />
          <span class="u-triangle"></span>
        </div>
        <div class="u-input" @click="changeCity('num')">
          <span class="u-count-icon"></span>
          <input
            id="area3"
            type="text"
            name="input_area3"
            v-model="countValue"
            placeholder="选择规模"
            readOnly="readOnly"
            onfocus="this.blur()"
          />
          <input id="areaValue3" type="hidden" />
          <span class="u-triangle"></span>
        </div>
        <div class="u-input">
          <span class="u-phone-icon"></span>
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
          <button>查询报价</button>
        </div>
      </div>
    </section>
    <section class="main-point" ref="commity">

    </section>
    <div class="to-top" @click="toTop"></div>
    <section class="real">
      <div class="real-title">
        氪空间实景展示
      </div>
      <div class="real-english">
        REAL ENVIRONMENT OF KRSPACE
      </div>
      <div class="real-swiper" @mouseenter="stopAreaSwiper"  @mouseleave="startAreaSwiper">
        <div class="real-pic-outer" v-swiper:myAreaPicSwiper="swiperRealPicOption">
          <ul class="swiper-wrapper" >
            <li class="swiper-slide">
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real1.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">办公区域</div>
                  <div class="bottom">针对不同公司规模对应不同的办公空间方案</div>
                </div>
              </div>

            </li>
            <li class="swiper-slide">
              <div class="outer">
                <img class="real-pic" src="../../assets/images/market/real2.jpg" alt="联合办公众创空间共享办公"/>
                <div class="intro">
                  <div class="top">会议室</div>
                  <div class="bottom">搭配智能投放系统，在手机上在线预订使用</div>
                </div>
              </div>
            </li>
            <li class="swiper-slide">
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
                  <div class="top">行政前台</div>
                  <div class="bottom">统一管理来访登记，代收快递，提供贴心服务</div>
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
        全球华人精英社群
      </div>
      <div class="global-english">
        GLOBAL CHINESE ELITE COMMUNITY
      </div>
      <div class="global-main"></div>

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

    <div class="city-list-dialog" v-if="modeShow">
      <div class="close" @click="changeCity"></div>
      <ul>
        <li v-for="item, i in modeList" :key="i" @click="cityListClick(item)"
            :class="cityId === item.id? 'select': ''">{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>
<script>
//  import KrImage from '~/components/KrImage';
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
      Baidu
    },
    head() {
      return {
        script: [
          {
            src: "/marketBaidu.js"
          },
        ],
        link: [{
          rel: "canonical",
          href: "https://www.krspace.cn/marketingb/"
        }]
      };
    },
    data(){
      return{
        modeList: [],
        modeShow: false,
        modeType: '',
        modeId: 0,
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
        buildValue:'',
        communityList:[],
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
        cityList:[],
        buildList:[],
        countList:[{id:1,name:'1-5人'},{id:2,name:'6-10人'},{id:3,name:'11-15人'},{id:1,name:'16人以上'}],
        countValue:'',
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
//      this.initArea3(this.countList);
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
      changeCity(type) {
        console.log(type)
        this.modeType = type
        if ( type === 'city' ) {
          this.modeList = this.cityList
          this.modeId = this.cityId
        }
        if ( type === 'comm' ) {
          this.modeList = this.buildList
          this.modeId = this.cityId
        }
        if ( type === 'num' ) {
          this.modeList = this.countList
          this.modeId = this.cityId
        }
        this.modeShow = !this.modeShow
      },
      cityListClick(item) {
        console.log(item)
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
            that.initBuild(res.items.cityVo.cityId);
          })
//        this.$http.get('get-visit-community').then(function(response){
//          that.cityId = response.data.items.cityVo.cityId;
//          that.areaValue = response.data.items.cityVo.cityName;
//          that.initBuild(response.data.items.cityVo.cityId);
//        });
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
        var _this = this;
        area.init({
          'trigger': '#area1',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo':'#areaValue1',//选择完毕后id属性输出到该位置
          'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
          'type':1,//数据源类型
          'data':LAreaData,//数据源
          'flexNum':1,
        });
        area.success=function(){
          // console.log(area.value[0]);
          // if(area.value[0]==1){
          //     _this.buildList = [{id:1,name:'国贸'},{id:2,name:'王府井'},{id:3,name:'复兴门'},{id:4,name:'朝阳门'},{id:5,name:'中关村'},{id:6,name:'望京'},{id:7,name:'东四环'},{id:8,name:'其他'}];
          // }
          _this.initBuild(area.value[0]);

        }
      },
      initArea2(LAreaData){
        //   console.log(LAreaData);
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
      initArea3(LAreaData){
        var area = new LArea();
        area.init({
          'trigger': '#area3',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
          'valueTo':'#areaValue3',//选择完毕后id属性输出到该位置
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
      toTop(){
        Baidu.trackEvent('MKTB-吸底按钮','点击');
        (function smoothscroll(){
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,currentScroll - (currentScroll/5));
          }
        })();
      },
      initBuild(id){
        var buildList = [];
        //console.log(id);
        switch(id.toString())

        {
          case '1':
            buildList = [{id:1,name:'国贸'},{id:2,name:'王府井'},{id:3,name:'复兴门'},{id:4,name:'朝阳门'},{id:5,name:'中关村'},{id:6,name:'望京'},{id:7,name:'东四环'},{id:8,name:'其他'}];
            break;
          case '2':
            buildList = [{id:1,name:'滨江道'},{id:2,name:'中央大道'},{id:3,name:'其他'}];
            break;
          case '74':
            buildList = [{id:1,name:'徐家汇'},{id:2,name:'虹桥绿谷'},{id:3,name:'世纪大道'},{id:4,name:'来福士广场'},{id:5,name:'华山路'},{id:6,name:'陆家嘴'},{id:7,name:'浦东软件园'},{id:8,name:'外滩'},{id:9,name:'漕河泾'},{id:10,name:'张江'},{id:11,name:'静安寺'},{id:12,name:'凤城巷'},{id:13,name:'汶水路'},{id:14,name:'其他'}];
            break;
          case '75':
            buildList = [{id:1,name:'珠江路'},{id:2,name:'新街口'},{id:3,name:'楚翘城'},{id:4,name:'其他'}];
            break;
          case '79':
            buildList = [{id:1,name:'金鸡湖'},{id:2,name:'其他'}];
            break;
          case '88':
            buildList = [{id:1,name:'钱江新城'},{id:2,name:'万塘汇'},{id:3,name:'未来科技城'},{id:4,name:'其他'}];
            break;
          case '170':
            buildList = [{id:1,name:'光谷'},{id:2,name:'街道口'},{id:3,name:'其他'}];
            break;
          case '198':
            buildList = [{id:1,name:'客村'},{id:2,name:'其他'}];
            break;
          case '238':
            buildList = [{id:1,name:'太古里'},{id:2,name:'其他'}];
            break;
          default:
            return ;
        }
        this.buildList = buildList;
//        this.initArea2(buildList);
        this.buildValue = buildList[0].name;
      },
      onSubmit(){
        var _this=this;
        Baidu.trackEvent('MKTB-顶部预约','点击');
        if(this.mobile=="" || !/^1[345678]\d{9}$/.test(this.mobile)){
          this.errorMessage="请输入正确的手机号码";
          this.ifError=true;
          setTimeout(function(){
            _this.ifError=false;
          },1000)
          return
        }
        var Value=document.getElementById('areaValue1').value;
        var areaValue;
        if(Value!=''){
          areaValue=Value;
        }
        this.disableSubmit = true;
        var submitData = Object.assign({},this.visitData);
        let form = {};
        form.username = '客户fromB';
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
            this.isShow = true;
            this.disableSubmit = false;
            this.dialogName = this.username;
            this.dialogType = 'success';
            this.mobile='';
            // this.areaValue='';
            _taq.push({convert_id:"1597892806975534", event_type:"form"});
            _taq.push({convert_id:"1600058262413320", event_type:"form"});
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
//        this.$http.post('post-city-visit',form).then((res)=>{
//          this.isShow = true;
//          this.disableSubmit = false;
//          this.dialogName = this.username;
//          this.dialogType = 'success';
//          this.mobile='';
//          // this.areaValue='';
//          _taq.push({convert_id:"1597892806975534", event_type:"form"});
//          _taq.push({convert_id:"1600058262413320", event_type:"form"});
//        }).catch((err)=>{
//          if(err.code == -2){
//            this.dialogType = 'warn';
//          }else{
//            this.dialogType = 'error';
//          }
//
//          this.isShow = true;
//          this.dialogName = this.username;
//
//        })
      },
      stopAreaSwiper(){
        this.myAreaPicSwiper.autoplay.stop();
      },
      startAreaSwiper(){
        this.myAreaPicSwiper.autoplay.start();
      },

      getAllCity(){
        model.getCityList()
          .then(res => {
            this.cityList = res;
//            that.initArea(res);
//            that.initArea2(res);
          })
//        this.$http.get('get-city-list').then((res)=>{
//          var data = Object.assign({},res);
//          this.cityList = data.data;
//          this.initArea(this.cityList)
//        });
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
  .g-market-b{
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
      height:225px;
      background: url('../../assets/images/market/banner_B.jpg') no-repeat center center;
      background-size:cover;
      position: relative;
      .logo-href{
        width: 78px;
        height: 26px;
        position:absolute;
        top: 10px;
        left: 10px;
      }
      .logo{
        height: 26px;
      }
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
      margin:0 auto;
      .visit-title{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
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
        display: flex;
        width:100%;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        border-radius: 8px;
        position: relative;
        font-size: 14px;
        z-index:10;
        span{
          /*display: inline-block;*/
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
        .u-phone-icon{
          background: url('../../assets/images/market/icon_phone.svg') no-repeat center center;
          background-size:100% 100%;
          width:15%;
          height: 35px;
        }
        .u-count-icon{
          background: url('../../assets/images/market/icon_count.svg') no-repeat center center;
          background-size:100% 100%;
          width:15%;
          height: 35px;
        }
        .u-build-icon{
          background: url('../../assets/images/market/icon_build.svg') no-repeat center center;
          background-size:100% 100%;
          width:15%;
          height: 35px;
        }
        .u-city-icon{
          background: url('../../assets/images/market/icon_city.svg') no-repeat center center;
          background-size:100% 100%;
          width:15%;
          height: 35px;
        }
        input{
          width:85%;
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
      background: url('../../assets/images/market/realban.jpg') no-repeat center center;
      background-size:cover;
      .real-title{
        text-align:center;
        font-size: 20px;
        color: #111111;
        letter-spacing: 6px;
      }
      .real-english{
        font-size: 10px;
        color: #999999;
        text-align:center;
        margin-top: -2px;
        // margin-bottom: 0.14px;
      }
      .real-swiper{
        margin-top: -10px;
        .swiper-pagination-bullets {
          bottom: 0;
        }
        .swiper-wrapper{
          height: 250px;
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
            width:276px;
            border-radius: 12px;
            transform: translateY(10px);
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
    .to-top{
      width: 60px;
      height: 60px;
      position:fixed;
      bottom: 30px;
      right: 10px;
      background:url('../../assets/images/market/icon_write.svg') no-repeat center center;
      background-size:100% 100%;
      z-index:2;
    }
    .global{
      width:100%;
      height:430px;
      padding-top: 10px;
      background: url('../../assets/images/market/globalban.jpg') no-repeat center center;
      background-size:cover;
      .global-title{
        text-align:20px;
        color: #fff;
        letter-spacing: 6px;
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
        height:325px;
        background: url('../../assets/images/market/globalmain.png') no-repeat center center;
        background-size: 100% auto;
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
        height:22px;
      }
      .u-footer-contnet{
        text-align: center;
        padding-top: 16px;
      }
    }

  }
</style>

