<template>
  <div class="shop-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="shop-card" v-if="computer_car.length > 0">
      <div class="shop-card-show">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <span style="width: 30%">商品信息</span>
        <span style="width: 15%">单价</span>
        <span style="width: 15%">数量</span>
        <span style="width: 15%">金额</span>
        <span style="width: 10%">操作</span>
      </div>
      <div class="shop-card-box">
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-card shadow="hover" v-for="(item, i) in computer_car" :key="i">
            <el-checkbox :label="item.computer_id">{{
              item.computer_name + item.classification
            }}</el-checkbox>
            <div class="shop-card-detils">
              <div class="shop-card-img" @click="goDetails(item)">
                <img
                  :src="item.computers_img"
                />
              </div>
              <div class="shop-card-type">
                <p>颜色：{{ item.color }}</p>
                <p>规格：{{ item.hard_disk + " " + item.size }}</p>
              </div>
              <div class="shop-card-price">
                <span>￥ {{ item.price }}</span>
              </div>
              <div class="shop-card-num">
                <el-input-number
                  size="mini"
                  v-model="item.amount"
                ></el-input-number>
              </div>
              <div class="shop-card-total">
                <span>{{ item.price * item.amount }}</span>
              </div>
              <div class="shop-card-btns">
                <el-button type="text" @click.stop="shopDelete(item.car_id)"
                  >删除</el-button
                >
                <el-button type="text" @click.stop="addFacorites(item)"
                  >移入收藏夹</el-button
                >
              </div>
            </div>
          </el-card>
        </el-checkbox-group>
      </div>
      <div class="shop-settlement">
        <el-checkbox
          style="width: 10%; margin-top: 9px"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div class="shop-operation">
          <el-button type="text" @click.stop="shopAllDelete()">删除</el-button>
          <!-- <el-button type="text">移入收藏夹</el-button> -->
        </div>
        <span style="display: block; width: 14%; margin-top: 11px; color: red"
          >合计：{{ total }}</span
        >
        <el-button type="primary" size="medium" @click.stop="seetlement"
          >结 算</el-button
        >
      </div>
    </div>
    <div v-if="computer_car.length == 0">
      <div class="shop-car-empty">
        <img src="../assets/images/icon/shopCar.jpg" alt="" />
        <p>购物车竟然是空的</p>
        <p>再忙，也要记得买点什么犒劳自己-</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "ShopCar",
  data() {
    return {
      userId: "",
      checkAll: false,
      checkedCities: [],
      activeShop: [],
      isIndeterminate: true,
      num: 1,
      price: 5698.08,
      computer_car: []
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
      this.checkAll = val;
      if (val) {
        this.computer_car.forEach(item => {
          this.activeShop.push(item.computer_id);
          this.checkedCities.push(item.computer_id);
        });
      } else {
        this.checkedCities = [];
        this.activeShop = [];
      }
    },
    handleCheckedCitiesChange(value) {
      this.activeShop = value;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.computer_car.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.computer_car.length;
    },
    shopDelete(cid) {
      for (let i = 0; i < this.computer_car.length; i++) {
        if (this.computer_car[i].computer_id == cid) {
          this.computer_car.splice(i, 1);
        }
      }
      this.deleteShop(cid, "02");
    },
    deleteShop(cid, type) {
      this.axios.post("/index/deleteShop", { cid: cid }).then(res => {
        if (res.data.code) {
          this.getDAta();
          if (type === "02") {
            this.$message({
              message: "删除成功",
              type: "success",
              showClose: true,
              center: true
            });
          }
        }
      });
    },
    // 随机生成订单编号
    generateOrderNumber() {
      const now = new Date();
      let year = now.getFullYear().toString();
      let month = (now.getMonth() + 1).toString();
      let day = now.getDate().toString();
      let hour = now.getHours().toString();
      let minutes = now.getMinutes().toString();
      let seconds = now.getSeconds().toString();
      // 存放订单号
      let num = "";
      // N位随机数(加在时间戳后面)
      for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return year + month + day + hour + minutes + seconds + num;
    },
    shopAllDelete() {
      const shopCount = this.computer_car.length;
      const deleteCount = this.activeShop.length;
      if (deleteCount < 1) {
        this.$message({
          message: "未选择任何商品",
          type: "warning",
          showClose: true,
          center: true
        });
      }
      let shop = this.computer_car;
      for (let i = 0; i < shopCount; i++) {
        for (let j = 0; j < deleteCount; j++) {
          if (shop[i].computer_id == this.activeShop[j]) {
            this.deleteShop(shop[i].car_id, "02");
            shop.splice(i, 1);
          }
        }
      }
      this.computer_car = shop;
      this.activeShop = [];
    },
    seetlement() {
      const deleteCount = this.activeShop.length;
      if (deleteCount < 1) {
        this.$message({
          message: "未选择任何商品",
          type: "warning",
          showClose: true,
          center: true
        });
      } else {
        const orders_num = this.generateOrderNumber();
        const activeShops = [];
        for (let i = 0; i < this.activeShop.length; i++) {
          activeShops.push(this.computer_car[i]);
        }
        activeShops.forEach(item => {
          const params = {
            orders_num: orders_num,
            user_id: this.userId,
            computer_id: item.computer_id,
            total: item.price,
            amount: item.amount,
            order_date: new Date(),
            order_type: "01"
          };
          this.axios.post("/index/addOrder", params).then(() => {
            this.$router.push({
              path: "/order",
              query: { orders_num }
            });
          });
        });
      }
    },
    getDAta() {
      this.axios.post("/index/shop_car", { user_id: this.userId }).then(res => {
        this.computer_car = res.data.message;
      });
    },
    addFacorites(event) {
      console.log(event);
      const params = {
        user_id: event.user_id,
        computer_id: event.computer_id
      };
      this.axios.post("/index/addFavorites", params).then(res => {
        let code = res.data.code;
        if (code) {
          this.$message({
            message: "加入收藏夹成功",
            type: "success",
            showClose: true,
            center: true
          });
          this.deleteShop(event.car_id, "01");
        } else {
          this.$message({
            message: "该商品已经加入收藏夹，请勿重复添加",
            type: "warning",
            showClose: true,
            center: true
          });
        }
      });
    },
    goDetails(item) {
      this.$router.push({
        path: "/details",
        query: { details: JSON.stringify(item) }
      });
    }
  },
  create() {},
  beforeMount() {
    this.userId = this.$route.query.id;
  },
  mounted() {
    this.getDAta();
  },
  computed: {
    total: function() {
      let sum = 0;
      this.computer_car.forEach(item => {
        sum = sum + item.price * item.amount;
      });
      return sum;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop-content {
  margin-top: 20px;
}
.shop-card {
  margin-top: 20px;
  font-size: 14px;
}
.shop-card-show span {
  display: inline-block;
  text-align: center;
}
.shop-card-show {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 8px;
}
.shop-card-box /deep/ .el-card {
  margin-top: 12px;
}
.shop-card-box /deep/ .el-checkbox-group {
  font-size: 14px;
}
.shop-card-img img {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.shop-card-detils {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  line-height: 80px;
  height: 80px;
}
.shop-card-type p {
  margin: 0px;
  line-height: 40px;
}
.shop-card-btns {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
.shop-card-btns,
.shop-card-img {
  width: 10%;
}
.shop-card-total,
.shop-card-num,
.shop-card-price {
  width: 15%;
  text-align: center;
}
.shop-card-type {
  width: 25%;
}
.shop-settlement {
  margin-top: 12px;
  padding-top: 7px;
  border-top: 2px solid #e8e8e8;
  display: flex;
  justify-content: space-around;
}
.shop-operation {
  display: flex;
  width: 65%;
}
.shop-car-empty {
  width: 40%;
  margin: 20px auto;
  text-align: center;
  font-family: cursive;
  font-size: 16px;
}
.shop-car-empty img {
  width: 80%;
}
.shop-car-empty :nth-child(3) {
  font-size: 12px;
  color: #bdbaba;
}
</style>
