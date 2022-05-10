<template>
  <div>
    <div v-if="shopArr.length > 0">
      <div
        class="orderform-content"
        v-for="(item, index) in shopArr"
        :key="index"
      >
        <div class="orderform-content-header">
          <span>订单编号：</span>
          <span>{{ item.orders_num }}</span>
          <span>成交时间：</span>
          <span>{{ item.order_date }}</span>
        </div>
        <div class="orderform-box">
          <div>
            <img
              :src="item.computers_img"
              alt=""
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
            <p>￥{{ item.price * item.amount }}</p>
          </div>
          <div>
            退款/退货 <br />
            我要维权
          </div>
          <div>
            <p>
              {{ orderTypes.find(elem => elem.code === item.order_type).name }}
            </p>
            <!-- //  01-未付款-02-待发货-03-待收货-04-待评价-05-完成订单 -->
            <el-button type="text" @click="orerDetails(item.orders_num)"
              >订单详情</el-button
            >
            <el-button v-if="item.order_type === '03'" type="text">
              查看物流
            </el-button>
          </div>
          <div>
            <el-button
              v-if="item.order_type === '01'"
              type="primary"
              @click="payMony(item.orders_num)"
              >去付款</el-button
            >
            <el-button v-else-if="item.order_type === '02'" type="primary"
              >提醒发货</el-button
            >
            <el-button
              v-else-if="item.order_type === '03'"
              @click="receipt(item)"
              type="primary"
              >确认收货</el-button
            >
            <el-button
              v-else-if="item.order_type === '04'"
              @click="toEvaluate(item)"
              type="primary"
              >去评价</el-button
            >
            <el-button v-else type="primary">已完成</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="shopArr.length == 0">
      <div class="order-empty">
        <img src="../assets/images/icon/order.png" alt="" />
        <p>您还没有相关的订单</p>
        <p>可以去看看有哪些想买的</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrderForm",
  props: {
    typeID: {
      default: ""
    },
    shopArr: {
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: "/",
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
        },
        {
          code: "06",
          name: "订单取消"
        }
      ]
    };
  },
  methods: {
    orerDetails(event) {
      //   console.log(event);
      this.$router.push({
        path: "/orderDetails",
        query: { orders_num: event }
      });
    },
    payMony(orders_num) {
      this.$router.push({
        path: "/order",
        query: { orders_num }
      });
    },
    receipt(data) {
      this.$confirm("是否确认收到商品，请仔细查看商品是否正常", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmas = {
            orders_num: data.orders_num,
            computer_id: data.computer_id,
            total: data.total,
            order_type: "04",
            pay_date: new Date(),
            add_id: this.radio
          };
          this.axios.post("/index/opdateOrderStatus", parmas).then(() => {
            this.$emit("back");
          });
        })
        .catch(() => {});
    },
    toEvaluate(data) {
      this.$router.push({
        path: "/evaluate",
        query: {
          orderData: JSON.stringify(data)
        }
      });
    }
  },
  created() {}
};
</script>
<style scoped>
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
.orderform-box > div {
  width: 10%;
  text-align: center;
  border-right: 1px solid #e8e8e8;
}
.orderform-box p {
  margin: 0;
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
.orderform-box > div:nth-child(4),
.orderform-box > div:nth-child(5) {
  line-height: 100px;
}
.orderform-box > div:nth-child(3) {
  width: 5%;
  line-height: 100px;
}
.orderform-box > div:nth-child(6) {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.orderform-box > div:nth-child(6) .el-button {
  margin: 0;
  padding: 0;
}
.orderform-box > div:nth-child(7) {
  width: 15%;
  border: none;
  line-height: 100px;
}
.order-empty {
  text-align: center;
  margin: 20px auto;
  font-family: cursive;
  font-size: 16px;
}
.order-empty :nth-child(3) {
  font-size: 12px;
  color: #bdbaba;
}
</style>
