# 三级联动
## 1.服务器部分 
> 使用node+express构建服务，读取存储数据的json文件，进行相关处理返回给前端。
## 2.前端部分  
+ 缓存  
> 先判断缓存中是否有数据，有则从缓存中读取，没有则从服务器上请求数据  
+ 判读select的change事件  
> 当select的值发生改变时，才去重新读取数据，重新渲染  
+ 初始化  
> 页面初始化时自动请求省份的数据，并取得当前第一位省份的市的数据，然后取得第一个市的区县的数据