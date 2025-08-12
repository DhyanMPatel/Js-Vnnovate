const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data','products.json'); // OR path.dirname(require.main.filename)
module.exports = class productData {
    constructor(t) {
        this.title = t;
    }

    save() {


        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err, "error in writing file");
            })
        })

        // products.push(this);
    }

    static fetchAll(cb) { // This cb is required to pass data from Model to Controller
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        });
    }
}