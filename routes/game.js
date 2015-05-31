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

game.Room = {};
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
        
		//that.userName[socket.id] = 'Guest' + this.userNum;
		//that.usedName.push('Guest' + this.userNum);
		that.userNum++;
		
        that.createRoom(socket);

        that.joinRoom(socket);

        that.gameStart(socket);

        that.gameRun(socket);
		
		that.gameEnd(socket);

		that.inTurn(socket);
		
		that.logout(socket);
		
        that.disconnect(socket);

    });
};
game.createRoom = function(socket){
    var that = this;
	socket.on('create room', function(msg){
		if(msg = 1){
			
			var room = {name:that.roomNum,count:1,status:false};
			that.Room["Game" + that.roomNum] = room;
			that.roomLog[socket.id]="Game" + that.roomNum;
			that.roomNum++;
			socket.join(that.roomLog[socket.id],function(){
				console.log(socket.id + "创建了房间");
				console.log(that.roomLog);
				socket.emit('create room', that.roomLog[socket.id]);
				
				
			});
		}
	});

};
game.joinRoom = function(socket){
    var that = this;var roomName = "";
	socket.on('join room', function(msg){
		if(typeof msg == 'string') roomName = msg;
		else if(msg == "number") roomName = "Game"+msg;
		if(that.Room[roomName]){
			console.log(socket.id + "加入了"+roomName);
			that.io.to(roomName).emit('sys mes', "新玩家加入了" + roomName);
			that.Room[roomName].count ++;
			console.log(that.Room);
			that.roomLog[socket.id] = roomName;
			socket.join(roomName,function(){
				that.io.to(roomName).emit('join room', that.Room[msg].count);
				socket.emit('sys mes', "你加入了" + roomName);
			});
		}
		else{
			
			
		}
		
	});

};
game.gameStart = function(socket){
    var that = this;
	socket.on('game start', function(msg){
		//if(socket.id == that.Room[msg].joiner.id)that.Room[msg].turn = false;	
		that.io.to(msg).emit('game start', msg);
		console.log(msg + "游戏开始");
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
game.logout = function(socket){
	var that = this;
	socket.on('logout', function(msg){
		var roomNum = that.roomLog[socket.id];
		console.log(socket.id+"离开房间" + "Game" + that.roomLog[socket.id]);
		if(that.Room[roomNum]){
			that.Room[roomNum].count --;
			socket.leave("Game" + that.roomLog[socket.id]);
			that.io.to("Game" +that.roomLog[socket.id]).emit('sys mes',"有人退出了你的游戏");
			that.io.to("Game" +that.roomLog[socket.id]).emit('logout', that.Room[roomNum].count);
			delete that.roomLog[socket.id]; 
		}
	});

};
game.disconnect = function(socket){
    var that = this;
	socket.on('disconnect', function(){
		var roomNum = that.roomLog[socket.id];
		console.log(socket.id+"断开连接");
		console.log(that.Room);
		if(that.Room[roomNum]){
			that.Room[roomNum].count --;
			that.io.to("Game" +that.roomLog[socket.id]).emit('logout', that.Room[roomNum].count);
			that.io.to("Game" +that.roomLog[socket.id]).emit('sys mes', "失去了与对方的连接");
			
			socket.leave("Game" + that.roomLog[socket.id]);
			delete that.roomLog[socket.id]; 
		}
	});

};
module.exports = game;