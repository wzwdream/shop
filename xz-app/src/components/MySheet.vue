<template>
  <div class="sheet-content">
    <el-card shadow="never">
      <div slot="header">装机配置单</div>
      <ul>
        <li
          v-for="(item, index) of partSheet"
          :key="index"
          :class="{ 'sheet-part': true, 'sheet-ative': isActive == index }"
          @click="addShop(item.part, index)"
        >
          <span>{{ item.part }}</span>
          <div v-if="item.isAdd">
            <img
              :src="require(`../assets/images/parts/${item.img}.jpg`)"
              alt=""
            />
            <span>{{ item.title }}</span>
            <span style="width: 15%;">{{ "￥" + item.price }}</span>
          </div>
          <div v-else>
            <p>请选择商品</p>
          </div>
          <el-button
            v-if="item.isAdd"
            icon="el-icon-close"
            type="text"
            @click="deleteShop(index)"
          ></el-button>
          <el-button v-else type="text" @click="addShop(item.part, index)"
            >添加</el-button
          >
        </li>
        <li class="sheet-total">
          <div>
            <span>共计</span>
            <span>{{ total.sum }}</span>
            <span>项</span>
          </div>
          <div>
            <span>合计</span>
            <span>{{ total.totalPrice }}</span>
          </div>
        </li>
        <li class="sheet-button">
          <!-- <el-button type="primary">加入购物车</el-button> -->
          <el-button type="danger" @click="deleteSheet">清空</el-button>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MySheet",
  props: ["updateDate", "partSheet"],
  data() {
    return {
      isActive: 0,
      total: {
        sum: 0,
        totalPrice: 0
      }
    };
  },
  methods: {
    deleteShop(index) {
      this.$emit("deleteShop", index);
      this.$forceUpdate();
    },
    addShop(part, index) {
      this.isActive = index;
      this.$emit("selectPart", part);
      this.$forceUpdate();
    },
    deleteSheet() {
      this.$emit("deleteSheet");
    }
  },
  watch: {
    updateDate: function() {
      this.total.sum = 0;
      this.total.totalPrice = 0;
      this.partSheet.forEach(element => {
        if (element.isAdd) {
          this.total.sum++;
        }
        this.total.totalPrice += element.price || 0;
      });
      this.$forceUpdate();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sheet-content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sheet-content /deep/ .el-card__header {
  text-align: center;
  background: #409eff;
  color: #fff;
  font-size: 16px;
  padding: 12px;
}
.sheet-content /deep/ .el-card__body {
  padding: 0;
}
.sheet-content .sheet-part,
.sheet-total {
  border: 1px solid #e8e8e8;
  border-bottom: none;
  height: 74px;
}
.sheet-ative {
  background: #f9f9f9;
}
.sheet-part img {
  width: 60px;
}
.sheet-part span,
.sheet-part img,
.sheet-part button,
.sheet-part /deep/ .el-input-number,
.sheet-part p {
  float: left;
  text-align: center;
}
.sheet-part span {
  margin-top: 27px;
}
.sheet-part span:first-child {
  width: 20%;
}
.sheet-part > div > :nth-child(2) {
  width: 44%;
}
.sheet-part > div > :nth-child(4) {
  width: 17%;
  color: red;
}
.sheet-part img {
  margin-top: 12px;
  width: 13%;
  height: 55px;
}
.sheet-part div p {
  display: inline-block;
  width: 71%;
  text-align: center;
  margin-top: 27px;
}
.sheet-part button {
  margin-top: 16px;
}
.sheet-total {
  display: flex;
  justify-content: space-between;
  height: 40px !important;
  line-height: 40px;
}
.sheet-total span {
  margin: 0 2px;
}
.sheet-total div {
  margin: 0 10px;
}
.sheet-total > div :nth-child(2) {
  font-size: 16px;
  color: red;
}
.sheet-button {
  display: flex;
  justify-content: space-around;
  border: 1px solid #e8e8e8;
  border-bottom: none;
  padding: 4px;
}
</style>
