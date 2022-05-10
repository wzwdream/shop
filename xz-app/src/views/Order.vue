<template>
  <div class="order">
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="确认订单信息"></el-step>
      <el-step title="支付订单"></el-step>
      <el-step title="支付完成"></el-step>
    </el-steps>
    <div v-if="active == 0" class="order-add">
      <div class="address-header">
        <span>收货人信息</span>
        <el-button type="text" @click="openAdd">新增收货地址</el-button>
        <my-add
          :dialogVisible="dialogVisible"
          :addressDetails="addressDetails"
          @childChecked="childChecked"
        ></my-add>
      </div>
      <el-radio-group v-model="radio">
        <el-radio
          :label="userInfo.add_id"
          v-for="(userInfo, i) in userInfos"
          :key="i"
        >
          <span
            ><i class="el-icon-s-custom"></i> 收货人：{{
              userInfo.userName
            }}</span
          >
          <span
            ><i class="el-icon-location"></i> 地址：{{
              userInfo.addreses
            }}</span
          >
          <span
            ><i class="el-icon-phone"></i> 联系方式：{{ userInfo.phone }}</span
          >
          <span
            ><i class="el-icon-phone"></i> 邮政编码: {{ userInfo.email }}</span
          >
          <span
            ><i class="el-icon-phone"></i> 地址描述:
            {{ userInfo.addName }}</span
          >
          <span>默认地址</span>
        </el-radio>
      </el-radio-group>
      <div class="address-header shop-details">
        <span>确认商品信息</span>
      </div>
      <div>
        <div class="shop-header">
          <p>商品信息</p>
          <p>单价（元）</p>
          <p>数量</p>
          <p>金额（元）</p>
        </div>
        <el-card shadow="hover" v-for="shop in activeShops" :key="shop.car_id">
          <div class="order-shop-detils">
            <div class="order-shop">
              <img
                :src="shop.computers_img"
              />
              <div class="shop-card-type">
                <p>
                  {{
                    shop.computer_name +
                      " " +
                      shop.cpu +
                      " " +
                      shop.classification
                  }}
                </p>
                <p>颜色：{{ shop.color }}</p>
                <p>规格：{{ shop.hard_disk + " " + shop.size }}</p>
              </div>
            </div>
            <div class="orer-shop-price">
              <span>￥ {{ shop.price }}</span>
            </div>
            <div class="orer-shop-num">
              <span>{{ shop.amount }}</span>
            </div>
            <div class="orer-shop-total">
              <span>{{ shop.price * shop.amount }}</span>
            </div>
          </div>
        </el-card>
        <div class="shop-footer">
          <el-button type="text" @click="backShopCar()"
            ><i class="el-icon-d-arrow-left"></i>返回购物车</el-button
          >
          <div class="shop-footer-info">
            <span
              >已选<span>{{ activeShops.length }}</span
              >件商品</span
            >
            <span>合计（不含运费）：</span>
            <span>{{ total }}</span>
            <span>元</span>
            <el-button type="primary" size="medium" @click="pay"
              >确认并付款</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="active == 1">
      <div class="order-num">
        <span
          >支付金额：<span>￥{{ total }} </span></span
        >
        <span>支付订单：{{ orderNum }} 收款方：达内商城</span>
      </div>
      <el-card class="box-card">
        <div slot="header">
          <span>网上银行支付</span>
        </div>
        <el-radio-group v-model="banksRadio" class="banks">
          <el-radio :label="1"
            ><img src="../assets/images/banks/pay_img1.jpg" alt=""
          /></el-radio>
          <el-radio :label="2"
            ><img src="../assets/images/banks/pay_img2.jpg" alt=""
          /></el-radio>
          <el-radio :label="3"
            ><img src="../assets/images/banks/pay_img3.jpg" alt=""
          /></el-radio>
          <el-radio :label="4"
            ><img src="../assets/images/banks/pay_img4.jpg" alt=""
          /></el-radio>
          <el-radio :label="5"
            ><img src="../assets/images/banks/pay_img5.jpg" alt=""
          /></el-radio>
        </el-radio-group>
      </el-card>
      <div class="order-bottom">
        <div class="order-time">
          <!-- <span>剩余时间：</span>
          <span>15:00</span> -->
        </div>
        <el-button type="warning" size="small" @click="payMoney"
          >确认支付</el-button
        >
      </div>
    </div>
    <div v-if="active == 3">
      <div class="order-money">
        <h2>支付成功</h2>
        <div class="order-info">
          <span>支付订单:</span>
          <span>{{ orderNum }} </span>
          <span>支付金额：</span>
          <span>{{ total }}元</span>
        </div>
      </div>
      <div class="order-pay-sucess">
        <div class="order-sucess">
          <img src="../assets/images/icon/pay.png" alt="" />
          <div style="margin-left: 10px">
            <h1>支付成功</h1>
            <el-button type="text" @click="goOrder()">查看订单状态?</el-button>
            <el-button type="text" @click="orerDetails(orderNum)"
              >查看订单</el-button
            >
          </div>
        </div>
        <p>
          商城不会以系统异常、订单升级为由，要求你点击任何链接进行退款操作！
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import MyAdd from "../components/MyAdd.vue";
export default {
  name: "Order",
  components: { MyAdd },
  data() {
    return {
      active: 0,
      radio: 1,
      banksRadio: 1,
      userInfos: [],
      dialogVisible: false,
      addressDetails: {},
      activeShops: [],
      orderNum: ""
    };
  },
  created() {
    this.orderNum = this.$route.query.orders_num;
    this.getOrder(this.orderNum);
    // console.log(this.$route.query.orders_num);
    this.getAddress();
  },
  methods: {
    getOrder(orders_num) {
      this.axios.get(`/index/getOrder?orders_num=${orders_num}`).then(res => {
        this.activeShops = res.data.message;
      });
    },
    pay() {
      this.active = 1;
    },
    backShopCar() {
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
    payMoney() {
      console.log(this.activeShops);
      this.activeShops.forEach(item => {
        let parmas = {
          orders_num: item.orders_num,
          computer_id: item.computer_id,
          total: item.total,
          order_type: "02",
          pay_date: new Date(),
          add_id: this.radio
        };
        this.axios.post("/index/opdateOrderStatus", parmas).then(() => {
          this.active = 3;
        });
      });
    },
    childChecked(event) {
      if (event.type === "close") return (this.dialogVisible = false);
      let parmas = {
        user_id: sessionStorage.getItem("userid"),
        userName: event.consignee,
        addreses: event.areaModel + event.address,
        phone: event.phone,
        email: event.email,
        addName: event.addressName
      };
      this.axios.post("/index/addAddress", parmas).then(() => {
        let parmas = {
          user_id: sessionStorage.getItem("userid")
        };
        this.axios.post("/index/address", parmas).then(res => {
          this.$nextTick(() => {
            this.userInfos = res.data.message;
            this.dialogVisible = false;
          });
        });
      });
    },
    openAdd() {
      this.dialogVisible = true;
    },
    orerDetails(event) {
      //   console.log(event);
      this.$router.push({ path: "/orderDetails", query: { orderNum: event } });
    },
    goOrder() {
      this.$router.push({
        path: "/orderForm"
      });
    },
    getAddress() {
      let parmas = {
        user_id: sessionStorage.getItem("userid")
      };
      this.axios.post("/index/address", parmas).then(res => {
        this.userInfos = res.data.message;
      });
    }
  },
  computed: {
    total: function() {
      let that = this;
      let sum = 0;
      that.activeShops.forEach(element => {
        sum += element.price * element.amount;
      });
      return sum;
    }
  }
};
</script>
<style scoped>
.order /deep/ .el-steps--simple {
  background: #e8e8e8;
  margin: 10px 0;
}
.address-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
}
.address-header span:first-child {
  font-size: 20px;
  font-weight: 700;
}
.order-add /deep/ .el-radio {
  height: 45px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #e8e8e8;
  line-height: 45px;
  margin: 10px 0;
  font-size: 16px;
}
.order-add /deep/ .el-radio__input {
  margin-left: 15px;
}
.el-radio__label span:not(:first-child) {
  margin-left: 30px;
}
.shop-details {
  margin-top: 15px;
  padding-bottom: 10px;
}
.shop-header,
.shop-footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #e8e8e8;
  display: flex;
  font-size: 14px;
}
.shop-header p {
  margin: 0;
}
.shop-header :nth-child(1),
.order-shop {
  width: 45%;
}
.shop-header :nth-child(2),
.shop-header :nth-child(4),
.orer-shop-price,
.orer-shop-total {
  width: 20%;
}
.shop-header :nth-child(3),
.orer-shop-num {
  width: 15%;
}
.order-shop-detils {
  display: flex;
}
.order-shop {
  display: flex;
  border-right: 1px solid #e8e8e8;
}
.order-shop img {
  width: 70px;
  height: 70px;
}
.order-shop p {
  width: 90%;
  margin: 0;
  margin-left: 4%;
}
.order-shop p:not(:last-child) {
  margin-bottom: 5px;
}
.orer-shop-price,
.orer-shop-num,
.orer-shop-total {
  text-align: center;
  font-size: 16px;
  border-right: 1px solid #e8e8e8;
  line-height: 66px;
}
.orer-shop-total {
  border: none;
}
.shop-footer {
  display: flex;
  justify-content: space-between;
}
.shop-footer-info span:first-child,
.shop-footer-info span:nth-child(4) {
  margin-right: 20px;
}
.shop-footer-info span:nth-child(1) span,
.shop-footer-info span:nth-child(3) {
  font-size: 18px;
  color: #409eff;
  margin: 0 2px;
}
.banks img {
  vertical-align: middle;
  text-align: center;
}
.box-card /deep/ .el-card__header {
  padding: 8px 20px;
  background: #e8e8e8;
}
.order-num {
  display: flex;
  justify-content: space-between;
  margin: 10px 8px;
}
.order-num span span {
  color: #409eff;
}
.order-bottom {
  padding: 10px 8px;
  background: #e8e8e8;
  display: flex;
  justify-content: space-between;
}
.order-time {
  line-height: 32px;
}
.order-time :last-child {
  color: #409eff;
}
.order-money {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
}
.order-info {
  line-height: 52px;
}
.order-info :nth-child(2) {
  margin-right: 10px;
}
.order-info :nth-child(4) {
  color: #409eff;
  font-size: 18px;
}
.order-pay-sucess {
  margin: 100px;
}
.order-pay-sucess p {
  text-align: center;
}
.order-sucess {
  display: flex;
  justify-content: center;
}
.order-sucess h1 {
  font-size: 34px;
  color: #409eff;
  margin: 0;
  margin-top: 40px;
}
</style>
