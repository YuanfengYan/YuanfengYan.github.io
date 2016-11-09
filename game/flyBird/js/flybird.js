window.onload = function() {
	var head = document.querySelector('.head');
	var headBird = document.querySelector('.head span');
	var startBtn = document.querySelector('.start-btn');
	var btns = document.querySelector('.btns');
	var flybird = document.querySelector('.flybird');
	var scene = document.getElementById('scene');
	//	var gameEnd = document.querySelector('.gameEnd');
	var logo = document.querySelector('.logo');
	var scoreBoard = document.querySelector('.scoreBoard');
	var okBtn = document.querySelector('.ok-btn');
	var bulletMusic =document.querySelector('.bulletMusic');
	var overMusic=document.querySelector('.overMusic');
	var gameMusic=document.querySelector('.gameMusic');
	var level =document.querySelector('.level');
	var dropFlag = true; //记录下降的开关
	var upFlag = false
	var dropdelay = -1;
	var gameoverFlag = false;
	var score=0;
	window.localStorage.bestScore=window.localStorage.bestScore?	window.localStorage.bestScore:0;
	console.log(localStorage.bestScore);
	function floating() {
		var floatingDir = true;
		head.style.top = '135px';
		console.log('浮动定时器开启一次');
		floatingTimer = setInterval(function() {
			if(floatingDir) {
				floatingDir = !floatingDir;
				head.style.top = head.offsetTop - 20 + 'px';
			} else {
				floatingDir = !floatingDir;
				head.style.top = head.offsetTop + 20 + 'px';
			}
		}, 1000);
	}

	function random(max, min) {
		return (Math.random() * (max - min) + min);
	}

	var Bird = {};
	Bird.imageUrl = ['img/down_bird0.png', 'img/down_bird1.png', 'img/up_bird0.png', 'img/up_bird1.png'];
	
	Bird.startGame = function() {
		gameMusic.play();
		score=0;
		showLevel(score);
		head.style.display = 'none';
		btns.style.display = 'none';
		flybird.style.display = 'block';
		flybird.style.left = '30px';
		flybird.style.top = '50px';
		clearInterval(floatingTimer); //清除floating的定时器。
		console.log('浮动定时器关闭一次');
		Bird.dropInit();
		Bird.upInit();
		Pipe.init();
	}
	Bird.dropInit = function() {
		dropFlag = true;
		console.log('下降定时器开一次');
		Bird.dropTimer = setInterval(function() {
			if(dropFlag) {
				flybird.style.backgroundImage = 'url(' + Bird.imageUrl[1] + ')';
				flybird.style.top = flybird.offsetTop + 6 + 'px';
				if(gameoverFlag){
					flybird.style.top = flybird.offsetTop + 20 + 'px';
				}
				if(flybird.offsetTop + flybird.offsetHeight > scene.offsetHeight - 70) {
					document.querySelector('.score').innerHTML=score;
					
					if(+window.localStorage.bestScore<score){
						window.localStorage.bestScore=score;
					}
					document.querySelector('.bestScore').innerHTML=window.localStorage.bestScore;
					clearInterval(Bird.dropTimer);
					clearInterval(Bird.upTimer);
					logo.style.transition = 'all 1s';
					scoreBoard.style.transition = 'all 1s';
					okBtn.style.transition = 'all 1s';
					logo.style.top = 80 + 'px';
					scoreBoard.style.top = 145 + 'px';
					okBtn.style.left = 120 + 'px';
					console.log('两个定时器关一次');
					Bird.gameOver();
				}
			}
		}, 30);
	}
	Bird.upInit = function() {
		console.log('上升定时器开一次');
		Bird.upTimer = setInterval(function() {
			if(upFlag) {
				flybird.style.top = flybird.offsetTop - 6 + 'px';
				if(flybird.offsetTop < 0 || gameoverFlag) {
					dropFlag = true;
					upFlag = false;
					//						console.log('上升定时器关一次');
//					Bird.gameOver();
					gameoverFlag=true;
				}
			}
		}, 30);
		scene.onmousedown = function() {
			upFlag = true;
			dropFlag = false;
			bulletMusic.play();
			flybird.style.backgroundImage = 'url(' + Bird.imageUrl[3] + ')';
			if(dropdelay != -1) {
				clearTimeout(dropdelay);
			}
			dropdelay = setTimeout(function() {
				upFlag = false;
				dropFlag = true;
			}, 300);
		}
	}
	Bird.gameOver = function() {
		gameMusic.pause();
		overMusic.play();
		upFlag = false;
		dropFlag = true;
		gameoverFlag = true;
		clearInterval(moveTime2);
		//gameEnd.style.display='block';
		scene.onmousedown = function() {};
//				setTimeout(function(){
			
//				},100);
	}
	var Pipe = {};
	Pipe.init = function() {
		moveTime2 = setInterval(Pipe.movePipe, 2500);
	}
	Pipe.createPipe = function() {
		var pipesData = new Array(3);
		var pipes = document.createElement('div');
		var pipeUp = document.createElement('div');
		var pipeDown = document.createElement('div');
		pipes.classList.add('pipes');
		pipeUp.classList.add('pipeUp');
		pipeDown.classList.add('pipeDown');
		pipes.appendChild(pipeUp);
		pipes.appendChild(pipeDown);
		pipes.style.left = 343 + 'px';
		scene.appendChild(pipes);
		pipeUp.style.height = random(200, 110) + 'px';
		pipeDown.style.height = pipes.offsetHeight - pipeUp.offsetHeight - random(120-score*2/3, 100-score*2/3) + 'px';
		pipesData[0] = pipes;
		pipesData[1] = pipeUp;
		pipesData[2] = pipeDown;
		return pipesData;
	}
	Pipe.movePipe = function() {
		var pipesData = Pipe.createPipe();
		pipesData[0].pass=false;
		var moveTimer1 = setInterval(function() {
			pipesData[0].style.left = pipesData[0].offsetLeft - 20 + 'px';
			if(pipesData[0].offsetLeft+pipesData[0].offsetWidth<flybird.offsetLeft&&
				pipesData[0].pass==false){
					pipesData[0].pass=true;
					score++;
					showLevel(score);
					console.log(score);
				}
			if(pipesData[0].offsetLeft < -63) {
				clearInterval(moveTimer1);
				pipesData[0].remove();
			}
			if((flybird.offsetLeft + flybird.offsetWidth > pipesData[0].offsetLeft) &&
				(flybird.offsetLeft < pipesData[0].offsetLeft + pipesData[0].offsetWidth) &&
				(flybird.offsetTop < pipesData[1].offsetHeight || flybird.offsetTop + flybird.offsetHeight > pipesData[2].offsetTop)) {
				console.log('碰到了');
				gameoverFlag=true;
//				Bird.gameOver();
			}
			if(gameoverFlag) {
				clearInterval(moveTimer1);
			}
		}, 250);
	}
	okBtn.onclick = function() {

		gameoverFlag = false;
		upFlag = false;
		dropFlag = true;
		head.style.display = 'block';
		btns.style.display = 'block';
		//		gameEnd.style.display='none';
		logo.style.transition = 'all 0s';
		scoreBoard.style.transition = 'all 0s';
		okBtn.style.transition = 'all 0s';
		logo.style.top = -42 + 'px';
		scoreBoard.style.top = 481 + 'px';
		okBtn.style.left = -96 + 'px';
		var allPipe = document.querySelectorAll('.pipes');
		for(var i = 0; i < allPipe.length; i++) {
			allPipe[i].remove();
		}
		floating();
		console.log('点击了');
	}
	startBtn.onclick = function() {
		Bird.startGame();
	}
	levelImg=['img/0.jpg','img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'
	,'img/5.jpg','img/6.jpg','img/7.jpg','img/8.jpg','img/9.jpg']
	function showLevel(number){//计分器
		var strLevel=String(number);
		level.innerHTML='';
		for(var i=0;i<strLevel.length;i++){
			var imgLevel=document.createElement('img');
			imgLevel.src=levelImg[+strLevel.charAt(i)];
			level.appendChild(imgLevel);
		}
	}
	showLevel(score);
	
	floating();
}