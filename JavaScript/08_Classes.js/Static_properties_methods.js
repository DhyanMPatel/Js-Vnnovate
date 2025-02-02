/*
/// Static Methods
//      - Static methods aren’t available for individual objects

class User {
  static staticMethod() {
    console.log(`This is Static Method ${this === User}`);
  }
}
User.staticMethod();

class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(ArticleA, ArticleB) {
    return ArticleA.date - ArticleB.date;
  }
  static sayHii() {
    console.log(`Hii, ${this.title}!`); /// Home Work - Why this return `undefined`?
  }
}

let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1)),
];
articles.sort(Article.compare);

console.log(articles[0].title); // Return - CSS
console.log(articles[1].title); // Return - HTML
console.log(articles[2].title); // Return - JavaScript

Article.sayHii();
// articles.sayHii(); // Error - articles.sayHii is not a function
*/

/*
/// Static Properties
//      - reference Object has not access to static properties

class User {
  static name = "Vnn";
}
let user = new User();
console.log(User.name); // Return - Vnn
console.log(user.name); // Return - undefined
*/

/*
/// inheritance with Static Method/Properties
//      - WildAnimal extends Animal create 2 type of [[Reference]]
//          1. WildAnimal function prototypally inherites from Animal function
//          2. `WildAnimal.protytope` prototypally inherites from `Animal.prototype`

class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  run() {
    console.log(`Animal ${this.name} can run ${this.speed} km/s fast.`);
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
}

class WildAnimal extends Animal {
  hide() {
    console.log(`${this.name} animal can Hide.`);
  }
}
let animals = [
  new WildAnimal("Rabit", 30),
  new WildAnimal("Tigar", 50),
  new WildAnimal("Bear", 20),
];
animals.sort(WildAnimal.compare);
console.log(animals[1].name); // Return - Rabit
animals[1].run(); // Return - Animal Rabit can run 30 km/s fast.

console.log(WildAnimal.planet); // Return - Earch
*/


/// Experiment

/*
//      1) - static method and prototypal method both can be inherite
class Animal {}
class Rabbit extends Animal {}

// for statics
console.log(Rabbit.__proto__ === Animal); // Return - true

// for regular methods
console.log(Rabbit.prototype.__proto__ === Animal.prototype); // Return - true
*/

/*
//      2) -
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// hasOwnProperty method is from Object.prototype
console.log(rabbit.hasOwnProperty("name")); // Return - true
*/