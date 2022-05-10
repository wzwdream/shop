<template>
    <div>
        <div class="order-empty">
            <img src="../assets/images/icon/yhj.png" alt="">
            <p>您还没有相关的优惠券</p>
        </div>
    </div>
</template>

<script>
export default {
  name: "MyCoupon",
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
};
</script>
<style scoped>
.order-empty {
  text-align: center;
  margin: 30px auto;
  font-family: cursive;
  font-size: 16px;
}
.order-empty :nth-child(3) {
    font-size: 12px;
    color: #bdbaba;
}
</style>