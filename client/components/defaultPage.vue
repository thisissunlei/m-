<template>
  <div class="warp">
    <div class="default-title">{{title}}</div>
    <img src="../assets/images/default.png" alt="img" class="default-img">
  </div>
</template>
<script>
  export default {
    props: ['title'],
  }
</script>
<style lang='less' scoped>
  .default-title {
    padding-bottom: 30px;
    color: #666666;
    font-size: 20px;
    font-weight: bold;
  }
  .default-img {
    display: block;
    height: 176px;
    width: 308px;
    margin-bottom: 119px;
  }
</style>
