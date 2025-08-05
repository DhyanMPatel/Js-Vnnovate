const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { rootDir } = require('../utils/path');

const ProductData = []; // Array to store product data

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false })); // This will parse only key-value pairs

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    //      OR
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // More robust way to get the path
});

router.post('/product', (req, res, next) => {
    res.send('<h1>Product Added</h1>');
    console.log(req.body);  // Without bodyParser it will return undefined. because node by default does not parse the body.
    ProductData.push({ title: req.body.title });
    console.log(ProductData);
})

exports.router = router;
exports.productData = ProductData; // Exporting ProductData to use in other files