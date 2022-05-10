<template>
  <div class="parts-content">
    <el-card shadow="never">
      <div slot="header" class="parts-card-header">
        <div>
          <span>请选择</span>
          <span>{{ part }}</span>
        </div>
      </div>
      <ul class="ul-bg">
        <li class="part-shop" v-for="(item, index) in partsList" :key="index">
          <div class="part-img">
            <img
              :src="require(`../assets/images/parts/${item.img}.jpg`)"
              alt=""
            />
          </div>
          <div class="part-box">
            <span class="part-box-header">{{ item.title }}</span>
            <div class="part-box-content">
              <div v-for="(elem, i) in item.class" :key="i">
                <span style="color: #ccc;">{{ i + ": " }}</span>
                <span>{{ elem }}</span>
              </div>
            </div>
          </div>
          <div class="part-button">
            <span>￥{{ item.price }}</span>
            <el-button type="primary" size="mini" @click="addPart(item)"
              >加入配置单</el-button
            >
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyParts",
  props: ["part", "sheets"],
  methods: {
    addPart(event) {
      this.$emit("addPart", event);
    }
  },
  computed: {
    partsList() {
      return this.sheets.find(item => item.part === this.part).children;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parts-content /deep/ .el-card__header {
  background: #fafafa;
  color: #666;
  padding: 10px;
}
.parts-content /deep/ .el-card__body {
  padding: 0;
}
.parts-card-header {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.parts-card-header > :first-child {
  width: 30%;
  line-height: 28px;
}
.parts-content ul {
  list-style: none;
  margin: 0;
  padding: 10px;
}
.parts-content ul li {
  background: #dab05f;
  margin-top: 10px;
  border-radius: 5px;
  padding: 5px;
}
.part-shop {
  height: 120px;
  display: flex;
}
.part-img {
  width: 25%;
  padding-top: 18px;
  padding-left: 5px;
}
.part-img img {
  width: 80%;
  height: 90px;
}
.part-box {
  width: 60%;
  padding-top: 8px;
}
.part-box-header {
  font-size: 14px;
  font-weight: 700;
  color: #409eff;
  margin-top: 10px;
}
.part-box-content {
  display: flex;
  font-size: 12px;
  justify-content: space-around;
  flex-wrap: wrap;
}
.part-box-content > div {
  width: 50%;
  height: 25px;
  line-height: 25px;
}
.part-button {
  width: 15%;
  padding: 20px 0;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  margin-right: 20px;
}
.part-button span {
  color: red;
  font-size: 18px;
}
</style>
