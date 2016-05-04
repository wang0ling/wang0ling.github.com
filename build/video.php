<?php
header('Content-Type: video/x-flv; charset=UTF-8');
//require('../config/config.php');
require('../config/main.php');
require('../class/Mysql.class.php');
$db=new Mysql();
$videocs["id"]=intval(trim($_GET["videoid"]));
$videocs["status"]=2;
$vidnr=$db->getsql("mostrend_content",$videocs);
$pho="../".$vidnr["path"].$vidnr["flv_name"];
//if(file_exists($pho)){echo "111";}else{echo "dddd";}
echo $b=file_get_contents($pho);
exit();
?>