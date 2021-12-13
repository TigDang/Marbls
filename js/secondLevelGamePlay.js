//Функционал консоли
var isGameStarted = 0;
var switcherTheme = true;
const MComputer = new Computer();
const easyCrypt = MComputer.makeCrypt(0);
const mediumCrypt = MComputer.makeCrypt(1);
const strongCrypt = MComputer.makeCrypt(2);

function withoutCyr(input) {
  var value = input.value;
  var re = /[абвгдеёжзиклмнопрстуфхцчшщъыьэюя]/gi;
  if (re.test(value)) {
    value = value.replace(re, '');
    input.value = value;
  }
}

function handle(e){
  if(e.keyCode === 13){
    e.preventDefault(); // Ensure it is only this code that rusn
    var inputText=document.getElementById('inputLine').value.toString().toLowerCase();
    document.getElementById('inputLine').value='';

    if (inputText==='start' && isGameStarted===0){
      WriteLine(inputText,false);
      setTimeout(StartGame, 500);
      isGameStarted = 1;
      ToggleInputLine();
    }
    else if(inputText==='change theme'){
      ChangeTheme();
      WriteLine(inputText,false);
    }
    else if (inputText !== '' && isGameStarted===0){
      WriteLine(inputText,false);
    }
    else if (inputText === ''){
    }
    else if(isGameStarted===1){
      ToggleInputLine();
      WriteLine(inputText,false);
      setTimeout(Step2I, 1000, inputText);
    }
    else if(isGameStarted===2){
      ToggleInputLine();
      WriteLine(inputText,false);
      setTimeout(Step3I, 1000, inputText);
    }
    else if(isGameStarted===3){
      ToggleInputLine();
      WriteLine(inputText,false);
      setTimeout(Step4I, 1000, inputText);
    }
  }
}

function ChangeTheme(){
  if (switcherTheme){
    document.body.setAttribute('style', 'filter: invert(100%);')
    switcherTheme = false;
  }
  else {
    document.body.setAttribute('style', 'filter: invert(0%);')
    switcherTheme = true;
  }
}

function ToggleInputLine(){
  document.getElementById('inputLine').readOnly = !document.getElementById('inputLine').readOnly;
}

function WriteLine(text, asComputer = true){
  var newLine = document.createElement('div');
  newLine.innerText=text;
  if (asComputer){
    newLine.className='computerline';
  }
  else {
    newLine.className='playerline';
  }
  document.getElementById('consoleLines').insertBefore(newLine, document.getElementById('endline'));
  document.getElementById('endline').scrollIntoView();
  // var objDiv = document.getElementById("consoleLines");
  // objDiv.scrollTop = objDiv.scrollHeight;
}

function StartGame(){
  document.getElementById('face').hidden=false;
  document.getElementById('face').innerText=MComputer.showMood();
  WriteLine('Hello, Mr.Meat! Can you help me?',true);
  setTimeout(Step1, 3000);
}

function ShowConsole(){
  document.getElementById('consoleWindow').hidden=false;
  setTimeout(WriteLine, 100, 'Send "CHANGE THEME" to change theme');
  setTimeout(WriteLine, 200, 'Send "START" to start');
  setTimeout(WriteLine, 300, '!Only english keyboard layout!');
}

//Игровой процесс
setTimeout(ShowConsole, 999);

function Step1(){
  WriteLine('I need to decrypt messages sent to me by other computers.', true);
  setTimeout(Step2, 1000)
}

function Step2(){
  WriteLine('So let\'s start. That\'s will be easy: ' + easyCrypt, true);
  ToggleInputLine();
}

function Step2I(input){
  if (SimpleCrypt(easyCrypt)===input.toLowerCase()){
    WriteLine('True. You are right.', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('No. No way', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 2;
  document.getElementById('face').innerText=MComputer.showMood();
  setTimeout(Step3, 1000)
}

function Step3(){
  WriteLine('Ok. Okay. New word. You will encrypt: ' + mediumCrypt + '.', true);
  WriteLine('I think you are need alphabet.',true);
  ToggleInputLine();
}

function Step3I(input){
  if (MediumCrypt(mediumCrypt, true)===input){
    WriteLine('Yes. That is right.', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('No! Noo!', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 3;
  document.getElementById('face').innerText=MComputer.showMood();
  Step4();
}

function Step4(){
  WriteLine('Next: ' + strongCrypt + '.', true);
  WriteLine('That will be strong.',true);
  ToggleInputLine();
}

function Step4I(input){
  if (StrongCrypt(strongCrypt, true)===input){
    WriteLine('Yeah! Hurray!', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('Oh.. No. Wrong.', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 4;
  document.getElementById('face').innerText=MComputer.showMood();
  GameOver();
}

function GameOver(){
  ToggleInputLine();
  if (MComputer.mood!==-3){
    WriteLine('That is it. Game is over, so...', true);
  }
  switch (MComputer.mood) {
    case 0:
      WriteLine('Not bad but not good. Average. Thank you to play',true);
      break;
    case 1:
      WriteLine('Exellent! Great! Thank you very much',true);
      break;
    case -1:
      WriteLine('Too much wrongs. Bad. But thank you to try',true);
      break;
    case -2:
      WriteLine('Woah!! You are really nonperpective piece of meat',true);
      break;
    case 2:
      WriteLine('Excellent! Great! Thank you very much',true);
      break;
    case 3:
      WriteLine('Whoaaahh! Fully great! Thank you very much!!!',true);
      break;
    default:
      WriteLine('BAD BAD BAD BAD!!! GO AWAY!',true);
      setTimeout(TurnOffTheConsole, 3000);
      break;
  }
}

function TurnOffTheConsole(){
  document.getElementById('consoleWindow').innerHTML='';
  document.getElementById('consoleWindow').setAttribute('style', 'backgroung-color = #10171F;');
  document.getElementById('consoleWindow').style.animationName='noBlinking';
  document.body.setAttribute('style', 'filter: invert(0%);');
  isGameStarted=0;
}

