const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const md5 = require("md5");
// const mysql = require("mysql");

//引入路由器
const user = require("./router/user.js");
const index = require("./router/index.js");
const article = require("./router/article.js");
const hotel = require("./router/hotel.js");

server.use(
  cors({
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:8081",
      "http://localhost:8081"
    ]
  })
);

server.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// 挂载路由
server.use(user);
server.use(index);
server.use(article);
server.use(hotel);

server.listen(3000, () => {
  console.log("server is running...");
});
