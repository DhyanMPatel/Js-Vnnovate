function num(n, callback) {
    return callback(n);
}

const double = (n) => n * 2;

console.log(num(5, double));