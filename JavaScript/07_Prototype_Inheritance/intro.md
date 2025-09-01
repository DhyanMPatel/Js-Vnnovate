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

- Deep dive in [ProtoTypal Inheritance](./Prototypal_inheritance.js).

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

3. Object.create()

    - Syntax

        ```js
          Object.create(proto[, descriptors])
        ```

   - Example

     ```js
     let animal = {
       eats: true,
     };
     let dog = Object.create(animal, {
       jumps: {
         value: false,
       },
     });
     console.log(Object.getPrototypeOf(dog)); // Return - { eats: true }
     console.log(dog.jumps); // Return - false
     console.log(dog.eats); // Return - true
     console.log(animal.jumps); // Return - undefined
     ```

# Primitives

- Primitives are not an object. if we try to access their properties, temporary wrapper objects are created using built-in constructors `String`, `Number`, `Boolean`. they provide the methods and disappear.

- Interesting This is that `Undefined` & `Null` has no have Wrapper Object. we can't make method on **undefined** and **null**.

- If there are already any method is available and we override that method is bad Idea. So we take one approach thats **Polyfilling**.

  ```js
  // Without Polyfilling
  String.prototype.show = function () {
    console.log(this);
  }

  // With Polyfilling
  if(!String.prototype.show){
    String.prototype.show = function () {
      console.log(this);
    }
  }

  "Boom".show(); // Return - Boom

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

## Prototype Inheritance Topics

- [ProtoTypal Inheritance](./Prototypal_inheritance.js)
- [F.Prototype](./F_prototype.js)
- [Native Prototypes](./Native_Prototype.md)
- [Prototype Methods](./Methods_of_prototype.js) (Obj without __proto__)

# Ga back to Object Properties Configuration

- [Object Properties Configuration](../06_Object_Properties_Configuration/intro.md)

# Now Learn about Classes

- [Classes](../08_Classes.js/intro.md)