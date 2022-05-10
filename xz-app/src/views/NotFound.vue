<template>
  <div class="notFound">
    <div class="notFound-bg"></div>
    <el-button type="text" @click="backIndex()" icon="el-icon-loading">返回首页</el-button>
  </div>
</template>
<script>
export default {
  name: "NotFound",
  data() {
    return {
      
    }
  },
  methods: {
    backIndex() {
      this.$router.push({ path: '/'});
    }
  }
};
</script>
<style scoped>
.notFound {
  height: 100%;
  background: #fff;
}
.notFound-bg {
  height: 100%;
  background: url('../assets/images/icon/404.jpg') no-repeat center;
}
.notFound button {
  position: fixed;
  top: 70%;
  left: 46%;
  font-size: 18px;
}
</style>
