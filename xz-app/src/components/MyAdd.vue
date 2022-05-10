<template>
  <!-- 修改弹出框 -->
  <el-dialog
    title="提示"
    :visible.sync="isOpen"
    width="45%"
    center
    @close="close()"
    top="4vh"
  >
    <el-row>
      <el-col :span="4">
        <span style="color: red;">* </span>
        <span>收货人：</span>
      </el-col>
      <el-col :span="19">
        <el-input
          v-model="consignee"
          placeholder="请输入收货人姓名"
          clearable
          style="width:215px;margin-bottom:20px;"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <span style="color: red;">* </span>
        <span>收货地址：</span>
      </el-col>
      <el-col :span="19">
        <el-cascader
          v-model="areaModel"
          placeholder="请选择地区"
          :props="{ expandTrigger: 'hover' }"
          :options="areaData"
          separator="-"
          clearable
          style="margin-bottom:20px;"
        ></el-cascader>
      </el-col>
      <el-col :span="4">
        <span style="color: red;">* </span>
        <span>详细地址：</span>
      </el-col>
      <el-col :span="19">
        <el-input
          type="textarea"
          :rows="3"
          v-model="address"
          placeholder="请输入详细地址"
          clearable
          style="margin-bottom:20px;"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <span style="color: red;">* </span>
        <span>手机号码：</span>
      </el-col>
      <el-col :span="19">
        <el-input
          v-model="phone"
          placeholder="请输入手机号码"
          clearable
          style="width:215px;margin-bottom:20px;"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <span>邮政编码：</span>
      </el-col>
      <el-col :span="19">
        <el-input
          v-model="postalCode"
          placeholder="请输入邮政编码"
          clearable
          style="width:215px;margin-bottom:20px;"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <span>地址名称：</span>
      </el-col>
      <el-col :span="19">
        <el-input
          v-model="addressName"
          placeholder="请输入地址名称"
          clearable
          style="width:215px;margin-bottom:20px;"
        ></el-input>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isOpen = false">取 消</el-button>
      <el-button type="primary" @click="addressSave">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AreaJson from "../assets/staic/area-full.json";
export default {
  name: "MyAdd",
  props: ["dialogVisible", "addressDetails"],
  data() {
    return {
      areaData: [], // 省市区文件
      areaModel: [],
      consignee: "",
      address: "",
      phone: "",
      postalCode: "",
      addressName: "",
      isOpen: false
    };
  },
  methods: {
    addressSave() {
      if (
        this.consignee === "" ||
        this.address === "" ||
        this.phone === "" ||
        this.areaModel.length < 1
      )
        return this.$message("请先输入信息");
      let addresesNa = "";
      let areaData = this.areaData;
      for (let i = 0; i < areaData.length; i++) {
        if (areaData[i].value == this.areaModel[0]) {
          addresesNa += areaData[i].label;
          for (let j = 0; j < areaData[i].children.length; j++) {
            if (areaData[i].children[j].value == this.areaModel[1]) {
              addresesNa += areaData[i].children[j].label;
              if (
                areaData[i].children[j].children &&
                this.areaModel.length > 2
              ) {
                for (
                  let k = 0;
                  k < areaData[i].children[j].children.length;
                  k++
                ) {
                  if (
                    areaData[i].children[j].children[k].value ==
                    this.areaModel[2]
                  ) {
                    addresesNa += areaData[i].children[j].children[k].label;
                  }
                }
              }
            }
          }
        }
      }
      // console.log("选择地址", addresesNa);
      this.$emit("childChecked", {
        consignee: this.consignee,
        phone: this.phone,
        addressName: this.addressName,
        areaModel: addresesNa,
        address: this.address,
        email: this.postalCode,
        type: "save"
      });
      this.isOpen = false;
    },
    close() {
      this.isOpen = false;
      this.$emit("childChecked", {
        dialogVisible: this.isOpen,
        type: "close"
      });
    }
  },
  created() {
    this.areaData = AreaJson;
    console.log(this.areaData);
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        this.isOpen = newVal;
      }
    },
    addressDetails: {
      deep: true,
      handler(newVal) {
        this.consignee = newVal.consignee ? newVal.consignee : "";
        this.phone = newVal.phone ? newVal.phone : "";
        this.addressName = newVal.addressName ? newVal.addressName : "";
        this.areaModel = newVal.areaModel ? newVal.areaModel : "";
        this.address = newVal.address ? newVal.address : "";
      },
      isOpen: {
        depp: true,
        handler(newVal) {
          console.log(newVal);
        }
      }
    }
  }
};
</script>
