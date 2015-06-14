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
game.maxPerson = 5;
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
		console.log(that.userNum);
        that.createRoom(socket);

        that.joinRoom(socket);

        that.gameStart(socket);

        that.gameRun(socket);
		
		that.gameEnd(socket);
		
		that.getScore(socket);
		
		that.logout(socket);
		
        that.disconnect(socket);

    });
};
game.createRoom = function(socket){
    var that = this;
	socket.on('create room', function(msg){
		var myid = socket.id;
		if(msg = 1){
			
			var room = {num:that.roomNum,count:1,status:false};
			var roomname = "Game" + that.roomNum;
			that.Room[roomname] = room;
			that.roomLog[myid]=roomname;
			that.Room[roomname][myid] = {turn:1,name:"Player1"};
			that.roomNum++;
			socket.join(roomname,function(){
				socket.emit('create room', {room:that.Room[roomname].num,player:that.Room[that.roomLog[myid]][myid]});
				
				
			});
		}
	});

};
game.joinRoom = function(socket){
    var that = this;
	socket.on('join room', function(msg){
		var roomName = getRoomName(msg);
		var myid = socket.id;
		if(that.Room[roomName]){
			that.io.to(roomName).emit('sys mes', "新玩家加入了" + roomName);
			that.Room[roomName].count ++;
			that.roomLog[myid] = roomName;
			that.Room[roomName][myid] = {turn:that.Room[roomName].count,name:"Player" + that.Room[roomName].count};
			socket.join(roomName,function(){
				that.io.to(roomName).emit('join room', {num:that.Room[roomName].count,player:that.Room[roomName][myid]});
				socket.emit('sys mes', "你加入了" + roomName);
			});
		}
		else{
			var room = {num:that.roomNum,count:1,status:false};
			that.Room[roomName] = room;
			that.roomLog[socket.id] = roomName;
			that.Room[that.roomLog[socket.id]][socket.id] = {turn:1,name:"Player1"};
			that.roomNum++;
			socket.join(roomName,function(){
				socket.emit('create room', {room:msg,player:that.Room[that.roomLog[socket.id]][socket.id]});
				socket.emit('sys mes', "房间不存在，为你创建了游戏" + roomName);
			});
		}
	});

};
game.gameStart = function(socket){
    var that = this;
	socket.on('game start', function(msg){
		var roomName = that.roomLog[socket.id];
		if(that.Room[roomName].count<2)
			that.io.to(roomName).emit('sys mes', "人数不足");
		else{
			that.io.to(roomName).emit('game start', msg);
			that.Room[roomName][socket.id].turn = 0;
		}
		
	});

};
game.gameRun = function(socket){
	var that = this;
    socket.on('game run', function(msg){
		switch (msg.type)
		{
			case 0:
			//in turn
				that.io.to(that.roomLog[socket.id]).emit('game run',msg);
			break;
			case 1:
			//out turn
				that.Room[that.roomLog[socket.id]][socket.id].score = msg.score;
				that.io.to(that.roomLog[socket.id]).emit('game run',msg);
			break;
			case 2:
			//move
				that.io.to(that.roomLog[socket.id]).emit('game run',msg);
			break;
		}
	});

};
game.gameEnd = function(socket){
	var that = this;
    socket.on('game end', function(msg){
		that.io.to(that.roomLog[socket.id]).emit('game end',msg);
	});

};
game.logout = function(socket){
	var that = this;
	socket.on('logout', function(msg){
		var room = that.roomLog[socket.id];
		if(that.Room[room]){
			that.Room[room].count --;
			socket.leave(that.roomLog[socket.id]);
			that.io.to(that.roomLog[socket.id]).emit('sys mes',"有人退出了你的游戏");
			that.io.to(that.roomLog[socket.id]).emit('logout', that.Room[room].count);
			delete that.roomLog[socket.id];
		}
	});

};
game.disconnect = function(socket){
    var that = this;
	socket.on('disconnect', function(){
		that.userNum--;
		console.log(that.userNum);
		var room = that.roomLog[socket.id];
		if(that.Room[room]){
			that.Room[room].count --;
			that.io.to(that.roomLog[socket.id]).emit('logout', that.Room[room].count);
			that.io.to(that.roomLog[socket.id]).emit('sys mes', "失去了与对方的连接");
			
			socket.leave(that.roomLog[socket.id]);
			
			delete that.Room[that.roomLog[socket.id]][socket.id]; 
			delete that.roomLog[socket.id]; 
			
		}
	});

};
game.getScore = function(socket){
	var that = this;
	socket.on('score board', function(){
		
	});
};
var getRoomName = function(msg){
	var n = parseInt(msg);
	if(n>=0) return "Game"+ n;
	else return msg;
};
module.exports = game;