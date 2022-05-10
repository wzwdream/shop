<template>
  <div class="install-content">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>自定义装机</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>请选择配件</h2>
    <div class="install-buttons">
      <el-button
        v-for="(item, index) of parts"
        :key="index"
        @click="selectPart(item)"
        >{{ item }}</el-button
      >
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <my-sheet
          @selectPart="selectPart"
          @deleteShop="deleteShop"
          @deleteSheet="deleteSheet"
          :sheets="sheets"
          :updateDate="updateDate"
          :partSheet="partSheet"
        ></my-sheet>
      </el-col>
      <el-col :span="12">
        <my-parts
          @addPart="addPart($event)"
          :part="part"
          :sheets="sheets"
        ></my-parts>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MySheet from "../components/MySheet.vue";
import MyParts from "../components/MyParts.vue";
export default {
  components: { MySheet, MyParts },
  name: "Install",
  data() {
    return {
      parts: [
        "CPU",
        "主板",
        "内存",
        "硬盘",
        "固态硬盘",
        "显卡",
        "机箱",
        "电源",
        "散热器",
        "显示器",
        "声卡"
      ],
      part: "CPU",
      updateDate: "",
      sheets: [
        {
          part: "CPU",
          children: [
            {
              img: "cpu",
              title: "AMD Ryzen 7 5800X",
              num: 1,
              price: 278,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            },
            {
              img: "cpu1",
              title: "Asus/华硕 H81M-V PLUS 115",
              num: 1,
              price: 638,
              isAdd: 0,
              class: {
                芯片组: "A78",
                "AMD CPU接口": "FM2+",
                内存通道: "双通道"
              }
            },
            {
              img: "cpu2",
              title: "Intel/至强E5-2678V3",
              num: 1,
              price: 330,
              isAdd: 0,
              class: {
                "TDP 功率": "125W",
                接口类型: "intel LGA 2011-V3",
                CPU主频: "2.5GHz",
                芯片制程: "22纳米"
              }
            }
          ]
        },
        {
          part: "主板",
          children: [
            {
              img: "zb",
              title: "华硕TUF GAMING",
              num: 1,
              price: 999,
              isAdd: 0,
              class: {
                主芯片组: "Intel B560",
                CPU插槽: "LGA 1200",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            },
            {
              img: "zb1",
              title: "OTIS奥的斯电梯主板",
              num: 1,
              price: 3000,
              isAdd: 0,
              class: {
                主芯片组: "880",
                动态加速频率: "5.8GHz",
                二级缓存: "8x1024KB",
                核心数量: "八核心"
              }
            },
            {
              img: "zb2",
              title: "华硕FL5900U FX-PRO",
              num: 1,
              price: 2850,
              isAdd: 0,
              class: {
                主芯片组: "880",
                动态加速频率: "5.8GHz",
                品牌: "华硕"
              }
            }
          ]
        },
        {
          part: "内存",
          children: [
            {
              img: "nc",
              title: "海盗船复仇者RGB",
              num: 1,
              price: 749,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            },
            {
              img: "nc1",
              title: "金士顿8G台式机电脑内存条",
              num: 1,
              price: 215,
              isAdd: 0,
              class: {
                内存容量: "8GB",
                型号: "DDR4 8G 台式机内存",
                传输类型: "DDR4",
                组合形式: "单条",
                内存频率: "3600MHz 2666MHz 3200MHz",
                是否支持灯光: "RGB"
              }
            },
            {
              img: "nc2",
              title: "三星32G DDR4 2133P 2400T",
              num: 1,
              price: 375,
              isAdd: 0,
              class: {
                内存容量: "32GB",
                型号: "32G DDR4",
                传输类型: "DDR4",
                组合形式: "单条",
                内存频率: "2933MHz 2400MHz 2133",
                是否支持灯光: "不支持"
              }
            }
          ]
        },
        {
          part: "硬盘",
          children: [
            {
              img: "yp",
              title: "希捷Barracuda",
              num: 1,
              price: 278,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "固态硬盘",
          children: [
            {
              img: "gtyp",
              title: "三星980 PRO NVMe",
              num: 1,
              price: 519,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "显卡",
          children: [
            {
              img: "xk",
              title: "七彩虹iGame GeForce RTX",
              num: 1,
              price: 6799,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "机箱",
          children: [
            {
              img: "jx",
              title: "鑫谷开元T1",
              num: 1,
              price: 569,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "电源",
          children: [
            {
              img: "dy",
              title: "航嘉MVP K750（2020版本）",
              num: 1,
              price: 699,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "散热器",
          children: [
            {
              img: "srq",
              title: "酷冷至尊海魔120",
              num: 1,
              price: 279,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "显示器",
          children: [
            {
              img: "xsq",
              title: "AOC U27U2",
              num: 1,
              price: 3799,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        },
        {
          part: "声卡",
          children: [
            {
              img: "skl",
              title: "创新AUDIGY 5",
              num: 1,
              price: 479,
              isAdd: 0,
              class: {
                插槽类型: "Socket AM4",
                CPU主频: "3.8GHz",
                动态加速频率: "4.7GHz",
                二级缓存: "6x512KB",
                三级缓存: "32MB",
                核心数量: "八核心 十六线程"
              }
            }
          ]
        }
      ],
      partSheet: [
        {
          part: "CPU",
          isAdd: 0
        },
        {
          part: "主板",
          isAdd: 0
        },
        {
          part: "内存",
          isAdd: 0
        },
        {
          part: "硬盘",
          isAdd: 0
        },
        {
          part: "固态硬盘",
          isAdd: 0
        },
        {
          part: "显卡",
          isAdd: 0
        },
        {
          part: "机箱",
          isAdd: 0
        },
        {
          part: "电源",
          isAdd: 0
        },
        {
          part: "散热器",
          isAdd: 0
        },
        {
          part: "显示器",
          isAdd: 0
        },
        {
          part: "声卡",
          isAdd: 0
        }
      ]
    };
  },
  methods: {
    selectPart(item) {
      this.part = item;
    },
    deleteShop(index) {
      this.partSheet[index] = {
        part: this.partSheet[index].part,
        isAdd: 0
      };
      this.updateDate = new Date();
    },
    deleteSheet() {
      this.partSheet = [
        {
          part: "CPU",
          isAdd: 0
        },
        {
          part: "主板",
          isAdd: 0
        },
        {
          part: "内存",
          isAdd: 0
        },
        {
          part: "硬盘",
          isAdd: 0
        },
        {
          part: "固态硬盘",
          isAdd: 0
        },
        {
          part: "显卡",
          isAdd: 0
        },
        {
          part: "机箱",
          isAdd: 0
        },
        {
          part: "电源",
          isAdd: 0
        },
        {
          part: "散热器",
          isAdd: 0
        },
        {
          part: "显示器",
          isAdd: 0
        },
        {
          part: "声卡",
          isAdd: 0
        }
      ];
      this.updateDate = new Date();
    },
    addPart(data) {
      const partdata = this.partSheet;
      partdata.forEach((item, index) => {
        if (item.part === this.part) {
          const part = { ...item, ...data };
          part.isAdd = 1;
          partdata[index] = part;
        }
      });
      this.partSheet = partdata;
      this.updateDate = new Date();
    }
  }
};
</script>
<style scoped>
.install-content {
  margin-top: 15px;
}
.install-buttons {
  margin: 15px 0;
}
.install-content h2 {
  margin: 0;
  margin-top: 15px;
  font-size: 16px;
}
.install-buttons /deep/ .el-button + .el-button {
  margin-left: 0;
}
.install-buttons /deep/ .el-button {
  margin-right: 10px;
  margin-top: 10px;
}
</style>
