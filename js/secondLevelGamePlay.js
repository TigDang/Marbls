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
  newLine.innerHTML=text;
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
  WriteLine('Привет! Можешь ли ты мне помочь?',true);
  setTimeout(Step1, 3000);
}

function ShowConsole(){
  document.getElementById('consoleWindow').hidden=false;
  setTimeout(WriteLine, 100, 'Напиши "CHANGE THEME" для смены темы');
  setTimeout(WriteLine, 200, 'Напиши "START" чтобы начать');
}

//Игровой процесс
setTimeout(ShowConsole, 999);

function Step1(){
  WriteLine('Мне нужно перевести сообщения, поступившие от других компьютеров.', true);
  setTimeout(Step2, 1000)
}

function Step2(){
  WriteLine('Нууу давай начнём. Переведи, это должно быть просто: ' + easyCrypt, true);
  ToggleInputLine();
}

function Step2I(input){
  if (SimpleCrypt(easyCrypt)===input.toLowerCase()){
    WriteLine('Правильно.', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('Нет, неправильно', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 2;
  document.getElementById('face').innerText=MComputer.showMood();
  setTimeout(Step3, 1000)
}

function Step3(){
  WriteLine('Окей, теперь средняя сложность: ' + mediumCrypt + '.', true);
  WriteLine('(Тебе понадобится алфавит)',true);
  ToggleInputLine();
}

function Step3I(input){
  if (MediumCrypt(mediumCrypt, true)===input){
    WriteLine('Да! Верно', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('Нееет!', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 3;
  document.getElementById('face').innerText=MComputer.showMood();
  Step4();
}

function Step4(){
  WriteLine('Следующий: ' + strongCrypt + '.', true);
  WriteLine('Оо, это будет трудно.',true);
  ToggleInputLine();
}

function Step4I(input){
  if (StrongCrypt(strongCrypt, true)===input){
    WriteLine('Верноо! Даа!', true);
    MComputer.makeMoodGood();
  }
  else {
    WriteLine('Что ж.. Не правильно', true);
    MComputer.makeMoodBad();
  }
  isGameStarted = 4;
  document.getElementById('face').innerText=MComputer.showMood();
  GameOver();
}

function GameOver(){
  Users[POINTER].score2=MComputer.mood;
  setCookie('users', JSON.stringify(Users));
  console.log('Очки игрока '+Users[POINTER].nickname+ ' за вторую игру:' + Users[POINTER].score2);
  ToggleInputLine();
  if (MComputer.mood!==-3){
    WriteLine('На этом всё. Переводить больше не надо. А насчёт тебя...', true);
  }
  setTimeout(NextLevel, 3500);
  switch (MComputer.mood) {
    case 0:
      WriteLine('Не плохо но и не хорошо. Средне. Спасибо за игру',true);
      break;
    case 1:
      WriteLine('Вау! Молодец! Круто!',true);
      break;
    case -1:
      WriteLine('Слишком много ошибок. Плохо. Но спасибо за попытку',true);
      break;
    case -2:
      WriteLine('Вау! Настолько плохо, что я удивлён',true);
      break;
    case 2:
      WriteLine('Превосходно! Велико! Спасибо тебе большое',true);
      break;
    case 3:
      WriteLine('ВАУ! Всё правильно! Большое спасибо!!!',true);
      break;
    default:
      WriteLine('НЕТ НЕТ НЕТ НЕТТТ!!! УЖАСНО, УХОДИ!',true);
      setTimeout(TurnOffTheConsole, 3000);
      break;
  }
}

function NextLevel(){
  WriteLine('<a href="thirdGame.html">СЛЕДУЮЩАЯ ИГРА</a>');
}

function TurnOffTheConsole(){
  document.getElementById('consoleWindow').innerHTML='';
  document.getElementById('consoleWindow').setAttribute('style', 'backgroung-color = #10171F;');
  document.getElementById('consoleWindow').style.animationName='noBlinking';
  document.body.setAttribute('style', 'filter: invert(0%);');
  isGameStarted=0;
}

