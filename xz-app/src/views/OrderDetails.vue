<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px 0">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card v-if="orderData" shadow="never" class="box-card">
      <div slot="header">
        <span>订单编号：{{ orders_num }}</span>
        <span style="margin-left: 20px"
          >当前订单状态：{{
            orderTypes.find(elem => elem.code === orderData[0].order_type).name
          }}</span
        >
      </div>
      <div class="card-img">
        <div>
          <img src="../assets/images/icon/order-emit1.png" alt="" />
          <div class="card-img-details">
            <p>提交订单</p>
            <p>日期：{{ orderData[0].order_date }}</p>
            <!-- <p>时间：17:30</p> -->
          </div>
        </div>
        <div>
          <img src="../assets/images/icon/order-more2.png" alt="" />
        </div>
        <div>
          <img src="../assets/images/icon/order-pay1.png" alt="" />
          <div class="card-img-details">
            <p>{{ orderData[0].order_type === "02" ? "已付款" : "待付款" }}</p>
            <p v-show="orderData[0].order_type === '02'">
              日期：{{ orderData[0].pay_date }}
            </p>
          </div>
        </div>
        <div>
          <img
            v-if="orderData[0].order_type === '02'"
            src="../assets/images/icon/order-more1.png"
            alt=""
          />
          <img
            v-if="
              orderData[0].order_type !== '02' &&
                orderData[0].order_type !== '01'
            "
            src="../assets/images/icon/order-more2.png"
            alt=""
          />
        </div>
        <div
          v-show="
            orderData[0].order_type === '03' || orderData[0].order_type === '04'
          "
        >
          <img src="../assets/images/icon/order-transport1.png" alt="" />
          <div class="card-img-details">
            <p>运输中</p>
            <!-- <p>日期：2020.12.12</p> -->
            <!-- <p>时间：17:30</p> -->
          </div>
        </div>
        <div>
          <img
            v-if="orderData[0].order_type === '03'"
            src="../assets/images/icon/order-more1.png"
            alt=""
          />
          <img
            v-show="orderData[0].order_type === '04'"
            src="../assets/images/icon/order-more2.png"
            alt=""
          />
        </div>
        <div v-show="orderData[0].order_type === '04'">
          <img src="../assets/images/icon/order-rece1.png" alt="" />
          <div class="card-img-details">
            <p>已收货</p>
            <!-- <p>日期：2020.12.12</p>
            <p>时间：17:30</p> -->
          </div>
        </div>
        <!-- <div>
          <img src="../assets/images/icon/order-more1.png" alt="" />
        </div>
        <div>
          <img src="../assets/images/icon/order-evaluate1.png" alt="" />
          <div class="card-img-details">
            <p>待评价</p>
            <p>日期：2020.12.12</p>
            <p>时间：17:30</p>
          </div>
        </div> -->
      </div>
      <div v-if="addressData" class="card-rece">
        <p>收货信息</p>
        <div>
          <span>收货人：{{ addressData.userName }}</span>
          <span>联系电话：{{ addressData.phone }}</span>
        </div>
        <span>收货地址：{{ addressData.addreses }}</span>
      </div>
      <!-- <div class="card-logistics">
        <p>订单物流信息</p>
        <p>发货时间：2020年10月22日17：30</p>
        <p>物流公司：顺丰公司</p>
        <p>快递单号：301111303203048</p>
        <div class="logistics-details">
          <p>物流信息：</p>
          <div>
            <p v-for="i of 4" :key="i">
              2016.11.11 12:11 您的快递在【北京马驹桥镇分拣中心】分拣完毕
            </p>
          </div>
        </div>
      </div> -->
      <div class="card-commodity">
        <p>商品信息</p>
        <div class="orderform-content" v-for="item in orderData" :key="item.id">
          <div class="orderform-content-header">
            <span>订单编号：</span>
            <span>{{ item.orders_num }}</span>
            <span>成交时间：</span>
            <span>{{ item.pay_date }}</span>
          </div>
          <div class="orderform-box">
            <div>
              <img
                :src="item.computers_img"
              />
              <div>
                <p>{{ item.computer_name + item.classification }}</p>
                <p>颜色：{{ item.color }}</p>
              </div>
            </div>
            <div>
              <p>￥{{ item.price }}</p>
            </div>
            <div>
              <p>{{ item.amount }}件</p>
            </div>
            <div>
              <p>￥{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "OrderDetails",
  data() {
    return {
      orders_num: "",
      orderData: null,
      addressData: null,
      orderTypes: [
        {
          code: "01",
          name: "未付款"
        },
        {
          code: "02",
          name: "待发货"
        },
        {
          code: "03",
          name: "待收货"
        },
        {
          code: "04",
          name: "待评价"
        },
        {
          code: "05",
          name: "完成订单"
        }
      ]
    };
  },
  created() {
    this.orders_num = this.$route.query.orders_num;
    this.axios
      .get(`/index/getOrder?orders_num=${this.orders_num}`)
      .then(res => {
        this.orderData = res.data.message;
        this.axios
          .get(`/index/getAddress?add_id=${res.data.message[0].add_id}`)
          .then(res => {
            this.addressData = res.data.message[0];
          });
      });
  }
};
</script>
<style scoped>
.box-card /deep/ .el-card__header {
  background: #e8e8e8;
  padding: 10px;
}
.box-card /deep/ .el-card__body {
  background: #f5f5f5;
}
.card-img {
  display: flex;
  justify-content: center;
  text-align: center;
}
.card-img > div:nth-child(2n) {
  width: 8%;
  margin-top: 30px;
}
.card-img > div:nth-child(2n-1) {
  width: 11%;
}
.card-img-details p {
  margin: 0;
  margin-top: 5px;
}
.card-rece {
  margin-top: 10px;
}
.card-rece > p,
.card-logistics > p:first-child,
.card-commodity > p:first-child {
  padding-bottom: 5px;
  border-bottom: 2px solid #e8e8e8;
  font-size: 16px;
  font-weight: 800;
}
.card-rece span {
  font-size: 14px;
}
.card-rece > div > span:first-child {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
}
.card-logistics {
  font-size: 14px;
}
.logistics-details {
  display: flex;
}
.logistics-details > p {
  margin: 0;
}
.orderform-content-header {
  height: 28px;
  line-height: 28px;
  background-color: #e8e8e8;
  margin-top: 10px;
}
.orderform-content-header :nth-child(2n-1) {
  margin-left: 15px;
}
.orderform-box {
  display: flex;
  flex-wrap: nowrap;
  height: 100px;
  background-color: #ffffff;
}
.orderform-box div {
  text-align: center;
}
.orderform-box p {
  margin: 0;
}
.orderform-box > div:not(:last-child) {
  border-right: 2px solid #e8e8e8;
}
.orderform-box > div:nth-child(1) {
  display: flex;
  flex-wrap: nowrap;
  text-align: start;
  width: 40%;
}
.orderform-box > div:nth-child(1) img {
  width: 80px;
  height: 80px;
  margin: 10px;
}
.orderform-box > div:nth-child(1) p {
  margin-top: 15px;
}
.orderform-box > div:nth-child(2),
.orderform-box > div:nth-child(4) {
  line-height: 100px;
  width: 20%;
}
.orderform-box > div:nth-child(3) {
  width: 10%;
  line-height: 100px;
}
</style>
