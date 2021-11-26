const router = require("express").Router();

const burgirController = require('../controllers/burgir');
const userController = require('../controllers/user');

router.use('/burgir', burgirController);
router.use('/user', userController);

module.exports = router;