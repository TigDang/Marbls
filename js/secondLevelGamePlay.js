//Функционал консоли

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
    var inputText=document.getElementById('inputLine').value.toString();
    document.getElementById('inputLine').value='';
    if (inputText==='Start'){
      WriteLine(inputText,false);
      StartGame();
    }
    else if (inputText !== ''){
      WriteLine(inputText,false);
    }
  }
}

function WriteLine(text, asComputer){
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
  MComputer = new Computer();
  alert(MComputer.makeCrypt());
  MComputer.makeMoodGood();
  MComputer.makeMoodGood();
  document.getElementById('inputLine').hidden=true;
  WriteLine('Hello, Mr.Meat! Can you help me?',true);
}

//Игровой процесс

