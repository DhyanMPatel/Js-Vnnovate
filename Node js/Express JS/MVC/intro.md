# MVC Structure

## What is MVC?

- MVC stands for Module, View and Controller.
- We write MVC structure into Assignment 2 at Basic folder.

[See MVC structure](../Basics/Assignement%202/ReadMe.md)

![What is MVC?](./What%20is%20MVC.png)

- Bellow are the example of Module, View and Controller.

```js
/// Routes

// routes/admin.js
const {getAddProduct} = require("../controller/adminProductController");

router.get('/add-product', getAddProduct); 
```

```js
/// Controller

// controller/adminProductController.js
exports.getAddProduct = (req,res,next) => {
    res.sendFile(Path.join(_dirname, "..", 'views', 'add-product.html'))

    //      OR

    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
}
```

![MVC understanding](./MVC%20understanding.png)

![MVC Wrap up](./MVC%20Wrap%20up.png)