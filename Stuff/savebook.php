<?php

$file=fopen($_POST["name"],"w") or exit("Unable to open file!");

fwrite($file, $_POST["story"]);

fclose($file);
?>