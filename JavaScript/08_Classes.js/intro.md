# Class

- Class also have a get/set methods
- Class have computed methods name using `[...]`
- class fields is that they are set on individual objects, not `User.prototype`

### Note

1. What is Class?
   - Class is kind of **Function**.

## Difference between Class & Function

1. a function created by class is labelled by a special internal property [[IsClassConstructor]]: true.
   - class must be called with `new` keyword.
   - In Most JS engine, String representation of class constructor starts with class
2. Class are non-Enumerable. A class definition sets `Enumerable` to `false`.
3. Class are always `use Strict`. So inside the class construct is automatically in strict mode

## Class Expression

- Just like functions, they also contain expression just like function expression

  ```js
  let User = class {
    sayHi() {
      console.log("Hii");
    }
  };

  let User1 = class MyClass {
    sayHi() {
      console.log("Hii, with name", MyClass); // MyClass accessible from inside only
    }
  };
  new User1.sayHi(); // Return - Hii, with name [class MyClass] (MyClass definition)
  ```

## Getter/Setter

- Just like literal Objects

## Computed Method Name

- We can put method name using brackets `[...]`

  ```js
  class User {
    ["say" + "Hi"]() {
      alert("Hello");
    }
  }

  new User().sayHi(); // Return - Hello
  ```

##

## Making bound methods with class fields

  ```js
  class Button {
    constructor(value) {
      this.value = value;
    }

    click() {
      alert(this.value);
    }
  }

  let button = new Button("hello");

  setTimeout(button.click, 1000); // undefined
  ```

- If we use normal function then there is possibility to loss `this`
- solution of that is,
  1. Pass Wrapper-Func use `Arrow Function`, such as setTimeout(()=> button.click(), 1000)
  2. Bind the Method to Object, e.g. in the constructor

- But class provide another syntax,

```js
class Button{
  constructor(name){
    this.name = name
  }
  click = () => {
    console.log(this.name)
  }
}
```

## override method / constructor

- We can make same name method in child class, that is called 'override method'.
- Using `super.Pmethod()` to call parent method from child class
- Bydefault child class create constructor,

  ```js
  constructor(...args){
      super(...args)
  }
  ```

- we can do override constructor also,
- Just remember that you should call super()
- That label affects its behavior with new.

  1. When a regular function is executed with new, it creates an empty object and assigns it to this.
  2. But when a derived constructor runs, it doesn’t do this. It expects the parent constructor to do this job.

- So a derived constructor must call super in order to execute its parent (base) constructor, otherwise the object for this won’t be created. And we’ll get an error.

  [Note] - We can override not only methods, but also class fields. parent class take their field first, not overriden. But in method chaild take their method and parent run their method

## Static Methods / Static Properties

- When we assign method to the class as whole, such methods are called `Static Methods`
- They are prepended by `static` keyword
- Static methods are also used in database-related classes to search/save/remove entries from the database
- Static methods and **Static Properties are inherited**, but not of built-in classes like Array, Mep, Date, etc.
- Static methods are **stored in Class itself**.

## Oop

- In Oops, properties & methods are split into two groups:

  1. Internal interface - accessible from other methods of class, but not from outside of Class
  2. External interface - accessible also from outside the class.

- In JavaScript, there are two types of object fields (properties and methods):
  1. public - accessible from anywhere
  2. private - accessible from inside the class
