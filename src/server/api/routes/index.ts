const dataRouter = require('./data');

const router = require('express').Router();

router.use('/data', dataRouter);

module.exports = router;
