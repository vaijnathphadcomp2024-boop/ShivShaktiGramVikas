const testRoute = require('./testRoute');
const router = require('express').Router();

router.use('/', testRoute);

module.exports = router;
