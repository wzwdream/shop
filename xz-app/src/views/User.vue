<template>
  <div class="user-content">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu
          :default-active="defaultActive"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <!-- <el-submenu index="order">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>我的订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="orderTotal">全部订单</el-menu-item>
              <el-menu-item index="orderPaid">待付款</el-menu-item>
              <el-menu-item index="orderReceived">待收货</el-menu-item>
              <el-menu-item index="orderEvaluate">待评价</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="coupon">
            <i class="el-icon-s-ticket"></i>
            <span slot="title">我的优惠券</span>
          </el-menu-item> -->
          <el-menu-item index="address">
            <i class="el-icon-location"></i>
            <span slot="title">我的地址</span>
          </el-menu-item>
          <el-menu-item index="userInfo">
            <i class="el-icon-user-solid"></i>
            <span slot="title">我的信息</span>
          </el-menu-item>
          <!-- <el-menu-item index="userSecurity">安全管理</el-menu-item> -->
          <!-- <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-col>
      <el-col :span="20">
        <!-- <my-coupon v-if="defaultActive === 'coupon'"></my-coupon> -->
        <my-address v-if="defaultActive === 'address'"></my-address>
        <MyUser v-if="defaultActive === 'userInfo'" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src
// import MyCoupon from "../components/MyCoupon.vue";
import MyAddress from "../components/MyAddress.vue";
import MyUser from "../components/MyUser.vue";

export default {
  name: "User",
  components: {
    // MyCoupon,
    MyAddress,
    MyUser
  },
  data() {
    return {
      defaultActive: "address",
      shopArr: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.defaultActive = key;
      // this.keyPath = keyPath;
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.user-content {
  margin-top: 20px;
}
.user-content /deep/ .el-submenu .el-menu-item {
  min-width: 100px;
}
</style>
