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
    console.log('initialize');
    this.io = socketIo(http);
    this.ioListen();
};

game.ioListen = function() {
    console.log('ioListen');
    var that = this;

    this.io.on('connection', function(socket){
        
		that.userName[socket.id] = 'Guest' + this.userNum;
		that.usedName.push('Guest' + this.userNum);
		that.userNum++;
		
        that.createRoom(socket);

        that.joinRoom(socket);

        that.gameStart(socket);

        that.gameRun(socket);
		
		that.gameEnd(socket);

        that.disconnect(socket);

    });
};
game.createRoom = function(socket){
    var that = this;
	//绑发消息的事件,客户端发消息的时候就来激活这个
	socket.on('create room', function(msg){
		//msg = that.userName[socket.id] + ': ' + msg;
		console.log(socket.id + "|" +msg);
		//先把发消息的人从这个房间范围里踢出去，目的是 为了另外单独向这个人发带标志的消息,避免重复显示
		socket.leave(that.Room[that.currentRoom[socket.id]].name,function(){
			//只向这个房间范围的客户端广播,用到io.to(范围).emit
			that.io.to(that.Room[that.currentRoom[socket.id]].name).emit('chat message', {name:that.userName[socket.id],msg:msg});
			
			//单独发消息，新加个 chat myself，右对齐哒
			socket.emit('chat myself', {name:that.userName[socket.id],msg:msg});
			
			//再把他加回来(*•̀ㅂ•́)و
			socket.join(that.Room[that.currentRoom[socket.id]].name);
			
			
		});
		
		
	});

};
game.joinRoom = function(socket){
    

};
game.gameStart = function(socket){
    

};
game.gameRun = function(socket){
    

};
game.gameEnd = function(socket){
    

};
game.disconnect = function(socket){
    

};