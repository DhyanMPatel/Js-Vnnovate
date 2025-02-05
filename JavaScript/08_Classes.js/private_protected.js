/*
// Protecting fields
//      - Protected properties are usually prefixed with an underscore _.
//      - Protected fields can be inherited.

class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) {
      console.log(`Water Amount should be Possitive`);
    }
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

let coffee = new CoffeeMachine(100); // but can pass value of power
coffee.waterAmount = 10;
coffee._waterAmount = 20; // Possible ?
coffee.power = 120; // Error - there is not any set method

console.log(coffee.power); // Return - 100, can only for Read
*/


/// Private Fields
//      - Privates should start with #.
//      - They are only accessible from inside the class.
//      - Private fields are not available as this[name], means this['#name'] doesn’t work.
class CoffeeMachine {
  #power = 0;
  constructor(power) {
    this.#power = power;
  }

  get power() {
    return this.#power;
  }

  set power(value) {
    this.#power = value;
  }
}

class sample extends CoffeeMachine{
  print(){
    console.log(this.power);
  }
}
let coffee = new CoffeeMachine(2);
console.log(coffee.power); // Return - 2
let smp = new sample(3);
console.log(smp.power); // Return - 3

// console.log(coffee.#power); // Error- not accessible from outside
