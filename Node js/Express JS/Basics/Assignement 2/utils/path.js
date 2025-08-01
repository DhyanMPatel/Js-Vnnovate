const path = require('path');

// exports.rootDir = path.dirname(process.mainModule.filename);

//      OR

exports.rootDir = path.dirname(require.main.filename);


/*
- Provide a Root Directory for the Application
- This is useful to avoid hardcoding paths in application.
- 
*/