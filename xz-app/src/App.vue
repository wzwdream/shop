<template>
  <div id="app" class="app">
    <el-backtop
      target=".app"
      :right="220"
      :bottom="80"
      :visibility-height="600"
      style="width: 100px"
    >
      <div
        style="
           {
            height: 100%;
            width: 100px;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
            border-radius: 5px;
            font-size: 16px;
          }
        "
      >
        <i class="el-icon-arrow-up"></i>
        回到顶部
      </div>
    </el-backtop>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei", "SimSun", "\5b8b\4f53", "Avenir", Helvetica,
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f5f5f5;
}
.app {
  height: 100vh;
  overflow: hidden;
}
body {
  padding: 0;
  margin: 0;
}
</style>
