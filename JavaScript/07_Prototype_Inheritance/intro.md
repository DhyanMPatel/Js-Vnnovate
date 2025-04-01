# Prototype (special object property)

- Object Reference by [prototype] is called `Prototype`
- Objects access their propterties, methods, funcnality or inject into this via `prototype`
- use for Reading Operation only, write/delete work directly with object
- when we made prototypal chain, and if we made some changes in function then that obj and their chaild obj only see the changes, remaining will not feel any changes
- [[this]] is not affected by prototypes at all.
- methods are shared, but the object state is not.
- Modern JS, there is not difference whether we take a property from an Object or its prototype. means there is no any time difference. They remember where they found using caching, next time search right there where it is made.

## Prototypal Inheritance

- in JS, Object have a special hidden property [[Prototype]], that is either `null` or reference of another Object. That Object is called `Prototype`.
- The prototype chain can be longer
- Modern JS suggest that we should use [Object.getPrototypeOf()] & [Object.setPrototypeOf()] instead that get/set the prototype
- By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we’re quite safe using it.

# Limitation

- Reference can't go circular, give error then `__proto__` assign in circle
- The value of `__proto__` is either [Object] or [null]

# Methods of Prototype

1. `__proto__`

   - using `__proto__` property one object can access another object properties via prototype
   - this method is old method
   - use inside of Object (implisite method)
   - Example

     ```js
     let obj = {
         type: "Car"
         name: "BMW"
     }
     let obj2 = {
         type: "Bike"
         __proto__: obj
     }
     console.log(obj2.name); // Return - BMW
     console.log(obj2.__proto__); // Return - {type: "Car", name:"BMW"}
     ```

2. Object.setPrototypeOf() & Object.getPrototypeOf()

   - Syntax

     ```js
     Object.setPropertyOf(ConsumerObj, ProviderObj);

     Object.getPropertyOf(ConsumerObj);
     ```

   - This method is widly used by Developer
   - This can be any where where `__proto__` should be at declaration.
   - Example

     ```js
     Object.setPrototypeOf(obj2, obj);

     console.log(obj2); /// Return - {type: "Bike"}

     console.log(Object.getPrototypeOf(obj2)); // Return - { type:"Car", name:"BMW" }
     ```

### Notes

- **for...in** loop can iterate over inherited properties too.
- If we call `obj.method()` and method is taken from prototype, **this** still referes to obj. So method work for current object even if they are inherited.

  ```js
  // animal has methods
  let animal = {
    walk() {
      if (!this.isSleeping) {
        alert(`I walk`);
      }
    },
    sleep() {
      this.isSleeping = true;
    },
  };

  let rabbit = {
    name: "White Rabbit",
    __proto__: animal,
  };

  // modifies rabbit.isSleeping only for rabbit object.
  rabbit.sleep();

  alert(rabbit.isSleeping); // true
  alert(animal.isSleeping); // undefined (no such property in the prototype)
  ```
