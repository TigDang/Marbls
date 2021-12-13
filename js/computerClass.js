class Computer{
  mood = 0;
  library = ['apple', 'hello', 'aloha', 'seed', 'christ', 'computer', 'men', 'like', 'kill', 'fruit', 'bottle', 'water', 'meat', 'master',
    'mistress', 'cream', 'child', 'wild', 'element', 'class', 'number', 'count', 'input', 'output'];

  makeMoodGood(){
    this.mood++;
  }
  makeMoodBad(){
    this.mood--;
  }
  showMood(){
    switch (this.mood){
      case 0:
        return '-_-';
      case 1:
        return '^_^';
      case -1:
        document.getElementById('consoleWindow').style.animationName='medBlinking';
        return '>_<';
      case -2:
        document.getElementById('consoleWindow').style.animationName='strongBlinking';
        return '×_×';
      case 2:
        return '^v^';
      case 3:
        return '^v^';
      default:
        return '?-?';
    }
  }

  makeCrypt(level){
    var word = this.library[Math.trunc(Math.random()*this.library.length)];
    console.log('Word: ' + word);
    switch (level) {
      case 0:
        return SimpleCrypt(word);
      case 1:
        return MediumCrypt(word);
      case 2:
        return StrongCrypt(word);
      default:
        return '-';
    }
  }
}

function SimpleCrypt(input){
  let output = '';
  for (let i = input.length-1; i>=0; i--){
    output+=input[i];
  }
  return output;
}

function MediumCrypt(input, isItDecoding){
  let output = '';
  let alphabet = [' ','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  if (!isItDecoding){
    for (let i = 0; i<input.length; i++){
      output+=alphabet.indexOf(input[i]) + ' ';
    }
    return output;
  }
  else {
    let number = '';
    for (let i = 0; i<input.length; i++){
      if (input[i]===' '){
        output+='' + alphabet[number];
        number='';
      }
      else{
        number+=input[i];
      }
    }
    return output;
  }
}

function StrongCrypt(input, isItDecoding){
  let output = '';
  if (!isItDecoding){
    output = MediumCrypt(SimpleCrypt(input),false);
    return output;
  }
  else {
    output = SimpleCrypt(MediumCrypt(input,true));
    return output;
  }
}
