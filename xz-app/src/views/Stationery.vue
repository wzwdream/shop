<template>
  <my-box :type="'stationery'"></my-box>
</template>

<script>
// @ is an alias to /src
import MyBox from '../components/MyBox.vue';
export default {
  name: "Stationery",
  components: {
    MyBox
  },
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

