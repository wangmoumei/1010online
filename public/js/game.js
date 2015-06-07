function game(){
		var obj = this;
		var d=document;
		this.socket = null;
		this.gamenum = 0;
		this.turn = -1;
		this.type=1;
		this.room = "null";
		this.num = 0;
		this.gamebody = d.getElementById('gamebody');
		this.scorebox = d.getElementById('score');
		this.game = d.getElementById('game');
		this.option = [{e:d.getElementById('option1')},{e:d.getElementById('option2')},{e:d.getElementById('option3')},{e:d.getElementById('op-option1')},{e:d.getElementById('op-option2')},{e:d.getElementById('op-option3')}];
		this.ul = [d.getElementsByClassName("chosen-list")[0],d.getElementsByClassName("chosen-list")[1]];
		this.shape = [
		//4格一
		[[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0],
		[0,0,0,0]],
		//2格一
		[[0,0,0,0],
		[1,1,1,0],
		[0,0,0,0],
		[0,0,0,0]],
		//2格一
		[[0,0,0,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]],
		//点
		[[0,0,0,0],
		[0,1,0,0],
		[0,0,0,0],
		[0,0,0,0]],
		//2格1
		[[0,1,0,0],
		[0,1,0,0],
		[0,0,0,0],
		[0,0,0,0]],
		//3格1
		[[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,0,0,0]],
		//4格1
		[[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0]],
		//2格正方形
		[[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]],
		//3格正方形
		[[1,1,1,0],
		[1,1,1,0],
		[1,1,1,0],
		[0,0,0,0]],
		//2×2拐角 左上
		[[0,0,0,0],
		[0,1,1,0],
		[0,1,0,0],
		[0,0,0,0]],
		//2×2拐角 右上
		[[0,0,0,0],
		[0,1,1,0],
		[0,0,1,0],
		[0,0,0,0]],
		//2×2拐角 左下
		[[0,0,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,0,0]],
		//2×2拐角 右下
		[[0,0,0,0],
		[0,0,1,0],
		[0,1,1,0],
		[0,0,0,0]],
		//3×3拐角 左上
		[[1,1,1,0],
		[1,0,0,0],
		[1,0,0,0],
		[0,0,0,0]],
		//3×3拐角 右上
		[[1,1,1,0],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,0,0]],
		//3×3拐角 左下
		[[1,0,0,0],
		[1,0,0,0],
		[1,1,1,0],
		[0,0,0,0]],
		//3×3拐角 右下
		[[0,0,1,0],
		[0,0,1,0],
		[1,1,1,0],
		[0,0,0,0]],
		//L 左上
		[[0,1,1,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,0,0,0]],
		//L 右上
		[[0,1,1,0],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,0,0]],
		//L 左下
		[[0,1,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,0,0]],
		//L 右下
		[[0,0,1,0],
		[0,0,1,0],
		[0,1,1,0],
		[0,0,0,0]],
		

        [[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0]],

        [[0, 0, 0, 0],
		[0, 1, 1, 1],
		[0, 1, 0, 0],
		[0, 0, 0, 0]],

        [[0, 0, 0, 0],
		[0, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0]],
		
		 [[0, 0, 0, 0],
		[1, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0]]
		];
		this.color = ['#ed954b','#dd6555','#e86a82','#5cbdea','#98dc55','#ffc63e'];
		this.opnum = -1;
		//alert(this.shape[1][1][1]);
		this.init = function(){
			obj.score=0;
			obj.score1 = 0;
			obj.scorebox.innerHTML = 0;
			obj.body = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			];
			obj.size = Math.floor(obj.gamebody.clientWidth / 10) ;
			obj.gamebody.style.left = (obj.gamebody.clientWidth - (obj.size * 10 - 2))/2 + 'px';
			obj.optop = obj.size * 10 + 50;
			obj.opsize = Math.floor(obj.gamebody.clientWidth / 14) ;
			obj.side = (obj.gamebody.clientWidth - (obj.opsize * 14 - 1))/2;
			var str = "";
			for(var i=0;i<10;i++){
				for(var j= 0 ;j<10;j++){
					str += "<i style = 'width:"+(obj.size - 2)+"px;height:"+(obj.size - 2)+"px;top:"+i*obj.size+"px;left:"+j*obj.size+"px'></i>";
				}
			}
			obj.gamebody.innerHTML = str;
			obj.ilst = obj.gamebody.getElementsByTagName("i");
			obj.random();
			if(obj.gamenum<1)
				obj.bind();
			obj.gamenum++;
		}
		this.bind = function(){
			eventbind(obj.option[0].e);
			eventbind(obj.option[1].e);
			eventbind(obj.option[2].e);
			function eventbind(element){
				element.addEventListener("mousedown", movestart);
				element.addEventListener("mouseup", moveend);
				element.addEventListener("mousemove", moving);
				element.addEventListener("touchstart", movestart);
				element.addEventListener("touchend", moveend);
				element.addEventListener("touchmove", moving);
			}
			var mosedown = false;
			function movestart(e){
				e.preventDefault();
				if(e.changedTouches){e=e.changedTouches[e.changedTouches.length-1];}
				if(obj.turn!=0) return;
				if(!mosedown){
					mosedown = true;
					var x = e.clientX  || e.pageX , y = e.clientY  || e.pageY;
					if(this.id == "option1") obj.opnum = 0;
					else if(this.id == "option2") obj.opnum = 1;
					else if(this.id == "option3") obj.opnum = 2;
					var element = this;
					obj.fx((obj.opsize),(obj.size),function(x){
						var ilst = element.getElementsByTagName("i");
						for(var i=0;i<ilst.length;i++){
							ilst[i].style.left = Math.floor((i%4)) * x + 'px'; 
							ilst[i].style.top = Math.floor((i/4)) * x + 'px'; 
							ilst[i].style.width=x - 2+"px";ilst[i].style.height=x - 2+"px";
						}
					},function(){},300,.3)
					this.style.height = obj.size * 4 + 'px';this.style.width = obj.size * 4 + 'px';
					this.style.left = x - obj.game.offsetLeft - obj.size *2 + 'px';
					this.style.top = y - obj.game.offsetTop - obj.size *2 + 'px'; 
				}
			}
			function moving(e){
				e.preventDefault();
				if(e.changedTouches){e=e.changedTouches[e.changedTouches.length-1];}
				if(mosedown){
					var x = e.clientX  || e.pageX, 
					y = e.clientY  || e.pageY ;
					obj.option[obj.opnum].e.style.left = x - obj.game.offsetLeft - obj.size *2 + 'px';
					obj.option[obj.opnum].e.style.top = y - obj.game.offsetTop - obj.size *2 + 'px'; 
					if(obj.type) obj.send(4,{x:x,y:y});
				}
			}
			function moveend(e){
				console.log(obj.body);
				e.preventDefault();
				if(e.changedTouches){e=e.changedTouches[e.changedTouches.length-1];}
				if(!mosedown || obj.turn!=0) return;
				mosedown = false;
				var x = e.clientX  || e.pageX, y = e.clientY  || e.pageY;
				x-=obj.game.offsetLeft;y-=obj.game.offsetTop
				var col = Math.round((x-2*obj.size)/obj.size);
				var row = Math.round((y-2*obj.size)/obj.size);
				//obj.shape[obj.option[obj.opnum].shape]
				if(obj.check(col,row)){
					obj.option[obj.opnum].e.innerHTML="";
					obj.scorebox.innerHTML = obj.score;
					for(var i = 0 ;i<4;i++){
						for(var j=0;j<4;j++)
						{
							if(obj.shape[obj.option[obj.opnum].shape][i][j] == 1)
							{
								obj.body[i + row][j + col] = obj.option[obj.opnum].color + 1;
								obj.ilst[(i+row)*10+j+col].style.background = obj.color[obj.option[obj.opnum].color];
							}
						}
					}
					obj.remove();
					if(obj.option[0].e.innerHTML=="" && obj.option[1].e.innerHTML=="" &&obj.option[2].e.innerHTML=="")
						obj.random();
					obj.opnum=-1;
					if(obj.type){
						obj.send(5);
					}else if(obj.checkend()){
						if(obj.gameEnd)obj.gameEnd();
					}
					
				}
				else{
					obj.send(3);
				}
				obj.opinit();
				
				
			}
			
		}
		this.check = function (col, row) {
                for (var i = 0 ; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
						console.log("game check i:" + i + " j:" + j + " row:" + row + " col:" + col);
                        if (i + row < 0 || j + col < 0) {
                            if (obj.shape[obj.option[obj.opnum].shape][i][j] > 0) return false;
                        }
                        else if ((i + row > 9) || (j + col > 9)) {
                            if (obj.shape[obj.option[obj.opnum].shape][i][j] > 0) return false;
                        }
                        else if (obj.body[i + row][j + col] >0 && obj.shape[obj.option[obj.opnum].shape][i][j] > 0)
                            return false;
                    }
                }
                return true;
            }
		this.remove = function () {
                var m = 0, n = [], o = [];
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (obj.body[i][j] > 0) m++;
                    }
                    if (m == 10) n.push(i);
                    m = 0;
                }
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (obj.body[j][i] > 0) m++;
                    }
                    if (m == 10) o.push(i);
                    m = 0;
                }
                if (n.length > 0 || o.length > 0) {
                    // alert("moveIn");
                    for (var i = 0; i < n.length; i++) {
                        for (var j = 0; j < 10; j++) {
                            obj.body[n[i]][j] = 0;
                        }
                    }
                    for (var i = 0; i < o.length; i++) {
                        for (var j = 0; j < 10; j++) {
                            obj.body[j][o[i]] = 0;
                        }
                    }
                    obj.fx(100, 30, function (x) {
                        for (var i = 0; i < n.length; i++) {
                            for (var j = 0; j < 10; j++) {
                                obj.body[n[i]][j] = 0;
                                obj.ilst[n[i] * 10 + j].style.opacity = x / 100;
                            }
                        }
                        for (var i = 0; i < o.length; i++) {
                            for (var j = 0; j < 10; j++) {
                                obj.body[j][o[i]] = 0;
                                obj.ilst[o[i] + j * 10].style.opacity = x / 100;
                            }
                        }
                    }, function () {
                        obj.fx(30, 100, function (x) {
                            for (var i = 0; i < n.length; i++) {
                                for (var j = 0; j < 10; j++) {
                                    obj.ilst[n[i] * 10 + j].style.opacity = x / 100;
                                    obj.ilst[n[i] * 10 + j].style.background = "rgb(225,225,225)";
                                }
                            }
                            for (var i = 0; i < o.length; i++) {
                                for (var j = 0; j < 10; j++) {
                                    obj.ilst[o[i] + j * 10].style.opacity = x / 100;
                                    obj.ilst[o[i] + j * 10].style.background = "rgb(225,225,225)";
                                }
                            }
                        }, function () { }, 300, .3);

                    }, 500, .3);
                }
                var old = obj.score;
                if (n.length > 0 && o.length > 0)
                    obj.score += (n.length + o.length) * 10 * (n.length + o.length) / 2 + obj.option[obj.opnum].num;
                else
                    obj.score += (n.length + o.length) * 10 + obj.option[obj.opnum].num;
                obj.fx(old, obj.score, function (x) { obj.scorebox.innerHTML = Math.floor(x); }, function () { }, 400, .3)

            }
		this.checkend = function(){
			if(obj.option[0].e.innerHTML !="")
				if(!checkop(0)) return false;
			if(obj.option[1].e.innerHTML !="")
				if(!checkop(1)) return false;
			if(obj.option[2].e.innerHTML !="")
				if(!checkop(2)) return false;
			return true;
			function checkop(n){
				for(var i = 0;i<10;i++)
					for(var j=0;j<10;j++){
						if(obj.body[i][j] == 0){
							if(checkop2(i,j,n))
								return false;
							else {
								continue;
								}
						}
						else continue;
					}
				return true;
			}
			function checkop2(x,y,n){
				var posti=0;
				var postj=0;
				var count=0;
				for(var i=0;i<4;i++){
					for(var j=0;j<4;j++){
						if(obj.shape[obj.option[n].shape][i][j]>0){
							count++;
							if(count==1){
								posti=i;
								postj=j;
								continue;
							}
							else {
								if((x+i-posti)>=10||(x+i-posti<0)||(y+j-postj)>=10||(y+j-postj)<0)
										return false
								else if(obj.body[x+i-posti][y+j-postj]==0) continue;
								else return false;
							}
						}
					}
				}
				return true;
			}
		}
		this.random = function(){
			obj.option[0].e.style.top = obj.optop + "px";
			obj.option[1].e.style.top = obj.optop + "px";
			obj.option[2].e.style.top = obj.optop + "px";
			obj.option[0].e.style.left = obj.side + "px";
			obj.option[1].e.style.left = obj.opsize*5 +obj.side+ "px";
			obj.option[2].e.style.left = obj.opsize*10 +obj.side+ "px";
			var x=Math.floor(Math.random()*obj.shape.length),y=Math.floor(Math.random()*obj.shape.length),z=Math.floor(Math.random()*obj.shape.length);
			while(1){if(x == y)y=Math.floor(Math.random()*obj.shape.length);else break;}
			while(1){if(x == z || y == z)z=Math.floor(Math.random()*obj.shape.length);else break;}
			obj.reset(0,x,Math.floor(Math.random()*obj.color.length));
			obj.reset(1,y,Math.floor(Math.random()*obj.color.length));
			obj.reset(2,z,Math.floor(Math.random()*obj.color.length));
		}
		this.reset = function (element, shape, color) {
                if (color < 0)
                    obj.option[element].e.innerHTML = "";
                else {
                    var str = "";
                    var n = 0;
                    for (var i = 0; i < 4; i++)
                        for (var j = 0; j < 4; j++) {
                            str += "<i style='width:" + (obj.opsize - 1) + "px;height:" + (obj.opsize - 1) + "px;left:" + obj.opsize * j + "px;top:" + obj.opsize * i + "px;";
                            if (obj.shape[shape][i][j] > 0) { n++; str += "background:" + obj.color[color]; }
                            str += "'></i>";
                        }
                    obj.option[element].e.innerHTML = str;
                    obj.option[element].shape = shape;
                    obj.option[element].color = color;
                    obj.option[element].num = n;
                }
            }
		this.opinit = function(){
			if(obj.opnum>-1){
				var element = obj.option[(obj.opnum)].e;
				element.style.top = obj.optop + "px";
				element.style.left = obj.opsize * (5*(obj.opnum)) + obj.side + "px";
				element.style.height = obj.opsize * 4 + 'px';element.style.width = obj.opsize * 4 + 'px';
				var ilst = element.getElementsByTagName("i");
				for(var i=0;i<ilst.length;i++){
					ilst[i].style.left = Math.floor((i%4)) * obj.opsize + 'px'; 
					ilst[i].style.top = Math.floor((i/4)) * obj.opsize + 'px'; 
					ilst[i].style.width = obj.opsize - 1 + 'px'; 
					ilst[i].style.height = obj.opsize - 1 + 'px'; 
				}
			}
		};
		this.fx=function(f,t,fn,end,tm,pow){
			var D=Date;
			var d=new D;
			var e;
			var c=tm||240;
			var pow=pow||2;
			return e=setInterval(function (){
				var z=Math.min(1,(new D-d)/c);
				(false===fn(+f+(t-f)*Math.pow(z,pow),z)||z==1) && end && end(clearTimeout(e));
			},10);
		};
		this.bodyinit = function (newbody) {
                //newbody = newbody.split(",");
                obj.fx(100, 30, function (x) {
                    for (var i = 0; i < 10; i++)
                        for (var j = 0; j < 10; j++)
                            if (obj.body[i][j] != newbody[i][j])
                                obj.ilst[i * 10 + j].style.opacity = x / 100;
                }, function () {
                    for (var i = 0; i < 10; i++)
                        for (var j = 0; j < 10; j++)
                            if (obj.body[i][j] != newbody[i][j])
                                (newbody[i][j] != 0) ? obj.ilst[i * 10 + j].style.background = obj.color[(newbody[i][j] - 1)] : obj.ilst[i * 10 + j].style.background = "rgb(225,225,225)";
                    obj.fx(30, 100, function (x) {
                        for (var i = 0; i < 10; i++) {
                            for (var j = 0; j < 10; j++) {
                                if (obj.body[i][j] != newbody[i][j]) {
                                    obj.ilst[i * 10 + j].style.opacity = x / 100;
                                }
                            }
                        }
                    }, function () {
                        for (var i = 0; i < 10; i++)
                            for (var j = 0; j < 10; j++)
                                if (obj.body[i][j] != newbody[i][j])
                                    obj.body[i][j] = newbody[i][j];
                    }, 300, .3);
                }, 500, .3);
            };
			this.send = function(num,opt){
				var msg = "";
				switch(num)
				{
					case 0:
						//创建游戏
						if(!obj.socket){
							obj.socket = io();
							obj.receive();
						}
						obj.socket.emit('create room', obj.type);
						break;	
					case 1:
						//加入游戏
						if(!obj.socket){
							obj.socket = io();
							obj.receive();
						}
						obj.socket.emit('join room', obj.room);
						break;	
					case 2:
						//开始游戏
						obj.socket.emit('game start', obj.turn);
						console.log("send game start"+obj.turn);
						break;	
					case 3:
						//in turn
						
						opt = [{shape:obj.option[0].shape,color:(obj.option[0].e.innerHTML!="")?obj.option[0].color:-1},{shape:obj.option[1].shape,color:(obj.option[1].e.innerHTML!="")?obj.option[1].color:-1},{shape:obj.option[2].shape,color:(obj.option[2].e.innerHTML!="")?obj.option[2].color:-1}];
						obj.socket.emit('game run', {type:0,opt:opt});
						break;	
					case 4:
						//move
						obj.socket.emit('game run', {type:2,opt:opt,opnum:obj.opnum});
						break;	
					case 5:
						//out turn
						obj.socket.emit('game run',{type:1,opt:obj.body});
						break;	
					case 6:
						//游戏结束
						break;
					case 8:
						//logout
						obj.socket.emit('logout', null);
						break;
				}
			}
			this.receive = function(){
				obj.socket.on('create room', function(msg) {
					//创建一个房间后，获得房间号
					obj.room = msg;
					obj.turn = 1;
					if(obj.createRoom)
						obj.createRoom(msg);
				});
				obj.socket.on('join room', function(msg) {
					//加入一个房间后，游戏准备开始
					console.log("join room"+msg);
					obj.num = msg;
					if(obj.turn<0)obj.turn = msg;
					if(obj.joinRoom)
						obj.joinRoom(msg);
				});
				obj.socket.on('game start', function(msg) {
					//游戏开始后，游戏初始化
					console.log("Game start"+msg);
					if(obj.gameStart)obj.gameStart();
					obj.init();
					if(obj.turn > msg)
						obj.turn --;
					else if(msg == obj.turn){
						obj.turn = 0;
						obj.send(3);
					}
				});
				obj.socket.on('game run', function(msg) {
					//游戏进行中，获得对方信息
					console.log(msg);
					console.log(obj.turn);
					if(obj.turn){
						switch(msg.type){
							case 0:
								obj.ul[0].style.display = "none";
								obj.ul[1].style.display = "block";
								obj.reset(3,msg.opt[0].shape,msg.opt[0].color);
								obj.reset(4,msg.opt[1].shape,msg.opt[1].color);
								obj.reset(5,msg.opt[2].shape,msg.opt[2].color);
								obj.option[3].e.style.top = obj.optop + "px";
								obj.option[4].e.style.top = obj.optop + "px";
								obj.option[5].e.style.top = obj.optop + "px";
								obj.option[3].e.style.left = obj.side + "px";
								obj.option[4].e.style.left = obj.opsize*5 +obj.side+ "px";
								obj.option[5].e.style.left = obj.opsize*10 +obj.side+ "px";
							break;
							case 1:
								obj.bodyinit(msg.opt);
								obj.turn --;
								if(!obj.turn){
									obj.send(3);
									obj.ul[1].style.display = "none";
									obj.ul[0].style.display = "block";
								}
							break;
							case 2:
							obj.option[(msg.opnum + 3)].e.style.left = msg.opt.x - obj.game.offsetLeft - obj.size *2 + 'px';
							obj.option[(msg.opnum + 3)].e.style.top = msg.opt.y - obj.game.offsetTop - obj.size *2 + 'px'; 
							break;
						}
					}
					else if(msg.type == 1)obj.turn = obj.num-1;
					else{
						if(obj.checkend()){
							if(obj.gameEnd)obj.gameEnd();
							else alert("游戏结束啦")
						}
					}
					console.log(obj.turn);
				});
				obj.socket.on('game end', function(msg) {
					//游戏结束
				});
				obj.socket.on('logout', function(msg) {
					//游戏结束
					obj.num = msg;
					if(gm.logout)
						gm.logout(msg);
				});
				obj.socket.on('sys mes', function(msg) {
					//游戏结束
					noticebox(msg);
				});
			}
}