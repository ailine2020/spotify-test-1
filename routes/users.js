const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users');

/* GET users listing. */
router.post('/user', usersController.test);

module.exports = router;
