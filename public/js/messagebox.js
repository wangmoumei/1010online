(function(){
	var d = document,w = window,m,n=null;
	w.alertbox = function(str){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('Mes-Content').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Mes-Exit">确定</a>';
		bind();
	}
	 w.messagebox = function(str){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('Mes-Content').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Mes-Exit">我知道了</a>';
		bind();
	}
	 w.confirmbox = function(str,fun){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('Mes-Content').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Mes-Exit">取消</a><a id="Mes-Ensure">确定</a>';
		bind();
		d.getElementById('Mes-Ensure').onclick = function(){
			m.className = "hideMes";
			setTimeout(function(){
				m.style.display = "none";
				fun();
			},600);
		}
	}
	w.promptbox = function(str,fun){
		addscreen();
		d.getElementById('Mes-Content').innerHTML = '<textarea id="Mes-Var" class="Mes-Fill" placeholder="'+str+'"/>';
		d.getElementById('Mes-Btn').innerHTML = '<a id="Mes-Exit">取消</a><a id="Mes-Ensure">提交</a>';
		bind();
		d.getElementById('Mes-Ensure').onclick = function(){
			var variable = d.getElementById('Mes-Var').value;
			m.className = "hideMes";
			setTimeout(function(){
				m.style.display = "none";
				fun(variable);
			},600);
		}
	}
	function addscreen(){
		if(m){
			m.className = 'showMes';
			m.style.display="block";
			return;
		}
		m = d.createElement("div");
		m.id = 'ScreenCover';
		m.className = 'showMes';
		d.body.appendChild(m);
		var screen_height = d.documentElement.clientHeight;
		var screen_width = d.documentElement.clientWidth;
		m.style.height = screen_height+'px';
		m.innerHTML = '<div id="Mes-Box"><div id="Mes-Content"></div><div id="Mes-Btn"></div></div>';
		var b = d.getElementById('Mes-Box');
		var bw = b.clientWidth;
		var bh = b.clientHeight;
		b.style.left =( screen_width - bw ) / 2 + 'px';
		b.style.top =( screen_height - bh ) / 2  + 'px';
	}
	function bind(){
		d.getElementById('Mes-Exit').onclick = function(){
			m.className = "hideMes";
			setTimeout(function(){m.style.display = "none";},600);
		}
	}
	w.noticebox = function(str){
		if(n==null){
			n= d.createElement("ul");
			n.id = "Not-box";
			
			d.body.appendChild(n);
		}
		var nn = d.createElement('li');
		nn.className = "showMes";
		n.appendChild(nn);
		nn.innerHTML = "<div class='Not-box'>"+str+"</div>";
		nn.addEventListener("webkitAnimationEnd",function(){
			var that = this;
			if(this.className == "showMes")	{
				setTimeout(function(){
						that.className = "hideNot"
				},3000);
			}else if(this.className == "hideNot")
				n.removeChild(this);
		});
	}
})()