function game(){
		var obj = this;
		//this.socket = io();
		this.gamenum = 0;
		this.turn = true;
		this.gamebody = d.getElementById('gamebody');
		this.scorebox = d.getElementById('score');
		this.game = d.getElementById('game');
		this.option = [{e:d.getElementById('option1')},{e:d.getElementById('option2')},{e:d.getElementById('option3')}];
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
		[0, 1, 0, 0],
		[0, 1, 1, 1],
		[0, 0, 0, 0]],

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
				if(!obj.turn) return;
				if(!mosedown){
					mosedown = true;
					var x = e.clientX  || e.pageX , y = e.clientY  || e.pageY;
					//document.getElementById('showZB').innerHTML = x + " || " + y + "||" +obj.game.offsetLeft + "||" +obj.game.offsetTop ;
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
					//document.getElementById('showZB').innerHTML =(x-3*obj.size) + " || " + (y-3*obj.size) + "||" +obj.game.offsetLeft + "||" +obj.game.offsetTop ;
					obj.option[obj.opnum].e
					obj.option[obj.opnum].e.style.left = x - obj.game.offsetLeft - obj.size *2 + 'px';
					obj.option[obj.opnum].e.style.top = y - obj.game.offsetTop - obj.size *2 + 'px'; 
				}
			}
			function moveend(e){
				e.preventDefault();
				if(e.changedTouches){e=e.changedTouches[e.changedTouches.length-1];}
				if(!mosedown || !obj.turn) return;
				mosedown = false;
				var x = e.clientX  || e.pageX, y = e.clientY  || e.pageY;
				x-=obj.game.offsetLeft;y-=obj.game.offsetTop
				var col = Math.round((x-2*obj.size)/obj.size);
				var row = Math.round((y-2*obj.size)/obj.size);
				//obj.shape[obj.option[obj.opnum].shape]
				function remove(){}
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
					if(obj.checkend()){
						//cover.click();
						//cover.style.display = "block";
						document.getElementById('endgame').style.display="block";
						var endbox = document.getElementById('endgame').getElementsByTagName("div")[0];
						endbox.style.padding=(height-90)/2+"px 0" ;
					}
				}
				
				//document.getElementById('showZB').innerHTML = (x-3*obj.size) + " || " + (y-3*obj.size)+ "||" +col+ "||" +row ;
				obj.opinit();
			}
			
		}
		this.check = function (col, row) {
                for (var i = 0 ; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
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
						if(obj.shape[obj.option[n].shape][i][j]==1){
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
                if (shape < 0)
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
			else
			alert("没有选中目标");
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
                newbody = newbody.split(",");
                obj.fx(100, 30, function (x) {
                    for (var i = 0; i < 10; i++)
                        for (var j = 0; j < 10; j++)
                            if (obj.body[i][j] != newbody[i * 10 + j])
                                obj.ilst[i * 10 + j].style.opacity = x / 100;
                }, function () {
                    for (var i = 0; i < 10; i++)
                        for (var j = 0; j < 10; j++)
                            if (obj.body[i][j] != newbody[i * 10 + j])
                                (newbody[i * 10 + j] != 0) ? obj.ilst[i * 10 + j].style.background = obj.color[(newbody[i * 10 + j] - 1)] : obj.ilst[i * 10 + j].style.background = "rgb(225,225,225)";
                    obj.fx(30, 100, function (x) {
                        for (var i = 0; i < 10; i++) {
                            for (var j = 0; j < 10; j++) {
                                if (obj.body[i][j] != newbody[i * 10 + j]) {
                                    obj.ilst[i * 10 + j].style.opacity = x / 100;

                                }
                            }
                        }
                    }, function () {
                        for (var i = 0; i < 10; i++)
                            for (var j = 0; j < 10; j++)
                                if (obj.body[i][j] != newbody[i * 10 + j])
                                    obj.body[i][j] = newbody[i * 10 + j];
                    }, 300, .3);
                }, 500, .3);
            };
			this.send = function(num,opt){
				var msg = "";
				switch(num)
				{
					case 0:
						//创建游戏
						obj.socket.emit('create room', msg);
						break;	
					case 1:
						//加入游戏
						break;	
					case 2:
						//开始游戏
						break;	
					case 3:
						//out turn
						obj.turn = false;
						break;	
					case 4:
						//move
						break;	
					case 5:
						//游戏结束
						break;	
					case 6:
						//随机加入游戏
						break;	
				}
			}
			this.receive = function(){
				obj.socket.on('create room', function(msg) {
					//创建一个房间后，获得房间号
				});
				obj.socket.on('join room', function(msg) {
					//加入一个房间后，游戏准备开始
				});
				obj.socket.on('game start', function(msg) {
					//游戏开始后，游戏初始化
					
				});
				obj.socket.on('game run', function(msg) {
					//游戏进行中，获得对方信息
					
				});
				obj.socket.on('in turn', function(msg) {
					//游戏进行中，获得对方信息
					
				});
				obj.socket.on('game end', function(msg) {
					//游戏结束
				});
			}
}