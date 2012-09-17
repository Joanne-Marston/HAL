<?php
$file=fopen($_POST["book"],"r") or exit("Unable to open file!");
while(!feof($file))
{
  echo fgets($file);
}

fclose($file);
?>