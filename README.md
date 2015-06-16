#在线音乐播放器

该播放器界面仿豆瓣音乐播放器，音乐信息存储于json文件，使用php读取生成列表。

音乐文件及专辑图片分别保存在content/music及content/images文件夹中，对应命名为“no”+数字。

只需修改music.json文件信息，格式如

    [
		{
			"no":"1",
			"name":"Todo Mundo",
			"singer":"Gaby Amarantos、Monobloco",
			"duration":"198",
			"lyric":""
		}，
		{
			"no":"2",
			"name":"We Are One",
			"singer":"Jennifer Lopez、pitbull、cláudia Leitte",
			"duration":"226",
			"lyric":""
		}
	]
 
并将音乐文件及专辑图片存储于对应文件夹即可自定义播放列表。

demo链接<a href="http://zyjoey.com/demo/mp3/">demo</a>

