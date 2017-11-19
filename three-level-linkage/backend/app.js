// 入口模块

// 加载模块
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.listen("9000", function(){
  console.log('http://localhost:' + 9000);
});