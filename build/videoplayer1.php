<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>视频</title>
</head>

<body style="background:#000">
<script type="text/javascript" src="flowplayer-3.2.4.min.js"></script>
<script>
window.onload = function() {
	$f("player", "flowplayer.commercial.swf", {
		clip: {
			autoPlay: false,
			autoBuffering: true
		},
		plugins: {						
			controls: {
				url: 'flowplayer.controls-3.2.4-dev.swf'
			}		

		}
	})
};
</script>	
<span style="position:absolute;z-index:-1;color:#FFF;top:<?php echo $_GET["height"]/2-20; ?>px;left:<?php echo $_GET["width"]/2-60; ?>px;">视频文件。。。</span>
<div id="page" style="">
  	 <a  href="<?php echo "/009/12.flv"//$_GET["vfopd"]; ?>" style="display:block;width:<?php echo $_GET["width"]; ?>px;height:<?php echo $_GET["height"]; ?>px" id="player" ></a> 
</div>
</body>
</html>