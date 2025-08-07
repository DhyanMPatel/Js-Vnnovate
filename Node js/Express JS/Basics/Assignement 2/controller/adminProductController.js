const path = require('path');

exports.getAddProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    //      OR
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // More robust way to get the path
};