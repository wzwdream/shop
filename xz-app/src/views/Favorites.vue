<template>
  <div class="favorites-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>收藏夹</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="favorites-box" v-if="shopArr.length > 0">
      <el-card
        shadow="hover"
        v-for="item in shopArr"
        :key="item.id"
        class="facorites-card"
      >
        <span :label="item.id"
          >{{ item.computer_name + item.classification }}
        </span>
        <div>
          <div class="favorites-card-first">
            <div class="favorites-img" @click="goDetails(item)">
              <img
                :src="item.computers_img"
                alt=""
              />
            </div>
            <div class="favorites-details">
              <p>颜色：{{ item.color }}</p>
              <p>规格：{{ item.hard_disk + " " + item.size }}</p>
              <p>
                {{
                  item.computer_name +
                    " " +
                    item.cpu +
                    " " +
                    item.classification
                }}
              </p>
              <p>￥ {{ item.price }}</p>
              <el-button type="text" @click.stop="shopDelete(item.id, '02')"
                >移出收藏夹</el-button
              >
              <el-button type="text" @click.stop="addShopCar(item)"
                >加入购物车</el-button
              >
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div v-if="shopArr.length == 0">
      <div class="facorites-full">
        <img src="../assets/images/icon/shopCar.jpg" alt="" />
        <p>收藏夹是空的</p>
        <p>去看看自己喜欢的东西吧</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favorites",
  data() {
    return {
      shopArr: []
    };
  },
  methods: {
    shopDelete(id, type) {
      // console.log("delete", event);
      this.axios.post("/index/deleteFavorites", { id: id }).then(res => {
        console.log(res);
        if (type === "02") {
          this.$message({
            message: "移除收藏夹成功",
            type: "success",
            showClose: true,
            center: true
          });
        }
        this.favorites();
      });
    },
    addShopCar(event) {
      const prarms = {
        cid: event.computer_id,
        u_id: sessionStorage.getItem("userid"),
        ctype: event.ctype,
        amount: "1"
      };
      this.axios.post("/index/addShop_car", prarms).then(res => {
        let code = res.data.code;
        if (code) {
          this.$message({
            message: "加入购物车成功",
            type: "success",
            showClose: true,
            center: true
          });
          this.shopDelete(event.id, "01");
        } else {
          this.$message({
            message: "该商品已经加入购物车，请勿重复添加",
            type: "warning",
            showClose: true,
            center: true
          });
        }
      });
    },
    favorites() {
      this.axios
        .get(`/index/favorites?user_id=${sessionStorage.getItem("userid")}`)
        .then(res => {
          this.shopArr = res.data.message;
          console.log(res);
        });
    },
    goDetails(item) {
      this.$router.push({
        path: "/details",
        query: { details: JSON.stringify(item) }
      });
    }
  },
  mounted() {
    this.favorites();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.favorites-content {
  margin-top: 20px;
}
.favorites-box {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.facorites-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.facorites-card {
  width: 49%;
  margin-bottom: 10px;
}
.favorites-img {
  cursor: pointer;
  width: 40%;
}
.favorites-img img {
  width: 100%;
  margin-top: 10px;
}
.favorites-card-first {
  display: flex;
  font-size: 14px;
}
.favorites-details {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  width: 56%;
  margin-left: 4%;
}
.favorites-footer {
  display: flex;
}
.facorites-full {
  text-align: center;
}
.facorites-full img {
  width: 30%;
}
</style>
