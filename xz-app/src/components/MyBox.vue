<template>
  <div class="computer">
    <div class="computers-logo">
      <div
        class="computer-logo"
        v-for="(computer, key, i) of types"
        :key="i"
        @click="getComputerData(key)"
      >
        <img :src="require(`../assets/images/brand/${computer}.png`)" alt="" />
        <span>{{ key }}</span>
      </div>
    </div>
    <div class="computers-content">
      <div class="computers-choice">
        <el-button-group>
          <el-button size="mini">综合 <i class="el-icon-bottom"></i></el-button>
          <el-button size="mini">人气 <i class="el-icon-bottom"></i></el-button>
          <el-button size="mini">销量 <i class="el-icon-bottom"></i></el-button>
          <el-button size="mini">价格 <i class="el-icon-bottom"></i></el-button>
        </el-button-group>
        <el-checkbox-group v-model="checkedCities" class="computers-radio">
          <el-checkbox label="包邮"></el-checkbox>
          <el-checkbox label="折扣"></el-checkbox>
          <el-checkbox label="搭配减价"></el-checkbox>
          <el-checkbox label="满就减"></el-checkbox>
          <el-checkbox label="货到付款"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-row :gutter="10" class="computers-show-box">
        <div
          v-for="(item, i) in computerData"
          :key="i"
          @click="getDetails(item)"
        >
          <el-col :span="4">
            <el-card
              :body-style="{ padding: '0px' }"
              :shadow="'hover'"
              class="el-cards"
            >
              <div class="card-image">
                <el-image
                  :src="item.computers_img"
                ></el-image>
              </div>
              <div class="card-detail">
                <span>{{ item.computer_name + item.classification }}</span>
              </div>
              <div class="card-price">
                <span>￥{{ item.price }}</span>
              </div>
            </el-card>
          </el-col>
        </div>
      </el-row>
      <div class="computers-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :hide-on-single-page="true"
          :total="total"
        >
        </el-pagination>
      </div>
      <div class="computers-carousel">
        <div class="computers-carousel-title">
          <span>为您推荐</span>
          <span>大家都在看</span>
        </div>
        <div class="computers-carousel-box">
          <el-carousel
            :interval="2000"
            arrow="hover"
            height="280px"
            class="carousel"
            type="card"
          >
            <el-carousel-item>
              <img src="../assets/images/carousel/itemCat_banner1.png" alt="" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/carousel/itemCat_banner3.png" alt="" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/carousel/itemCat_banner4.png" alt="" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/images/carousel/itemCat_banner4.png" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyBox",
  props: ["type"],
  data() {
    return {
      computers: {
        惠普: "hp",
        小米: "xm",
        华为: "hw",
        苹果: "iphone",
        联想: "lenovo",
        华硕: "luoji"
      },
      parts: {
        苹果: "iphone",
        技嘉: "jijia",
        罗技: "luoji",
        魅族: "meizu",
        飞利浦: "philips",
        品胜: "pisen",
        三星: "samsung",
        闪迪: "sandisk",
        东芝: "toshiba",
        希捷: "xj",
        华为: "hw",
        小米: "xm"
      },
      stationery: {
        罗技: "luoji",
        惠普: "hp",
        微星: "msi",
        雷蛇: "pazeer",
        希捷: "xj",
        技嘉: "jijia",
        飞利浦: "philips",
        品胜: "pisen",
        三星: "samsung",
        小米: "xm",
        闪迪: "sandisk",
        东芝: "toshiba"
      },
      checkedCities: [],
      currentPage: 1, // 选中页码
      pageSize: 24,
      total: 25,
      computerType: "",
      computerData: []
    };
  },
  methods: {
    getComputerData(name) {
      this.axios.post("/index/computer", { name: name }).then(res => {
        this.total = res.data.message.length;
        this.computerData = res.data.message;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getComputerLimt();
    },
    getDetails(event) {
      // console.log('event', event);
      this.$router.push({
        path: "/details",
        query: { details: JSON.stringify(event) }
      });
    },
    getComputerLimt() {
      let parmas = {
        begin: (this.currentPage - 1) * this.pageSize,
        end: this.currentPage * this.pageSize,
        name: this.computerType
      };
      this.axios.post("/index/computer_limit", parmas).then(res => {
        this.total = res.data.message.length;
        this.computerData = res.data.message;
      });
    }
  },
  computed: {
    types: function() {
      let data = [];
      let that = this;
      if (that.type === "computers") {
        data = that.computers;
      }
      if (that.type === "parts") {
        data = that.parts;
      }
      if (that.type === "stationery") {
        data = that.stationery;
      }
      return data;
    }
  },
  mounted() {
    if (this.type === "computers") {
      this.getComputerLimt();
    } else if (this.type === "parts") {
      console.log(1);
    } else {
      console.log(2);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.computers-logo {
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.computer-logo {
  text-align: center;
  width: 15%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  margin: 8px 0;
  cursor: pointer;
}
.computer-logo span {
  vertical-align: top;
  font-size: 18px;
  margin-left: 8px;
  letter-spacing: 2px;
}
.computer-logo img {
  margin-top: 5px;
  max-width: 60%;
}
.computers-choice {
  width: 100%;
  height: 34px;
  line-height: 30px;
  background: #ebe9e9;
  font-size: 12px;
}
.computers-radio {
  height: 25px;
  line-height: 25px;
  background: #fff;
  display: inline-block;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  padding: 0 8px;
  vertical-align: middle;
  margin-left: 20px;
}
.computers-show-box {
  margin-top: 20px;
}
.el-cards {
  margin-bottom: 10px;
  height: 290px;
}
.card-image {
  height: 190px;
}
.card-image img {
  width: 100%;
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
.computers-carousel {
  margin-top: 25px;
}
.computers-carousel-title {
  border-bottom: 2px solid #e8e8e8;
  padding: 12px;
}
.computers-carousel-title span:first-child {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-right: 15px;
}
.computers-carousel-title span:last-child {
  font-size: 14px;
  display: inline-block;
  padding: 3px;
  color: #fff;
  letter-spacing: 3px;
  background-color: #494747;
}
.computers-pagination {
  margin-top: 16px;
  text-align: center;
}
.computers-carousel-box {
  margin-top: 16px;
}
.carousel img {
  width: 100%;
  height: 100%;
}
</style>
