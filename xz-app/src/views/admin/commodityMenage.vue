<template>
  <div class="box">
    <div class="boxTitle">商品管理</div>
    <div style="text-align: right; padding-right: 20px">
      <el-button type="primary" @click="handle('', '03')">新增商品</el-button>
    </div>
    <div style="padding: 10px">
      <el-table :data="tableData" stripe>
        <el-table-column prop="computer_id" label="商品id" />
        <el-table-column prop="computer_name" label="商品名称" />
        <el-table-column prop="classification" label="商品描述" />
        <el-table-column prop="color" label="商品颜色" />
        <!-- <el-table-column prop="computer_family" label="商品类别"/> -->
        <el-table-column prop="price" label="商品价格" />
        <el-table-column prop="order" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handle(scope.row, '01')"
              >查看</el-button
            >
            <el-button type="text" @click="handle(scope.row, '02')"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
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
      :title="
        type === '01' ? '商品详情' : type === '02' ? '编辑商品' : '新增商品'
      "
      :visible.sync="dialogTableVisible"
    >
      <el-form :model="formData" ref="form" label-width="120px">
        <el-form-item
          label="商品名称"
          prop="computer_name"
          :rules="[
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.computer_name"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="品牌"
          prop="computer_family"
          :rules="[{ required: true, message: '请选择品牌', trigger: 'blur' }]"
        >
          <el-select
            v-model="formData.computer_family"
            placeholder="请选择品牌"
            :disabled="disabled"
          >
            <el-option
              v-for="item in computerArr"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品价格"
          prop="price"
          :rules="[
            { required: true, message: '请输入商品价格', trigger: 'blur' },
          ]"
        >
          <el-input v-model="formData.price" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="cpu型号"
          prop="cpu"
          :rules="[
            { required: true, message: '请输入cpu型号', trigger: 'blur' },
          ]"
        >
          <el-input v-model="formData.cpu" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="显卡内存"
          prop="graphicsSize"
          :rules="[
            { required: true, message: '请输入显卡内存', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.graphicsSize"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="颜色"
          prop="color"
          :rules="[{ required: true, message: '请输入颜色', trigger: 'blur' }]"
        >
          <el-input v-model="formData.color" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="内存"
          prop="memory"
          :rules="[{ required: true, message: '请输入内存', trigger: 'blur' }]"
        >
          <el-input v-model="formData.memory" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="屏幕大小（英寸）"
          prop="size"
          :rules="[
            { required: true, message: '请输入屏幕大小', trigger: 'blur' },
          ]"
        >
          <el-input v-model="formData.size" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item
          label="分辨率"
          prop="resolving_power"
          :rules="[
            { required: true, message: '请输入分辨率', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.resolving_power"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="显卡类型"
          prop="graphicsType"
          :rules="[
            { required: true, message: '请输入显卡类型', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.graphicsType"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="系统"
          prop="computer_system"
          :rules="[{ required: true, message: '请输入系统', trigger: 'blur' }]"
        >
          <el-input
            v-model="formData.computer_system"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述语"
          prop="classification"
          :rules="[
            { required: true, message: '请输入描述语', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="formData.classification"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="硬盘"
          prop="hard_disk"
          :rules="[{ required: true, message: '请输入硬盘', trigger: 'blur' }]"
        >
          <el-input
            v-model="formData.hard_disk"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品缩略图" prop="computers_img">
          <div class="uploadImg" @click="upload('01')">
            <input
              id="uploadInput"
              style="display: none"
              type="file"
              @change="uploadFile($event)"
            />
            <div v-if="!formData.computers_img" class="icon">
              <i class="el-icon-plus"></i>
              <span>上传商品缩略图</span>
            </div>
            <el-image
              v-else
              style="width: 180px; height: 180px"
              :src="formData.computers_img"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="详情介绍图片" prop="detailsImg">
          <div class="uploadImg">
            <input
              id="detailsImg"
              style="display: none"
              type="file"
              @change="uploadFile($event)"
            />

            <div v-if="!formData.detailsImg" class="icon" @click="detailsupload('02')">
              <i class="el-icon-plus"></i>
              <span>上传详情介绍图片</span>
            </div>
            <div v-else class="imgbox">
              <el-image
                style="width: 180px; height: 180px"
                :src="formData.detailsImg"
                :preview-src-list="srcList"
              >
              </el-image>
              <span @click="detailsupload('02')">更换图片</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button v-if="type === '02'" type="primary" @click="save"
          >保 存</el-button
        >
        <el-button v-if="type === '03'" type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CommodityMenage",
  data() {
    return {
      tableData: [],
      total: 0,
      current: 1,
      computerArr: [
        {
          value: "1",
          name: "惠普",
        },
        {
          value: "2",
          name: "小米",
        },
        {
          value: "3",
          name: "华为",
        },
        {
          value: "5",
          name: "联想",
        },
        {
          value: "6",
          name: "华硕",
        },
      ],
      dialogTableVisible: false,
      type: "01",
      formData: {
        classification: "",
        color: "",
        computer_family: "",
        computer_name: "",
        computer_system: "",
        computers_img: "",
        cpu: "",
        detailsImg: "",
        graphicsSize: "",
        graphicsType: "",
        hard_disk: "",
        memory: "",
        price: "",
        resolving_power: "",
        size: ""
      },
      srcList: [],
      uploadtType: "",
    };
  },
  mounted() {
    this.getOrderAll();
  },
  computed: {
    disabled() {
      return this.type === "01";
    },
  },
  methods: {
    getOrderAll() {
      const params = {
        begin: 20 * (this.current - 1),
        end: 20 * this.current - 1,
      };
      this.axios.post("/index/computerAll", params).then((res) => {
        this.tableData = res.data.message;
        this.total = res.data.pageTotal;
      });
    },
    currentChange(event) {
      this.current = event;
      this.getOrderAll();
    },
    handleDelete(row) {
      this.$confirm("确定删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/index/deleteComputer", { computer_id: row.computer_id })
            .then(() => {
              this.$message.success("删除成功");
              this.getOrderAll();
            });
        })
        .catch(() => {});
    },
    handle(row, type) {
      this.type = type;
      if (type === "03") {
        this.formData = {
          classification: "",
          color: "",
          computer_family: "",
          computer_name: "",
          computer_system: "",
          computers_img: "",
          cpu: "",
          graphicsSize: "",
          graphicsType: "",
          hard_disk: "",
          memory: "",
          price: "",
          resolving_power: "",
          size: "",
          detailsImg: "",
        };
        return (this.dialogTableVisible = true);
      }
      this.formData = row;
      this.axios
        .post("/index/computer_details", { name: row.computer_id })
        .then((res) => {
          this.formData.detailsImg = res.data.message[0] && res.data.message[0].details_img;
          this.formData.detailsImg && (this.srcList = [this.formData.detailsImg])
          this.dialogTableVisible = true;
        });
    },
    uploadFile(e) {
      let file = e.target.files[0];
      let parm = new FormData();
      parm.append("icon", file);
      this.axios
        .post("/index/uploadImage", parm, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((res) => {
          this.$message.success(res.data.message);
          if (this.uploadtType === "01"){
            this.formData.computers_img = res.data.img
          } else {
              this.formData.detailsImg = res.data.img
              console.log('333', this.formData.detailsImg)
            this.srcList = [this.formData.detailsImg]
              this.$forceUpdate()
          }
        });
    },
    upload(type) {
      if (this.disabled) return;
      this.uploadtType = type;
      console.log(this.uploadtType, '11111')
      document.getElementById("uploadInput").click();
    },
    detailsupload(type) {
      if (this.disabled) return;
      this.uploadtType = type;
            console.log(this.uploadtType, '2222')
      document.getElementById("detailsImg").click();
    },
    save() {
      console.log(this.formData);
      this.axios.post('/index/modifyComputer', { ...this.formData }).then(() => {
          this.getOrderAll()
          this.$message.success('修改成功')
          this.dialogTableVisible = false
      })
    },
    submit() {
        console.log(this.formData);
        this.axios.post('/index/addComputer', { ...this.formData }).then(() => {
          this.getOrderAll()
          this.$message.success('提交成功')
          this.dialogTableVisible = false
      })
    }
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
.uploadImg {
  width: 200px;
  height: 240px;
  border: 1px dotted #b3b3b3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  cursor: pointer;
}
.imgbox {
  display: flex;
  flex-direction: column;
}
.imgbox > span {
  cursor: pointer;
  color: #409eff;
}
.icon {
  display: flex;
  flex-direction: column;
  font-size: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
