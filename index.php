<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css/music.css"/>
</head>
<body>
	<div class="container">
		<div class="left-column">
			<div class="description">
				<span>正在播放</span>
				<span class="count"><span id="currentCount">1</span><span id="totalCount" class="total-count"></span></span>
			</div>
			<div id="list" class="list">
				<ul>
					<?php
					require_once("getMessage.php");
					?>
				</ul>
				<audio id="audio">
					<source id="mp3">
				</audio>
			</div>
			<div class="progress">
				<div id="currentName" class="current-name"></div>
				<div id="time" class="time">-00:00</div>
				<div id="progressBar" class="progress-bar">
					<div id="bufferedBar" class="buffered-bar">
						<div id="playBar" class="play-bar"></div>
					</div>
				</div>
				<div id="loop" class="loop" title="循环播放"></div>
				<div id="volume" class="voloume">
					<div id="volumeIcon" class="volume-icon"></div>
					<div id="volumeBar" class="volume-bar">
						<div id="currentVolume" class="current-volume" draggeable="true"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="right-column">
			<div class="right-main">
				<div id="cover" class="cover">
					<img id="coverImg" src="content/images/no2.jpg"/>
					<div id="cd" class="cd cd-rotate"></div>
				</div>
				<div id="lyric" class="lyric">
					<div id="lyrics"></div>
					<a id="viewLyric">查看歌词</a>			
				</div>
				<div id="control" class="control">
					<div id="last" class="last"></div>
					<div id="ps" class="ps pause"></div>
					<div id="next" class="next"></div>
				</div>
			</div>
		</div>
	</div>
	<script src="js/music.js"></script>
</body>
</html>