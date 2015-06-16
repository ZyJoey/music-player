<?php
	$result=(int)$_REQUEST["result"];
	$filename="music.json";
	$json_string=file_get_contents($filename);
	$content=json_decode($json_string);
	$lyric=$content[$result-1]->lyric;
	echo $lyric;	
?>