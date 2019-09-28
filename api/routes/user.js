const express = require('express');
const router = express.Router();
// sign up, login...등록
const userModel = require('../models/users');
const bcryptjs = require('bcryptjs');

// user sign up
router.post('/signup',(req, res) => { //구분짓기위해 ''사이에 도메인을 넣음(회원가입, 로그인 둘다 post이기 때문에)

    // 데이터베이스 유저(userModel)가 있는지 없는지 확인-> password암호화-> 데이터베이스에 저장-> 화면에 뿌려주는것
    userModel
        .find({email: req.body.email})//사용자 입력값으로 email을 대조
        .exec() //실행한다는뜻
        .then(user => {
            if(user.length >= 1){ //1보다 크면 기존mail이 있다는것
                return res.status(409).json({
                    msg: 'Mail exists'
                });
            } else {
               // password암호화 작업
                bcryptjs.hash(req.body.password, 10, (err, hash) => { //password의10자리까지암호화, 실패:err, 성공:hash
                    //정상적으로 처리가 된 경우 hash에 리턴
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
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });




});


// user login
router.post('/login',(req, res) => {

});

module.exports = router;