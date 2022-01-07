let POINTER;
document.cookie = 'name=value; path=/Main/';
let Users = [];

if (getCookie('pointer')===undefined){
  setCookie('pointer', POINTER);
}
else {
  POINTER = getCookie('pointer');
}

if (getCookie('users')===undefined){
  setCookie('users', JSON.stringify(Users));
}
else {
  Users = JSON.parse(getCookie('users'));
}

function  WriteName(){
  if (getCookie('pointer')===undefined){
    setCookie('pointer', POINTER);
  }
  else {
    POINTER = getCookie('pointer');
  }

  let nickname = document.getElementById('nameInput').value;
  if (undefined!==GetUser(JSON.parse(getCookie('users')), nickname)){
    console.log('Пользователь успешно найден');
  }
  else {
    console.log('Пользователь не найден');
    Users.push(new User(nickname));
    setCookie('users', JSON.stringify(Users));
  }
}

class User{
  score1 = 0;
  score2 = 0;
  score3 = 0;
  constructor(nick) {
    if (nick.length!==0){
      this.nickname = nick;
    }
  }
}

function  GetUser(arrOfUsers, name) {
  for (let i = 0; i < arrOfUsers.length; i++){
    if (arrOfUsers[i].nickname===name){
      POINTER = i;
      setCookie('pointer', POINTER);
      return arrOfUsers[i];
    }
  }
  return undefined;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function CookiesDelete() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
