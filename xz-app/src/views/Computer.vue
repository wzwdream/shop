<template>
  <my-box :type="'computers'"></my-box>
</template>

<script>
// @ is an alias to /src
import MyBox from "../components/MyBox.vue";
export default {
  name: "Computer",
  components: {
    MyBox
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
