function FinishOfGame(text){
  let askingWindow = document.createElement('div');
  askingWindow.id='askingWindow';
  askingWindow.innerText=text;
  askingWindow.innerHTML+="<br/><br/><a  href='SecondLevel.html'>Следующий уровень</a>"
  document.body.prepend(askingWindow);
  Users[POINTER].score1=APlayer.showMarbls();
  setCookie('users', JSON.stringify(Users));
  console.log('Очки игрока '+Users[POINTER].nickname+ ' за первую игру:' + Users[POINTER].score1);
}

function AppearanceOfRoundFinish(enemyLabel){
  document.getElementById('enemyBetNNum').hidden=false;
  OpenOrCloseRightHand();
  OpenOrCloseLeftHand();
  document.getElementById('evenNum').hidden=true;
  document.getElementById('oddNum').hidden=true;
  document.getElementById('enemyBetNNum').innerText=enemyLabel;
}

function OpenOrCloseRightHand(){
  if (document.getElementById('rOpenedHand').hidden){
    document.getElementById('rOpenedHand').hidden=false;
    document.getElementById('rClosedHand').hidden=true;
  }
  else {
    document.getElementById('rOpenedHand').hidden=true;
    document.getElementById('rClosedHand').hidden=false;
  }
}
function OpenOrCloseLeftHand(){
  if (document.getElementById('lOpenedHand').hidden){
    document.getElementById('lOpenedHand').hidden=false;
    document.getElementById('lClosedHand').hidden=true;
  }
  else {
    document.getElementById('lOpenedHand').hidden=true;
    document.getElementById('lClosedHand').hidden=false;
  }
}

function HideStartMenu(){
  WriteName();
  document.getElementById('startMenu').hidden=true;
  Step1x1();
}

var Enemy = new Player("Enemy", true);
var APlayer = new Player("Player", false);
document.getElementById('playerLabel').innerText=APlayer.showMarbls();

function Step1x1(){
  document.getElementById('enemyBetNNum').hidden=true;
  document.getElementById('mainLabel').innerText='Вы ведёте. Противник делает ставку';
  document.getElementById('nextRound').hidden=true;
  document.getElementById('enemyLabel').innerText='Начнём!';
  enemyBid = Enemy.makeBid();
  setTimeout(Step1x2,2000)
}

function Step1x2(){
  OpenOrCloseLeftHand();
  document.getElementById('enemyLabel').innerText=''
  document.getElementById('mainLabel').innerText='Противник сделал ставку. Выбирайте число чётное или нечётное';
  document.getElementById('presNumORbid').setAttribute('max', APlayer.showMarbls().toString());
  document.getElementById('presNumORbid').hidden=false;
  document.getElementById('whenPlayerChooseNum').hidden=false;
}

function Step1x3(){
  OpenOrCloseRightHand();
  document.getElementById('mainLabel').innerText='Противник угадывает';
  document.getElementById('presNumORbid').hidden=true;
  document.getElementById('whenPlayerChooseNum').hidden=true;
  document.getElementById('enemyLabel').innerText='*думает*'
  setTimeout(Step1x4, 2000)
}

function Step1x4(){
  AppearanceOfRoundFinish(enemyBid);
  if (Enemy.makeAssump()){
    document.getElementById('mainLabel').innerText='Противник не угадал';
    APlayer.addMarbls(enemyBid);
    Enemy.takeMarbls(enemyBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='О нет!'
  }
  else {
    document.getElementById('mainLabel').innerText='Противник угадал';
    Enemy.addMarbls(enemyBid);
    APlayer.takeMarbls(enemyBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='Ура!'
  }
  document.getElementById('nextRound').hidden=false;
  if (APlayer.showMarbls()<1){
    FinishOfGame('Вы проиграли');
  }
  else if (Enemy.showMarbls()<1){
    FinishOfGame('Вы победили');
  }
}

function Step2x1(){
  document.getElementById('enemyBetNNum').hidden=true;
  document.getElementById('enemyBetNNum').innerText="";
  document.getElementById('nextRound').hidden=true;
  document.getElementById('mainLabel').innerText='Вы играете. Ваша ставка?';
  document.getElementById('presNumORbid').setAttribute('max', APlayer.showMarbls().toString());
  document.getElementById('presNumORbid').hidden=false;
  document.getElementById('whenPlayerChooseBid').hidden=false;
  playerBid = document.getElementById("presNumORbid").value;
  document.getElementById('enemyLabel').innerText='';
}

function Step2x2(){
  OpenOrCloseRightHand();
  enemyNum = Enemy.makeBid();
  document.getElementById('mainLabel').innerText='Противник кладёт в руку шарики';
  document.getElementById('presNumORbid').hidden=true;
  document.getElementById('whenPlayerChooseBid').hidden=true;
  setTimeout(Step2x3,2000)
}

function Step2x3(){
  OpenOrCloseLeftHand();
  document.getElementById('evenNum').hidden=false;
  document.getElementById('oddNum').hidden=false;
}

function Step2x4E(){
  AppearanceOfRoundFinish(enemyNum);
  if (enemyNum%2 === 0){
    document.getElementById('mainLabel').innerText='Вы угадали';
    APlayer.addMarbls(playerBid);
    Enemy.takeMarbls(playerBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='О нет';
  }
  else {
    document.getElementById('mainLabel').innerText='Вы не угадали';
    Enemy.addMarbls(playerBid);
    APlayer.takeMarbls(playerBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='Ура!'
  }
  document.getElementById('nextRound').onclick=Step1x1;
  document.getElementById('nextRound').hidden=false;
  if (APlayer.showMarbls()<1){
    FinishOfGame('Вы проиграли');
  }
  else if (Enemy.showMarbls()<1){
    FinishOfGame('Вы победили');
  }
}



function Step2x4O(){
  AppearanceOfRoundFinish(enemyNum);
  if (enemyNum%2 === 1){
    document.getElementById('mainLabel').innerText='Вы угадали';
    APlayer.addMarbls(playerBid);
    Enemy.takeMarbls(playerBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='Жаль'
  }
  else {
    document.getElementById('mainLabel').innerText='Вы не угадали';
    Enemy.addMarbls(playerBid);
    APlayer.takeMarbls(playerBid);
    document.getElementById('playerLabel').innerText=APlayer.showMarbls();
    document.getElementById('enemyLabel').innerText='Ура!'
  }
  document.getElementById('nextRound').onclick=Step1x1;
  document.getElementById('nextRound').hidden=false;
  if (APlayer.showMarbls()<1){
    FinishOfGame('Вы проиграли');
  }
  else if (Enemy.showMarbls()<1){
    FinishOfGame('Вы победили');
  }
}


