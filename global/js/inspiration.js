
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

				var wind_w = $(".w920").width();
				if(wind_w >= 1220){
					lieshu =3;
					gapNum = 404;
				}
				else{
					lieshu = 3;
					gapNum = 304;
				}

				var ali=$(".rightc_main .inspiration li");
				var aMax = [];
				for(var i = 0; i <= ali.length - 1; i++){
					//循环语句
					var shangmianhezigao = 0;
					for(var j = i - lieshu ; j >= 0 ; j = j - lieshu){
						shangmianhezigao = shangmianhezigao + ali.eq(j).outerHeight(true);
						aMax.push(shangmianhezigao + ali.eq(i).outerHeight(true));
					}

					$(".rightc_main .inspiration li").eq(i).css(
						{
							"left":i % lieshu * gapNum,
							"top":shangmianhezigao
						}
					);
				}
				$(".rightc_main .inspiration").height(maxData(aMax));
			}

			waterfallThat();
			window.onresize = waterfallThat;



}