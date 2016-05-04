$(function(){
	$('.leftT li a.Rico').mouseover(function(){
		$(this).addClass('icoclick');
		$('.allWeb').css('display','block');
	});
	$('.conleft').mouseleave(function(){
		$('.leftT li a.Rico').removeClass('icoclick');
		$('.allWeb').css('display','none');
	});

	// nav
	$('.navSx').mouseover(function(){
		$('.navSx span.sxDown').css('display','none');
		$('.navshaixuan-list').css('display','block');		
	});
	$('.navbigBox').mouseleave(function(){
		$('.navshaixuan-list').css('display','none');
		$('.navSx span.sxDown').css('display','block');
	});

	// 导航滑动
	// 首页导航

	var Uls=$('.nav-lamu ul');
	var allLi=$('.nav-lamu ul li');
	var indLis=$('.nav-lamu li.lmhover');
	var indLisA=$('.nav-lamu li.lmhover a');
	var indlisGray=$('.nav-lamu li.lmhover .Sgray');
	var indLiwid=$('.nav-lamu li.lmhover').width();
	var indfenWid=$('.nav-lamu li.fenge').width();
	var indhoverWid=$('.nav-hover');
	indhoverWid.css({'left':indfenWid});
	indLisA.eq(0).addClass('on');
	indlisGray.eq(0).addClass('on');
	navAni = indLis[0];
	//navAni.t = 260;
	indLis.mouseenter(function(){
		var self = $(this);
		var n=self.index();	
		var Nnum=Math.floor(n/4);
		var Anileft=(n-Nnum-1)*indLiwid+(Nnum+1)*indfenWid;
		clearTimeout(navAni.timer);
		navAni.timer = setTimeout(function(){
			indhoverWid.stop().animate({left:Anileft+'px'},260);
			self.find('a,span').addClass('on').end().siblings().find('a,span').removeClass('on');
		},250);
				
	});
	indLis.mouseleave(function(){
		clearTimeout(navAni.timer);
	});
	$(".nav-lamu").mouseleave(function() {
		clearTimeout(navAni.timer);
		Onclick();
	});
	indLis.click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).eq(index-1).find('a,span').addClass('on').end().siblings().find('a,span').removeClass('on');
	});
	function Onclick(){
		var index=Uls.find('li.cur').index();
		var self=$(this);
		var Nnum=Math.floor(index/4);
		var Anileft=(index-Nnum-1)*indLiwid+(Nnum+1)*indfenWid;
		indhoverWid.stop().animate({left:Anileft+'px'},200);
		indLis.eq(index-Nnum-1).find('a,span').addClass('on').end().siblings().find('a,span').removeClass('on');
	};


    // 搜索
    function Mouse(){
    	$('.searchLi').mouseenter(function() {
			$('.head-top .searchLi').hide().stop(true,true);
			$('.head-top .searchIn').fadeIn(200);
		});
			$('.searchIn').mouseleave(function () {		
			$('.head-top .searchIn').fadeOut(200).stop(true,true);
			$('.head-top .searchLi').fadeIn(500);
		});
    };
	Mouse();

	$(window).scroll(function(){
		var scrollT=$(window).scrollTop();		
		if(scrollT>40){
			$('.searchLi').unbind("mouseenter");
			$('.searchIn').unbind("mouseleave");
			$('.head-top .searchLi').hide();
			$('.head-top .searchIn').fadeIn(200);
			$('#backTop').fadeIn(100);		
		}else{
			$('.head-top .searchIn').stop(true,true).fadeOut(200);
			$('.head-top .searchLi').show();
			$('#backTop').fadeOut(100);
			Mouse();
		}
	});


    var txt=$('.head-top .Itext');
	txt.on('focus',function () {
	    var selVal='查找服饰流行资讯';
	    txt.stop(true,true).animate({'width':'374px'},300)
	    });
	txt.on('blur', function () {
		var txtVal=$(this).val();
		var defaultVal='查找服饰流行资讯';
		if(txtVal=='' || txtVal == defaultVal){
			$(this).attr('placeholder',defaultVal);
			$(this).stop(true, true).animate({'width':'124px'}, 300)
			}
	    });
	

	//首页contant透明层右侧切换
	var object = $('.box')[0];
	function loadImg (object,data){
		object.i = 0;
		var speedy=8;
		
		if(object.timer!=null){
			object.style.backgroundPosition = '0px\t0px';
			clearInterval(object.timer);
			object.timer = null;
		}
		
		object.timer=setInterval(function(){
			var i=object.i;
			var imgLeft = (i*-102*speedy)+'px';
			object.style.backgroundPosition = imgLeft+'\t'+'0px';
			if(i*speedy>=data){
				clearInterval(object.timer);
				object.timer = null;
				return;
			};
			object.i++;
		},40);
	}
	
	function bigbgtab(bigclass){
	 	var liBox=$(bigclass).find('.bigbg_r');
	 	liBox.each(function(){
	 		 var sel = $(this);
	 		 var selA= sel.find(".list a");
	 		 var lidiv=sel.find('.listBottom li');
			selA.mouseenter(function(){	
				var index=$(this).index();
				loadImg($(this)[0],168);
				var timer;
				var mlb=$(this);
				timer=setTimeout(function(){
					mlb.addClass('acur').siblings('a').removeClass('acur');			    
					lidiv.eq(index).stop(true,true).fadeIn(300).siblings('li').hide();
				}, 200);
			});
	 	});
	 	
	}
	bigbgtab('.index_con1');
	bigbgtab('.index_con2');
	bigbgtab('.index_con3');	


	/*底部广告*/
	$('#footwrap .closebtn').click(function(){
		$('#footwrap').hide();
	})

	/*回到顶部*/
	$('#backTop').click(function(){
		$("html,body").animate({scrollTop: 0}, 1000);
	});

	/*右侧小导航*/
	$(".nav_fixed li").each(function(){
		var sel=$(this);
		sel.hover(function() {
			sel.find("i").stop().show(200).end().find(".show_left").stop().show(200);
		}, function() {
			sel.find("i").stop().hide(100).end().find(".show_left").stop().hide(200);
		});
	});

});
//侧边栏导航编辑
$(function () {
   ;(function ($) {
        $.fn.inputText = function (options) {
            var defaultVal = {
                txt: "请输入搜索关键字",
                lightColor: "#ccc",
                color: "#333",
                fontSize: "12px"
            };
            var obj = $.extend(defaultVal, options);
            return this.each(function () {
                var sel = $(this);
                //sel.css({"color":obj.lightColor,"font-size":obj.fontSize});
                //sel.val(obj.txt);    

            sel.on("focus",function () {
                    if (sel.val() == obj.txt) {
                        sel.val("").css("color", obj.color);
                    }
                    else {sel.css("color", obj.color);}
            });
            sel.on("blur",function () {
                    if ($.trim(sel.val()) === "") {
                        sel.val(obj.txt).css("color", obj.lightColor);
                    }
	       else if(sel.val() !="" && sel.val() != obj.txt ) {
                        sel.css("color", obj.color);
                    }
	       else{
	           sel.css("color", obj.lightColor);
	       }
                });
            });
        }
    })(jQuery);
     var txtVal= $("#txtArea").text();
    $("#txtArea").inputText({
        txt: txtVal,
        lightColor: "#ccc",
        color: "#ccc",
        fontSize: "14px"
    });
  });
