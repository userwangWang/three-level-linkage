// 路由模块

// 加载模块
const express = require("express");
const path = require("path");
const fs = require("fs");

// 创建路由对象
const router = express.Router();

// 将用户的 get 请求 /, 替换为 /index.html
router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
// 将用户的 get 请求 /index, 替换为 /index.html
router.get('/index', function (req, res, next) {
  req.url = '/index.html';
  next();
});
// 把frontend作为静态文件夹暴露出去
router.use(express.static(path.join(__dirname, "../frontend")));



// 获取省
router.get("/provinces", function(req, res){
  let provincesData = null;
  fs.readFile("./data/provinceData.json", "utf-8", function(err, data){
    if(err) {
      console.log(err);
      throw err;
    }
    provincesData = JSON.parse(data);
    res.json({status: 1, result: provincesData});
  });
});

// 获取市
router.get("/city", function(req, res){
  let cityData = null;
  let resultCityData = [];
  fs.readFile("./data/cityData.json", "utf-8", function(err, data){
    if(err){
      console.log(err);
      throw err;
    }
    cityData = JSON.parse(data);
    console.log(req.query);
    // 取itemcode的前两位作为搜索条件
    let condition = (req.query.itemcode + "").substr(0, 2);
    let conditionReg = new RegExp("^(" + condition+ ")");
    for(let i = 0; i < cityData.length; i++){
      if(conditionReg.test(cityData[i].item_code)){
        resultCityData.push(cityData[i]);
      }
    }
    res.json({status: 1, result: resultCityData});
  })
});

// 获取区
router.get("/area", function(req, res){
  let areaData = null;
  let resultAreaData = [];
  fs.readFile("./data/areaData.json", "utf-8", function(err, data){
    if(err){
      console.log(err);
      throw err;
    }
    areaData = JSON.parse(data);
    console.log(req.query);
    let condition = (req.query.itemcode + "").substr(0, 4);
    let conditionReg = new RegExp("^("+ condition +")");
    for(let i = 0; i < areaData.length; i++){
      if(conditionReg.test(areaData[i].item_code)){
        resultAreaData.push(areaData[i]);
      }
    }
    res.json({status: 1, result: resultAreaData});
  })
});

module.exports = router;