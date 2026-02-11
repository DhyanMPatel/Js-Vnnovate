const express = require('express');
const path = require('path');
const { rootDir } = require('../utils/path');
const Product = require('../Models/product');

const router = express.Router();

// router.get('/', (req,res,next) => {
//     // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
//     //      OR
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// })


/// Use Pug Template engine
router.get('/', (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop", { 
            products: products || [],
            pageTitle: 'Shop',
            path: '/'  // This will helps to identify dynamic route in Pug Template layout.
        });
    });
})

module.exports = router;