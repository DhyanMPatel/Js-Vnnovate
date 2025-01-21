# Class

- Class also have a get/set methods
- Class have computed methods name using `[...]`
- class fields is that they are set on individual objects, not `User.prototype`

## Difference between Class & Function

1. a function created by class is labelled by a special internal property [[IsClassConstructor]]: true.
   - class must be called with `new` keyword.
   - In Most JS engine, String representation of class constructor starts with class
2. Class are non-Enumerable. A class definition sets `Enumerable` to `false`.
3. Class are always `use Strict`. So inside the class construct is automatically in strict mode

## Getter/Setter

- Just like literal Objects

## Computed Method Name

### Making bound methods with class fields

- If we use normal function then there is possibility to loss `this`
- solution of that is,
  1. Pass Wrapper-Func use `Arrow Function`, such as setTimeout(()=> button.click(), 1000)
  2. Bind the Method to Object, e.g. in the constructor
