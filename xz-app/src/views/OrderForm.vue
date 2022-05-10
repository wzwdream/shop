<template>
  <div class="order-form">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div class="orderform-header" v-if="shopArr.length > 0">
        <span>商品信息</span>
        <span>单价（元）</span>
        <span>数量</span>
        <span>售后</span>
        <span>实付款</span>
        <span>交易状态</span>
        <span>操作</span>
      </div>
      <el-tab-pane label="全部订单" name="00">
        <my-order-form
          typeID="00"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="01">
        <my-order-form
          typeID="01"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="02">
        <my-order-form
          typeID="02"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="03">
        <my-order-form
          typeID="03"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="04">
        <my-order-form
          typeID="04"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
      <el-tab-pane label="已完成订单" name="05">
        <my-order-form
          typeID="05"
          :shopArr="shopArr"
          @back="getData(activeName)"
        ></my-order-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import MyOrderForm from "../components/MyOrderForm";
export default {
  components: { MyOrderForm },
  name: "OrderForm",
  data() {
    return {
      activeName: "00",
      shopArr: []
    };
  },
  created() {
    this.getData(this.activeName);
  },
  methods: {
    //  01-未付款-02-待发货-03-待收货-04-待评价-05-完成订单-06-订单取消
    handleClick(event) {
      this.getData(event.paneName);
    },
    getData(type) {
      const params = {
        user_id: sessionStorage.getItem("userid"),
        order_type: type
      };
      this.axios.post("/index/getOrderAll", params).then(res => {
        console.log(res);
        this.shopArr = res.data.message;
      });
    }
  }
};
</script>
<style scoped>
.orderform-header {
  height: 40px;
  line-height: 40px;
  background: #e8e8e8;
  font-size: 14px;
  border-radius: 4px;
}
.orderform-header span {
  display: inline-block;
  width: 10%;
  text-align: center;
}
.orderform-header span:nth-child(1) {
  width: 40%;
}
.orderform-header span:nth-child(3) {
  width: 5%;
}
.orderform-header span:nth-child(7) {
  width: 15%;
}
</style>
