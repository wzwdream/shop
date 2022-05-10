<template>
  <div class="index-menu">
    <my-herder :userid = userid></my-herder>
    <el-menu :default-active="activeIndex" background-color="#f5f5f5" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/computer">
        <i class="el-icon-s-platform"></i>
        <span>办公电脑</span>
      </el-menu-item>
      <!-- <el-menu-item index="/parts">
        <i class="el-icon-cpu"></i>
        <span>电脑配件</span>
      </el-menu-item>
      <el-menu-item index="/stationery">
        <i class="el-icon-mouse"></i>
        <span>外设/游戏</span>
      </el-menu-item> -->
      <el-menu-item index="/install">
        <i class="el-icon-share"></i>
        <span>自定义攒机</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import MyHerder from './MyHerder.vue';
export default {
  components: { MyHerder },
  name: "MyMenu",
  data () {
    return {
      activeIndex: '/',
      userid: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created () {
    this.activeIndex = this.$route.path;
    this.userid = sessionStorage.getItem('userid');
  }
};
</script>
<style scoped>
.index-menu /deep/ .el-menu-item {
  line-height: 45px;
  height: 45px;
  font-size: 16px;
}
.index-menu /deep/ .el-menu--horizontal>.el-menu-item.is-active {
  color: #409EFF;
}
</style>