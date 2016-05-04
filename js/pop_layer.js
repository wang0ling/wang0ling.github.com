$(function(){
    //分享icon
    $(".share_btn").hover(function() {
      $(this).stop().animate({'width':'260px','background-color':'#fff'});
    }, function() {
      $(this).stop().animate({'width':'40px','background-color':'#ccc'});
    });

    //轮播
    var ohead=$(".layerLeft .numlist li");
    var ocon=$(".bigbox img");
    var num=0;
    var lbtimer=null;
    function lun(){
        ohead.eq(0).addClass('on');
        ocon.eq(0).show();
        ohead.hover(function(event) {
          var index=$(this).index();
          num=index;
          tabcon();
        });

        lbtimer=setInterval(tab,5000);
        function tabcon(){
            ohead.eq(num).addClass('on').siblings().removeClass('on');
            ocon.eq(num).stop(true,true).fadeIn(500).siblings().hide();
        }

        function tab(){
            num++;
            if(num>ohead.length-1){
                num=0;
            }
            tabcon();
        }
        $(".bigbox").hover(function() {
            clearInterval(lbtimer);
            $(".enlarge").show();
        }, function() {
            lbtimer=setInterval(tab,5000);
            $(".enlarge").hide();
        });
    }
    lun();

    //点击大图详情
    var bigpic=$("#bigImages");
    $(".enlarge").on('click', function(event) {
        clearInterval(lbtimer);
        $(".layer_bgBlack, .bigImg").show();
        var spicind=$(".numlist li.on").index();
        //alert(spicind)
        bigpic.attr('src',$(".bigbox img").eq(spicind).attr('src'));
        bigpic.css({'width':'600px'})

    });

    $(".layerClose").on('click', function(event) {
        $(".layer_bgBlack, .bigImg").hide();
    });

 
    //添加到工作台      
        var choosebox=$(".selectionText");
        var choosetext=$("#tabName");
        var chooselist=$(".selectionList");
        var chooselistul=$(".selectionList ul");
        var chooselistli=$(".selectionList ul li");
        var creatbtn=$(".selectionList .creatBtn");
        var osurebtn=$("#sure");
        var closebtn=$(".collect_layer .close");
       
        $(".collect").click(function(){
            $(".pop_layer_page .layer_bg,.pop_layer_page .collect_layer").show();
        });
        closebtn.click(function(){
            allhide();
        }); 
        osurebtn.click(function(){
            allhide();
        })

        function allhide(){
            $(".pop_layer_page .layer_bg,.pop_layer_page .collect_layer").hide();
        }  
        function listhide(){
            chooselist.hide();
        }

        choosebox.click(function(){
            chooselist.show();
        });

        //创建
        creatbtn.click(function(){
            var createvalue=$(".selectionList .create").val();
            var ali=document.createElement('li');
            ali.innerHTML=createvalue;
            chooselistul.get(0).insertBefore(ali,chooselistul.get(0).children[0]);
            createvalue='';
        });

        //选择工作台
        chooselistli.each(function(index, el) {
            var sel=$(el);
            sel.click(function(){              
                choosetext.html($(this).html());
                listhide();
            })
        });
        

})
/*报告详情页内容切换*/
function tiaozhuan(){
    var adiv=$('.pop_report .indexdiv');
    var ali=$(".pop_report .leftnavfix li");
     
    $(window).scroll(function(){
        var fh=500;
        var adiv=$('.pop_report .indexdiv');
        var pmidth=$(window).width();
        var cssleft=Math.floor((pmidth-1300)/2);
        if($(window).scrollTop()>=fh){
            $(".pop_report .leftnavfix").addClass('fix').css('left',cssleft-5);
        }else{
            $(".pop_report .leftnavfix").removeClass('fix').css('left','-95px');
        }  

        for(var i=0;i<adiv.length;i++){
            var adivhei=adiv.eq(i).offset().top-10;
            if($(window).scrollTop()>=adivhei){
              $(".pop_report .leftnavfix li").eq(i).addClass('redbg').siblings('li').removeClass('redbg');
            }else{
              $(".pop_report .leftnavfix li").eq(i).removeClass('redbg');
            }
        }
    });

    $(".pop_report .leftnavfix li").click(function(){
        var sel=$(this);
        var index=sel.index(); 
        var adiv=$('.pop_report .indexdiv');
        var adivhei=adiv.eq(index).offset().top+10;
        $("html,body").animate({scrollTop:adivhei},300);
    });
}

//最下面的展开收起 
function tabmore(){
    var selmoreRec=$('.moreRec');
    var selcon=$(".layer_dwid");
    var aleng=selcon.length;
    var ahei=$(".layer_dwid").outerHeight();
    var trueheight= aleng*ahei;
    var atext="展开";
    var btext="收起";
    var num1=321;
    var num2='321px';

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

/*    selmoreRec.click(function(){
      if($(".layerblack").height()==num1){
        $(".layerblack").animate({height:0},300);
        $(this).addClass('down');
        $(".togglebtn").text(btext);
      }else{
        $(".layerblack").animate({height:num2},300);
        $(this).removeClass('down');
        $(".togglebtn").text(btext);
      }
    });*/
}
