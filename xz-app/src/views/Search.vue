<template>
  <div class="index">
    <div v-if="computer.length > 0" class="content">
      <div :span="6" v-for="(item, i) in computer" :key="i" class="box">
        <el-card
          :body-style="{ padding: '0px' }"
          :shadow="'hover'"
          class="el-cards"
        >
          <div @click="showDetails(item)">
            <div class="card-image">
              <img :src="item.computers_img" />
            </div>
            <div class="card-detail">
              <span>{{ item.computer_name + item.classification }}</span>
            </div>
            <div class="card-price">
              <span>￥{{ item.price }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else>
      <el-empty description="没有符合您搜索的商品"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      computer: []
    };
  },
  mounted() {
    this.getComputerData(this.$store.state.searchText);
  },
  watch: {
    "$store.state.searchText": function(val) {
      this.getComputerData(val);
    }
  },
  methods: {
    getComputerData(name) {
      this.axios.post("/index/computer", { name: name }).then(res => {
        this.computer = res.data.message;
      });
    },
    showDetails(item) {
      this.$router.push({
        path: "/details",
        query: { details: JSON.stringify(item) }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.content {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 220px;
  margin: 5px;
}
.carousel img {
  width: 100%;
}
.first-floor,
.second-floor,
.three-floor {
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #e8e8e8;
}
.first-floor {
  color: #409eff;
}
.second-floor {
  color: #d67989;
}
.three-floor {
  color: #67c23a;
}
.select-card /deep/ .el-card__header {
  padding: 8px;
  color: #fff;
  background-color: #409eff;
  font-size: 14px;
}
.select-card /deep/ .el-button--text {
  color: #409eff;
  margin-right: 10px;
}
.select-card /deep/ .el-button + .el-button {
  margin: 0px;
  margin-right: 10px;
}
.card2 /deep/ .el-card__header {
  background-color: #d67989;
}
.card2 /deep/ .el-button--text {
  color: #d67989;
}
.card3 /deep/ .el-card__header {
  background-color: #67c23a;
}
.card3 /deep/ .el-button--text {
  color: #67c23a;
}
.select-card {
  height: 470px;
}
.select-brand {
  height: 50%;
}
.select-configure {
  height: 50%;
}
.select-brand p,
.select-configure p {
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  font-size: 15px;
  font-weight: 700;
}
.el-cards {
  cursor: pointer;
  margin-bottom: 10px;
  height: 230px;
}
.card-image {
  padding: 5px;
}
.card-image img {
  width: 100%;
  height: 136px;
}
.card-detail {
  padding: 0 18px;
  color: #333;
  font-size: 14px;
}
.card-price {
  color: #ff0036;
  text-align: center;
  margin: 10px auto;
  font-size: 18px;
}
</style>
