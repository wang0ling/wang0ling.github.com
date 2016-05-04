<?php

$page=$_GET["page"];
$url="localhost";
$username="root";
$password="";
$db="pop_fashion";

$pagenum=10;
$pageindex=($page-1)*$pagenum;
$sql="select src from waterfall limit ".$pageindex.",".$pagenum;

mysql_connect($url,$username,$password);
mysql_select_db($db);
$ret=mysql_query($sql);


$str="[";
$true=true;
while ($row=mysql_fetch_row($ret)) {
	if($true){
		$str.="'".$row[0]."'";
		$true=false;
	}else{
		$str.=",'".$row[0]."'";
	}
}

$str.="]";
echo $str;
?>
