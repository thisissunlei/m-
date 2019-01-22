<template>
  <div class="ui-dialog-best" ref="bestDialog" >
      <!-- v-show="isShow" -->
      <div class="g-dialog-best">
          <div class="u-dialog-content">
                <span class="u-close" @click="onClose"></span>
                <div class='u-dialog-box'>
                    <div class="u-tip-name">请填写您的预约信息</div>
                     <div class="u-best-visit">
                        <div class="u-input">
                                <input
                                    type="number"
                                    placeholder="手机号码"
                                    v-model="mobile"

                                >
                        </div>
                        <div class="u-input u-area">
                                <input
                                    id="area2"
                                    type="text"
                                    name="input_area"
                                    v-model="areaValue"
                                    placeholder="社区"
                                    disabled="disabled"
                                    onfocus="this.blur()"
                                    />
                                <input id="areaValue2" type="hidden" />
                                <span class="u-triangle"></span>
                        </div>
                        <div class="u-button" @click="onSubmit">
                            <button>提交</button>
                        </div>
                    </div>

                </div>
          </div>
      </div>
       <div v-if="ifError" class="u-error-tip">{{errorMessage}}</div>
      <Dialog :personName="dialogName" :isShow="isDialogShow" :dialogType="dialogType" :Close="dialogClose"/>
    </div>
</template>

<script>
import dateFormat from '~/filters/dateFormat';
import Dialog from '~/components/Dialog';
import Baidu from '~/plugins/utils/baidu';
export default {
    props:{
        personName:String,
        type:String,
        isShow:Boolean,
        Close:Function,
        addressBest:String,
        communityId:Number,
        isBottom:Boolean,
    },
    components:{
        Dialog,
        Baidu
    },
    data(){
        console.log('===',this.isBottom)
        return{
            username:'',
            message:'',
            info:'',
            disableSubmit:false,
            address:'',
            imgClass:'',
            mobile:'',
            community:168,
            username:'客户',
            areaValue:'北京 · 建国路社区',
            visitParams:{
                from:'',
                terminal:''
            },
            bestShow:false,
            ifError:false,
            errorMessage:'',
            isDialogShow:false,
            dialogType:'',
            dialogName:'',
            data:[],
            flag:false,
            bottom:this.isBottom,
        }
    },
    watch:{
        type:{
            deep:true,
            handler:function(newProps,oldProps){
               let type=newProps?newProps:oldProps;
            }
        },
        canBottom(value){
            console.log('canBottom',value)
        },
        isShow:{
            deep:true,
            handler:function(newProps,oldProps){
               let show=newProps?newProps:oldProps;
               this.bestShow = show;
            }
        },
        personName:{
            deep:true,
            handler:function(newProps,oldProps){
                let name=newProps?newProps:oldProps;
                this.areaValue=name;
                console.log("props",newProps,oldProps,name,this.areaValue);
            }
        },
        communityId:{
            deep:true,
            handler:function(newProps,oldProps){
                let community=newProps?newProps:oldProps;
                this.community=community;
            }
        },
        isBottom:{
            deep:true,
            handler:function(newProps,oldProps){
                let bottom=newProps?newProps:oldProps;
                this.bottom=bottom;
            }
        },
    },
    mounted(){
        this.getParams();
        this.getCommunityList();
        document.body.className="fiexd";
        this.areaValue=this.personName;
       if(document.getElementById('hm_t_undefined')){
            document.getElementById('hm_t_undefined').style.display="none";
       }


    },
    methods:{
        getCommunityList(){
              this.$http.get('get-all-community').then((res)=>{
                    var communityData = Object.assign({},res);
                    communityData.data.map((item,index)=>{
                        //更改城市字段
                        item.value = item.id;

                        item.label = item.name;
                       //筛选可预约社区
                        var canVisitCommunity = item.communityList.filter(function(items) {
                            if(item.id==1){
                                return (items.status == 1 || (items.id>174))
                            }else if(item.id==74){
                                return (items.status == 1 || (items.id>179))
                            }else{
                                return (items.status == 1)
                            }
                        });
                        //筛选后更改社区字段
                        canVisitCommunity.map((itemChild,childIndex)=>{
                            itemChild.value = itemChild.id;
                            itemChild.label = itemChild.name;
                            return itemChild;
                        })


                        item.children = canVisitCommunity;

                        return item;
                    })
                    // if(this.disSelect){
                    //     var cyCommunity = {
                    //         value:177,
                    //         label:'朝阳公园社区'
                    //     };
                    //     communityData.data[0].children.push(cyCommunity)
                    // }

                     this.initArea(communityData.data)



                }).catch((err)=>{

                })
          },
        initArea(LAreaData){
              var area = new LArea();
                area.init({
                    'trigger': '#area2',//触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                    'valueTo':'#areaValue2',//选择完毕后id属性输出到该位置
                    'keys':{id:'id',name:'name'},//绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                    'type':1,//数据源类型
                    'data':LAreaData//数据源
                });
          },
         dialogClose(){
              this.isDialogShow = !this.isDialogShow;
              if(this.flag){
                  this.Close();
            }

         },
        onClose(){
             document.body.className="";
             this.Close && this.Close();
        },
        onBulr(){

        },
         onSubmit(name,event){
                if(this.bottom){
                    Baidu.trackEvent('best吸底','吸底预约弹窗');
                }else{
                    Baidu.trackEvent('best建国路','建国路预约弹窗');
                }
                console.log(this.bottom)
                var _this=this;
                if(this.mobile=="" || !/^1[345678]\d{9}$/.test(this.mobile)){
                        this.errorMessage="请输入正确的手机号码";
                        this.ifError=true;
                        setTimeout(function(){
                            _this.ifError=false;
                        },1000)
                        return
                }
                    let Value=document.getElementById('areaValue2').value;
                    let areaValue;
                    if(Value!=''){
                        areaValue=Value.split(',')[1]
                    }
                this.disableSubmit = true;
                var submitData = Object.assign({},this.visitData);
                let form = {};
                form.username = this.username;
                form.mobilephone = this.mobile;
                form.communityId =areaValue || this.community;
                //去参数
                form.from_type = this.GetQueryString('source') || 'krspace_visit';
                // form.from_type = 'krspace_visit';
                form.appionttime = dateFormat(new Date(),'YYYY-MM-dd');;
                form.promoCode = this.GetQueryString('key') || '';
                if(this.visitParams.from && this.visitParams.terminal){
                    form.from = this.visitParams.from;
                    form.terminal = this.visitParams.terminal;
                }
                this.flag=true;
                this.$http.post('post-visit',form).then((res)=>{
                        this.isDialogShow = true;
                        this.disableSubmit = false;
                        this.dialogName = form.username;
                        this.dialogType = 'success';
                        this.mobile='';
                        this.community=168;
                        this.areaValue='北京 · 建国路社区';
                        _taq.push({convert_id:"1597892806975534", event_type:"form"})
                }).catch((err)=>{
                    if(err.code == -2){
                        this.dialogType = 'warn';
                    }else{
                        this.dialogType = 'error';
                    }

                    this.isDialogShow = true;
                    this.dialogName = form.username;

                })
        },
        GetQueryString(name){
            //去参数
            return '';
            // var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            // var r = window.location.search.substr(1).match(reg);
            // if(r!=null)return  unescape(r[2]); return null;
        },
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
    }
}
</script>

<style lang="less" >
.fiexd{
  width:100%;
  height:100%;
  position:fixed;
}
.u-error-tip{
      height:0.46rem;
      line-height:0.46rem;
      position: absolute;
      background: rgba(35,36,40,0.90);
      border-radius: 0.08rem;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #FFFFFF;
      padding:0 0.32rem;
      display: inline-block;
      top:50%;
      left:50%;
      transform: translateX(-50%);
      margin-top:-0.13rem;
      white-space:nowrap;
      z-index: 889;
}

.ui-dialog-best{
    width:100%;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background: rgba(40,38,36,0.90);
    z-index:899;
    overflow: hidden;
    .g-dialog-best{
         width:3.15rem;
        height:3.04rem;
        position: absolute;
        left:50%;
        top:50%;
        margin-left: -1.575rem;
        margin-top:-1.52rem;
        border-radius: 0.08rem;
        background:#fff;
        .u-close{
            position: absolute;
            width:0.14rem;
            height:0.14rem;;
            right:0.17rem;;
            top:0.16rem;;
            background: url('/images/icon/icon_close.svg') no-repeat center center;
            background-size:cover;
            cursor:pointer;
        }
        .u-dialog-box{
                width:3.12rem;
                margin:0.38rem auto 0;
                .input-item{
                    background:#fff;
                    border-radius: 0.08rem;
                    input{
                        &:focus{
                            outline:none;
                            box-shadow:none;
                        }
                        margin-bottom:0.1rem;
                        font-family: PingFangSC-Regular;
                        font-size: 0.16rem;
                        color: #333;
                        height:0.5rem;
                        width:3.12rem;
                        background: #F6F6F6;
                        border-radius: 0.08rem;
                        border:none;
                        text-indent: 0.16rem;
                    }

                }
                .u-tip-name{
                    font-family: 'PingFang-SC-Medium';
                    font-size: 0.18rem;
                    color: #333333;
                    line-height: 0.2rem;
                    text-align: center;
                    margin-bottom:0.3rem;
                }
                .u-tip-message{
                    font-family: 'PingFang-SC-Regular';
                    font-size: 0.14rem;
                    color: #666666;
                    line-height: 0.2rem;
                    margin:0.08rem 0 0.3rem;
                }


            }
            .u-best-visit{
        width:2.83rem;
        height:2.1rem;
        margin:0 auto;
        .u-input{
           width:100%;
           height:0.5rem;
           line-height:0.5rem;
           margin-bottom:0.1rem;
           background: #F6F6F6;
           border-radius: 0.08rem;
           position: relative;
           font-size: 0.16rem;
           z-index:10;
           input{
               width:100%;
               height:100%;
               margin:0;
               padding:0;
               outline: 0;
               border:0;
               border-radius: 0.08rem;
               background: #F6F6F6;
               font-size: 0.16rem;
               color: #333333;
               text-indent:0.16rem;
           }
           ::-moz-placeholder { color: #CCCCCC; }
           ::-webkit-input-placeholder { color:#CCCCCC;}
           :-ms-input-placeholder { color:#CCCCCC; }

        }
        .u-button{
             //height:0.6rem;
             height:0.5rem;
             button{
                 width:100%;
                 height:100%;
                //background: url('/images/best/button_bg.png') no-repeat top center;
                // background-size:100% 120%;
                 outline: 0;
                 border:0;
                 border-radius: 0.08rem;
                 background-image: linear-gradient(46deg, #F79C1C  0%, #FAD961 100%);
                 color:#fff;
                 text-align: center;
                 line-height:0.5rem;
                 font-size: 0.16rem;
                 font-family: PingFang-SC-Medium;
             }

        }
    }

    }
}

</style>


