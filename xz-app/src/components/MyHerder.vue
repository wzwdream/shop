<template>
  <div class="header-box">
    <el-row type="flex" class="row-bg" justify="space-around">
      <!-- logo -->
      <el-col :span="4">
        <div class="logo">
          <img src="../assets/images/logo.jpeg" alt="" />
        </div>
      </el-col>
      <!-- search -->
      <el-col :span="11">
        <div class="search-content">
          <el-input
            placeholder="请输入搜索的内容"
            v-model="searchText"
            class="input-with-select"
            prefix-icon="el-icon-search"
            clearable
          >
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </el-col>
      <!-- 右侧信息栏 -->
      <el-col :span="5">
        <div class="user-box">
          <el-button
            type="text"
            icon="el-icon-star-on"
            title="收藏"
            class="user-box-icon"
            @click="goFavorites()"
          ></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            icon="el-icon-s-order"
            title="我的订单"
            class="user-box-icon"
            @click="goOrderForm()"
          ></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            icon="el-icon-shopping-cart-full"
            title="购物车"
            class="user-box-icon"
            @click="goShopCar()"
          ></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" class="user-box-text" @click="goHelp()"
            >帮助</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            type="text"
            class="user-box-text"
            v-if="!isLogin"
            @click="goLogin()"
            >登录</el-button
          >
          <el-popover placement="bottom" width="100" v-model="visible">
            <div class="popover-box">
              <el-button type="text" @click="goUser"
                ><i class="el-icon-user-solid"></i> 个人中心</el-button
              >
              <el-button type="text" @click="logout"
                ><i class="el-icon-switch-button"></i> 退出登录</el-button
              >
            </div>
            <el-button
              type="text"
              @click="userInfo = true"
              v-if="isLogin"
              slot="reference"
            >
              <el-avatar :src="userAvartar" size="small"></el-avatar>
            </el-button>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  props: ["userid"],
  data() {
    return {
      activeIndex: "/",
      searchText: "",
      userInfo: false,
      visible: false,
      userId: this.userid,
      userAvartar: undefined
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
      this.$store.commit("changeSearch", this.searchText);
      console.log(this.$route.path === "/search");
      this.$route.path !== "/search" && this.$router.push("/search");
    },
    goShopCar() {
      const u_id = sessionStorage.getItem("userid");
      if (u_id) {
        this.$router.push({ path: "/shopCar", query: { id: u_id } });
      } else {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "还未登录，请先登录",
          type: "error",
          showClose: true,
          center: true
        });
      }
    },
    goOrderForm() {
      this.$router.push({ path: "/orderForm" });
    },
    logout() {
      sessionStorage.removeItem("userid");
      this.userId = null;
      this.visible = false;
    },
    goUser() {
      this.$router.push({ path: "/user" });
      this.visible = false;
    },
    goHelp() {
      this.$router.push({ path: "/about" });
    },
    goLogin() {
      this.$router.push({ path: "/login", query: { type: "login" } });
    },
    goFavorites() {
      this.$router.push({ path: "/favorites" });
    }
  },
  mounted() {
    this.userAvartar = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).user_avartar;
  },
  computed: {
    isLogin() {
      return this.userId == null ? false : true;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-box {
  margin: 30px 0;
}
.header-box /deep/ .el-col-5 {
  text-align: right;
}
.header-box /deep/ .el-col-4 {
  text-align: left;
}
.logo img {
  width: 30px;
}
.search-content {
  width: 100%;
}
.user-box .user-box-icon {
  font-size: 20px;
  color: #dcdfe6;
}
.user-box .user-box-text {
  text-decoration: none;
  font-size: 16px;
  color: #dcdfe6;
}
.user-box /deep/ .el-divider--vertical {
  vertical-align: unset;
}
.user-box /deep/ .el-avatar {
  vertical-align: middle;
}
.popover-box {
  text-align: center;
  display: flex;
  flex-flow: column;
}
.popover-box /deep/ .el-button--text {
  margin: 0;
  font-size: 16px;
  color: black;
}
.popover-box /deep/ .el-button--text:focus,
.popover-box /deep/ .el-button--text:hover {
  color: #409eff;
}
</style>
