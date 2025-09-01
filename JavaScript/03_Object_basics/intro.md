# Objects

- Object is a complex data type in JS
- Const Object can be modify there is no any const ability work.
- Property keys must be strings or symbols (usually strings) and Unique.
- Object Properties are automatically converted into String
- Object Properties has not any limitation means there are no any reserve words
- Object will not display error if any properties that we find in obj which is not inside obj
- Object has a odd thing with properties that if properties are named as Number then it display output according to that number not according to stored.
- If there are number in Number and String form then both are same it will update based on lattest.

## Object Create Method

1. Object Constructor
   `let user = new Object()`
2. Object litaral
   `let user = {}`

### Note

- In Nested Object, we use `Object.assign({},...source)` or for.in loop we pass inner obj which represent same Object

  - To Solve that we can use `structureClone()`

  ```
  let Obj1={
      name: "Vnnovate",
      inner:{
          age: 13
      }
  }
  let copy = Object.assign({},Obj1)
  console.log(copy.inner === Obj1.inner); // true, inner obj is same in both,

  let properClone = structureClone(Obj1)
  console.log(properClone.inner === Obj1.inner); // false
  ```

  - There is still problem with `structureClone()` which is Advance that should know after some year of experence which is known as Circular Reference.

## Object.keys, Object.values, Object.entries

- Get data from Object to Array
- This methods ignore Symbolic Properties
- If want symbolic properties too, then use Object.getOwnPropertySymbols(obj) & Reflect.ownKeys(obj)

## Object.fromEntries

- Use to get data from Array to Object


## Basic Object Topics

- [Object](./Object.js)
- [Object Reference & Copy](./Reference&Copy.js)
- [Garbage Collection](./garbageCollection.md)
- [Object Methods, ](./thisObject.js) ("This")
- [Object Methods, ](./object_is().js) ("is()")
- [Constructor, Operator](./constructorOperatorNew.js) ("New")
- [Optional Chaining, ](./optionalChaining.js) ("?.")
- [Symbol Type in Object](./SymbolWithObj.js)
- [Object to Primitive Conversion](./ObjToPrimitive.js)

# Go back to Code Quality

[Code Quality](../02_Code_Quality/Debugging.md)

# Now Deep dive in Data Types

[Data Types](../04_Data_Types/intro.md)