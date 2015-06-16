<?php
	$filename="music.json";
	$json_string=file_get_contents($filename);
	$content=json_decode($json_string);
	foreach ($content as $key){
		echo '<li id="no'.$key->no.'"><div class="star"></div><span class="name" data-duration="'.$key->duration.'">'.$key->name.'</span><span class="singer">'.$key->singer.'</span></li>';
	};
?>