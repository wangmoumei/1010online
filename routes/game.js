//express.js框架
var express = require('express');
var app = express();

//socket io 模块
var socketIo = require('socket.io');

//新建一个新的chat对象
var game = {};

//io object
game.io = false;
//game set
game.userNum=0;
game.roomNum = 0;


game.initialize = function(http) {
    this.io = socketIo(http);
    this.ioListen();
};

game.ioListen = function() {
    
    var that = this;

    this.io.on('connection', function(socket){
        
        that.createRoom(socket);

        that.joinRoom(socket);

        that.gameStart(socket);

        that.gameRun(socket);
		
		that.gameEnd(socket);

        that.disconnect(socket);

    });
};
