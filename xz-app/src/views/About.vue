<template>
  <div class="about">
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-s-order"></i>学子商城简介
        </template>
        <div>学子商城是xxxx科技有限公司全新打造的B2C（Business-to-Consumer，商业零售)购物平台，旨在整合国内外广大品牌商、生产商，为商家和消费者之间提供一站式产品购销解决方案。学子商城专注经营精品时尚的笔记本、台式电脑、电脑外设、电脑配件等数码产品。</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-s-opportunity"></i> 产品与服务
        </template>
        <div>学子商城是平台型B2C电子商务服务提供商，主要为各大品牌商、生产商商户提供网络渠道产品销售平台。同时，学子商城致力为广大消费者提供“安全、便捷、实惠”优质用户体验的网上购物商城。</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-reading"></i> 服务宗旨
        </template>
        <div>学子商城将秉承“严格把关、三方监管”的准入制度，严格遴选优质商户经营，实行产品质量与服务监管，同时引入了学子网络身份证技术保障购物与支付安全，旨在为广大消费者打造一个“安全、便捷、实惠”的网络购物平台。</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="el-icon-guide"></i> 服务优势
        </template>
        <div class="about-card">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>1、正品保障</span>
            </div>
            <div class="text item">
              学子商城商户所售商品保证100%正品行货，接受买家的监管和学子商城的监管，能够提供国家规定的正规售后服务保障；
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>2、产品如实描述</span>
            </div>
            <div class="text item">
              学子商城商户承诺在商城内对商品本身有关信息如实描述，杜绝欺诈宣传、重复发布商品、发布侵权信息等不规范操作行为；
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>3、七天免费退换货</span>
            </div>
            <div class="text item">
              学子商城商户承诺在商城内对商品本身有关信息如实描述，杜绝欺诈宣传、重复发布商品、发布侵权信息等不规范操作行为；
            </div>
          </el-card>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      
    }
  }
};
</script>
<style scoped>
.about {
  margin-top: 20px;
}
.about /deep/ .el-collapse-item__header {
  font-size: 18px;
  color: #409EFF;
  padding-left: 18px;
}
.about /deep/ .el-collapse-item__content {
  font-size: 16px;
  padding: 0px 20px;
  padding-bottom: 8px;
  text-indent: 25px;
  letter-spacing: 1px;
}
.about-card {
  display: flex;
  justify-content: space-around;
}
.box-card {
  width: 25%;
  height: 300px;
}
.about /deep/ .el-card__header {
  color: #fff;
  background-color: #409EFF;
}
</style>
