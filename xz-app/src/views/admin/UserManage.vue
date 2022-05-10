<template>
  <div class="box">
    <div class="boxTitle">用户管理</div>
    <div style="padding: 10px">
      <el-table :data="tableData" stripe>
        <el-table-column prop="user_id" label="用户ID" />
        <el-table-column prop="username" label="用户名称" />
        <el-table-column prop="phone" label="用户手机号" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="password" label="用户密码" />
        <el-table-column prop="order" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑用户</el-button
            >
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除用户</el-button
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
    <el-dialog
      v-if="dialogVisible"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="selectRow" ref="form">
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="selectRow.username"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ]"
        >
          <el-input v-model="selectRow.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="selectRow.password"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]"
        >
          <el-input v-model="selectRow.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyUserAll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      tableData: [],
      total: 0,
      current: 1,
      dialogVisible: false,
      selectRow: {
        username: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  },
  mounted() {
    this.getUSerAll();
  },
  methods: {
    getUSerAll() {
      const params = {
        begin: 20 * (this.current - 1),
        end: 20 * this.current - 1
      };
      this.axios.post("/users/getUSerAll", params).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.pageTotal;
      });
    },
    currentChange(event) {
      this.current = event;
      this.getUSerAll();
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
      this.selectRow = { ...row };
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/users/deleteUser", { user_id: row.user_id })
            .then(() => {
              this.$message.success("删除用户成功");
              this.getUSerAll();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    modifyUserAll() {
      this.$refs["form"].validate(val => {
        if (val) {
          const param = this.selectRow;
          this.axios.post("/users/modifyUserAll", param).then(() => {
            this.$message.success("修改用户成功");
            this.dialogVisible = false;
            this.getUSerAll();
          });
        }
      });
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
