<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header class="admin-header">
      <div style="display: flex;align-items: center;">
        <img
          style="width: 40px;border-radius: 50%;margin-right: 10px;"
          src="../../assets/images/logo.jpeg"
          alt=""
        />
        <span>学子商城后台系统</span>
      </div>
      <el-popover placement="bottom" width="100" v-model="visible">
        <div class="popover-box">
          <el-button type="text" @click="logout"
            ><i class="el-icon-switch-button"></i> 退出登录</el-button
          >
        </div>
        <div class="user" slot="reference">
          <el-avatar :src="userAvartar" size="small"></el-avatar>
          <span>{{ userName }}</span>
        </div>
      </el-popover>
    </el-header>
    <el-container style="height: calc(100% - 60px)">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="$route.path" router style="height: 100%">
          <el-menu-item index="/admin"
            ><i class="el-icon-house"></i>首页</el-menu-item
          >
          <el-menu-item index="/admin/OrderMenage"
            ><i class="el-icon-tickets"></i>订单管理</el-menu-item
          >
          <el-menu-item index="/admin/UserManage"
            ><i class="el-icon-user"></i>用户管理</el-menu-item
          >
          <el-menu-item index="/admin/EvaluateMenage"
            ><i class="el-icon-edit"></i>评价管理</el-menu-item
          >
          <el-menu-item index="/admin/CommodityMenage"
            ><i class="el-icon-goods"></i>商品管理</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      userAvartar: JSON.parse(sessionStorage.getItem("adminUserInfo"))
        .user_avartar,
      userName: JSON.parse(sessionStorage.getItem("adminUserInfo")).username,
      visible: false
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("adminUserInfo");
      this.visible = false;
      this.$router.replace("/AdminLogin");
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  background: #a8c0da;
}
.user {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
}
.user > span {
  font-size: 14px;
  margin-left: 12px;
}
</style>
