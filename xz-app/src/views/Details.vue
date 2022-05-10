<template>
  <div class="details">
    <div class="details-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>办公电脑</el-breadcrumb-item>
        <el-breadcrumb-item>小米电脑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="details-content">
      <el-row :gutter="40">
        <el-col :span="12">
          <div class="details-big" v-if="detail.computers_img">
            <el-image :src="detail.computers_img" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="details-dec">
            <span>{{ detail.computer_name }}</span>
            <span>{{
              detail.computer_name +
                " " +
                detail.cpu +
                " " +
                detail.classification
            }}</span>
            <div class="computers-details-form">
              <div class="computers-price">
                <span>学员售价：</span>
                <span>￥{{ detail.price }}</span>
              </div>
              <div>
                <span
                  >服务承诺： *退货补运费 *30天无忧退货 *48小时快速退款
                  *72小时发货</span
                >
              </div>
            </div>
            <div class="details-text">
              <span>客服：</span>
              <span
                >联系客服 <img src="../assets/images/help/kefuf.gif" alt=""
              /></span>
            </div>
            <div class="details-text">
              <span>颜色：</span>
              <div class="compters-type">
                <el-radio-group v-model="radioLabel" size="small">
                  <el-radio-button
                    v-for="(color, i) in colors"
                    :key="i"
                    :label="color"
                  ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="details-text">
              <span>规格：</span>
              <div class="compters-type">
                <el-radio-group v-model="radioLabel1" size="small">
                  <el-radio-button
                    v-for="(size, i) in hard_size"
                    :key="i"
                    :label="size"
                  ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="details-text">
              <span>内存容量：</span>
              <div class="compters-type">
                <el-radio-group v-model="memoryRadio" size="small">
                  <el-radio-button
                    v-for="(memory, i) in memoryLabel"
                    :key="i"
                    :label="memory"
                  ></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="details-text">
              <span>数量：</span>
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="1000"
                label="描述文字"
              ></el-input-number>
            </div>
            <div class="details-botton">
              <el-button type="primary" @click="shopingCom"
                ><i class="el-icon-sell"></i> 立即购买</el-button
              >
              <el-button type="success" @click="addShopCar"
                ><i class="el-icon-shopping-cart-full"></i>
                加入购物车</el-button
              >
              <el-button type="warning" @click="addFavorites"
                ><i class="el-icon-star-off"></i> 收藏</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="computers-details-box">
        <el-col :span="20">
          <el-tabs @tab-click="tabClick">
            <el-tab-pane>
              <span slot="label"
                ><i class="el-icon-s-operation"></i> 商品详情</span
              >
              <div class="details-content-box">
                <div>
                  <h2>规格参数 <i class="el-icon-s-operation"></i></h2>
                  <div class="details-content-box-1">
                    <div>
                      <span>商品名称：</span>
                      <span>{{ detail.computer_name }}</span>
                    </div>
                    <div>
                      <span>系统：</span>
                      <span>{{ detail.computer_system }}</span>
                    </div>
                    <div>
                      <span>内存容量：</span>
                      <span>{{ detail.memory }}</span>
                    </div>
                  </div>
                  <div class="details-content-box-1">
                    <div>
                      <span>分辨率：</span>
                      <span>{{ detail.resolving_power }}</span>
                    </div>
                    <div>
                      <span>显卡型号：</span>
                      <span>{{ detail.graphicsType }}</span>
                    </div>
                    <div>
                      <span>处理器：</span>
                      <span>{{ detail.cpu }}</span>
                    </div>
                  </div>
                  <div class="details-content-box-1">
                    <div>
                      <span>显存容量：</span>
                      <span>{{ detail.graphicsSize }}</span>
                    </div>
                    <div>
                      <span>分类：</span>
                      <span>{{ detail.classification }}</span>
                    </div>
                    <div>
                      <span>硬盘容量：</span>
                      <span>{{ detail.hard_disk }}</span>
                    </div>
                  </div>
                </div>
                <div class="computer-detail-img" v-if="detailsImg">
                  <h2>商品介绍 <i class="el-icon-picture-outline"></i></h2>
                  <el-image :src="detailsImg"></el-image>
                </div>
                <div class="after-sales">
                  <h2>售后保障 <i class="el-icon-money"></i></h2>
                  <p><i class="el-icon-trophy"></i> 正品保障</p>
                  <span
                    >达内学子商城向您保证所售商品均为正品行货，达内自营商品开具机打发票或电子发票。</span
                  >
                  <p><i class="el-icon-data-analysis"></i> 全国联保</p>
                  <span
                    >凭质保证书及达内商城发票，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。达内商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！
                    注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</span
                  >
                </div>
                <div class="joint-guarantee">
                  <h2>包装清单 <i class="el-icon-box"></i></h2>
                  <p>
                    笔记本 x1 适配器 x1 电源线 x1 电池 x1 说明书（电子版）x1
                    备注：笔记本电脑的背面只会标注此电脑的系列，例如： XPS
                    13-9360 ，
                    如果您需要核实此电脑的具体配置型号是否与达内页面相符，可电话咨询达内厂商：800-858-2969
                  </p>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="el-icon-set-up"></i> 商品评价</span>
              <div v-if="evaluateArr.length > 0">
                <div
                  class="shop-evaluate"
                  v-for="(item, index) in evaluateArr"
                  :key="index"
                >
                  <div class="evaluate-user">
                    <el-avatar :src="item.user_avartar"></el-avatar>
                    <span class="evaluate_span">{{ item.username }}</span>
                  </div>
                  <div class="evaluate">
                    <span class="evaluate_span">{{
                      item.computer_name + item.classification
                    }}</span>
                    <span class="evaluate_span"
                      >时间:{{ item.evaluate_date }}</span
                    >
                    <span>{{ item.evaluate_info }}</span>
                  </div>
                </div>
              </div>
              <div v-else>该商品暂无评价</div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4" class="details-box-button">
          <el-button type="info" plain @click="addShopCar"
            ><i class="el-icon-shopping-cart-full"></i> 加入购物车</el-button
          >
          <el-button type="info" plain
            ><i class="el-icon-s-operation"></i> 规格参数</el-button
          >
          <el-button type="info" plain
            ><i class="el-icon-picture-outline"></i> 商品介绍</el-button
          >
          <el-button type="info" plain
            ><i class="el-icon-money"></i> 售后保障</el-button
          >
          <el-button type="info" plain
            ><i class="el-icon-box"></i> 包装清单</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      srcList: [
        require("../assets/images/computers/lenovo.png"),
        require("../assets/images/computers/1.png"),
        require("../assets/images/computers/2.png"),
        require("../assets/images/computers/3.png"),
        require("../assets/images/computers/4.png")
      ],
      radioLabel: "白色",
      num: 1,
      radioLabel1: "15寸 15 1T",
      detail: {},
      colors: [],
      hard_size: [],
      memoryRadio: "",
      memoryLabel: [],
      detailsImg: "",
      evaluateArr: []
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    addFavorites() {
      const u_id = sessionStorage.getItem("userid");
      if (!u_id) {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "请先登录",
          type: "warning",
          showClose: true,
          center: true
        });
        return;
      }
      const params = {
        user_id: this.detail.user_id,
        computer_id: this.detail.computer_id
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
    addShopCar() {
      const u_id = sessionStorage.getItem("userid");
      if (!u_id) {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "请先登录",
          type: "warning",
          showClose: true,
          center: true
        });
        return;
      }
      const prarms = {
        cid: this.detail.computer_id,
        u_id: sessionStorage.getItem("userid"),
        ctype: this.detail.ctype,
        amount: this.num
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
    tabClick(e) {
      if (e.index === "1") {
        this.axios
          .post("/index/getEvaluate", { computer_id: this.detail.computer_id })
          .then(res => {
            console.log(res);
            this.evaluateArr = res.data.message;
          });
      }
    },
    shopingCom() {
      const u_id = sessionStorage.getItem("userid");
      if (!u_id) {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "请先登录",
          type: "warning",
          showClose: true,
          center: true
        });
        return;
      }
      const orders_num = this.generateOrderNumber();
      const params = {
        orders_num: orders_num,
        user_id: sessionStorage.getItem("userid"),
        computer_id: this.detail.computer_id,
        total: this.detail.price,
        amount: this.num,
        order_date: new Date(),
        order_type: "01"
      };
      this.axios.post("/index/addOrder", params).then(() => {
        this.$router.push({
          path: "/order",
          query: { orders_num }
        });
      });
    }
  },
  created() {
    console.log(this.$route.query.details);
  },
  mounted() {
    this.detail = JSON.parse(this.$route.query.details);
    this.radioLabel = this.detail.color;
    this.colors.push(this.radioLabel);
    this.radioLabel1 = this.detail.hard_disk + " " + this.detail.size;
    this.hard_size.push(this.radioLabel1);
    this.memoryRadio = this.detail.memory;
    this.memoryLabel.push(this.memoryRadio);
    this.axios
      .post("/index/computer_details", { name: this.detail.computer_id })
      .then(res => {
        this.detailsImg = res.data.message[0].details_img;
      });
  }
};
</script>
<style scoped>
.details-title {
  margin-top: 20px;
}
.details-content {
  margin-top: 20px;
}
.details-small {
  display: flex;
  justify-content: space-between;
}
.details-small img {
  width: 84px;
  height: 84px;
  border: 1px solid #e8e8e8;
}
.details-dec > span {
  display: block;
  font-size: 24px;
  margin-bottom: 8px;
}
.details-dec > span:first-child {
  font-weight: 700;
}
.details-dec > span:nth-child(2) {
  font-size: 14px;
  color: #ff0036;
}
.computers-details-form {
  background: -webkit-linear-gradient(top, #f0f0f0 0%, #e0e0e0 100%);
  box-shadow: 0px 0px 10px #ccc;
  margin-top: 10px;
  width: 480px;
  height: 90px;
  padding: 8px;
  font-size: 14px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  margin-bottom: 20px;
  margin-top: 20px;
}
.computers-price span:last-child {
  font-size: 28px;
  font-weight: 700;
  color: #409eff;
}
.compters-type {
  display: inline;
}
.details-text {
  margin-bottom: 20px;
  font-size: 16px;
}
.computers-details-box {
  margin-top: 40px;
}
.computers-details-box /deep/ .el-tabs__item {
  font-size: 18px;
}
.computers-details-box /deep/ .el-tabs__nav-scroll {
  padding-left: 12px;
  background: -webkit-linear-gradient(top, #eff0f0 0%, #e0dfe0 100%);
}
.computers-details-box /deep/ .el-tabs__content {
  border: 2px solid #e8e8e8;
}
.details-box-button button {
  margin-bottom: 10px;
}
.details-box-button button:first-child {
  margin-bottom: 40px;
}
.details-content-box {
  padding-left: 8px;
}
.details-content-box h2 {
  margin-bottom: 15px;
  color: #999;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 8px;
}
.details-content-box-1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.details-content-box-1 > div {
  display: inline-block;
  width: 33%;
}
.computer-detail-img img {
  width: 96%;
  margin: 0 2%;
}
.after-sales p {
  color: #409eff;
}
.after-sales span,
.joint-guarantee p {
  color: #999;
  font-size: 12px;
}
.shop-evaluate {
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  padding: 8px;
  display: flex;
}
.evaluate-user {
  display: flex;
  width: 11%;
  flex-flow: column;
  text-align: center;
}
.evaluate-user .el-avatar--circle {
  margin-left: 20px;
}
.evaluate {
  display: flex;
  flex-flow: column;
  font-size: 14px;
  margin-top: 5px;
}
.evaluate_span {
  font-size: 12px;
  color: #d4cece;
  margin-bottom: 3px;
}
</style>
