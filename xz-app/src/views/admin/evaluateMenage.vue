<template>
  <div class="box">
    <div class="boxTitle">评价管理</div>
    <div style="padding: 10px">
      <el-table :data="tableData" stripe>
        <el-table-column prop="orders_num" label="订单编号" />
        <el-table-column prop="evaluate_date" label="评价日期" />
        <el-table-column prop="computer_name" label="商品名称" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="phone" label="用户手机号" />
        <el-table-column prop="evaluate_info" label="评价内容" />
        <el-table-column prop="evaluate_image" label="用户评价图片">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row['evaluate_image']"
              style="width: 100px; height: 100px"
              :src="scope.row['evaluate_image']"
            ></el-image>
            <span v-else>暂无图片</span>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除评价</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="20"
        @current-change="currentChange"
        :total="total"
        style="text-align: right; margin-top: 20px"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluateMenage",
  data() {
    return {
      tableData: [],
      total: 0,
      current: 1,
    };
  },
  mounted() {
    this.getOrderAll();
  },
  methods: {
    getOrderAll() {
      const params = {
        begin: 20 * (this.current - 1),
        end: 20 * this.current - 1,
      };
      this.axios.post("/index/getEvaluateAll", params).then((res) => {
        this.tableData = res.data.message;
        this.total = res.data.pageTotal;
      });
    },
    currentChange(event) {
      this.current = event;
      this.getOrderAll();
    },
    handleDelete(row) {
      this.$confirm("确定删除该评价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.post("/index/deleteEvaluate", { id: row.id }).then(() => {
            this.$message.success("删除成功");
            this.getOrderAll();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.box {
  height: 100%;
  background: #fff;
}
.boxTitle {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #d6b274;
  position: relative;
}
.boxTitle::before {
  content: "";
  width: 5px;
  height: 24px;
  position: absolute;
  top: 20px;
  left: 0;
  background: #d6b274;
}
</style>
