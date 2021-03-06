const userModel = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken'); //인증코드발행 관련



// 전체 유저 불러오기
exports.totalGet_user = (req, res) => {
    userModel
        .find() //find는 배열로 들어온다
        .then(users => {
            res.status(200).json({
                msg: 'Successful user data',
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};


// 회원가입
exports.register_user = (req, res) => { //구분짓기위해 ''사이에 도메인을 넣음(회원가입, 로그인 둘다 post이기 때문에)

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




};



// 유저 로그인
exports.login_user = (req, res) => {
    //데이터베이스에 유저모델이 있는지 없는지 확인 -> 패스워드 매칭 => jsonwebtoken을 발행하고 => 화면에 뿌려줌
    userModel
        .find({email: req.body.email})
        .exec()
        .then(user => {
            // email이 있는지 없는지 확인
            if(user.length < 1){
                return res.status(400).json({
                    msg: 'none email info'
                });
            } else {
                // 패스워드 매칭
                bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
                    //req.body.password(사용자 입력값)과 user[0].password(첫번째 object의 패스워드)를 비교해서 err(실패)나 result(비교값)으로 넘어감
                    if(err) {
                        return res.status(400).json({
                            msg: 'password incorrect'
                        });
                    }

                    console.log(result);
                    if(result) {

                        // jsonwebtoken 만들기
                        const token = jwt.sign({
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            "secret", {expiresIn: "1h"} // secret: 암구어 같은거(꼭 필요) expiresIn: "1h" 1시간동안 토큰이 유효함, 시간지나면 없어짐
                        );

                        res.status(200).json({
                            msg: 'Successful login',
                            tokeninfo: token

                        });
                    }
                    res.status(401).json({
                        msg: 'Auth failed'
                    });

                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

};

// 유저 삭제
exports.delete_user = (req, res) => {
    userModel
        .remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: 'Successful delete id'

            });
        })
        .catch(err => {
            res.status(500).json({
                error: err

            });
        });
};