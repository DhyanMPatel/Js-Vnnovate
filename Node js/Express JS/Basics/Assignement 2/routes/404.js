const path = require('path');

const express = require('express');
const { NotFoundController } = require('../controller/404Controller');

const router = express.Router();

router.use(NotFoundController); // Using the controller function to handle 404 errors

module.exports = router;