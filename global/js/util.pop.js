/**
 * 弹出层js效果
 */
var POPTOOL = POPTOOL || {};
POPTOOL.pop = {};
POPTOOL.pop.replaceUrl = '';

POPTOOL.pop.popLayer = function (popLayerId, url) {
    if ('pushState' in history) {
        history.pushState(null, null, url);
    } 
    POPTOOL.pop.replaceUrl = url;
    $('html,body').css("overflowY", "hidden");
    popLayerId.show();
};
POPTOOL.pop.render = function (container, templateid, data) {
    var html = template(templateid, data);
    container.html(html);
};


(function ($) {
    var nowUrl = window.location.href;
    var index = 0;
    var total = 0;
    var pop_layer = $('#pop_layer');
    var allPic = $('.allPic');
    var p = $('#J_Search_Para').val();
    var J_ResultContainer = $('#J_ResultContainer');
    var J_LeftRightBtnContainer = $('#J_LeftRightBtnContainer');
    var J_KeywordContainer = $('#J_KeywordContainer');
    var J_DetailContainer = $('#J_DetailContainer');
    var J_SimilarContainer = $('#J_SimilarContainer');
    var J_BigPicContanier = $('#J_BigPicContanier');
    var J_TimeSourceContanier = $('#J_TimeSourceContanier');
    var J_DownNumContanier = $('#J_DownNumContanier');
    var curUrl, resultHei = 0, ruHei = 0, totalNum = 0, pageNum = 1;
    var waterTime = null;
    var scrollFlage = null;
    var selLiPos = 0;
    var body = $('body');
    var J_GetMoreResult = $('#J_GetMoreResult');

    //TDK


    function replaceChangeContent(data) {
        POPTOOL.pop.render(J_LeftRightBtnContainer, 'J_LeftRightBtn', data);
        POPTOOL.pop.render(J_KeywordContainer, 'J_KeysResult', data);
        POPTOOL.pop.render(J_DetailContainer, 'J_DetailResult', data);
        POPTOOL.pop.render(J_SimilarContainer, 'J_SimilarResult', data);
        POPTOOL.pop.render(J_BigPicContanier, 'J_BigPicSrc', data);
        POPTOOL.pop.render(J_TimeSourceContanier, 'J_TimeSource', data);
        POPTOOL.pop.render(J_DownNumContanier, 'J_DownNum_result', data);
        TDK(data.searchKeys);
        review(data.tablename, data.id);
    }

    // 点击图片触发弹层
    allPic.on('click', 'a', function () {
        var self = $(this);
        curUrl = '/?c=detail&column=' + self.data('column') + '&id=' + self.data('priid');
        total = self.data('total');
        index = self.data('index');
        p = $('#J_Search_Para').val();
        var params = {p: p, total: total, pos: index, ajax: true};
        if (self.data('pop') == 1) {
            $.ajax({
                type: "get",
                data: params,
                dataType: "json",
                url: curUrl,
                beforeSend: function () {
                    $("#loadingBg").show();
                },
                success: replaceChangeContent,
                complete: function () {
                    $("#loadingBg").hide();
                }
            });
            //$.getJSON(curUrl, params, replaceChangeContent);
            // ajax 异步加载搜索结果
            pageNum = 1;
            var getMoreParams = {p: p, page: pageNum++, get_more_result: 1};
            $.getJSON(curUrl, getMoreParams, function (res) {
                POPTOOL.pop.render(J_ResultContainer, 'J_SearchResult', res);
                POPTOOL.pop.popLayer(pop_layer, curUrl);
                if ('result' in res) {
                    totalNum = res.total;
                    showResultImg(res.result.length);
                    $(".layerRight .resultBox li").eq(0).addClass('cur').siblings('li').removeClass("cur");
                }
            });
        }
    });


    pop_layer.on("click", ".pop_close", function () {
        pop_layer.hide();
        $('html,body').css("overflowY", "auto");
         if ('pushState' in history) {
            history.replaceState(null, null, nowUrl);
         }
        $("#J_BigImage").attr("src", "");
        selLiPos = 0;
    });

    if (history.pushState) {
        // 浏览器后退按钮 触发关闭按钮点击事件
        window.addEventListener("popstate", function () {
            pop_layer.find('.pop_close').trigger('click');
        });
    }
    //弹出层左右切换
    var keyDrection;
    pop_layer.on("click", ".rightBtn,.leftBtn", function () {
        var self = $(this);
        var curUrl = self.data('link');
        var total = self.data('total');
        var index = self.data('index');
        var params = {p: p, total: total, pos: index, ajax: true};
        $.getJSON(curUrl, params, replaceChangeContent);
        POPTOOL.pop.popLayer(pop_layer, curUrl);
        var selLi = $(".layerRight .resultBox li");
        var resultBoxHei = $(".layerRight .resultBox").height();
        selLi.eq(index).addClass('cur').siblings('li').removeClass("cur");
        if($(".layerRight .resultBox").length<=0) return;
        if(self.hasClass('rightBtn')){
            keyDrection = true;
        }
        else if(self.hasClass('leftBtn')){
            keyDrection = false;
        }
        var liLen = selLi.length;
        var selHei = selLi.eq(index).outerHeight(true);
        var selTop = selLi.eq(index).position().top + selHei;
        var selTopLeft = selLi.eq(index).position().top;
        var boxUlHei = selLi.parent().height();
        var nowScrollT = $(".layerRight .resultBox").scrollTop();
        var selPos =Math.abs(resultBoxHei - (selTop - nowScrollT));
        var scrollT = Math.round(nowScrollT+selPos);
        if(keyDrection){
           if(boxUlHei >resultBoxHei && (nowScrollT+resultBoxHei) < selTop  ){
                $(".layerRight .resultBox").scrollTop(scrollT);
           }
        }
        else{
             if( selTopLeft < nowScrollT ){
                $(".layerRight .resultBox").scrollTop(selTopLeft);
           }
        }
    });

    //弹出层右侧图片搜索结果选中图片
    body.on("click", ".resultBox[data-hook=ajaxChange] li", function () {
        var sel = $(this);
        var aObj = sel.find('img');
        var column = aObj.data('column');
        var id = aObj.data('tableid');
        var index = aObj.data('index');
        var total = aObj.data('total');
        var params = {p: p, total: total, pos: index, ajax: true};
        var locationUrl = '';
        var J_BigImage = $('#J_BigImage');
        if (column == 'brochures') {
            locationUrl = window.location.href;
        } else {
            locationUrl = '/?c=detail&column=' + column + '&id=' + id;
        }
        $.getJSON(locationUrl, params, replaceChangeContent);
        POPTOOL.pop.popLayer(pop_layer, locationUrl);
        $(".layerRight .resultBox li").eq(index).addClass('cur').siblings('li').removeClass("cur");
        if($("#pop_layer").length > 0){
           var resultBoxlayer = $(".layerRight .resultBox");
            var selLi = resultBoxlayer.find("li");
            var resultBoxHei = resultBoxlayer.height();
            if(index%11 == 0 && (index+1) == selLi.length){
                var selH = selLi.eq(index).outerHeight(true);
                var selT = selLi.eq(index).position().top + 2*selH - resultBoxHei;
                $(".layerRight .resultBox").scrollTop(selT);
            }
        }
    });

    // 画册详情页点击右边图片（非弹层)
    body.on("click", ".resultBox[data-hook=ajaxBrochuresChange] li", function () {
        var sel = $(this);
        var aObj = sel.find('img');
        var column = aObj.data('column');
        var id = aObj.data('tableid');
        var index = aObj.data('index');
        var total = aObj.data('total');
        var locationUrl = window.location.href;
        var params = {p: 1, total: total, pos: index, ajax: true};
        var J_BigImage = $('#J_BigImage');
        $.getJSON(locationUrl, params, function (data) {
            J_BigImage.data({tablename: data.tablename, tableid: data.id, smallimgpath: data.smallImgPath}).attr('src', data.bigImgPath);
            J_DownNumContanier.html('下载' + data.downnum);
            // 统计浏览量
            review(data.tablename, data.id);
            $(".layerRight .resultBox li").eq(index).addClass('cur').siblings('li').removeClass("cur");
        });

    });

    // 画册详情页（非弹层)右边图片瀑布流
    if ($('.resultBox').data('hook') == 'ajaxBrochuresChange') {
        var getMoreParams = {p: p, page: 1, get_more_result: 1};
        $.getJSON(window.location.href, getMoreParams, function (data) {
            var html = template('J_BrochuresSearchResult', data);
            POPTOOL.pop.render($('#J_GetMoreResult'), 'J_BrochuresSearchResult', data);
            totalNum = data.total;
            showResultImg(data.result.length);
            $(".layerRight .resultBox li").eq(0).addClass('cur').siblings('li').removeClass("cur");
        });
        pageNum = 2;
    }

    function showResultImg(lilen) {
        var imgUl = $('.pop_layer_page #J_GetMoreResult');
        var ulBox = $('.pop_layer_page .resultBox');
        var J_GMResultHei = 0;
        imagesLoaded($('.pop_layer_page #J_GetMoreResult'), function () {
            waterfallThatAlert();
            J_GMResultHei = imgUl.height();
            if (lilen < totalNum && J_GMResultHei < 310) {
                ulBox.height(J_GMResultHei - 10);
            }
            ulBox.scrollTop(0.1);
            addMoreResult();
        });
    }


    //右侧搜索结果滚动加载更多
    function addMoreResult() {
        var resultLi_template = '<li class="grid"><a href="javascript:void(0);"><img  src="#smallImgPath" data-bigpic="#bigImgPath" data-tablename="#tablename" data-tableid="#tableid" data-index="#index" data-column="#column" data-total="#total"></a></li>';
        var oldTop_r = 0;
        var scrollFlage = true;
        $(".layerRight .resultBox").scroll(function () {
            var self = $(this);
            var scrollT = self.scrollTop();
            var resultUlHei = self.find("ul").outerHeight();
            resultHei = self.height();
            var html = "";
            var fixedHei = parseInt((resultUlHei - resultHei) / 3 * 2);
            var liLen = self.find("li").length;
            if (liLen === totalNum) {
                return;
            }
            //console.log("one1 "+resultUlHei);
            if (scrollFlage == true) {
                if (oldTop_r < scrollT && scrollT >= fixedHei) {//向下滚动
                    scrollFlage = false;
                    var getMoreParams = {p: p, page: pageNum++, get_more_result: 1};
                    $.getJSON(POPTOOL.pop.replaceUrl, getMoreParams, function (data) {
                        var result = data.result;
                        for (var i in result) {
                            if (result.hasOwnProperty(i)) {
                                html += resultLi_template.replace("#smallImgPath", result[i].smallImgPath).replace("#bigImgPath", result[i].bigImgPath).replace("#tablename", result[i].tablename).replace("#tableid", result[i].id).replace("#index", result[i].index).replace("#column", result[i].column).replace("#total", result[i].total)
                            }
                        }
                        $("#J_GetMoreResult").append(html);
                        imagesLoaded($('.pop_layer_page #J_GetMoreResult'), function () {
                            waterfallThatAlert();
                        });
                        scrollFlage = true;
                        oldTop_r = scrollT;
                    });

                }
            }

        });
    }


    //大图缩放拖拽
    function SetImg(obj, maxW, maxH) {//初始化大图图片
        var temp_img = new Image();
        temp_img.onload = function () {
            var imgH = temp_img.height;
            var imgW = temp_img.width;
            //计算图片最大宽度
            if ((imgW > maxW) && (imgW > imgH)) {
                obj.width = maxW;
                obj.height = imgH * (maxW / imgW);
                imgW = obj.width;
                imgH = obj.height;
                if (imgH > maxH) {
                    obj.height = maxH;
                    obj.width = imgW * (maxH / imgH);
                }
            }
            //计算图片最大高度
            if ((imgH > maxH) && (imgH > imgW)) {
                obj.height = maxH;
                obj.width = imgW * (maxH / imgH);
                imgW = obj.width;
                imgH = obj.height;
                if (imgW > maxW) {
                    obj.width = maxW;
                    obj.height = imgH * (maxW / imgW);
                }
            }
            if ((imgW > maxW) && (imgW == imgH)) {
                obj.width = maxW;
                obj.height = imgH * (maxW / imgW);
                imgW = obj.width;
                imgH = obj.height;
                if (imgH > maxH) {
                    obj.height = maxH;
                    obj.width = imgW * (maxH / imgH);
                }
            }
            if ((imgW < maxW || imgW == maxW) && (imgH < maxH || imgH == maxH)) {
                obj.width = imgW;
                obj.height = imgH;
            }
        };
        temp_img.src = obj.src;
    }

    // 初始化弹出层大图图片大小
    var oBigImg = $("#bigImages");
    if (oBigImg.length) {
        var oImg = oBigImg[0];
        var wheelScroll = function (ev) {
            var ev = ev || window.event;
            var zoom = parseInt(oImg.style.zoom, 10) || 100;
            var image = new Image();
            image.src = oImg.src;
            var imgW = oImg.width;
            if (ev.wheelDelta) {
                if (ev.wheelDelta > 0) {
                    $(oImg).addClass("bzoom").removeClass('szoom');
                }
                else {
                    $(oImg).addClass("szoom").removeClass('bzoom');
                }
            }
            else {
                if (-ev.detail > 0) {
                    $(oImg).addClass("bzoom").removeClass('szoom');
                }
                else {
                    $(oImg).addClass("szoom").removeClass('bzoom');
                }
            }

            zoom += ev.wheelDelta ? (ev.wheelDelta / 12) : (-ev.detail);
            imgW = imgW * (zoom / 100);
            if (zoom > 50 && zoom <= 121) {
                oImg.style.cssText = '-moz-transform:scale(' + zoom / 100 + ');-moz-transform-origin: center top 0px;';
                oImg.style.zoom = zoom + "%"; //ff，opera不支持zoom发大缩小
                if (ev.preventDefault) {
                    ev.preventDefault();
                }
                ev.returnValue = false;
            }
            return false;
        };
        if (oImg.addEventListener) {
            /** DOMMouseScroll is for mozilla. */
            oImg.addEventListener('DOMMouseScroll', wheelScroll, false);
        }
        oImg.onmousewheel = wheelScroll;

        oImg.onmousedown = function () {
            if (oBigImg.hasClass("bzoom")) {
                oBigImg.addClass("dragIcon").removeClass('bzoom');
            }
            else if (oBigImg.hasClass("szoom")) {
                oBigImg.addClass("dragIcon").removeClass('szoom');
            }
            oImg.onmouseup = function () {
                oBigImg.addClass("szoom").removeClass('dragIcon');
            }
        };
        $("#draggable").draggable();
    }

    // 点击放大镜按钮
    var isPop_layer = pop_layer.length;
    body.on('click', '.enlarge', function () {
        var bigImages = $("#bigImages");
        var src = $('.bigpic').attr('src');
        $('.layer_bgBlack').show();
        $('.bigImg').show().find('.layerBigPic').attr('src', src);
        SetImg(bigImages[0], 658, 1038);
        bigImages.addClass("szoom");
        intBigImg();
    });

    function intBigImg() {
        var bigImgBox = $("#draggable");
        bigImgBox.css({"left": "50%", "margin-left": "-600px", "top": 0});
        bigImgBox.find("img").css({'-moz-transform': 'scale(1)', "zoom": "100%"});
    }

    /*关闭大图弹层*/
    body.on('click', '.layerClose', function () {
        $('.layer_bgBlack').hide();
        $('.bigImg').hide();
    });


    // 画册点击图片弹层
    $('.huace_list').find('li').on('click', function () {
        var self = $(this);
        var curUrl = self.data('href');
        total = self.data('total');
        var pos = self.data('pos');
        var params = {p: '', total: total, pos: pos, ajax: true};
        if (self.data('pop') == 1) {
            $.ajax({
                type: "get",
                data: params,
                dataType: "json",
                url: curUrl,
                beforeSend: function () {
                    $("#loadingBg").show();
                },
                success: replaceChangeContent,
                complete: function () {
                    $("#loadingBg").hide();
                }
            });
            POPTOOL.pop.popLayer(pop_layer, curUrl);
            //$.getJSON(curUrl, params, replaceChangeContent);
            // ajax 异步加载搜索结果
           /* pageNum = 1;
            var getMoreParams = {p: p, page: pageNum++, get_more_result: 1};
            $.getJSON(curUrl, getMoreParams, function (res) {
                POPTOOL.pop.render(J_ResultContainer, 'J_SearchResult', res);
                $('#J_ResultContainer').find('.resultMore').hide().end().find("h3 .huace").text("画册");
                POPTOOL.pop.popLayer(pop_layer, curUrl);
                totalNum = res.total;
                showResultImg(res.result.length);
                $(".layerRight .resultBox li").eq(0).addClass('cur').siblings('li').removeClass("cur");
            });*/
        }
    });
    //弹出层搜索结果左右切换-键盘左右键，细节切换-键盘上下键，关闭弹出层-键盘ESC
     $(document).keydown(function(event){   
        var event = event ? event: (window.event ? window.event: null);
        if (event && event.keyCode == 37){ //left
            $(".pop_layer_page .leftBtn").trigger("click");
        }           
        if (event && event.keyCode == 39){//right
            $(".pop_layer_page .rightBtn").trigger("click");
        }
        if (event && event.keyCode == 38){ //up
            $(".pop_layer_page .detailBox .prevbtn").trigger("click");
            return false;
        }
        if (event && event.keyCode == 40){//down
            $(".pop_layer_page .detailBox .nextbtn").trigger("click");
             return false;
        }
        if (event && event.keyCode == 27){//esc
            if(($(".collect_layer").is(":hidden") || $(".collect_layer").length <= 0) && $(".bigImg").is(":hidden")){
               $(".pop_layer_page .pop_close").trigger("click");
            }
            else if(!$(".bigImg").is(":hidden")){
                $(".pop_layer_page .layerClose").trigger("click");
            } 
            else{
                return false;
            }
        }
        else{
          return;   
        }       
    });

})(jQuery);

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
//右侧搜索结果瀑布流布局
function waterfallThatAlert() {
    var lieshu = 3;
    var J_GetMoreResult = $("#J_GetMoreResult");
    var aGrid = $("#J_GetMoreResult .grid");
    var aMax = [];
    if (aGrid.length <= lieshu) {
        for (var i = 0; i <= aGrid.length - 1; i++) {
            aGrid.eq(i).css({"left": i % lieshu * 78, "top": 0}).addClass('curGrid');
            aMax.push(aGrid.eq(i).outerHeight(true));
        }
        J_GetMoreResult.height(maxData(aMax));
        return false;
    }
    for (var i = 0; i <= aGrid.length - 1; i++) {
        var shangmianhezigao = 0;
        for (var j = i - lieshu; j >= 0; j = j - lieshu) {
            shangmianhezigao = shangmianhezigao + aGrid.eq(j).outerHeight(true);
            aMax.push(shangmianhezigao + aGrid.eq(i).outerHeight(true));
        }
        aGrid.eq(i).css({"left": i % lieshu * 78, "top": shangmianhezigao}).addClass('curGrid');
    }
    J_GetMoreResult.height(maxData(aMax));
}

function TDK(obj) {
    var picdescribeArr = [];
    var picdescribe;
    $.each(obj, function (key, val) {
        picdescribeArr.push(val.txt);
    });
    picdescribe = picdescribeArr.join('');
    var title = picdescribe + '-POP服饰流行前线';
    document.title = title;
    document.Keywords = picdescribe;
    document.Description = picdescribe;
}
