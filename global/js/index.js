
$(function(){
	;(function($){
		$.fn.animPic = function(options){
			var defaultVal = {bw:"67%",sw:"33%",anit:500,delayt:200,init0:0};
			var obj = $.extend({},defaultVal,options);
			return this.each(function () {
				var selfBox = $(this);
				var selv = selfBox[0];
				var selfBoxLi = selfBox.find('li.libox');
				selv.bigWidth = selfBoxLi.eq(obj.init0).width();
				selfBoxLi.find(".bigbg").css("left",-selv.bigWidth);				
				selfBoxLi.eq(obj.init0).addClass("bigW");
				
				var showBgTxt = function(sel){
					
					sel.find(".po_box").fadeOut(50);
					//sel.find(".bigbg").show().animate({left: 0},300);
					sel.find(".bigbg").css('left',0).hide();					
					sel.find(".bigbg").fadeIn(obj.anit);
				 }
				 var hideBgTxt = function(sel){
					sel.find(".po_box").show();
					sel.find(".bigbg").stop().hide().css("left",-selv.bigWidth);
				 }				
			    selfBox.on("mouseenter",".libox",function(){
			    	 var self = $(this);
			    	 var selfBoxLi = self.closest('ul').find("li.libox");
			    	 selv.ind = self.index();		    	
			    	 clearTimeout(selv.mouseTimer);
			    	 selv.mouseTimer = setTimeout(function(){
				    	 if(selv.ind != obj.init0 && !self.is(":animated")){
				    	  	//console.log(selv.className+"selv.oldInd:"+selv.oldInd);
				    	  	self.find(".po_box").fadeOut(50);
				    	 	if(selv.oldInd == undefined){			
			    	 			hideBgTxt(selfBoxLi.eq(obj.init0));
				    	 		selfBoxLi.eq(obj.init0).stop(false, true).animate({width:obj.sw},obj.anit);
				    	 		selfBoxLi.eq(selv.ind).stop(false, true).animate({width:obj.bw},obj.anit,function(){
				    	 			showBgTxt(self);
				    	 			selv.oldInd = selv.ind;
				    	 			selfBoxLi.eq(obj.init0).removeClass("bigW");
				    	 		});
				    	 	}
				    	 	if(selv.oldInd == selv.ind){			
			    	 			hideBgTxt(selfBoxLi.eq(selv.oldInd ));
				    	 		selfBoxLi.eq(selv.ind).siblings('li').stop(false, true).animate({width:obj.sw},obj.anit);
				    	 		selfBoxLi.eq(selv.ind).stop(false, true).animate({width:obj.bw},obj.anit,function(){
				    	 			showBgTxt(self);
				    	 			selfBoxLi.eq(obj.init0).removeClass("bigW");
				    	 		});
				    	 	}
				    	 	if(selv.oldInd != undefined && selv.oldInd != selv.ind){
				    	 		hideBgTxt(selfBoxLi.eq(selv.oldInd));
				    	 		selfBoxLi.eq(selv.ind).siblings('li').stop(false, true).animate({width:obj.sw},obj.anit);
				    	 		selfBoxLi.eq(selv.ind).stop(false, true).animate({width:obj.bw},obj.anit,function(){
				    	 			showBgTxt(self);
				    	 			selfBoxLi.eq(obj.init0).removeClass("bigW");
				    	 		});
				    	 	} 
				    	 	selv.oldInd = selv.ind;
				    	 	selfBoxLi.eq(obj.init0).removeClass("bigW");   	 		
			    	 	 }
			    	 	 else if(selv.ind == obj.init0 && !self.is(":animated")){
			    	 	 	if(self.hasClass('bigW')){			    	 	 	
			    	 	 		showBgTxt(self);
			    	 	 	}
			    	 	 	else{
		    	 	 			hideBgTxt(selfBoxLi.eq(selv.oldInd));
			    	 	 		selfBoxLi.eq(selv.oldInd).stop(false, true).animate({width:obj.sw},obj.anit);
				    	 		selfBoxLi.eq(selv.ind).stop(false, true).animate({width:obj.bw},obj.anit,function(){
				    	 			showBgTxt(self);
				    	 			selfBoxLi.eq(obj.init0).addClass("bigW");
				    	 		});
			    	 	 	}
			    	 	 	selv.oldInd = selv.ind;
			    	 	 }
		    	 	 },obj.delayt);
			    });
			
			     selfBox.on("mouseleave",function(){
			    	 var self = $(this);
			    	 var selfBoxLi = self.find("li.libox");
			    	 clearTimeout(selv.mouseTimer);
			    	 if(selv.oldInd !=obj.init0){
			    	 	hideBgTxt(selfBoxLi.eq(selv.oldInd));
			    	 	//console.log(selv.oldInd);
			    	 	selfBoxLi.eq(selv.oldInd).stop().animate({width:obj.sw},obj.anit);
	    	 			selfBoxLi.eq(obj.init0).stop().animate({width:obj.bw},obj.anit);
			    	 }		  
	    	 		else{
	    	 			hideBgTxt(selfBoxLi.eq(obj.init0));
	    	 		}
	    	 		selfBoxLi.eq(obj.init0).addClass("bigW");
	    	 		selv.oldInd = obj.init0;
			    });	
			});
		}
	})(jQuery);

	$(".index_con1").animPic({bw:"67%",sw:"33%",anit:460,delayt:300,init0:0});
	$(".index_con2").animPic({bw:"50%",sw:"25%",anit:300,delayt:250,init0:0});
	$(".index_con3").animPic({bw:"50%",sw:"25%",anit:300,delayt:250,init0:2});
});

