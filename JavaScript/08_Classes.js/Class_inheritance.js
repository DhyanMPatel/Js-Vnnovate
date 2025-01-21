// Class Inheritance
//      - Way for one class to extend another class
//      - First class object take their reference method is not there then got for parent class methods automatically

/// "Extend" Keyword
class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }
  run(speed) {
    this.speed = speed;
    console.log(`Animal ${this.name} has ${this.speed} Km/p speed. `);
    // console.log(this); // referes to Animal class for all their object
  }
}

let cat = new Animal("Cat");
cat.run(10);

let dog = new Animal("Dog");
dog.run(20);

class WildAnimal extends Animal {
  /*
    /// Budefault
    constructor(...args) {
        super(...args);
    }
  */

  constructor(name, length) {
    super(name);
    this.length = length;
  }

  hide() {
    console.log(`Wild Animal ${this.name} can Hide.`);
  }

  howLong() {
    console.log(`Wild Animal ${this.name} is ${this.length} foot long.`);
  }

  // Override method
  run(speed) {
    this.speed = speed;
    console.log(`Wild Animal ${this.name} has ${this.speed} Km/p speed. `);
    // console.log(this); // Return - WildAnimal { name: 'Tiger', speed: 40 }, referes to WildAnimal.

    // can call parent run()
    super.run(speed);

    setTimeout(() => {
      super.run("Arrow Function Has no own super.");
    }, 1000);
  }
}
let tiger = new WildAnimal("Tiger", 8);
tiger.hide();
tiger.howLong();
tiger.run(40);

/*
/// Experiment
class Animal {
    name = 'animal';
  
    constructor() {
      alert(this.name); // (*)
    }
  }
  
  class Rabbit extends Animal {
    name = 'rabbit';
  }
  
  new Animal(); // animal
  new Rabbit(); // animal
  */
