<?php

$file=fopen($_GET["book"],"r") or exit("Unable to open file!");
while(!feof($file))
{
	echo fgets($file);
	echo  ' <br/> ';
}

fclose($file);
?>