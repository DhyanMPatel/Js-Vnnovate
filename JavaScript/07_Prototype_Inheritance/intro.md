# Prototype

- Object Reference by [prototype] is called `Prototype`
- use for Reading Operation only, write/delete work directly with object
- when we made prototypal chain, and if we made some changes in function then that obj and their chaild obj only see the changes, remaining will not feel any changes
- [[this]] is not affected by prototypes at all.
- methods are shared, but the object state is not.
- Modern JS, there is not difference whether we take a property from and Object or its prototype. means there is no any time difference. They remember where they found using caching, next time search right there where it is made.

## Prototypal Inheritance

- in JS, Object have a special hidden property [[Prototype]], that is either `null` or reference of another Object. That Object is called `Prototype`.
- The prototype chain can be longer
- Modern JS suggest that we should use [Object.getPrototypeOf()] & [Object.setPrototypeOf()] instead that get/set the prototype
- By the specification, `__proto__` must only be supported by browsers. In fact though, all environments including server-side support `__proto__`, so we’re quite safe using it.

# Limitation

- Reference can't go circular, give error then `__proto__` assign in circle
- The value of `__proto__` is either [Object] or [null]
