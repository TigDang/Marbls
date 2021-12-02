class Player{
  #countOfMarbles=7;
  isItBot=true;

  constructor(nickName, isItBot) {
    this.nickName = nickName;
    this.isItBot=isItBot;
  }
  makeBid(){
    let min = 1;
    let max = this.#countOfMarbles;
    return Math.floor(Math.random() * (max - min)) + min + 1; //Максимум не включается, минимум включается
  }
  makeAssump(){
    return(Math.random() < 0.5);
  }
  showMarbls(){
    return this.#countOfMarbles;
  }
  addMarbls(addNum){
    this.#countOfMarbles+=parseInt(addNum,10);
    if (this.isItBot){
      console.log('count of bot marbles = '+this.#countOfMarbles)
    }
    else {
      console.log('count of player marbles = '+this.#countOfMarbles)
    }
  }
  takeMarbls(addNum){
    this.#countOfMarbles-=parseInt(addNum,10);
    if (this.isItBot){
      console.log('count of bot marbles = '+this.#countOfMarbles)
    }
    else {
      console.log('count of player marbles = '+this.#countOfMarbles)
    }
  }
}
