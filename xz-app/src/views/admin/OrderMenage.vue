<template>
  <div class="box">
    <div class="boxTitle">
      订单管理
    </div>
    <div style="padding: 10px;">
      <el-table :data="tableData" stripe>
        <el-table-column prop="orders_num" label="订单编号" />
        <el-table-column prop="order_date" label="日期" />
        <el-table-column prop="computer_name" label="商品名称" />
        <el-table-column prop="amount" label="商品数量" />
        <el-table-column prop="total" label="交易金额" />
        <el-table-column prop="user_id" label="用户名称" />
        <el-table-column prop="order_type" label="订单状态">
          <template slot-scope="scope">
            <span>{{
              orderTypes.find(elem => elem.code === scope.row["order_type"])
                .name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row['order_type'] === '02'"
              type="text"
              @click="handleEdit(scope.row)"
              >发货</el-button
            >
            <el-button
              v-else-if="scope.row['order_type'] === '01'"
              type="text"
              @click="handleDelete(scope.row)"
              >取消订单</el-button
            >
            <span v-else>暂无操作</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="20"
        @current-change="currentChange"
        :total="total"
        style="text-align: right; margin-top: 20px;"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderMenage",
  data() {
    return {
      tableData: [],
      orderTypes: [
        {
          code: "01",
          name: "未付款"
        },
        {
          code: "02",
          name: "待发货"
        },
        {
          code: "03",
          name: "待收货"
        },
        {
          code: "04",
          name: "待评价"
        },
        {
          code: "05",
          name: "完成订单"
        },
        {
          code: "06",
          name: "订单取消"
        }
      ],
      total: 0,
      current: 1
    };
  },
  mounted() {
    this.getOrderAll();
  },
  methods: {
    getOrderAll() {
      const params = {
        order_type: "all",
        begin: 20 * (this.current - 1),
        end: 20 * this.current - 1
      };
      this.axios.post("/index/getOrderAll", params).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.pageTotal;
      });
    },
    currentChange(event) {
      this.current = event;
      this.getOrderAll();
    },
    modifyOrderType(data, type) {
      const param = {
        orders_num: data.orders_num,
        computer_id: data.computer_id,
        total: data.total,
        order_type: type,
        pay_date: data.pay_date,
        add_id: data.add_id
      };
      this.axios.post("/index/opdateOrderStatus", param).then(() => {
        this.getOrderAll();
        this.$message.success(type === "03" ? "发货成功" : "取消订单成功");
      });
    },
    handleEdit(row) {
      this.modifyOrderType(row, "03");
    },
    handleDelete(row) {
      this.modifyOrderType(row, "06");
    }
  }
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
  color: #D6B274;
  position: relative;
}
.boxTitle::before {
  content: "";
  width: 5px;
  height: 24px;
  position: absolute;
  top: 20px;
  left: 0;
  background: #D6B274;
}
</style>
