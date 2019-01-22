<style lang="less" scope></style>


<template>
  <img :src="url" :width="width" :height="height" :alt="alt"/>
</template>


<script>

    export default {

        /**
         *  @param {boolean} fixed 固定在页面，默认不固定
         *  @param {string} theme 固定在页面，默认不固定
        */
        props:{
			width:String,
			height:String,
            src:String,
            type:String,
            params:String,
            alt:String,
        },
        data(){
            return {
                url:this.src,
            };
      },
      mounted(){

        var {type,params,width,height} = this;

       	var defaultSrc = '';

		if(width && height){
       		defaultSrc = `${this.url}?x-oss-process=image/resize,h_${height},w_${width},color_eeeeee`; 
		}else {
        	defaultSrc = `${this.url}?x-oss-process=image/${this.type},${this.params}`
		}

        var that = this;
        var img = new Image();

        img.src =  defaultSrc;

        img.onload = function(){
            that.url = this.src;
        }

        img.onerror = function(){
            that.url = "/images/community/community-404.png";
        }


      }
    }
</script>



