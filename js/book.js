
window.onload =function() {	

			function maxData(data) {
				var maxD = data[0];
				for (var k = 0; k < data.length; k++) {
					if (maxD < data[k]) {
						maxD = data[k];
					}
				}
				return maxD;
			}		

			function waterfallThat(){
				var lieshu = 0,gapNum = 0;

				var wind_w = $(".con_width").width();
				if(wind_w >= 1500){
					lieshu = 6;
					gapNum = 253;
				}
				else{
					lieshu = 5;
					gapNum = 242;
				}

				var ali=$(".picbox li");
				var aMax = [];
				for(var i = 0; i <= ali.length - 1; i++){
					//循环语句
					var shangmianhezigao = 0;
					for(var j = i - lieshu ; j >= 0 ; j = j - lieshu){
						shangmianhezigao = shangmianhezigao + ali.eq(j).outerHeight(true);
						aMax.push(shangmianhezigao + ali.eq(i).outerHeight(true));
					}

					$(".picbox li").eq(i).css(
						{
							"left":i % lieshu * gapNum,
							"top":shangmianhezigao
						}
					);
				}
				$(".picbox").height(maxData(aMax));
			}

			waterfallThat();
			window.onresize = waterfallThat;



}