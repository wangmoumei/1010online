(function(){
	var d = document,w = window,m;
	w.alertbox = function(str){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('MessageContent').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Exit">确定</a>';
		bind();
	}
	 w.messagebox = function(str){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('MessageContent').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Exit">我知道了</a>';
		bind();
	}
	 w.confirmbox = function(str,fun){
		addscreen();
		if(str.length < 20) str = '<p style="margin:0;padding:10px 0">'+str+'</p>'; 
		d.getElementById('MessageContent').innerHTML = str;
		d.getElementById('Mes-Btn').innerHTML = '<a id="Exit">取消</a><a id="Ensure">确定</a>';
		bind();
		d.getElementById('Ensure').onclick = function(){
			m.className = "hideMes";
			setTimeout(function(){
				m.style.display = "none";
				fun();
			},600);
		}
	}
	w.promptbox = function(str,fun){
		addscreen();
		d.getElementById('MessageContent').innerHTML = '<textarea id="variable" class="Mes-Fill" placeholder="'+str+'"/>';
		d.getElementById('Mes-Btn').innerHTML = '<a id="Exit">取消</a><a id="Ensure">提交</a>';
		bind();
		d.getElementById('Ensure').onclick = function(){
			var variable = d.getElementById('variable').value;
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
		m.innerHTML = '<div id="MessageBox"><div id="MessageContent"></div><div id="Mes-Btn"></div></div>';
		var b = d.getElementById('MessageBox');
		var bw = b.clientWidth;
		var bh = b.clientHeight;
		b.style.left =( screen_width - bw ) / 2 + 'px';
		b.style.top =( screen_height - bh ) / 2  + 'px';
	}
	function bind(){
		d.getElementById('Exit').onclick = function(){
			m.className = "hideMes";
			setTimeout(function(){m.style.display = "none";},600);
		}
	}
})()