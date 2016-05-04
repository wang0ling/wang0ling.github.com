
$(function(){
	//头部轮播
	$(".bannerbox li").eq(0).show();
	$(".jiaobiao li").hover(function(){
		var index=$(this).index();
		$(this).addClass('cur').siblings('li').removeClass('cur');
		$(".bannerbox li").eq(index).stop().fadeIn(200).siblings('li').stop().fadeOut(100);
		num1=index;
	});

	var timer1=setInterval(lun1, 3000);
	var num1=0;
	function lun1(){
		num1++;
		if(num1>$(".jiaobiao li").length-1){num1=0}
		$(".bannerbox li").eq(num1).stop().fadeIn(300).siblings('li').stop().fadeOut(100);
		$(".jiaobiao li").eq(num1).addClass('cur').siblings('li').removeClass('cur');
	}
	$(".bannerbox li").hover(function() {
		clearInterval(timer1);
	}, function() {
		clearInterval(timer1);
		timer1=setInterval(lun1, 3000);
	});



	/*内页左侧列表*/
	$(".searInputbox").focus(function() {
		var $text=$(this).val();
		if($text==this.defaultValue){
			$(this).val("");
		}
	});
	$(".searInputbox").blur(function() {
		var $text=$(this).val();
		if($text==""){
			$(this).val(this.defaultValue);
		}
	});

	$(".leftc_List li").click(function(){
		$(this).addClass('cur').siblings('li').removeClass('cur');
	});
	
	$(".leftc_List li:last").find("a").css("border-bottom","none");

	/*右侧排序*/ 
	$(".paixu li").hover(function() {
		$(this).addClass('hover').find('.showbox').show().end().find('.nav_a').css('border-color','#fff').end().prev('li').find('.nav_a').css('border-color','#fff');
	}, function() {
		$(this).removeClass('hover').find('.showbox').hide().end().find('.nav_a').css('border-color','#c4c4c4').end().prev('li').find('.nav_a').css('border-color','#c4c4c4');
	});

	$('.brand .all_pp .all_con .s_leibie li:last').css('border','none');

	/*栏目筛选*/
	$(".sx_a li").hover(function() {
		$(this).find('.showdiv').stop().slideDown(200).end().siblings('li').find('.showdiv').hide();
	},function(){
		$(this).find('.showdiv').stop().slideUp(200);
	});

	//模拟滚动条
	$('.category_div').wheel();



	$(".showdiv a").click(function(){
		$(this).parent('div').siblings('span').text($(this).text());
		$(this).parent('div').slideUp(200);
	});

	/*时间范围*/	
	$(".category_num a,.category_show a").click(function(){
		$(this).addClass('curclick').siblings('a').removeClass('curclick');
	});
	$(".updateTitle").click(function(){
		$(this).toggleClass('curclick').siblings('div').slideToggle(200);
	});


	//趋势页,品牌库列表hover状态
	function showdiv(classname){ 
		var self=$(classname);
		var sel=self.find('li');
		sel.hover(function() {
			$(this).find('.showdiv').stop().fadeIn(100);
		}, function() {
			$(this).find('.showdiv').stop().fadeOut(200);
		});
	}
	showdiv('.trend');
	showdiv('.updata_list');

	//趋势页内容
	$(".trend .cenIconText").each(function() {
		var spanHeight = $(this).height();
		var topN = Math.floor(spanHeight/2);
		$(this).css("marginTop",-topN+"px");        
    });

	$(".trend .textDetail").each(function() {
		var briefingHtml=$(this).html();
		var briefingLenght=briefingHtml.length;
		if (briefingLenght>80) {
			briefingHtml = briefingHtml.substring (0,80)+"...";
			$(this).html(briefingHtml);
		};
	 });


	


});