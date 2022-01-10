//Make the DIV element draggagle:

let time = 1;
document.getElementById('timingLabel').innerText=time;

var t = setInterval(timing, 1000)

function timing(){
  if (time < 1) {
    clearInterval(t);

    var paras = document.getElementsByClassName('questBlock');

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }

    paras = document.getElementsByClassName('answerBlock');

    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }

    Users[POINTER].score3 = score;
    setCookie('users', JSON.stringify(Users));

    let dialog = document.getElementById('endingDialog');
    dialog.innerHTML += 'Игрок <ins>' + Users[POINTER].nickname +
      '</ins> <br/> Очки за первую игру: ' + Users[POINTER].score1 +
      '<br/> Очки за вторую игру: ' + Users[POINTER].score2 +
      '<br/> Очки за третью игру: ' + Users[POINTER].score3;
    dialog.showModal();

    var type = 'data:application/octet-stream;base64, ';
    var text = unescape(encodeURIComponent(dialog.innerText.replace('Скачать итоги','')));
    var base = btoa(text);
    var res = type + base;
    document.getElementById('test').href = res;

    console.log('Очки игрока ' + Users[POINTER].nickname + ' за третью игру:' + Users[POINTER].score3);

    clearInterval(t);
  } else {
    time--;
    document.getElementById('timingLabel').innerText = time;
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function removeDropzone(dropzone){
  dropzone.style.animationName='fadeOut';
  setTimeout(function (){dropzone.remove()}, 900);
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  console.log(library);
  console.log(draggableElement);

  if (dropzone.className!==draggableElement.className){
    console.log(library.has(draggableElement.innerText));

    if (library.get(draggableElement.innerText)===dropzone.innerText
      || library.get(dropzone.innerText)===draggableElement.innerText) {
      score++;
      countScore();
      dropzone.style.backgroundColor="#7109AA";
    }
    else {
      dropzone.style.backgroundColor='#FF0000';
    }

    draggableElement.remove();
    event.dataTransfer.clearData();
    setTimeout(removeDropzone, 2500, dropzone)
    if (score===library.size-1){
      clearInterval(createNewPairs)
      document.body.style.backgroundColor='#FF80C8';
      document.getElementById('gameOverLabel').hidden=false;
    }
  }
}

idCounter = 0;

function makePair(){
  let ans = document.getElementById('ansEthalon').cloneNode();
  let qst = document.getElementById('questEthalon').cloneNode();

  ans.id=idCounter+'ANS';
  qst.id=idCounter+'QST';
  idCounter++;

  ans.hidden=false;
  qst.hidden=false;

  ans.style.top=getRandomArbitrary(0, 500)+'px';
  ans.style.left=getRandomArbitrary(0, 1200)+'px';

  qst.style.top=getRandomArbitrary(0, 500)+'px';
  qst.style.left=getRandomArbitrary(0, 1200)+'px';

  ans.innerText = stack.keys().next().value;
  qst.innerText = stack.get(stack.keys().next().value);
  stack.delete(stack.keys().next().value);

  if (ans.innerText!=='undefined'){
    document.getElementById('gameField').appendChild(ans);
    document.getElementById('gameField').appendChild(qst);
  }
}

function countScore(){
  document.getElementById('score').innerText=score;
}

countScore();

makePair();
makePair();
createNewPairs = setInterval(makePair, 3000);
