const express = require('express');
const router = express.Router();
// sign up, login...등록


const userController = require('../controller/user');


// 전체유저 불러오기(숙제)
router.get('/', userController.totalGet_user);

// user sign up
router.post('/signup', userController.register_user);

// user login
router.post('/login', userController.login_user);


// user delete
router.delete('/:userId', userController.delete_user);



module.exports = router;