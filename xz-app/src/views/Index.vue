<template>
  <div class="index">
    <!-- 首页轮播图 -->
    <el-carousel :interval="2000" arrow="hover" height="400px" class="carousel">
      <el-carousel-item>
        <img src="../assets/images/carousel/hw.webp" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/carousel/hs.webp" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/carousel/lx2.webp" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/images/carousel/xmi.webp" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 楼层展示 1楼标题 -->
    <el-row type="flex">
      <el-col :span="24">
        <p class="first-floor"><i class="el-icon-s-platform"></i>办公电脑/1F</p>
      </el-col>
    </el-row>
    <!-- 一楼内容 -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="select-card">
          <div slot="header">
            <span><i class="el-icon-s-platform"></i>办公电脑</span>
          </div>
          <div class="select-brand">
            <p>品牌</p>
            <el-button
              type="text"
              @click="getComputerData(item.computer_name)"
              v-for="(item, i) of computers"
              :key="i"
              >{{ item.computer_name }}</el-button
            >
          </div>
          <!-- <div class="select-configure">
          <p>参数</p>
          <el-button type="text" v-for="s of 8" :key="s">独立显卡</el-button>
        </div> -->
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item, i) in computer" :key="i">
            <el-card
              :body-style="{ padding: '0px' }"
              :shadow="'hover'"
              class="el-cards"
            >
              <div @click="showDetails(item)">
                <div class="card-image">
                  <img
                    :src="item.computers_img"
                  />
                </div>
                <div class="card-detail">
                  <span>{{ item.computer_name + item.classification }}</span>
                </div>
                <div class="card-price">
                  <span>￥{{ item.price }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 二楼标题 -->
    <!-- <el-row type="flex">
      <el-col :span="24">
        <p class="second-floor"><i class="el-icon-cpu"></i>电脑配件/2F</p>
      </el-col>
    </el-row> -->
    <!-- 二楼内容 -->
    <!-- <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="select-card card2">
          <div slot="header">
            <span><i class="el-icon-cpu"></i>电脑配件</span>
          </div>
          <div class="select-brand">
            <p>品牌</p>
            <el-button type="text" v-for="(parts, i) of parts" :key="i">{{
              parts.parts_name
            }}</el-button>
          </div>
          <div class="select-configure">
          <p>配件</p>
          <el-button type="text" v-for="s of 8" :key="s">cpu</el-button>
        </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="6" v-for="j in 8" :key="j">
            <el-card
              :body-style="{ padding: '0px' }"
              :shadow="'hover'"
              class="el-cards"
            >
              <div class="card-image">
                <el-image
                  :src="require('../assets/images/computers/computer.png')"
                ></el-image>
              </div>
              <div class="card-detail">
                <span>超轻薄笔记本电脑 微边框笔记本电脑</span>
              </div>
              <div class="card-price">
                <span>￥4999.00</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row> -->
    <!-- 三楼标题 -->
    <!-- <el-row type="flex">
      <el-col :span="24">
        <p class="three-floor"><i class="el-icon-mouse"></i>外设/游戏/3F</p>
      </el-col>
    </el-row> -->
    <!-- 三楼内容 -->
    <!-- <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="select-card card3">
          <div slot="header">
            <span><i class="el-icon-mouse"></i>外设/游戏</span>
          </div>
          <div class="select-brand">
          <p>品牌</p>
          <el-button type="text" v-for="(peripheral, i) of peripheral" :key="i">{{ peripheral.peripheral_name }}</el-button>
        </div>
          <div class="select-configure">
            <p>种类</p>
            <el-button type="text" v-for="s of 8" :key="s">键盘</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="10">
          <el-col :span="6" v-for="j in 8" :key="j">
            <el-card
              :body-style="{ padding: '0px' }"
              :shadow="'hover'"
              class="el-cards"
            >
              <div class="card-image">
                <el-image
                  :src="require('../assets/images/computers/computer.png')"
                ></el-image>
              </div>
              <div class="card-detail">
                <span>超轻薄笔记本电脑 微边框笔记本电脑</span>
              </div>
              <div class="card-price">
                <span>￥4999.00</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      computers: [],
      parts: [],
      peripheral: [],
      computer: []
    };
  },
  mounted() {
    this.getData();
    this.getComputerData("");
  },
  methods: {
    getData() {
      this.axios.get("/index/computers").then(res => {
        this.computers = res.data.message;
      });
      this.axios.get("/index/parts").then(res => {
        this.parts = res.data.message;
      });
      this.axios.get("/index/peripheral").then(res => {
        this.peripheral = res.data.message;
      });
    },
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
