<?php
$book=$_POST["book"];

$file=fopen($book,"r") or exit("Unable to open file!");

if (substr($book, 0, 3)==="raw")
{
	while(!feof($file))
	{
		echo fgets($file);
		echo  ' <br/> ';
	}
}
else
{
	while(!feof($file))
	{
		echo fgets($file);
	}
}
fclose($file);
?>