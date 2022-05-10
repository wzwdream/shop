<template>
  <div class="evaluate-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评价</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="box">
      <div class="shop_info">
        <el-image style="width: 80px; height: 80px" :src="data.computers_img">
        </el-image>
        <div>
          <span>{{ data.computer_name + data.classification }}</span>
          <span>{{ "时间: " + data.pay_date }}</span>
          <span class="price">{{ "￥" + data.total }}</span>
        </div>
      </div>
      <div class="rate">
        <span>评分：</span>
        <el-rate v-model="evaluateData.rate" :colors="colors" show-text>
        </el-rate>
      </div>
      <div class="uploadImg">
        <input
          id="uploadInput"
          style="display: none"
          type="file"
          @change="uploadFile($event)"
        />
        <div v-if="!evaluateData.evaluate_image" class="icon" @click="upload">
          <i class="el-icon-plus"></i>
          <span>上传商品实物照片</span>
        </div>
        <el-image
          v-else
          style="width: 100px; height: 100px"
          :src="evaluateData.evaluate_image"
        >
        </el-image>
      </div>
      <el-input
        type="textarea"
        style="width: 500px"
        :rows="5"
        placeholder="请输入评价内容"
        v-model="evaluateData.evaluate_info"
      >
      </el-input>
      <div>
        <el-button type="primary" @click="submit">提交评价</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Evaluate",
  data() {
    return {
      data: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      evaluateData: {
        user_id: sessionStorage.getItem("userid"),
        computer_id: "",
        orders_num: "",
        rate: 0,
        evaluate_info: "",
        evaluate_image: "",
      },
    };
  },
  created() {
    this.data = JSON.parse(this.$route.query.orderData);
    this.evaluateData.orders_num = this.data.orders_num
    this.evaluateData.computer_id = this.data.computer_id
  },
  methods: {
    uploadFile(e) {
      let file = e.target.files[0];
      let parm = new FormData();
      parm.append("icon", file);
      this.axios
        .post("/index/uploadImage", parm, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((res) => {
          this.$message.success(res.data.message);
          this.evaluateData.evaluate_image = res.data.img
        });
    },
    upload() {
      document.getElementById("uploadInput").click();
    },
    submit() {
      this.axios.post('/index/addEvaluate', {...this.evaluateData, evaluate_date: new Date()}).then(res => {
        console.log(res)
        this.$message.success('评价成功')
        this.$router.go(-1)
      })
      console.log(this.evaluateData)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.evaluate-content {
  margin-top: 20px;
}
.uploadImg {
  width: 200px;
  height: 100px;
  border: 1px dotted #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
}
.icon {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.shop_info {
  display: flex;
  height: 80px;
}
.shop_info > div {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  margin-right: 10px;
  justify-content: space-around;
}
.price {
  color: red;
}
.rate {
  display: flex;
}
.box {
  padding: 20px;
}
.box > div {
  margin-bottom: 10px;
}
</style>
