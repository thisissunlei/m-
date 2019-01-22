<template>
  <div class="news-content">
    <!-- item border-bottom -->
    <div class="item">
      <a :href="'//'+$store.state.common.origin+'/about/'+item.id+$store.state.common.queryString"
       v-for="(item,index) in about.newsList" :key="index" target="_blank" @click="addRead(item.id)">
        <div class="item-info">
          <p class="item-title">
            {{item.title}}
            </p>
          <span class="item-time">{{item.publishedAt}}</span>
          <span class="item-read">{{item.totalReadCunt}}人阅读</span>
        </div>
        <img class="item-img" :src="item.photoUrl"/>
      </a>
    </div>
      <!--  @click="addRead(item.id)" -->
    <!-- <ul>
      <router-link
        tag="li"
        class="item border-bottom"
        v-for="item of about.newsList"
        :key="item.index"
        :to="'/about/'+item.id+$store.state.common.queryString"

      >
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <span class="item-time">{{item.publishedAt}}</span>
          <span class="item-read">{{item.totalReadCunt}}人阅读</span>
        </div>

        <img class="item-img" :src="item.photoUrl"/>
      </router-link>
    </ul> -->

    <div class="get-more" v-if="about.page < about.totalPages">{{$t("getMore")}}</div>
    <div class="get-more" v-else>{{$t("end")}}</div>
  </div>
</template>

<script>
import model from 'model'
import {mapState,mapActions} from 'vuex'
 var interval = null;
export default {
  data(){
    return{
      topValue:0,
    }
  },
  computed:{
    ...mapState([
      'about'
    ]),

  },
  mounted(){
  // console.log('about',this.about.newsList)
  window.addEventListener('scroll',this.getMore);
  },
  methods: {
    ...mapActions([
        'getNewsList'
      ]),
    addRead(id) {
      model.setNewsRead({newsId: id})
    },
    getMore(){
      if(interval == null){
        interval = setInterval(this.scrollMore,1000);
      }
      this.topValue=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    },
    scrollMore(){
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if(scrollTop!==this.topValue){
            return ;
        }
      let winHeight = window.innerHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      clearInterval(interval);
      interval = null;
      if(scrollTop >= scrollHeight - winHeight - 327){
        if(this.about.page>= this.about.totalPages){
          return;
        }
        this.getNewsList({page:this.about.page+1,pageSize:10})
        return ;
      }
    }
  },
}
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid #F3F3F3;
}
.item {

  overflow: hidden;
  a {
    // display: block;
    display: flex;
    width: 100%;
    height: 118px;
    padding: 17px 0 13px 0;
    border-bottom: 2px solid #F3F3F3;
  }
  .item-img{
    width: 114px;
    height: 85px;
  }
  .item-info{
    flex:1;
    font-family: PingFangSC-Semibold;
    padding-right: 10px;
    .item-title {
      height: 72px;
      font-size: 16px;
      color: #333333;
      line-height: 24px;
    }
    .item-time {
      float: left;
      font-size: 12px;
      color: #999999;
      line-height: 17px;
    }
    .item-read {
      float: right;
      font-size: 12px;
      color: #999999;
      text-align: right;
      line-height: 17px;
    }
  }
}
.get-more {
  margin: 29px 0 50px 0;
  font-family: PingFang-SC-Regular;
  font-size: 15px;
  color: #666666;
  text-align: center;
}
</style>

