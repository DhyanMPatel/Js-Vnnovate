const express = require('express');
const path = require('path');
const { rootDir } = require('../utils/path');

const router = express.Router();

// router.get('/', (req,res,next) => {
//     // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
//     //      OR
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// })


/// Use Pug Template engine
router.get('/', (req, res, next) => {
    res.render("shop"); // This will automatically look for shop.pug file in views folder and render it.
})

module.exports = router;