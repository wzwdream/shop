<template>
  <div class="box">
    <div class="content">
      <div id="line" style="height: 400px"></div>
      <div id="bar" style="height: 400px"></div>
    </div>
    <div class="content">
      <div id="pie" style="height: 400px"></div>
      <div>
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>待办事项({{ todoList.length }})</span>
          </div>
          <el-empty v-if="todoList.length === 0" description="暂无数据" />
          <div v-else>
            <div class="todolistTitle">
              <span class="num">订单编号</span>
              <span class="name">商品名称</span>
              <span class="total">总价格</span>
              <span class="type">订单状态</span>
              <span class="oprate">操作</span>
            </div>
            <div v-for="item in todoList" :key="item.id" class="todolist">
              <span class="num">{{ item.orders_num }}</span>
              <span class="name">{{ item.computer_name }}</span>
              <span class="total">{{ item.total }}</span>
              <span class="type">{{
                item.order_type === "02" ? "待发货" : "待付款"
              }}</span>
              <el-button
                class="oprate"
                v-if="item.order_type === '02'"
                type="text"
                @click="modifyOrderType(item, '03')"
                >发货</el-button
              >
              <el-button
                class="oprate"
                v-else
                type="text"
                @click="modifyOrderType(item, '06')"
                >取消订单</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "AdminIndex",
  data() {
    return {
      todoList: []
    };
  },
  mounted() {
    this.getTodoListData();
    this.line();
    this.bar();
    this.pie();
  },
  methods: {
    line() {
      let myChart = echarts.init(document.getElementById("line"));
      const option = {
        title: {
          text: "各品牌销量"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["惠普", "小米", "华为", "苹果", "联想", "华硕"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2021/11", "2021/12", "2022/1", "2022/2", "2022/3", "2022/4"]
        },
        yAxis: {
          type: "value",
          name: "销售数量(台)"
        },
        series: [
          {
            name: "惠普",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "小米",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "华为",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "苹果",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "联想",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: "华硕",
            type: "line",
            stack: "Total",
            data: [250, 300, 320, 400, 500, 550, 300]
          }
        ]
      };
      myChart.setOption(option);
    },
    bar() {
      let myChart = echarts.init(document.getElementById("bar"));
      const option = {
        title: {
          text: "各品牌好评率"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["惠普", "小米", "华为", "苹果", "联想", "华硕"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "好评率(%)"
          }
        ],
        series: [
          {
            name: "好评率(%)",
            type: "bar",
            barWidth: "60%",
            data: [58.5, 60.2, 49.9, 55.2, 68.0, 55.8]
          }
        ]
      };
      myChart.setOption(option);
    },
    pie() {
      let myChart = echarts.init(document.getElementById("pie"));
      const option = {
        title: {
          text: "各品牌浏览数"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical", //设置图例的方向
          right: 10,
          top: "center",
          itemGap: 30 //设置图例的间距
        },
        series: [
          {
            name: "浏览数",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 100, name: "惠普" },
              { value: 150, name: "小米" },
              { value: 300, name: "华为" },
              { value: 800, name: "苹果" },
              { value: 500, name: "联想" },
              { value: 200, name: "华硕" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    getTodoListData() {
      this.axios.get("/index/getAllOrder").then(res => {
        console.log("res", res);
        this.todoList = res.data.message;
      });
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
        this.getTodoListData();
      });
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-around;
}
.content > div {
  flex: 1;
  background: #fff;
  margin: 10px;
  padding: 15px;
}
.box-card {
  height: 400px;
  overflow: auto;
}
.box-card ::v-deep .el-card__body,
.el-main {
  height: 300px;
  overflow-y: auto;
}
.todolist,
.todolistTitle {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-bottom: 1px solid rgb(188 185 185 / 50%);
  align-items: center;
}
.todolistTitle {
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.num,
.name {
  width: 30%;
}
.type {
  width: 20%;
}
.total,
.oprate {
  width: 10%;
}
</style>
