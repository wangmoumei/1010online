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

game.Room = [];
game.roomLog = {};

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

		that.inTurn();
		
        that.disconnect(socket);

    });
};
game.createRoom = function(socket){
    var that = this;
	socket.on('create room', function(msg){
		if(msg = 1){
			console.log(socket.id + "创建了房间");
			
			var room = {owner:socket,joner:null,turn:true};
			that.Room[that.roomNum] = room;
			that.gameLog[socket.id] = that.roomNum;
			that.roomNum++;
			socket.join(that.roomNum,function(){
				
				socket.emit('create room', that.gameLog[socket.id]);
				
				
			});
		}
	});

};
game.joinRoom = function(socket){
    var that = this;
	socket.on('join room', function(msg){
		console.log(socket.id + "加入了"+msg+"号房间");
		that.Room[msg].joiner = socket;
		that.gameLog[socket.id] = msg;
		socket.join(msg,function(){
			that.io.to(msg).emit('join room', msg);
		});
		
		
	});

};
game.gameStart = function(socket){
    var that = this;
	socket.on('game start', function(msg){
		if(socket.id == that.Room[msg].joiner.id)that.Room[msg].turn = false;	
		that.io.to(msg).emit('game start', msg);
		console.log("房间号" + msg + "游戏开始");
		socket.emit('in turn', {type:false});
	});

};
game.gameRun = function(socket){
	var that = this;
    socket.on('game run', function(msg){
		var ss;
		if(that.Room[msg.room].turn) ss = that.Room[msg.room].joiner;
		else ss=that.Room[msg.room].owner;
		ss.emit('game run', msg);
	});

};
game.gameEnd = function(socket){
    

};
game.inTurn = function(socket){
    var that = this;
	socket.on('in turn', function(msg){
		var ss;
		if(that.Room[msg.room].turn) ss = that.Room[msg.room].joiner;
		else ss=that.Room[msg.room].owner;
		ss.emit('out turn', msg.opt);
	});

};
game.outTurn = function(socket){
    var that = this;
	socket.on('out turn', function(msg){
		var ss;
		if(that.Room[msg.room].turn) ss = that.Room[msg.room].joiner;
		else ss=that.Room[msg.room].owner;
		ss.emit('in turn', {type:true,body:msg.body});
	});

};
game.disconnect = function(socket){
    

};