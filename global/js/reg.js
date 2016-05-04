$(function(){
	var ofm=document.getElementById('fm');
	var ali=$(ofm).find("li");
	var aipt=ofm.getElementsByTagName('input');
	var aspan=ofm.getElementsByTagName('span');
	var bok=true;
	var time=60;
	var ofreeBtn=$(".PicInfo .freeBtn")[0];
	var oagreeBtn=$("input[name='agree']")[0];
	var timer=null;
	var json={
		username: /^[a-z\u4e00-\u9fa5]{4,20}$/i ,           //用户名
		password: /^.{6,20}$/,								//登录密码
		re_password: /^.{6,20}$/,		                        //确认密码
		truename:/^[a-z\u4e00-\u9fa5]{4,20}$/i ,                 //真实姓名
		cellphone:  /^[1][3,4,5,6,7,8]\d{9}$/,              //联系手机
		check_code:/^[a-zA-Z0-9]{4}$/i,                          //图片验证码
		verifyCode:  /^[a-zA-Z0-9]{4}$/i                         //短信验证码
	
	}

	var arr=['4-20位字符，一个汉字是两个字符','6-20位字符，可由数字、字母、特殊字符组成','6-20位字符，可由数字、字母、特殊字符组成','4-20位字符，一个汉字是两个字符','请输入真实手机号码']


	//输入框失去焦点时验证
	for (var i = 0; i < aspan.length; i++) {
		(function(index){
			aipt[i].onblur=function(){
				for(var key in json){
					for (var i = 0; i < aspan.length; i++) {
						var te=json[key];
						if(this.name==key){
							if(this.value==''){
								$(this).next().show();
								$(this).next().html("不能为空，请输入正确信息");
								bok=false;
							}else if(!te.test(this.value)){
								$(this).next().show();
								$(this).next().html(arr[index])
								bok=false;
							}else{
								$(this).next().hide();
								bok=true;
							}
						}
										
					};
				}
				var passw=aipt[1].value;
				var re_passw=aipt[2];
				if(re_passw.value!=passw){
					$(re_passw).next().html("两次输入的密码不一致")
				}
			}
		})(i);
	};

	//提交时验证
	checkform();
	function checkform(){
		ofm.onsubmit=function(){
			for(var key in json){
				for (var i = 0; i < aspan.length; i++) {
					var te=json[key];
					if(aipt[i].name==key){
						if(aipt[i].value==''){
							$(aipt[i]).next().show();
							$(aipt[i]).next().html("不能为空，请输入正确信息");
							bok=false;
						}else if(!te.test(aipt[i].value)){
							$(aipt[i]).next().show();
							$(aipt[i]).next().html(arr[i])
							bok=false;
						}else{
							bok=true;
						}
					}
									
				};
			}
			
			//同意协议
			if(oagreeBtn.checked){
				bok=true;
			}else{
				bok=false;	
			}

			if(bok==false){
				return false;
			}
		}
	}

	//免费获取激活码

	ofreeBtn.onclick=function(){
		clearInterval(timer);
		timer=setInterval(daojishi, 1000)
	}
	function daojishi(){
		time--;
		ofreeBtn.innerHTML=time+'秒之后可以重新发送';
		if(time<1){
			clearInterval(timer);
			ofreeBtn.innerHTML='免费获取激活码';
		}
	}


})




