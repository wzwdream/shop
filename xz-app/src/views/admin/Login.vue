<template>
  <div class="login-box">
    <img class="loginbg" src="../../assets/1.webp" alt="" />
    <div class="box-card">
      <div class="login_hearder">
        <span>欢迎使用商城后台系统</span>
        <router-link
          target="_blank"
          to="/login"
          style="color: #409eff; text-decoration: none"
          >用户登录</router-link
        >
      </div>
      <el-form :model="loginform" ref="loginform" label-width="80px">
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]"
        >
          <el-input v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密 码"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="loginform.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login_btn" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 登录方法
    login() {
      this.$refs["loginform"].validate(val => {
        if (val) {
          const parms = {
            ...this.loginform,
            type: "02"
          };
          this.axios.post("/users/login", parms).then(res => {
            if (res.data.code) {
              sessionStorage.setItem(
                "adminUserInfo",
                JSON.stringify(res.data.userInfo)
              );
              this.$router.push({ path: "/admin" });
              this.$message({
                message: res.data.message,
                type: "success",
                showClose: true,
                center: true
              });
            } else {
              this.$message({
                message: "用户名或密码不正确",
                type: "error",
                showClose: true,
                center: true
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.loginbg {
  width: 100%;
  height: 100%;
  position: fixed;
}
.box-card {
  position: absolute;
  top: 25%;
  left: 36%;
  background: rgb(224 224 224 / 80%);
  border-radius: 4px;
  width: 350px;
  height: 200px;
  padding: 20px 40px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login_hearder {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid rgb(156 154 154 / 80%);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.login_btn {
  width: 74%;
  margin-left: 33px;
}
</style>
