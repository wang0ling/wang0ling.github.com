$(function(){
	// 下载包隔行变色
	$(".xiazai_table tr:even").addClass('bg');
	$(".xiazai_table tr:first").removeClass('bg');

	//创建工作台弹框
	$("#creatTab").on("click", function () {
		$("#tableName").val('');
		$("#tableStatus").val('');
		$("#workBenchId").val('');
		$(".shadow_black,.pop_work").show();
	});

	/*
	 *编辑工作台弹框
	 *flag 1:单张页面 否则 工作台页面
	 */
	$(".work_tab .edit_btn").each(function () {
		$(this).on('click', function (ev) {
			$(".pop_work").find("h1").text("编辑工作台").end().find(".saveBtn").text("保存");
			$("#tableName").val('');
			$("#tableStatus").val('');
			$("#workBenchId").val('');
			if ($(this).data('flag') == 1)
			{
				$("#tableName").val($(this).data('name'));
				$("#tableStatus").val($(this).data('describe'));
				$("#workBenchId").val($(this).data('id'));
			}
			else
			{
				var info = $(this).parents('li');
				$("#tableName").val(info.data('name'));
				$("#tableStatus").val(info.data('describe'));
				$("#workBenchId").val(info.data('id'));
			}
			$(".shadow_black,.pop_work").show();
			return false;
		});
	});
	//弹框关闭
	$(".pop_work .closebtn").on("click", function () {
		$(this).closest(".pop_work").hide();
		$(".shadow_black").hide();
	});


	// 账号设置
	$(".bd a").click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
	});

	var conW=$(".con_width").width();
	if(conW==1200){
		$(".trend_main1 .trend_main_right li:last,.analysis_main .trend_main_right li:last").hide();
		$(".style_main .trend_main_right li:last").hide();
		$(".style_main .trend_main_right li:last").prev().hide();
		$(".runway_main .trend_main_right li:last").hide();
		$(".runway_main .trend_main_right li:last").prev().hide();
		$(".books_main .trend_main_right li:last").hide();
		$(".books_main .trend_main_right li:last").prev().hide();
	}

});