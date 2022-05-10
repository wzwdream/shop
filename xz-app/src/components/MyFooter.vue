<template>
  <div class="footer-box">
    <div class="footer-box-1">
      <div class="footer-box-help">
        <div class="footer-img">
          <img src="../assets/images/help/pz.png" alt="">
        </div>
        <div class="footer-text">
          <span>品质保障</span>
          <span>品质护航 购物无忧</span>
        </div>
      </div>
      <div class="footer-box-help">
        <div class="footer-img">
          <img src="../assets/images/help/qt.png" alt="">
        </div>
        <div class="footer-text">
          <span>七天无理由退货</span>
          <span>为您提供售后无忧保障</span>
        </div>
      </div>
      <div class="footer-box-help">
        <div class="footer-img">
          <img src="../assets/images/help/ts.png" alt="">
        </div>
        <div class="footer-text">
          <span>特色服务体验</span>
          <span>为您呈现不一样的服务</span>
        </div>
      </div>
      <div class="footer-box-help">
        <div class="footer-img">
          <img src="../assets/images/help/help.png" alt="">
        </div>
        <div class="footer-text">
          <span>帮助中心</span>
          <span>您的购物指南</span>
        </div>
      </div>
    </div>
    <div class="footer-box-2">
      <div>
        <h3>购物指南</h3>
        <el-button type="text" @click="goRegister()">免费注册</el-button>
        <el-button type="text" @click="goHelp()">新手指南</el-button>
      </div>
      <div>
        <h3>学子保障</h3>
        <el-button type="text" @click="goHelp()">服务保障</el-button>
        <el-button type="text" @click="goHelp()">常见问题</el-button>
      </div>
      <div>
        <h3>商家帮助</h3>
        <!-- <el-button type="text" @click="showWaring">商家入驻</el-button> -->
        <el-button type="text" @click="showWaring">商家后台</el-button>
      </div>
      <div>
        <h3>关于我们</h3>
        <el-button type="text" @click="goHelp()">关于学子</el-button>
        <el-button type="text" @click="goHelp()">联系我们</el-button>
      </div>
    </div>
    <div class="footer-box-3">
      <!-- <span>©2017 xx集团有限公司 版权所有 京ICP证xxxxxxxxxxx</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  data () {
    return {
    }
  },
  methods: {
    goRegister() {
      this.$router.push({ path: '/login', query: { type: 'register' }});
    },
    goHelp() {
      this.$router.push({path: '/about'});
    },
    showWaring() {
      // this.$message({
      //     showClose: true,
      //     message: '该功能暂未开放',
      //     type: 'warning'
      // });
       const routerJump = this.$router.resolve("/AdminLogin");
      window.open(routerJump.href, '_blank')
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-box-1 {
  margin: 0 183px;
  padding: 50px;
  border-bottom: 2px solid #e8e8e8;
}
.footer-box-2 {
  padding: 30px 183px;
  display: flex;
  justify-content: space-around;
}
.footer-box-2 button {
  display: block;
}
.footer-box-2 /deep/ .el-button+.el-button {
  margin-left: 0px;
}
.footer-box-3 {
  text-align: center;
  padding-bottom: 40px;
}
.footer-box-1, .footer-box-help {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.footer-img {
  margin-right: 8px;
}
.footer-text {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  flex-wrap: nowrap;
}
.footer-text :first-child {
  font-size: 16px;
  color: #409EFF;
  font-weight: 700;
}
.footer-text :not(first-child) {
  font-size: 14px;
}
</style>
