function stopPropagation(e) {
  var e = e || window.event;
  if (e.stopPropagation) { //W3C阻止冒泡方法
    e.stopPropagation();
  } else {
    e.cancelBubble = true; //IE阻止冒泡方法
  }
}


function SetImg(obj, maxW, maxH) { //初始化大图图片
  var temp_img = new Image();
  temp_img.onload = function() {
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

function downpic(obj) {
  var path = $(obj).attr('data-path');
  var column = $(obj).attr('data-column');
  var id = $(obj).attr('data-id');
  time(obj);
  if (window.parent == window) {
    down(path, column, id);
  } else {
    parent.down(path, column, id);
  }
  $('#downnum').html($('#downnum').html() - 0 + 1);
}
var wait = 3;

function time(o) {
  if (wait === 0) {
    $(o).click(function() {
      downpic(this);
    });
    wait = 3;
    //$('.downbtn').addClass('top_bg');
    //$('.downbtn').css('padding-left','30px');
    //$('#downtxt').html('下载');
  } else {
    //$('.downbtn').removeClass('top_bg');
    //$('.downbtn').css('padding-left','6px');
    //$('#downtxt').html('等待(' + wait + 's)');
    $(o).unbind();
    wait--;
    setTimeout(function() {
        time(o);
      },
      1000);
  }
}
//收集按钮可用
//0表示禁止，1表示新收藏，2表示update
var allowcollect = 1;
$(document).ready(function() {
  /*点击放大出现大图弹层*/
  var $layerimg = $('.layerBigPic');
  var $collectPic = $('.collectPic');
  $collectPic.attr('src', $('#J_BigImage').attr('data-smallpic'));
  /*showResultImg($('#J_GetMoreResult li').size());*/
  $('.enlarge').click(function() {
    $('.layer_bgBlack').show();
    $('.bigImg').show().find('.layerBigPic').attr('src', $('#J_BigImage').attr('src'));
    SetImg($("#bigImages")[0], 658, 1038);
    $("#bigImages").addClass("szoom");
    intBigImg();
  });

  function intBigImg() {
    var bigImgBox = $("#draggable");
    bigImgBox.css({
      "left": "50%",
      "margin-left": "-600px",
      "top": 0
    });
    bigImgBox.find("img").css({
      '-moz-transform': 'scale(1)',
      "zoom": "100%"
    });
  }
  var oBigImg = $("#bigImages");
  if (oBigImg.length) {
    var oImg = oBigImg[0];

    function wheelScroll(ev) {
      var ev = ev || window.event;
      var zoom = parseInt(oImg.style.zoom, 10) || 100;
      var image = new Image();
      image.src = oImg.src;
      var imgW = oImg.width;
      if (ev.wheelDelta) {
        if (ev.wheelDelta > 0) {
          $(oImg).addClass("bzoom").removeClass('szoom');
        } else {
          $(oImg).addClass("szoom").removeClass('bzoom');
        }
      } else {
        if (-ev.detail > 0) {
          $(oImg).addClass("bzoom").removeClass('szoom');
        } else {
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
    }


    if (oImg.addEventListener) {
      /** DOMMouseScroll is for mozilla. */
      oImg.addEventListener('DOMMouseScroll', wheelScroll, false);
    }
    oImg.onmousewheel = wheelScroll;

    oImg.onmousedown = function() {
      var oBigImg = $("#bigImages");
      if (oBigImg.hasClass("bzoom")) {
        oBigImg.addClass("dragIcon").removeClass('bzoom');
      } else if (oBigImg.hasClass("szoom")) {
        oBigImg.addClass("dragIcon").removeClass('szoom');
      }
      oImg.onmouseup = function() {
        oBigImg.addClass("szoom").removeClass('dragIcon');
      };
    };
    $("#draggable").draggable();
  }
  /*关闭大图弹层*/
  $('.layerClose').click(function() {
    $('.layer_bgBlack').hide();
    $('.bigImg').hide();
  });

  /*收集到工作台*/
  var collectDoc = $('.collect_layer');
  $('.layerLeft_top').on("click", ".collect", function(ev) {

	//trial member
	var power = parseInt( $(this).data('power') );
	if( !power ) {
		$('.layer_bg').show();
		collectSureBox.find( 'p' ).html( '此功能目前只对VIP用户开放' );
		collectSureBox.show();
		collectSureBoxHide();return false;
	}
    $('.layer_bg').show();
    $(".collect_layer .dynamicTip[important='0']").hide();
    checkselection($("#tabName"), ev);
    collectDoc.show();
  });

  collectDoc.on("click", ".close", function() {
    $('.layer_bg').hide();
    collectDoc.hide();
  });
  collectDoc.on("click", ".selections", function(ev) {
    $('.selectionList').show();
    stopPropagation(ev);
  });
  collectDoc.on("focus", ".create", function(ev) {
    var sel = $(this);
    var cratabInVal = $.trim(sel.val());
    if (cratabInVal == "快速创建一个新的工作台") {
      sel.css("color", "#3f3f3f").val("");
    }
  });
  collectDoc.on("blur", ".create", function(ev) {
    var sel = $(this);
    var cratabInVal = $.trim(sel.val());
    if (cratabInVal == "") {
      sel.css("color", "#999");
      sel.val("快速创建一个新的工作台");
    } else {
      sel.css("color", "#3f3f3f");
    }
  });
  collectDoc.on("click", function() {
    $('.selectionList').hide();
    $(".selectionList .create").css("color", "#999").val("快速创建一个新的工作台");
  });
  collectDoc.on("click", ".selectionList li", function(ev) {
    checkselection(this, ev);
  });
  collectDoc.on("click", ".creatBtn", function(ev) {
    var selTxt = $.trim($(this).prev(".create").val());
    if (!limit($(this).prev(".create"), 40))
      return false;
    if (selTxt != "" && selTxt != "快速创建一个新的工作台") {
      $.post('?c=MyWorkBench&action=modify&stemp=' + Math.random(), {
        'workBenchId': 0,
        'tableName': selTxt
      }, function(data) {
        if (isNaN(data)) {
          showtips(data, 0);
        } else {
          var newli = '<li data-id="' + data + '">' + selTxt + '</li>';
          $("#tabName").text(selTxt);
          $("#tabName").attr('data-id', data);
          $('.selectionList ul').prepend(newli);
          //$("#picDescribe").attr('placeholder', '新建成功，点击修改图片收藏备注');
          $('.creatBtn').closest(".selectionList").hide();
          $(".collect_layer .warnTips").hide();
          allowcollect = 1;
          $(".selectionList .create").css("color", "#999").val("快速创建一个新的工作台");
        }

      });
    } else {
      showtips('请输入工作台名称', 0);
    }

    stopPropagation(ev);
  });

  var collectSureBox = $(".collect_layer_sure");
  var collectSureTime = null;
  collectDoc.on("click", "#sure", function(ev) {
     if (allowcollect === 0) {
       $('.layer_bg').hide();
       collectDoc.hide();
       return false;
     }
    var selTxt = $("#tabName").text();
    var selId = $("#tabName").attr('data-id');
    if (typeof(selId) == 'undefined') {
      showtips('请先选择工作台', 0);
      return false;
    }
    var iPriId = $('#J_BigImage').attr('data-oldid');
    var iTableName = $('#J_BigImage').attr('data-column');
	var describe = $('#picDescribe').val();
    if (selTxt != "") {
      $.post('?c=MyWorkBench&action=collect&stemp=' + Math.random(), {
        'workBenchId': selId,
        'describe': describe,
        'iTableName': iTableName,
        'iPriId': iPriId
      }, function(data) {
        //console.log(data);
        if (data == '收集成功') {
          allowcollect = 2;
          $("#goWorkbench").attr('href', '?c=WorkBenchList&WorkBenchId=' + selId);
          if (selTxt.length > 17)
            selTxt = selTxt.substring(0, 14) + "...";
          $("#goWorkbench").html(selTxt);
          $(".collect_layer .tip12").show();
          collectDoc.hide();
          collectSureBox.find('.tabName').attr("href",  "/?c=WorkBenchList&WorkBenchId=" + selId).html(selTxt).end().show();
          collectSureBoxHide();
        }
		else
		{

		}
      });
    }
    stopPropagation(ev);
  });
  $('.downbtn').click(function() {
    downpic(this);
  });

  $(".share_weixin").hover(function() {
    $(".share_ewm").css("display", "block");
  }, function() {
    $(".share_ewm").css("display", "none");
  });

  $('.pop_close').click(function() {
    parent.closelayer();
  });
  if (window.parent != window) {
    parent.showlayer();
  }

    collectSureBox.on("click",".closeBtn",function(ev){
        clearInterval(collectSureTime);
        $('.layer_bg').stop().fadeOut(500);
        collectSureBox.stop().fadeOut(500);
        stopPropagation(ev);
    });
    function collectSureBoxHide(){
       collectSureTime = setTimeout(function(){
              collectSureBox.find('.closeBtn').trigger('click');
       },3000);
    }
});

function changeUrl() {
  if (window.parent == window) {
    return false
  };
  $("#loadingBg", window.parent.document).hide();
  var column = $('.downbtn').attr('data-column');
  var id = $('.downbtn').attr('data-id');
  parent.review(column, id);
  var url = '?c=specialTopicShowLayer&id=' + $('#J_BigImage').attr('data-id') + '&iframe=0';
  parent.changeUrl(url);
}

function ajax_data(id) {
  $.get('?c=specialTopicShowLayer&stemp=' + Math.random(), {
    'act': 'ajax',
    'id': id
  }, function(data) {
    data = eval("(" + data + ")");
    var index = data.cur_index;
    $("#J_GetMoreResult li").eq(index).addClass('cur').siblings('li').removeClass("cur");
    $('.downbtn').attr({
      "data-path": data.searchResult.bpic_path,
      "data-column": data.downcolumn,
      "data-id": data.searchResult.old_id
    });
    $('#downnum').html(data.downnum);
    $('#J_BigImage').attr({
      "data-id": data.searchResult.id,
      "src": data.WEB_URL_IMG2 + data.searchResult.bpic_path,
      "data-column": data.downcolumn,
      "data-oldid": data.searchResult.old_id
    });
    $('.collectPic').attr('src', data.WEB_URL_IMG2 + data.searchResult.spic_path);
    $(".collect_layer .warnTips").hide();
    if (typeof(data.prev_id) == "undefined") {
      $('.leftBtn').parent().hide();
      $('.rightBtn').removeAttr('onclick');
      $('.rightBtn').unbind();
    } else {
      $('.leftBtn').parent().show();
      $('.leftBtn').removeAttr('onclick');
      $('.leftBtn').unbind();
      $('.leftBtn').click(function() {
        ajax_data(data.prev_id);
      });
    }
    if (typeof(data.next_id) == "undefined") {
      $('.rightBtn').parent().hide();
      $('.rightBtn').removeAttr('onclick');
      $('.rightBtn').unbind();
    } else {
      $('.rightBtn').parent().show();
      $('.rightBtn').removeAttr('onclick');
      $('.rightBtn').unbind();
      $('.rightBtn').click(function() {
        ajax_data(data.next_id);
      });
    }
    $('.keylist').empty();
    for (var k in data.searchResult.searchKeys) {
      if (data.searchResult.searchKeys[k].txt == '' || data.searchResult.searchKeys[k].txt == null)
        continue;
      var htmlstr = '<a target="_blank" href="' + data.searchResult.searchKeys[k].link + '">' + data.searchResult.searchKeys[k].txt + '</a>&nbsp;';
      $('.keylist').append(htmlstr);
    }
    $('.detailBox ul').empty();
    if (typeof(data.searchResult.detailResult) == "undefined") {
      $('.detail').hide();
    } else if (data.searchResult.detailResult.length <= 1) {
      $('.detail').hide();
    } else {
      for (k in data.searchResult.detailResult) {
        htmlstr = '<li><a href="javascript:void(0);"><img src="' + data.searchResult.detailResult[k].smalldetail + '" alt="细节图" data-bigdetail="' + data.searchResult.detailResult[k].bigdetail + '" height="93" data-tablename="' + data.searchResult.detailResult[k].tablename + '" data-tableid="' + data.searchResult.detailResult[k].id + '" data-downnum="' + data.searchResult.detailResult[k].downnum + '"></a></li>';
        $('.detailBox ul').append(htmlstr);
      }
      initData1();
      $('.detail').show();
    }
    $('.listWrap .allPic ul').empty();
    $('.relativeStyle').remove();
    if (data.searchResult.similarResult.length === 0) {
      $('.listWrap').hide();

    } else {
      for (k in data.searchResult.similarResult) {
        htmlstr = "";
        htmlstr += '<li>' + '<a target="_blank" href="'+data.searchResult.similarResult[k].link+'" class="img_a">' + '<img src="' + data.searchResult.similarResult[k].small_image + '"/>' + '<div class="hoverbg"></div>' + '</a>' + '<div class="picTxt">' + '<p><a target="_blank" href="' + data.searchResult.similarResult[k].seasonLink + '">' + data.searchResult.similarResult[k].for_date_text + ' ' + data.searchResult.similarResult[k].type_text + '</a></p>' + '<p><a target="_blank" href="' + data.searchResult.similarResult[k].cateLink + '">' + data.searchResult.similarResult[k].category_text + '</a>&nbsp;<a target="_blank" href="' + data.searchResult.similarResult[k].subCatLink + '">' + data.searchResult.similarResult[k].sub_category_text + '</a></p>' + '</div>'
		if( data.searchResult.similarResult[k].showBrandLink )
		{
			htmlstr += '<p class="picpp"><a target="_blank" href="' + data.searchResult.similarResult[k].brandLink + '">' +data.searchResult.similarResult[k].brandCorrect + '</a></p>';
		}
		else
		{
			htmlstr += '<p class="picpp">' + data.searchResult.similarResult[k].brandCorrect + '</p>';
		}
		htmlstr += '<p class="dataLyout"></p>' + '<span class="dataLyoutP">' + data.searchResult.similarResult[k].createDate + '</span>' + '</li>';
        $('.listWrap .allPic .clearfix').append(htmlstr);

      }
      var relativeStylehtml='<a class="relativeStyle" onclick="relativeStyle();"></a>';
      $('.bigbox').append(relativeStylehtml);
      $('.listWrap').show();
    }
    changeUrl();

  });
}

function limit(obj, l) {
  var txt = $(obj).val();
  if (txt.length > l) {
    showtips('请输入少于' + l + '个字符', 0);
    return false;
  } else {
    $('.dynamicTip').hide();
    return true;
  }
}

function checkselection(obj, ev) {
  allowcollect = 0;
  var selTxt = $(obj).text();
  var selId = $(obj).attr('data-id');
  $("#tabName").text(selTxt);
  $("#tabName").attr('data-id', selId);
  $(".selectionList").hide();
  var column = $('#J_BigImage').attr('data-column');
  var id = $('#J_BigImage').attr('data-oldid');
  var params = {
    action: 'checkCollected',
    tablename: column,
    tableid: id,
    workbenchid: selId
  };
  $(".collect_layer .warnTips").hide();
  $.ajax({
    type: "get",
    url: "/?c=myWorkBench&stamp=" + Math.random(),
    data: params,
    async: false,
    dataType: "json",
    success: function(data) {
      if (data.rs == 'ok') {
        // 可以收藏
        allowcollect = 1;
      } else if (data.code == 12) {
        allowcollect = 2;
        $("#goWorkbench").attr('href', '?c=WorkBenchList&WorkBenchId=' + selId);
        if (selTxt.length > 17)
          selTxt = selTxt.substring(0, 14) + "...";
        $("#goWorkbench").html(selTxt);
        $(".collect_layer .tip12").show();
      } else if (data.code == 13) {
        allowcollect = 0;
        showtips("每个工作台最多存放99张图片，您可以选择其他工作台或新建工作台", 1);
      }
    }
  });
  stopPropagation(ev);
}

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

function showResultImg(lilen) {
  var imgUl = $('.pop_layer_page #J_GetMoreResult');
  var ulBox = $('.pop_layer_page .resultBox');
  var J_GMResultHei = 0;
  imagesLoaded($('.pop_layer_page #J_GetMoreResult'), function() {
    waterfallThatAlert();
    J_GMResultHei = imgUl.height();
    ulBox.scrollTop(0.1);
  });
}

waterfallThatAlert()
//右侧搜索结果瀑布流布局
function waterfallThatAlert() {
  var lieshu = 3;
  var J_GetMoreResult = $("#J_GetMoreResult");
  var aGrid = $("#J_GetMoreResult .grid");

  var aMax = [];
  if (aGrid.length <= lieshu) {

    for (var i = 0; i <= aGrid.length - 1; i++) {
      aGrid.eq(i).css({
        "left": i % lieshu * 78,
        "top": 0
      }).addClass('curGrid');
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
    aGrid.eq(i).css({
      "left": i % lieshu * 78,
      "top": shangmianhezigao
    }).addClass('curGrid');
  }
  J_GetMoreResult.height(maxData(aMax));
};

(function($) {
  //弹出层搜索结果左右切换-键盘左右键，细节切换-键盘上下键，关闭弹出层-键盘ESC
  $(document).keydown(function(event) {
    var event = event ? event : (window.event ? window.event : null);
    if (event && event.keyCode == 37) { //left
      $(".pop_layer_page .leftBtn").trigger("click");
    }
    if (event && event.keyCode == 39) { //right
      $(".pop_layer_page .rightBtn").trigger("click");
    }
    if (event && event.keyCode == 38) { //up
      $(".pop_layer_page .detailBox .prevbtn").trigger("click");
      return false;
    }
    if (event && event.keyCode == 40) { //down
      $(".pop_layer_page .detailBox .nextbtn").trigger("click");
      return false;
    }
    if (event && event.keyCode == 27) { //esc
     if(($(".collect_layer").is(":hidden") || $(".collect_layer").length <= 0) && $(".bigImg").is(":hidden")){
        $(".pop_layer_page .pop_close").trigger("click");
      } 
      else if(!$(".bigImg").is(":hidden")){
        $(".pop_layer_page .layerClose").trigger("click");
      } 
      else {
        return false;
      }
    } else {
      return;
    }
  });
})(jQuery);

function showtips(tip, important) {
  $(".collect_layer .warnTips").hide();
  $('.tipText').html(tip);
  $(".collect_layer .dynamicTip").attr('important', important);
  $(".collect_layer .dynamicTip").show();
}

function initData1() {
  var selBox = $('.detailBox');
  var oul = selBox.find("ul");
  var ali = selBox.find("ul li");
  var li_len = ali.length;
  var li_w = ali.outerWidth(true);
  var n = Math.ceil(selBox.find(".boxli").width() / li_w);
  var ul_w = li_len * li_w;
  selBox.find("ul li:first").addClass('cur').siblings('li').removeClass('cur');
  oul.css('left',0);
  oul.width(ul_w);
  //console.log(oul);
}
 //弹出层相关款式锚点
/* function relativeStyle(){
      var scrollT = $(".pop_layer").outerHeight(true)+100;
      $("html,body").animate({scrollTop:scrollT},300);

 }*/
$(function(){
  //最下面的展开收起 

    var selmoreRec=$('.moreRec');
    var selcon=$(".layer_dwid");
    var aleng=selcon.length;
    var ahei=$(".layer_dwid").outerHeight();
    var trueheight= aleng*ahei;
    var atext="展开";
    var btext="收起";
    var num1=245;
    var num2='245px';

    $('.togglebtn').click(function(){ 
      var togglebtn_tex=$(".togglebtn").text();
      if(togglebtn_tex=="收起"){
          $(".togglebtn").text(atext);
          $('.moreRec').removeClass('down');
          $(".layerblack").animate({height:0},300);
      }else{
        $(".togglebtn").text(btext);
        $(".layerblack").animate({height:num2},300);
      }      
    });

    selmoreRec.click(function(){
      if($(".layerblack").height()==num1){
        $(".layerblack").animate({height:trueheight},300);
        $(this).addClass('down');
        $(".togglebtn").text(btext);
      }else{
        $(".layerblack").animate({height:num2},300);
        $(this).removeClass('down');
        $(".togglebtn").text(btext);
      }
    });



  function showdiv(classname){ 
    var self=$(classname);
    var sel=self.find('li');
    sel.hover(function() {
      if($(".layerblack").height()>num1){
        $(".togg2").show();
        $(".togg1").hide();
      }else{
        $(".togg1").show();
        $(".togg2").hide();       
      }
      $(this).find('.showdiv').stop().fadeIn(100);
    }, function() {
      $(this).find('.showdiv').stop().fadeOut(200);
    });
  }
  showdiv('.layer_dwid');


  //小图切换大图 ，循环播放
  $('.numlist li').eq(0).addClass('on');
  $('.bigbox img').eq(0).css('display', 'block');
  var timer=null;
  var num=0;
  timer=setInterval(lunbo, 3000);
  function lunbo(){
    num++;
    if(num>$('.numlist li').length-1){
      num=0
    }
    $('.numlist li').eq(num).addClass('on').siblings('').removeClass('on');
    $('.bigbox img').eq(num).stop(true).fadeIn(400).siblings('img').stop(true).fadeOut(100);

  }
  $('.numlist li').hover(function(){
    var index=$(this).index();
    $(this).addClass('on').siblings('').removeClass('on');
    $('.bigbox img').eq(index).stop(true).fadeIn(400).siblings('img').stop(true).fadeOut(100);
    num=index;
  });
  $(".bigbox").hover(function() {
    clearInterval(timer);
  }, function() {
     timer=setInterval(lunbo, 3000);
  });




  var w1=$(".layerLeft_top .fl a").eq(0).outerWidth();
  var w2=$(".layerLeft_top .fl a").eq(1).outerWidth();
  var w=w1+w2+20;
  $(".share_btn").css('left',w);
  $(".share_btn").hover(function() {
    $(this).stop().animate({width: '260px',backgroundColor:'#fff'}, 300);
  }, function() {
     $(this).stop().animate({width: '40px',backgroundColor:'#ccc'}, 300);
  });


});


