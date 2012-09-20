<?php
$count=1;
$test=true;

echo "<div id='panel0' class='panel'> <div class='odd'></div><div class='clone even'> <img src='images/01.jpg' /> </div></div>";

$file=fopen($_POST["book"],"r") or exit("Unable to open file!");
while($test==true)
{
	echo "<div id='panel".$count."' class='panel'>";
	echo "<div class='clone odd'>";
	
	for ($i=1; $i<=1500; $i++)
	{
		if (!feof($file))
		{
			echo fgetc($file);
		}
		else
		{
			$test=false;
			break;
		}
	}
	
	echo "</div>";
	echo "<div class='clone even'> <img src='images/01.jpg' /> </div>";
	echo "</div>";
	$count++;
}

fclose($file);
?>