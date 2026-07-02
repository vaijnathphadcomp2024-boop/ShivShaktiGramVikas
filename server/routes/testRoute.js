const { getHello } = require('../controllers/testController');
const router = require('express').Router();

router.get('/hello', getHello);

module.exports = router;
