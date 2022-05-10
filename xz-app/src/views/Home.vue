<template>
  <div class="home">
    <div class="home-header">
      <my-menu></my-menu>
    </div>
    <div class="home-content">
      <router-view></router-view>
    </div>
    <div class="home-footer">
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from "../components/MyMenu.vue";
import MyFooter from "../components/MyFooter.vue";

export default {
  name: "Home",
  components: {
    MyMenu,
    MyFooter
  }
};
</script>
<style scoped>
.home {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
.home-content,
.home-header {
  margin: 0 183px;
}
.home-footer {
  background: #fff;
  border-top: 2px solid #e8e8e8;
  margin-top: 40px;
}
</style>
