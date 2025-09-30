# Object Property Flag

- Object Property are not just `Key-Value` pair. But an Obj Property is actually a more flexible and powerfull things.
- Object have 3 special attributes
  - Bydefault these all are `true`.
  1. writable - if `true`, the value can be changed, otherwise it's read-only
  2. enumirable - if `true`, then listed in loop, otherwise not listed
  3. configurable - if `true`, then properties can be deleted and these attributes can be modified, otherwise not
- Access Flags

  ```js
  let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
  let descriptors = Object.getOwnPropertyDescriptors(obj);
  ```

- Create properties with Flags

  ```js
  Object.defineProperty(obj, propertyName, descriptor)
  Object.defineProperties(obj,{prop1: des1, prop2: des2, ...})
  ```

- Object Methods that limit access to the whole Object
  1. Object.preventExtensions(obj)
  2. Object.seal(obj)
  3. Object.freeze(obj)
  4. Object.isExtensible(obj)
  5. Object.isSealed(obj)
  6. Object.isFrozen(obj)

- Now understand [Property Flag & Descriptors](./PropertyFlags_descriptor.js)

# Getter & Setter

- Accessor Properties are represent by `getter` & `setter` methods
- Accessor Descriptor
  1. get
  2. set
  3. enumerable
  4. configurable

- Now deep dive in [Getter & Setter](./Getter_Setter.js)


# Go Back to Advance with Function

- [Advance working with Function](../05_Advance_with_Func/intro.md)

# Now Understand Prototype & Inheritance

- [ProtoType & Inheritance](../07_Prototype_Inheritance/intro.md)