/// Optional Chaining
//      - use for safe way to access nested Object properties, even if intermidiate property doesn't exist.
//      - if Object will not define then it will give error otherwise give undefined even if any properties will not defined.
//      - Option chaining is not an Operator, it is special syntax cinstruct, that also works with function (`?.()`) and brackets (`?.[]?`)
//      - we can't do 

let height = "height"
let user = {
    name: 'John Doe',
    age: 19,
    height: 5.8,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
    },
    findAddr() {
        return this.address;
    },
}
let userGuest = {}

console.log(user?.addresses?.street); // Return - undefined
console.log(user.findAddr?.());
console.log(userGuest.findAddr?.()); // Return - undefined
console.log(user?.[height]); // Return - 5.8
console.log(user?.height); // Return - 5.8

/*
console.log(obj?.admin?.());
console.log(object?.admin?.());
*/

console.log(delete obj?.age); // Return - true
console.log(delete object?.age); // Return - true
