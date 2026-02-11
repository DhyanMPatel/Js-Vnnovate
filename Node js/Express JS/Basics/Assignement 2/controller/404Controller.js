const path = require("path");

exports.NotFoundController = (req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html')); // '../' is required because we are now at routes folder
};