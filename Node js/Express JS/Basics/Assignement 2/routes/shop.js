const express = require('express');
const path = require('path');
const { rootDir } = require('../utils/path');
const productData = require('./admin').productData;

const router = express.Router();

router.get('/', (req,res,next) => {
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    //      OR
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
})

module.exports = router;