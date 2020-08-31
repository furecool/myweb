// 1.前置作業(設全局變數和其他元件的初始狀態)
// 2.觸發事件按鈕
// 2-1.如果在一局遊戲中
// 2-1.a.骰子動起來
// 2-1.b.在不同玩家回合
// 2-1.c.如何結束遊戲，跳出一局
// 2-2.如果不在一局遊戲中的話，呼叫重置遊戲function
// 3.重置遊戲function
// 4.任何時間點，點按重置遊戲按鈕

//============== 1.前置作業(設全局變數和其他元件的初始狀態) ===============

//創造1-6隨機數 dice
// var dice = Math.floor(Math.random()*6)+1;
// console.log(dice);

//創造一些變量的初始值
var currentPlayer = 1;
var player1TotalScore = 0;
var player2TotalScore = 0;

var counter = 0;//將一局設為counter=6的先決條件

var isPlayingGame = true;//在一局中

// DOM - document object model
// document.querySelector('#player'+currentPlayer+'-current-score').innerHTML = '<h1>'+dice+'</h1>';

//先隱藏一些元素
document.querySelector('.dice').style = 'display:none';
document.querySelector('.winner1').style = 'display:none';
document.querySelector('.winner2').style = 'display:none';

//======================== 2.觸發事件按鈕 ==========================

// Event 監聽
//物件.事件.影響
// if else 的概念

document.querySelector('.roll').addEventListener('click',function(){

	//======================== 2-1.如果在一局遊戲中 ==========================
	if(isPlayingGame){

		//======================== 2-1.a.骰子動起來 ==========================
		var dice = Math.floor(Math.random()*6)+1; //創造隨機數
		document.querySelector('.dice').style = 'display:block'; //骰子叫出來
		document.querySelector('.dice').src = 'dice'+dice+'.png';//連結骰子和隨機數

		//======================== 2-1.b.在不同玩家回合 ==========================
		if(currentPlayer ===1){
			//將變數傳到現在分數
			document.getElementById('player'+currentPlayer+'-current-score').textContent = dice;
			//累積骰到的分數
			player1TotalScore += dice;
			//將累積分數傳到總分
			document.getElementById('player'+currentPlayer+'-total-score').textContent = player1TotalScore;
			//移除動作回合class
			document.querySelector('.panel-'+currentPlayer).classList.remove('active');
			//換player2的回合
			currentPlayer = 2;
			//添加動作回合class
			document.querySelector('.panel-'+currentPlayer).classList.add('active');
			//將非動作回合玩家現在數字變0
			document.getElementById('player'+currentPlayer+'-current-score').textContent = 0;
		}else{
			document.getElementById('player'+currentPlayer+'-current-score').textContent = dice;
			player2TotalScore += dice;
			document.getElementById('player'+currentPlayer+'-total-score').textContent = player2TotalScore;

			document.querySelector('.panel-'+currentPlayer).classList.remove('active');
			currentPlayer = 1;
			document.querySelector('.panel-'+currentPlayer).classList.add('active');
			document.getElementById('player'+currentPlayer+'-current-score').textContent = 0;
		}

		//===================== 2-1.c.如何結束遊戲，跳出一局 =======================
		counter += 1;
		if(counter === 6){ //6回合為1局
			if(player1TotalScore > player2TotalScore){ //player1贏的狀況
				document.querySelector('.winner1').style = 'display:block';
				document.getElementById('player1-current-score').style = 'margin-top:0';
				isPlayingGame = false; //這一局結束，下次click從isPlayingGame = false的狀況中開始
			}else if(player1TotalScore < player2TotalScore){
				document.querySelector('.winner2').style = 'display:block';
				document.getElementById('player2-current-score').style = 'margin-top:0';
				isPlayingGame = false;
			}else{
				document.querySelector('.roll').textContent = '平手';
				isPlayingGame = false;
			}
		}

	//============ 2-2.如果不在一局遊戲中的話，呼叫重置遊戲function ==============
	}else{
		// isPlayingGame = false 的狀況
		//init 設為重置遊戲的function
		init();
	}

});

//========= 3.重置遊戲function =========
//將先前所有全局變量(和一些特定的style)還原，最後要把isPlayingGame = true
function init(){

	currentPlayer = 1;
	player1TotalScore = 0;
	player2TotalScore = 0;
	counter = 0;

	document.querySelector('.dice').style = 'display:none';
	document.querySelector('.winner1').style = 'display:none';
	document.querySelector('.winner2').style = 'display:none';

	document.getElementById('player1-current-score').textContent = 0;
	document.getElementById('player2-current-score').textContent = 0;
	document.getElementById('player1-total-score').textContent = 0;
	document.getElementById('player2-total-score').textContent = 0;

	document.querySelector('.panel-1').classList.add('active');
	document.querySelector('.panel-2').classList.remove('active');

	document.querySelector('.roll').textContent = '搖骰子';

	document.getElementById('player1-current-score').style = 'margin-top:55px';
	document.getElementById('player2-current-score').style = 'margin-top:55px';
	isPlayingGame = true;
}

//================= 4.任何時間點，點按重置遊戲按鈕 ===================
document.querySelector('.newGame').addEventListener('click',function(){
	init();
});
