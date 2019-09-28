const express = require('express');
const router = express.Router();
// sign up, login...등록
const userModel = require('../models/users');
const bcryptjs = require('bcryptjs');

// user sign up
router.post('/signup',(req, res) => { //구분짓기위해 ''사이에 도메인을 넣음(회원가입, 로그인 둘다 post이기 때문에)

    // password암호화 작업
    bcryptjs.hash(req.body.password, 10, (err, hash) => { //정상적으로 처리가 된 경우 hash에 리턴
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new userModel({
                email: req.body.email,
                password: hash //정상적으로 password암호화
            });

            user
                .save() //database에 저장
                .then(user => {
                    res.status(200).json({
                        msg: 'Successful post user',
                        user: user
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })   //password의10자리까지, 실패:err, 성공:hash

    //
    // const user = new userModel({
    //     email: req.body.email,
    //     password: req.body.password
    // });
    //
    // user
    //     .save() //database에 저장
    //     .then(user => {
    //         res.status(200).json({
    //             msg: 'Successful post user',
    //             user: user
    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             error: err
    //         });
    //     });


});


// user login
router.post('/login',(req, res) => {

});

module.exports = router;