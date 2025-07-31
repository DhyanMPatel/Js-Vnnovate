const path = require('path');

// exports.rootDir = path.dirname(process.mainModule.filename);

//      OR

exports.rootDir = path.dirname(require.main.filename);