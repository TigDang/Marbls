class Computer{
  mood = 0;
  level = 0;
  library = ['яблоко', 'уровень', 'стол', 'сон', 'ужас', 'смерть', 'война', 'эпизод', 'зритель', 'игрок',
    'беседа', 'окно', 'фонарь', 'аптека', 'душ', 'вода', 'снег', 'мороз', 'игра', 'безумство', 'компьютер',
    'проект', 'солнце', 'осень', 'зима', 'господь', 'лето', 'люцифер', 'кожа', 'книга', `писание`];

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
        break;
      case 1:
        return '^_^';
        break;
      case -1:
        return '>_<';
        break;
      case -2:
        return '×_×';
        break;
      case 2:
        return '^v^';
        break;
      default:
        return '?-?';
        break;
    }
  }

  makeLevelHarder(){
    this.level++;
  }

  makeCrypt(){
    switch (this.level) {
      case 0:
        return SimpleCrypt(this.library[Math.round(Math.random()*this.library.length)]);
        break;

    }
  }
}

function SimpleCrypt(input){
  var output = '';
  for (let i = input.length; i>=0; i--){
    output+=input[i];
  }
  return output;
}
function MediumCrypt(){

}
