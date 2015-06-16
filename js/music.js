/*播放音乐控制*/
(function(){
	var audio=document.getElementById("audio");
	var mp3=document.getElementById("mp3");
	var li=document.getElementsByTagName("li");
	var ps=document.getElementById("ps");
	var cd=document.getElementById("cd");
	var len=li.length;
	var set;
	window.onload=function(){
		var totalCount=document.getElementById("totalCount");
		var text=document.createTextNode(len);
		totalCount.appendChild(text);
		var i=0;
		currentLi(li[0]);
		audio.volume=0.5;
	}
	/*列表音乐切换*/
	var i;
	for(i=0;i<len;i++){
		li[i].addEventListener("click",changeList,false);
	}
	function changeList(event){
		currentLi(this);
	}
	/*控制栏*/
	var control=document.getElementById("control");
	control.addEventListener("click",function(event){
		var last=document.getElementById("last");
		var next=document.getElementById("next");
		switch (event.target.id){
			case "ps":
				var newpsClass,newcdClass; 
				if(audio.paused){
					audio.play();
					cd.className+=" cd-rotate";
					newpsClass=ps.className.replace(/play/,"pause");
				}else{
					audio.pause();
					newcdClass=cd.className.replace(/cd-rotate/,"");
					cd.className=newcdClass;
					newpsClass=ps.className.replace(/pause/,"play");
				}
				ps.className=newpsClass;
				
				break;
			case "last":
				var result=currentPlay();
				if(result==1){
					result=len;
				}else{
					result--;
				};
				var no="no"+result;
				var target=document.getElementById(no);
				currentLi(target);
				break;
			case "next":
				orderPlay();
				break;	
		};	
	},false);
	/*顺序播放*/
	function orderPlay(){
		var result=currentPlay();
		if(result==len){
			result=1;
		}else{
			result++;
		};
		var no="no"+result;
		var target=document.getElementById(no);	
		currentLi(target);
	}
	/*当前播放*/
	function currentPlay(){
		var currentPlay=document.getElementsByClassName("current")[0];
		var str=currentPlay.id;
		var regexp=/\d+/;
		var matches=regexp.exec(str);
		var result=matches[0];
		return result;
	}
	/*循环控制*/
	var loop=document.getElementById("loop");
	loop.addEventListener("click",function(event){
		audio.loop=true;
	},false);
	/*播放进度条*/
	var playBar=document.getElementById("playBar");
	function bar(target){
		var bufferedBar=document.getElementById("bufferedBar");
		var time=document.getElementById("time");
		var duration=target.getElementsByClassName("name")[0].getAttribute("data-duration");
		set=setInterval(function(){
			var currentTime=Math.ceil(audio.currentTime);
			var remainTime=duration-currentTime;
			var buffered=Math.floor(audio.buffered.start(0)+audio.buffered.end(0));
			var min=Math.floor(remainTime/60);
			var sec=remainTime%60;
			var sum=(currentTime/duration)*100;
			if(min<10){
				min="0"+min;
			}
			if(sec<10){
				sec="0"+sec;
			};
			if(!audio.ended){
				var text=document.createTextNode("-"+min+":"+sec);
				time.replaceChild(text,time.firstChild);
				bufferedBar.style.width=(buffered/duration)*100+"%";
				playBar.style.width=sum+"%";
			}else{
				clearInterval(set);
				setTimeout(function(){
					orderPlay();
				},2000);
			}
		},1000);
	}
	/*调整播放进度条*/
	var progressBar=document.getElementById("progressBar");
	progressBar.addEventListener("mousedown",function(event){
		adjustBar(event);
		progressBar.addEventListener("mousemove",adjustBar,false);
	},false);
	function adjustBar(event){
		var probLeft=getElementLeft(progressBar);
		var ppWidth=Math.abs(probLeft-event.clientX);
		var proWidth=560;
		var proportion=(ppWidth/proWidth).toFixed(2);
		if(proportion>=1){
			playBar.style.width=proportion*100+"%";
		}else{
			playBar.style.width=proportion*100+"%";
		}
		var duration=Math.floor(audio.duration);
		audio.currentTime=Math.ceil(proportion*duration);
	}
	/*调整音量*/
	var volumeIcon=document.getElementById("volumeIcon");
	var volumeBar=document.getElementById("volumeBar");
	var currentVolume=document.getElementById("currentVolume");
	volumeIcon.addEventListener("click",function(event){
		if(volumeBar.style.display=="block"){
			volumeBar.style.display="none";
		}else{
			volumeBar.style.display="block";
		}
	},false);
	volumeBar.addEventListener("mousedown",function(event){
		adjustVolume(event);
		volumeBar.addEventListener("mousemove",adjustVolume,false);
	},false);
	/*释放鼠标清除移动拖动条拖动事件*/
	document.body.addEventListener("mouseup",function(event){
		volumeBar.removeEventListener("mousemove",adjustVolume,false);
		progressBar.removeEventListener("mousemove",adjustBar,false);
	},false);

	function adjustVolume(event){
		var volumeBarLeft=getElementLeft(volumeBar);
		var cvWidth=Math.abs(event.clientX-volumeBarLeft);
		var vbWidth=80;
		var proportion=(cvWidth/vbWidth).toFixed(2);
		if(proportion>=1){
			currentVolume.style.width=100+"%";
		}else{
			currentVolume.style.width=proportion*100+"%";
		}
		audio.volume=proportion;
	};
	/*获取元素偏移量*/
	function getElementLeft(element){
		var actualLeft=element.offsetLeft;
		var current=element.offsetParent;
		while(current!==null){
			actualLeft+=current.offsetLeft;
			current=current.offsetParent;
		}
		return actualLeft;
	}
	/*查看歌词*/
	var lyric=document.getElementById("lyric");
	var viewLyric=document.getElementById("viewLyric");
	var lyrics=document.getElementById("lyrics");
	var cover=document.getElementById("cover");
	viewLyric.addEventListener("click",function(event){
		if(lyrics.firstChild===null){
			viewLyrics();
		}else{
			lyrics.removeChild(lyrics.firstChild);
			viewLyric.innerHTML="查看歌词";
			cover.style.display="block";
		}
	},false);
	/*向后台获取歌词*/
	function viewLyrics(){
		request=new XMLHttpRequest();
		var result=currentPlay();
		var url="getLyric.php?result="+escape(result);
		request.open("GET",url,true);
		request.onreadystatechange=displayLyric;
		request.send(null);
		viewLyric.innerHTML="关闭歌词";
	}
	function displayLyric(){
		if(request.readyState==4){
			if(request.status==200){
				cover.style.display="none";
				var text=request.responseText.replace(/\//g,"<br>");
				lyrics.innerHTML="<p>"+text+"</p>";
			}
		}
	}
	function currentLi(target){
		if(set){
			clearInterval(set);
		}
		var currentCount=document.getElementById("currentCount");
		var coverImg=document.getElementById("coverImg");
		var currentName=document.getElementById("currentName");
		var name=target.getElementsByClassName("name")[0].innerText;
		var i;
		for(i=0;i<len;i++){
			if(li[i].className=="current"){
				li[i].className="";
				break;
			};
		};
		target.className="current";
		//更换图片
		coverImg.src="content/images/"+target.id+".jpg";
		currentName.innerHTML=name;
		//更换音乐
		mp3.src="content/music/"+target.id+".mp3";
		bar(target);
		audio.load();
		audio.autoplay=true;
		ps.className="ps pause";
		cd.className="cd cd-rotate";
		var result=currentPlay();
		var text=document.createTextNode(result);
		currentCount.replaceChild(text,currentCount.firstChild);
		/*检查歌词是否显示,若显示则同步更新歌词*/
		if(lyrics.firstChild!==null){
			viewLyrics();
		}
	}
})();