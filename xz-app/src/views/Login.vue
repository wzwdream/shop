<template>
  <div class="login">
    <!-- 页面头部 -->
    <div class="login-header">
      <img src="../assets/images/logo.jpeg" alt="" />
      <span>学子商城</span>
      <span>欢迎访问</span>
    </div>
    <!-- 页面背景图片 -->
    <div class="login-bg">
      <img src="../assets/images/bg.png" alt="" />
    </div>
    <!-- 登录模拟框 -->
    <div class="login-form" v-if="isLoginView">
      <div class="login-from-heaer">
        <span>欢迎登录学子商城</span>
        <el-button
          class="register-text"
          type="text"
          @click="isLoginView = !isLoginView"
          >新用户注册</el-button
        >
      </div>
      <div class="login-from-content">
        <el-input
          placeholder="账号"
          class="user-name"
          prefix-icon="el-icon-user"
          clearable
          v-model="userName"
          autofocus="true"
        ></el-input>
        <!-- <span v-if="loginUserName">账号不能为空</span>
        <span v-if="!loginUserName" style="color: #67c23a"
          ><i class="el-icon-check"></i>正确</span
        > -->
        <el-input
          placeholder="密码"
          class="user-pwd"
          prefix-icon="el-icon-lock"
          clearable
          show-password
          v-model="userPwd"
        ></el-input>
        <!-- <span v-if="loginUserPwd">密码不能为空</span>
        <span v-if="!loginUserPwd" style="color: #67c23a"
          ><i class="el-icon-check"></i>正确</span
        > -->
      </div>
      <div class="login-from-pwd">
        <!-- <el-checkbox v-model="pwdChecked">记住密码</el-checkbox> -->
        <router-link to="/" style="color: #409eff">回到首页</router-link>
        <router-link target="_blank" to="/AdminLogin" style="color: #409eff"
          >商家登录</router-link
        >
        <!-- <router-link to="">忘记密码？</router-link> -->
      </div>
      <div class="login-from-footer">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
    <!-- 注册模拟框 -->
    <div class="register-from" v-if="!isLoginView">
      <div class="login-from-heaer">
        <span>新用户注册</span>
        <el-button
          class="register-text"
          type="text"
          @click="isLoginView = !isLoginView"
          >直接登录</el-button
        >
      </div>
      <el-row class="register-row">
        <el-col :span="4"
          ><span class="register-box-left">用户名：</span></el-col
        >
        <el-col :span="14">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
            v-model="reUserName"
            autofocus="true"
          ></el-input>
        </el-col>
        <el-col :span="6"
          ><span
            :class="{
              'register-box-right': true,
              'user-erro-bg': !reUserNameClass,
              'user-success-bg': reUserNameClass
            }"
            >{{ reUserNameTips }}</span
          ></el-col
        >
      </el-row>
      <el-row class="register-row">
        <el-col :span="4"><span class="register-box-left">密码：</span></el-col>
        <el-col :span="14">
          <el-input
            placeholder="请输入登录密码"
            prefix-icon="el-icon-lock"
            show-password
            clearable
            v-model="reUserPwd"
          ></el-input>
        </el-col>
        <el-col :span="6"
          ><span
            :class="{
              'register-box-right': true,
              'user-erro-bg': !reUserPwdClass,
              'user-success-bg': reUserPwdClass
            }"
            >{{ reUserPwdTips }}</span
          ></el-col
        >
      </el-row>
      <el-row class="register-row">
        <el-col :span="4"
          ><span class="register-box-left">确认密码：</span></el-col
        >
        <el-col :span="14">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-lock"
            show-password
            clearable
            v-model="reUserPwdTwo"
          ></el-input>
        </el-col>
        <el-col :span="6"
          ><span
            :class="{
              'register-box-right': true,
              'user-erro-bg': !reUserPwdTwoClass,
              'user-success-bg': reUserPwdTwoClass
            }"
            >{{ reUserPwdTwoTips }}</span
          ></el-col
        >
      </el-row>
      <el-row class="register-row">
        <el-col :span="4"><span class="register-box-left">邮箱：</span></el-col>
        <el-col :span="14">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-message"
            clearable
            v-model="reUserEmail"
          ></el-input>
        </el-col>
        <el-col :span="6"
          ><span
            :class="{
              'register-box-right': true,
              'user-erro-bg': !reUserEmailClass,
              'user-success-bg': reUserEmailClass
            }"
            >{{ reUserEmailTips }}</span
          ></el-col
        >
      </el-row>
      <el-row class="register-row">
        <el-col :span="4"
          ><span class="register-box-left">手机号码：</span></el-col
        >
        <el-col :span="14">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-mobile-phone"
            clearable
            v-model="reUserPhone"
          ></el-input>
        </el-col>
        <el-col :span="6"
          ><span
            :class="{
              'register-box-right': true,
              'user-erro-bg': !reUserPhoneClass,
              'user-success-bg': reUserPhoneClass
            }"
            >{{ reUserPhoneTips }}</span
          ></el-col
        >
      </el-row>
      <el-row class="register-row register-button">
        <el-col :span="14" :offset="4">
          <el-button type="primary" @click="register">注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      // 登录---
      userName: "",
      userPwd: "",
      pwdChecked: false,
      isLoginView: true, // 页面切换值
      // 注册---
      reUserName: "",
      reUserNameTips: "",
      reUserNameClass: false,
      reUserPwd: "",
      reUserPwdTips: "",
      reUserPwdClass: false,
      reUserPwdTwo: "",
      reUserPwdTwoTips: "",
      reUserPwdTwoClass: false,
      reUserEmail: "",
      reUserEmailTips: "",
      reUserEmailClass: false,
      reUserPhone: "",
      reUserPhoneTips: "",
      reUserPhoneClass: false
    };
  },
  created() {
    let type = this.$route.query.type;
    if (type === "register") {
      this.isLoginView = false;
    }
  },
  methods: {
    // 登录方法
    login() {
      const parms = {
        username: this.userName,
        password: this.userPwd,
        type: "01"
      };
      this.axios.post("/users/login", parms).then(res => {
        if (res.data.code) {
          this.$router.push({ path: "/" });
          this.$message({
            message: res.data.message,
            type: "success",
            showClose: true,
            center: true
          });
          sessionStorage.setItem("userid", res.data.userInfo.user_id);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
        } else {
          this.$message({
            message: "用户名或密码不正确",
            type: "error",
            showClose: true,
            center: true
          });
        }
      });
    },
    // 注册方法
    register() {
      // 所有验证都通过才可以进行注册
      if (
        this.reUserNameClass &&
        this.reUserPwdClass &&
        this.reUserPwdTwoClass &&
        this.reUserEmailClass &&
        this.reUserPhoneClass
      ) {
        const parms = {
          reUserName: this.reUserName,
          reUserPwd: this.reUserPwd,
          reUserEmail: this.reUserEmail,
          reUserPhone: this.reUserPhone
        };
        this.axios.post("/users/register", parms).then(res => {
          if (res.data.code) {
            this.$message({
              message: "注册成功",
              type: "success",
              showClose: true,
              center: true
            });
            this.userName = this.reUserName;
            this.password = this.reUserPwd;
            this.isLoginView = !this.isLoginView;
            this.reUserName = "";
            this.reUserPwd = "";
            this.reUserEmail = "";
            this.reUserPhone = "";
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
              showClose: true,
              center: true
            });
          }
        });
      } else {
        this.$message({
          message: "请按照正确的格式填写",
          type: "error",
          showClose: true,
          center: true
        });
      }
    },
    // 文本框格式验证方法
    formatValidation(value, name, min, max, reg) {
      let boolean = false;
      let tip = "";
      let bgClass = false;
      if (value !== "") {
        // 去除空格
        value = value.replace(/\s*/g, "");
        // 判断reg的值
        if (reg === 1) {
          if (value.length >= min && value.length <= max) {
            boolean = true;
          }
        } else {
          boolean = reg.test(value);
        }
        // 验证规则
        if (value === "") {
          // tip = `${name}不能为空`;
        }
        if (boolean) {
          tip = `${name}格式正确`;
          bgClass = true;
        } else {
          tip =
            reg === 1 ? `${name}长度为${min}-${max}位` : `${name}格式不正确`;
        }
      }
      // 函数返回值
      return { tips: tip, bg: bgClass };
    },
    // 去除空格（空格，回车，制表位）
    removeSpaces(event) {
      if (event !== "") {
        event = event.replace(/\s*/g, "");
      }
      return event;
    }
  },
  computed: {
    loginUserName: function() {
      let that = this;
      let isShow = true;
      if (that.userName.length > 0) {
        if (that.userName.trim().length > 0) isShow = false;
      }
      return isShow;
    },
    loginUserPwd: function() {
      let that = this;
      let isShow = true;
      if (that.userPwd.length > 0) {
        if (that.userPwd.trim().length > 0) isShow = false;
      }
      return isShow;
    }
  },
  // 监听函数
  watch: {
    // 用户名验证检测
    reUserName: {
      handler(newVal) {
        let tipArr = this.formatValidation(newVal, "用户名", 3, 10, 1);
        this.reUserNameTips = tipArr.tips;
        this.reUserNameClass = tipArr.bg;
      }
    },
    // 密码框验证检测
    reUserPwd: {
      handler(newVal) {
        let tipArr = this.formatValidation(newVal, "密码", 6, 13, 1);
        this.reUserPwdTips = tipArr.tips;
        this.reUserPwdClass = tipArr.bg;
      }
    },
    // 确认密码验证检测
    reUserPwdTwo: {
      handler(newVal) {
        let bgClass = false;
        let tip = "";
        newVal = this.removeSpaces(newVal);
        if (newVal == "") {
          // tip = "密码不能为空";
        } else if (newVal !== this.reUserPwd) {
          tip = "两次输入的密码不一致";
        } else {
          tip = "密码格式正确";
          bgClass = true;
        }
        this.reUserPwdTwoTips = tip;
        this.reUserPwdTwoClass = bgClass;
      }
    },
    // 邮箱验证检测
    reUserEmail: {
      handler(newVal) {
        let emailReg = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-zA-Z0-9]{2,5}$/;
        let tipArr = this.formatValidation(newVal, "邮箱", 6, 13, emailReg);
        this.reUserEmailTips = tipArr.tips;
        this.reUserEmailClass = tipArr.bg;
      }
    },
    // 手机号验证
    reUserPhone: {
      handler(newVal) {
        let phoneRgg = /^1[3-9][0-9]\d{8}$/;
        let tipArr = this.formatValidation(newVal, "手机号", 6, 13, phoneRgg);
        this.reUserPhoneTips = tipArr.tips;
        this.reUserPhoneClass = tipArr.bg;
      }
    }
  }
};
</script>
<style scoped>
/* 页面样式属性 */
.login {
  width: 100%;
  height: 623px;
  overflow: hidden;
  position: relative;
}
.login-header img {
  width: 85px;
}
.login-bg img {
  width: 100%;
}
.login-form {
  position: absolute;
  right: 10%;
  top: 32%;
  z-index: 99;
  width: 280px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
}
.login-form .user-name,
.login-form .user-pwd {
  margin-top: 20px;
}
.login-from-content span {
  display: inline-block;
  color: red;
  margin: 5px 0 0 5px;
}
.login-from-heaer {
  border-bottom: 2px solid #fff;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
  padding: 0px 3px;
}
.login-from-heaer span {
  padding-bottom: 4px;
}
.register-text {
  font-size: 12px;
  text-decoration: none;
  color: #fff;
  padding: 0;
  line-height: 28px;
}
.login-from-pwd {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0 6px;
  color: #fff;
}
.login-from-pwd a {
  text-decoration: none;
  color: #fff;
}
.login-from-pwd /deep/ .el-checkbox {
  color: #fff;
}
.login-from-footer {
  margin-top: 16px;
}
.login-from-footer /deep/ .el-button,
.register-button /deep/ .el-button {
  width: 100%;
}
.register-from {
  position: absolute;
  width: 40%;
  height: 70%;
  right: 8%;
  bottom: 6%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  z-index: 99;
}
.register-row {
  margin-top: 23px;
  color: #fff;
}
.register-box-left {
  font-size: 15px;
  margin-top: 8px;
  display: block;
  text-align: right;
}
.register-box-right {
  display: block;
  background-color: #868282;
  border-radius: 3px;
  margin-top: 20px;
  margin-left: 6px;
  text-align: center;
}
.user-erro-bg {
  background-color: #f56c6c;
}
.user-success-bg {
  background-color: #67c23a;
}
</style>
