

const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try { //token은 postman에 headers 안에 입력
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret") //사용자입력값(token)하고 secret하고 검증작업
        req.userData = decoded;
        next();

    } catch (error){
        return res.status(401).json({
            msg: 'Auth failed'
        });
    }
}; //try, catch문은 무조건 try->catch 순서로 진행(맞든 틀리든)