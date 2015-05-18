//express.js 框架
var express = require('express');
var app = express();

//基于express.js新建http对象
var http = require('http').Server(app);

//这是一个管理文件路径的模块
var path = require('path');

var game = require('./routes/game');

//设置/public作为存放静态文件（如模块，样式）的文件夹
app.use(express.static(path.join(__dirname, 'public')));

//使‘/’的请求都会输出./public/index.html文件内容
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

//初始化聊天室
game.initialize(http);

//监听2501端口
http.listen(10101, function(){
  console.log('listening on *:10101');
});