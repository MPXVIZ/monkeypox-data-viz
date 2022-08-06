const express = require('express');
const dataRouter = require('./data.js');
const router = express.Router();

router.use('/data', dataRouter);

module.exports = router;
