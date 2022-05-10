<template>
  <div class="userInfoBox">
    <div class="uploadBox" @click="upload">
      <input
        id="uploadInput"
        style="display: none"
        type="file"
        @change="uploadFile($event)"
      />
      <img :src="formData.user_avartar" alt="" />
    </div>
    <el-form
      :model="formData"
      :rules="isModify ? rules : {}"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input :disabled="!isModify" v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input :disabled="!isModify" v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input :disabled="!isModify" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input disabled v-model="formData.password">
          <el-button slot="append" @click="pwdFormVisible = true"
            >修改密码</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="isModify = !isModify">{{
          !isModify ? "编辑" : "取消"
        }}</el-button>
        <el-button v-if="isModify" @click="saveUser" type="primary"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog title="修改密码" :visible.sync="pwdFormVisible">
      <el-form
        :model="pwdForm"
        ref="pwdForm"
        :rules="pwdRules"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="password">
          <el-input v-model="pwdForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="twoNewPassword">
          <el-input v-model="pwdForm.twoNewPassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePwd">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyUser",

  data() {
    var passwordRules = (rule, value, callback) => {
      if (value !== this.pwdForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      formData: {
        username: "",
        user_avartar: "",
        phone: "",
        password: "",
        email: "",
        user_id: ""
      },
      isModify: false,
      pwdFormVisible: false,
      pwdForm: {
        password: "",
        newPassword: "",
        twoNewPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }]
      },
      pwdRules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        twoNewPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: passwordRules, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    saveUser() {
      this.$refs["ruleForm"].validate(val => {
        console.log(val);
        if (val) {
          const params = {
            ...this.formData
          };
          this.axios.post("/users/modifyUser", params).then(() => {
            this.$message.success("修改成功");
            this.isModify = false;
            this.getUser();
          });
        }
      });
    },
    upload() {
      document.getElementById("uploadInput").click();
    },
    uploadFile(e) {
      let file = e.target.files[0];
      let parm = new FormData();
      parm.append("icon", file);
      parm.set("user_id", sessionStorage.getItem("userid"));
      console.log(parm);
      this.axios
        .post("/index/uploadAvatar", parm, {
          headers: { "Content-type": "multipart/form-data" }
        })
        .then(res => {
          this.getUser();
          this.$message.success(res.data.message);
        });
    },
    updatePwd() {
      this.$refs["pwdForm"].validate(val => {
        if (val) {
          const params = {
            ...this.pwdForm,
            user_id: sessionStorage.getItem("userid")
          };
          this.axios.post("/users/updatePwd", params).then(res => {
            // this.formData = res.data.message;
            this.pwdFormVisible = false;
            this.$message(res.data.message);
            // console.log(res);
          });
        }
      });
    },
    getUser() {
      this.axios
        .post("/users/getUser", { user_id: sessionStorage.getItem("userid") })
        .then(res => {
          this.formData = res.data.message;
        });
    }
  }
};
</script>
<style scoped>
.userInfoBox {
  background: #fff;
  padding: 30px;
  /* display: flex;
  justify-content: center; */
}
.uploadBox,
.uploadBox > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 21px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
