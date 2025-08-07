const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { rootDir } = require('../utils/path');
const { getAddProduct } = require('../controller/adminProductController');
const productData = require('../Models/product'); // Assuming you have a product model to handle product data

// const ProductData = []; // Array to store product data

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false })); // This will parse only key-value pairs

router.get('/add-product', getAddProduct); // Using the controller function to handle the route

router.post('/product', (req, res, next) => {
    res.send('<h1>Product Added</h1>');
    console.log(req.body);  // Without bodyParser it will return undefined. because node by default does not parse the body.


    // ProductData.push({ title: req.body.title });
    // console.log(ProductData);

    //      OR
    const product = new productData(req.body.title);
    product.save();
})

router.get('/products', (req, res, next) => {
    res.send("<h2>This route is only for Post requests</h2 >");
})

exports.router = router;
// exports.productData = ProductData; // Exporting ProductData to use in other files