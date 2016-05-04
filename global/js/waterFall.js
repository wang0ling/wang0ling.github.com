// Javascript

//比较数组大小
function maxData(data) {
	var maxD = data[0];
	for (var k = 0; k < data.length; k++) {
		if (maxD < data[k]) {
			maxD = data[k];
		}
	}
	return maxD;
}
	
//品牌画册列表瀑布流
	function waterfallHuace(rowFlag) {
		var lieshu = 0,gapNum = 0;
		var wind_w = $(".con_width").width();
		if(wind_w >= 1500){
			lieshu = 7;
			gapNum = 220;
		}
		else{
			lieshu = 5;
			gapNum = 250;
		}
		var ali = $(".picbox li");
		var aMax = [];
		if (ali.length <= lieshu) {
			for (var i = 0; i <= ali.length - 1; i++) {
				if(rowFlag == true){
					ali.eq(i).css({"left": i % lieshu * gapNum});
				}
				else if(rowFlag == false){
					ali.eq(i).css({"left": i % lieshu * gapNum, "top": 0});
				}
				aMax.push(ali.eq(i).outerHeight(true));
			}
			$(".picbox").height(maxData(aMax));
			return false;
		}
		for (var i = 0; i <= ali.length - 1; i++) {
			//循环语句
			var shangmianhezigao = 0;
			for (var j = i - lieshu; j >= 0; j = j - lieshu) {
				shangmianhezigao = shangmianhezigao + ali.eq(j).outerHeight(true);
				aMax.push(shangmianhezigao + ali.eq(i).outerHeight(true));
			}
			if(rowFlag == true){
				ali.eq(i).css({"left": i % lieshu * gapNum,"top": shangmianhezigao});
			}
/*			else if(rowFlag == false){
				ali.eq(i).css({"left": i % lieshu * gapNum,"top": shangmianhezigao});
			}*/
			//ali.eq(i).css({"left": i % lieshu * gapNum,"top": shangmianhezigao});

		}
		$(".picbox").height(maxData(aMax));

	}
	$(function(){
	      waterfallHuace(true);
/*            var imgLoad = imagesLoaded( $('.picbox li') );            
		imgLoad.on( 'progress', function( instance, image ) {
		  	waterfallHuace(false); 
		});*/  
		$(window).resize(function(){
			waterfallHuace(false); 
		})
	});
	








