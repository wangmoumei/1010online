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
		
		//that.getScore(socket);
		
		that.logout(socket);
		
        that.disconnect(socket);

    });
};
game.createRoom = function(socket){
    var that = this;
	socket.on('create room', function(msg){
		var myid = socket.id;
		var room = {num:that.roomNum,count:1,status:false,turn:0};
		var roomName = "Game" + that.roomNum;
		that.Room[roomName] = room;
		that.roomLog[myid]=roomName;
		that.Room[roomName][myid] ={ID:1,name:"Player1",score:0};
		var playerlst = [{ID:0},that.Room[roomName][myid]];
		that.roomNum++;
		socket.join(roomName,function(){
			socket.emit('create room', {room:that.Room[roomName].num,playerlst:playerlst});
		});
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
			that.Room[roomName][myid] = {ID:that.Room[roomName].count,name:"Player" + that.Room[roomName].count,score:0};
			socket.join(roomName,function(){
				//console.log(that.getPlayerList(roomName));
				that.io.to(roomName).emit('join room', {num:that.Room[roomName].count,playerlst:that.getPlayerList(roomName)});
				socket.emit('sys mes', "你加入了" + roomName);
			});
		}
		else{
			var room = {num:that.roomNum,count:1,status:false,turn:0};
			that.Room[roomName] = room;
			that.roomLog[socket.id] = roomName;
			that.Room[roomName][socket.id] = {ID:1,name:"Player1",score:0};
			that.roomNum++;
			socket.join(roomName,function(){
				socket.emit('create room', {room:msg,playerlst:that.getPlayerList(roomName)});
				socket.emit('sys mes', "房间" + roomName + "里只有你一个人。");
			});
		}
	});

};
game.gameStart = function(socket){
    var that = this;
	socket.on('game start', function(msg){
		var roomName = that.roomLog[socket.id];
		if(!that.Room[roomName].status){
			if(that.Room[roomName].count<2)
				that.io.to(roomName).emit('sys mes', "人数不足");
			else{
				var playerlst = that.getPlayerList(roomName);
				playerlst[0] = that.Room[roomName][socket.id];
				delete that.Room[roomName][socket.id];
				that.Room[roomName][socket.id] = playerlst[0];
				playerlst = that.getPlayerList(roomName);
				playerlst[0] = that.Room[roomName][socket.id];
				that.io.to(roomName).emit('game start', {start:true,playerlst:playerlst});
				that.Room[roomName].status = true;
			}
		}else{
			that.Room[roomName][socket.id] = msg;
			that.io.to(roomName).emit('game start', {start:false});
		}
	});

};
game.gameRun = function(socket){
	var that = this;
    socket.on('game run', function(msg){
		var roomName = that.roomLog[socket.id];
		switch (msg.type)
		{
			case 0:
			//in turn
				that.io.to(that.roomLog[socket.id]).emit('game run',msg);
			break;
			case 1:
			//out turn
				that.Room[roomName][socket.id].score = msg.score;
				var n = that.Room[roomName].turn;
				var playerlst = that.getPlayerList(roomName);
				n++;if(n >= playerlst.length) n=1;
				that.Room[roomName].turn = n;
				playerlst[0] = playerlst[n];
				msg.playerlst = playerlst;
				console.log("line143 n=" + n);
				console.log(playerlst);
				that.io.to(roomName).emit('game run',msg);
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
		that.Room[that.roomLog[socket.id]].status = false;
	});

};
game.logout = function(socket){
	var that = this;
	socket.on('logout', function(msg){
		var roomName = that.roomLog[socket.id];
		if(that.Room[roomName]){
			//var t = that.Room[roomName][socket.id];
			delete that.Room[roomName][socket.id];
			socket.leave(roomName);
			that.io.to(roomName).emit('sys mes',"有人退出了你的游戏");
			that.io.to(roomName).emit('logout', {playerlst:that.getPlayerList(roomName)});
			delete that.roomLog[socket.id];
			
			if(that.Room[roomName].status && (that.getPlayerList(roomName).length<2)){
				that.Room[roomName].status=false;
				that.io.to(roomName).emit('game end', "失去了与对方的连接");
			}
		}
	});

};
game.disconnect = function(socket){
    var that = this;
	socket.on('disconnect', function(){
		that.userNum--;
		console.log(that.userNum);
		var roomName = that.roomLog[socket.id];
		if(that.Room[roomName]){
			that.Room[roomName].count --;
			that.io.to(roomName).emit('logout', {playerlst:that.getPlayerList(roomName)});
			that.io.to(roomName).emit('sys mes', "失去了与对方的连接");
			socket.leave(roomName);
			delete that.Room[roomName][socket.id]; 
			delete that.roomLog[socket.id]; 
			
			if(that.getPlayerList(roomName).length<2){
				that.Room[roomName].status=false;
				that.io.to(roomName).emit('game end', "失去了与对方的连接");
			}
		}
	});
};
game.getPlayerList = function(roomName){
	var playerlst = [{ID:0}];
	//console.log(this.Room[roomName]);
	if(this.Room[roomName])
		for(var p in this.Room[roomName]){
			//console.log(this.Room[roomName][p]);
			if(typeof (this.Room[roomName][p]) == 'object')	
				playerlst.push(this.Room[roomName][p]);
		}
		
	return playerlst;
};
/*game.getScore = function(socket){
	var that = this;
	socket.on('score board', function(){
		
	});
};*/
var getRoomName = function(msg){
	var n = parseInt(msg);
	if(n>=0) return "Game"+ n;
	else return msg;
};

module.exports = game;