<template>
  <div class="address">
    <el-card class="box-card" header="收货地址管理" shadow="never">
      <div slot="header" class="clearfix">
        <span>收货地址管理</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="modify('', '01')"
          >新增地址</el-button
        >
      </div>
      <div class="address-content">
        <span>地址标签</span>
        <span>收货人</span>
        <span>详细地址</span>
        <span>联系电话</span>
        <span>操作</span>
      </div>
      <div class="address-form">
        <div
          :class="{
            'address-content': true,
            'address-box': true,
            default: item.isDefault
          }"
          ref="div"
          v-for="(item, index) of receivingAddress"
          :key="index"
        >
          <span>{{ item.addName }}</span>
          <span>{{ item.userName }}</span>
          <span>{{ item.addreses }}</span>
          <span>{{ item.phone }}</span>
          <div>
            <el-button type="text" @click="modify(item, '02')">修改</el-button>
            <el-button type="text" @click="deleteAddress(item)">删除</el-button>
            <el-button
              v-if="item.isDefault === 0"
              type="text"
              @click="setDefault(item)"
              >设为默认</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="收货地址" :visible.sync="dialogVisible">
      <el-form :model="addressDetails" ref="form" label-width="100px">
        <el-form-item
          label="收货人"
          prop="userName"
          :rules="{
            required: true,
            message: '收货人不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="addressDetails.userName"
            placeholder="请输入收货人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收货地址"
          prop="areaModel"
          :rules="{
            required: true,
            message: '收货地址不能为空',
            trigger: 'blur'
          }"
        >
          <el-cascader
            v-model="addressDetails.areaModel"
            placeholder="请选择地区"
            :props="{ expandTrigger: 'hover' }"
            :options="areaData"
            separator="-"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="addreses"
          :rules="{
            required: true,
            message: '详细地址不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="addressDetails.addreses"
            placeholder="请输入详细地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phone"
          :rules="{
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="addressDetails.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="email">
          <el-input
            v-model="addressDetails.email"
            placeholder="请输入邮政编码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地址名称"
          prop="addName"
          :rules="{
            required: true,
            message: '地址名称不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="addressDetails.addName"
            placeholder="请输入地址名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddress">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AreaJson from "../assets/staic/area-full.json";
export default {
  name: "MyAddress",
  data() {
    return {
      receivingAddress: [],
      dialogVisible: false,
      addressDetails: {
        addName: "",
        add_id: "",
        addreses: "",
        email: "",
        isDefault: "",
        phone: "",
        userName: "",
        user_id: "",
        areaModel: []
      },
      areaData: [],
      addAddressType: "01"
    };
  },
  mounted() {
    this.areaData = AreaJson;
    this.getData();
  },
  methods: {
    setDefault(data) {
      this.axios
        .post("/index/setAddressDefault", { add_id: data.add_id })
        .then(res => {
          console.log(res);
          this.getData();
          this.$message.success("设置成功");
        });
    },
    modify(item, type) {
      this.addAddressType = type;
      this.dialogVisible = true;
      if (type === "01") {
        this.addressDetails = {
          addName: "",
          add_id: "",
          addreses: "",
          email: "",
          isDefault: "",
          phone: "",
          userName: "",
          user_id: "",
          areaModel: []
        };
      } else {
        this.addressDetails = item;
      }
    },
    deleteAddress(item) {
      this.$confirm("是否删除该地址?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parmas = {
            add_id: item.add_id
          };
          this.axios.post("/index/deleteAddress", parmas).then(() => {
            this.getData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {});
    },
    getData() {
      let parmas = {
        user_id: sessionStorage.getItem("userid")
      };
      this.axios.post("/index/address", parmas).then(res => {
        this.receivingAddress = res.data.message;
      });
    },
    saveAddress() {
      this.$refs["form"].validate(val => {
        if (val) {
          let adressData = "";
          this.areaData.forEach(element => {
            if (element.value === this.addressDetails.areaModel[0]) {
              adressData += element.label;
              if (element.children) {
                element.children.forEach(item => {
                  if (item.value === this.addressDetails.areaModel[1]) {
                    adressData += item.label;
                    if (item.children) {
                      item.children.forEach(el => {
                        if (el.value === this.addressDetails.areaModel[2]) {
                          adressData += el.label;
                        }
                      });
                    }
                  }
                });
              }
            }
          });
          const parmas = {
            ...this.addressDetails,
            addreses: adressData + this.addressDetails.addreses,
            user_id: sessionStorage.getItem("userid")
          };
          if (this.addAddressType === "01") {
            this.axios.post("/index/addAddress", parmas).then(() => {
              this.dialogVisible = false;
              this.getData();
              this.$message.success("新增成功");
            });
          } else {
            this.axios.post("/index/modifyAddress", parmas).then(() => {
              this.dialogVisible = false;
              this.getData();
              this.$message.success("修改成功");
            });
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address /deep/ .el-card__header {
  padding: 8px 15px;
  font-size: 18px;
  background-image: linear-gradient(#f5f4f5 0%, #e6e6e5 100%);
}
.address-content {
  display: flex;
  text-align: center;
  font-size: 16px;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 4px;
  margin-bottom: 10px;
}
.address-content span {
  display: block;
  line-height: 40px;
}
.address-content span:nth-child(1),
.address-content span:nth-child(2) {
  width: 13%;
}
.address-content span:nth-child(3) {
  width: 35%;
}
.address-content span:nth-child(4) {
  width: 16%;
}
.address-content span:nth-child(5) {
  width: 23%;
}
.address-box {
  border: none;
  padding: 0px;
  margin-top: 10px;
  border-radius: 3px;
  background: #e8e8e8;
}
.address-box div {
  text-align: center;
  width: 23%;
}
.address-box span {
  border-right: 1px solid #fff;
}
.default {
  border: 1px solid #409eff;
}
.default span:first-child {
  background: #409eff;
  color: #fff;
  border: none;
}
</style>
