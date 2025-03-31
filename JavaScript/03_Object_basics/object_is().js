// Object.is()
//      - This method initially called SameValue

console.log(Object.is(NaN, NaN)); /// true, Means === true

console.log(Object.is(0, -0)); /// false, Means === false