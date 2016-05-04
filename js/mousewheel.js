$.fn.wheel=function(option){
	option=option||{};
	option.mousewheel=option.mousewheel||true;
	option.con=option.con||{};


	this.each(function(index, el) {
		var $this=$(el);
		var obarpar=$(el.children[1]);
		var ocon=$(el.children[0]);
		var obar=$(el.children[1].children[0]);	
		var ouk=$this.children('ul');

		var pli=ouk.find("li");
        pli.click(function(t){
            var num=-$(this).position().top;
            if(num<ouk.parent().height()-ouk.height()) num=ouk.parent().height()-ouk.height();
            $(this).addClass('cur').siblings().removeClass('cur');
            ouk.stop().animate({'top':num});
			var t=ouk.position().top/(ouk.parent().height()-ouk.height());
            obar.stop().animate({'top':t*(obarpar.height()-obar.height())+'px'});
        })

		//var stinf = $.exrend({},{},{});
		obar.mousedown(function(event) {
			//var disx=pageX-obar.offset().left;
			var disy=event.pageY-obar.position().top;
			$(document).mousemove(move);
			$(document).mouseup(up)
			function move(event){
				var t=event.pageY-disy;
				setPos(t);
			}

			function up(event){
				//alert(0)
				$(document).unbind('mousemove',move);
				$(document).unbind('mouseup',up);
				obar.releaseCapture && obar.releaseCapture();
			};
			obar.setCapture && obar.setCapture();
			return false;

		});

		function setPos(t){
			if(t<0) t=0;
			if(t>obarpar.height()-obar.height()) t=obarpar.height()-obar.height();
			obar.css({'top':t+'px'});
			scale=obar.position().top/(obarpar.height()-obar.height());
			ocon.css('top',scale*($this.height()-ocon.height())+'px');
		}

		if(option.mousewheel){
			addMouseWheel(el,function(down){
					var t=obar.position().top;				
					if(down){
						t+=10;	
					}else{
						t-=10;
					}
					setPos(t);
			});
		}
	});
}



$(function(){
	var bigpicbox=$("#draggable");
    var bigpic=$("#bigImages");
    bigpic.mousedown(function(event) {
    	bigpic.removeClass('bzoom,szoom').addClass('dragIcon');
        var disx=event.pageX-bigpicbox.position().left;
        var disy=event.pageY-bigpicbox.position().top;
        $(document).mousemove(move);
        $(document).mouseup(up);
        function move(event){
        	var l=event.pageX-disx; 
            var t=event.pageY-disy;               
            setPos(l,t)

        }
        function up(event){
            $(document).unbind('mousemove',move);
            $(document).unbind('mouseup',up);
            bigpic.releaseCapture && bigpic.releaseCapture();
            bigpic.removeClass('dragIcon,bzoom,szoom');
        };
        bigpic.setCapture && bigpic.setCapture();
        return false;

    });
    function setPos(l,t){
    	bigpicbox.css({'left':l+'px','top':t+'px'});
    }

}); 

function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox')!= -1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		if(ev.wheelDelta){//chrome
			var down=ev.wheelDelta<0?true:false;
		}else{//ff
			var down=ev.detail>0?true:false;	
		}
		fn(down);
		ev.preventDefault && ev.preventDefault();
		return false;	
	}
}

