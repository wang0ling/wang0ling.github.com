<?php
//echo $_GET["pop"];
//echo 11;exit;
//echo '/009/2013/20130716/event/30491/20130716110943_89016.flv'
$b=file_get_contents("../009/1370654939_49363.jpg");
echo "<img src='../009/1370654939_49363.jpg' />";
echo "<div id='ee'></div>";

?>
<style>
#ee{ background:url(<?php echo $b; ?>); width:200px; height:300px;}
</style>