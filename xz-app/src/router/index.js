import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Index from "../views/Index.vue";
import Computer from "../views/Computer.vue";
import Stationery from "../views/Stationery.vue";
import Parts from "../views/Parts.vue";
import Details from "../views/Details.vue";
import ShopCar from "../views/ShopCar.vue";
import Order from "../views/Order.vue";
import OrderForm from "../views/OrderForm.vue";
import User from "../views/User.vue";
import Favorites from "../views/Favorites.vue";
import OrderDetails from "../views/OrderDetails.vue";
import NotFound from "../views/NotFound.vue";
import Install from "../views/Install.vue";
import message from "element-ui/lib/message";
import Admin from "../views/admin/Admin.vue";
import AdminIndex from "../views/admin/index.vue";
import OrderMenage from "../views/admin/OrderMenage.vue";
import UserManage from "../views/admin/UserManage.vue";
import Evaluate from "../views/Evaluate.vue";
import EvaluateMenage from "../views/admin/evaluateMenage.vue";
import CommodityMenage from "../views/admin/commodityMenage.vue";
import Search from "../views/Search.vue";
import AdminLogin from "../views/admin/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/about",
        name: "About",
        component: About
      },
      {
        path: "/",
        name: "Index",
        component: Index
      },
      {
        path: "/computer",
        name: "Computer",
        component: Computer
      },
      {
        path: "/stationery",
        name: "Stationery",
        component: Stationery
      },
      {
        path: "/parts",
        name: "Parts",
        component: Parts
      },
      {
        path: "/details",
        name: "Details",
        component: Details
      },
      {
        path: "/shopCar",
        name: "ShopCar",
        component: ShopCar
      },
      {
        path: "/order",
        name: "Order",
        component: Order
      },
      {
        path: "/orderForm",
        name: "OrderForm",
        component: OrderForm
      },
      {
        path: "/user",
        name: "User",
        component: User
      },
      {
        path: "/favorites",
        name: "Favorites",
        component: Favorites
      },
      {
        path: "/orderDetails",
        name: "OrderDetails",
        component: OrderDetails
      },
      {
        path: "/install",
        name: "Install",
        component: Install
      },
      {
        path: "/evaluate",
        name: "Evaluate",
        component: Evaluate
      },
      {
        path: "/search",
        name: "Search",
        component: Search
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/AdminLogin",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "/",
        name: "AdminIndex",
        component: AdminIndex
      },
      {
        path: "/admin/OrderMenage",
        name: "OrderMenage",
        component: OrderMenage
      },
      {
        path: "/admin/UserManage",
        name: "UserManage",
        component: UserManage
      },
      {
        path: "/admin/EvaluateMenage",
        name: "EvaluateMenage",
        component: EvaluateMenage
      },
      {
        path: "/admin/CommodityMenage",
        name: "CommodityMenage",
        component: CommodityMenage
      }
    ]
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const pathArr = [
  "/",
  "/login",
  "/about",
  "/computer",
  "/install",
  "/details",
  "/AdminLogin",
  "/admin",
  "/admin/OrderMenage",
  "/admin/UserManage",
  "/admin/EvaluateMenage",
  "/admin/CommodityMenage"
];
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("userid")) return next();
  if (pathArr.includes(to.path)) return next();
  message.warning("请先登录");
  next("/login");
  // this.$message("请先登录");
});
export default router;
